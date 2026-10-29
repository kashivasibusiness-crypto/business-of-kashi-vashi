import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import ExperienceCard from '../components/ExperienceCard';
import { EXPERIENCES, EXPERIENCE_CATEGORIES } from '../data/experiencesData';

export default function ExperiencesHubPage() {
    const [selectedCategory, setSelectedCategory] = useState('All Experiences');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredExperiences = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();

        return EXPERIENCES.filter((exp) => {
            // Category match
            const matchesCategory =
                selectedCategory === 'All Experiences' ||
                exp.category === selectedCategory ||
                (exp.categories && exp.categories.includes(selectedCategory));

            if (!matchesCategory) return false;

            // Search query match
            if (!query) return true;

            const titleMatch = exp.title.toLowerCase().includes(query);
            const taglineMatch = (exp.tagline || '').toLowerCase().includes(query);
            const shortDescMatch = (exp.shortDesc || '').toLowerCase().includes(query);
            const categoryMatch = (exp.category || '').toLowerCase().includes(query);
            const typeMatch = (exp.experienceType || '').toLowerCase().includes(query);

            return titleMatch || taglineMatch || shortDescMatch || categoryMatch || typeMatch;
        });
    }, [selectedCategory, searchQuery]);

    const handleClearFilters = () => {
        setSelectedCategory('All Experiences');
        setSearchQuery('');
    };

    return (
        <>
            <SEO
                title="Varanasi Experiences & Activities | Sunrise Boats, Aarti & Heritage | Kashi-Vashi"
                description="Explore handpicked authentic experiences in Varanasi. Sacred dawn boat rides, Maha Ganga Aarti, old Kashi heritage walks, Banarasi silk weavers, and culinary food trails."
                pathname="/experiences"
            />

            {/* Breadcrumb Navigation */}
            <div className="bg-stone-100/60 border-b border-stone-200/80 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <Breadcrumb
                        crumbs={[
                            { label: 'Experiences' }
                        ]}
                    />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                {/* Section Hero Header */}
                <div className="max-w-3xl mx-auto mb-10 text-center">
                    <SectionHeading
                        as="h1"
                        align="center"
                        eyebrow="Immersive Kashi Activities"
                        title="Varanasi Experiences & Sacred Activities"
                        description="Varanasi is not a museum; it is a living river of devotion, heritage, and timeless sensory energy. Choose experiences that resonate with your spirit, guided by vetted local storytellers and generational boatmen."
                    />
                </div>

                {/* Live Search & Filter Bar */}
                <div className="mb-10 space-y-5 max-w-4xl mx-auto">
                    {/* Live Search Input */}
                    <div className="relative">
                        <label htmlFor="experience-search" className="sr-only">
                            Search Varanasi Experiences
                        </label>
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
                            <span aria-hidden="true" className="text-lg">🔍</span>
                        </div>
                        <input
                            id="experience-search"
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search experiences (e.g., boat ride, aarti, food walk, silk, sarnath)..."
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
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1" role="tablist" aria-label="Experience Categories">
                        {EXPERIENCE_CATEGORIES.map((cat) => {
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
                            Showing <strong className="text-stone-900">{filteredExperiences.length}</strong> of {EXPERIENCES.length} experiences
                        </span>
                        {(selectedCategory !== 'All Experiences' || searchQuery) && (
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

                {/* Experience Cards Grid or Empty State */}
                {filteredExperiences.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {filteredExperiences.map((exp) => (
                            <ExperienceCard key={exp.slug} experience={exp} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-stone-50 rounded-3xl p-10 sm:p-14 text-center border border-dashed border-stone-300 max-w-xl mx-auto my-8">
                        <span className="text-4xl block mb-3" aria-hidden="true">🧭</span>
                        <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
                            No Experiences Matched Your Search
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
                            We couldn't find experiences matching "{searchQuery}". Try searching for popular keywords like "aarti", "boat", or "heritage", or clear your category filter.
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

                {/* Practical Logistics & Pricing Transparency Notice */}
                <div className="mt-14 bg-stone-50 rounded-2xl p-5 border border-stone-200/80 text-xs text-stone-600 max-w-4xl mx-auto flex items-start gap-3">
                    <span className="text-amber-600 text-lg shrink-0" aria-hidden="true">ℹ️</span>
                    <p className="leading-relaxed">
                        <strong className="text-stone-900 font-serif">Transparent Facilitation Policy:</strong> All experience timings and departures are approximate estimates coordinated with seasonal sunrises, twilight Aarti hours, and local district river administration directives. Quotes are shared with complete itemized clarity prior to confirmation without hidden tout commissions.
                    </p>
                </div>

                {/* Bottom Custom Experience CTA */}
                <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 sm:p-12 border border-amber-200/80 text-center max-w-3xl mx-auto shadow-2xs">
                    <span className="text-3xl block mb-2" aria-hidden="true">✨</span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mb-2">
                        Looking to Combine Experiences into a Custom Trip?
                    </h2>
                    <p className="text-stone-600 text-xs sm:text-sm mb-6 max-w-xl mx-auto leading-relaxed">
                        Whether you want to combine the Sunrise Boat Ride with private AC transportation to Sarnath, elderly temple queue coordination, or heritage haveli stays, our local team crafts unhurried bespoke yatras.
                    </p>
                    <Link
                        to="/plan-your-trip"
                        className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl transition shadow-md inline-block"
                    >
                        Design Custom Journey in Trip Planner →
                    </Link>
                </div>
            </div>
        </>
    );
}
