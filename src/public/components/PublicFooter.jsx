import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import { trackWhatsAppClick, trackCallClick } from '../utils/analytics';
import {
    DISPLAY_PHONE,
    PHONE_URL,
    DISPLAY_WHATSAPP,
    WHATSAPP_URL,
    EMAIL,
    EMAIL_URL,
    INSTAGRAM_HANDLE,
    INSTAGRAM_URL,
    FACEBOOK_URL,
    TWITTER_HANDLE,
    TWITTER_URL,
    THREADS_HANDLE,
    THREADS_URL,
    GOOGLE_REVIEW_URL,
    GOOGLE_BUSINESS_URL,
    VLOG_URL
} from '../../shared/config/brand';

export default function PublicFooter() {
    return (
        <footer className="bg-stone-950 text-stone-400 pt-16 pb-12 border-t border-stone-900 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-12">

                {/* =========================================================================
                    COLUMN 1: Brand, Mission & Google Trust (3.5 cols on desktop)
                   ========================================================================= */}
                <div className="lg:col-span-4 space-y-4">
                    <Link to="/" className="flex items-center space-x-3 group" aria-label="Kashi-Vashi — Spiritual & Heritage Journeys">
                        <img
                            src={logoImg}
                            alt="Kashi-Vashi Emblem"
                            className="w-12 h-12 object-contain flex-shrink-0 group-hover:scale-105 transition-transform drop-shadow-sm"
                        />
                        <div>
                            <div className="flex items-baseline space-x-2">
                                <span className="text-2xl font-hindi font-bold text-brand-saffron leading-tight">
                                    काशी
                                </span>
                                <span className="text-white font-serif font-bold text-2xl leading-tight tracking-tight">
                                    Vashi
                                </span>
                            </div>
                            <span className="text-[11px] font-serif font-normal uppercase text-amber-300 tracking-widest block mt-0.5">
                                Spiritual &amp; Heritage Journeys
                            </span>
                            <span className="text-[12px] font-hindi font-medium text-stone-300 block mt-1">
                                ― यात्रा नहीं, अनुभव है ―
                            </span>
                            <span className="text-[10px] font-hindi text-stone-400 block mt-0.5 tracking-wider">
                                आस्था से अनुभव तक • Explore • Pray • Experience
                            </span>
                        </div>
                    </Link>

                    <p className="text-xs leading-relaxed text-stone-400">
                        Dedicated local travel facilitation across Varanasi, Sarnath, Ayodhya, and Buddhist circuits. We coordinate verified private boats, authentic Vedic rituals, and trusted local transport with genuine transparency.
                    </p>

                    {/* DUAL GOOGLE TRUST BUTTONS (Side-by-side as G.R. and G.B. in sketch) */}
                    <div className="pt-1 grid grid-cols-2 gap-2.5">
                        {/* G.R.: Google Reviews Button */}
                        <a
                            href={GOOGLE_REVIEW_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-gradient-to-r from-amber-950/40 to-stone-900 border border-amber-500/40 hover:border-amber-400 text-stone-200 hover:text-white transition group shadow-2xs"
                            title="Rate Us on Google"
                        >
                            <span className="text-amber-400 text-xs">★</span>
                            <span className="text-[11px] font-bold text-amber-300 group-hover:text-amber-200">
                                Review (5.0★)
                            </span>
                        </a>

                        {/* G.B.: Google Business Button */}
                        <a
                            href={GOOGLE_BUSINESS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-blue-400/60 text-stone-200 hover:text-white transition group shadow-2xs"
                            title="Google Business Profile & Map"
                        >
                            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                            </svg>
                            <span className="text-[11px] font-bold text-blue-300 group-hover:text-blue-200">
                                Google Profile ↗
                            </span>
                        </a>
                    </div>

                    {/* On-ground support live light */}
                    <div className="pt-2">
                        <span className="block text-[10px] font-bold tracking-widest text-stone-500 uppercase mb-1.5">
                            Verified Local Desk
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs text-stone-300 font-medium">On-Ground Support Active in Varanasi</span>
                        </div>
                    </div>
                </div>

                {/* =========================================================================
                    COLUMN 2: Slim Navigation (EV + TR) & Service Coverage Box (4.5 cols)
                   ========================================================================= */}
                <div className="lg:col-span-4 flex flex-col justify-between">
                    {/* Top Slim Sub-columns: EV (Explore Varanasi) & TR (Travel Resources) */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-6">
                        
                        {/* Sub-column 1: EV (Explore Varanasi) */}
                        <div>
                            <h3 className="text-white font-serif font-bold text-xs uppercase tracking-wider border-b border-stone-800/80 pb-2 mb-3">
                                Explore Varanasi
                            </h3>
                            <ul className="space-y-2 text-xs">
                                <li>
                                    <Link to="/experiences" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
                                        <span className="text-amber-500 text-[10px]">✦</span>
                                        <span>All Experiences</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/experiences/sunrise-boat-ride" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
                                        <span className="text-stone-600 text-[10px]">→</span>
                                        <span>Sunrise Boat Ride</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/experiences/ganga-aarti" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
                                        <span className="text-stone-600 text-[10px]">→</span>
                                        <span>Maha Ganga Aarti</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/experiences/old-kashi-heritage-walk" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
                                        <span className="text-stone-600 text-[10px]">→</span>
                                        <span>Heritage & Alleys Walk</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/tours" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
                                        <span className="text-amber-500 text-[10px]">✦</span>
                                        <span>Our Programs</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/destinations" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
                                        <span className="text-amber-500 text-[10px]">✦</span>
                                        <span>Destinations</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/hotels" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
                                        <span className="text-stone-600 text-[10px]">→</span>
                                        <span>Where to Stay</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Sub-column 2: TR (Traveler Resources) */}
                        <div>
                            <h3 className="text-white font-serif font-bold text-xs uppercase tracking-wider border-b border-stone-800/80 pb-2 mb-3">
                                Travel Resources
                            </h3>
                            <ul className="space-y-2 text-xs">
                                <li>
                                    <Link to="/guides/personal-guide" className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1">
                                        <span className="text-emerald-500 text-[10px]">✦</span>
                                        <span>Book a Personal Guide</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/travel-guide" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
                                        <span className="text-amber-500 text-[10px]">✦</span>
                                        <span>Varanasi Travel Guide</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
                                        <span className="text-amber-500 text-[10px]">✦</span>
                                        <span>About Us</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about#social-impact" className="hover:text-amber-400 transition-colors inline-flex items-center gap-1">
                                        <span className="text-amber-500 text-[10px]">🌱</span>
                                        <span>Saathi Seva Sadan</span>
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href={VLOG_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-amber-400 text-stone-300 transition-colors inline-flex items-center gap-1"
                                    >
                                        <span className="text-amber-500 text-[10px]">🎥</span>
                                        <span>Travel Vlog</span>
                                    </a>
                                </li>
                                <li>
                                    <Link to="/plan-your-trip" className="hover:text-amber-400 font-bold text-amber-500 inline-flex items-center gap-1">
                                        <span className="text-[10px]">✨</span>
                                        <span>Plan Trip</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Service Coverage Box (As sketched in empty middle space) */}
                    <div className="mt-6 p-3 rounded-2xl bg-stone-900/40 border border-stone-800/60 text-[11px] text-stone-400">
                        <span className="font-bold text-amber-400/90 block mb-1 uppercase tracking-wider text-[10px]">
                            Service Coverage
                        </span>
                        <p className="leading-relaxed">
                            Varanasi Ghats, Kashi Vishwanath, Sarnath, Cantt Station, Babatpur Airport, Ayodhya, Prayagraj &amp; Bodh Gaya.
                        </p>
                    </div>
                </div>

                {/* =========================================================================
                    COLUMN 3: Contact & Support (Wider - 4 cols on desktop)
                   ========================================================================= */}
                <div className="lg:col-span-4 space-y-3">
                    <h3 className="text-white font-serif font-bold text-sm uppercase tracking-wider border-b border-stone-800/80 pb-2 mb-3">
                        Contact &amp; Support
                    </h3>

                    {/* 1. Helpline Direct */}
                    <a
                        href={PHONE_URL}
                        onClick={() => trackCallClick('footer_phone')}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/50 hover:bg-stone-900 transition group"
                        title="Call Kashi-Vashi Helpline"
                    >
                        <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400 text-sm flex-shrink-0">
                                📞
                            </span>
                            <div>
                                <span className="text-[10px] text-stone-500 block uppercase font-bold tracking-wider">Helpline (Direct)</span>
                                <span className="text-stone-200 group-hover:text-amber-400 text-xs font-mono font-bold">{DISPLAY_PHONE}</span>
                            </div>
                        </div>
                        <span className="text-stone-600 group-hover:text-amber-400 text-xs transition-transform group-hover:translate-x-0.5">↗</span>
                    </a>

                    {/* 2. WhatsApp Assistant (Special Stylized Button) */}
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackWhatsAppClick('footer_whatsapp')}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-stone-900 to-stone-900 border border-emerald-500/40 hover:border-emerald-400 hover:bg-stone-900 transition group shadow-2xs"
                        title="Chat with WhatsApp Assistant"
                    >
                        <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center text-sm flex-shrink-0">
                                💬
                            </span>
                            <div>
                                <span className="text-[10px] text-emerald-400/90 block uppercase font-bold tracking-wider">WhatsApp Assistant</span>
                                <span className="text-stone-200 group-hover:text-emerald-300 text-xs font-mono font-bold">{DISPLAY_WHATSAPP}</span>
                            </div>
                        </div>
                        <span className="text-emerald-500/80 group-hover:text-emerald-300 text-xs transition-transform group-hover:translate-x-0.5">↗</span>
                    </a>

                    {/* 3. Official Email (Special Stylized Button) */}
                    <a
                        href={EMAIL_URL}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-amber-950/30 via-stone-900 to-stone-900 border border-amber-500/30 hover:border-amber-400 hover:bg-stone-900 transition group shadow-2xs"
                        title="Send Official Email"
                    >
                        <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm flex-shrink-0">
                                ✉️
                            </span>
                            <div className="min-w-0">
                                <span className="text-[10px] text-amber-400/90 block uppercase font-bold tracking-wider">Official Email</span>
                                <span className="text-stone-200 group-hover:text-amber-300 text-xs font-mono truncate block">{EMAIL}</span>
                            </div>
                        </div>
                        <span className="text-amber-500/80 group-hover:text-amber-300 text-xs transition-transform group-hover:translate-x-0.5 flex-shrink-0 ml-1">↗</span>
                    </a>

                    {/* 4. Social Media (Icon Buttons Row as sketched) */}
                    <div className="pt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
                            Social Media
                        </span>
                        <div className="flex items-center gap-2">
                            {/* Instagram */}
                            <a
                                href={INSTAGRAM_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-pink-950/60 border border-stone-800 hover:border-pink-500/60 text-stone-300 hover:text-pink-400 flex items-center justify-center transition-all duration-200 hover:scale-105"
                                title={`Instagram (${INSTAGRAM_HANDLE})`}
                                aria-label={`Instagram (${INSTAGRAM_HANDLE})`}
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>

                            {/* Facebook */}
                            <a
                                href={FACEBOOK_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-blue-950/60 border border-stone-800 hover:border-blue-500/60 text-stone-300 hover:text-blue-400 flex items-center justify-center transition-all duration-200 hover:scale-105"
                                title="Facebook Page"
                                aria-label="Facebook Page"
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/>
                                </svg>
                            </a>

                            {/* Twitter / X */}
                            <a
                                href={TWITTER_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-stone-500 text-stone-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                                title={`X / Twitter (${TWITTER_HANDLE})`}
                                aria-label={`X / Twitter (${TWITTER_HANDLE})`}
                            >
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>

                            {/* Threads */}
                            <a
                                href={THREADS_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/60 text-stone-300 hover:text-amber-400 flex items-center justify-center transition-all duration-200 hover:scale-105"
                                title={`Threads (${THREADS_HANDLE})`}
                                aria-label={`Threads (${THREADS_HANDLE})`}
                            >
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M12.186 24C5.467 24 0 18.533 0 11.814 0 5.094 5.467 0 12.186 0c6.719 0 12.186 5.094 12.186 11.814 0 6.719-5.467 12.186-12.186 12.186zm0-2.4c5.405 0 9.786-4.381 9.786-9.786S17.591 2.028 12.186 2.028 2.4 6.409 2.4 11.814s4.381 9.786 9.786 9.786zm3.327-12.784c-.266-.188-.588-.288-.934-.288-.95 0-1.677.625-1.785 1.541.442.062.887.164 1.32.302.404-.775.908-1.253 1.399-1.555zm-3.327 9.184c-2.42 0-4.386-1.966-4.386-4.386 0-2.42 1.966-4.386 4.386-4.386 1.082 0 2.079.394 2.85 1.054-.374-.188-.772-.338-1.192-.442-1.354-.337-2.738-.076-3.797.717-.993.743-1.547 1.879-1.519 3.116.037 1.637 1.139 3.013 2.744 3.427 1.187.306 2.407.03 3.35-.758.113.197.238.384.374.559-1.076.697-2.348 1.099-3.71 1.099z"/>
                                </svg>
                            </a>

                            {/* Travel Vlog & Blogspot */}
                            <a
                                href={VLOG_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-orange-950/60 border border-stone-800 hover:border-orange-500/60 text-stone-300 hover:text-orange-400 flex items-center justify-center transition-all duration-200 hover:scale-105"
                                title="Travel Vlog & Blog"
                                aria-label="Travel Vlog & Blog"
                            >
                                <span className="text-sm">🎥</span>
                            </a>
                        </div>
                    </div>

                    {/* 5. Team Access (As drawn in sketch) */}
                    <div className="pt-2">
                        <Link
                            to="/crm"
                            id="footer-team-login"
                            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-amber-500/50 text-stone-300 hover:text-amber-400 text-xs font-semibold shadow-2xs hover:shadow-xs transition-all duration-200 group"
                            title="Authorized Operations & Team Login"
                        >
                            <span className="text-sm">🔐</span>
                            <span>Team Login / Access</span>
                            <span className="text-stone-600 group-hover:text-amber-400 text-xs transition-transform group-hover:translate-x-0.5">→</span>
                        </Link>
                    </div>
                </div>

            </div>

            {/* =========================================================================
                BOTTOM ROW: Legal Links & Copyright
               ========================================================================= */}
            <div className="max-w-7xl mx-auto pt-6 border-t border-stone-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-medium">
                <p>© 2026 Kashi-Vashi Spiritual &amp; Heritage Services • Founder: Avaneesh Kumar. All Rights Reserved.</p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    <a href="/privacy.html" target="_blank" rel="noreferrer" className="hover:text-stone-300 transition-colors">Privacy</a>
                    <span>•</span>
                    <a href="/terms.html" target="_blank" rel="noreferrer" className="hover:text-stone-300 transition-colors">Terms</a>
                    <span>•</span>
                    <a href="/refunds.html" target="_blank" rel="noreferrer" className="hover:text-stone-300 transition-colors">Refunds</a>
                    <span>•</span>
                    <a href="/cookies.html" target="_blank" rel="noreferrer" className="hover:text-stone-300 transition-colors">Cookies</a>
                    <span>•</span>
                    <a href="/disclaimer.html" target="_blank" rel="noreferrer" className="hover:text-stone-300 transition-colors">Disclaimer</a>
                </div>
            </div>
        </footer>
    );
}
