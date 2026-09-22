import React, { useState, useEffect } from 'react';
import { crmApi, tokenStorage } from '../../../services/crmApi';
import logo from '../../../assets/logo.png';
import assiMorningImg from '../../../assets/ExperienceVaranasi/AssiMorning.avif';
import gangaAartiImg from '../../../assets/ExperienceVaranasi/GangaAarti.avif';

/**
 * Authentic 3D Physical Book CRM Login Experience (Kashi Vashi)
 * - Scene 1: Closed leather-bound book flies into view from deep 3D perspective and hovers at center
 * - Scene 2: Book opens majestically from the center spine into a two-page spread
 * - Scene 3: Open book spread with central spine, gutter shadows, and bookmark ribbon
 * - Scene 4: Manager selected -> Right physical page lifts and turns forward across spine (-180deg)
 * - Scene 5: CEO selected -> Left physical page lifts and turns backward across spine (+180deg)
 * - Zero content flash/flicker: Pre-rendered beds underneath turning double-sided leaf
 */
export default function CRMLoginScreen({ onLoginSuccess }) {
    const [role, setRole] = useState('MANAGER'); // 'CEO' | 'MANAGER'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // 📖 5-Phase Physical Book State Machine:
    // 'FLYING' -> 'LANDING' -> 'OPENING' -> 'OPEN' | 'FLIPPING_NEXT' | 'FLIPPING_PREV'
    const [animationState, setAnimationState] = useState('FLYING');

    useEffect(() => {
        // Stage 1: Closed book glides forward from 3D space (0 to 800ms)
        const landTimer = setTimeout(() => {
            setAnimationState('LANDING');
        }, 800);

        // Stage 2: Sits at center stage, begins opening from spine (1000ms)
        const openTimer = setTimeout(() => {
            setAnimationState('OPENING');
        }, 1000);

        // Stage 3: Fully open spread settles into active interactive state (1850ms)
        const readyTimer = setTimeout(() => {
            setAnimationState('OPEN');
        }, 1850);

        return () => {
            clearTimeout(landTimer);
            clearTimeout(openTimer);
            clearTimeout(readyTimer);
        };
    }, []);

    // Forgot Password Flow State
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetStep, setResetStep] = useState(1); // 1 = request token, 2 = enter new password
    const [resetLoading, setResetLoading] = useState(false);
    const [resetMessage, setResetMessage] = useState('');
    const [resetError, setResetError] = useState('');

    const isActionLocked = animationState !== 'OPEN';

    // 📖 Double-Sided Physical Page Turn Transitions
    const handleRoleChange = (newRole) => {
        if (newRole === role || isActionLocked) return;

        setErrorMsg('');
        setSuccessMsg('');

        if (newRole === 'MANAGER') {
            // Turning forward to Manager (Right leaf turns forward: 0deg -> -180deg)
            setAnimationState('FLIPPING_NEXT');
            setTimeout(() => {
                setRole('MANAGER');
                setAnimationState('OPEN');
            }, 740);
        } else {
            // Turning backward to CEO (Left leaf turns backward: 0deg -> +180deg)
            setAnimationState('FLIPPING_PREV');
            setTimeout(() => {
                setRole('CEO');
                setAnimationState('OPEN');
            }, 740);
        }
    };

    const handleFillDemo = (targetRole) => {
        if (targetRole === role) {
            if (targetRole === 'CEO') {
                setEmail('ceo@banarasyatra.com');
                setPassword('CeoSecurePass123!');
            } else {
                setEmail('manager@banarasyatra.com');
                setPassword('ManagerSecurePass123!');
            }
            setErrorMsg('');
            return;
        }

        if (isActionLocked) return;

        if (targetRole === 'MANAGER') {
            setAnimationState('FLIPPING_NEXT');
            setTimeout(() => {
                setRole('MANAGER');
                setEmail('manager@banarasyatra.com');
                setPassword('ManagerSecurePass123!');
                setAnimationState('OPEN');
            }, 740);
        } else {
            setAnimationState('FLIPPING_PREV');
            setTimeout(() => {
                setRole('CEO');
                setEmail('ceo@banarasyatra.com');
                setPassword('CeoSecurePass123!');
                setAnimationState('OPEN');
            }, 740);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');

        if (!email.trim() || !password) {
            setErrorMsg('Please enter both email and password.');
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await crmApi.login({
                email: email.trim(),
                password,
                loginMode: role
            });

            if (res.success && res.token) {
                tokenStorage.setSession(res.token, res.refreshToken, res.user);
                setSuccessMsg('Authentication successful. Loading CRM...');
                if (onLoginSuccess) {
                    onLoginSuccess({ user: res.user, token: res.token, refreshToken: res.refreshToken });
                }
            } else {
                setErrorMsg(res.message || 'Authentication failed. Please check your credentials.');
            }
        } catch (err) {
            setErrorMsg(err.message || 'Connection failed. Please verify the backend server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRequestResetToken = async (e) => {
        e.preventDefault();
        setResetError('');
        setResetMessage('');
        if (!resetEmail.trim()) {
            setResetError('Please enter your account email.');
            return;
        }

        setResetLoading(true);
        try {
            const res = await crmApi.forgotPassword({ email: resetEmail.trim() });
            if (res.success) {
                setResetMessage('Reset instructions generated! You can now set a new password.');
                if (res.resetToken) {
                    setResetToken(res.resetToken);
                }
                setResetStep(2);
            } else {
                setResetError(res.message || 'Failed to process password reset.');
            }
        } catch (err) {
            setResetError(err.message || 'Failed to request reset instructions.');
        } finally {
            setResetLoading(false);
        }
    };

    const handleConfirmReset = async (e) => {
        e.preventDefault();
        setResetError('');
        setResetMessage('');
        if (!resetToken.trim() || !newPassword) {
            setResetError('Reset token and new password are required.');
            return;
        }
        if (newPassword.length < 8) {
            setResetError('New password must be at least 8 characters long.');
            return;
        }

        setResetLoading(true);
        try {
            const res = await crmApi.resetPassword({
                token: resetToken.trim(),
                newPassword
            });
            if (res.success) {
                setSuccessMsg('Password updated successfully! Please log in with your new password.');
                setIsForgotPasswordOpen(false);
                setResetStep(1);
                setResetEmail('');
                setResetToken('');
                setNewPassword('');
            } else {
                setResetError(res.message || 'Password reset failed.');
            }
        } catch (err) {
            setResetError(err.message || 'Password reset failed.');
        } finally {
            setResetLoading(false);
        }
    };

    // -------------------------------------------------------------
    // REUSABLE SUB-RENDERERS (Preserves 100% of Form & Visual Details)
    // -------------------------------------------------------------
    const renderVisualFolio = (targetRole, isLeafFace = false) => {
        const isTargetCEO = targetRole === 'CEO';
        const folioImage = isTargetCEO ? gangaAartiImg : assiMorningImg;

        return (
            <div className="w-full h-full relative flex flex-col justify-between p-6 sm:p-8 md:p-12 text-white overflow-hidden select-none">
                {/* Background Ghat Image with Vignette */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform hover:scale-105"
                    style={{ backgroundImage: `url(${folioImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40 backdrop-blur-[1px]" />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-950/20 via-transparent to-black/50" />

                {/* Top Branding */}
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center space-x-3.5">
                        <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-1.5 shadow-lg shrink-0">
                            <img src={logo} alt="Kashi-Vashi Logo" className="w-full h-full object-contain drop-shadow" />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-1.5 leading-none">
                                <span className="font-hindi font-bold text-amber-300">काशी</span>
                                <span className="font-serif font-bold text-amber-100">Vashi</span>
                            </h1>
                            <p className="text-[10px] text-amber-300/90 font-medium tracking-wider uppercase mt-1 font-serif">
                                Spiritual &amp; Heritage Journeys
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                            <span>✨</span>
                            <span>Authentic Kashi Pilgrimage Management</span>
                        </div>
                        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-black/40 border border-white/15 text-slate-300 text-[10px] font-mono">
                            <span>📖</span>
                            <span>{isTargetCEO ? 'Folio I • Executive' : 'Folio II • Operations'}</span>
                        </div>
                    </div>
                </div>

                {/* Center Contextual Quote & Role Destination Navigation */}
                <div className="relative z-10 py-4 space-y-4 md:space-y-6">
                    <blockquote className="space-y-2 border-l-2 border-amber-500/60 pl-4 hidden sm:block">
                        <p className="text-xs sm:text-sm md:text-base font-serif italic text-slate-200 leading-relaxed">
                            {isTargetCEO
                                ? '"Executive leadership is knowing every boat, every ghat, and every rupee of margin in Kashi."'
                                : '"Crafting seamless spiritual journeys from Assi Ghat to Sarnath with uncompromising precision."'}
                        </p>
                        <footer className="text-[10px] text-amber-400/80 font-semibold uppercase tracking-wider flex items-center gap-2">
                            <span>{isTargetCEO ? 'Executive Command Pulse' : 'Daily Operations Workflow'}</span>
                            <span className="text-slate-500">•</span>
                            <span className="text-[9px] text-slate-400 font-mono">
                                {isTargetCEO ? 'Page 01' : 'Page 02'}
                            </span>
                        </footer>
                    </blockquote>

                    {/* Physical Page Destination Button */}
                    <div className="pt-1 flex flex-col items-start space-y-2">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-amber-200/70 font-semibold">
                            {isTargetCEO ? 'Return to CEO Command' : 'Proceed to Operations'}
                        </span>

                        {isTargetCEO ? (
                            <button
                                type="button"
                                disabled={isActionLocked || isLeafFace}
                                onClick={() => handleRoleChange('CEO')}
                                title="Turn backward to CEO Login Page"
                                className="group relative inline-flex items-center gap-3 px-6 py-2.5 md:py-3 rounded-full bg-gradient-to-r from-amber-500/25 via-amber-400/30 to-amber-600/25 hover:from-amber-500/40 hover:to-amber-600/40 border border-amber-300/50 hover:border-amber-300 text-amber-100 hover:text-white font-serif text-xs md:text-sm font-bold tracking-wider uppercase backdrop-blur-md shadow-xl shadow-black/50 hover:shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="text-amber-300 text-base font-bold transition-transform duration-300 group-hover:-translate-x-1">←</span>
                                <span>CEO</span>
                            </button>
                        ) : (
                            <button
                                type="button"
                                disabled={isActionLocked || isLeafFace}
                                onClick={() => handleRoleChange('MANAGER')}
                                title="Turn forward to Manager Login Page"
                                className="group relative inline-flex items-center gap-3 px-6 py-2.5 md:py-3 rounded-full bg-gradient-to-r from-sky-500/25 via-blue-500/30 to-indigo-600/25 hover:from-sky-500/40 hover:to-indigo-600/40 border border-sky-300/50 hover:border-sky-300 text-sky-100 hover:text-white font-serif text-xs md:text-sm font-bold tracking-wider uppercase backdrop-blur-md shadow-xl shadow-black/50 hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>Manager</span>
                                <span className="text-sky-300 text-base font-bold transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Bottom Security Credentials Footnote */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-medium">256-bit TLS Encrypted Session</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">v5.0 Core</span>
                </div>
            </div>
        );
    };

    const renderLoginForm = (activeFormRole, locked) => {
        const isFormCEO = activeFormRole === 'CEO';

        return (
            <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-12 bg-white select-none">
                <div className="space-y-6">
                    {/* Form Role Identity Badge Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider flex items-center gap-1.5 shadow-xs ${
                            isFormCEO
                                ? 'bg-amber-50 text-amber-900 border-amber-200/80'
                                : 'bg-blue-50 text-blue-900 border-blue-200/80'
                        }`}>
                            <span>{isFormCEO ? '👑 Executive Ledger' : '👥 Operations Ledger'}</span>
                        </span>
                        <div className="flex items-center space-x-2">
                            {locked && (
                                <span className="text-[10px] text-amber-600 font-medium animate-pulse">
                                    Turning page...
                                </span>
                            )}
                            <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                                {isFormCEO ? 'Folio I' : 'Folio II'}
                            </span>
                        </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="text-left space-y-1">
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-serif flex items-center justify-between">
                            <span>{isFormCEO ? 'CEO Command Center' : 'Manager Workspace'}</span>
                            <span className="text-[11px] font-sans font-semibold text-slate-400">
                                {isFormCEO ? 'Page 01' : 'Page 02'}
                            </span>
                        </h2>
                        <p className="text-xs text-slate-500">
                            {isFormCEO
                                ? 'Log in with your executive email to access financials and resource controls.'
                                : 'Log in to manage leads, quotes, customer bookings, and trip execution.'}
                        </p>
                    </div>

                    {/* Alert Messages */}
                    {errorMsg && (
                        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium flex items-center space-x-2 animate-fadeIn">
                            <span>⚠️</span>
                            <span className="flex-1 text-left">{errorMsg}</span>
                        </div>
                    )}
                    {successMsg && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center space-x-2 animate-fadeIn">
                            <span>✅</span>
                            <span className="flex-1 text-left">{successMsg}</span>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={isFormCEO ? 'ceo@banarasyatra.com' : 'manager@banarasyatra.com'}
                                    required
                                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-slate-50/50 hover:bg-white"
                                />
                                <span className="absolute right-3.5 top-3.5 text-slate-400 text-sm">✉️</span>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">
                                    Password
                                </label>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsForgotPasswordOpen(true);
                                        setResetEmail(email || (isFormCEO ? 'ceo@banarasyatra.com' : 'manager@banarasyatra.com'));
                                    }}
                                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    required
                                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-slate-50/50 hover:bg-white"
                                />
                                <span className="absolute right-3.5 top-3.5 text-slate-400 text-sm">🔒</span>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center space-x-2 pt-1">
                            <input
                                id={`remember-me-${activeFormRole}`}
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                            />
                            <label htmlFor={`remember-me-${activeFormRole}`} className="text-xs font-medium text-slate-600 cursor-pointer select-none">
                                Remember session on this computer
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || locked}
                            className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm tracking-wider uppercase transition-all duration-200 shadow-md flex items-center justify-center space-x-2 cursor-pointer ${
                                isFormCEO
                                    ? 'bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 shadow-amber-900/20'
                                    : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 shadow-blue-900/20'
                            } ${isSubmitting || locked ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    <span>Authenticating...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In as {isFormCEO ? 'CEO' : 'Manager'}</span>
                                    <span>→</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Quick Demo Pre-Fill Chips for QA (Development & Testing Only) */}
                {import.meta.env.DEV && (
                    <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-left">
                        <span className="text-[11px] text-slate-400 font-medium">
                            Dev Credentials:
                        </span>
                        <div className="flex items-center space-x-2">
                            <button
                                type="button"
                                disabled={locked}
                                onClick={() => handleFillDemo('CEO')}
                                className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200/80 transition cursor-pointer disabled:opacity-60"
                            >
                                👑 Fill CEO
                            </button>
                            <button
                                type="button"
                                disabled={locked}
                                onClick={() => handleFillDemo('MANAGER')}
                                className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-[11px] font-bold border border-blue-200/80 transition cursor-pointer disabled:opacity-60"
                            >
                                👥 Fill Manager
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // -------------------------------------------------------------
    // MAIN VIEW RENDER
    // -------------------------------------------------------------
    return (
        <div className="min-h-screen w-screen bg-slate-950 flex flex-col items-center justify-center p-0 md:p-6 select-none overflow-x-hidden book-perspective-wrapper">
            
            {/* =========================================================
                SCENE 1: CLOSED FLYING BOOK (Rendered during FLYING & LANDING)
                ========================================================= */}
            {(animationState === 'FLYING' || animationState === 'LANDING') && (
                <div className="relative flex flex-col items-center justify-center p-4">
                    <div
                        className={`w-[340px] sm:w-[420px] md:w-[460px] h-[520px] sm:h-[580px] md:h-[620px] rounded-r-3xl rounded-l-lg relative shadow-2xl flex book-leather-rim border-4 border-amber-900/60 overflow-hidden ${
                            animationState === 'FLYING' ? 'animate-closed-book-flight' : ''
                        }`}
                    >
                        {/* Bound Leather Spine on the Left */}
                        <div className="w-12 h-full bg-gradient-to-r from-[#160802] via-[#2c1308] to-[#120703] border-r-2 border-amber-500/30 flex flex-col justify-between py-8 items-center shadow-2xl shrink-0 z-20">
                            {/* Spine Gilded Ribs */}
                            <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />
                            <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />
                            <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />
                            <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />
                            <span className="font-serif text-[10px] text-amber-300 uppercase tracking-widest rotate-90 whitespace-nowrap opacity-75">
                                KASHI VASHI CRM
                            </span>
                            <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-80" />
                        </div>

                        {/* Hardcover Front with Gold Foil Tooling */}
                        <div className="flex-1 h-full p-8 flex flex-col justify-between items-center text-center relative z-10 bg-gradient-to-br from-[#2a140b] via-[#1e0d06] to-[#130703]">
                            {/* Gold Corner Emboss Accents */}
                            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/60 rounded-tr-xl" />
                            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/60 rounded-br-xl" />
                            <div className="absolute inset-4 border border-amber-500/25 rounded-2xl pointer-events-none" />

                            {/* Top Emblem */}
                            <div className="pt-6 space-y-3">
                                <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border-2 border-amber-400/40 flex items-center justify-center p-3 shadow-lg shadow-amber-950/40">
                                    <img src={logo} alt="Kashi Vashi" className="w-full h-full object-contain drop-shadow" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight text-white flex items-center justify-center gap-1.5 leading-none">
                                        <span className="font-hindi text-amber-300">काशी</span>
                                        <span className="font-serif text-amber-100">Vashi</span>
                                    </h1>
                                    <p className="text-[11px] text-amber-400/90 font-serif uppercase tracking-widest mt-1.5 font-semibold">
                                        Royal Heritage Operations
                                    </p>
                                </div>
                            </div>

                            {/* Central Seal */}
                            <div className="py-4 space-y-2">
                                <div className="w-12 h-12 mx-auto rounded-full bg-amber-400/10 border border-amber-400/50 flex items-center justify-center text-xl text-amber-300">
                                    🕉️
                                </div>
                                <p className="text-[10px] text-amber-200/70 font-mono tracking-widest uppercase">
                                    Commercial Pilgrimage Ledger
                                </p>
                                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[9px] font-bold tracking-wider uppercase">
                                    <span>Authorized Personnel Only</span>
                                </div>
                            </div>

                            {/* Bottom Seal & Year */}
                            <div className="pt-4 border-t border-amber-500/20 w-full flex items-center justify-between text-[10px] text-amber-400/70 font-mono">
                                <span>Folio Edition 2026</span>
                                <span>Varanasi • Ayodhya</span>
                            </div>
                        </div>

                        {/* Gilded Fore-edge Paper Stack on Right */}
                        <div className="w-5 h-full bg-gradient-to-r from-[#e6dcc8] via-[#f7f2e4] to-[#c9bba1] shadow-inner border-l border-black/30 flex flex-col justify-between py-1 z-10">
                            <div className="w-full h-full opacity-30 bg-[repeating-linear-gradient(0deg,#000_0px,#000_1px,transparent_1px,transparent_3px)]" />
                        </div>

                        {/* Hanging Leather Ribbon */}
                        <div className="absolute -top-1 left-24 w-4 h-12 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 rounded-b-md shadow-md z-30 border-t border-amber-400/50" />
                    </div>

                    {/* Dynamic Soft Ambient Shadow */}
                    <div className="w-72 h-8 bg-black/60 rounded-full blur-xl mt-4 scale-y-50 animate-pulse" />
                </div>
            )}

            {/* =========================================================
                SCENE 2, 3, 4, 5: OPEN BOOK SPREAD ARCHITECTURE
                (Rendered during OPENING, OPEN, FLIPPING_NEXT, FLIPPING_PREV)
                ========================================================= */}
            {animationState !== 'FLYING' && animationState !== 'LANDING' && (
                <div
                    className={`w-full max-w-6xl min-h-screen md:min-h-[640px] md:h-[680px] book-spread-container relative md:rounded-3xl overflow-hidden flex flex-col md:flex-row border-[8px] md:border-[10px] border-[#22120a] ${
                        animationState === 'OPENING' ? 'animate-spread-expand' : ''
                    }`}
                >
                    {/* Central Spine Hinge & Gutter Elements */}
                    <div className="hidden md:block book-spine-divider" />
                    <div className="hidden md:block book-spine-shadow" />
                    <div className="hidden md:block absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-12 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 rounded-b-md shadow-md z-40 pointer-events-none border-t border-amber-400/50" />

                    {/* LEFT PAGE BED (w-full md:w-1/2) */}
                    <div className="w-full md:w-1/2 h-full relative overflow-hidden bg-white book-left-deckle page-left-gutter">
                        {/* 
                            Left Bed Content:
                            - In CEO mode OR while flipping backward to CEO (FLIPPING_PREV):
                              CEO Login Form is seated on Left Bed!
                            - In Manager mode (when not flipping backward to CEO):
                              Executive Visual Folio (with "← CEO" button) is seated on Left Bed!
                        */}
                        {(role === 'CEO' || animationState === 'FLIPPING_PREV')
                            ? renderLoginForm('CEO', isActionLocked)
                            : renderVisualFolio('CEO')}
                    </div>

                    {/* RIGHT PAGE BED (w-full md:w-1/2) */}
                    <div className="w-full md:w-1/2 h-full relative overflow-hidden bg-white book-right-deckle page-right-gutter">
                        {/* 
                            Right Bed Content:
                            - In Manager mode OR while flipping forward to Manager (FLIPPING_NEXT):
                              Manager Login Form is seated on Right Bed!
                            - In CEO mode (when not flipping forward to Manager):
                              Operations Visual Folio (with "Manager →" button) is seated on Right Bed!
                        */}
                        {(role === 'MANAGER' || animationState === 'FLIPPING_NEXT')
                            ? renderLoginForm('MANAGER', isActionLocked)
                            : renderVisualFolio('MANAGER')}
                    </div>

                    {/* =========================================================
                        PHYSICAL DOUBLE-SIDED TURNING LEAF
                        (Mounted strictly during active page turns)
                        ========================================================= */}
                    {/* Forward Turn to Manager (Right leaf lifts and turns forward to left across spine) */}
                    {animationState === 'FLIPPING_NEXT' && (
                        <div className="hidden md:block physical-turning-leaf animate-leaf-forward">
                            {/* Front Face: Outgoing Operations Visual with "Manager →" */}
                            <div className="leaf-face-front bg-white shadow-2xl">
                                {renderVisualFolio('MANAGER', true)}
                            </div>
                            {/* Back Face: Incoming Executive Visual with "← CEO" (lands on left) */}
                            <div className="leaf-face-back bg-white shadow-2xl">
                                {renderVisualFolio('CEO', true)}
                            </div>
                        </div>
                    )}

                    {/* Backward Turn to CEO (Left leaf lifts and turns backward to right across spine) */}
                    {animationState === 'FLIPPING_PREV' && (
                        <div className="hidden md:block physical-turning-leaf animate-leaf-backward">
                            {/* Front Face: Outgoing Executive Visual with "← CEO" */}
                            <div className="leaf-face-front bg-white shadow-2xl">
                                {renderVisualFolio('CEO', true)}
                            </div>
                            {/* Back Face: Incoming Operations Visual with "Manager →" (lands on right) */}
                            <div className="leaf-face-back bg-white shadow-2xl">
                                {renderVisualFolio('MANAGER', true)}
                            </div>
                        </div>
                    )}

                    {/* Front Cover Hinge Swiveling Outward During Center Opening */}
                    {animationState === 'OPENING' && (
                        <div className="hidden md:block absolute top-0 bottom-0 right-0 w-1/2 z-40 animate-cover-open pointer-events-none book-leather-rim border-l-2 border-amber-400/40 shadow-2xl" />
                    )}
                </div>
            )}

            {/* FORGOT PASSWORD MODAL */}
            {isForgotPasswordOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn select-none">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6 text-left border border-slate-100 animate-slideDown">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div className="flex items-center space-x-2.5">
                                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg shrink-0">
                                    🔑
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-base font-serif">
                                        Password Recovery
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        {resetStep === 1 ? 'Step 1: Request Reset Token' : 'Step 2: Set New Password'}
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsForgotPasswordOpen(false)}
                                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition"
                            >
                                ✕
                            </button>
                        </div>

                        {resetError && (
                            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium">
                                ⚠️ {resetError}
                            </div>
                        )}
                        {resetMessage && (
                            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium">
                                ℹ️ {resetMessage}
                            </div>
                        )}

                        {resetStep === 1 ? (
                            <form onSubmit={handleRequestResetToken} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-slate-700 uppercase">
                                        Registered Account Email
                                    </label>
                                    <input
                                        type="email"
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        placeholder="your-email@banarasyatra.com"
                                        required
                                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsForgotPasswordOpen(false)}
                                        className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={resetLoading}
                                        className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition shadow-sm cursor-pointer disabled:opacity-50"
                                    >
                                        {resetLoading ? 'Generating...' : 'Get Reset Token →'}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleConfirmReset} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-slate-700 uppercase">
                                        Reset Security Token
                                    </label>
                                    <input
                                        type="text"
                                        value={resetToken}
                                        onChange={(e) => setResetToken(e.target.value)}
                                        placeholder="Paste 64-char reset token"
                                        required
                                        className="w-full px-4 py-2.5 text-xs font-mono rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-slate-700 uppercase">
                                        New Password (min. 8 characters)
                                    </label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        required
                                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setResetStep(1)}
                                        className="py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
                                    >
                                        ← Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={resetLoading}
                                        className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition shadow-sm cursor-pointer disabled:opacity-50"
                                    >
                                        {resetLoading ? 'Updating Password...' : 'Save New Password & Login'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
