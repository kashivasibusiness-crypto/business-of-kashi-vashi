import React from 'react';
import { GOOGLE_REVIEW_URL, GOOGLE_BUSINESS_URL, GOOGLE_BUSINESS_NAME } from '../../shared/config/brand';
import { VERIFIED_REVIEWS } from '../data/reviewsData';
import googleBusinessBadge from '../../assets/qr/google-business-badge.png';
import googleReviewQr from '../../assets/qr/google-review-qr.png';

/**
 * GoogleReviewsSection - Reusable, Modular Google Trust & Reviews Component
 * 
 * Props:
 * - showDualQR: boolean (default: true) - Display the two side-by-side Google QRs
 * - showReviews: boolean (default: true) - Display traveler testimonials grid
 * - compact: boolean (default: false) - Compact padding for embedding in secondary pages
 */
export default function GoogleReviewsSection({
    showDualQR = true,
    showReviews = true,
    compact = false,
    className = ''
}) {
    return (
        <section className={`${compact ? 'py-10' : 'py-14 sm:py-20'} bg-gradient-to-b from-stone-50 via-amber-50/25 to-stone-100/70 border-t border-b border-stone-200/80 relative overflow-hidden ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
                    <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-stone-200 shadow-xs mb-3.5">
                        {/* Google G Logo */}
                        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        <span className="text-[11px] font-bold text-stone-700 tracking-wider uppercase">
                            Official Google Business Profile
                        </span>
                        <span className="inline-block w-1 h-1 rounded-full bg-stone-300" />
                        <span className="text-emerald-700 text-[11px] font-bold flex items-center gap-1">
                            ✓ Verified
                        </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-stone-900 tracking-tight leading-tight">
                        Check Us Out &amp; Review Us on Google
                    </h2>
                    <p className="text-stone-600 text-xs sm:text-sm mt-2.5 leading-relaxed">
                        Verified presence of <strong className="text-stone-800">{GOOGLE_BUSINESS_NAME}</strong>. Scan below with your smartphone to inspect our official profile or share your pilgrimage review.
                    </p>
                </div>

                {/* DUAL GOOGLE QR CARDS (Side-by-Side) */}
                {showDualQR && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-14">
                        
                        {/* 1. Official Google Business Profile Card */}
                        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-stone-200/90 shadow-sm hover:shadow-md hover:border-blue-400/70 transition-all flex flex-col justify-between group">
                            <div>
                                <div className="flex items-center justify-between gap-3 mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                                        <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                                            Google Business Profile
                                        </span>
                                    </div>
                                    <span className="text-[11px] text-stone-500 font-medium">Scan with camera</span>
                                </div>

                                <h3 className="text-lg font-serif font-black text-stone-900 group-hover:text-blue-700 transition-colors">
                                    Check Us Out on Google
                                </h3>
                                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                                    Explore verified business details, local service location, photos, and direct Google Maps access.
                                </p>

                                {/* QR Badge Visual */}
                                <div className="my-5 flex justify-center">
                                    <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 shadow-xs max-w-[220px] transition-transform group-hover:scale-[1.02]">
                                        <img
                                            src={googleBusinessBadge}
                                            alt="Kashi Vashi Google Business Profile QR"
                                            className="w-full h-auto object-contain rounded-xl"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <a
                                    href={GOOGLE_BUSINESS_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-xs transition-colors"
                                >
                                    <span>View on Google Maps / Profile</span>
                                    <span aria-hidden="true">↗</span>
                                </a>
                                <span className="block text-center text-[10px] text-stone-400 mt-2">
                                    {GOOGLE_BUSINESS_NAME}
                                </span>
                            </div>
                        </div>

                        {/* 2. Direct Google Reviews Card */}
                        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-300 shadow-sm hover:shadow-md hover:border-amber-500 transition-all flex flex-col justify-between group relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-xs">
                                5-Star Rating
                            </div>

                            <div>
                                <div className="flex items-center justify-between gap-3 mb-4">
                                    <div className="flex items-center gap-1.5 text-amber-500 text-sm">
                                        ★★★★★
                                        <span className="text-stone-800 text-xs font-bold ml-1">5.0</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-serif font-black text-stone-900 group-hover:text-amber-700 transition-colors">
                                    Share Your Pilgrimage Review
                                </h3>
                                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                                    Recently visited Varanasi or traveled with us? Your genuine feedback helps other devotees plan with confidence.
                                </p>

                                {/* Review QR Visual */}
                                <div className="my-5 flex justify-center">
                                    <div className="p-3 bg-amber-50/50 rounded-2xl border-2 border-amber-200/80 shadow-xs max-w-[200px] transition-transform group-hover:scale-[1.02] flex flex-col items-center">
                                        <img
                                            src={googleReviewQr}
                                            alt="Kashi Vashi Direct Google Review QR"
                                            className="w-36 h-36 object-contain rounded-lg shadow-2xs"
                                            loading="lazy"
                                        />
                                        <span className="text-[10px] font-bold text-amber-800 tracking-wider uppercase mt-2">
                                            Scan to Rate 5 Stars
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <a
                                    href={GOOGLE_REVIEW_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-xs transition-colors"
                                >
                                    <span>⭐ Write a Review on Google</span>
                                    <span aria-hidden="true">→</span>
                                </a>
                                <span className="block text-center text-[10px] text-stone-400 mt-2">
                                    Takes less than 1 minute · Opens direct review form
                                </span>
                            </div>
                        </div>

                    </div>
                )}

                {/* TESTIMONIALS STRIP */}
                {showReviews && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                                    Recent Experiences
                                </span>
                                <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                                    What Devotees Say About Kashi-Vashi
                                </h3>
                            </div>

                            <a
                                href={GOOGLE_REVIEW_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 bg-white hover:bg-amber-50 px-3.5 py-2 rounded-xl border border-stone-200 transition-colors"
                            >
                                <span>Leave Your Feedback</span>
                                <span>↗</span>
                            </a>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                            {VERIFIED_REVIEWS.map((rev, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-2.5">
                                            <div className="text-amber-500 text-xs">
                                                {'★'.repeat(rev.rating)}
                                            </div>
                                            <span className="text-[10px] font-bold text-stone-400 uppercase">
                                                Google Review
                                            </span>
                                        </div>

                                        <span className="inline-block bg-amber-50 text-amber-900 border border-amber-200/60 text-[10px] font-semibold px-2 py-0.5 rounded-md mb-2.5">
                                            {rev.tag}
                                        </span>

                                        <p className="text-xs text-stone-700 leading-relaxed italic">
                                            "{rev.text}"
                                        </p>
                                    </div>

                                    <div className="pt-3.5 mt-3.5 border-t border-stone-100 flex items-center gap-2.5">
                                        <div className={`w-8 h-8 rounded-full ${rev.bg} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-xs`}>
                                            {rev.initials}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-xs font-bold text-stone-900 truncate">
                                                {rev.name}
                                            </h4>
                                            <p className="text-[10px] text-stone-500 truncate">
                                                {rev.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}
