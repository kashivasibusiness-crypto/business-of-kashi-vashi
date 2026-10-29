import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithSkeleton from './ImageWithSkeleton';

export default function ExperienceCard({ experience, onBookClick }) {
    const {
        slug,
        title,
        category,
        subtitle,
        tagline,
        image,
        duration,
        bestTime,
        timings,
        experienceType,
        whatsIncluded,
        pricing,
        shortDesc
    } = experience;

    const displayCategory = category || subtitle || 'Authentic Experience';
    const displayTiming = bestTime || timings || '';
    const inclusionSnippet = whatsIncluded && whatsIncluded.length > 0
        ? whatsIncluded[0]
        : null;

    return (
        <article className="group bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col h-full hover:border-amber-500/40">
            {/* Visual Media Header */}
            <Link
                to={`/experiences/${slug}`}
                className="block relative aspect-[16/10] overflow-hidden bg-stone-900"
                aria-label={`View details for ${title}`}
            >
                <ImageWithSkeleton
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category Pill */}
                <span className="absolute top-3.5 left-3.5 bg-stone-950/80 backdrop-blur-xs text-amber-300 text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-stone-700/60 shadow-xs">
                    {displayCategory}
                </span>

                {/* Duration Badge */}
                {duration && (
                    <span className="absolute top-3.5 right-3.5 bg-stone-950/80 backdrop-blur-xs text-stone-200 text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full font-medium border border-stone-700/60 shadow-xs">
                        ⏱️ {duration}
                    </span>
                )}

                {/* Type Indicator */}
                {experienceType && (
                    <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-stone-900 text-[10px] font-bold px-2.5 py-0.5 rounded-md border border-stone-200 shadow-2xs truncate max-w-[85%]">
                        {experienceType.split('/')[0].trim()}
                    </span>
                )}
            </Link>

            {/* Content Body */}
            <div className="p-5 sm:p-6 flex flex-col flex-grow">
                <div className="mb-2">
                    <span className="text-[11px] font-bold tracking-wider text-amber-800 uppercase block">
                        {tagline || subtitle || 'Kashi Authentic Experience'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 group-hover:text-amber-700 transition-colors mt-0.5 leading-snug">
                        <Link to={`/experiences/${slug}`}>
                            {title}
                        </Link>
                    </h3>
                </div>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {shortDesc}
                </p>

                {/* Metadata & Inclusions Grid */}
                <div className="space-y-2 mb-5 text-[11px] bg-stone-50 rounded-2xl p-3 border border-stone-200/70">
                    {displayTiming && (
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-stone-500 font-medium shrink-0">Best Time:</span>
                            <span className="font-semibold text-stone-800 text-right truncate">
                                {displayTiming}
                            </span>
                        </div>
                    )}
                    {inclusionSnippet && (
                        <div className="flex items-start justify-between gap-2 pt-1.5 border-t border-stone-200/60">
                            <span className="text-emerald-700 font-bold shrink-0">✓ Includes:</span>
                            <span className="text-stone-700 text-right line-clamp-1">
                                {inclusionSnippet}
                            </span>
                        </div>
                    )}
                    {pricing?.display && (
                        <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-stone-200/60">
                            <span className="text-stone-500 font-medium shrink-0">Pricing:</span>
                            <span className="font-bold text-amber-800 text-right">
                                {pricing.display}
                            </span>
                        </div>
                    )}
                </div>

                {/* Dual Action Footer */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 mt-auto">
                    <Link
                        to={`/experiences/${slug}`}
                        className="text-xs font-bold text-stone-900 group-hover:text-amber-700 inline-flex items-center gap-1 transition-colors py-1.5"
                    >
                        <span>Explore Experience</span>
                        <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>

                    {onBookClick ? (
                        <button
                            type="button"
                            onClick={() => onBookClick(experience)}
                            className="bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-200 transition shadow-2xs cursor-pointer"
                        >
                            Book / Plan
                        </button>
                    ) : (
                        <Link
                            to={`/plan-your-trip?experience=${slug}`}
                            className="bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-200 transition shadow-2xs"
                        >
                            Book / Plan ✨
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}
