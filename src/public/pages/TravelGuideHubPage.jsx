import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeading from '../components/SectionHeading';
import GuideCard from '../components/GuideCard';
import { TRAVEL_GUIDES } from '../data/travelGuidesData';

export default function TravelGuideHubPage() {
    const itineraries = [
        {
            days: '1-Day Express Darshan',
            target: 'Short Stays & Weekend Pilgrims',
            schedule: [
                '05:30 AM — Dawn Sunrise Boat Ride from Assi to Dashashwamedh',
                '08:30 AM — Kashi Vishwanath Dham Darshan & Annapurna Temple',
                '01:00 PM — Traditional Banarasi Thali & Short Rest',
                '03:30 PM — Afternoon excursion to Sarnath Dhamek Stupa',
                '06:30 PM — Evening Maha Ganga Aarti from Boat or Ghat steps'
            ]
        },
        {
            days: '2-Day Heritage & Spirituality',
            target: 'Recommended for Families & Devotees',
            schedule: [
                'Day 1: Assi Ghat morning, Kashi Vishwanath corridor, Kaal Bhairav, and evening Dashashwamedh Aarti.',
                'Day 2: Sarnath Buddhist monuments, Banarasi silk handloom weaving walk, BHU New Vishwanath Temple, and Sankat Mochan evening darshan.'
            ]
        },
        {
            days: '3-Day Complete Yatra Circuit',
            target: 'Holistic Cultural & Circuit Pilgrimage',
            schedule: [
                'Day 1 & 2: Complete sacred Varanasi shrines, Ghats exploration, and traditional street food trail.',
                'Day 3: Day excursion to Ayodhya Shri Ram Mandir or Prayagraj Triveni Sangam with dedicated AC transport.'
            ]
        }
    ];

    return (
        <>
            <SEO
                title="Varanasi Travel Guide & Practical Tips | Timings, Weather & Transport | Kashi-Vashi"
                description="Comprehensive Varanasi travel advice compiled by locals. Best time to visit, morning vs evening Aarti timings, ghat etiquette, taxi options, and scam warnings."
                pathname="/travel-guide"
            />

            <div className="bg-stone-100/60 border-b border-stone-200/80 py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <Breadcrumb
                        crumbs={[
                            { label: 'Travel Guide' }
                        ]}
                    />
                </div>
            </div>

            <article className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16">
                
                {/* Main Heading & Intro */}
                <div className="max-w-3xl">
                    <SectionHeading
                        as="h1"
                        eyebrow="Local Insider Insights"
                        title="Varanasi Travel Guides & Practical Advice"
                        description="Written by people who navigate the ghats, alleys, and temple corridors daily. Practical answers to help you travel with confidence and peace of mind."
                    />
                </div>

                {/* Switch to Personal Guide Banner */}
                <div className="bg-gradient-to-r from-emerald-900 to-stone-900 text-white p-5 sm:p-6 rounded-2xl border border-emerald-500/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <span className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-xl flex-shrink-0">
                            🧭
                        </span>
                        <div>
                            <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider block">
                                Need an On-Ground Human Escort?
                            </span>
                            <p className="text-xs sm:text-sm text-stone-200 font-medium">
                                Hire a trusted local guide for temples, Ghats walks, and Sarnath.
                            </p>
                        </div>
                    </div>
                    <Link
                        to="/guides/personal-guide"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition shadow-xs whitespace-nowrap"
                    >
                        Book a Personal Guide →
                    </Link>
                </div>

                {/* ESSENTIAL IN-DEPTH TRAVEL ARTICLES */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                                Detailed City Articles
                            </span>
                            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-2">
                                In-Depth Planning Guides
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {TRAVEL_GUIDES.map((guide) => (
                            <GuideCard key={guide.slug} guide={guide} />
                        ))}
                    </div>
                </div>

                {/* HOW TO REACH VARANASI */}
                <div className="space-y-6 pt-4 border-t border-stone-200">
                    <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                            Connectivity &amp; Transit
                        </span>
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                            How to Reach Varanasi
                        </h2>
                        <div className="w-14 h-1 bg-amber-500 rounded-full my-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
                            <span className="text-2xl block">✈️</span>
                            <h3 className="font-serif font-bold text-stone-900 text-sm">
                                By Air: Babatpur Airport (VNS)
                            </h3>
                            <p className="text-xs text-stone-600 leading-relaxed">
                                Lal Bahadur Shastri International Airport is 24 km (approx. 45-60 mins) from central Varanasi. Pre-book an AC airport transfer to avoid unregulated taxi touts outside arrival gates.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
                            <span className="text-2xl block">🚆</span>
                            <h3 className="font-serif font-bold text-stone-900 text-sm">
                                By Train: 3 Main Rail Hubs
                            </h3>
                            <p className="text-xs text-stone-600 leading-relaxed">
                                • <strong>Varanasi Junction / Cantt (BSB):</strong> Heart of the city.<br />
                                • <strong>Banaras Station (BSBS):</strong> Modern, clean terminal 4 km west.<br />
                                • <strong>Pt. Deen Dayal Upadhyaya (DDU):</strong> Major junction 18 km east.
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2">
                            <span className="text-2xl block">🛣️</span>
                            <h3 className="font-serif font-bold text-stone-900 text-sm">
                                By Road &amp; Expressways
                            </h3>
                            <p className="text-xs text-stone-600 leading-relaxed">
                                Seamless four-lane highway connectivity via NH19 and Purvanchal Expressway connecting Prayagraj (2.5 hrs), Ayodhya (4.5 hrs), and Lucknow (5 hrs).
                            </p>
                        </div>
                    </div>
                </div>

                {/* SUGGESTED DAY-WISE ITINERARIES */}
                <div className="space-y-6 pt-4 border-t border-stone-200">
                    <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                            Suggested Schedules
                        </span>
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                            Curated Varanasi Itineraries
                        </h2>
                        <div className="w-14 h-1 bg-amber-500 rounded-full my-2" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {itineraries.map((it, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                                        {it.target}
                                    </span>
                                    <h3 className="text-base font-serif font-bold text-stone-900">
                                        {it.days}
                                    </h3>
                                    <ul className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                                        {it.schedule.map((step, sIdx) => (
                                            <li key={sIdx} className="leading-relaxed">
                                                • {step}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <Link
                                    to="/plan-your-trip"
                                    className="text-xs font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1 pt-2 border-t border-stone-100"
                                >
                                    <span>Customize This Schedule →</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TEMPLE RULES, SECURITY & ETIQUETTE BANNER */}
                <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 space-y-4">
                    <div className="max-w-3xl">
                        <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block mb-1">
                            Important Temple Protocol &amp; Rules
                        </span>
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
                            Essential Varanasi Rules to Remember
                        </h2>
                        <ul className="space-y-2.5 text-xs text-stone-300 leading-relaxed pt-2">
                            <li>• <strong>Electronic &amp; Leather Restrictions at Kashi Vishwanath:</strong> Mobile phones, smartwatches, cameras, cigarettes/lighters, and leather belts/wallets are strictly prohibited beyond security gates. Free/paid official lockers are available at corridor entry gates.</li>
                            <li>• <strong>Photography at Cremation Ghats:</strong> Taking photos or videos at Manikarnika and Harishchandra Ghats is strictly prohibited out of respect for departed souls and grieving families.</li>
                            <li>• <strong>Temple Dress Code:</strong> Modest clothing covering shoulders and knees is recommended. For specific inner sanctum Sparsh Darshan / Rudrabhishek rituals, traditional dhoti-kurta (men) and saree (women) are customary.</li>
                            <li>• <strong>Early Mornings are Magical:</strong> Varanasi's most serene spiritual energy unfolds between 05:15 AM and 07:00 AM on the river. Schedule an early morning boat ride to experience Subah-e-Banaras.</li>
                        </ul>
                    </div>
                </div>

                {/* BOTTOM CTA */}
                <div className="text-center pt-4">
                    <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
                        Have a Specific Question About Your Varanasi Trip?
                    </h3>
                    <p className="text-stone-600 text-xs mb-4">
                        Our local team is happy to answer practical questions about temple queues, elderly assistance, or train timings.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Link
                            to="/contact"
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl transition shadow-sm"
                        >
                            Ask Our Local Team
                        </Link>
                        <Link
                            to="/guides/personal-guide"
                            className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl transition shadow-sm"
                        >
                            Book a Personal Guide
                        </Link>
                    </div>
                </div>

            </article>
        </>
    );
}
