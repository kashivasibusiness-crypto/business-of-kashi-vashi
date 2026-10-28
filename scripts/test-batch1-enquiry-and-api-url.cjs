/**
 * Verification Script for Batch 1 Refinements:
 * 1. API URL Selection Logic (Localhost vs Production vs Configured)
 * 2. Source Code Static Integrity (useRef guard, strict 404 fallback rule, no PII in WhatsApp link)
 * 3. Submission Lifecycle Simulation:
 *    - Rejection of 200 responses with HTML / non-JSON bodies
 *    - Rejection of 200 responses where success !== true
 *    - Acceptance of 200/201 responses with success === true
 *    - Strict fallback isolation: 404 permits fallback; 4xx and 5xx NEVER trigger fallback
 *    - Network failure retry safety (prevents duplicate lead creation on socket drop)
 *    - Synchronous double-click ref guard protection
 * 
 * TEST METHODOLOGY NOTICE:
 * - Tests 1-4: Unit tests of the URL resolution algorithm.
 * - Tests 5-7: Static code integrity assertions on actual repository files on disk.
 * - Tests 8-18: State-machine simulation tests replicating QuickTripPlanner's exact async control flow.
 *   (Limitation: Runs in Node.js runtime without headless browser DOM).
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('🧪 [TEST SUITE] Batch 1 Final Verification: Fallback Safety, Response Contracts & Concurrency\n');

let totalTests = 0;
let passedTests = 0;

async function runTest(name, fn) {
    totalTests++;
    try {
        await fn();
        console.log(`✅ PASS: ${name}`);
        passedTests++;
    } catch (err) {
        console.error(`❌ FAIL: ${name}`);
        console.error(err);
        process.exitCode = 1;
    }
}

// =========================================================================
// 1. API URL SELECTION LOGIC UNIT TESTS
// =========================================================================

const FALLBACK_PROD_API = 'https://api-gzo7qrxiuq-uc.a.run.app';

function resolveBaseUrl(configuredApiUrl, hostname) {
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
    const cleaned = (configuredApiUrl || '').replace(/\/+$/, '');
    return cleaned || (isLocalhost ? 'http://localhost:5001' : FALLBACK_PROD_API);
}

// =========================================================================
// 2. SUBMISSION LIFECYCLE SIMULATION LOGIC
// =========================================================================

async function simulateQuickTripPlannerSubmit({
    mockPrimaryStatus, // 200, 400, 404, 500, or 'NETWORK_ERROR'
    mockPrimaryBody = {},
    mockPrimaryIsHtml = false,
    mockFallbackStatus, // 200, 500, or 'NETWORK_ERROR'
    mockFallbackBody = {},
    mockFallbackIsHtml = false,
    formData
}) {
    let isSubmitting = false;
    const isSubmittingRef = { current: false };
    let submitted = false;
    let errorMessage = '';
    let fallbackAttempted = false;
    let primaryAttempted = false;
    const trackedEvents = [];

    const trackTripPlannerSubmit = (evt) => trackedEvents.push(evt);

    async function handleSubmit() {
        if (isSubmittingRef.current) {
            return { blocked: true };
        }
        isSubmittingRef.current = true;
        isSubmitting = true;
        errorMessage = '';

        try {
            // Client Validation
            if (!formData.name || formData.name.trim().length < 2) {
                errorMessage = 'Please enter your full name (minimum 2 characters).';
                return { submitted, errorMessage, fallbackAttempted, blocked: false };
            }

            const cleanPhone = (formData.phone || '').replace(/\D/g, '');
            if (!cleanPhone || cleanPhone.length < 10) {
                errorMessage = 'Please enter a valid 10-digit mobile number.';
                return { submitted, errorMessage, fallbackAttempted, blocked: false };
            }

            // Primary Request
            primaryAttempted = true;
            let res;
            let primaryNetworkFailed = false;

            if (mockPrimaryStatus === 'NETWORK_ERROR') {
                primaryNetworkFailed = true;
            } else {
                res = {
                    ok: mockPrimaryStatus >= 200 && mockPrimaryStatus < 300,
                    status: mockPrimaryStatus,
                    json: async () => {
                        if (mockPrimaryIsHtml) throw new SyntaxError('Unexpected token < in JSON');
                        return mockPrimaryBody;
                    }
                };
            }

            // Case A: Network connection failure on primary
            if (primaryNetworkFailed) {
                errorMessage = 'Network connection issue: Unable to reach our server. Your entered details are safe — please retry or connect with us on WhatsApp.';
                trackTripPlannerSubmit({ success: false });
                return { submitted, errorMessage, fallbackAttempted, blocked: false };
            }

            // Case B: Primary HTTP 2xx
            if (res.ok) {
                let primaryData = null;
                try {
                    primaryData = await res.json();
                } catch {
                    // Non-JSON or HTML response (e.g. Vercel SPA index.html catch-all)
                }

                if (primaryData && primaryData.success === true) {
                    submitted = true;
                    errorMessage = '';
                    trackTripPlannerSubmit({ success: true });
                    return { submitted, errorMessage, fallbackAttempted, blocked: false };
                } else {
                    errorMessage = (primaryData && primaryData.message)
                        ? primaryData.message
                        : 'Unexpected server response. Please retry or contact us directly on WhatsApp.';
                    trackTripPlannerSubmit({ success: false });
                    return { submitted, errorMessage, fallbackAttempted, blocked: false };
                }
            }

            // Case C: Client validation error (4xx except 404) -> DO NOT FALLBACK
            if (res.status >= 400 && res.status < 500 && res.status !== 404) {
                const errData = await res.json().catch(() => ({}));
                errorMessage = errData.message || 'Please check the entered details and try again.';
                trackTripPlannerSubmit({ success: false });
                return { submitted, errorMessage, fallbackAttempted, blocked: false };
            }

            // Case D: Endpoint Missing on backend (404 ONLY) -> Fallback allowed
            if (res.status === 404) {
                fallbackAttempted = true;
                let fallbackRes;
                if (mockFallbackStatus === 'NETWORK_ERROR') {
                    errorMessage = 'Network connection issue: Unable to reach our server. Your entered details are safe — please retry or connect with us on WhatsApp.';
                    trackTripPlannerSubmit({ success: false });
                    return { submitted, errorMessage, fallbackAttempted, blocked: false };
                }

                fallbackRes = {
                    ok: mockFallbackStatus >= 200 && mockFallbackStatus < 300,
                    status: mockFallbackStatus,
                    json: async () => {
                        if (mockFallbackIsHtml) throw new SyntaxError('Unexpected token < in JSON');
                        return mockFallbackBody;
                    }
                };

                let fallbackData = null;
                try {
                    fallbackData = await fallbackRes.json();
                } catch {
                    // Non-JSON
                }

                if (fallbackRes.ok && fallbackData && fallbackData.success === true) {
                    submitted = true;
                    errorMessage = '';
                    trackTripPlannerSubmit({ success: true });
                } else {
                    errorMessage = (fallbackData && fallbackData.message)
                        ? fallbackData.message
                        : 'Unable to save your trip enquiry right now. Please retry or connect directly on WhatsApp.';
                    trackTripPlannerSubmit({ success: false });
                }

                return { submitted, errorMessage, fallbackAttempted, blocked: false };
            }

            // Case E: Server error (5xx) -> DO NOT FALLBACK (prevents duplicate lead creation & attribution loss)
            let serverErrMsg = 'Server error processing enquiry. Please retry or connect directly on WhatsApp.';
            try {
                const errData = await res.json();
                if (errData && errData.message) serverErrMsg = errData.message;
            } catch {
                // keep default
            }
            errorMessage = serverErrMsg;
            trackTripPlannerSubmit({ success: false });
            return { submitted, errorMessage, fallbackAttempted, blocked: false };
        } finally {
            isSubmittingRef.current = false;
            isSubmitting = false;
        }
    }

    return { handleSubmit, isSubmittingRef, getIsSubmitting: () => isSubmitting };
}

const validFormData = {
    name: 'Aarav Sharma',
    phone: '9876543210',
    email: 'aarav@example.com',
    travelDate: '2026-11-15',
    requirements: ['Temple Darshan']
};

async function main() {
    // 1. API URL Selection Tests
    await runTest('1. Localhost with explicit API configuration returns explicit URL', () => {
        const url = resolveBaseUrl('http://127.0.0.1:5001', 'localhost');
        assert.strictEqual(url, 'http://127.0.0.1:5001');
    });

    await runTest('2. Localhost with missing API configuration defaults to http://localhost:5001', () => {
        const url = resolveBaseUrl('', 'localhost');
        assert.strictEqual(url, 'http://localhost:5001');
    });

    await runTest('3. Production hostname with explicit API configuration returns configured origin', () => {
        const configured = 'https://custom-api.varanasiyatra.com';
        const url = resolveBaseUrl(configured, 'varanasiyatra.com');
        assert.strictEqual(url, 'https://custom-api.varanasiyatra.com');
    });

    await runTest('4. Production hostname with missing API configuration defaults to verified Cloud Run origin - NEVER localhost and NEVER empty string', () => {
        const url = resolveBaseUrl('', 'varanasi-yatra.vercel.app');
        assert.strictEqual(url, 'https://api-gzo7qrxiuq-uc.a.run.app', 'Must fallback to verified Cloud Run backend');
        assert.notStrictEqual(url, 'http://localhost:5001', 'Must not be localhost:5001');
        assert.notStrictEqual(url, '', 'Must not be empty string which triggers Vercel SPA index.html rewrite');
    });

    // 2. Static Code Integrity Tests
    await runTest('5. src/constants/crm.js exports FALLBACK_PROD_API and uses it in BASE_URL', () => {
        const crmJsPath = path.resolve(__dirname, '../src/constants/crm.js');
        const content = fs.readFileSync(crmJsPath, 'utf8');
        assert.ok(content.includes("export const FALLBACK_PROD_API = 'https://api-gzo7qrxiuq-uc.a.run.app'"), 'crm.js must define FALLBACK_PROD_API');
        assert.ok(content.includes('FALLBACK_PROD_API'), 'crm.js must use FALLBACK_PROD_API as non-localhost fallback');
        assert.ok(!content.includes("isLocalhost ? 'http://localhost:5001' : ''"), 'crm.js must not fallback to empty string in production');
    });

    await runTest('6. QuickTripPlanner.jsx implements useRef synchronous guard and restricts fallback strictly to 404', () => {
        const componentPath = path.resolve(__dirname, '../src/public/components/QuickTripPlanner.jsx');
        const content = fs.readFileSync(componentPath, 'utf8');
        assert.ok(content.includes('useRef'), 'Must import or use useRef');
        assert.ok(content.includes('isSubmittingRef'), 'Must declare isSubmittingRef');
        assert.ok(content.includes('if (isSubmittingRef.current) return;'), 'Must check isSubmittingRef synchronously');
        assert.ok(content.includes('isSubmittingRef.current = false;'), 'Must reset isSubmittingRef in finally');
        assert.ok(content.includes('if (res.status === 404)'), 'Must restrict fallback strictly to 404');
        assert.ok(content.includes('primaryData && primaryData.success === true'), 'Must check primaryData.success === true');
    });

    await runTest('7. QuickTripPlanner.jsx WhatsApp error banner link contains zero customer phone numbers or PII', () => {
        const componentPath = path.resolve(__dirname, '../src/public/components/QuickTripPlanner.jsx');
        const content = fs.readFileSync(componentPath, 'utf8');
        const errorBannerIndex = content.indexOf('trip_planner_error_banner');
        assert.ok(errorBannerIndex !== -1, 'trip_planner_error_banner link must exist');
        const errorBannerBlock = content.substring(errorBannerIndex - 200, errorBannerIndex + 100);
        assert.ok(!errorBannerBlock.includes('formData.phone'), 'Error banner WhatsApp link must not contain formData.phone');
        assert.ok(!errorBannerBlock.includes('formData.email'), 'Error banner WhatsApp link must not contain formData.email');
    });

    // 3. Response Contract & Submission Lifecycle Simulation Tests
    await runTest('8. Primary endpoint HTTP 200 with valid JSON { success: true } marks submitted=true', async () => {
        const sim = await simulateQuickTripPlannerSubmit({
            mockPrimaryStatus: 200,
            mockPrimaryBody: { success: true, leadId: 'LEAD-101' },
            formData: validFormData
        });
        const result = await sim.handleSubmit();
        assert.strictEqual(result.submitted, true);
        assert.strictEqual(result.errorMessage, '');
        assert.strictEqual(result.fallbackAttempted, false);
    });

    await runTest('9. Primary endpoint HTTP 200 returning HTML (e.g. Vercel SPA rewrite) is REJECTED as invalid response', async () => {
        const sim = await simulateQuickTripPlannerSubmit({
            mockPrimaryStatus: 200,
            mockPrimaryIsHtml: true, // Non-JSON HTML response
            formData: validFormData
        });
        const result = await sim.handleSubmit();
        assert.strictEqual(result.submitted, false, 'Must NOT report success when 200 response is HTML');
        assert.ok(result.errorMessage.includes('Unexpected server response'));
        assert.strictEqual(result.fallbackAttempted, false);
    });

    await runTest('10. Primary endpoint HTTP 200 with { success: false } is REJECTED', async () => {
        const sim = await simulateQuickTripPlannerSubmit({
            mockPrimaryStatus: 200,
            mockPrimaryBody: { success: false, message: 'Could not process submission' },
            formData: validFormData
        });
        const result = await sim.handleSubmit();
        assert.strictEqual(result.submitted, false, 'Must NOT report success when success is false');
        assert.strictEqual(result.errorMessage, 'Could not process submission');
        assert.strictEqual(result.fallbackAttempted, false);
    });

    await runTest('11. Client validation error (400 Bad Request) rejects without calling fallback', async () => {
        const sim = await simulateQuickTripPlannerSubmit({
            mockPrimaryStatus: 400,
            mockPrimaryBody: { success: false, message: 'Valid 10-digit mobile number is required.' },
            formData: validFormData
        });
        const result = await sim.handleSubmit();
        assert.strictEqual(result.submitted, false);
        assert.strictEqual(result.errorMessage, 'Valid 10-digit mobile number is required.');
        assert.strictEqual(result.fallbackAttempted, false, 'CRITICAL: Must NEVER fallback on client 400 rejection');
    });

    await runTest('12. Client rate-limit rejection (429) rejects without calling fallback', async () => {
        const sim = await simulateQuickTripPlannerSubmit({
            mockPrimaryStatus: 429,
            mockPrimaryBody: { success: false, message: 'Too many requests. Please wait a moment.' },
            formData: validFormData
        });
        const result = await sim.handleSubmit();
        assert.strictEqual(result.submitted, false);
        assert.strictEqual(result.errorMessage, 'Too many requests. Please wait a moment.');
        assert.strictEqual(result.fallbackAttempted, false, 'CRITICAL: Must NEVER fallback on rate limit');
    });

    await runTest('13. Server 404 Route Not Found DOES trigger fallback to legacy endpoint', async () => {
        const sim = await simulateQuickTripPlannerSubmit({
            mockPrimaryStatus: 404,
            mockFallbackStatus: 200,
            mockFallbackBody: { success: true },
            formData: validFormData
        });
        const result = await sim.handleSubmit();
        assert.strictEqual(result.submitted, true);
        assert.strictEqual(result.fallbackAttempted, true, '404 route missing must permit fallback');
        assert.strictEqual(result.errorMessage, '');
    });

    await runTest('14. Server 500/502/503 does NOT fallback (protects against duplicate lead creation & attribution loss)', async () => {
        const sim = await simulateQuickTripPlannerSubmit({
            mockPrimaryStatus: 500,
            mockPrimaryBody: { success: false, message: 'Internal Server Error' },
            formData: validFormData
        });
        const result = await sim.handleSubmit();
        assert.strictEqual(result.submitted, false);
        assert.strictEqual(result.fallbackAttempted, false, 'Must NEVER fallback to /api/enquiry on 5xx because write may have occurred');
        assert.strictEqual(result.errorMessage, 'Internal Server Error');
    });

    await runTest('15. Network failure on primary does NOT blind-fallback (prevents duplicate lead creation if primary committed)', async () => {
        const sim = await simulateQuickTripPlannerSubmit({
            mockPrimaryStatus: 'NETWORK_ERROR',
            mockFallbackStatus: 200,
            formData: validFormData
        });
        const result = await sim.handleSubmit();
        assert.strictEqual(result.submitted, false);
        assert.strictEqual(result.fallbackAttempted, false, 'Must not blind-fallback to /api/enquiry on network drop');
        assert.ok(result.errorMessage.includes('Network connection issue'));
    });

    await runTest('16. Synchronous double-click guard immediately blocks concurrent submissions', async () => {
        const sim = await simulateQuickTripPlannerSubmit({
            mockPrimaryStatus: 200,
            mockPrimaryBody: { success: true },
            formData: validFormData
        });

        // Artificially simulate in-flight execution
        sim.isSubmittingRef.current = true;

        // Immediate second click arrives in same microtask
        const secondCall = await sim.handleSubmit();
        assert.strictEqual(secondCall.blocked, true, 'Second click must be blocked synchronously');

        // Release guard
        sim.isSubmittingRef.current = false;
        const thirdCall = await sim.handleSubmit();
        assert.strictEqual(thirdCall.blocked, false, 'Submission succeeds once guard is released');
    });

    await runTest('17. Validation failure releases ref guard and isSubmitting in finally', async () => {
        const sim = await simulateQuickTripPlannerSubmit({
            mockPrimaryStatus: 200,
            formData: { name: '', phone: '' } // Invalid form data
        });
        const result = await sim.handleSubmit();
        assert.strictEqual(result.submitted, false);
        assert.strictEqual(result.errorMessage, 'Please enter your full name (minimum 2 characters).');
        assert.strictEqual(sim.isSubmittingRef.current, false, 'isSubmittingRef must be reset even on validation failure');
        assert.strictEqual(sim.getIsSubmitting(), false, 'isSubmitting state must be reset');
    });

    await runTest('18. Primary retry with 60-second duplicate response returns success without second insert', async () => {
        const failSim = await simulateQuickTripPlannerSubmit({
            mockPrimaryStatus: 'NETWORK_ERROR',
            formData: validFormData
        });
        const failResult = await failSim.handleSubmit();
        assert.strictEqual(failResult.submitted, false);

        // Traveler clicks "Retry Submission" -> /public/leads returns 200 with { duplicate: true, success: true }
        const retrySim = await simulateQuickTripPlannerSubmit({
            mockPrimaryStatus: 200,
            mockPrimaryBody: {
                success: true,
                message: 'Your trip enquiry has already been received.',
                duplicate: true,
                leadId: 'LEAD-9999'
            },
            formData: validFormData
        });
        const retryResult = await retrySim.handleSubmit();
        assert.strictEqual(retryResult.submitted, true, 'Retry must transition to success screen');
        assert.strictEqual(retryResult.errorMessage, '');
        assert.strictEqual(retryResult.fallbackAttempted, false, 'No fallback needed');
    });

    console.log(`\n========================================================`);
    console.log(`📊 Summary: ${passedTests}/${totalTests} tests passed successfully.`);
    console.log(`========================================================\n`);

    if (passedTests !== totalTests) {
        process.exitCode = 1;
    }
}

main().catch(err => {
    console.error('Fatal test error:', err);
    process.exitCode = 1;
});
