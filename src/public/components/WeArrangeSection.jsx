import React from 'react';
import { Link } from 'react-router-dom';
import { WHATSAPP_URL } from '../../shared/config/brand';
import { trackWhatsAppClick } from '../utils/analytics';
import srvBoatImg from '../../assets/services/srv-boat-aarti.avif';
import srvDarshanImg from '../../assets/services/srv-darshan.avif';
import srvCabsImg from '../../assets/services/srv-cabs.avif';
import srvHotelsImg from '../../assets/services/srv-hotels.avif';
import srvGuideImg from '../../assets/services/srv-guide.avif';
import srvRitualsImg from '../../assets/services/srv-rituals.avif';
import srvSilkImg from '../../assets/services/srv-silk.avif';
import srvCircuitImg from '../../assets/services/srv-circuit.avif';
import srvPlanBannerImg from '../../assets/services/srv-plan-banner.avif';

const POPULAR_SERVICES = [
    {
        id: 'boat-ride-aarti',
        title: 'Private Boat Rides & Ganga Aarti',
        subtitle: 'Sunrise, Sunset & Evening Experience',
        desc: 'Private boat ride arrangements, sunrise experiences and evening Ganga Aarti with life jackets and registered boatmen.',
        image: srvBoatImg,
        badge: 'MOST POPULAR',
        badgeColor: 'bg-amber-900/90 text-amber-200 border-amber-700/60',
        icon: '⛵',
        link: '/experiences/varanasi-boat-ride',
        ctaText: 'Enquire',
        whatsappMsg: 'Namaste Kashi-Vashi! I am inquiring about booking a Private Boat Ride & Ganga Aarti in Varanasi. Please share options and rates.'
    },
    {
        id: 'kashi-vishwanath-darshan',
        title: 'Shri Kashi Vishwanath Darshan',
        subtitle: 'Temple Visit Assistance',
        desc: 'Guidance for Kashi Vishwanath darshan, Mangala Aarti tickets (subject to availability), Annapurna and nearby temples.',
        image: srvDarshanImg,
        badge: 'SPIRITUAL CORE',
        badgeColor: 'bg-purple-900/90 text-purple-200 border-purple-700/60',
        icon: '🕉️',
        link: '/experiences/temple-darshan',
        ctaText: 'Enquire',
        whatsappMsg: 'Namaste Kashi-Vashi! I need darshan guidance & assistance for Shri Kashi Vishwanath Temple. Please share details.'
    },
    {
        id: 'cabs-transfers',
        title: 'Private AC Cabs & Transfers',
        subtitle: 'Airport, Railway Station & Local Travel',
        desc: 'Comfortable Innova Crysta and other AC vehicles for airport/railway transfers and Varanasi sightseeing with courteous drivers.',
        image: srvCabsImg,
        badge: 'RELIABLE TRAVEL',
        badgeColor: 'bg-blue-900/90 text-blue-200 border-blue-700/60',
        icon: '🚗',
        link: '#fleet-section',
        ctaText: 'Check Availability',
        whatsappMsg: 'Namaste Kashi-Vashi! I need a private AC Cab (Innova Crysta / Sedan) for Varanasi transfers and sightseeing. Please share availability and rates.'
    },
    {
        id: 'hotel-assistance',
        title: 'Hotel Assistance & Stay Options',
        subtitle: 'Budget to Premium Stays',
        desc: 'Handpicked stay options in ghats, temple area, Cantonment and other locations as per your budget and preferences.',
        image: srvHotelsImg,
        badge: 'COMFORTABLE STAYS',
        badgeColor: 'bg-amber-950/90 text-amber-300 border-amber-600/60',
        icon: '🛏️',
        link: '/hotels',
        ctaText: 'Enquire',
        whatsappMsg: 'Namaste Kashi-Vashi! I need verified hotel assistance in Varanasi (Riverside/Cantt/Temple area). Please share recommended stays.'
    }
];

const EXPERIENCES_SERVICES = [
    {
        id: 'heritage-guides',
        title: 'Local Heritage Guides',
        subtitle: 'Guided Tours in Hindi, English & Tamil',
        desc: 'Experienced local guides for temple tours, old city walks and cultural insights. Language support subject to availability.',
        image: srvGuideImg,
        badge: 'LOCAL EXPERTS',
        badgeColor: 'bg-amber-800/90 text-amber-200 border-amber-600/60',
        icon: '👨‍💼',
        link: '/travel-guide',
        ctaText: 'Enquire',
        whatsappMsg: 'Namaste Kashi-Vashi! I would like to book a certified Local Heritage Guide in Varanasi. Please share availability and guide rates.'
    },
    {
        id: 'vedic-rituals',
        title: 'Vedic Rituals, Pandits & Pind Daan',
        subtitle: 'Authentic & Respectful Arrangements',
        desc: 'Pandit arrangements for Rudrabhishek, Sankalp puja, Ganga pujan, Pind daan and other rituals as per your requirements.',
        image: srvRitualsImg,
        badge: 'TRADITIONAL RITUALS',
        badgeColor: 'bg-rose-900/90 text-rose-200 border-rose-700/60',
        icon: '🪷',
        link: '/plan-your-trip',
        ctaText: 'Enquire',
        whatsappMsg: 'Namaste Kashi-Vashi! I need pandit arrangements for Vedic rituals / Rudrabhishek / Pind Daan in Varanasi. Please guide me.'
    },
    {
        id: 'silk-weaving',
        title: 'Banarasi Silk & Weaving Experiences',
        subtitle: 'Meet Artisans & Explore Handloom',
        desc: 'Visit traditional loom clusters, meet local weavers and explore authentic Banarasi silk sarees and handicrafts.',
        image: srvSilkImg,
        badge: 'LOCAL ARTISANS',
        badgeColor: 'bg-indigo-900/90 text-indigo-200 border-indigo-700/60',
        icon: '🧵',
        link: '/experiences',
        ctaText: 'Enquire',
        whatsappMsg: 'Namaste Kashi-Vashi! I want to visit traditional Banarasi silk weavers and handloom clusters. Please arrange a guided artisan walk.'
    },
    {
        id: 'circuit-tours',
        title: 'Ayodhya, Bodhgaya & Mirzapur Tours',
        subtitle: 'Customised Pilgrimage Circuits',
        desc: 'Plan complete tours to Ayodhya Ram Mandir, Bodhgaya Mahabodhi, Prayagraj Sangam and Mirzapur with comfortable travel arrangements.',
        image: srvCircuitImg,
        badge: 'MULTI-CITY TOURS',
        badgeColor: 'bg-blue-950/90 text-blue-200 border-blue-600/60',
        icon: '🛕',
        link: '/destinations',
        ctaText: 'Enquire',
        whatsappMsg: 'Namaste Kashi-Vashi! I want to book a multi-city pilgrimage tour (Ayodhya, Bodhgaya, Prayagraj, Mirzapur). Please share itinerary and package quotes.'
    }
];

export default function WeArrangeSection() {
    const getWhatsAppUrl = (msg) => {
        return `https://wa.me/918149783494?text=${encodeURIComponent(msg)}`;
    };

    return (
        <section id="we-arrange-section" className="py-14 sm:py-20 bg-gradient-to-b from-[#fcfbf8] via-[#f7f4ed] to-[#f4eee4] border-t border-b border-stone-200/90 relative overflow-hidden">
            
            {/* Ambient Background Aura */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

                {/* =========================================================================
                    SECTION HEADER
                   ========================================================================= */}
                <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#fbf3e0] border border-amber-300 text-amber-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3.5 shadow-2xs">
                        <span>🛕</span>
                        <span>Complete On-Ground Pilgrimage Assistance</span>
                    </div>

                    {/* Main Title */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-stone-900 tracking-tight leading-tight">
                        We Arrange <span className="text-[#a84d25]">for You</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-stone-600 text-xs sm:text-sm lg:text-base mt-3 max-w-3xl mx-auto leading-relaxed">
                        From darshan and private transport to local guides, stays and multi-city pilgrimages, we help coordinate your journey around your needs.
                    </p>

                    {/* 5 Value Badges Row */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-6 pt-4 border-t border-stone-200/80">
                        <div className="flex items-center gap-1.5 text-xs text-stone-700 bg-white px-3 py-1.5 rounded-full border border-stone-200 shadow-2xs font-medium">
                            <span className="text-amber-600">👥</span>
                            <span>Personalised Itineraries</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-stone-700 bg-white px-3 py-1.5 rounded-full border border-stone-200 shadow-2xs font-medium">
                            <span className="text-emerald-600">🛡️</span>
                            <span>Trusted Local Support</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-stone-700 bg-white px-3 py-1.5 rounded-full border border-stone-200 shadow-2xs font-medium">
                            <span className="text-amber-600 font-bold">₹</span>
                            <span>Transparent Pricing</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-stone-700 bg-white px-3 py-1.5 rounded-full border border-stone-200 shadow-2xs font-medium">
                            <span className="text-amber-700">🪷</span>
                            <span>Comfort &amp; Convenience</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-stone-700 bg-white px-3 py-1.5 rounded-full border border-stone-200 shadow-2xs font-medium">
                            <span className="text-stone-600">🎧</span>
                            <span>Assistance in Hindi | English | Tamil</span>
                        </div>
                    </div>
                </div>

                {/* =========================================================================
                    SUB-SECTION 1: POPULAR SERVICES (4 CARDS)
                   ========================================================================= */}
                <div className="mb-14">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-6">
                        <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 flex items-center gap-2">
                            <span className="text-[#a84d25] font-bold">—</span>
                            <span>Popular Services</span>
                        </h3>
                        <p className="text-stone-500 text-xs sm:text-sm font-medium">
                            Most requested services for a comfortable and memorable journey.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {POPULAR_SERVICES.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-md hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    {/* Image with Tag Pill */}
                                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-4 border border-stone-100 bg-stone-100">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
                                        
                                        {/* Pill Badge */}
                                        <div className={`absolute top-2.5 right-2.5 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border shadow-xs ${item.badgeColor}`}>
                                            {item.badge}
                                        </div>

                                        {/* Floating Circular Icon */}
                                        <div className="absolute -bottom-2 left-3 w-9 h-9 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center text-base">
                                            {item.icon}
                                        </div>
                                    </div>

                                    {/* Titles */}
                                    <div className="pt-2">
                                        <h4 className="font-serif font-black text-base text-stone-900 leading-tight group-hover:text-[#a84d25] transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-[11px] font-bold text-[#b5522d] mt-1 mb-2.5 leading-snug">
                                            {item.subtitle}
                                        </p>
                                        <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions Bar */}
                                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                                    <Link
                                        to={item.link}
                                        className="text-xs font-bold text-stone-700 hover:text-amber-800 inline-flex items-center gap-1 transition-colors"
                                    >
                                        <span>View Details</span>
                                        <span aria-hidden="true">→</span>
                                    </Link>

                                    <a
                                        href={getWhatsAppUrl(item.whatsappMsg)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackWhatsAppClick(`we_arrange_${item.id}`)}
                                        className="inline-flex items-center gap-1.5 bg-[#eaf7ee] hover:bg-[#d5eedd] text-[#1b7a3e] border border-[#a6dfb8] px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow-xs"
                                    >
                                        <span className="text-sm">💬</span>
                                        <span>{item.ctaText}</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* =========================================================================
                    SUB-SECTION 2: SPIRITUAL & CULTURAL EXPERIENCES (4 CARDS)
                   ========================================================================= */}
                <div className="mb-14">
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-6">
                        <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 flex items-center gap-2">
                            <span className="text-[#a84d25] font-bold">—</span>
                            <span>Spiritual &amp; Cultural Experiences</span>
                        </h3>
                        <p className="text-stone-500 text-xs sm:text-sm font-medium">
                            Enrich your journey with authentic local experiences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {EXPERIENCES_SERVICES.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-md hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    {/* Image with Tag Pill */}
                                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-4 border border-stone-100 bg-stone-100">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
                                        
                                        {/* Pill Badge */}
                                        <div className={`absolute top-2.5 right-2.5 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border shadow-xs ${item.badgeColor}`}>
                                            {item.badge}
                                        </div>

                                        {/* Floating Circular Icon */}
                                        <div className="absolute -bottom-2 left-3 w-9 h-9 rounded-full bg-white shadow-md border border-stone-200 flex items-center justify-center text-base">
                                            {item.icon}
                                        </div>
                                    </div>

                                    {/* Titles */}
                                    <div className="pt-2">
                                        <h4 className="font-serif font-black text-base text-stone-900 leading-tight group-hover:text-[#a84d25] transition-colors">
                                            {item.title}
                                        </h4>
                                        <p className="text-[11px] font-bold text-[#b5522d] mt-1 mb-2.5 leading-snug">
                                            {item.subtitle}
                                        </p>
                                        <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions Bar */}
                                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                                    <Link
                                        to={item.link}
                                        className="text-xs font-bold text-stone-700 hover:text-amber-800 inline-flex items-center gap-1 transition-colors"
                                    >
                                        <span>View Details</span>
                                        <span aria-hidden="true">→</span>
                                    </Link>

                                    <a
                                        href={getWhatsAppUrl(item.whatsappMsg)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackWhatsAppClick(`we_arrange_${item.id}`)}
                                        className="inline-flex items-center gap-1.5 bg-[#eaf7ee] hover:bg-[#d5eedd] text-[#1b7a3e] border border-[#a6dfb8] px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs hover:shadow-xs"
                                    >
                                        <span className="text-sm">💬</span>
                                        <span>{item.ctaText}</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* =========================================================================
                    BOTTOM BANNER: TELL US YOUR TRAVEL PLANS (Matches design)
                   ========================================================================= */}
                <div className="bg-stone-950 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl overflow-hidden relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        
                        {/* Left Panoramic Sunset Ghats (3 cols) */}
                        <div className="lg:col-span-3 rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] border border-stone-800 shadow-md">
                            <img
                                src={srvPlanBannerImg}
                                alt="Morning Ghats at Sunrise"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>

                        {/* Middle Narrative (5 cols) */}
                        <div className="lg:col-span-5 space-y-1.5">
                            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                                <span>🔥</span>
                                <span>READY TO PLAN YOUR JOURNEY?</span>
                            </span>
                            <h3 className="text-xl sm:text-2xl font-serif font-black text-white leading-tight">
                                Tell Us Your Travel Plans
                            </h3>
                            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                                Share your travel dates, group size and preferred services. We'll help you with a customised itinerary and suitable arrangements.
                            </p>
                        </div>

                        {/* Right Action Buttons (4 cols) */}
                        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                            {/* 1. Enquire on WhatsApp */}
                            <a
                                href={getWhatsAppUrl('Namaste Kashi-Vashi! I would like to discuss my travel plans and get a customised pilgrimage itinerary.')}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackWhatsAppClick('we_arrange_tell_us_whatsapp')}
                                className="w-full inline-flex items-center justify-between p-3 rounded-2xl bg-[#008f4c] hover:bg-[#007a41] text-white font-bold text-xs shadow-md transition group"
                            >
                                <div className="flex items-center gap-2.5">
                                    <span className="text-lg">💬</span>
                                    <div className="text-left">
                                        <span className="block text-xs font-bold">Enquire on WhatsApp</span>
                                        <span className="text-[10px] text-emerald-100 font-normal">Get quick assistance</span>
                                    </div>
                                </div>
                                <span className="text-white group-hover:translate-x-1 transition-transform" aria-hidden="true">&gt;</span>
                            </a>

                            {/* 2. Plan Custom Trip */}
                            <Link
                                to="/plan-your-trip"
                                className="w-full inline-flex items-center justify-between p-3 rounded-2xl bg-[#f59e0b] hover:bg-[#d97706] text-stone-950 font-bold text-xs shadow-md transition group"
                            >
                                <div className="flex items-center gap-2.5">
                                    <span className="text-lg">📅</span>
                                    <div className="text-left">
                                        <span className="block text-xs font-bold text-stone-950">Plan Custom Trip</span>
                                        <span className="text-[10px] text-stone-900 font-normal">Share your requirements</span>
                                    </div>
                                </div>
                                <span className="text-stone-950 group-hover:translate-x-1 transition-transform" aria-hidden="true">&gt;</span>
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
