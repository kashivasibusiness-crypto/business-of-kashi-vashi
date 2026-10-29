import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import ImageWithSkeleton from '../components/ImageWithSkeleton';
import { DESTINATIONS, DESTINATION_CATEGORIES } from '../data/destinationsData';

export default function DestinationsHubPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Destinations');

    // Filter destinations based on search query and category
    const filteredDestinations = useMemo(() => {
        return DESTINATIONS.filter((dest) => {
            const matchesCategory =
                selectedCategory === 'All Destinations' ||
                dest.category === selectedCategory ||
                (dest.categories && dest.categories.includes(selectedCategory));

            const query = searchQuery.trim().toLowerCase();
            if (!query) return matchesCategory;

            const matchesSearch =
                dest.name.toLowerCase().includes(query) ||
                dest.tagline.toLowerCase().includes(query) ||
                dest.overview.toLowerCase().includes(query) ||
                (dest.attractions &&
                    dest.attractions.some((a) =>
                        a.name.toLowerCase().includes(query) || a.desc.toLowerCase().includes(query)
                    ));

            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, selectedCategory]);

    const handleResetFilters = () => {
        setSearchQuery('');
        setSelectedCategory('All Destinations');
    };

    return (
        <>
            <SEO
                title="Destinations & Sacred Circuits | Varanasi, Ayodhya, Prayagraj & Beyond | Kashi-Vashi"
                description="Explore verified spiritual and heritage destinations within and connected to Varanasi. In-depth travel guides for Kashi, Sarnath, Ayodhya Ji, Bodh Gaya, and Prayagraj with custom yatra planning."
                pathname="/destinations"
            />

            {/* Breadcrumb Header Bar */}
            <div className="bg-stone-100/70 border-b border-stone-200/80 py-3.5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <Breadcrumb crumbs={[{ label: 'Destinations' }]} />
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-10 sm:space-y-12">
                
                {/* Hero Section */}
                <div className="max-w-3xl space-y-4">
                    <SectionHeading
                        as="h1"
                        eyebrow="Sacred Geography of Northern India"
                        title="Destinations & Pilgrimage Circuits"
                        description="Explore timeless holy cities, Buddhist heritage monuments, and royal cultural centers connected with Varanasi. Each destination is supported by verified local coordination, dignified transport, and custom family planning."
                    />
                </div>

                {/* Search & Category Filter Controls */}
                <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                    
                    {/* Live Search Input */}
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 text-sm">
                            🔍
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by destination name, temple, or attraction (e.g. Ayodhya, Sarnath, Sangam)..."
                            aria-label="Search destinations"
                            className="w-full text-xs sm:text-sm pl-10 pr-10 py-3 rounded-2xl border border-stone-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition bg-stone-50/50"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                aria-label="Clear search query"
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 text-sm font-bold"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2 pt-1" role="tablist" aria-label="Destination Categories">
                        {DESTINATION_CATEGORIES.map((category) => {
                            const isSelected = selectedCategory === category;
                            return (
                                <button
                                    key={category}
                                    type="button"
                                    role="tab"
                                    aria-selected={isSelected}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`text-xs font-semibold px-3.5 py-2 rounded-xl transition cursor-pointer border ${
                                        isSelected
                                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                                            : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Filter Results Status */}
                <div className="flex items-center justify-between text-xs text-stone-500 px-1">
                    <span>
                        Showing <strong>{filteredDestinations.length}</strong> of {DESTINATIONS.length} Destinations
                        {selectedCategory !== 'All Destinations' && ` in "${selectedCategory}"`}
                        {searchQuery && ` matching "${searchQuery}"`}
                    </span>
                    {(selectedCategory !== 'All Destinations' || searchQuery) && (
                        <button
                            type="button"
                            onClick={handleResetFilters}
                            className="text-amber-700 hover:text-amber-900 font-bold underline cursor-pointer"
                        >
                            Reset Filters
                        </button>
                    )}
                </div>

                {/* Destination Cards Grid */}
                {filteredDestinations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {filteredDestinations.map((dest) => (
                            <article
                                key={dest.slug}
                                className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Card Visual Banner */}
                                    <Link
                                        to={`/destinations/${dest.slug}`}
                                        className="block relative aspect-[16/10] overflow-hidden bg-stone-900"
                                    >
                                        <ImageWithSkeleton
                                            src={dest.image}
                                            alt={dest.alt}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        
                                        {/* Duration Badge */}
                                        <span className="absolute top-3.5 left-3.5 bg-stone-950/80 backdrop-blur-xs text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full border border-stone-700/60 shadow-xs">
                                            ⏱️ {dest.idealDays}
                                        </span>

                                        {/* Category Badge */}
                                        <span className="absolute bottom-3.5 left-3.5 bg-white/90 backdrop-blur-xs text-stone-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-stone-200 shadow-2xs">
                                            {dest.category}
                                        </span>
                                    </Link>

                                    {/* Card Body */}
                                    <div className="p-6 space-y-3">
                                        <div>
                                            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-widest block mb-1">
                                                {dest.distanceFromCenter}
                                            </span>
                                            <h2 className="text-xl font-serif font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                                                <Link to={`/destinations/${dest.slug}`}>
                                                    {dest.name}
                                                </Link>
                                            </h2>
                                        </div>

                                        <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
                                            {dest.overview}
                                        </p>

                                        {/* Logistics Micro-Details */}
                                        <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-700 space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-stone-500 font-medium">Approx. Transit:</span>
                                                <span className="font-semibold text-stone-800">{dest.approxTravelTime}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-stone-500 font-medium">Best Season:</span>
                                                <span className="font-semibold text-stone-800 truncate max-w-[170px] text-right">
                                                    {dest.bestTimeToVisit}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Dual Actions Footer */}
                                <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between gap-3">
                                    <Link
                                        to={`/destinations/${dest.slug}`}
                                        className="text-xs font-bold text-stone-900 hover:text-amber-700 inline-flex items-center gap-1 transition-colors"
                                    >
                                        <span>Explore Destination</span>
                                        <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
                                    </Link>
                                    <Link
                                        to={`/plan-your-trip?destination=${dest.slug}`}
                                        className="bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-200 transition shadow-2xs"
                                    >
                                        Plan This Trip ✨
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    /* Empty Results State */
                    <div className="bg-stone-50 rounded-3xl border border-stone-200 p-10 sm:p-14 text-center space-y-4">
                        <span className="text-4xl block">🔍</span>
                        <h2 className="text-lg font-serif font-bold text-stone-900">
                            No destinations found matching your filter
                        </h2>
                        <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                            We couldn't find any destination matching "{searchQuery}". Try searching for another sacred place, or reset your filters.
                        </p>
                        <button
                            type="button"
                            onClick={handleResetFilters}
                            className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold py-2.5 px-5 rounded-xl transition shadow-xs cursor-pointer inline-block"
                        >
                            Show All Destinations
                        </button>
                    </div>
                )}

                {/* Informational Travel Disclaimer */}
                <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-5 sm:p-6 text-xs text-stone-600 leading-relaxed space-y-1">
                    <strong className="text-stone-800 font-semibold block">
                        ℹ️ Travel Logistics &amp; Pacing Notice:
                    </strong>
                    <p>
                        Distances and driving durations mentioned across destinations are approximate estimates under standard highway conditions. Darshan queue durations, aarti timings, and temple entry protocols are subject to temple trust guidelines and administrative security measures.
                    </p>
                </div>

            </main>
        </>
    );
}
