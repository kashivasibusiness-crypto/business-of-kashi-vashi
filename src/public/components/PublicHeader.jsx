import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import { trackWhatsAppClick } from '../utils/analytics';
import { DISPLAY_PHONE, PHONE_URL, DISPLAY_WHATSAPP, WHATSAPP_URL } from '../../shared/config/brand';

export default function PublicHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const [isGuidesDropdownOpen, setIsGuidesDropdownOpen] = useState(false);
    const [isMobileGuidesOpen, setIsMobileGuidesOpen] = useState(true);
    const location = useLocation();

    // Close mobile drawer and dropdown on route change
    useEffect(() => {
        setIsOpen(false);
        setIsGuidesDropdownOpen(false);
    }, [location.pathname]);

    // Disable body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close dropdown and mobile drawer on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsGuidesDropdownOpen(false);
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const isGuidesActive = location.pathname.startsWith('/guides') || location.pathname.startsWith('/travel-guide');

    return (
        <header className="bg-stone-950 text-white sticky top-0 z-50 border-b border-stone-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">

                {/* Left Side: Logo & Brand Standardization (Kashi-Vashi, NOT an H1) */}
                <Link to="/" className="flex items-center space-x-3 group shrink-0" aria-label="Kashi-Vashi — Spiritual & Heritage Journeys">
                    <img
                        src={logoImg}
                        alt="Kashi-Vashi Emblem"
                        className="w-10 h-10 object-contain flex-shrink-0 group-hover:scale-105 transition-transform drop-shadow-sm"
                    />
                    <div>
                        <div className="flex items-baseline space-x-1.5">
                            <span className="text-lg font-hindi font-bold text-brand-saffron leading-none">
                                काशी
                            </span>
                            <span className="text-lg font-serif font-bold tracking-tight text-white leading-none">
                                Vashi
                            </span>
                        </div>
                        <span className="text-[9.5px] uppercase font-serif font-normal tracking-widest text-amber-300/90 block mt-0.5 whitespace-nowrap">
                            Spiritual &amp; Heritage Journeys
                        </span>
                    </div>
                </Link>

                {/* Center: Desktop Navigation Links */}
                <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 text-xs font-bold uppercase tracking-wider text-stone-300">
                    
                    {/* About */}
                    <Link
                        to="/about"
                        className={`transition-colors py-1 relative whitespace-nowrap ${
                            isActive('/about') ? 'text-amber-500' : 'hover:text-amber-400 text-stone-300'
                        }`}
                    >
                        About
                        {isActive('/about') && (
                            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                        )}
                    </Link>

                    {/* Guide Dropdown Trigger (Text clicks to /guides, arrow toggles dropdown, hover opens) */}
                    <div
                        className="relative py-1 flex items-center"
                        onMouseEnter={() => setIsGuidesDropdownOpen(true)}
                        onMouseLeave={() => setIsGuidesDropdownOpen(false)}
                    >
                        <Link
                            to="/guides"
                            onClick={() => setIsGuidesDropdownOpen(false)}
                            className={`transition-colors py-1 relative whitespace-nowrap font-bold uppercase tracking-wider text-xs ${
                                isGuidesActive ? 'text-amber-500' : 'hover:text-amber-400 text-stone-300'
                            }`}
                        >
                            <span>Guides</span>
                            {isGuidesActive && (
                                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                            )}
                        </Link>

                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsGuidesDropdownOpen(!isGuidesDropdownOpen);
                            }}
                            aria-expanded={isGuidesDropdownOpen}
                            aria-haspopup="true"
                            aria-label="Toggle Guides options"
                            className={`ml-0.5 p-1 transition-colors cursor-pointer flex items-center ${
                                isGuidesActive ? 'text-amber-500' : 'hover:text-amber-400 text-stone-300'
                            }`}
                        >
                            <svg
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                    isGuidesDropdownOpen ? 'rotate-180 text-amber-500' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu with Exactly the Two Options */}
                        {isGuidesDropdownOpen && (
                            <div className="absolute top-full left-0 mt-1.5 w-64 bg-stone-900 border border-stone-800 rounded-2xl shadow-xl p-2 z-50 text-left normal-case">
                                <Link
                                    to="/guides/personal-guide"
                                    onClick={() => setIsGuidesDropdownOpen(false)}
                                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-stone-850 transition group"
                                >
                                    <span className="text-base mt-0.5">🧑‍💼</span>
                                    <div>
                                        <span className="text-xs font-bold text-white group-hover:text-emerald-400 block tracking-normal">
                                            Book a Personal Guide
                                        </span>
                                        <span className="text-[11px] text-stone-400 block leading-tight font-normal mt-0.5">
                                            Verified local guides &amp; walking tours
                                        </span>
                                    </div>
                                </Link>

                                <div className="my-1 border-t border-stone-800/80" />

                                <Link
                                    to="/travel-guide"
                                    onClick={() => setIsGuidesDropdownOpen(false)}
                                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-stone-850 transition group"
                                >
                                    <span className="text-base mt-0.5">📖</span>
                                    <div>
                                        <span className="text-xs font-bold text-white group-hover:text-amber-400 block tracking-normal">
                                            Varanasi Travel Guide
                                        </span>
                                        <span className="text-[11px] text-stone-400 block leading-tight font-normal mt-0.5">
                                            City handbook, weather &amp; itineraries
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Destinations */}
                    <Link
                        to="/destinations"
                        className={`transition-colors py-1 relative whitespace-nowrap ${
                            isActive('/destinations') ? 'text-amber-500' : 'hover:text-amber-400 text-stone-300'
                        }`}
                    >
                        Destinations
                        {isActive('/destinations') && (
                            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                        )}
                    </Link>

                    {/* Experiences */}
                    <Link
                        to="/experiences"
                        className={`transition-colors py-1 relative whitespace-nowrap ${
                            isActive('/experiences') ? 'text-amber-500' : 'hover:text-amber-400 text-stone-300'
                        }`}
                    >
                        Experiences
                        {isActive('/experiences') && (
                            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                        )}
                    </Link>

                    {/* Tours */}
                    <Link
                        to="/tours"
                        className={`transition-colors py-1 relative whitespace-nowrap ${
                            isActive('/tours') ? 'text-amber-500' : 'hover:text-amber-400 text-stone-300'
                        }`}
                    >
                        Tours
                        {isActive('/tours') && (
                            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                        )}
                    </Link>
                </nav>

                {/* Right Side: WhatsApp & Plan My Trip CTA (Desktop) */}
                <div className="hidden sm:flex items-center space-x-3 shrink-0">
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackWhatsAppClick('header_desktop')}
                        className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-emerald-500/30 hover:bg-emerald-950/30 transition flex items-center gap-1.5"
                        aria-label="Chat on WhatsApp"
                    >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>WhatsApp</span>
                    </a>

                    <Link
                        to="/plan-your-trip"
                        className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl transition shadow-md transform hover:scale-[1.02] active:scale-95 text-center"
                    >
                        Plan My Trip
                    </Link>
                </div>

                {/* Mobile Menu Hamburger Button */}
                <div className="flex sm:hidden items-center space-x-2">
                    <Link
                        to="/plan-your-trip"
                        className="bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm"
                    >
                        Plan
                    </Link>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-stone-300 hover:text-white rounded-lg hover:bg-stone-900 transition focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Slide-Over Drawer */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 top-[53px] z-50 bg-stone-950/95 backdrop-blur-md border-t border-stone-800 flex flex-col p-6 overflow-y-auto">
                    <div className="flex flex-col space-y-3 text-sm font-bold uppercase tracking-wider text-stone-200">
                        
                        <Link
                            to="/about"
                            onClick={() => setIsOpen(false)}
                            className={`py-2 border-b border-stone-800/80 flex items-center justify-between ${
                                isActive('/about') ? 'text-amber-500' : 'hover:text-amber-400'
                            }`}
                        >
                            <span>About</span>
                            <span className="text-stone-600">➔</span>
                        </Link>

                        {/* Guide Section with Collapsible Sub-options in Mobile Drawer */}
                        <div className="border-b border-stone-800/80 py-2">
                            <div className="w-full flex items-center justify-between py-1">
                                <Link
                                    to="/guides"
                                    onClick={() => setIsOpen(false)}
                                    className={`text-sm font-bold uppercase tracking-wider ${
                                        isGuidesActive ? 'text-amber-500' : 'text-stone-200 hover:text-amber-400'
                                    }`}
                                >
                                    Guides
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setIsMobileGuidesOpen(!isMobileGuidesOpen)}
                                    aria-expanded={isMobileGuidesOpen}
                                    aria-label="Toggle Mobile Guides Menu"
                                    className="flex items-center gap-1.5 text-stone-400 cursor-pointer p-1"
                                >
                                    <span className="text-[10px] uppercase font-bold text-stone-500">2 Options</span>
                                    <svg
                                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                            isMobileGuidesOpen ? 'rotate-180 text-amber-500' : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Sub-options: Exactly the two options */}
                            {isMobileGuidesOpen && (
                                <div className="pl-3 pt-2 space-y-2 normal-case font-normal">
                                    <Link
                                        to="/guides/personal-guide"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2 text-xs text-stone-300 hover:text-emerald-400 py-1"
                                    >
                                        <span className="text-emerald-400 text-xs">🧑‍💼</span>
                                        <span className="font-semibold text-white">Book a Personal Guide</span>
                                    </Link>
                                    <Link
                                        to="/travel-guide"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2 text-xs text-stone-300 hover:text-amber-400 py-1"
                                    >
                                        <span className="text-amber-400 text-xs">📖</span>
                                        <span>Varanasi Travel Guide</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            to="/destinations"
                            onClick={() => setIsOpen(false)}
                            className={`py-2 border-b border-stone-800/80 flex items-center justify-between ${
                                isActive('/destinations') ? 'text-amber-500' : 'hover:text-amber-400'
                            }`}
                        >
                            <span>Destinations</span>
                            <span className="text-stone-600">➔</span>
                        </Link>

                        <Link
                            to="/experiences"
                            onClick={() => setIsOpen(false)}
                            className={`py-2 border-b border-stone-800/80 flex items-center justify-between ${
                                isActive('/experiences') ? 'text-amber-500' : 'hover:text-amber-400'
                            }`}
                        >
                            <span>Experiences</span>
                            <span className="text-stone-600">➔</span>
                        </Link>

                        <Link
                            to="/tours"
                            onClick={() => setIsOpen(false)}
                            className={`py-2 border-b border-stone-800/80 flex items-center justify-between ${
                                isActive('/tours') ? 'text-amber-500' : 'hover:text-amber-400'
                            }`}
                        >
                            <span>Tours</span>
                            <span className="text-stone-600">➔</span>
                        </Link>

                        <Link
                            to="/hotels"
                            onClick={() => setIsOpen(false)}
                            className={`py-2 border-b border-stone-800/80 flex items-center justify-between ${
                                isActive('/hotels') ? 'text-amber-500' : 'hover:text-amber-400'
                            }`}
                        >
                            <span>Hotels</span>
                            <span className="text-stone-600">➔</span>
                        </Link>

                        <Link
                            to="/contact"
                            onClick={() => setIsOpen(false)}
                            className={`py-2 border-b border-stone-800/80 flex items-center justify-between ${
                                isActive('/contact') ? 'text-amber-500' : 'hover:text-amber-400'
                            }`}
                        >
                            <span>Contact</span>
                            <span className="text-stone-600">➔</span>
                        </Link>
                    </div>

                    <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col space-y-3">
                        <Link
                            to="/plan-your-trip"
                            onClick={() => setIsOpen(false)}
                            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white text-center py-3.5 rounded-xl font-bold uppercase text-xs tracking-wider shadow-md"
                        >
                            Plan My Trip
                        </Link>

                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => {
                                setIsOpen(false);
                                trackWhatsAppClick('mobile_drawer');
                            }}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-3 rounded-xl font-bold text-xs tracking-wider shadow-sm flex items-center justify-center gap-2"
                        >
                            <span>Chat on WhatsApp ({DISPLAY_WHATSAPP})</span>
                        </a>

                        <a
                            href={PHONE_URL}
                            className="w-full bg-stone-900 text-stone-300 text-center py-2.5 rounded-xl text-xs font-semibold border border-stone-800 flex items-center justify-center gap-1.5"
                        >
                            <span>Helpline: {DISPLAY_PHONE}</span>
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
