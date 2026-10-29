import React, { useState, useEffect } from 'react';
import SEO from '../seo/SEO';
import Breadcrumb from '../components/Breadcrumb';
import guideImg from '../../assets/services/srv-guide.avif';
import darshanImg from '../../assets/services/srv-darshan.avif';
import boatImg from '../../assets/services/srv-boat-aarti.avif';
import silkImg from '../../assets/services/srv-silk.avif';
import { trackWhatsAppClick } from '../utils/analytics';
import { WHATSAPP_RAW_NUMBER, EMAIL, DISPLAY_PHONE, PHONE_URL } from '../../shared/config/brand';

export default function PersonalGuidePage() {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [bookingForm, setBookingForm] = useState({
        name: '',
        mobile: '',
        email: '',
        date: '',
        duration: 'Half-Day (Up to 4 Hours)',
        language: 'Hindi & English',
        circuit: 'Ghats & Kashi Vishwanath Walk',
        femaleGuidePreferred: false,
        message: ''
    });
    const [bookingSubmitted, setBookingSubmitted] = useState(false);

    // Close modal on Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsBookingModalOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isBookingModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isBookingModalOpen]);

    const handleFormEmailSubmit = (e) => {
        e.preventDefault();
        if (!bookingForm.name || !bookingForm.mobile || !bookingForm.email) {
            alert('Please fill all mandatory fields: Name, Mobile, and Email.');
            return;
        }

        const subject = encodeURIComponent(
            `[Guide Booking Inquiry] Personal Local Guide Request - ${bookingForm.name}`
        );
        const body = encodeURIComponent(
            `Namaste Kashi-Vashi Team,\n\n` +
            `I would like to inquire about booking a personal local guide in Varanasi.\n\n` +
            `My Details:\n` +
            `• Full Name: ${bookingForm.name}\n` +
            `• Mobile Number: ${bookingForm.mobile}\n` +
            `• Email Address: ${bookingForm.email}\n` +
            `• Travel Date: ${bookingForm.date || 'Flexible / To be confirmed'}\n` +
            `• Preferred Duration: ${bookingForm.duration}\n` +
            `• Preferred Language: ${bookingForm.language}\n` +
            `• Tour Circuit: ${bookingForm.circuit}\n` +
            `• Female Guide Preference: ${bookingForm.femaleGuidePreferred ? 'Yes (Subject to availability)' : 'No specific preference'}\n` +
            `• Notes / Requirements: ${bookingForm.message || 'None'}\n\n` +
            `Please share custom pricing and guide availability. Thank you!\n`
        );

        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
        setBookingSubmitted(true);
    };

    const handleFormWhatsAppSubmit = () => {
        if (!bookingForm.name || !bookingForm.mobile || !bookingForm.email) {
            alert('Please fill all mandatory fields: Name, Mobile, and Email.');
            return;
        }

        const text = encodeURIComponent(
            `Namaste Kashi-Vashi! I would like to book a personal local guide in Varanasi.\n\n` +
            `• Name: ${bookingForm.name}\n` +
            `• Mobile: ${bookingForm.mobile}\n` +
            `• Email: ${bookingForm.email}\n` +
            `• Date: ${bookingForm.date || 'Flexible'}\n` +
            `• Duration: ${bookingForm.duration}\n` +
            `• Language: ${bookingForm.language}\n` +
            `• Circuit: ${bookingForm.circuit}\n` +
            (bookingForm.femaleGuidePreferred ? `• Preference: Female guide (if available)\n` : '') +
            (bookingForm.message ? `• Note: ${bookingForm.message}\n\n` : '\n') +
            `Please share availability and quote.`
        );

        trackWhatsAppClick('personal_guide_form_submit');
        window.open(`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${text}`, '_blank');
        setBookingSubmitted(true);
    };

    const generalWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
        'Namaste Kashi-Vashi! I would like to book a personal local guide in Varanasi. Please share available packages.'
    )}`;

    const circuits = [
        {
            title: 'Sacred Temples & Kashi Vishwanath Walk',
            icon: '🕉️',
            image: darshanImg,
            desc: 'Navigate the historic temple alleyways (Vishwanath Gali, Annapurna, and Manikarnika) with a local resident who understands queues, respectful etiquette, and temple history.'
        },
        {
            title: 'Subah-e-Banaras & Historic Ghats Walking Tour',
            icon: '⛵',
            image: boatImg,
            desc: 'Walk from Assi Ghat to Dashashwamedh, taking in morning rituals, sadhus, philosophical ghats, and centuries of architecture with peaceful, unhurried explanations.'
        },
        {
            title: 'Sarnath Buddhist Heritage & Stupa Tour',
            icon: '☸️',
            image: guideImg,
            desc: 'An inspiring excursion through Dhamek Stupa, Mulagandhakuti Vihara, and the ancient ruins of the deer park where Lord Buddha gave his First Sermon.'
        },
        {
            title: 'Generational Handloom Silk Weaving Walk',
            icon: '🧵',
            image: silkImg,
            desc: 'Step inside traditional weaving mohallas to witness generational master artisans craft Banarasi brocade sarees on wooden pit looms, with zero commercial pressure.'
        }
    ];

    return (
        <>
            <SEO
                title="Book a Personal Guide in Varanasi | Verified Local Guides & Walks | Kashi-Vashi"
                description="Hire a trusted local guide in Varanasi. Thoughtful walks through Ghats, Kashi Vishwanath corridor, and Sarnath with multi-lingual assistance and honest pricing on request."
                pathname="/guides/personal-guide"
            />

            {/* Breadcrumb Header Bar */}
            <div className="bg-stone-100/70 border-b border-stone-200/80 py-3.5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <Breadcrumb
                        crumbs={[
                            { label: 'Book a Personal Guide' }
                        ]}
                    />
                </div>
            </div>

            <article className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16">
                
                {/* HERO SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-7 space-y-5">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                            <span>Local Stewardship Service</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-stone-900 leading-tight">
                            Explore Kashi with a Trusted <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-stone-800 to-amber-700">
                                Personal Local Guide
                            </span>
                        </h1>

                        <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-600 to-amber-600 rounded-full" />

                        <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                            Varanasi is an ancient maze of sacred alleys, living philosophy, and centuries of tradition. Our personal local guides are longtime residents who escort you with patience and respect—protecting you from aggressive touts and forced shopping stops so you can absorb the city's spiritual depth in peace.
                        </p>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-800">
                            <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl flex items-center gap-2">
                                <span className="text-emerald-600 text-base">🛡️</span>
                                <span className="font-medium">Zero Commission Shopping Guarantee</span>
                            </div>
                            <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl flex items-center gap-2">
                                <span className="text-amber-600 text-base">👨‍👩‍👦</span>
                                <span className="font-medium">Elderly &amp; Family-Paced Guidance</span>
                            </div>
                            <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl flex items-center gap-2">
                                <span className="text-blue-600 text-base">🗣️</span>
                                <span className="font-medium">Multi-Lingual Assistance</span>
                            </div>
                        </div>

                        {/* CTAs */}
                        <div className="pt-3 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setBookingSubmitted(false);
                                    setIsBookingModalOpen(true);
                                }}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3.5 px-6 rounded-xl transition shadow-sm cursor-pointer"
                            >
                                Book a Personal Guide Form
                            </button>
                            <a
                                href={generalWhatsAppUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => trackWhatsAppClick('personal_guide_hero_cta')}
                                className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold py-3.5 px-5 rounded-xl transition shadow-sm inline-flex items-center gap-2"
                            >
                                <span>Inquire on WhatsApp</span>
                                <span>💬</span>
                            </a>
                        </div>
                    </div>

                    {/* Hero Visual Card */}
                    <div className="lg:col-span-5">
                        <div className="relative rounded-3xl overflow-hidden border border-stone-200 shadow-xl aspect-[4/3] bg-stone-900">
                            <img
                                src={guideImg}
                                alt="Local tour guide in Varanasi escorting pilgrims"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent flex flex-col justify-end p-6">
                                <span className="text-emerald-400 font-hindi font-medium text-xs tracking-wider block">
                                    ― आत्मीय मार्गदर्शन ―
                                </span>
                                <p className="text-white text-xs sm:text-sm font-serif font-bold mt-1">
                                    "Genuine local companionship with complete transparency and peace of mind."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TOUR CIRCUITS & COVERAGE */}
                <div className="space-y-8 pt-4 border-t border-stone-200">
                    <div className="max-w-2xl">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-3">
                            Available Walking &amp; Tour Circuits
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                            Where Our Guides Escort You
                        </h2>
                        <div className="w-16 h-1 bg-emerald-500 rounded-full my-3" />
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                            All walks can be customized according to your physical comfort, interests, and schedule.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {circuits.map((c, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-500/60 p-5 sm:p-6 transition shadow-2xs hover:shadow-md flex flex-col sm:flex-row gap-5 items-start"
                            >
                                <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100">
                                    <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-2 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{c.icon}</span>
                                        <h3 className="text-base font-serif font-bold text-stone-900">
                                            {c.title}
                                        </h3>
                                    </div>
                                    <p className="text-xs text-stone-600 leading-relaxed">
                                        {c.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DURATION, LANGUAGES & PRICING TRANSPARENCY */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-stone-200">
                    
                    {/* Duration Card */}
                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold">
                            ⏱️
                        </div>
                        <h3 className="font-serif font-bold text-base text-stone-900">
                            Flexible Tour Durations
                        </h3>
                        <ul className="text-xs text-stone-600 space-y-2 leading-relaxed">
                            <li>• <strong>Half-Day (Up to 4 Hours):</strong> Morning Ghats + sunrise boat ride or evening Ganga Aarti + alley walk.</li>
                            <li>• <strong>Full-Day (Up to 8 Hours):</strong> Comprehensive temple darshan, Ghats walk, Sarnath excursion, and silk quarters.</li>
                            <li>• <strong>Multi-Day Escort:</strong> Continuity of assistance across your entire Varanasi pilgrimage.</li>
                        </ul>
                    </div>

                    {/* Language Support Card */}
                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold">
                            🌐
                        </div>
                        <h3 className="font-serif font-bold text-base text-stone-900">
                            Supported Languages
                        </h3>
                        <p className="text-xs text-stone-600 leading-relaxed">
                            • <strong>Readily Available:</strong> Fluent Hindi &amp; English.<br />
                            • <strong>Regional (On Advance Request):</strong> Bengali, Tamil, Telugu, Gujarati, Marathi.<br />
                            • <strong>Foreign Languages (On Advance Request):</strong> French, German, Spanish, Japanese.
                        </p>
                        <p className="text-[11px] text-stone-500 italic">
                            *Regional &amp; foreign language guides are allocated subject to advance notice and availability.
                        </p>
                    </div>

                    {/* Pricing on Request Card */}
                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl font-bold">
                            🧾
                        </div>
                        <h3 className="font-serif font-bold text-base text-stone-900">
                            Pricing: On Request
                        </h3>
                        <p className="text-xs text-stone-600 leading-relaxed">
                            Because guide fees vary by group size, hours required, and specific language requirements, we provide an all-inclusive transparent quote prior to booking.
                        </p>
                        <p className="text-xs font-semibold text-emerald-800">
                            ✓ Zero commission stops. Zero hidden booking fees. Pre-agreed terms only.
                        </p>
                    </div>
                </div>

                {/* FEMALE GUIDE PREFERENCE & SENSITIVITY NOTE */}
                <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-5 sm:p-6 text-xs text-stone-800 leading-relaxed flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <span className="text-3xl flex-shrink-0">🌸</span>
                    <div className="space-y-1">
                        <strong className="text-amber-950 font-bold block text-sm">
                            Family &amp; Solo Female Traveler Sensitivity:
                        </strong>
                        <p className="text-stone-700">
                            We frequently receive requests for female tour escorts for families and solo women visitors. Whenever possible, we arrange verified female local guides upon early advance confirmation, subject to schedule availability.
                        </p>
                    </div>
                </div>

                {/* BOTTOM INQUIRY STRIP */}
                <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
                    <div>
                        <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-1">
                            Ready to Reserve Your Guide?
                        </span>
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                            Get Custom Availability &amp; Transparent Quote
                        </h2>
                        <p className="text-xs text-stone-300 mt-1">
                            Direct assistance from our local desk. Phone Helpline: <a href={PHONE_URL} className="underline text-amber-300">{DISPLAY_PHONE}</a>
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setBookingSubmitted(false);
                                setIsBookingModalOpen(true);
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 px-5 rounded-xl transition shadow-xs cursor-pointer"
                        >
                            Open Booking Form
                        </button>
                        <a
                            href={generalWhatsAppUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => trackWhatsAppClick('personal_guide_bottom_cta')}
                            className="bg-white/15 hover:bg-white/25 text-white text-xs font-bold py-3 px-4 rounded-xl transition inline-flex items-center gap-1.5"
                        >
                            <span>Chat on WhatsApp</span>
                            <span>💬</span>
                        </a>
                    </div>
                </div>

            </article>

            {/* =========================================================================
                BOOKING INQUIRY MODAL POPUP
               ========================================================================= */}
            {isBookingModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs overflow-y-auto"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="guide-modal-title"
                >
                    <div
                        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={() => setIsBookingModalOpen(false)}
                            aria-label="Close Guide Booking Form"
                            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center font-bold text-lg transition cursor-pointer"
                        >
                            ✕
                        </button>

                        <div className="space-y-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block mb-1">
                                    Local Guide Reservation
                                </span>
                                <h3 id="guide-modal-title" className="text-xl sm:text-2xl font-serif font-black text-stone-900">
                                    Book a Personal Guide in Varanasi
                                </h3>
                            </div>

                            <p className="text-xs text-stone-600 leading-relaxed">
                                Share your travel details and language preference. Our local coordinator will verify available guides and provide a clear quote.
                            </p>

                            {bookingSubmitted ? (
                                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-3">
                                    <span className="text-3xl block">🙏</span>
                                    <h4 className="font-serif font-bold text-stone-900 text-base">
                                        Guide Inquiry Received!
                                    </h4>
                                    <p className="text-xs text-stone-600 leading-relaxed">
                                        Thank you! Our local coordinator will get in touch with you shortly at <strong>{bookingForm.mobile}</strong> or email with guide availability.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setIsBookingModalOpen(false)}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-5 rounded-xl transition cursor-pointer"
                                    >
                                        Close Window
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleFormEmailSubmit} className="space-y-3 pt-1">
                                    <div>
                                        <label className="block text-xs font-bold text-stone-800 mb-1">
                                            Your Full Name <span className="text-rose-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Anand Verma"
                                            value={bookingForm.name}
                                            onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
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
                                                value={bookingForm.mobile}
                                                onChange={(e) => setBookingForm({ ...bookingForm, mobile: e.target.value })}
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
                                                value={bookingForm.email}
                                                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold text-stone-800 mb-1">
                                                Travel Date
                                            </label>
                                            <input
                                                type="date"
                                                value={bookingForm.date}
                                                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-stone-800 mb-1">
                                                Duration
                                            </label>
                                            <select
                                                value={bookingForm.duration}
                                                onChange={(e) => setBookingForm({ ...bookingForm, duration: e.target.value })}
                                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition bg-white"
                                            >
                                                <option value="Half-Day (Up to 4 Hours)">Half-Day (Up to 4 Hours)</option>
                                                <option value="Full-Day (Up to 8 Hours)">Full-Day (Up to 8 Hours)</option>
                                                <option value="Multi-Day Custom Escort">Multi-Day Custom Escort</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold text-stone-800 mb-1">
                                                Preferred Language
                                            </label>
                                            <select
                                                value={bookingForm.language}
                                                onChange={(e) => setBookingForm({ ...bookingForm, language: e.target.value })}
                                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition bg-white"
                                            >
                                                <option value="Hindi & English">Hindi &amp; English</option>
                                                <option value="Bengali (Subject to availability)">Bengali (Subject to availability)</option>
                                                <option value="Tamil (Subject to availability)">Tamil (Subject to availability)</option>
                                                <option value="Telugu (Subject to availability)">Telugu (Subject to availability)</option>
                                                <option value="Gujarati (Subject to availability)">Gujarati (Subject to availability)</option>
                                                <option value="Marathi (Subject to availability)">Marathi (Subject to availability)</option>
                                                <option value="French / German (Subject to availability)">French / German (Subject to availability)</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-stone-800 mb-1">
                                                Preferred Tour Circuit
                                            </label>
                                            <select
                                                value={bookingForm.circuit}
                                                onChange={(e) => setBookingForm({ ...bookingForm, circuit: e.target.value })}
                                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition bg-white"
                                            >
                                                <option value="Ghats & Kashi Vishwanath Walk">Ghats &amp; Kashi Vishwanath Walk</option>
                                                <option value="Sarnath Buddhist Excursion">Sarnath Buddhist Excursion</option>
                                                <option value="Banarasi Silk Weaving Walk">Banarasi Silk Weaving Walk</option>
                                                <option value="Complete Custom City Tour">Complete Custom City Tour</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="pt-1">
                                        <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-stone-700">
                                            <input
                                                type="checkbox"
                                                checked={bookingForm.femaleGuidePreferred}
                                                onChange={(e) => setBookingForm({ ...bookingForm, femaleGuidePreferred: e.target.checked })}
                                                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-stone-300"
                                            />
                                            <span>Prefer female guide (for solo female / family groups, subject to availability)</span>
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-stone-800 mb-1">
                                            Special Requests or Group Notes (Optional)
                                        </label>
                                        <textarea
                                            rows="2"
                                            placeholder="Number of adults/seniors, accessibility needs, etc..."
                                            value={bookingForm.message}
                                            onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                                            className="w-full text-xs px-3.5 py-2 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition"
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                                        >
                                            <span>Send Inquiry via Email</span>
                                            <span>✉️</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleFormWhatsAppSubmit}
                                            className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold py-3 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                                        >
                                            <span>Send via WhatsApp</span>
                                            <span>💬</span>
                                        </button>
                                    </div>
                                    <p className="text-[11px] text-stone-500 text-center">
                                        Inquiries reach our verified desk at <span className="font-mono text-stone-700">{EMAIL}</span>.
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
