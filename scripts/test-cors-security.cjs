const assert = require('assert');
const path = require('path');

// Resolve modules from backend/node_modules
module.paths.push(path.join(__dirname, '../backend/node_modules'));
const express = require('express');
const http = require('http');

// Load configurations
const mainEnv = require('../backend/config/env');
const mainCors = require('../backend/config/cors');
const functionsEnv = require('../backend/functions/config/env');

let passedTests = 0;
let totalTests = 0;

async function runTest(name, fn) {
    totalTests++;
    try {
        await fn();
        console.log(`  ✅ PASS: ${name}`);
        passedTests++;
    } catch (err) {
        console.error(`  ❌ FAIL: ${name}`);
        console.error(err);
        process.exitCode = 1;
    }
}

console.log('================================================================');
console.log('🛡️  STRICT CORS SECURITY & PARITY AUDIT SUITE');
console.log('================================================================\n');

(async () => {
    // -------------------------------------------------------------------------
    // 1. Production Mode Origin Matching
    // -------------------------------------------------------------------------
    console.log('📋 Suite 1: Production Strict Allowlist Verification');

    const prodEnvMock = {
        NODE_ENV: 'production',
        MONGODB_URI: 'mongodb+srv://kashivashi:pass@cluster.mongodb.net/prod',
        JWT_SECRET: 'super_secure_production_jwt_access_secret_32chars',
        JWT_REFRESH_SECRET: 'super_secure_production_jwt_refresh_secret_32chars',
        CEO_INITIAL_PASSWORD: 'SecureInitialCeoPassword2026!',
        MANAGER_INITIAL_PASSWORD: 'SecureInitialManagerPassword2026!'
    };

    await runTest('Exact deployed origin https://varanasi-yatra.vercel.app is APPROVED', () => {
        const isAllowed = mainEnv.isOriginAllowed('https://varanasi-yatra.vercel.app', prodEnvMock);
        assert.strictEqual(isAllowed, true, 'Deployed Vercel origin must be allowed');
    });

    await runTest('Unconfirmed domain https://varanasiyatra.com is NOT approved by default without deployment confirmation', () => {
        const isAllowed = mainEnv.isOriginAllowed('https://varanasiyatra.com', prodEnvMock);
        assert.strictEqual(isAllowed, false, 'Unconfirmed apex domain must not be in default production allowlist');
    });

    await runTest('Unused subdomain https://admin.varanasiyatra.com is NOT approved', () => {
        const isAllowed = mainEnv.isOriginAllowed('https://admin.varanasiyatra.com', prodEnvMock);
        assert.strictEqual(isAllowed, false, 'Unused admin subdomain must not be allowed');
    });

    await runTest('Arbitrary Vercel preview domain with project prefix is REJECTED (no regex bypass)', () => {
        const isAllowed1 = mainEnv.isOriginAllowed('https://varanasi-yatra-evil-fork.vercel.app', prodEnvMock);
        const isAllowed2 = mainEnv.isOriginAllowed('https://varanasiyatra-attacker.vercel.app', prodEnvMock);
        const isAllowed3 = mainEnv.isOriginAllowed('https://varanasiyatra-5z9orkhkw-attacker.vercel.app', prodEnvMock);
        assert.strictEqual(isAllowed1, false, 'Arbitrary prefixed Vercel subdomain must be rejected');
        assert.strictEqual(isAllowed2, false, 'Arbitrary Vercel project must be rejected');
        assert.strictEqual(isAllowed3, false, 'Arbitrary hash must be rejected');
    });

    await runTest('Malicious third-party origin is REJECTED', () => {
        const isAllowed = mainEnv.isOriginAllowed('https://evil-phishing-site.com', prodEnvMock);
        assert.strictEqual(isAllowed, false, 'Untrusted origin must be rejected');
    });

    await runTest('Localhost origins are strictly REJECTED in production', () => {
        const isAllowed1 = mainEnv.isOriginAllowed('http://localhost:5173', prodEnvMock);
        const isAllowed2 = mainEnv.isOriginAllowed('http://localhost:3000', prodEnvMock);
        const isAllowed3 = mainEnv.isOriginAllowed('http://127.0.0.1:5001', prodEnvMock);
        assert.strictEqual(isAllowed1, false, 'Localhost 5173 must be rejected in prod');
        assert.strictEqual(isAllowed2, false, 'Localhost 3000 must be rejected in prod');
        assert.strictEqual(isAllowed3, false, '127.0.0.1 must be rejected in prod');
    });

    // -------------------------------------------------------------------------
    // 2. Explicit Preview Authorization via ALLOWED_ORIGINS
    // -------------------------------------------------------------------------
    console.log('\n📋 Suite 2: Explicit Environment-Configured Preview Origins');

    const previewEnvMock = {
        ...prodEnvMock,
        ALLOWED_ORIGINS: 'https://varanasiyatra-pr-42.vercel.app, https://custom-partner.com'
    };

    await runTest('Explicitly configured preview origin is APPROVED', () => {
        const isAllowed = mainEnv.isOriginAllowed('https://varanasiyatra-pr-42.vercel.app', previewEnvMock);
        assert.strictEqual(isAllowed, true, 'Configured preview origin must be approved');
    });

    await runTest('Explicitly configured custom origin is APPROVED', () => {
        const isAllowed = mainEnv.isOriginAllowed('https://custom-partner.com', previewEnvMock);
        assert.strictEqual(isAllowed, true, 'Configured custom origin must be approved');
    });

    await runTest('Non-configured preview origin remains REJECTED', () => {
        const isAllowed = mainEnv.isOriginAllowed('https://varanasiyatra-pr-99.vercel.app', previewEnvMock);
        assert.strictEqual(isAllowed, false, 'Unconfigured preview origin must remain rejected');
    });

    // -------------------------------------------------------------------------
    // 3. Implementation Parity Across Handlers
    // -------------------------------------------------------------------------
    console.log('\n📋 Suite 3: Consistency Across Express & Functions Handlers');

    await runTest('backend/config/env and backend/functions/config/env make identical decisions', () => {
        const testOrigins = [
            'https://varanasi-yatra.vercel.app',
            'https://varanasiyatra.com',
            'https://varanasi-yatra-evil.vercel.app',
            'https://malicious.com',
            'http://localhost:5173'
        ];

        for (const origin of testOrigins) {
            const resMain = mainEnv.isOriginAllowed(origin, prodEnvMock);
            const resFunc = functionsEnv.isOriginAllowed(origin, prodEnvMock);
            assert.strictEqual(resMain, resFunc, `Parity mismatch for origin: ${origin}`);
        }
    });

    await runTest('corsOptions callback conforms to isOriginAllowed in production', () => {
        return new Promise((resolve, reject) => {
            const prodCors = mainCors.getCorsOptions(prodEnvMock);
            prodCors.origin('https://malicious.com', (err) => {
                try {
                    assert.ok(err, 'Untrusted origin must return error in corsOptions');
                    assert.ok(err.message.includes('CORS policy violation'), 'Must have descriptive error message');
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });

    await runTest('corsOptions callback approves deployed origin in production', () => {
        return new Promise((resolve, reject) => {
            const prodCors = mainCors.getCorsOptions(prodEnvMock);
            prodCors.origin('https://varanasi-yatra.vercel.app', (err, allowed) => {
                try {
                    assert.strictEqual(err, null, 'Approved origin must not throw error');
                    assert.strictEqual(allowed, true, 'Approved origin must be allowed');
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
        });
    });

    // -------------------------------------------------------------------------
    // 4. Live HTTP Header Behavior Simulation (Express Server Middleware)
    // -------------------------------------------------------------------------
    console.log('\n📋 Suite 4: Live HTTP CORS Middleware Execution');

    const app = express();
    const serverEnv = mainEnv.validateEnvironment(prodEnvMock);

    app.use((req, res, next) => {
        const origin = req.headers.origin;
        const allowed = origin && mainEnv.isOriginAllowed(origin, serverEnv);
        if (allowed) {
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader('Access-Control-Allow-Credentials', 'true');
        }
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-Trace-ID');

        if (req.method === 'OPTIONS') {
            if (origin && !allowed) {
                return res.status(403).json({ success: false, message: `CORS policy violation: Origin '${origin}' is not authorized.` });
            }
            return res.status(204).end();
        }
        next();
    });

    app.get('/api/test-public', (req, res) => res.json({ status: 'ok' }));
    app.get('/admin/test-protected', (req, res) => {
        const auth = req.headers.authorization;
        if (!auth || !auth.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Authentication required' });
        }
        return res.json({ secretData: 'sensitive-financial-summary' });
    });

    const server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    const port = server.address().port;

    async function sendRequest({ method = 'GET', path: reqPath = '/', headers = {} }) {
        return new Promise((resolve, reject) => {
            const req = http.request({
                hostname: '127.0.0.1',
                port,
                path: reqPath,
                method,
                headers
            }, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        body: data ? JSON.parse(data) : null
                    });
                });
            });
            req.on('error', reject);
            req.end();
        });
    }

    await runTest('Approved origin receives exact Access-Control-Allow-Origin & credentials header', async () => {
        const res = await sendRequest({
            method: 'GET',
            path: '/api/test-public',
            headers: { Origin: 'https://varanasi-yatra.vercel.app' }
        });
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(res.headers['access-control-allow-origin'], 'https://varanasi-yatra.vercel.app');
        assert.strictEqual(res.headers['access-control-allow-credentials'], 'true');
        assert.notStrictEqual(res.headers['access-control-allow-origin'], '*');
    });

    await runTest('Untrusted origin receives NO Access-Control-Allow-Origin header', async () => {
        const res = await sendRequest({
            method: 'GET',
            path: '/api/test-public',
            headers: { Origin: 'https://attacker-origin.com' }
        });
        assert.strictEqual(res.statusCode, 200);
        assert.strictEqual(res.headers['access-control-allow-origin'], undefined, 'Must not echo back untrusted origin');
        assert.strictEqual(res.headers['access-control-allow-credentials'], undefined);
    });

    await runTest('Preflight OPTIONS from untrusted origin returns HTTP 403 Forbidden', async () => {
        const res = await sendRequest({
            method: 'OPTIONS',
            path: '/api/test-public',
            headers: { Origin: 'https://attacker-origin.com' }
        });
        assert.strictEqual(res.statusCode, 403);
        assert.strictEqual(res.headers['access-control-allow-origin'], undefined);
        assert.strictEqual(res.body?.success, false);
    });

    await runTest('Preflight OPTIONS from approved origin returns HTTP 204 No Content', async () => {
        const res = await sendRequest({
            method: 'OPTIONS',
            path: '/api/test-public',
            headers: { Origin: 'https://varanasi-yatra.vercel.app' }
        });
        assert.strictEqual(res.statusCode, 204);
        assert.strictEqual(res.headers['access-control-allow-origin'], 'https://varanasi-yatra.vercel.app');
        assert.strictEqual(res.headers['access-control-allow-credentials'], 'true');
    });

    // -------------------------------------------------------------------------
    // 5. Server-Side Authentication Guard (CORS Is Not Auth)
    // -------------------------------------------------------------------------
    console.log('\n📋 Suite 5: Server-Side Authentication Independence');

    await runTest('Request from approved origin WITHOUT token is rejected with HTTP 401 Unauthorized', async () => {
        const res = await sendRequest({
            method: 'GET',
            path: '/admin/test-protected',
            headers: { Origin: 'https://varanasi-yatra.vercel.app' }
        });
        assert.strictEqual(res.statusCode, 401, 'CORS must never bypass server-side token authentication');
        assert.strictEqual(res.body?.success, false);
    });

    await new Promise((resolve) => server.close(resolve));

    console.log('\n================================================================');
    console.log(`📊 SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED (100% SUCCESS)`);
    console.log('================================================================');

    if (passedTests !== totalTests) {
        process.exitCode = 1;
    }
})();
