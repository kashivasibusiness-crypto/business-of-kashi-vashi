/**
 * Authentication Email Dispatcher & Safe Link Generator
 * Kashi-Vashi Travel OS — Security Hardening (Task 1.1)
 */

const nodemailer = require('nodemailer');

let customTransporter = null;

function setCustomTransporter(mockTransporter) {
    customTransporter = mockTransporter;
}

function getMailTransporter() {
    if (customTransporter) {
        return customTransporter;
    }

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    return null;
}

function validateFrontendUrl(configuredUrl, isProduction = false) {
    let url = String(configuredUrl || '').trim();
    if (!url) {
        url = isProduction ? 'https://varanasiyatra.com' : 'http://localhost:5173';
    }

    // Strip trailing slash
    url = url.replace(/\/+$/, '');

    // Validate URL syntax
    try {
        const parsed = new URL(url);
        if (isProduction && parsed.protocol !== 'https:') {
            console.warn(`⚠️ [AUTH] Insecure frontend URL '${url}' in production. Enforcing https://`);
            parsed.protocol = 'https:';
            return parsed.origin;
        }
        return parsed.origin;
    } catch {
        return isProduction ? 'https://varanasiyatra.com' : 'http://localhost:5173';
    }
}

async function sendPasswordResetEmail({ toEmail, userName, resetToken, baseUrl }) {
    const transporter = getMailTransporter();
    if (!transporter) {
        const masked = String(toEmail || '').replace(/(.{2})(.*)(@.*)/, '$1***$3');
        console.warn(`⚠️ [AUTH] Email transporter not configured. Cannot dispatch reset email to ${masked}.`);
        return { delivered: false, reason: 'SMTP_NOT_CONFIGURED' };
    }

    const resetUrl = `${baseUrl}/admin?resetToken=${encodeURIComponent(resetToken)}`;

    const mailOptions = {
        from: `"Kashi-Vashi Security" <${process.env.EMAIL_FROM || process.env.EMAIL_USER || process.env.SMTP_USER || 'no-reply@varanasiyatra.com'}>`,
        to: toEmail,
        subject: '🔒 Reset Your Kashi-Vashi Travel OS Password',
        text: `Hello ${userName || 'Team Member'},\n\nA password reset was requested for your Kashi-Vashi Travel OS account.\n\nClick the link below to set a new password:\n${resetUrl}\n\nThis link will expire in 60 minutes.\nIf you did not request this, you can safely ignore this email.\n\nKashi-Vashi Operations Center`,
        html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; color: #1e293b; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px;">
                <div style="text-align: center; margin-bottom: 24px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px;">
                    <h2 style="color: #ea580c; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">KASHI-VASHI 🚩</h2>
                    <p style="color: #64748b; font-size: 12px; margin: 4px 0 0; font-style: italic;">Spiritual & Heritage Journeys · Travel OS</p>
                </div>
                <h3 style="color: #0f172a; margin-top: 0; font-size: 17px;">Password Recovery Request</h3>
                <p style="font-size: 14px; line-height: 1.6; color: #334155;">Hello <strong>${userName || 'Team Member'}</strong>,</p>
                <p style="font-size: 14px; line-height: 1.6; color: #334155;">A password reset request was initiated for your Kashi-Vashi CRM account. Click the button below to set a new secure password:</p>
                <div style="text-align: center; margin: 28px 0;">
                    <a href="${resetUrl}" style="background-color: #ea580c; color: #ffffff; padding: 13px 32px; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 14px; display: inline-block; box-shadow: 0 2px 4px rgba(234, 88, 12, 0.2);">Reset My Password</a>
                </div>
                <p style="font-size: 12px; line-height: 1.5; color: #64748b;">This link is valid for <strong>60 minutes</strong> and can only be used once. If you did not make this request, no action is needed — your existing password remains secure.</p>
                <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #f1f5f9; text-align: center; font-size: 11px; color: #94a3b8;">
                    Kashi-Vashi Travel Operations Center · Automated System Security Notification
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        const masked = String(toEmail || '').replace(/(.{2})(.*)(@.*)/, '$1***$3');
        console.log(`✉️ [AUTH] Password reset email dispatched to ${masked}. MessageId: ${info?.messageId || 'DISPATCHED'}`);
        return { delivered: true, messageId: info?.messageId };
    } catch (err) {
        console.error(`❌ [AUTH] Failed to dispatch password reset email: ${err.message}`);
        return { delivered: false, error: err.message };
    }
}

module.exports = {
    validateFrontendUrl,
    getMailTransporter,
    setCustomTransporter,
    sendPasswordResetEmail
};
