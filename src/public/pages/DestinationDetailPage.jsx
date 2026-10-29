import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../seo/SEO';
import Breadcrumb from '../components/Breadcrumb';
import ImageWithSkeleton from '../components/ImageWithSkeleton';
import { DESTINATIONS, getDestinationBySlug } from '../data/destinationsData';
import { trackWhatsAppClick } from '../utils/analytics';
import { EMAIL, WHATSAPP_RAW_NUMBER, DISPLAY_PHONE, PHONE_URL } from '../../shared/config/brand';

export default function DestinationDetailPage() {
    const { slug } = useParams();
    const destination = getDestinationBySlug(slug);

    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const [quoteForm, setQuoteForm] = useState({
        name: '',
        mobile: '',
        email: '',
        tripType: 'Same-Day Return Excursion',
        travelDate: '',
        travelers: '2-4 Passengers',
        message: ''
    });
    const [quoteSubmitted, setQuoteSubmitted] = useState(false);

    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsQuoteModalOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isQuoteModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isQuoteModalOpen]);

    if (!destination) {
        return <Navigate to="/destinations" replace />;
    }

    const {
        name,
        title,
        tagline,
        category,
        distanceFromCenter,
        approxTravelTime,
        idealDays,
        bestTimeToVisit,
        image,
        alt,
        heroHighlight,
        overview,
        attractions,
        howToReach,
        suggestedItinerary,
        localTransport,
        practicalTips,
        faqs,
        relatedSlugs
    } = destination;

    // Resolve related destination objects
    const relatedDestinations = (relatedSlugs || [])
        .map((rSlug) => DESTINATIONS.find((d) => d.slug === rSlug))
        .filter(Boolean);

    const handleQuoteEmailSubmit = (e) => {
        e.preventDefault();
        if (!quoteForm.name || !quoteForm.mobile || !quoteForm.email) {
            alert('Please fill all mandatory fields: Name, Mobile, and Email.');
            return;
        }

        const subject = encodeURIComponent(
            `[Custom Quotation Request] ${name} Yatra - ${quoteForm.name}`
        );
        const body = encodeURIComponent(
            `Namaste Kashi-Vashi Team,\n\n` +
            `I would like to request a customized trip quotation for ${name}.\n\n` +
            `Trip Details:\n` +
            `• Destination: ${name}\n` +
            `• Trip Type: ${quoteForm.tripType}\n` +
            `• Travel Date: ${quoteForm.travelDate || 'Flexible / To be confirmed'}\n` +
            `• Number of Travelers: ${quoteForm.travelers}\n\n` +
            `Contact Details:\n` +
            `• Full Name: ${quoteForm.name}\n` +
            `• Mobile Number: ${quoteForm.mobile}\n` +
            `• Email Address: ${quoteForm.email}\n` +
            `• Specific Requirements / Notes: ${quoteForm.message || 'None'}\n\n` +
            `Please share vehicle options and a transparent quotation. Thank you!\n`
        );

        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
        setQuoteSubmitted(true);
    };

    const handleQuoteWhatsAppSubmit = () => {
        if (!quoteForm.name || !quoteForm.mobile || !quoteForm.email) {
            alert('Please fill all mandatory fields: Name, Mobile, and Email.');
            return;
        }

        const text = encodeURIComponent(
            `Namaste Kashi-Vashi! I would like to request a quotation for ${name}.\n\n` +
            `• Destination: ${name}\n` +
            `• Trip Type: ${quoteForm.tripType}\n` +
            `• Date: ${quoteForm.travelDate || 'Flexible'}\n` +
            `• Travelers: ${quoteForm.travelers}\n` +
            `• Name: ${quoteForm.name}\n` +
            `• Mobile: ${quoteForm.mobile}\n` +
            `• Email: ${quoteForm.email}\n` +
            (quoteForm.message ? `• Notes: ${quoteForm.message}\n\n` : '\n') +
            `Please share options and a transparent quotation.`
        );

        trackWhatsAppClick(`dest_quote_whatsapp_${slug}`);
        window.open(`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${text}`, '_blank');
        setQuoteSubmitted(true);
    };

    const generalWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
        `Namaste Kashi-Vashi! I would like to plan a visit to ${name}. Please share available transport and itinerary options.`
    )}`;

    return (
        <>
            <SEO
                title={`${title} | Kashi-Vashi`}
                description={overview}
                pathname={`/destinations/${slug}`}
                image={image}
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'Place',
                    name,
                    description: overview,
                    url: `https://varanasiyatra.com/destinations/${slug}`
                }}
            />

            {/* Breadcrumb Header Bar */}
            <div className="bg-stone-100/70 border-b border-stone-200/80 py-3.5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <Breadcrumb
                        crumbs={[
                            { label: 'Destinations', href: '/destinations' },
                            { label: name }
                        ]}
                    />
                </div>
            </div>

            <article className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-14">
                
                {/* HERO HEADER */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-7 space-y-5">
                        
                        {/* Category & Logistics Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="bg-amber-50 text-amber-800 border border-amber-200/80 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                {category}
                            </span>
                            <span className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-xs font-medium">
                                📍 {distanceFromCenter}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-stone-900 leading-tight">
                            {name}
                        </h1>

                        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                            {tagline}
                        </p>

                        {/* Logistics Summary Pill Bar */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 border-y border-stone-200 text-xs text-stone-700">
                            <div>
                                <span className="text-[10px] uppercase font-bold text-stone-500 block">Recommended Stay</span>
                                <span className="font-bold text-stone-900 text-xs">{idealDays}</span>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase font-bold text-stone-500 block">Approx. Transit</span>
                                <span className="font-bold text-stone-900 text-xs">{approxTravelTime}</span>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase font-bold text-stone-500 block">Best Season</span>
                                <span className="font-bold text-stone-900 text-xs truncate block">{bestTimeToVisit}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-2 flex flex-wrap gap-3">
                            <Link
                                to={`/plan-your-trip?destination=${slug}`}
                                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-xs transition"
                            >
                                Plan {name} Yatra
                            </Link>

                            <button
                                type="button"
                                onClick={() => {
                                    setQuoteSubmitted(false);
                                    setIsQuoteModalOpen(true);
                                }}
                                className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-5 py-3.5 rounded-xl shadow-xs transition cursor-pointer"
                            >
                                Request Custom Quotation
                            </button>

                            <a
                                href={generalWhatsAppUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => trackWhatsAppClick(`dest_hero_wa_${slug}`)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3.5 rounded-xl shadow-xs transition inline-flex items-center gap-1.5"
                            >
                                <span>WhatsApp Us</span>
                                <span>💬</span>
                            </a>
                        </div>
                    </div>

                    {/* Hero Visual Card */}
                    <div className="lg:col-span-5">
                        <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-md aspect-[4/3] bg-stone-900 relative">
                            <ImageWithSkeleton
                                src={image}
                                alt={alt || name}
                                className="w-full h-full object-cover"
                                priority={true}
                            />
                            {heroHighlight && (
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent flex items-end p-6">
                                    <p className="text-white text-xs sm:text-sm font-serif font-bold">
                                        "{heroHighlight}"
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT & SIDEBAR GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Left Column: Deep Destination Content */}
                    <div className="lg:col-span-8 space-y-10">
                        
                        {/* 1. Overview */}
                        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-3">
                            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                                About {name}
                            </h2>
                            <div className="w-14 h-1 bg-amber-500 rounded-full" />
                            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-normal">
                                {overview}
                            </p>
                        </section>

                        {/* 2. Key Sacred & Heritage Attractions */}
                        {attractions && attractions.length > 0 && (
                            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                                        Key Sacred &amp; Heritage Sites
                                    </h2>
                                    <div className="w-14 h-1 bg-amber-500 rounded-full my-2" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {attractions.map((site, idx) => (
                                        <div key={idx} className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200/80 space-y-1.5">
                                            <h3 className="font-serif font-bold text-sm text-stone-900">
                                                {site.name}
                                            </h3>
                                            <p className="text-stone-600 text-xs leading-relaxed">
                                                {site.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 3. Verified How to Reach from Varanasi */}
                        {howToReach && (
                            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                                        Travel Logistics
                                    </span>
                                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                                        How to Reach {name} from Varanasi
                                    </h2>
                                    <div className="w-14 h-1 bg-amber-500 rounded-full my-2" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {howToReach.air && (
                                        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-1.5">
                                            <span className="text-xl block">✈️</span>
                                            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-stone-900">
                                                By Air
                                            </h4>
                                            <p className="text-xs text-stone-600 leading-relaxed">
                                                {howToReach.air}
                                            </p>
                                        </div>
                                    )}

                                    {howToReach.train && (
                                        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-1.5">
                                            <span className="text-xl block">🚆</span>
                                            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-stone-900">
                                                By Rail
                                            </h4>
                                            <p className="text-xs text-stone-600 leading-relaxed">
                                                {howToReach.train}
                                            </p>
                                        </div>
                                    )}

                                    {howToReach.road && (
                                        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-1.5">
                                            <span className="text-xl block">🚗</span>
                                            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-stone-900">
                                                By Road / Cab
                                            </h4>
                                            <p className="text-xs text-stone-600 leading-relaxed">
                                                {howToReach.road}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* 4. Suggested Day-Wise Itineraries */}
                        {suggestedItinerary && suggestedItinerary.length > 0 && (
                            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                                        Paced &amp; Unhurried
                                    </span>
                                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                                        Suggested Itinerary for {name}
                                    </h2>
                                    <div className="w-14 h-1 bg-amber-500 rounded-full my-2" />
                                </div>

                                <div className="space-y-3.5">
                                    {suggestedItinerary.map((step, idx) => (
                                        <div key={idx} className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200/80 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-md border border-amber-300">
                                                    {step.day}
                                                </span>
                                                <h4 className="font-serif font-bold text-sm text-stone-900">
                                                    {step.title}
                                                </h4>
                                            </div>
                                            <p className="text-xs text-stone-600 leading-relaxed pt-1">
                                                {step.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 5. Local Transport & Navigation Guidance */}
                        {localTransport && (
                            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                                        Local Transport &amp; On-Ground Navigation
                                    </h2>
                                    <div className="w-14 h-1 bg-amber-500 rounded-full my-2" />
                                </div>

                                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                                    {localTransport.summary}
                                </p>

                                {localTransport.modes && localTransport.modes.length > 0 && (
                                    <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs text-stone-700 space-y-2">
                                        {localTransport.modes.map((mode, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <span className="text-amber-600 font-bold">✓</span>
                                                <span>{mode}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        )}

                        {/* 6. Practical Traveler Tips */}
                        {practicalTips && practicalTips.length > 0 && (
                            <section className="bg-amber-50/60 rounded-3xl p-6 sm:p-8 border border-amber-200 space-y-4">
                                <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                                    Practical Traveler Tips for {name}
                                </h2>
                                <div className="space-y-2 text-xs text-stone-700">
                                    {practicalTips.map((tip, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5">
                                            <span className="text-amber-600 font-bold">ℹ️</span>
                                            <span>{tip}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 7. FAQs */}
                        {faqs && faqs.length > 0 && (
                            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
                                <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                                    Frequently Asked Questions
                                </h2>
                                <div className="space-y-3">
                                    {faqs.map((faq, idx) => (
                                        <details key={idx} className="group bg-stone-50 rounded-2xl p-4 border border-stone-200/80">
                                            <summary className="font-serif font-bold text-xs sm:text-sm text-stone-900 cursor-pointer flex items-center justify-between list-none">
                                                <span>{faq.q}</span>
                                                <span className="text-amber-600 group-open:rotate-180 transition-transform font-mono text-xs">▼</span>
                                            </summary>
                                            <p className="text-xs text-stone-600 leading-relaxed mt-2.5 pt-2.5 border-t border-stone-200/60">
                                                {faq.a}
                                            </p>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 8. Related Destinations Grid */}
                        {relatedDestinations.length > 0 && (
                            <section className="space-y-4 pt-4 border-t border-stone-200">
                                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                                    Related Destinations to Explore
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {relatedDestinations.map((rel) => (
                                        <Link
                                            key={rel.slug}
                                            to={`/destinations/${rel.slug}`}
                                            className="group bg-white rounded-2xl p-3 border border-stone-200 shadow-2xs hover:shadow-md transition flex items-center gap-3"
                                        >
                                            <div className="w-16 h-14 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                                                <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="font-serif font-bold text-xs text-stone-900 group-hover:text-amber-700 truncate">
                                                    {rel.name}
                                                </h4>
                                                <span className="text-[10px] text-stone-500 block truncate">
                                                    {rel.distanceFromCenter}
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column: Sticky Booking / Enquiry Sidebar */}
                    <aside className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm sticky top-20 space-y-5">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 inline-block mb-1">
                                    Direct Travel Coordination
                                </span>
                                <h3 className="font-serif font-bold text-base text-stone-900">
                                    Plan Your {name} Trip
                                </h3>
                                <p className="text-stone-600 text-xs leading-relaxed mt-1">
                                    Verified private AC cabs, vetted chauffeurs, and family-friendly pacing from Varanasi.
                                </p>
                            </div>

                            {/* Inquiry Actions */}
                            <div className="space-y-2.5 pt-1">
                                <Link
                                    to={`/plan-your-trip?destination=${slug}`}
                                    className="w-full bg-amber-600 hover:bg-amber-700 text-white text-center py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider block transition shadow-xs"
                                >
                                    Open Trip Planner Form
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setQuoteSubmitted(false);
                                        setIsQuoteModalOpen(true);
                                    }}
                                    className="w-full bg-stone-900 hover:bg-stone-800 text-white text-center py-3 rounded-xl font-bold text-xs block transition shadow-xs cursor-pointer"
                                >
                                    Request Specific Quotation
                                </button>

                                <a
                                    href={generalWhatsAppUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() => trackWhatsAppClick(`dest_side_wa_${slug}`)}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-center py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
                                >
                                    <span>Chat on WhatsApp</span>
                                    <span>💬</span>
                                </a>
                            </div>

                            {/* Verified Contact Details */}
                            <div className="pt-4 border-t border-stone-100 text-xs text-stone-600 space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <span className="text-stone-400">Direct Helpline:</span>
                                    <a href={PHONE_URL} className="text-stone-900 font-bold font-mono hover:text-amber-700">
                                        {DISPLAY_PHONE}
                                    </a>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-stone-400">Desk Email:</span>
                                    <span className="text-stone-700 font-mono text-[11px] truncate max-w-[170px]">
                                        {EMAIL}
                                    </span>
                                </div>
                            </div>

                            <p className="text-[11px] text-stone-500 text-center leading-relaxed italic">
                                Zero hidden fees. Pre-agreed tolls and driver allowances with complete financial clarity.
                            </p>
                        </div>
                    </aside>
                </div>
            </article>

            {/* =========================================================================
                CUSTOM TRIP QUOTATION MODAL
               ========================================================================= */}
            {isQuoteModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs overflow-y-auto"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="quote-modal-title"
                >
                    <div
                        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            type="button"
                            onClick={() => setIsQuoteModalOpen(false)}
                            aria-label="Close Quotation Form"
                            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 flex items-center justify-center font-bold text-lg transition cursor-pointer"
                        >
                            ✕
                        </button>

                        <div className="space-y-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 inline-block mb-1">
                                    Custom Quotation Desk
                                </span>
                                <h3 id="quote-modal-title" className="text-xl sm:text-2xl font-serif font-black text-stone-900">
                                    Request Quotation for {name}
                                </h3>
                            </div>

                            <p className="text-xs text-stone-600 leading-relaxed">
                                Tell us whether you need a one-way transfer, same-day return excursion, or multi-day trip. We provide an exact, all-inclusive quote without hidden surcharges.
                            </p>

                            {quoteSubmitted ? (
                                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center space-y-3">
                                    <span className="text-3xl block">🙏</span>
                                    <h4 className="font-serif font-bold text-stone-900 text-base">
                                        Quotation Request Received!
                                    </h4>
                                    <p className="text-xs text-stone-600 leading-relaxed">
                                        Thank you! Our local coordinator will review vehicle availability and send you a custom proposal at <strong>{quoteForm.mobile}</strong> or via email.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setIsQuoteModalOpen(false)}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-5 rounded-xl transition cursor-pointer"
                                    >
                                        Close Window
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleQuoteEmailSubmit} className="space-y-3 pt-1">
                                    <div>
                                        <label className="block text-xs font-bold text-stone-800 mb-1">
                                            Your Full Name <span className="text-rose-600">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Rajesh Kumar"
                                            value={quoteForm.name}
                                            onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
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
                                                value={quoteForm.mobile}
                                                onChange={(e) => setQuoteForm({ ...quoteForm, mobile: e.target.value })}
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
                                                value={quoteForm.email}
                                                onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold text-stone-800 mb-1">
                                                Trip Type
                                            </label>
                                            <select
                                                value={quoteForm.tripType}
                                                onChange={(e) => setQuoteForm({ ...quoteForm, tripType: e.target.value })}
                                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition bg-white"
                                            >
                                                <option value="Same-Day Return Excursion">Same-Day Return Excursion</option>
                                                <option value="One-Way Transfer / Drop">One-Way Transfer / Drop</option>
                                                <option value="Multi-Day Custom Circuit">Multi-Day Custom Circuit</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-stone-800 mb-1">
                                                Travel Date
                                            </label>
                                            <input
                                                type="date"
                                                value={quoteForm.travelDate}
                                                onChange={(e) => setQuoteForm({ ...quoteForm, travelDate: e.target.value })}
                                                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-stone-800 mb-1">
                                            Passengers / Group Size
                                        </label>
                                        <select
                                            value={quoteForm.travelers}
                                            onChange={(e) => setQuoteForm({ ...quoteForm, travelers: e.target.value })}
                                            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition bg-white"
                                        >
                                            <option value="1-3 Passengers (AC Sedan)">1-3 Passengers (AC Sedan)</option>
                                            <option value="4-6 Passengers (Innova Crysta)">4-6 Passengers (Innova Crysta)</option>
                                            <option value="7-12 Passengers (Force Urbania)">7-12 Passengers (Force Urbania)</option>
                                            <option value="13+ Passengers (Group Bus)">13+ Passengers (Group Bus)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-stone-800 mb-1">
                                            Notes or Preferred Pacing (Optional)
                                        </label>
                                        <textarea
                                            rows="2"
                                            placeholder="Elderly assistance, specific pickup point, or custom stops..."
                                            value={quoteForm.message}
                                            onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                                            className="w-full text-xs px-3.5 py-2 rounded-xl border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-3 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                                        >
                                            <span>Send Quote via Email</span>
                                            <span>✉️</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleQuoteWhatsAppSubmit}
                                            className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold py-3 px-4 rounded-xl transition inline-flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                                        >
                                            <span>Inquire on WhatsApp</span>
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
