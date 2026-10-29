import React, { useState, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../seo/SEO';
import Breadcrumb from '../components/Breadcrumb';
import ImageWithSkeleton from '../components/ImageWithSkeleton';
import ExperienceCard from '../components/ExperienceCard';
import { EXPERIENCES, getExperienceBySlug } from '../data/experiencesData';
import { trackWhatsAppClick } from '../utils/analytics';
import { getAttribution } from '../utils/attribution';
import { BASE_URL } from '../../constants/crm';

export default function ExperienceDetailPage() {
    const { slug } = useParams();
    const experience = getExperienceBySlug(slug);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingForm, setBookingForm] = useState({
        name: '',
        phone: '',
        email: '',
        preferredDate: '',
        guests: '2 Adults',
        typeOption: 'Private Dedicated',
        specialNotes: '',
        website_hp: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isSubmittingRef = useRef(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingRefId, setBookingRefId] = useState('');
    const [bookingError, setBookingError] = useState('');

    if (!experience) {
        return <Navigate to="/experiences" replace />;
    }

    const {
        title,
        category,
        tagline,
        image,
        durationEstimate,
        bestTime,
        timingEstimateDisclaimer,
        experienceType,
        meetingPoint,
        meetingInstructions,
        guideRole,
        languages,
        pricing,
        overview,
        whatToExpect,
        proposedRoute,
        whatsIncluded,
        whatsExcluded,
        safetyAndRegulations,
        cancellationConditions,
        practicalTips,
        faqs,
        relatedSlugs,
        destinationName
    } = experience;

    const relatedExperiences = EXPERIENCES.filter(
        (e) => relatedSlugs && relatedSlugs.includes(e.slug) && e.slug !== experience.slug
    );

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setBookingForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        // Honeypot check
        if (bookingForm.website_hp) return;

        // Synchronous guard
        if (isSubmittingRef.current) return;
        isSubmittingRef.current = true;
        setIsSubmitting(true);
        setBookingError('');

        // Validation
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
            travelDate: bookingForm.preferredDate || 'Upcoming / Flexible',
            guests: bookingForm.guests,
            duration: experience.duration || 'Day Experience',
            comingFrom: 'Experience Booking Page',
            requirements: [
                `Experience: ${title}`,
                `Option: ${bookingForm.typeOption}`,
                bookingForm.specialNotes ? `Notes: ${bookingForm.specialNotes.trim()}` : null
            ].filter(Boolean),
            source: attr.source || 'WEBSITE',
            leadSource: 'Experience Detail Page',
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

            // Fallback if 404
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
                throw new Error(data.message || 'Server rejected enquiry submission.');
            }

            setBookingRefId(data.leadId || data.id || `KV-${Date.now().toString().slice(-6)}`);
            setBookingSuccess(true);
        } catch (err) {
            setBookingError(err.message || 'Network error. Please try again or reach out to us directly on WhatsApp.');
        } finally {
            isSubmittingRef.current = false;
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <SEO
                title={`${title} | Varanasi Experiences | Kashi-Vashi`}
                description={tagline || `${title} experience in Varanasi. Guided by verified local hosts.`}
                pathname={`/experiences/${slug}`}
                image={image}
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'TouristAttraction',
                    name: title,
                    description: tagline,
                    touristType: ['Spiritual Seekers', 'Cultural Enthusiasts'],
                    url: `https://varanasiyatra.com/experiences/${slug}`
                }}
            />

            {/* Breadcrumb Bar */}
            <div className="bg-stone-100/60 border-b border-stone-200/80 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <Breadcrumb
                        crumbs={[
                            { label: 'Experiences', href: '/experiences' },
                            { label: title }
                        ]}
                    />
                </div>
            </div>

            <article className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                {/* Hero Header Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-center">
                    <div className="lg:col-span-7">
                        <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                            <span>{category}</span>
                            <span className="text-amber-400">•</span>
                            <span>{destinationName || 'Varanasi'}</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-stone-900 leading-tight mb-4">
                            {title}
                        </h1>

                        <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6 font-serif">
                            "{tagline}"
                        </p>

                        {/* Quick Logistics Strip */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4 border-y border-stone-200 text-xs text-stone-700 mb-6 bg-stone-50/60 rounded-2xl p-4">
                            <div>
                                <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">Duration</span>
                                <span className="font-bold text-stone-900">{durationEstimate || experience.duration}</span>
                            </div>
                            <div>
                                <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">Best Timing</span>
                                <span className="font-bold text-stone-900">{bestTime}</span>
                            </div>
                            <div>
                                <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">Experience Type</span>
                                <span className="font-bold text-stone-900">{experienceType?.split('/')[0]}</span>
                            </div>
                            <div>
                                <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">Meeting Point</span>
                                <span className="font-semibold text-stone-800 truncate block">{meetingPoint}</span>
                            </div>
                            <div>
                                <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">Languages</span>
                                <span className="font-semibold text-stone-800">{languages?.join(', ')}</span>
                            </div>
                            <div>
                                <span className="text-stone-400 block text-[10px] font-bold uppercase tracking-wider">Pricing Basis</span>
                                <span className="font-bold text-amber-800">{pricing?.display || 'On Request'}</span>
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
                                Book This Experience ✨
                            </button>

                            <Link
                                to={`/plan-your-trip?experience=${slug}`}
                                className="bg-stone-900 hover:bg-stone-800 text-stone-100 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition shadow-xs"
                            >
                                Customize in Trip Planner 🧭
                            </Link>

                            <a
                                href={`https://wa.me/918149783494?text=Namaste!%20I%20am%20interested%20in%20the%20${encodeURIComponent(title)}%20experience%20in%20Varanasi.`}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => trackWhatsAppClick(`experience_${slug}`)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3.5 rounded-xl shadow-xs transition inline-flex items-center gap-1.5"
                                aria-label="Ask questions on WhatsApp"
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

                {/* Main Content & Sidebar Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-10">
                        {/* 1. Overview */}
                        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs space-y-4">
                            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                                Overview & What You'll Experience
                            </h2>
                            <div className="prose text-stone-700 text-xs sm:text-sm leading-relaxed space-y-3">
                                {Array.isArray(overview) ? (
                                    overview.map((p, idx) => <p key={idx}>{p}</p>)
                                ) : (
                                    <p>{overview}</p>
                                )}
                            </div>

                            {timingEstimateDisclaimer && (
                                <div className="mt-4 bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/70 text-xs text-amber-950 flex items-start gap-2.5">
                                    <span className="text-amber-700 font-bold" aria-hidden="true">⏱️</span>
                                    <p className="leading-relaxed">
                                        <strong>Timing Estimate:</strong> {timingEstimateDisclaimer}
                                    </p>
                                </div>
                            )}
                        </section>

                        {/* 2. What to Expect Highlights */}
                        {whatToExpect && whatToExpect.length > 0 && (
                            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
                                <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 mb-4">
                                    What to Expect
                                </h2>
                                <ul className="grid grid-cols-1 gap-2.5 text-xs sm:text-sm text-stone-700">
                                    {whatToExpect.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 bg-stone-50 p-3 rounded-xl border border-stone-100">
                                            <span className="text-emerald-600 font-bold">✓</span>
                                            <span className="leading-snug">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* 3. Guide / Host Role */}
                        {guideRole && (
                            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
                                <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 mb-2">
                                    Your Guide & Coordinator's Role
                                </h2>
                                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                                    We do not employ commission touts. Every coordinator assigned to your booking is locally vetted with clear responsibilities:
                                </p>
                                <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/70 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
                                    <span className="text-xl" aria-hidden="true">🧭</span>
                                    <div>
                                        <h3 className="font-bold text-amber-900 mb-1">On-Ground Facilitation:</h3>
                                        <p className="leading-relaxed">{guideRole}</p>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* 4. Meeting Point & Proposed Route */}
                        {(meetingPoint || proposedRoute) && (
                            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
                                <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 mb-4">
                                    Meeting Point & Proposed Route
                                </h2>
                                {meetingInstructions && (
                                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 text-xs sm:text-sm text-stone-700 mb-6 flex items-start gap-3">
                                        <span className="text-xl" aria-hidden="true">📍</span>
                                        <div>
                                            <strong className="text-stone-900 block mb-0.5">Where We Meet:</strong>
                                            <p className="leading-relaxed">{meetingInstructions}</p>
                                        </div>
                                    </div>
                                )}

                                {proposedRoute && proposedRoute.length > 0 && (
                                    <div className="space-y-3">
                                        {proposedRoute.map((stop, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl border border-stone-100 hover:border-amber-200 transition bg-white">
                                                <span className="bg-amber-100 text-amber-900 font-bold text-xs px-2.5 py-1 rounded-lg shrink-0">
                                                    {stop.step}
                                                </span>
                                                <div>
                                                    <h3 className="text-xs sm:text-sm font-bold text-stone-900 mb-0.5">{stop.title}</h3>
                                                    <p className="text-xs text-stone-600 leading-relaxed">{stop.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        )}

                        {/* 5. Inclusions & Exclusions */}
                        {(whatsIncluded || whatsExcluded) && (
                            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
                                <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 mb-4">
                                    Transparent Inclusions & Exclusions
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {whatsIncluded && (
                                        <div className="space-y-2">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                                                What's Included
                                            </h3>
                                            <ul className="space-y-2 text-xs text-stone-700">
                                                {whatsIncluded.map((inc, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                                                        <span className="leading-relaxed">{inc}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {whatsExcluded && (
                                        <div className="space-y-2">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-2">
                                                What's Not Included
                                            </h3>
                                            <ul className="space-y-2 text-xs text-stone-700">
                                                {whatsExcluded.map((exc, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <span className="text-rose-500 font-bold shrink-0">✕</span>
                                                        <span className="leading-relaxed">{exc}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* 6. Safety, Regulations & Cancellation */}
                        {(safetyAndRegulations || cancellationConditions) && (
                            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs space-y-4">
                                <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900">
                                    Safety, Regulations & Cancellation Terms
                                </h2>

                                {safetyAndRegulations && safetyAndRegulations.length > 0 && (
                                    <div className="space-y-2 text-xs text-stone-700">
                                        <h3 className="font-bold text-stone-900">Visitor & River Safety Rules:</h3>
                                        <ul className="space-y-1.5 list-disc pl-5">
                                            {safetyAndRegulations.map((rule, idx) => (
                                                <li key={idx} className="leading-relaxed">{rule}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {cancellationConditions && (
                                    <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 flex items-start gap-2.5">
                                        <span className="text-amber-700 font-bold">🛡️</span>
                                        <div>
                                            <strong className="text-stone-900 block mb-0.5">Cancellation & Weather Policy:</strong>
                                            <p className="leading-relaxed">{cancellationConditions}</p>
                                        </div>
                                    </div>
                                )}
                            </section>
                        )}

                        {/* 7. Practical Tips */}
                        {practicalTips && practicalTips.length > 0 && (
                            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
                                <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 mb-4">
                                    Practical Information & Advice
                                </h2>
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

                        {/* 8. FAQs */}
                        {faqs && faqs.length > 0 && (
                            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
                                <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 mb-4">
                                    Frequently Asked Questions
                                </h2>
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
                                        Pricing & Availability
                                    </span>
                                    <div className="text-2xl font-serif font-black text-amber-900">
                                        {pricing?.display || 'On Request'}
                                    </div>
                                    <span className="text-xs text-stone-500 block">
                                        {pricing?.unit || 'Transparent seasonal quote'}
                                    </span>
                                </div>

                                {pricing?.note && (
                                    <p className="text-[11px] text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200 leading-relaxed">
                                        {pricing.note}
                                    </p>
                                )}

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
                                        Book This Experience ✨
                                    </button>

                                    <Link
                                        to={`/plan-your-trip?experience=${slug}`}
                                        className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition text-center block border border-stone-300"
                                    >
                                        Customize in Trip Planner 🧭
                                    </Link>
                                </div>

                                <div className="border-t border-stone-100 pt-4 text-center">
                                    <span className="text-[11px] text-stone-500 block mb-1">Prefer instant messaging?</span>
                                    <a
                                        href={`https://wa.me/918149783494?text=Namaste!%20I%20am%20interested%20in%20the%20${encodeURIComponent(title)}%20experience%20in%20Varanasi.`}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={() => trackWhatsAppClick(`sidebar_${slug}`)}
                                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1.5"
                                    >
                                        <span>Chat with Local Specialist</span>
                                        <span>💬</span>
                                    </a>
                                </div>
                            </div>

                            {/* Trust Badge Card */}
                            <div className="bg-amber-50/70 rounded-3xl p-5 border border-amber-200/70 text-xs text-amber-950 space-y-2">
                                <h3 className="font-serif font-bold text-amber-900 text-sm">Kashi Vashi Guarantee</h3>
                                <ul className="space-y-1.5 text-[11px] text-amber-900/90">
                                    <li>✓ Verified local boatmen & guides</li>
                                    <li>✓ Strict safety life jackets on river</li>
                                    <li>✓ Zero hidden commission showrooms</li>
                                    <li>✓ Dedicated founder accountability</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Experiences */}
                {relatedExperiences.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-stone-200">
                        <h2 className="text-2xl font-serif font-bold text-stone-900 mb-6">
                            Complementary Experiences in Varanasi
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedExperiences.map((exp) => (
                                <ExperienceCard key={exp.slug} experience={exp} />
                            ))}
                        </div>
                    </div>
                )}
            </article>

            {/* Interactive Booking Enquiry Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs overflow-y-auto"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="booking-modal-title"
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
                                        Direct Experience Booking
                                    </span>
                                    <h2 id="booking-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-2">
                                        Book {title}
                                    </h2>
                                    <p className="text-xs text-stone-600 mt-1">
                                        Submit your details for a verified quotation and availability check from our local team.
                                    </p>
                                </div>

                                {bookingError && (
                                    <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl">
                                        {bookingError}
                                    </div>
                                )}

                                <form onSubmit={handleBookingSubmit} className="space-y-4">
                                    {/* Honeypot */}
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
                                                Preferred Date
                                            </label>
                                            <input
                                                type="date"
                                                name="preferredDate"
                                                value={bookingForm.preferredDate}
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
                                                <option>3-5 Members (Family)</option>
                                                <option>6-10 Members (Group)</option>
                                                <option>10+ Members (Large Group)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 mb-1">
                                            Booking Preference
                                        </label>
                                        <select
                                            name="typeOption"
                                            value={bookingForm.typeOption}
                                            onChange={handleFormChange}
                                            className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                                        >
                                            <option>Private Dedicated (Solely for your family)</option>
                                            <option>Shared / Cost-Optimized (Where available)</option>
                                            <option>Need Guidance on Best Option</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 mb-1">
                                            Special Requests or Elderly Care Notes
                                        </label>
                                        <textarea
                                            name="specialNotes"
                                            rows="2"
                                            value={bookingForm.specialNotes}
                                            onChange={handleFormChange}
                                            placeholder="e.g., senior citizen wheelchair assistance, early morning sunrise timing, photography interest..."
                                            className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition disabled:opacity-50 cursor-pointer"
                                        >
                                            {isSubmitting ? 'Submitting to Coordinator...' : 'Confirm & Request Quote'}
                                        </button>
                                    </div>

                                    <p className="text-[10px] text-stone-500 text-center">
                                        No advance payment collected now. Transparent pricing and payment links are provided after confirming date availability.
                                    </p>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-6 space-y-4">
                                <span className="text-5xl block">✅</span>
                                <h2 className="text-xl font-serif font-bold text-stone-900">
                                    Enquiry Submitted Successfully!
                                </h2>
                                <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                                    Thank you, <strong>{bookingForm.name}</strong>. Your enquiry for <strong>{title}</strong> has been logged in our system.
                                </p>
                                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs text-stone-700 font-mono">
                                    Reference ID: <strong>{bookingRefId}</strong>
                                </div>
                                <p className="text-xs text-stone-500">
                                    Our local coordinator will review your requested date and reach out to you via WhatsApp / Phone at <strong>{bookingForm.phone}</strong> with availability and transparent pricing.
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
                                        href={`https://wa.me/918149783494?text=Namaste!%20I%20have%20submitted%20booking%20enquiry%20Ref:%20${bookingRefId}%20for%20${encodeURIComponent(title)}.`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition inline-flex items-center justify-center gap-1.5"
                                    >
                                        <span>Message Coordinator on WhatsApp</span>
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
