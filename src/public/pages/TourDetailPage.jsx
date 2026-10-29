import React, { useState, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../seo/SEO';
import Breadcrumb from '../components/Breadcrumb';
import ImageWithSkeleton from '../components/ImageWithSkeleton';
import TourCard from '../components/TourCard';
import { TOURS, getTourBySlug } from '../data/toursData';
import { trackWhatsAppClick } from '../utils/analytics';
import { getAttribution } from '../utils/attribution';
import { BASE_URL } from '../../constants/crm';

export default function TourDetailPage() {
    const { slug } = useParams();
    const tour = getTourBySlug(slug);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingForm, setBookingForm] = useState({
        name: '',
        phone: '',
        email: '',
        travelDate: '',
        guests: '2 Adults',
        vehiclePreference: 'Dedicated AC Sedan',
        stayPreference: 'Package with 3-Star Hotel',
        specialNotes: '',
        website_hp: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isSubmittingRef = useRef(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingRefId, setBookingRefId] = useState('');
    const [bookingError, setBookingError] = useState('');

    if (!tour) {
        return <Navigate to="/tours" replace />;
    }

    const {
        title,
        tagline,
        duration,
        image,
        badge,
        isBestSeller,
        startingPrice,
        price,
        priceNote,
        pricingUnit,
        destinationsCovered,
        vehicleType,
        overview,
        itinerary,
        inclusions,
        exclusions,
        idealFor,
        practicalTips,
        faqs,
        relatedSlugs,
        status,
        isFutureRoute
    } = tour;

    const displayPrice = startingPrice || price;
    const displayBadge = badge || (isBestSeller ? 'Best Seller' : (isFutureRoute ? 'Future Route' : null));
    const isComingSoon = status === 'coming_soon' || isFutureRoute;

    const relatedTours = TOURS.filter(
        (t) => relatedSlugs && relatedSlugs.includes(t.slug) && t.slug !== tour.slug
    );

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setBookingForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        if (bookingForm.website_hp) return;
        if (isSubmittingRef.current) return;
        isSubmittingRef.current = true;
        setIsSubmitting(true);
        setBookingError('');

        if (!bookingForm.name.trim() || bookingForm.name.trim().length < 2) {
            setBookingError('Please enter your full name (at least 2 characters).');
            isSubmittingRef.current = false;
            setIsSubmitting(false);
            return;
        }

        const cleanPhone = bookingForm.phone.replace(/[^0-9]/g, '');
        if (cleanPhone.length < 10) {
            setBookingError('Please enter a valid 10-digit mobile number.');
            isSubmittingRef.current = false;
            setIsSubmitting(false);
            return;
        }

        if (bookingForm.email.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(bookingForm.email.trim())) {
                setBookingError('Please enter a valid email address.');
                isSubmittingRef.current = false;
                setIsSubmitting(false);
                return;
            }
        }

        const attr = getAttribution();
        const payload = {
            name: bookingForm.name.trim(),
            phone: bookingForm.phone.trim(),
            email: bookingForm.email.trim() || undefined,
            travelDate: bookingForm.preferredDate || bookingForm.travelDate || 'Flexible / Upcoming',
            guests: bookingForm.guests,
            duration: duration || 'Tour Package',
            comingFrom: 'Tour Detail Page',
            requirements: [
                `Tour Package: ${title}`,
                `Vehicle Preference: ${bookingForm.vehiclePreference}`,
                `Stay Preference: ${bookingForm.stayPreference}`,
                bookingForm.specialNotes ? `Notes: ${bookingForm.specialNotes.trim()}` : null
            ].filter(Boolean),
            source: attr.source || 'WEBSITE',
            leadSource: 'Tour Detail Page',
            landingPath: typeof window !== 'undefined' ? window.location.pathname : '',
            utm: {
                source: attr.utmSource || null,
                medium: attr.utmMedium || null,
                campaign: attr.utmCampaign || null
            },
            website_hp: bookingForm.website_hp
        };

        try {
            let res;
            try {
                res = await fetch(`${BASE_URL}/public/leads`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            } catch {
                res = null;
            }

            if (!res || res.status === 404) {
                res = await fetch(`${BASE_URL}/leads/public`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
            }

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || 'Unable to submit enquiry at this time.');
            }

            const data = await res.json();
            if (data.success !== true) {
                throw new Error(data.message || 'Server rejected tour booking enquiry.');
            }

            setBookingRefId(data.leadId || data.id || `KV-${Date.now().toString().slice(-6)}`);
            setBookingSuccess(true);
        } catch (err) {
            setBookingError(err.message || 'Network error. Please try again or chat with our local team on WhatsApp.');
        } finally {
            isSubmittingRef.current = false;
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <SEO
                title={`${title} | Varanasi Tour Packages | Kashi-Vashi`}
                description={overview?.slice(0, 160) || tagline}
                pathname={`/tours/${slug}`}
                image={image}
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'TourPackage',
                    name: title,
                    description: overview,
                    provider: {
                        '@type': 'TravelAgency',
                        name: 'Kashi-Vashi'
                    },
                    offers: displayPrice ? {
                        '@type': 'Offer',
                        price: displayPrice.replace(/[^0-9]/g, ''),
                        priceCurrency: 'INR'
                    } : undefined
                }}
            />

            {/* Breadcrumb Bar */}
            <div className="bg-stone-100/60 border-b border-stone-200/80 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <Breadcrumb
                        crumbs={[
                            { label: 'Tours', href: '/tours' },
                            { label: title }
                        ]}
                    />
                </div>
            </div>

            <article className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                {/* Hero Header */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center">
                    <div className="lg:col-span-7">
                        {displayBadge && (
                            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                                <span>{displayBadge}</span>
                            </div>
                        )}

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-stone-900 leading-tight mb-4">
                            {title}
                        </h1>

                        {tagline && (
                            <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6 font-serif">
                                "{tagline}"
                            </p>
                        )}

                        {/* Quick Logistics Strip */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4 border-y border-stone-200 text-xs text-stone-700 mb-6 bg-stone-50/60 rounded-2xl p-4">
                            <div>
                                <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">Duration</span>
                                <span className="font-bold text-stone-900">{duration}</span>
                            </div>
                            <div>
                                <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">Destinations</span>
                                <span className="font-bold text-stone-900 truncate block">{destinationsCovered}</span>
                            </div>
                            <div>
                                <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">Vehicle</span>
                                <span className="font-bold text-stone-900">{vehicleType || 'Private AC Cab'}</span>
                            </div>
                            <div>
                                <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">Starting Price</span>
                                <span className="font-black text-amber-900 font-mono text-sm">{displayPrice}</span>
                            </div>
                            <div>
                                <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">Pricing Basis</span>
                                <span className="font-semibold text-stone-800">{pricingUnit || priceNote || 'Transparent Quote'}</span>
                            </div>
                            <div>
                                <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">Status</span>
                                <span className={`font-bold ${isComingSoon ? 'text-amber-700' : 'text-emerald-700'}`}>
                                    {isComingSoon ? 'Custom Enquiry' : 'Operational'}
                                </span>
                            </div>
                        </div>

                        {/* Dual Primary Actions */}
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsModalOpen(true);
                                    setBookingSuccess(false);
                                    setBookingError('');
                                }}
                                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-md transition cursor-pointer"
                            >
                                Book / Request Quote ✨
                            </button>

                            <Link
                                to={`/plan-your-trip?tour=${slug}`}
                                className="bg-stone-900 hover:bg-stone-800 text-stone-100 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition shadow-xs"
                            >
                                Customize in Trip Planner 🧭
                            </Link>

                            <a
                                href={`https://wa.me/918149783494?text=Namaste!%20I%20am%20interested%20in%20the%20${encodeURIComponent(title)}%20tour.`}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => trackWhatsAppClick(`tour_${slug}`)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3.5 rounded-xl shadow-xs transition inline-flex items-center gap-1.5"
                                aria-label="Chat with coordinator on WhatsApp"
                            >
                                <span>WhatsApp Us</span>
                                <span>💬</span>
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-md aspect-[4/3] bg-stone-900 relative">
                            <ImageWithSkeleton
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover"
                                priority={true}
                            />
                        </div>
                    </div>
                </div>

                {/* Coming Soon Notice if applicable */}
                {isComingSoon && (
                    <div className="mb-10 bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
                        <span className="text-xl" aria-hidden="true">🔔</span>
                        <div>
                            <strong className="block font-serif text-sm text-amber-900 mb-0.5">Future Expansion Route (Enquiry Only):</strong>
                            <p className="leading-relaxed text-amber-900/90">
                                This international cross-border route is currently accepted on a customized advance enquiry basis. Please contact our desk 3–4 weeks prior to finalize permit logistics and vehicle allocations.
                            </p>
                        </div>
                    </div>
                )}

                {/* Main Content & Sidebar Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-10">
                        {/* 1. Overview */}
                        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs space-y-3">
                            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                                Tour Overview
                            </h2>
                            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                                {overview}
                            </p>
                        </section>

                        {/* 2. Detailed Day-by-Day Itinerary Timeline */}
                        {itinerary && itinerary.length > 0 && (
                            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
                                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-6">
                                    Day-by-Day Itinerary & Schedule
                                </h2>
                                <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-amber-200">
                                    {itinerary.map((slot, idx) => (
                                        <div key={idx} className="relative pl-10">
                                            <div className="absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-amber-600 border-2 border-white shadow-xs -translate-x-1/2" />
                                            <span className="text-[11px] font-bold tracking-wider uppercase text-amber-700 block mb-0.5">
                                                {slot.day || slot.time || `Phase ${idx + 1}`}
                                            </span>
                                            <h3 className="font-serif font-bold text-base text-stone-900 mb-1">
                                                {slot.title}
                                            </h3>
                                            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                                                {slot.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 3. Inclusions & Exclusions */}
                        {(inclusions || exclusions) && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {inclusions && (
                                    <section className="bg-emerald-50/50 rounded-3xl p-6 border border-emerald-200/70">
                                        <h3 className="font-serif font-bold text-base text-emerald-950 mb-3 flex items-center gap-2">
                                            <span>✓</span>
                                            <span>Inclusions</span>
                                        </h3>
                                        <ul className="text-xs text-stone-700 space-y-2">
                                            {inclusions.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <span className="text-emerald-600 font-bold shrink-0">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                {exclusions && (
                                    <section className="bg-stone-50 rounded-3xl p-6 border border-stone-200">
                                        <h3 className="font-serif font-bold text-base text-stone-900 mb-3 flex items-center gap-2">
                                            <span>✕</span>
                                            <span>Exclusions</span>
                                        </h3>
                                        <ul className="text-xs text-stone-600 space-y-2">
                                            {exclusions.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <span className="text-stone-400 font-bold shrink-0">•</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}
                            </div>
                        )}

                        {/* 4. Ideal For */}
                        {idealFor && (
                            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
                                <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
                                    Who Is This Tour Ideal For?
                                </h3>
                                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                                    {idealFor}
                                </p>
                            </section>
                        )}

                        {/* 5. Practical Guidelines */}
                        {practicalTips && practicalTips.length > 0 && (
                            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
                                <h3 className="font-serif font-bold text-lg text-stone-900 mb-4">
                                    Practical Guidelines for This Route
                                </h3>
                                <div className="space-y-2.5 text-xs text-stone-700">
                                    {practicalTips.map((tip, idx) => (
                                        <div key={idx} className="flex items-start gap-2.5">
                                            <span className="text-amber-600 font-bold">ℹ️</span>
                                            <span className="leading-relaxed">{tip}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 6. FAQs Accordion */}
                        {faqs && faqs.length > 0 && (
                            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
                                <h3 className="font-serif font-bold text-lg text-stone-900 mb-4">
                                    Frequently Asked Questions
                                </h3>
                                <div className="space-y-3">
                                    {faqs.map((faq, idx) => (
                                        <details key={idx} className="group bg-stone-50 rounded-2xl p-4 border border-stone-200/80">
                                            <summary className="font-serif font-bold text-xs sm:text-sm text-stone-900 cursor-pointer flex items-center justify-between list-none">
                                                <span>{faq.q}</span>
                                                <span className="text-amber-600 group-open:rotate-180 transition-transform font-mono text-xs">▼</span>
                                            </summary>
                                            <p className="text-xs text-stone-600 leading-relaxed mt-3 pt-3 border-t border-stone-200/60">
                                                {faq.a}
                                            </p>
                                        </details>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Sticky Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">
                            {/* Booking Card */}
                            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-md space-y-5">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                                        Starting Estimate
                                    </span>
                                    <div className="text-2xl font-serif font-black text-amber-900 font-mono">
                                        {displayPrice}
                                    </div>
                                    <span className="text-xs text-stone-500 block">
                                        {priceNote || pricingUnit || 'Starting rate per booking'}
                                    </span>
                                </div>

                                <div className="space-y-2.5 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsModalOpen(true);
                                            setBookingSuccess(false);
                                            setBookingError('');
                                        }}
                                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition text-center cursor-pointer"
                                    >
                                        Request Tour Quote ✨
                                    </button>

                                    <Link
                                        to={`/plan-your-trip?tour=${slug}`}
                                        className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition text-center block border border-stone-300"
                                    >
                                        Customize in Trip Planner 🧭
                                    </Link>
                                </div>

                                <div className="border-t border-stone-100 pt-4 text-center">
                                    <span className="text-[11px] text-stone-500 block mb-1">Prefer instant messaging?</span>
                                    <a
                                        href={`https://wa.me/918149783494?text=Namaste!%20I%20would%20like%20to%20customize%20the%20${encodeURIComponent(title)}%20tour.`}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={() => trackWhatsAppClick(`sidebar_tour_${slug}`)}
                                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1.5"
                                    >
                                        <span>Chat with Local Coordinator</span>
                                        <span>💬</span>
                                    </a>
                                </div>

                                <div className="pt-2 text-center text-[11px] text-stone-500">
                                    Direct Phone: <a href="tel:+918400554029" className="text-amber-700 font-bold font-mono">+91 84005 54029</a>
                                </div>
                            </div>

                            {/* Trust Badge Card */}
                            <div className="bg-amber-50/70 rounded-3xl p-5 border border-amber-200/70 text-xs text-amber-950 space-y-2">
                                <h3 className="font-serif font-bold text-amber-900 text-sm">Kashi Vashi Tour Promise</h3>
                                <ul className="space-y-1.5 text-[11px] text-amber-900/90">
                                    <li>✓ Dedicated private AC vehicle throughout</li>
                                    <li>✓ Driver allowance, tolls & parking included</li>
                                    <li>✓ Transparent quote with no surprise fees</li>
                                    <li>✓ On-ground local coordination assistance</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Tours */}
                {relatedTours.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-stone-200">
                        <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
                            Other Recommended Pilgrimages & Circuits
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedTours.map((rel) => (
                                <TourCard key={rel.slug} tour={rel} />
                            ))}
                        </div>
                    </div>
                )}
            </article>

            {/* Interactive Tour Booking Enquiry Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs overflow-y-auto"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="tour-booking-modal-title"
                >
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 text-xl font-bold cursor-pointer"
                            aria-label="Close modal"
                        >
                            ✕
                        </button>

                        {!bookingSuccess ? (
                            <>
                                <div className="mb-6">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                                        Tour Booking Enquiry
                                    </span>
                                    <h2 id="tour-booking-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-2">
                                        Book {title}
                                    </h2>
                                    <p className="text-xs text-stone-600 mt-1">
                                        ⏱️ {duration} • 📍 {destinationsCovered}
                                    </p>
                                </div>

                                {bookingError && (
                                    <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl">
                                        {bookingError}
                                    </div>
                                )}

                                <form onSubmit={handleBookingSubmit} className="space-y-4">
                                    <input
                                        type="text"
                                        name="website_hp"
                                        value={bookingForm.website_hp}
                                        onChange={handleFormChange}
                                        tabIndex="-1"
                                        autoComplete="off"
                                        className="hidden"
                                    />

                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 mb-1">
                                            Full Name <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={bookingForm.name}
                                            onChange={handleFormChange}
                                            placeholder="e.g. Ramesh Sharma"
                                            className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold text-stone-700 mb-1">
                                                Mobile Number <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={bookingForm.phone}
                                                onChange={handleFormChange}
                                                placeholder="10-digit mobile number"
                                                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-stone-700 mb-1">
                                                Email Address (Optional)
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={bookingForm.email}
                                                onChange={handleFormChange}
                                                placeholder="name@example.com"
                                                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold text-stone-700 mb-1">
                                                Travel Date
                                            </label>
                                            <input
                                                type="date"
                                                name="travelDate"
                                                value={bookingForm.travelDate}
                                                onChange={handleFormChange}
                                                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-stone-700 mb-1">
                                                Group Size
                                            </label>
                                            <select
                                                name="guests"
                                                value={bookingForm.guests}
                                                onChange={handleFormChange}
                                                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                                            >
                                                <option>1 Adult (Solo)</option>
                                                <option>2 Adults (Couple)</option>
                                                <option>3-4 Members (Family)</option>
                                                <option>5-6 Members (Family/Group)</option>
                                                <option>7+ Members (Large Group)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold text-stone-700 mb-1">
                                                Vehicle Preference
                                            </label>
                                            <select
                                                name="vehiclePreference"
                                                value={bookingForm.vehiclePreference}
                                                onChange={handleFormChange}
                                                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                                            >
                                                <option>Dedicated AC Sedan (1-4 pax)</option>
                                                <option>Ertiga / XL6 (4-6 pax)</option>
                                                <option>Toyota Innova Crysta (Premium)</option>
                                                <option>Force Urbania (Luxury 7-15 pax)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-stone-700 mb-1">
                                                Stay Arrangement
                                            </label>
                                            <select
                                                name="stayPreference"
                                                value={bookingForm.stayPreference}
                                                onChange={handleFormChange}
                                                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                                            >
                                                <option>Include 3-Star Hotel Stay</option>
                                                <option>Upgrade to Heritage Haveli Stay</option>
                                                <option>Vehicle & Coordination Only (No Stay)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 mb-1">
                                            Special Requests or Arrival Details
                                        </label>
                                        <textarea
                                            name="specialNotes"
                                            rows="2"
                                            value={bookingForm.specialNotes}
                                            onChange={handleFormChange}
                                            placeholder="e.g. flight arrival number, senior citizen assistance, wheelchair needs..."
                                            className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition disabled:opacity-50 cursor-pointer"
                                        >
                                            {isSubmitting ? 'Submitting to Tour Desk...' : 'Confirm & Request Quotation'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-6 space-y-4">
                                <span className="text-5xl block">✅</span>
                                <h2 className="text-xl font-serif font-bold text-stone-900">
                                    Tour Enquiry Submitted Successfully!
                                </h2>
                                <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                                    Thank you, <strong>{bookingForm.name}</strong>. Your enquiry for <strong>{title}</strong> has been logged in our system.
                                </p>
                                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs text-stone-700 font-mono">
                                    Reference ID: <strong>{bookingRefId}</strong>
                                </div>
                                <p className="text-xs text-stone-500">
                                    Our local tour specialist will review your vehicle and group details and contact you via WhatsApp / Phone at <strong>{bookingForm.phone}</strong> with a clear, unhurried proposal.
                                </p>
                                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition cursor-pointer"
                                    >
                                        Close
                                    </button>
                                    <a
                                        href={`https://wa.me/918149783494?text=Namaste!%20I%20have%20submitted%20tour%20enquiry%20Ref:%20${bookingRefId}%20for%20${encodeURIComponent(title)}.`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition inline-flex items-center justify-center gap-1.5"
                                    >
                                        <span>Chat on WhatsApp</span>
                                        <span>💬</span>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
