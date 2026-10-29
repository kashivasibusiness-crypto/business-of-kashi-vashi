import React, { useState } from 'react';
import { FLEET_VEHICLES, FLEET_STANDARDS } from '../data/fleetData';
import { WHATSAPP_URL } from '../../shared/config/brand';
import { trackWhatsAppClick } from '../utils/analytics';

export default function FleetSection() {
    const [selectedId, setSelectedId] = useState(FLEET_VEHICLES[1].id); // Defaults to 7-seater popular

    const activeVehicle = FLEET_VEHICLES.find(v => v.id === selectedId) || FLEET_VEHICLES[1];

    const getVehicleWhatsAppUrl = (vehicle) => {
        const text = encodeURIComponent(`Namaste Kashi-Vashi! I am inquiring about booking a ${vehicle.category} (${vehicle.models}) for our Varanasi trip. Please share availability and rates.`);
        return `https://wa.me/918149783494?text=${text}`;
    };

    return (
        <section id="fleet-section" className="py-14 sm:py-20 bg-gradient-to-b from-stone-50 via-white to-stone-100/70 border-t border-b border-stone-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
                    <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
                        <span>🚗</span>
                        <span>Verified Chauffeur-Driven Transport</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 tracking-tight leading-tight">
                        Our Fleet &amp; Vehicle Services
                    </h2>
                    <p className="text-stone-600 text-xs sm:text-base mt-3 leading-relaxed">
                        From solo pilgrims and couples to joint families and large community yatra groups. All vehicles are 100% clean, fully air-conditioned, commercially licensed, and driven by courteous local chauffeurs.
                    </p>
                </div>

                {/* Fleet Quick Selector Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start md:justify-center">
                    {FLEET_VEHICLES.map((vehicle) => {
                        const isSelected = vehicle.id === selectedId;
                        return (
                            <button
                                key={vehicle.id}
                                type="button"
                                onClick={() => setSelectedId(vehicle.id)}
                                className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-xs shrink-0 relative ${
                                    isSelected
                                        ? 'bg-amber-600 text-white shadow-md scale-102 border border-amber-600'
                                        : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200 hover:border-stone-300'
                                }`}
                            >
                                <span>{vehicle.icon}</span>
                                <span>{vehicle.category.split(' ')[0]}</span>
                                {vehicle.isPopular && (
                                    <span className="bg-amber-400 text-stone-950 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                                        Popular
                                    </span>
                                )}
                                {vehicle.isOffer && (
                                    <span className="bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                                        Offer
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Active Vehicle Spotlight Card */}
                <div className={`bg-gradient-to-br ${activeVehicle.color} bg-white rounded-3xl p-6 sm:p-10 border-2 ${activeVehicle.border} shadow-lg mb-12 transition-all`}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        
                        {/* Left Info: 7 cols */}
                        <div className="lg:col-span-7 space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                                {activeVehicle.isPopular && (
                                    <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
                                        🔥 Popular Choice
                                    </span>
                                )}
                                {activeVehicle.isOffer && (
                                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1">
                                        🏷️ Special Offer
                                    </span>
                                )}
                                <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-amber-200">
                                    {activeVehicle.badge}
                                </span>
                                <span className="bg-white/80 text-stone-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-stone-200">
                                    {activeVehicle.acType}
                                </span>
                            </div>

                            <h3 className="text-xl sm:text-3xl font-serif font-black text-stone-900 leading-tight">
                                {activeVehicle.category}
                            </h3>

                            <p className="text-amber-800 font-medium text-xs sm:text-sm">
                                <strong>Models Provided:</strong> {activeVehicle.models}
                            </p>

                            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                                {activeVehicle.description}
                            </p>

                            {/* Key Specs Pills */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                                <div className="bg-white/90 p-3 rounded-xl border border-stone-200/80 shadow-2xs">
                                    <span className="block text-[10px] text-stone-500 uppercase tracking-wider font-bold">Capacity</span>
                                    <span className="text-xs sm:text-sm font-bold text-stone-900">{activeVehicle.capacity}</span>
                                </div>
                                <div className="bg-white/90 p-3 rounded-xl border border-stone-200/80 shadow-2xs">
                                    <span className="block text-[10px] text-stone-500 uppercase tracking-wider font-bold">Luggage Space</span>
                                    <span className="text-xs sm:text-sm font-bold text-stone-900">{activeVehicle.luggage}</span>
                                </div>
                                <div className="bg-white/90 p-3 rounded-xl border border-stone-200/80 shadow-2xs col-span-2 sm:col-span-1">
                                    <span className="block text-[10px] text-stone-500 uppercase tracking-wider font-bold">Air-Conditioning</span>
                                    <span className="text-xs sm:text-sm font-bold text-emerald-700">100% Chilled AC</span>
                                </div>
                            </div>

                            {/* Features Bullet List */}
                            <div className="pt-2">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 block mb-2">
                                    Included Amenities &amp; Standards:
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                                    {activeVehicle.features.map((feat, idx) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <span className="text-emerald-600 font-bold">✓</span>
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                                <a
                                    href={getVehicleWhatsAppUrl(activeVehicle)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackWhatsAppClick(`fleet_book_${activeVehicle.id}`)}
                                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                                >
                                    <span>Reserve {activeVehicle.category.split(' ')[0]} on WhatsApp</span>
                                    <span>💬</span>
                                </a>
                                <a
                                    href="#trip-planner"
                                    className="w-full sm:w-auto bg-stone-900 hover:bg-stone-850 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-sm transition text-center"
                                >
                                    Include in Custom Trip Plan
                                </a>
                            </div>
                        </div>

                        {/* Right Visual Card: 5 cols */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center">
                            <div className="w-full bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm text-center relative overflow-hidden group">
                                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 border border-stone-200 shadow-inner">
                                    <img
                                        src={activeVehicle.image}
                                        alt={`${activeVehicle.category} - ${activeVehicle.models}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-2.5 left-2.5 bg-stone-950/80 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-stone-700 flex items-center gap-1.5">
                                        <span>{activeVehicle.icon}</span>
                                        <span>{activeVehicle.capacity.split(' ')[0]} Seats</span>
                                    </div>
                                </div>
                                <h4 className="font-serif font-black text-xl text-stone-900 mb-1">
                                    {activeVehicle.models.split(',')[0]}
                                </h4>
                                <span className="text-xs text-amber-700 font-bold block mb-4">
                                    &amp; Equivalent Verified Fleet
                                </span>

                                <div className="bg-stone-50 rounded-xl p-4 text-left border border-stone-200 text-xs text-stone-600 space-y-1.5">
                                    <p><strong>🎯 Best Suited For:</strong> {activeVehicle.idealFor}</p>
                                    <p><strong>🛡️ Safety:</strong> Commercial All-India tourist permit, GPS tracked, vaccinated &amp; verified driver.</p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                                    <span>Airport Pickup &bull; City Darshan &bull; Circuits</span>
                                    <span className="text-emerald-600 font-bold">Available 24x7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* All Fleet Grid (Overview Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {FLEET_VEHICLES.map((vehicle) => (
                        <div
                            key={vehicle.id}
                            className={`bg-white rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between hover:shadow-md ${
                                vehicle.id === selectedId ? 'border-amber-500 ring-2 ring-amber-400/20 shadow-sm' : 'border-stone-200'
                            }`}
                        >
                            <div>
                                {/* Badges if Popular or Offer */}
                                {(vehicle.isPopular || vehicle.isOffer) && (
                                    <div className="flex items-center gap-1.5 mb-2.5">
                                        {vehicle.isPopular && (
                                            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-2xs">
                                                🔥 Popular
                                            </span>
                                        )}
                                        {vehicle.isOffer && (
                                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-2xs">
                                                🏷️ Special Offer
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Vehicle Photo */}
                                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-3.5 border border-stone-200 shadow-2xs group-hover:scale-102 transition-transform">
                                    <img
                                        src={vehicle.image}
                                        alt={`${vehicle.category} - ${vehicle.models}`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <span className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur-2xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                                        {vehicle.capacity.split(' ')[0]} Seats
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{vehicle.icon}</span>
                                        <div>
                                            <h4 className="font-serif font-bold text-sm text-stone-900 leading-tight">{vehicle.category}</h4>
                                            <span className="text-[10px] text-stone-500 font-medium">{vehicle.models}</span>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full shrink-0">
                                        {vehicle.capacity.split(' ')[0]} Seats
                                    </span>
                                </div>

                                <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                                    {vehicle.description}
                                </p>
                            </div>

                            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedId(vehicle.id);
                                        const el = document.getElementById('fleet-section');
                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="text-xs font-bold text-amber-700 hover:text-amber-800 underline decoration-amber-300 cursor-pointer"
                                >
                                    Inspect Details &rarr;
                                </button>
                                <a
                                    href={getVehicleWhatsAppUrl(vehicle)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackWhatsAppClick(`fleet_card_${vehicle.id}`)}
                                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold px-3 py-1.5 rounded-lg transition"
                                >
                                    Inquire Now 💬
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Fleet Note & Standards Banner */}
                <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-md">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-left space-y-1">
                            <span className="text-amber-200 font-bold text-xs uppercase tracking-wider block">
                                ✨ Custom &amp; Additional Vehicles on Demand
                            </span>
                            <h3 className="text-lg sm:text-2xl font-serif font-black text-white">
                                Need a specific luxury car, Fortuner, or extra bus capacity?
                            </h3>
                            <p className="text-amber-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
                                Agar aapko Fortuner, BMW/Audi, luxury wedding cars, ya 50+ seater bus chahiye, hum turant arrange karte hain. Hamari sari gaadiyan RTO-certified aur fully AC hoti hain.
                            </p>
                        </div>
                        <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick('custom_vehicle_inquiry')}
                            className="bg-white hover:bg-stone-100 text-stone-900 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition shrink-0 flex items-center gap-2"
                        >
                            <span>Inquire for Custom Vehicle</span>
                            <span>→</span>
                        </a>
                    </div>
                </div>

                {/* Fleet Standards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {FLEET_STANDARDS.map((std, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs flex items-start gap-3">
                            <span className="text-2xl">{std.icon}</span>
                            <div>
                                <h5 className="font-serif font-bold text-xs text-stone-900">{std.title}</h5>
                                <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">{std.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
