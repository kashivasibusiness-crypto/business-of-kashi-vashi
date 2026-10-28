import React from 'react';
import { GOOGLE_REVIEW_URL, GOOGLE_BUSINESS_URL, GOOGLE_BUSINESS_NAME } from '../../shared/config/brand';
import googleBusinessBadge from '../../assets/qr/google-business-badge.png';
import googleReviewQr from '../../assets/qr/google-review-qr.png';

/**
 * GoogleVerificationCard - Compact Reusable Dual QR Card
 * Ideal for Contact Page, About Page, or Sidebar
 */
export default function GoogleVerificationCard({ className = '' }) {
    return (
        <div className={`bg-gradient-to-br from-white via-amber-50/20 to-stone-50 rounded-3xl p-6 border-2 border-stone-200/90 shadow-sm ${className}`}>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200/60">
                <div className="flex items-center gap-2">
                    {/* Google G Logo */}
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <div>
                        <span className="text-[11px] uppercase font-bold tracking-wider text-stone-500 block">
                            Official Google Presence
                        </span>
                        <h4 className="text-sm font-serif font-bold text-stone-900">
                            {GOOGLE_BUSINESS_NAME}
                        </h4>
                    </div>
                </div>
                <div className="flex items-center text-amber-500 text-xs">
                    ★★★★★
                </div>
            </div>

            <p className="text-xs text-stone-600 mb-5 leading-relaxed">
                Scan with your phone to view our verified profile or share your pilgrimage feedback.
            </p>

            <div className="grid grid-cols-2 gap-4">
                {/* 1. Google Business QR */}
                <div className="bg-white p-3.5 rounded-2xl border border-stone-200 flex flex-col items-center justify-between text-center group hover:border-blue-400 transition-colors">
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider mb-2">
                        Profile &amp; Map
                    </span>
                    <img
                        src={googleBusinessBadge}
                        alt="Google Business QR"
                        className="w-24 h-24 object-contain rounded-lg my-1 group-hover:scale-105 transition-transform"
                        loading="lazy"
                    />
                    <a
                        href={GOOGLE_BUSINESS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 text-[11px] font-bold text-stone-900 hover:text-blue-600 inline-flex items-center gap-1 transition-colors"
                    >
                        <span>Check Profile</span>
                        <span>↗</span>
                    </a>
                </div>

                {/* 2. Google Review QR */}
                <div className="bg-white p-3.5 rounded-2xl border-2 border-amber-300 flex flex-col items-center justify-between text-center group hover:border-amber-500 transition-colors">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-2">
                        Rate 5 Stars
                    </span>
                    <img
                        src={googleReviewQr}
                        alt="Google Review QR"
                        className="w-24 h-24 object-contain rounded-lg my-1 group-hover:scale-105 transition-transform"
                        loading="lazy"
                    />
                    <a
                        href={GOOGLE_REVIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 text-[11px] font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1 transition-colors"
                    >
                        <span>Write Review</span>
                        <span>⭐</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

