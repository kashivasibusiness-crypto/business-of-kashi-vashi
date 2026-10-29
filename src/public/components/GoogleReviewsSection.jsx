import React, { useState, useEffect } from 'react';
import { GOOGLE_REVIEW_URL, GOOGLE_BUSINESS_URL, GOOGLE_BUSINESS_NAME } from '../../shared/config/brand';
import { VERIFIED_REVIEWS } from '../data/reviewsData';
import googleReviewQr from '../../assets/qr/google-review-qr.png';
import img1 from '../../assets/reviews/carousel-1.avif';
import img2 from '../../assets/reviews/carousel-2.avif';
import img3 from '../../assets/reviews/carousel-3.avif';
import img4 from '../../assets/reviews/carousel-4.avif';
import img5 from '../../assets/reviews/carousel-5.avif';
import img6 from '../../assets/reviews/carousel-6.avif';
import img7 from '../../assets/reviews/carousel-7.avif';
import img8 from '../../assets/reviews/carousel-8.avif';
import img9 from '../../assets/reviews/carousel-9.avif';
import img10 from '../../assets/reviews/carousel-10.avif';

const GOOGLE_CAROUSEL_IMAGES = [
    { src: img1, caption: 'Maha Ganga Aarti at Dashashwamedh Ghat' },
    { src: img2, caption: 'Sunrise Boat Cruise on Sacred Ganges' },
    { src: img3, caption: 'Shri Kashi Vishwanath Golden Spire' },
    { src: img4, caption: 'Devotees Snan & Prayers at Ancient Ghats' },
    { src: img5, caption: 'Sarnath Dhamek Stupa Sacred Deer Park' },
    { src: img6, caption: 'Devotee Families on Private Ganges Boat' },
    { src: img7, caption: 'Dev Deepavali & Floating Diyas on the River' },
    { src: img8, caption: 'Shri Kashi Vishwanath Grand Corridor Gate' },
    { src: img9, caption: 'Evening Vedic Aarti with Grand Brass Lamps' },
    { src: img10, caption: 'Heritage Riverfront Ghats Illuminated at Twilight' }
];

// Extended with clone of first slide for seamless infinite looping
const EXTENDED_CAROUSEL_SLIDES = [...GOOGLE_CAROUSEL_IMAGES, GOOGLE_CAROUSEL_IMAGES[0]];

/**
 * GoogleReviewsSection - Faithful High-Fidelity Implementation
 * Matches user's exact uploaded banner design:
 * 1. Flanking parchment stickers ("Spiritual Journeys...", "Your Journey...")
 * 2. Grand serif title & description
 * 3. Left Card: Google Business Profile (Infinite seamless 10-photo carousel, 4.8 rating, 300+ reviews, Blue Button)
 * 4. Right Card: Share Your Experience (Centred QR with Google G, hand-drawn scan arrow, 3 benefit icons, Gold Button)
 * 5. Floating Bottom Features Strip (6 Core Services)
 * 6. Devotee Testimonials Strip
 */
export default function GoogleReviewsSection({
    showReviews = true,
    compact = false,
    className = ''
}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setIsTransitioning(true);
            setCurrentIndex((prev) => prev + 1);
        }, 700); // 500ms display + smooth slide

        return () => clearInterval(interval);
    }, [isPaused]);

    const handleTransitionEnd = () => {
        if (currentIndex >= GOOGLE_CAROUSEL_IMAGES.length) {
            setIsTransitioning(false);
            setCurrentIndex(0);
        }
    };

    const currentCaption = GOOGLE_CAROUSEL_IMAGES[currentIndex % GOOGLE_CAROUSEL_IMAGES.length]?.caption;

    return (
        <section className={`${compact ? 'py-10' : 'py-12 sm:py-16 lg:py-20'} bg-gradient-to-b from-[#fbf8f3] via-[#f7f2ea] to-[#f4eee4] border-t border-b border-stone-200/80 relative overflow-hidden ${className}`}>
            
            {/* Subtle Mandala Aura Background Pattern */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-radial from-amber-200/25 to-transparent blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

                {/* =========================================================================
                    SECTION HEADER WITH FLANKING PARCHMENT STICKERS
                   ========================================================================= */}
                <div className="relative text-center max-w-4xl mx-auto mb-12 sm:mb-16">
                    
                    {/* Left Angled Parchment Sticker (Desktop) */}
                    <div 
                        className="hidden lg:block absolute -left-12 top-4 bg-[#fbf5e8] border border-amber-300/80 rounded-2xl px-5 py-3.5 shadow-md -rotate-6 transform hover:-rotate-3 transition-transform pointer-events-none"
                        style={{
                            boxShadow: '0 10px 20px -5px rgba(180, 83, 9, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)'
                        }}
                    >
                        <p className="font-serif italic text-amber-950 font-bold text-sm leading-snug text-center">
                            Spiritual Journeys,<br />
                            <span className="text-amber-800">Memorable Experiences</span>
                        </p>
                    </div>

                    {/* Right Angled Parchment Sticker (Desktop) */}
                    <div 
                        className="hidden lg:block absolute -right-12 top-4 bg-[#fbf5e8] border border-amber-300/80 rounded-2xl px-5 py-3.5 shadow-md rotate-6 transform hover:rotate-3 transition-transform pointer-events-none"
                        style={{
                            boxShadow: '0 10px 20px -5px rgba(180, 83, 9, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)'
                        }}
                    >
                        <p className="font-serif italic text-amber-950 font-bold text-sm leading-snug text-center">
                            Your Journey,<br />
                            <span className="text-amber-800">Our Responsibility</span>
                        </p>
                    </div>

                    {/* Top Pill: Official Google Trust & Ratings */}
                    <div className="inline-flex items-center gap-1.5 bg-[#eaf4ed] text-emerald-800 border border-emerald-200 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3 shadow-2xs">
                        <span className="text-amber-500">⭐</span>
                        <span>Official Google Trust &amp; Ratings</span>
                    </div>

                    {/* Main Section Heading */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-stone-900 tracking-tight leading-tight">
                        Reviews <span className="font-serif italic text-amber-700 font-normal">&amp;</span> Experiences
                    </h2>

                    {/* Subtitle */}
                    <p className="text-stone-700 text-sm sm:text-base font-bold mt-2">
                        Real experiences. Trusted journeys.
                    </p>

                    {/* Descriptive Narrative */}
                    <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-2xl mx-auto leading-relaxed">
                        Hear from our happy travellers and see why families, groups and travel agents choose <strong className="text-stone-900 font-bold">Kashi Vashi</strong> for their spiritual journeys across <strong className="text-stone-900 font-bold">Kashi</strong>, <strong className="text-stone-900 font-bold">Prayagraj</strong> and <strong className="text-stone-900 font-bold">Ayodhya</strong>.
                    </p>

                    {/* Lotus Motif Divider */}
                    <div className="mt-4 flex items-center justify-center gap-3">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-300" />
                        <span className="text-amber-700 text-base" aria-hidden="true">🪷</span>
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-300" />
                    </div>
                </div>

                {/* =========================================================================
                    DUAL MAIN CARDS (Left: Google Business Profile | Right: Share Experience)
                   ========================================================================= */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto mb-12 sm:mb-16">

                    {/* -------------------------------------------------------------
                        LEFT CARD: GOOGLE BUSINESS PROFILE
                       ------------------------------------------------------------- */}
                    <div 
                        className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-blue-300/80 group"
                        style={{
                            boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)'
                        }}
                    >
                        <div>
                            {/* Card Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 leading-tight">
                                        Google Business Profile
                                    </h3>
                                    <p className="text-xs text-stone-500 font-medium truncate mt-0.5">
                                        {GOOGLE_BUSINESS_NAME}
                                    </p>
                                </div>
                            </div>

                            {/* Varanasi Ghats 10-Photo Seamless Infinite Rotating Carousel */}
                            <div 
                                className="relative rounded-2xl overflow-hidden aspect-[16/9] mb-5 border border-stone-200 shadow-inner group select-none cursor-pointer"
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(false)}
                                onTouchStart={() => setIsPaused(true)}
                                onTouchEnd={() => setIsPaused(false)}
                                title="Hover or touch to pause"
                            >
                                <div 
                                    className={`flex h-full ${isTransitioning ? 'transition-transform duration-300 ease-out' : ''}`}
                                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                    onTransitionEnd={handleTransitionEnd}
                                >
                                    {EXTENDED_CAROUSEL_SLIDES.map((photo, idx) => (
                                        <div key={idx} className="w-full h-full flex-shrink-0 relative">
                                            <img
                                                src={photo.src}
                                                alt={photo.caption}
                                                className="w-full h-full object-cover"
                                                loading={idx < 2 ? 'eager' : 'lazy'}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />
                                <div className="absolute bottom-2.5 left-3 right-3 flex items-center text-white text-xs drop-shadow-md pointer-events-none">
                                    <span className="font-semibold truncate">
                                        📍 {currentCaption}
                                    </span>
                                </div>
                            </div>

                            {/* Stats & Trust Pillars Strip */}
                            <div className="grid grid-cols-4 gap-2 py-3 border-y border-stone-100 text-center mb-6">
                                {/* Rating Stat */}
                                <div className="flex flex-col items-center justify-center border-r border-stone-100 pr-1">
                                    <span className="text-2xl font-black text-stone-900 leading-none">
                                        4.8
                                    </span>
                                    <div className="flex text-amber-500 text-[11px] mt-1">
                                        ★★★★★
                                    </div>
                                    <span className="text-[10px] text-stone-500 font-semibold mt-0.5">
                                        300+ reviews
                                    </span>
                                </div>

                                {/* Pillar 1 */}
                                <div className="flex flex-col items-center justify-center border-r border-stone-100 px-1">
                                    <span className="text-xl mb-1" aria-hidden="true">👥</span>
                                    <span className="text-[10px] font-bold text-stone-800 leading-tight">
                                        Families<br />&amp; Groups
                                    </span>
                                </div>

                                {/* Pillar 2 */}
                                <div className="flex flex-col items-center justify-center border-r border-stone-100 px-1">
                                    <span className="text-xl mb-1 text-emerald-600" aria-hidden="true">🛡️</span>
                                    <span className="text-[10px] font-bold text-stone-800 leading-tight">
                                        Trusted<br />Service
                                    </span>
                                </div>

                                {/* Pillar 3 */}
                                <div className="flex flex-col items-center justify-center pl-1">
                                    <span className="text-xl mb-1 text-amber-700" aria-hidden="true">🛕</span>
                                    <span className="text-[10px] font-bold text-stone-800 leading-tight">
                                        Spiritual<br />Journeys
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Button & Disclaimer */}
                        <div>
                            <a
                                href={GOOGLE_BUSINESS_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-2xl shadow-md transition-all text-center group/btn"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                <span>View Google Business Profile</span>
                                <span className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true">&gt;</span>
                            </a>
                            <p className="text-center text-[11px] text-stone-500 mt-2.5">
                                See photos, reviews, directions and more on Google Maps.
                            </p>
                        </div>
                    </div>

                    {/* -------------------------------------------------------------
                        RIGHT CARD: SHARE YOUR EXPERIENCE (REVIEW QR SCANNER)
                       ------------------------------------------------------------- */}
                    <div 
                        className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-amber-300/80 group relative overflow-hidden"
                        style={{
                            boxShadow: '0 20px 40px -15px rgba(217, 119, 6, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)'
                        }}
                    >
                        <div>
                            {/* Card Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md flex-shrink-0 text-xl font-bold">
                                    ★
                                </div>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 leading-tight">
                                        Share Your Experience
                                    </h3>
                                    <p className="text-xs text-stone-500 font-medium mt-0.5">
                                        Help other travellers by leaving a Google review.
                                    </p>
                                </div>
                            </div>

                            {/* QR Scanner Display with Google G in Center & Hand-Drawn Annotation */}
                            <div className="relative my-4 flex items-center justify-center">
                                {/* QR Frame */}
                                <div className="relative p-3 bg-white rounded-2xl border-2 border-stone-200/90 shadow-md max-w-[210px] sm:max-w-[230px] w-full flex items-center justify-center">
                                    <img
                                        src={googleReviewQr}
                                        alt="Scan QR code to review Kashi Vashi on Google"
                                        className="w-full h-auto object-contain rounded-lg"
                                        loading="lazy"
                                    />
                                    {/* Google G Logo in QR Center */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <div className="w-9 h-9 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center">
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Callout Annotation Arrow (Right Side) */}
                                <div className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col items-start translate-x-2 lg:translate-x-4 pointer-events-none">
                                    <p className="font-serif italic font-bold text-amber-900 text-xs sm:text-sm whitespace-nowrap leading-tight">
                                        Scan QR Code<br />
                                        <span className="text-amber-700">to Leave a Review</span>
                                    </p>
                                    <svg className="w-7 h-7 text-amber-700 mt-1 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a4 4 0 014 4v2m0 0l-3-3m3 3l3-3" />
                                    </svg>
                                </div>
                            </div>

                            {/* 3 Benefit Badges (Share Your Experience, Help Other Travellers, Support Our Local Service) */}
                            <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-100 text-center mb-6">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center text-sm mb-1">
                                        💬
                                    </div>
                                    <span className="text-[10px] font-bold text-stone-700 leading-tight">
                                        Share Your<br />Experience
                                    </span>
                                </div>

                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-sm mb-1">
                                        👥
                                    </div>
                                    <span className="text-[10px] font-bold text-stone-700 leading-tight">
                                        Help Other<br />Travellers
                                    </span>
                                </div>

                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center text-sm mb-1">
                                        🤎
                                    </div>
                                    <span className="text-[10px] font-bold text-stone-700 leading-tight">
                                        Support Our<br />Local Service
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Action Button & Disclaimer */}
                        <div>
                            <a
                                href={GOOGLE_REVIEW_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#f59e0b] via-[#ea580c] to-[#f59e0b] hover:from-[#d97706] hover:to-[#ea580c] text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-2xl shadow-md transition-all text-center group/btn"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                <span>Write a Google Review</span>
                                <span className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true">&gt;</span>
                            </a>
                            <p className="text-center text-[11px] text-stone-500 mt-2.5">
                                Your feedback helps us serve you better.
                            </p>
                        </div>
                    </div>

                </div>

                {/* =========================================================================
                    FLOATING BOTTOM FEATURES STRIP (6 Core Services - As in design)
                   ========================================================================= */}
                <div 
                    className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-md max-w-6xl mx-auto mb-14 overflow-x-auto scrollbar-none"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 min-w-[620px] lg:min-w-0">
                        {/* 1. Private AC Cab */}
                        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-stone-50/70 border border-stone-100">
                            <span className="text-2xl flex-shrink-0">🚗</span>
                            <div className="text-left">
                                <span className="block text-[11px] font-bold text-stone-900 leading-tight">Private AC Cab</span>
                                <span className="text-[10px] text-stone-500 font-medium">Innova Crysta</span>
                            </div>
                        </div>

                        {/* 2. Family & Group Tours */}
                        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-stone-50/70 border border-stone-100">
                            <span className="text-2xl flex-shrink-0">👥</span>
                            <div className="text-left">
                                <span className="block text-[11px] font-bold text-stone-900 leading-tight">Family &amp; Group Tours</span>
                                <span className="text-[10px] text-stone-500 font-medium">Custom Paced</span>
                            </div>
                        </div>

                        {/* 3. Custom Itineraries */}
                        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-stone-50/70 border border-stone-100">
                            <span className="text-2xl flex-shrink-0">📍</span>
                            <div className="text-left">
                                <span className="block text-[11px] font-bold text-stone-900 leading-tight">Custom Itineraries</span>
                                <span className="text-[10px] text-stone-500 font-medium">Personalized Plan</span>
                            </div>
                        </div>

                        {/* 4. Ganga Aarti & Boat Ride */}
                        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-stone-50/70 border border-stone-100">
                            <span className="text-2xl flex-shrink-0">⛵</span>
                            <div className="text-left">
                                <span className="block text-[11px] font-bold text-stone-900 leading-tight">Ganga Aarti &amp; Boat</span>
                                <span className="text-[10px] text-stone-500 font-medium">Varanasi Ghats</span>
                            </div>
                        </div>

                        {/* 5. Guide Assistance */}
                        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-stone-50/70 border border-stone-100">
                            <span className="text-2xl flex-shrink-0">👨‍✈️</span>
                            <div className="text-left">
                                <span className="block text-[11px] font-bold text-stone-900 leading-tight">Guide Assistance</span>
                                <span className="text-[10px] text-stone-500 font-medium">Hindi | English | Tamil</span>
                            </div>
                        </div>

                        {/* 6. Sacred Circuits */}
                        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-stone-50/70 border border-stone-100">
                            <span className="text-2xl flex-shrink-0">🛕</span>
                            <div className="text-left">
                                <span className="block text-[11px] font-bold text-stone-900 leading-tight">Kashi | Prayagraj</span>
                                <span className="text-[10px] text-stone-500 font-medium">Ayodhya Tours</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* =========================================================================
                    TESTIMONIALS STRIP: What Devotees Say About Kashi-Vashi
                   ========================================================================= */}
                {showReviews && (
                    <div className="pt-6 border-t border-stone-200/80">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                            <div>
                                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 border border-amber-300/80 px-3 py-1 rounded-full mb-2">
                                    Recent Experiences
                                </span>
                                <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 tracking-tight">
                                    What Devotees Say About Kashi-Vashi
                                </h3>
                                <p className="text-stone-500 text-xs mt-1">
                                    Real pilgrimages, verified feedback, and cherished spiritual memories.
                                </p>
                            </div>

                            <a
                                href={GOOGLE_REVIEW_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-amber-50 text-amber-900 font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl border border-stone-200 hover:border-amber-300 shadow-2xs transition-all self-start sm:self-auto group"
                            >
                                <span>Leave Your Feedback</span>
                                <span className="transition-transform group-hover:translate-x-0.5">✍️</span>
                            </a>
                        </div>

                        {/* 4 Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {VERIFIED_REVIEWS.map((rev, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-2.5">
                                            <div className="text-amber-500 text-xs tracking-wider">
                                                {'★'.repeat(rev.rating)}
                                            </div>
                                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1">
                                                <svg className="w-2.5 h-2.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                Google Verified
                                            </span>
                                        </div>

                                        <span className="inline-block bg-amber-50 text-amber-900 border border-amber-200/70 text-[10px] font-semibold px-2 py-0.5 rounded-md mb-2.5">
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
