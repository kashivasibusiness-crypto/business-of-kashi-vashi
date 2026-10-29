import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import TourCard from '../components/TourCard';
import { TOURS, TOUR_CATEGORIES } from '../data/toursData';
import { getAttribution } from '../utils/attribution';
import { BASE_URL } from '../../constants/crm';

export default function ToursHubPage() {
    const [selectedCategory, setSelectedCategory] = useState('All Tours');
    const [searchQuery, setSearchQuery] = useState('');

    // Modal state for quick quote on card
    const [activeQuoteTour, setActiveQuoteTour] = useState(null);
    const [quoteForm, setQuoteForm] = useState({
        name: '',
        phone: '',
        email: '',
        travelDate: '',
        guests: '2 Adults',
        vehiclePreference: 'Dedicated AC Sedan',
        notes: '',
        website_hp: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isSubmittingRef = useRef(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitRefId, setSubmitRefId] = useState('');
    const [submitError, setSubmitError] = useState('');

    const filteredTours = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();

        return TOURS.filter((tour) => {
            // Category filter
            const matchesCategory =
                selectedCategory === 'All Tours' ||
                tour.category === selectedCategory ||
                (selectedCategory === 'Future Routes' && (tour.status === 'coming_soon' || tour.isFutureRoute));

            if (!matchesCategory) return false;

            // Search query filter
            if (!query) return true;

            const titleMatch = tour.title.toLowerCase().includes(query);
            const taglineMatch = (tour.tagline || '').toLowerCase().includes(query);
            const shortDescMatch = (tour.shortDesc || '').toLowerCase().includes(query);
            const destMatch = (tour.destinationsCovered || '').toLowerCase().includes(query);
            const categoryMatch = (tour.category || '').toLowerCase().includes(query);

            return titleMatch || taglineMatch || shortDescMatch || destMatch || categoryMatch;
        });
    }, [selectedCategory, searchQuery]);

    const handleClearFilters = () => {
        setSelectedCategory('All Tours');
        setSearchQuery('');
    };

    const handleOpenQuoteModal = (tour) => {
        setActiveQuoteTour(tour);
        setSubmitSuccess(false);
        setSubmitError('');
    };

    const handleQuoteFormChange = (e) => {
        const { name, value } = e.target;
        setQuoteForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleQuoteSubmit = async (e) => {
        e.preventDefault();

        if (quoteForm.website_hp) return;
        if (isSubmittingRef.current) return;
        isSubmittingRef.current = true;
        setIsSubmitting(true);
        setSubmitError('');

        if (!quoteForm.name.trim() || quoteForm.name.trim().length < 2) {
            setSubmitError('Please enter your full name (at least 2 characters).');
            isSubmittingRef.current = false;
            setIsSubmitting(false);
            return;
        }

        const cleanPhone = quoteForm.phone.replace(/[^0-9]/g, '');
        if (cleanPhone.length < 10) {
            setSubmitError('Please enter a valid 10-digit mobile number.');
            isSubmittingRef.current = false;
            setIsSubmitting(false);
            return;
        }

        const attr = getAttribution();
        const payload = {
            name: quoteForm.name.trim(),
            phone: quoteForm.phone.trim(),
            email: quoteForm.email.trim() || undefined,
            travelDate: quoteForm.travelDate || 'Flexible / Upcoming',
            guests: quoteForm.guests,
            duration: activeQuoteTour?.duration || 'Tour Package',
            comingFrom: 'Tours Hub Page',
            requirements: [
                `Tour Package: ${activeQuoteTour?.title}`,
                `Vehicle Preference: ${quoteForm.vehiclePreference}`,
                quoteForm.notes ? `Notes: ${quoteForm.notes.trim()}` : null
            ].filter(Boolean),
            source: attr.source || 'WEBSITE',
            leadSource: 'Tours Hub Page',
            landingPath: typeof window !== 'undefined' ? window.location.pathname : '',
            utm: {
                source: attr.utmSource || null,
                medium: attr.utmMedium || null,
                campaign: attr.utmCampaign || null
            },
            website_hp: quoteForm.website_hp
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
                throw new Error(data.message || 'Server rejected tour enquiry.');
            }

            setSubmitRefId(data.leadId || data.id || `KV-${Date.now().toString().slice(-6)}`);
            setSubmitSuccess(true);
        } catch (err) {
            setSubmitError(err.message || 'Network error. Please try again or chat with our local team on WhatsApp.');
        } finally {
            isSubmittingRef.current = false;
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <SEO
                title="Varanasi Tour Packages & Spiritual Circuits | Kashi-Vashi"
                description="Custom spiritual tours and pilgrimage packages in Varanasi. Darshan packages, boat cruises, Sarnath day trips, and Buddhist circuit journeys."
                pathname="/tours"
            />

            {/* Breadcrumb Navigation */}
            <div className="bg-stone-100/60 border-b border-stone-200/80 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <Breadcrumb
                        crumbs={[
                            { label: 'Tours & Packages' }
                        ]}
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                {/* Hero Header */}
                <div className="max-w-3xl mx-auto mb-10 text-center">
                    <SectionHeading
                        as="h1"
                        align="center"
                        eyebrow="Curated Pilgrimages & Day Tours"
                        title="Varanasi Tour Packages & Regional Circuits"
                        description="Every itinerary is flexible and customized to your arrival timings and family needs. We combine clean private AC transport, verified boat charters, and respectful darshan facilitation."
                    />
                </div>

                {/* Live Search & Filter Bar */}
                <div className="mb-10 space-y-5 max-w-4xl mx-auto">
                    {/* Live Search Input */}
                    <div className="relative">
                        <label htmlFor="tours-search" className="sr-only">
                            Search Tours and Pilgrimage Circuits
                        </label>
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                            <span aria-hidden="true" className="text-lg">🔍</span>
                        </div>
                        <input
                            id="tours-search"
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search tours by name, destination (e.g. Ayodhya, Sarnath, Sangam, Chunar)..."
                            className="w-full pl-11 pr-10 py-3.5 bg-white border border-stone-300 rounded-2xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-2xs transition"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer"
                                aria-label="Clear search"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1" role="tablist" aria-label="Tour Categories">
                        {TOUR_CATEGORIES.map((cat) => {
                            const isActive = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer ${
                                        isActive
                                            ? 'bg-amber-600 text-white shadow-xs'
                                            : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200/90'
                                    }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>

                    {/* Active Filter Result Count */}
                    <div className="flex items-center justify-between text-xs text-stone-500 px-1 pt-1">
                        <span>
                            Showing <strong className="text-stone-900">{filteredTours.length}</strong> of {TOURS.length} tours & circuits
                        </span>
                        {(selectedCategory !== 'All Tours' || searchQuery) && (
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer"
                            >
                                Reset all filters
                            </button>
                        )}
                    </div>
                </div>

                {/* Tours Grid or Empty State */}
                {filteredTours.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {filteredTours.map((tour) => (
                            <TourCard
                                key={tour.slug}
                                tour={tour}
                                onQuoteClick={handleOpenQuoteModal}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-stone-50 rounded-3xl p-10 sm:p-14 text-center border border-dashed border-stone-300 max-w-xl mx-auto my-8">
                        <span className="text-4xl block mb-3" aria-hidden="true">🗺️</span>
                        <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
                            No Tour Packages Matched Your Search
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
                            We couldn't find tours matching "{searchQuery}". Try searching for destinations like "Ayodhya", "Prayagraj", "Sarnath", or reset your category filter.
                        </p>
                        <button
                            type="button"
                            onClick={handleClearFilters}
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl shadow-xs transition cursor-pointer"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Practical Pricing & Transparent Quote Notice */}
                <div className="mt-14 bg-stone-50 rounded-2xl p-5 border border-stone-200/80 text-xs text-stone-600 max-w-4xl mx-auto flex items-start gap-3">
                    <span className="text-amber-600 text-lg shrink-0" aria-hidden="true">ℹ️</span>
                    <p className="leading-relaxed">
                        <strong className="text-stone-900 font-serif">Transparent Quotation Guarantee:</strong> Displayed prices are honest starting estimates calculated with verified vehicle rates, tolls, parking, and driver allowances. You receive a complete itemized proposal tailored to your actual family count, dates, and vehicle choice before any booking commitment.
                    </p>
                </div>

                {/* Custom Itinerary Notice Banner */}
                <div className="mt-12 bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-sm text-center max-w-3xl mx-auto">
                    <span className="text-[11px] uppercase font-bold tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-block mb-3">
                        Tailor-Made Pilgrimages
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-2">
                        Need a Custom Pilgrimage Schedule?
                    </h2>
                    <p className="text-stone-600 text-xs sm:text-sm mb-6 max-w-xl mx-auto leading-relaxed">
                        Tell us your train/flight arrival, hotel preferences, or special Vedic ritual requirements. We will prepare an unhurried, comfortable schedule for your family.
                    </p>
                    <Link
                        to="/plan-your-trip"
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl transition shadow-md inline-block"
                    >
                        Create Custom Itinerary in Trip Planner →
                    </Link>
                </div>
            </div>

            {/* Quick Quote Enquiry Modal */}
            {activeQuoteTour && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs overflow-y-auto"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="quote-modal-title"
                >
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative my-8">
                        <button
                            type="button"
                            onClick={() => setActiveQuoteTour(null)}
                            className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 text-xl font-bold cursor-pointer"
                            aria-label="Close modal"
                        >
                            ✕
                        </button>

                        {!submitSuccess ? (
                            <>
                                <div className="mb-6">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                                        Tour Quotation Request
                                    </span>
                                    <h2 id="quote-modal-title" className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-2">
                                        {activeQuoteTour.title}
                                    </h2>
                                    <p className="text-xs text-stone-600 mt-1">
                                        ⏱️ {activeQuoteTour.duration} • 📍 {activeQuoteTour.destinationsCovered}
                                    </p>
                                </div>

                                {submitError && (
                                    <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl">
                                        {submitError}
                                    </div>
                                )}

                                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                                    <input
                                        type="text"
                                        name="website_hp"
                                        value={quoteForm.website_hp}
                                        onChange={handleQuoteFormChange}
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
                                            value={quoteForm.name}
                                            onChange={handleQuoteFormChange}
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
                                                value={quoteForm.phone}
                                                onChange={handleQuoteFormChange}
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
                                                value={quoteForm.email}
                                                onChange={handleQuoteFormChange}
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
                                                value={quoteForm.travelDate}
                                                onChange={handleQuoteFormChange}
                                                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-stone-700 mb-1">
                                                Group Size
                                            </label>
                                            <select
                                                name="guests"
                                                value={quoteForm.guests}
                                                onChange={handleQuoteFormChange}
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

                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 mb-1">
                                            Vehicle Preference
                                        </label>
                                        <select
                                            name="vehiclePreference"
                                            value={quoteForm.vehiclePreference}
                                            onChange={handleQuoteFormChange}
                                            className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                                        >
                                            <option>Dedicated AC Sedan (Dzire / Etios, 1-4 pax)</option>
                                            <option>Ertiga / XL6 (4-6 pax)</option>
                                            <option>Toyota Innova Crysta (Premium, 4-6 pax)</option>
                                            <option>Force Urbania / Tempo Traveller (7-15 pax)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-stone-700 mb-1">
                                            Special Requests or Elderly Care Notes
                                        </label>
                                        <textarea
                                            name="notes"
                                            rows="2"
                                            value={quoteForm.notes}
                                            onChange={handleQuoteFormChange}
                                            placeholder="e.g. airport pickup, ground floor hotel room, special pooja requirements..."
                                            className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition disabled:opacity-50 cursor-pointer"
                                        >
                                            {isSubmitting ? 'Submitting to Tour Desk...' : 'Request Transparent Quote'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-6 space-y-4">
                                <span className="text-5xl block">✅</span>
                                <h2 className="text-xl font-serif font-bold text-stone-900">
                                    Tour Quotation Request Logged!
                                </h2>
                                <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                                    Thank you, <strong>{quoteForm.name}</strong>. Your enquiry for <strong>{activeQuoteTour.title}</strong> has been received by our Varanasi travel desk.
                                </p>
                                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs text-stone-700 font-mono">
                                    Reference ID: <strong>{submitRefId}</strong>
                                </div>
                                <p className="text-xs text-stone-500">
                                    Our local coordinator will review your requested vehicle, dates, and group size, and share an unhurried, transparent proposal on WhatsApp / Phone at <strong>{quoteForm.phone}</strong>.
                                </p>
                                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setActiveQuoteTour(null)}
                                        className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition cursor-pointer"
                                    >
                                        Close
                                    </button>
                                    <a
                                        href={`https://wa.me/918149783494?text=Namaste!%20I%20requested%20a%20quote%20Ref:%20${submitRefId}%20for%20${encodeURIComponent(activeQuoteTour.title)}.`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition inline-flex items-center justify-center gap-1.5"
                                    >
                                        <span>Chat with Specialist</span>
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
