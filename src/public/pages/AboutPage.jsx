import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../seo/SEO';
import Breadcrumb from '../components/Breadcrumb';
import ImageWithSkeleton from '../components/ImageWithSkeleton';
import heroGangaAartiImg from '../../assets/hero/hero-ganga-aarti.avif';
import logoImg from '../../assets/logo.png';
import { trackWhatsAppClick, trackCallClick } from '../utils/analytics';
import {
    DISPLAY_PHONE,
    PHONE_URL,
    WHATSAPP_RAW_NUMBER,
    EMAIL,
    INSTAGRAM_URL,
    INSTAGRAM_HANDLE,
    VLOG_URL
} from '../../shared/config/brand';

export default function AboutPage() {
    const location = useLocation();

    // Modal state for Donation and Volunteering
    const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
    const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);

    // Form states for Donation Modal
    const [donateForm, setDonateForm] = useState({
        name: '',
        mobile: '',
        email: '',
        category: "Sponsor a Child's Education",
        message: ''
    });
    const [donateSubmitted, setDonateSubmitted] = useState(false);

    // Form states for Volunteer Modal
    const [volunteerForm, setVolunteerForm] = useState({
        name: '',
        mobile: '',
        email: '',
        skill: 'Basic Computer & Digital Literacy',
        dates: '',
        message: ''
    });
    const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);

    // Handle hash scrolling on direct navigation or anchor click
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const targetElement = document.getElementById(id);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [location]);

    // Close modals on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setIsDonateModalOpen(false);
                setIsVolunteerModalOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Prevent background scrolling when a modal is open
    useEffect(() => {
        if (isDonateModalOpen || isVolunteerModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isDonateModalOpen, isVolunteerModalOpen]);

    // Handle Donation Form Email Submission
    const handleDonateEmailSubmit = (e) => {
        e.preventDefault();
        if (!donateForm.name || !donateForm.mobile || !donateForm.email) {
            alert('Please fill all mandatory fields: Name, Mobile, and Email.');
            return;
        }

        const subject = encodeURIComponent(
            `[Saathi Seva Sadan Trust] Donation & Sponsorship Inquiry - ${donateForm.name}`
        );
        const body = encodeURIComponent(
            `Namaste Avaneesh ji & Saathi Seva Sadan Team,\n\n` +
            `I would like to support Saathi Seva Sadan Trust with a donation or sponsorship.\n\n` +
            `My Details:\n` +
            `• Full Name: ${donateForm.name}\n` +
            `• Mobile Number: ${donateForm.mobile}\n` +
            `• Email Address: ${donateForm.email}\n` +
            `• Contribution Interest: ${donateForm.category}\n` +
            `• Notes / Message: ${donateForm.message || 'None'}\n\n` +
            `Please share the official trust bank details and guidelines. Thank you!\n`
        );

        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
        setDonateSubmitted(true);
    };

    // Handle Donation Form WhatsApp Submission
    const handleDonateWhatsAppSubmit = () => {
        if (!donateForm.name || !donateForm.mobile || !donateForm.email) {
            alert('Please fill all mandatory fields: Name, Mobile, and Email.');
            return;
        }

        const text = encodeURIComponent(
            `Namaste Avaneesh ji! I want to support Saathi Seva Sadan Trust.\n\n` +
            `• Name: ${donateForm.name}\n` +
            `• Mobile: ${donateForm.mobile}\n` +
            `• Email: ${donateForm.email}\n` +
            `• Interest: ${donateForm.category}\n` +
            (donateForm.message ? `• Note: ${donateForm.message}\n\n` : '\n') +
            `Please share the official trust account details.`
        );

        trackWhatsAppClick('trust_donation_form_submit');
        window.open(`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${text}`, '_blank');
        setDonateSubmitted(true);
    };

    // Handle Volunteer Form Email Submission
    const handleVolunteerEmailSubmit = (e) => {
        e.preventDefault();
        if (!volunteerForm.name || !volunteerForm.mobile || !volunteerForm.email) {
            alert('Please fill all mandatory fields: Name, Mobile, and Email.');
            return;
        }

        const subject = encodeURIComponent(
            `[Saathi Seva Sadan Trust] Volunteer in Varanasi Application - ${volunteerForm.name}`
        );
        const body = encodeURIComponent(
            `Namaste Avaneesh ji & Saathi Seva Sadan Team,\n\n` +
            `I would like to volunteer and spend time mentoring children at Saathi Seva Sadan Trust during my visit to Varanasi.\n\n` +
            `My Details:\n` +
            `• Full Name: ${volunteerForm.name}\n` +
            `• Mobile Number: ${volunteerForm.mobile}\n` +
            `• Email Address: ${volunteerForm.email}\n` +
            `• Skill / Mentorship Area: ${volunteerForm.skill}\n` +
            `• Availability / Varanasi Travel Dates: ${volunteerForm.dates || 'To be decided'}\n` +
            `• About Myself / Notes: ${volunteerForm.message || 'None'}\n\n` +
            `Looking forward to coordinating with the trust team in Varanasi.\n`
        );

        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
        setVolunteerSubmitted(true);
    };

    // Handle Volunteer Form WhatsApp Submission
    const handleVolunteerWhatsAppSubmit = () => {
        if (!volunteerForm.name || !volunteerForm.mobile || !volunteerForm.email) {
            alert('Please fill all mandatory fields: Name, Mobile, and Email.');
            return;
        }

        const text = encodeURIComponent(
            `Namaste Avaneesh ji! I would like to volunteer with Saathi Seva Sadan Trust in Varanasi.\n\n` +
            `• Name: ${volunteerForm.name}\n` +
            `• Mobile: ${volunteerForm.mobile}\n` +
            `• Email: ${volunteerForm.email}\n` +
            `• Skill: ${volunteerForm.skill}\n` +
            (volunteerForm.dates ? `• Dates: ${volunteerForm.dates}\n` : '') +
            (volunteerForm.message ? `• Note: ${volunteerForm.message}\n\n` : '\n') +
            `Please let me know how I can participate.`
        );

        trackWhatsAppClick('trust_volunteer_form_submit');
        window.open(`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${text}`, '_blank');
        setVolunteerSubmitted(true);
    };

    // Travel WhatsApp URL
    const travelWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
        'Namaste Kashi-Vashi! I would like to plan a spiritual pilgrimage tour in Varanasi.'
    )}`;

    const serviceCards = [
        {
            icon: '🕉️',
            title: 'Spiritual & Pilgrimage Tours',
            description:
                'Thoughtfully managed Kashi Vishwanath darshan, early-morning Subah-e-Banaras, evening Ganga Aarti boat cruises, and authentic Vedic rituals led by respected local priests.',
            link: '/experiences',
            linkText: 'Explore Experiences'
        },
        {
            icon: '🏛️',
            title: 'Varanasi Sightseeing & Heritage',
            description:
                'Immersive walks through ancient alleys, historic Ghat explorations, Banarasi silk handloom weaving clusters, and in-depth excursions to Sarnath Buddhist heritage monuments.',
            link: '/destinations/varanasi',
            linkText: 'Discover Heritage'
        },
        {
            icon: '🗺️',
            title: 'Customised Travel Itineraries',
            description:
                'Bespoke pilgrimage schedules calibrated to your exact travel dates, family preferences, physical comfort, and regional circuits including Ayodhya, Prayagraj, and Bodh Gaya.',
            link: '/plan-your-trip',
            linkText: 'Customise Itinerary'
        },
        {
            icon: '👨‍👩‍👧‍👦',
            title: 'Family & Senior Citizen Travel',
            description:
                'Dedicated elder-first hospitality featuring low-step AC cabs, ground-floor/elevator hotel selections, unhurried pacing, wheelchair assistance, and respectful local escorting.',
            link: '/hotels',
            linkText: 'Senior-Friendly Stays'
        },
        {
            icon: '🚐',
            title: 'Group Fleet & Commercial Transport',
            description:
                'Modern, verified AC vehicles ranging from comfortable sedans and Innova Crysta to Force Urbania and luxury coaches, operated by disciplined, background-verified chauffeurs.',
            link: '/fleet',
            linkText: 'View Vehicle Fleet'
        },
        {
            icon: '🤝',
            title: 'B2B Travel Planning & Operations',
            description:
                'Reliable on-ground white-label handling, ground coordination, and dependable operational execution for domestic and international travel agents, tour operators, and corporate groups.',
            link: '/contact',
            linkText: 'Partner With Us'
        }
    ];

    const trustPillars = [
        {
            icon: '🎓',
            badge: 'Pillar 01',
            title: 'Free Education',
            description:
                'Sponsoring school fees, textbooks, notebooks, school bags, stationery, and daily remedial tutoring for underprivileged children who would otherwise miss schooling.'
        },
        {
            icon: '🍲',
            badge: 'Pillar 02',
            title: 'Food & Nutrition Support',
            description:
                'Providing wholesome daily meals, healthy nourishment, and essential sustenance so no young child is forced to study or sleep on an empty stomach.'
        },
        {
            icon: '🛠️',
            badge: 'Pillar 03',
            title: 'Skills & Business Exposure',
            description:
                'Equipping youth and growing children with practical digital literacy, handicrafts, vocational know-how, and entrepreneurship insights for a self-reliant future.'
        },
        {
            icon: '🏡',
            badge: 'Pillar 04',
            title: 'Personal Growth & Dignity',
            description:
                'Cultivating moral character, self-confidence, hygiene awareness, safe care, and a supportive environment where every child feels respected and valued.'
        }
    ];

    return (
        <>
            <SEO
                title="About Us | Kashi Vashi Spiritual & Heritage Services & Saathi Seva Sadan Trust"
                description="Discover Kashi Vashi Spiritual & Heritage Services, founded by Avaneesh Kumar to provide honest pilgrimage stewardship in Varanasi, and learn about Saathi Seva Sadan Trust supporting underprivileged children."
                pathname="/about"
            />

            {/* Breadcrumb Header Bar */}
            <div className="bg-stone-100/70 border-b border-stone-200/80 py-3.5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <Breadcrumb crumbs={[{ label: 'About Us' }]} />
                </div>
            </div>

            <article className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-16 sm:space-y-24">

                {/* =========================================================================
                    SECTION 01: HERO — TRAVEL WITH PURPOSE
                   ========================================================================= */}
                <section id="hero" className="scroll-mt-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold uppercase tracking-wider">
                                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                                <span>Kashi Vashi Spiritual &amp; Heritage Services</span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-stone-900 leading-[1.18] tracking-tight">
                                Discover Spiritual India. <br className="hidden sm:inline" />
                                Experience Its Heritage. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">
                                    Travel with Purpose.
                                </span>
                            </h1>

                            <div className="w-20 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />

                            <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                                <strong>Kashi Vashi Spiritual &amp; Heritage Services</strong> is dedicated to helping travellers explore the spiritual, cultural, and heritage destinations of India, starting with the timeless city of Varanasi. Rooted in authentic hospitality and local stewardship, we bridge the gap between sacred devotion and seamless, dignified pilgrimage arrangements.
                            </p>

                            {/* In-page Accessible Navigation Anchors */}
                            <div className="pt-2">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-2.5">
                                    Quick In-Page Navigation:
                                </span>
                                <nav aria-label="About page sections" className="flex flex-wrap gap-2 sm:gap-3">
                                    <a
                                        href="#services"
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition border border-stone-200/90 shadow-2xs"
                                    >
                                        <span>Our Services</span>
                                        <span className="text-amber-600 text-xs">↓</span>
                                    </a>
                                    <a
                                        href="#founder"
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition border border-stone-200/90 shadow-2xs"
                                    >
                                        <span>Meet Our Founder</span>
                                        <span className="text-amber-600 text-xs">↓</span>
                                    </a>
                                    <a
                                        href="#social-impact"
                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold transition border border-amber-300/80 shadow-2xs"
                                    >
                                        <span className="text-amber-600">🌱</span>
                                        <span>Social Initiative (Trust)</span>
                                        <span className="text-amber-600 text-xs">↓</span>
                                    </a>
                                </nav>
                            </div>
                        </div>

                        {/* Visual Card */}
                        <div className="lg:col-span-5">
                            <div className="relative rounded-3xl overflow-hidden border border-stone-200 shadow-xl aspect-[4/3] bg-stone-900">
                                <ImageWithSkeleton
                                    src={heroGangaAartiImg}
                                    alt="Spiritual Ganga Aarti lamps at Dashashwamedh Ghat, Varanasi"
                                    className="w-full h-full object-cover"
                                    priority={true}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent flex flex-col justify-end p-6">
                                    <span className="text-amber-400 font-hindi font-medium text-xs tracking-wider block">
                                        ― आस्था से अनुभव तक ―
                                    </span>
                                    <p className="text-white text-xs sm:text-sm font-serif font-bold mt-1">
                                        "Handling logistics with honesty so you can immerse in the eternal sacredness of Kashi."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================================================
                    SECTION 02: OUR STORY, MISSION & 6 CORE SERVICES
                   ========================================================================= */}
                <section id="services" className="scroll-mt-24 pt-4 border-t border-stone-200">
                    <div className="max-w-3xl mb-10">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">
                            Section 02 • Integrity &amp; Expertise
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 leading-tight">
                            Our Story, Mission &amp; Services
                        </h2>
                        <div className="w-16 h-1 bg-amber-500 rounded-full my-4" />
                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                            We believe that travel is more than reaching a destination. It is about discovering traditions, understanding cultures, creating memories, and building meaningful connections. Our mission is to make spiritual and heritage travel more accessible, organized, and memorable while encouraging a deeper connection with India's cultural and spiritual legacy.
                        </p>
                    </div>

                    {/* 6 Core Service Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {serviceCards.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 border border-stone-200/90 hover:border-amber-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                            >
                                <div className="space-y-3">
                                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-base font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-xs text-stone-600 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>

                                <div className="pt-4 mt-4 border-t border-stone-100">
                                    <Link
                                        to={service.link}
                                        className="text-xs font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all"
                                    >
                                        <span>{service.linkText}</span>
                                        <span>→</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Commercial Travel CTA Strip */}
                    <div className="mt-8 bg-stone-900 rounded-2xl p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
                                Commercial Pilgrimage Planning
                            </span>
                            <p className="text-xs text-stone-300 mt-0.5">
                                Need custom vehicle coordination, boat aarti bookings, or hotel arrangements?
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2.5">
                            <Link
                                to="/plan-your-trip"
                                className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs"
                            >
                                Plan My Trip
                            </Link>
                            <a
                                href={travelWhatsAppUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => trackWhatsAppClick('about_services_travel_cta')}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition inline-flex items-center gap-1.5 shadow-xs"
                            >
                                <span>Travel WhatsApp</span>
                                <span>💬</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* =========================================================================
                    SECTION 03: MEET OUR FOUNDER — AVANEESH KUMAR (ELEGANT REDESIGN)
                   ========================================================================= */}
                <section id="founder" className="scroll-mt-24 pt-4 border-t border-stone-200">
                    <div className="max-w-3xl mb-8">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">
                            Section 03 • Leadership &amp; Heritage Custodianship
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 leading-tight">
                            Meet Our Founder — Avaneesh Kumar
                        </h2>
                        <div className="w-16 h-1 bg-amber-500 rounded-full my-4" />
                    </div>

                    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-md">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                            
                            {/* Left Column: Distinguished Founder Persona Card */}
                            <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950 text-white rounded-2xl p-6 sm:p-8 border border-amber-500/40 shadow-xl text-center flex flex-col items-center justify-between space-y-5">
                                
                                {/* Monogram Seal / Emblem */}
                                <div className="relative">
                                    <div className="w-28 h-28 rounded-full bg-stone-950 border-2 border-amber-400 p-2 shadow-lg shadow-amber-900/30 flex items-center justify-center">
                                        <img
                                            src={logoImg}
                                            alt="Kashi-Vashi Emblem"
                                            className="w-18 h-18 object-contain drop-shadow"
                                        />
                                    </div>
                                    <span className="absolute -bottom-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full border border-amber-300 shadow">
                                        Varanasi Local
                                    </span>
                                </div>

                                <div className="space-y-1.5 pt-1">
                                    <h3 className="text-xl sm:text-2xl font-serif font-black text-amber-300 tracking-wide">
                                        Avaneesh Kumar
                                    </h3>
                                    <div className="space-y-1">
                                        <span className="text-xs font-semibold text-stone-200 block">
                                            Founder &amp; Director, Kashi Vashi
                                        </span>
                                        <span className="text-xs font-medium text-amber-400/90 block">
                                            Trustee, साथी सेवा सदन (Saathi Seva Sadan)
                                        </span>
                                    </div>
                                </div>

                                {/* Verified Pillars */}
                                <div className="w-full pt-4 border-t border-stone-800 text-left space-y-2 text-xs text-stone-300">
                                    <div className="flex items-center gap-2">
                                        <span className="text-amber-400 text-sm">📍</span>
                                        <span>Born, Raised &amp; Operating in Varanasi</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-amber-400 text-sm">✨</span>
                                        <span>Guardian of Pilgrims &amp; Heritage</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-emerald-400 text-sm">🌱</span>
                                        <span>Community Upliftment &amp; Education</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Founder Quote & Vision Narrative */}
                            <div className="lg:col-span-7 space-y-5">
                                <div className="relative pl-6 sm:pl-8 border-l-4 border-amber-500 bg-amber-50/70 py-4 pr-5 rounded-r-2xl border border-amber-200/60 shadow-2xs">
                                    <span className="absolute -top-3 left-2 text-3xl font-serif text-amber-500 select-none">“</span>
                                    <p className="text-xs sm:text-sm text-stone-900 font-serif leading-relaxed font-semibold">
                                        "When devotees arrive in Varanasi, they seek spiritual peace, sacred darshan, and genuine human warmth. Our vision has always been twofold: to handle every travel logistical detail with utmost honesty, and to ensure that our presence gives back directly to the local community through Saathi Seva Sadan."
                                    </p>
                                    <span className="text-xs text-amber-900 font-sans font-bold block mt-3 text-right">
                                        ― Avaneesh Kumar
                                    </span>
                                </div>

                                <div className="space-y-3.5 text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                                    <p>
                                        Growing up in Kashi amidst the sacred resonance of morning temple chants and the timeless flow of Mother Ganga, Avaneesh observed a constant challenge: pilgrims, senior citizens, and visiting families often felt overwhelmed by touts, hidden fees, and unreliable arrangements.
                                    </p>
                                    <p>
                                        He established <strong>Kashi Vashi Spiritual &amp; Heritage Services</strong> to build a modern, transparent hospitality model where devotees are treated as revered guests (*Atithi Devo Bhava*). Every itinerary is crafted with personal accountability, fair pricing, and dependable on-ground execution.
                                    </p>
                                    <p>
                                        Equally core to his life's philosophy is social responsibility. Believing that sustainable entrepreneurship must uplift the local community, he established <strong>साथी सेवा सदन (Saathi Seva Sadan)</strong> to ensure underprivileged children receive the educational foundations, wholesome care, and skills necessary for a self-sufficient, dignified life.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================================================
                    SECTION 04: BEYOND TRAVEL — SAATHI SEVA SADAN (PREMIUM REDESIGN)
                   ========================================================================= */}
                <section id="social-impact" className="scroll-mt-24 pt-4 border-t border-amber-200">
                    <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-12 border border-amber-500/40 shadow-xl space-y-8 relative overflow-hidden">
                        
                        {/* Decorative Top Accent Glow */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="max-w-3xl relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
                                <span>🌱</span>
                                <span>Section 04 • Social Impact Initiative</span>
                            </div>

                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-white leading-tight">
                                Beyond Travel: साथी सेवा सदन (Saathi Seva Sadan)
                            </h2>

                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-amber-400 font-hindi text-sm sm:text-base font-semibold">
                                    ― शिक्षा • संस्कार • स्वावलंबन ―
                                </span>
                            </div>

                            <p className="text-sm sm:text-base text-amber-200 font-serif font-bold mt-2">
                                Helping Children Build a Brighter, Dignified Future
                            </p>

                            <div className="w-16 h-1 bg-amber-500 rounded-full my-4" />

                            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                                Alongside our travel mission, we introduce <strong>Saathi Seva Sadan</strong>, a charitable trust dedicated to supporting children from underprivileged backgrounds in and around Varanasi. We believe every child deserves the opportunity to learn, grow, and build a dignified future, regardless of their financial circumstances.
                            </p>
                        </div>

                        {/* 4 Pillars Grid (Redesigned with Distinct Visual Hierarchy) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
                            {trustPillars.map((pillar, idx) => (
                                <div
                                    key={idx}
                                    className="bg-stone-800/80 hover:bg-stone-800 rounded-2xl p-5 border border-stone-700/80 hover:border-amber-400/80 transition-all duration-200 flex flex-col justify-between group shadow-sm"
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                                                {pillar.icon}
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80 bg-stone-900/90 px-2 py-0.5 rounded-md border border-stone-700">
                                                {pillar.badge}
                                            </span>
                                        </div>

                                        <h4 className="text-base font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                                            {pillar.title}
                                        </h4>

                                        <p className="text-xs text-stone-300 leading-relaxed">
                                            {pillar.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Holistic Development Callout */}
                        <div className="bg-stone-950/70 rounded-2xl p-5 border border-amber-500/30 text-xs sm:text-sm text-stone-200 leading-relaxed relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <span className="text-2xl flex-shrink-0">💡</span>
                            <div>
                                <strong className="text-amber-300">A Vision for Holistic Development:</strong> Beyond formal schooling, Saathi Seva Sadan places special emphasis on mentoring young minds in practical vocational exposure, moral values, and everyday problem-solving so they can build meaningful careers and support their families.
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================================================
                    SECTION 05: BE A PART OF THE CHANGE — SUPPORT A CHILD'S FUTURE
                   ========================================================================= */}
                <section id="support-children" className="scroll-mt-24 pt-4 border-t border-stone-200">
                    <div className="max-w-3xl mb-8">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-3">
                            Section 05 • Support A Child's Future
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-stone-900 leading-tight">
                            Be a Part of the Change
                        </h2>
                        <div className="w-16 h-1 bg-emerald-500 rounded-full my-4" />
                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                            Devotees and travellers visiting Varanasi frequently ask how they can give back to the sacred city. A small, conscious act of kindness can make a transformative difference in a child's life. You can support the work of Saathi Seva Sadan through donations, volunteering, or organizational partnerships.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* 1. Donate / Sponsor Card -> Opens Donate Modal */}
                        <div className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-emerald-500/60 hover:shadow-md transition flex flex-col justify-between shadow-2xs group">
                            <div className="space-y-3">
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                                    💝
                                </div>
                                <h3 className="text-base font-serif font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                                    Donate or Sponsor
                                </h3>
                                <p className="text-xs text-stone-600 leading-relaxed">
                                    Sponsor a child's educational books and stationery, or dedicate a nourishing meal on birthdays, anniversaries, or your personal visit to Kashi.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-stone-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDonateSubmitted(false);
                                        setIsDonateModalOpen(true);
                                    }}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition inline-flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                                >
                                    <span>Donate / Sponsor Form</span>
                                    <span>📝</span>
                                </button>
                            </div>
                        </div>

                        {/* 2. Volunteer Card -> Opens Volunteer Modal */}
                        <div className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-amber-500/60 hover:shadow-md transition flex flex-col justify-between shadow-2xs group">
                            <div className="space-y-3">
                                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                                    🤝
                                </div>
                                <h3 className="text-base font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                                    Volunteer in Varanasi
                                </h3>
                                <p className="text-xs text-stone-600 leading-relaxed">
                                    Spend a meaningful morning or afternoon sharing basic computer skills, art, spoken English, or career mentorship with the children during your Varanasi stay.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-stone-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setVolunteerSubmitted(false);
                                        setIsVolunteerModalOpen(true);
                                    }}
                                    className="w-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition inline-flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                                >
                                    <span>Volunteer in Varanasi Form</span>
                                    <span>📝</span>
                                </button>
                            </div>
                        </div>

                        {/* 3. Partner & Spread Awareness */}
                        <div className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-blue-500/60 hover:shadow-md transition flex flex-col justify-between shadow-2xs group">
                            <div className="space-y-3">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                                    📢
                                </div>
                                <h3 className="text-base font-serif font-bold text-stone-900 group-hover:text-blue-800 transition-colors">
                                    Partner &amp; Share
                                </h3>
                                <p className="text-xs text-stone-600 leading-relaxed">
                                    Collaborate with Saathi Seva Sadan through your business, school, or community group, or simply share our initiative with like-minded friends and relatives.
                                </p>
                            </div>
                            <div className="pt-4 mt-4 border-t border-stone-100">
                                <a
                                    href={`tel:${DISPLAY_PHONE.replace(/\s+/g, '')}`}
                                    onClick={() => trackCallClick('about_trust_call')}
                                    className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold py-2.5 px-3 rounded-xl transition inline-flex items-center justify-center gap-2 border border-stone-300 shadow-2xs"
                                >
                                    <span>Call Trust Coordinator</span>
                                    <span>📞</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================================================
                    SECTION 06: TRUST, TRANSPARENCY & DESIGNATED CHANNELS
                   ========================================================================= */}
                <section id="transparency" className="scroll-mt-24 pt-4 border-t border-stone-200">
                    <div className="bg-stone-900 rounded-3xl p-6 sm:p-10 text-white border border-stone-800 shadow-lg space-y-6">
                        <div className="max-w-3xl">
                            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-600/50 inline-block mb-3">
                                Section 06 • Transparency &amp; Designated Channels
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                                Complete Transparency &amp; Separate Operations
                            </h2>
                            <div className="w-16 h-1 bg-amber-500 rounded-full my-4" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-stone-300 leading-relaxed">
                            <div className="space-y-3 bg-stone-800/60 p-5 rounded-2xl border border-stone-700/60">
                                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                                    <span>🔒</span>
                                    <span>Strict Operational Separation</span>
                                </h3>
                                <p>
                                    To preserve absolute financial clarity and institutional integrity, commercial travel services conducted by <strong>Kashi Vashi</strong> and charitable welfare activities by <strong>साथी सेवा सदन (Saathi Seva Sadan)</strong> are governed via separate, independent accounts.
                                </p>
                                <p className="text-stone-400 text-xs">
                                    All charitable donations are directed strictly through the trust's verified channels. We never mix commercial tour proceeds with charitable funds.
                                </p>
                            </div>

                            <div className="space-y-3 bg-stone-800/60 p-5 rounded-2xl border border-stone-700/60">
                                <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                                    <span>📍</span>
                                    <span>On-Ground Open Invitation</span>
                                </h3>
                                <p>
                                    Transparency is best experienced in person. Whenever you travel to Varanasi, you are warmly invited to visit our center, meet our founder Avaneesh Kumar and the team, and witness the learning activities firsthand.
                                </p>
                                <p className="text-stone-400 text-xs">
                                    For official trust bank accounts, receipt requests, or center visits, please communicate directly via our verified trust contact desk.
                                </p>
                            </div>
                        </div>

                        {/* Direct Channel Action Buttons */}
                        <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-center sm:text-left">
                                <span className="text-xs font-bold text-white block">
                                    Kashi Vashi Spiritual &amp; Heritage Services
                                </span>
                                <span className="text-[11px] text-stone-400">
                                    Founder &amp; Director: Avaneesh Kumar • Varanasi, Uttar Pradesh
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-2.5">
                                <Link
                                    to="/plan-your-trip"
                                    className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs"
                                >
                                    Book Travel Yatra
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDonateSubmitted(false);
                                        setIsDonateModalOpen(true);
                                    }}
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                                >
                                    <span>Support Trust Details</span>
                                    <span>🌱</span>
                                </button>
                            </div>
                        </div>

                        {/* Social & Vlog Verification Row */}
                        <div className="pt-2 text-center text-[11px] text-stone-400 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                            <span>Instagram: <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="underline font-bold text-amber-300 hover:text-white">{INSTAGRAM_HANDLE}</a></span>
                            <span>•</span>
                            <span>Travel Vlog &amp; Articles: <a href={VLOG_URL} target="_blank" rel="noopener noreferrer" className="underline font-bold text-amber-300 hover:text-white">kashi-vashi.blogspot.com</a></span>
                            <span>•</span>
                            <span>Helpline: <a href={PHONE_URL} className="underline font-bold text-stone-200 hover:text-white">{DISPLAY_PHONE}</a></span>
                        </div>
                    </div>
                </section>

            </article>

            {/* =========================================================================
                MODAL 1: DONATE / SPONSOR POPUP FORM
               ========================================================================= */}
            {isDonateModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs overflow-y-auto"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="donate-modal-title"
                >
                    <div
                        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={() => setIsDonateModalOpen(false)}
                            aria-label="Close Donation Form"
                            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center font-bold text-lg transition"
                        >
                            ✕
                        </button>

                        <div className="space-y-4">
                            {/* Header */}
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block mb-1">
                                    साथी सेवा सदन (Saathi Seva Sadan Trust)
                                </span>
                                <h3 id="donate-modal-title" className="text-xl sm:text-2xl font-serif font-black text-stone-900">
                                    Support a Child's Education &amp; Meals
                                </h3>
                            </div>

                            {/* Trust Overview Pill */}
                            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-stone-700 space-y-1.5">
                                <p className="font-semibold text-amber-900">
                                    🌟 Dedicated to Underprivileged Children in Varanasi:
                                </p>
                                <p className="leading-relaxed">
                                    Every contribution provides free school books, uniforms, educational tutoring, and nutritious meals. Our trust coordinator <strong>Avaneesh Kumar</strong> will contact you directly to guide your contribution transparently.
                                </p>
                            </div>

                            {donateSubmitted ? (
                                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-3">
                                    <span className="text-3xl block">🙏</span>
                                    <h4 className="font-serif font-bold text-stone-900 text-base">
                                        Thank You for Your Noble Support!
                                    </h4>
                                    <p className="text-xs text-stone-600 leading-relaxed">
                                        Your details have been submitted. Our trust coordinator will contact you promptly at <strong>{donateForm.mobile}</strong> or via email.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setIsDonateModalOpen(false)}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-5 rounded-xl transition"
                                    >
                                        Close Window
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleDonateEmailSubmit} className="space-y-3.5 pt-1">
                                    <div>
                                        <label className="block text-xs font-bold text-stone-800 mb-1">
                                            Your Full Name <span className="text-rose-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Ramesh Sharma"
                                            value={donateForm.name}
                                            onChange={(e) => setDonateForm({ ...donateForm, name: e.target.value })}
                                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold text-stone-800 mb-1">
                                                Mobile Number <span className="text-rose-600">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                placeholder="+91 98765 43210"
                                                value={donateForm.mobile}
                                                onChange={(e) => setDonateForm({ ...donateForm, mobile: e.target.value })}
                                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-stone-800 mb-1">
                                                Email Address <span className="text-rose-600">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="your.email@example.com"
                                                value={donateForm.email}
                                                onChange={(e) => setDonateForm({ ...donateForm, email: e.target.value })}
                                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-stone-800 mb-1">
                                            How would you like to contribute?
                                        </label>
                                        <select
                                            value={donateForm.category}
                                            onChange={(e) => setDonateForm({ ...donateForm, category: e.target.value })}
                                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition bg-white"
                                        >
                                            <option value="Sponsor a Child's Education">Sponsor a Child's Education &amp; Books</option>
                                            <option value="Sponsor Meals on Birthday / Anniversary">Sponsor Wholesome Meals on Birthday / Anniversary</option>
                                            <option value="School Bags & Stationery Support">School Bags, Stationery &amp; Uniforms</option>
                                            <option value="General Charitable Contribution">General Charitable Contribution</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-stone-800 mb-1">
                                            Message or Specific Preferences (Optional)
                                        </label>
                                        <textarea
                                            rows="2"
                                            placeholder="Tell us if you are visiting Varanasi or any specific date preference..."
                                            value={donateForm.message}
                                            onChange={(e) => setDonateForm({ ...donateForm, message: e.target.value })}
                                            className="w-full text-xs px-3.5 py-2 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                                        >
                                            <span>Send Details via Email</span>
                                            <span>✉️</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleDonateWhatsAppSubmit}
                                            className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold py-3 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                                        >
                                            <span>WhatsApp Instead</span>
                                            <span>💬</span>
                                        </button>
                                    </div>
                                    <p className="text-[11px] text-stone-500 text-center">
                                        Submissions reach our official desk at <span className="font-mono text-stone-700">{EMAIL}</span>. We respect your privacy.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* =========================================================================
                MODAL 2: VOLUNTEER IN VARANASI POPUP FORM
               ========================================================================= */}
            {isVolunteerModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs overflow-y-auto"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="volunteer-modal-title"
                >
                    <div
                        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={() => setIsVolunteerModalOpen(false)}
                            aria-label="Close Volunteer Form"
                            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center font-bold text-lg transition"
                        >
                            ✕
                        </button>

                        <div className="space-y-4">
                            {/* Header */}
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 inline-block mb-1">
                                    साथी सेवा सदन (Saathi Seva Sadan Trust)
                                </span>
                                <h3 id="volunteer-modal-title" className="text-xl sm:text-2xl font-serif font-black text-stone-900">
                                    Volunteer with Children in Varanasi
                                </h3>
                            </div>

                            {/* Trust Overview Pill */}
                            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-stone-700 space-y-1.5">
                                <p className="font-semibold text-amber-900">
                                    🤝 Share Your Knowledge, Time &amp; Heart:
                                </p>
                                <p className="leading-relaxed">
                                    Spend a meaningful morning or afternoon mentoring underprivileged children during your trip to Kashi. We will arrange a safe and convenient interaction session.
                                </p>
                            </div>

                            {volunteerSubmitted ? (
                                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-3">
                                    <span className="text-3xl block">🙏</span>
                                    <h4 className="font-serif font-bold text-stone-900 text-base">
                                        Volunteer Application Received!
                                    </h4>
                                    <p className="text-xs text-stone-600 leading-relaxed">
                                        Thank you! Our trust coordinator Avaneesh Kumar will connect with you at <strong>{volunteerForm.mobile}</strong> to finalize dates and schedule your visit.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setIsVolunteerModalOpen(false)}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-5 rounded-xl transition"
                                    >
                                        Close Window
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleVolunteerEmailSubmit} className="space-y-3.5 pt-1">
                                    <div>
                                        <label className="block text-xs font-bold text-stone-800 mb-1">
                                            Your Full Name <span className="text-rose-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Ananya Sen"
                                            value={volunteerForm.name}
                                            onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold text-stone-800 mb-1">
                                                Mobile Number <span className="text-rose-600">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                placeholder="+91 98765 43210"
                                                value={volunteerForm.mobile}
                                                onChange={(e) => setVolunteerForm({ ...volunteerForm, mobile: e.target.value })}
                                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-stone-800 mb-1">
                                                Email Address <span className="text-rose-600">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="your.email@example.com"
                                                value={volunteerForm.email}
                                                onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold text-stone-800 mb-1">
                                                How would you like to mentor?
                                            </label>
                                            <select
                                                value={volunteerForm.skill}
                                                onChange={(e) => setVolunteerForm({ ...volunteerForm, skill: e.target.value })}
                                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition bg-white"
                                            >
                                                <option value="Basic Computer & Digital Literacy">Basic Computer &amp; Digital Literacy</option>
                                                <option value="Spoken English & Reading">Spoken English &amp; Reading</option>
                                                <option value="Creative Arts, Drawing & Crafts">Creative Arts, Drawing &amp; Crafts</option>
                                                <option value="Sports & Physical Health">Sports &amp; Physical Fitness</option>
                                                <option value="Career Mentorship & General Tutoring">Career Mentorship &amp; Tutoring</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-stone-800 mb-1">
                                                Your Varanasi Dates (or Availability)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 10th-14th Dec / 2 hours"
                                                value={volunteerForm.dates}
                                                onChange={(e) => setVolunteerForm({ ...volunteerForm, dates: e.target.value })}
                                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-stone-800 mb-1">
                                            Brief Background or Message (Optional)
                                        </label>
                                        <textarea
                                            rows="2"
                                            placeholder="Tell us a little about yourself or your profession..."
                                            value={volunteerForm.message}
                                            onChange={(e) => setVolunteerForm({ ...volunteerForm, message: e.target.value })}
                                            className="w-full text-xs px-3.5 py-2 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-3 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                                        >
                                            <span>Send Volunteer Form via Email</span>
                                            <span>✉️</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleVolunteerWhatsAppSubmit}
                                            className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold py-3 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                                        >
                                            <span>WhatsApp Instead</span>
                                            <span>💬</span>
                                        </button>
                                    </div>
                                    <p className="text-[11px] text-stone-500 text-center">
                                        Applications are sent to our official inbox: <span className="font-mono text-stone-700">{EMAIL}</span>
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
