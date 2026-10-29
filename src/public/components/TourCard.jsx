import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithSkeleton from './ImageWithSkeleton';

export default function TourCard({ tour, onQuoteClick }) {
    const {
        slug,
        title,
        tagline,
        duration,
        image,
        badge,
        isBestSeller,
        startingPrice,
        price,
        priceNote,
        category,
        destinationsCovered,
        vehicleType,
        inclusions,
        status,
        isFutureRoute
    } = tour;

    const displayPrice = startingPrice || price;
    const displayBadge = badge || (isBestSeller ? 'Best Seller' : (isFutureRoute ? 'Future Route' : null));
    const isComingSoon = status === 'coming_soon' || isFutureRoute;

    return (
        <article className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col h-full hover:border-amber-500/40">
            {/* Visual Media Header */}
            <Link
                to={`/tours/${slug}`}
                className="block relative aspect-[16/10] overflow-hidden bg-stone-900"
                aria-label={`View itinerary for ${title}`}
            >
                <ImageWithSkeleton
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge */}
                {displayBadge && (
                    <span className={`absolute top-3.5 left-3.5 text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border shadow-xs ${
                        isComingSoon
                            ? 'bg-stone-900/90 text-amber-300 border-amber-500/40'
                            : 'bg-stone-950/85 backdrop-blur-xs text-amber-300 border-stone-700/60'
                    }`}>
                        {displayBadge}
                    </span>
                )}

                {/* Duration Badge */}
                {duration && (
                    <span className="absolute top-3.5 right-3.5 bg-stone-950/80 backdrop-blur-xs text-stone-100 text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full font-semibold border border-stone-700/60 shadow-xs">
                        ⏱️ {duration}
                    </span>
                )}

                {/* Destinations / Category indicator */}
                {category && (
                    <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-stone-900 text-[10px] font-bold px-2.5 py-0.5 rounded-md border border-stone-200 shadow-2xs truncate max-w-[85%]">
                        {category}
                    </span>
                )}
            </Link>

            {/* Content Body */}
            <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <div className="mb-2">
                    {destinationsCovered && (
                        <span className="text-[11px] font-bold tracking-wider text-amber-800 uppercase block truncate">
                            📍 {destinationsCovered}
                        </span>
                    )}
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 group-hover:text-amber-700 transition-colors mt-0.5 leading-snug">
                        <Link to={`/tours/${slug}`}>
                            {title}
                        </Link>
                    </h3>
                </div>

                {tagline && (
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 font-serif">
                        "{tagline}"
                    </p>
                )}

                {/* Pricing Box */}
                <div className="mb-4 bg-stone-50 rounded-2xl p-3 border border-stone-200/70 text-xs space-y-1">
                    {isComingSoon ? (
                        <div>
                            <span className="text-amber-800 font-bold block text-xs">Custom Enquiry Route</span>
                            <span className="text-[11px] text-stone-500">Upcoming cross-border schedule</span>
                        </div>
                    ) : (
                        <div className="flex items-baseline justify-between gap-2">
                            <div>
                                <span className="text-[11px] text-stone-500 font-medium block">Starting Estimate:</span>
                                <span className="text-base sm:text-lg font-serif font-black text-amber-950">{displayPrice}</span>
                            </div>
                            {priceNote && (
                                <span className="text-[10px] sm:text-[11px] text-stone-500 text-right max-w-[160px] leading-tight">
                                    {priceNote}
                                </span>
                            )}
                        </div>
                    )}

                    {vehicleType && (
                        <div className="pt-1.5 border-t border-stone-200/60 flex items-center justify-between text-[11px]">
                            <span className="text-stone-500">Transit:</span>
                            <span className="font-semibold text-stone-800">{vehicleType}</span>
                        </div>
                    )}
                </div>

                {/* Inclusions summary preview */}
                {inclusions && inclusions.length > 0 && (
                    <div className="text-[11px] text-stone-700 bg-amber-50/40 rounded-xl p-2.5 mb-4 border border-amber-100/70 mt-auto">
                        <span className="font-bold text-amber-900 block mb-0.5">Includes:</span>
                        <p className="line-clamp-2 leading-relaxed text-stone-600">
                            {inclusions.slice(0, 3).join(' • ')}
                        </p>
                    </div>
                )}

                {/* 3 Actions Footer */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 mt-auto">
                    <Link
                        to={`/tours/${slug}`}
                        className="text-xs font-bold text-stone-900 group-hover:text-amber-700 inline-flex items-center gap-1 transition-colors py-1.5"
                    >
                        <span>View Tour</span>
                        <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>

                    <div className="flex items-center gap-1.5">
                        {onQuoteClick ? (
                            <button
                                type="button"
                                onClick={() => onQuoteClick(tour)}
                                className="bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-1.5 rounded-lg border border-amber-200 transition cursor-pointer"
                            >
                                Get Quote
                            </button>
                        ) : null}

                        <Link
                            to={`/plan-your-trip?tour=${slug}`}
                            className="bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition shadow-2xs"
                        >
                            Customize ✨
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
