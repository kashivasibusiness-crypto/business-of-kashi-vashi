import React from 'react';
import { Link } from 'react-router-dom';
import { WHATSAPP_URL } from '../../shared/config/brand';
import { trackWhatsAppClick } from '../utils/analytics';
import stayRiversideImg from '../../assets/stays/stay-riverside.avif';
import stayCantonmentImg from '../../assets/stays/stay-cantonment.avif';
import stayTempleImg from '../../assets/stays/stay-temple.avif';
import stayHaveliImg from '../../assets/stays/stay-haveli.avif';
import stayFamilyBannerImg from '../../assets/stays/stay-family-banner.avif';

const STAY_CATEGORIES = [
    {
        id: 'riverside',
        title: 'Riverside & Ghat-View Stays',
        tagline: "Wake up to the Ganga and experience Kashi's soul",
        image: stayRiversideImg,
        pill: 'RIVERSIDE EXPERIENCE',
        pillColor: 'bg-amber-900/80 text-amber-200 border-amber-700/60',
        icon: '🌊',
        bullets: [
            { icon: '🛕', text: 'Close to ghats & Ganga Aarti' },
            { icon: '👁️', text: 'Beautiful river views & sunrise' },
            { icon: '🏨', text: 'Heritage hotels, guest houses & premium stays' },
            { icon: '🚶', text: 'Walking distance to attractions (some areas may have limited vehicle access)' }
        ],
        idealFor: 'Pilgrims, photographers, couples and spiritual travellers'
    },
    {
        id: 'cantonment',
        title: 'Cantonment & Sigra Hotels',
        tagline: 'Convenient, comfortable and well-connected',
        image: stayCantonmentImg,
        pill: 'EASY ACCESS & COMFORT',
        pillColor: 'bg-stone-900/80 text-amber-300 border-amber-600/40',
        icon: '🏢',
        bullets: [
            { icon: '🚗', text: 'Direct vehicle access from main roads' },
            { icon: '🛗', text: 'Hotels with lifts and spacious rooms' },
            { icon: '🍴', text: 'Good dining options & modern facilities' },
            { icon: '➕', text: 'Close to railway station and airport routes' }
        ],
        idealFor: 'Families, senior citizens, group tours and business travellers'
    },
    {
        id: 'temple-corridor',
        title: 'Temple Corridor & Godowlia Stays',
        tagline: 'Stay near Kashi Vishwanath and experience the city',
        image: stayTempleImg,
        pill: 'CLOSEST TO TEMPLES',
        pillColor: 'bg-amber-950/80 text-amber-200 border-amber-500/60',
        icon: '🕉️',
        bullets: [
            { icon: '🚶', text: 'Walking distance to Kashi Vishwanath Temple' },
            { icon: '🛕', text: 'Easy access to Annapurna & Vishalakshi temples' },
            { icon: '🛍️', text: 'Near local markets & traditional lanes' },
            { icon: '🏨', text: 'Budget to premium stay options' }
        ],
        idealFor: 'Devotees and travellers who want to stay close to temple area'
    },
    {
        id: 'heritage-havelis',
        title: 'Heritage Havelis & Quiet Stays',
        tagline: "Experience Kashi's heritage with modern comfort",
        image: stayHaveliImg,
        pill: 'PEACEFUL & HERITAGE',
        pillColor: 'bg-emerald-950/80 text-emerald-200 border-emerald-600/50',
        icon: '🪷',
        bullets: [
            { icon: '🍃', text: 'Peaceful locations away from traffic noise' },
            { icon: '🏛️', text: 'Heritage havelis and boutique properties' },
            { icon: '🌳', text: 'Lush courtyards and relaxing ambience' },
            { icon: '☕', text: 'Suitable for longer and peaceful spiritual stays' }
        ],
        idealFor: 'Meditation seekers, cultural travellers and guests looking for quiet stay'
    }
];

export default function StaySection() {
    const getHotelWhatsAppUrl = (categoryTitle) => {
        const text = encodeURIComponent(`Namaste Kashi-Vashi! I am inquiring about hotel recommendations for "${categoryTitle}" in Varanasi. Please share verified options, dates availability, and rates.`);
        return `https://wa.me/918149783494?text=${text}`;
    };

    return (
        <section id="stay-section" className="py-14 sm:py-20 bg-[#0c0f14] text-white relative overflow-hidden border-t border-b border-stone-800">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[600px] h-[350px] bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

                {/* =========================================================================
                    SECTION HEADER WITH CALLOUT ANNOTATION
                   ========================================================================= */}
                <div className="relative text-center max-w-4xl mx-auto mb-12 sm:mb-16">
                    
                    {/* Top Callout Sticker (Right side, desktop) */}
                    <div className="hidden lg:block absolute -right-4 top-2 text-right pointer-events-none">
                        <p className="font-serif italic text-amber-200/90 font-bold text-sm lg:text-base leading-snug drop-shadow-md">
                            Stay Close<br />
                            to Faith,<br />
                            Culture &amp; Comfort
                        </p>
                    </div>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-stone-900/90 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-sm">
                        <span>🛏️</span>
                        <span>Hotel Assistance &amp; Stay Recommendations</span>
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight leading-tight">
                        Find the Right Stay in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400">Varanasi</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-stone-300 text-xs sm:text-sm lg:text-base mt-3 max-w-3xl mx-auto leading-relaxed">
                        Looking for a comfortable stay during your spiritual journey? Kashi Vashi helps you explore accommodation options according to your budget, travel dates, preferred location and comfort needs.
                    </p>

                    <p className="text-stone-400 text-xs sm:text-sm mt-1.5 max-w-2xl mx-auto leading-relaxed">
                        Hum aapke budget aur zarurat ke mutabiq 3-Star se 5-Star verified hotels aur heritage havelis arrange karte hain. Ganga kinare ghat par rahna ho, city center temple ke paas, ya fir Cantt ke shaant luxury area me — har jagah verified stays uplabdh hain.
                    </p>

                    {/* 4 Feature Badges Row */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-6 pt-4 border-t border-stone-800/80">
                        <div className="flex items-center gap-1.5 text-xs text-stone-300 bg-stone-900/80 px-3 py-1.5 rounded-full border border-stone-800">
                            <span className="text-amber-400">📍</span>
                            <span>Different Locations &amp; Budgets</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-stone-300 bg-stone-900/80 px-3 py-1.5 rounded-full border border-stone-800">
                            <span className="text-amber-400">👥</span>
                            <span>Suitable for Families, Groups &amp; Senior Citizens</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-stone-300 bg-stone-900/80 px-3 py-1.5 rounded-full border border-stone-800">
                            <span className="text-amber-400">🛡️</span>
                            <span>Verified Options &amp; Transparent Guidance</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-stone-300 bg-stone-900/80 px-3 py-1.5 rounded-full border border-stone-800">
                            <span className="text-amber-400">🤝</span>
                            <span>Assistance from Local Experts</span>
                        </div>
                    </div>
                </div>

                {/* =========================================================================
                    4-COLUMN STAY CARDS (Side-by-Side Grid as in uploaded design)
                   ========================================================================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {STAY_CATEGORIES.map((stay) => (
                        <div
                            key={stay.id}
                            className="bg-stone-900/90 rounded-3xl p-5 border border-stone-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1 hover:shadow-2xl"
                            style={{
                                boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                            }}
                        >
                            <div>
                                {/* Image Showcase with Pill Badge */}
                                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-4 border border-stone-800 bg-stone-950">
                                    <img
                                        src={stay.image}
                                        alt={stay.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
                                    
                                    {/* Category Pill Tag on Image */}
                                    <div className={`absolute bottom-2.5 right-2.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border shadow-md ${stay.pillColor}`}>
                                        {stay.pill}
                                    </div>
                                </div>

                                {/* Icon & Title */}
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="text-xl">{stay.icon}</span>
                                    <h3 className="font-serif font-black text-base sm:text-lg text-white leading-tight group-hover:text-amber-300 transition-colors">
                                        {stay.title}
                                    </h3>
                                </div>

                                {/* Italic Tagline */}
                                <p className="text-amber-300/80 text-xs italic font-serif mb-4">
                                    "{stay.tagline}"
                                </p>

                                {/* Bullets */}
                                <div className="space-y-2.5 mb-5">
                                    {stay.bullets.map((b, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                                            <span className="text-sm mt-[-1px] shrink-0" aria-hidden="true">{b.icon}</span>
                                            <span className="leading-snug">{b.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Ideal For & Action Button */}
                            <div className="pt-3 border-t border-stone-800/80">
                                <p className="text-[11px] text-stone-400 mb-3 flex items-start gap-1 leading-snug">
                                    <span className="text-amber-400 shrink-0">👥</span>
                                    <span><strong>Ideal for:</strong> {stay.idealFor}</span>
                                </p>

                                <a
                                    href={getHotelWhatsAppUrl(stay.title)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackWhatsAppClick(`stay_book_${stay.id}`)}
                                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-xs sm:text-sm py-2.5 px-4 rounded-full shadow-md transition-all group/btn"
                                >
                                    <span className="text-sm">💬</span>
                                    <span>Get Hotel Recommendations</span>
                                    <span className="text-xs transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true">&gt;</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* =========================================================================
                    BOTTOM BANNER: Travelling with Senior Citizens or Children?
                   ========================================================================= */}
                <div className="bg-stone-900/90 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        
                        {/* Left Ghat Family Visual (3 cols on desktop) */}
                        <div className="lg:col-span-3 rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] border border-stone-800 shadow-md">
                            <img
                                src={stayFamilyBannerImg}
                                alt="Senior Citizens and Family at Varanasi Ghats"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>

                        {/* Middle Text Narrative (5 cols on desktop) */}
                        <div className="lg:col-span-5 space-y-2">
                            <h3 className="text-lg sm:text-2xl font-serif font-black text-white leading-tight">
                                Travelling with Senior Citizens or Children?
                            </h3>
                            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                                Tell us your travel dates, budget and accessibility needs. We'll help you shortlist suitable stays in the best locations, subject to availability.
                            </p>
                        </div>

                        {/* Right Stacked Action Buttons (4 cols on desktop) */}
                        <div className="lg:col-span-4 flex flex-col gap-3">
                            <Link
                                to="/hotels"
                                className="w-full inline-flex items-center justify-between p-3 rounded-2xl bg-stone-850 hover:bg-stone-800 text-white font-bold text-xs border border-stone-700 hover:border-amber-400/50 shadow-sm transition group"
                            >
                                <div className="flex items-center gap-2.5">
                                    <span className="text-base">📖</span>
                                    <div className="text-left">
                                        <span className="block text-xs font-bold">Read Hotels &amp; Area Guide</span>
                                        <span className="text-[10px] text-stone-400 font-normal">Explore the best areas to stay in Varanasi</span>
                                    </div>
                                </div>
                                <span className="text-amber-400 group-hover:translate-x-1 transition-transform" aria-hidden="true">&gt;</span>
                            </Link>

                            <a
                                href={`${WHATSAPP_URL}&text=${encodeURIComponent('Namaste Kashi-Vashi! I am travelling with senior citizens/family and need personalized hotel suggestions with lift & vehicle access.')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackWhatsAppClick('stay_expert_help')}
                                className="w-full inline-flex items-center justify-between p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition group"
                            >
                                <div className="flex items-center gap-2.5">
                                    <span className="text-base">💬</span>
                                    <div className="text-left">
                                        <span className="block text-xs font-bold">Chat with Stay Expert</span>
                                        <span className="text-[10px] text-emerald-100 font-normal">Get personalised hotel suggestions</span>
                                    </div>
                                </div>
                                <span className="text-white group-hover:translate-x-1 transition-transform" aria-hidden="true">&gt;</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Tickers Strip */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-stone-400 pt-3">
                    <span className="flex items-center gap-1.5">
                        <span className="text-amber-400">📍</span>
                        <span>Local Support</span>
                    </span>
                    <span className="text-stone-700">•</span>
                    <span className="flex items-center gap-1.5">
                        <span className="text-amber-400">🛡️</span>
                        <span>Transparent Guidance</span>
                    </span>
                    <span className="text-stone-700">•</span>
                    <span className="flex items-center gap-1.5">
                        <span className="text-amber-400">👥</span>
                        <span>Multiple Stay Options</span>
                    </span>
                    <span className="text-stone-700">•</span>
                    <span className="flex items-center gap-1.5">
                        <span className="text-amber-400">🪷</span>
                        <span>Focus on Comfort &amp; Convenience</span>
                    </span>
                </div>

            </div>
        </section>
    );
}
