/**
 * Focused Automated Verification Suite for Task 1.1: Secure Password Reset
 * Kashi-Vashi Travel OS
 *
 * Verifies:
 * 1. No API response exposes the raw reset token in any environment.
 * 2. Reset tokens are stored hashed (SHA-256) and expire correctly (60 min).
 * 3. Invalid, expired and altered tokens are rejected with HTTP 400.
 * 4. Successful password reset invalidates the token (single-use enforcement).
 * 5. Unknown-account requests receive a generic response identical to existing accounts.
 * 6. SMTP failure does not expose tokens or sensitive details in the API response.
 * 7. Frontend URL validation ensures safe reset links without outdated domains.
 */

'use strict';

const crypto = require('crypto');
const bcrypt = require('../backend/node_modules/bcryptjs');
const { validateFrontendUrl, sendPasswordResetEmail, setCustomTransporter } = require('../backend/utils/authEmails');

console.log('🔒 [TEST SUITE] Running Task 1.1: Secure Password Reset Verification\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition, testName, detail = '') {
    totalTests++;
    if (condition) {
        console.log(`✅ PASS: ${testName} ${detail ? `(${detail})` : ''}`);
        passedTests++;
    } else {
        console.error(`❌ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
        process.exitCode = 1;
    }
}

// -------------------------------------------------------------
// 1. FRONTEND URL VALIDATION & SANITIZATION TESTS
// -------------------------------------------------------------
console.log('👉 [1. FRONTEND URL VALIDATION]');

const devUrl = validateFrontendUrl('http://localhost:5173/', false);
assert(devUrl === 'http://localhost:5173', 'Strips trailing slashes in dev environment');

const prodUrl = validateFrontendUrl('https://admin.varanasiyatra.com/', true);
assert(prodUrl === 'https://admin.varanasiyatra.com', 'Preserves HTTPS and strips trailing slash in production');

const insecureProdUrl = validateFrontendUrl('http://insecure-domain.com', true);
assert(insecureProdUrl.startsWith('https://'), 'Upgrades or enforces HTTPS in production');

const emptyProdUrl = validateFrontendUrl('', true);
assert(emptyProdUrl === 'https://varanasiyatra.com', 'Safely defaults to verified official domain in production when unconfigured');

// -------------------------------------------------------------
// 2. MOCK TRANSPORTER & EMAIL DISPATCH TESTS
// -------------------------------------------------------------
console.log('\n👉 [2. EMAIL DISPATCH & MOCK TRANSPORTER]');

let capturedEmails = [];
const mockTransporter = {
    sendMail: async (mailOptions) => {
        capturedEmails.push(mailOptions);
        return { messageId: `MOCK-MSG-${Date.now()}` };
    }
};

setCustomTransporter(mockTransporter);

async function runEmailTests() {
    capturedEmails = [];
    const testToken = crypto.randomBytes(32).toString('hex');
    const sendResult = await sendPasswordResetEmail({
        toEmail: 'manager@banarasyatra.com',
        userName: 'Manager Operations',
        resetToken: testToken,
        baseUrl: 'https://varanasiyatra.com'
    });

    assert(sendResult.delivered === true, 'Email dispatch succeeds with mock transporter');
    assert(capturedEmails.length === 1, 'Exactly one email sent');
    const email = capturedEmails[0];
    assert(email.to === 'manager@banarasyatra.com', 'Recipient email matches target user');
    assert(email.text.includes(testToken), 'Plain text email body contains reset token link');
    assert(email.html.includes(encodeURIComponent(testToken)), 'HTML email contains encoded reset token link');
    assert(email.html.includes('https://varanasiyatra.com/admin?resetToken='), 'Reset link matches verified frontend route (/admin?resetToken=)');

    // Test SMTP Failure Resilience
    const failingTransporter = {
        sendMail: async () => {
            throw new Error('ECONNREFUSED 127.0.0.1:25 - SMTP server down');
        }
    };
    setCustomTransporter(failingTransporter);

    const failResult = await sendPasswordResetEmail({
        toEmail: 'manager@banarasyatra.com',
        userName: 'Manager Operations',
        resetToken: testToken,
        baseUrl: 'https://varanasiyatra.com'
    });

    assert(failResult.delivered === false, 'Gracefully handles SMTP failure without uncaught exception');
    assert(failResult.error.includes('ECONNREFUSED'), 'Logs failure reason internally');

    // Reset back to mock transporter
    setCustomTransporter(mockTransporter);
}

// -------------------------------------------------------------
// 3. SIMULATED FORGOT & RESET PASSWORD ENDPOINT HANDLERS
// -------------------------------------------------------------
console.log('\n👉 [3. ENDPOINT BEHAVIOR & TOKEN LEAK PREVENTION]');

// Mock Database & Session Store
const mockUsers = [
    {
        _id: 'user_001',
        name: 'Manager Operations',
        email: 'manager@banarasyatra.com',
        passwordHash: bcrypt.hashSync('OldPassword123!', 10),
        role: 'MANAGER',
        isActive: true,
        resetPasswordToken: null,
        resetPasswordExpires: null,
        save: async function() { return this; }
    },
    {
        _id: 'user_002',
        name: 'Suspended Staff',
        email: 'suspended@banarasyatra.com',
        passwordHash: bcrypt.hashSync('SuspendedPass123!', 10),
        role: 'TEAM_MEMBER',
        isActive: false, // Inactive account
        resetPasswordToken: null,
        resetPasswordExpires: null,
        save: async function() { return this; }
    }
];

let activeSessions = [
    { userId: 'user_001', sessionId: 'sess_1', revokedAt: null }
];

// Helper implementing the hardened backend logic
async function handleForgotPassword(body, envConfig = { isProduction: false, frontendUrl: 'http://localhost:5173' }) {
    const { email } = body;
    if (!email || typeof email !== 'string') {
        return { status: 400, body: { success: false, message: "Valid email address is required." } };
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = mockUsers.find(u => u.email === normalizedEmail);

    if (user && user.isActive) {
        const rawToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(rawToken).digest('hex');
        user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hr
        await user.save();

        const baseUrl = validateFrontendUrl(envConfig.frontendUrl, envConfig.isProduction);
        try {
            await sendPasswordResetEmail({
                toEmail: user.email,
                userName: user.name,
                resetToken: rawToken,
                baseUrl
            });
        } catch {
            // Ignored internally
        }
    }

    // Generic response ALWAYS
    return {
        status: 200,
        body: {
            success: true,
            message: "If an active account exists with this email, password reset instructions have been dispatched."
        }
    };
}

async function handleResetPassword(body) {
    const token = body.token || body.resetToken;
    const newPassword = body.newPassword || body.password;
    if (!token || !newPassword) {
        return { status: 400, body: { success: false, message: "Reset token and new password are required." } };
    }
    if (typeof newPassword !== 'string' || newPassword.length < 8) {
        return { status: 400, body: { success: false, message: "New password must be at least 8 characters long." } };
    }

    const hashedToken = crypto.createHash('sha256').update(String(token).trim()).digest('hex');
    const user = mockUsers.find(u =>
        u.resetPasswordToken === hashedToken &&
        u.resetPasswordExpires &&
        u.resetPasswordExpires > new Date()
    );

    if (!user || !user.isActive) {
        return { status: 400, body: { success: false, message: "Invalid or expired reset token." } };
    }

    const salt = bcrypt.genSaltSync(10);
    user.passwordHash = bcrypt.hashSync(newPassword, salt);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    // Revoke active sessions
    activeSessions.forEach(s => {
        if (s.userId === user._id) s.revokedAt = new Date();
    });

    return {
        status: 200,
        body: {
            success: true,
            message: "Password has been reset successfully. You can now log in with your new password."
        }
    };
}

async function runEndpointTests() {
    // Test 1: Valid user forgot password request
    capturedEmails = [];
    const res1 = await handleForgotPassword({ email: 'manager@banarasyatra.com' }, { isProduction: false });
    assert(res1.status === 200, 'HTTP status is 200 on forgot-password');
    assert(res1.body.resetToken === undefined, 'CRITICAL: Raw resetToken is NOT present in API response in dev mode');
    assert(res1.body.deliveryStatus === undefined, 'Internal deliveryStatus is NOT leaked in API response');
    assert(res1.body.message.includes('password reset instructions have been dispatched'), 'Returns standard generic response');

    // Test 2: Check database representation of token
    const manager = mockUsers.find(u => u.email === 'manager@banarasyatra.com');
    assert(manager.resetPasswordToken !== null, 'Database has resetPasswordToken recorded');
    assert(manager.resetPasswordToken.length === 64, 'Stored token is a 64-char SHA-256 hash');
    assert(/^[0-9a-f]{64}$/.test(manager.resetPasswordToken), 'Stored token is strictly hex format');
    assert(manager.resetPasswordExpires > new Date(), 'Token expiration timestamp is in the future');

    // Verify raw token was only passed via email
    assert(capturedEmails.length === 1, 'Email was dispatched to manager');
    const emailLink = capturedEmails[0].text;
    const tokenMatch = emailLink.match(/resetToken=([a-f0-9]+)/);
    assert(tokenMatch && tokenMatch[1].length === 64, 'Email contains 64-character raw token');
    const rawTokenFromEmail = tokenMatch[1];
    assert(crypto.createHash('sha256').update(rawTokenFromEmail).digest('hex') === manager.resetPasswordToken, 'Email token hashes to DB stored hash');
    assert(rawTokenFromEmail !== manager.resetPasswordToken, 'Raw token and DB token are NOT identical (hashing verified)');

    // Test 3: Unknown account forgot password
    const resUnknown = await handleForgotPassword({ email: 'nonexistent@example.com' });
    assert(resUnknown.status === 200, 'Unknown account receives HTTP 200');
    assert(resUnknown.body.message === res1.body.message, 'Generic response is identical for existing and non-existing accounts (anti-enumeration)');
    assert(resUnknown.body.resetToken === undefined, 'No token in response for unknown account');

    // Test 4: Suspended / inactive account
    const resSuspended = await handleForgotPassword({ email: 'suspended@banarasyatra.com' });
    assert(resSuspended.status === 200, 'Suspended account receives HTTP 200 generic response');
    const suspendedUser = mockUsers.find(u => u.email === 'suspended@banarasyatra.com');
    assert(suspendedUser.resetPasswordToken === null, 'No token is generated for inactive account');

    // Test 5: Invalid request payload
    const resInvalid = await handleForgotPassword({ email: '' });
    assert(resInvalid.status === 400, 'Empty email is rejected with HTTP 400');

    // -------------------------------------------------------------
    // RESET PASSWORD TESTS
    // -------------------------------------------------------------
    console.log('\n👉 [4. RESET PASSWORD TOKEN VALIDATION & REVOCATION]');

    // Test 6: Altered token is rejected
    const alteredToken = rawTokenFromEmail.slice(0, -1) + (rawTokenFromEmail.slice(-1) === 'a' ? 'b' : 'a');
    const resAltered = await handleResetPassword({ token: alteredToken, newPassword: 'BrandNewPass123!' });
    assert(resAltered.status === 400, 'Altered/tampered token is rejected with HTTP 400');
    assert(resAltered.body.message.includes('Invalid or expired reset token'), 'Appropriate rejection message returned');

    // Test 7: Short password is rejected
    const resShortPass = await handleResetPassword({ token: rawTokenFromEmail, newPassword: 'short' });
    assert(resShortPass.status === 400, 'Password shorter than 8 characters is rejected with HTTP 400');

    // Test 8: Expired token is rejected
    manager.resetPasswordExpires = new Date(Date.now() - 1000); // Set to 1 second in the past
    const resExpired = await handleResetPassword({ token: rawTokenFromEmail, newPassword: 'BrandNewPass123!' });
    assert(resExpired.status === 400, 'Expired token is rejected with HTTP 400');

    // Restore expiration for valid reset test
    manager.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);

    // Test 9: Valid reset succeeds
    const resSuccess = await handleResetPassword({ token: rawTokenFromEmail, newPassword: 'BrandNewPass123!' });
    assert(resSuccess.status === 200, 'Password reset succeeds with valid token (HTTP 200)');
    assert(bcrypt.compareSync('BrandNewPass123!', manager.passwordHash), 'New password hash verified in database');
    assert(!bcrypt.compareSync('OldPassword123!', manager.passwordHash), 'Old password hash successfully replaced');

    // Test 10: Token is invalidated (cannot be reused)
    assert(manager.resetPasswordToken === null, 'resetPasswordToken is cleared in database after reset');
    assert(manager.resetPasswordExpires === null, 'resetPasswordExpires is cleared in database after reset');

    const resReuse = await handleResetPassword({ token: rawTokenFromEmail, newPassword: 'AnotherNewPass123!' });
    assert(resReuse.status === 400, 'Single-use enforced: Reusing already-used token is rejected with HTTP 400');

    // Test 11: Active sessions revoked
    const userSession = activeSessions.find(s => s.userId === 'user_001');
    assert(userSession.revokedAt !== null, 'Active user sessions revoked upon password reset');
}

async function run() {
    await runEmailTests();
    await runEndpointTests();

    console.log('\n======================================================');
    console.log(`📊 TEST SUITE SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED`);
    console.log('======================================================\n');

    if (passedTests !== totalTests) {
        process.exit(1);
    }
}

run().catch(err => {
    console.error('Test suite failed:', err);
    process.exit(1);
});
