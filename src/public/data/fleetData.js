/**
 * Kashi-Vashi Fleet & Vehicle Inventory
 * All vehicles are commercial RTO-registered, fully air-conditioned, sanitized, and driven by verified local chauffeurs.
 */

import sedanImg from '../../assets/fleet/sedan.avif';
import innovaCrystaImg from '../../assets/fleet/innova-crysta.avif';
import urbaniaImg from '../../assets/fleet/urbania.avif';
import tempo16Img from '../../assets/fleet/tempo-16.avif';
import tempo20Img from '../../assets/fleet/tempo-20.avif';
import luxuryBusImg from '../../assets/fleet/luxury-bus.avif';

export const FLEET_VEHICLES = [
    {
        id: '4-seater-sedan',
        category: '4-Seater Sedan',
        models: 'Swift Dzire, Toyota Etios, Hyundai Aura',
        capacity: '4 Passengers + 1 Chauffeur',
        luggage: '2-3 Medium Trolley Bags',
        acType: 'Dual Zone Climate Control / AC',
        badge: 'Ideal for Couples & Small Families',
        image: sedanImg,
        isPopular: false,
        isOffer: false,
        color: 'from-amber-500/10 to-orange-500/15',
        border: 'border-amber-200',
        icon: '🚗',
        description: 'Smooth, fuel-efficient, and easy to maneuver through Varanasi city roads. Perfect for local temple visits, airport pick-up and drop, and day excursions to Sarnath.',
        features: [
            'Clean sanitized AC cabin',
            'Experienced local polite chauffeur',
            'Ample boot space for luggage',
            '24x7 GPS route tracking',
            'Bottled water on board'
        ],
        idealFor: 'Solo pilgrims, couples, airport transfers, 1-2 day city darshan'
    },
    {
        id: '7-seater-muv',
        category: '7-Seater Premium MUV / SUV',
        models: 'Kia Carens, Toyota Innova Crysta, Maruti Ertiga',
        capacity: '6 - 7 Passengers + 1 Chauffeur',
        luggage: '4-5 Trolley Bags + Handbags',
        acType: 'Roof-Mounted Rear AC Vents',
        badge: 'Most Popular for Families & Elders',
        image: innovaCrystaImg,
        isPopular: true,
        isOffer: true,
        offerText: 'Special Pilgrimage Circuit Offer',
        color: 'from-blue-500/10 to-indigo-500/15',
        border: 'border-blue-300',
        icon: '🚙',
        description: 'Spacious legroom with comfortable captain seats. Ideal for elderly pilgrims and family groups requiring superior suspension on long circuit trips to Ayodhya and Bodhgaya.',
        features: [
            'Plush captain seats with armrests',
            'Independent rear blower AC controls',
            'Smooth highway riding comfort',
            'Elder-friendly low-step boarding',
            'High safety rating & dual airbags'
        ],
        idealFor: 'Families with elderly parents, outstation circuits (Ayodhya, Prayagraj, Gaya)'
    },
    {
        id: '10-seater-maharaja',
        category: '10-Seater Luxury Maharaja / Urbania',
        models: 'Force Urbania & Maharaja Tempo Traveller',
        capacity: '10 Passengers + 1 Chauffeur',
        luggage: 'Dedicated Large Rear Trunk',
        acType: 'High-Capacity Ducted Central AC',
        badge: 'VIP Executive Comfort',
        image: urbaniaImg,
        isPopular: false,
        isOffer: false,
        color: 'from-purple-500/10 to-amber-500/15',
        border: 'border-purple-200',
        icon: '🚐',
        description: 'Next-generation luxury mobility featuring European styling, standing height cabin, individual aircraft-style AC vents, ambient lighting, and ultra-plush reclining leatherette seats.',
        features: [
            'Full standing height (no stooping)',
            'Ultra-soft Maharaja reclining seats',
            'Individual USB phone charging ports',
            'Panoramic tinted touring windows',
            'Monocoque body for silent cabin ride'
        ],
        idealFor: 'VIP delegations, extended family groups, premium pilgrim tours'
    },
    {
        id: '12-16-seater-tempo',
        category: '12 & 16-Seater Deluxe Tempo Traveller',
        models: 'Force Traveller Deluxe (12 & 16 Seater)',
        capacity: '12 to 16 Passengers + Chauffeur',
        luggage: 'Spacious Rear Luggage Boot + Roof Carrier',
        acType: 'Central Ducted Powerful AC',
        badge: 'Best Value for Medium Groups',
        image: tempo16Img,
        isPopular: false,
        isOffer: false,
        color: 'from-emerald-500/10 to-teal-500/15',
        border: 'border-emerald-200',
        icon: '🚐',
        description: 'The backbone of Indian pilgrimage tourism. Spacious 2x1 seating configuration with wide central aisle, allowing comfortable group travel without feeling cramped.',
        features: [
            '2x1 spacious seat layout',
            'High-back pushback comfortable seats',
            'Sturdy roof carrier for bulk luggage',
            'High ground clearance for all roads',
            'First aid kit & fire extinguisher on board'
        ],
        idealFor: 'Bhajan mandalis, joint families, pilgrim groups visiting 84 Ghats & Sarnath'
    },
    {
        id: '20-seater-executive',
        category: '20-Seater Executive Tourer',
        models: 'Force Extended Tempo Traveller 20-Seater',
        capacity: '20 Passengers + Chauffeur + Assistant',
        luggage: 'Heavy-Duty Integrated Cargo Compartment',
        acType: 'Dual Compressor Commercial AC',
        badge: 'Large Group Pilgrimage Solution',
        image: tempo20Img,
        isPopular: true,
        isOffer: true,
        offerText: 'Special Group Yatra Offer',
        color: 'from-sky-500/10 to-cyan-500/15',
        border: 'border-sky-300',
        icon: '🚍',
        description: 'Custom-configured extended chassis designed for larger devotional groups and wedding/ceremony guests. Equipped with a PA microphone system for tour guides and bhajan playback.',
        features: [
            'Integrated PA system & mic for guides',
            'Ergonomic high-back recliner seats',
            'Heavy-duty cooling for UP/Bihar summers',
            'Emergency exit & comprehensive safety kits',
            'Dedicated co-driver/assistant support'
        ],
        idealFor: 'Satsang groups, community yatras, multi-city pilgrimage circuits'
    },
    {
        id: '25-30-40-seater-bus',
        category: '25, 30 & 40-Seater Tourist Coaches',
        models: 'Deluxe & Luxury AC Tourist Buses / Coaches',
        capacity: '25, 30, 40 Passengers + 2 Staff',
        luggage: 'Massive Underfloor Luggage Bunkers',
        acType: 'Roof-Mounted Industrial Bus AC',
        badge: 'Mass Yatra & Group Tour Specialists',
        image: luxuryBusImg,
        isPopular: false,
        isOffer: false,
        color: 'from-rose-500/10 to-amber-500/15',
        border: 'border-rose-200',
        icon: '🚌',
        description: 'Full-size tourist coaches built for long-distance comfort across Uttar Pradesh, Bihar, and Madhya Pradesh circuits. Air-suspension ride ensures senior citizens stay fatigue-free.',
        features: [
            'Pneumatic air-suspension smooth ride',
            '2x2 luxury pushback reclining seats',
            'Full under-chassis luggage storage bays',
            'Curtains & reading lamps for each row',
            'All-India Tourist Permit (AITP) ready'
        ],
        idealFor: 'Large pilgrimage tours, temple trusts, community yatras, wedding party travel'
    }
];

export const FLEET_STANDARDS = [
    { title: '100% Commercial RTO Permits', desc: 'No private yellow-plate risks; all vehicles carry valid tourist permits and comprehensive insurance.', icon: '📜' },
    { title: 'Experienced Local Chauffeurs', desc: 'Polite, non-smoking, vetted drivers familiar with narrow Varanasi lanes, temple parking, and ghat timings.', icon: '👨‍✈️' },
    { title: 'Spotless Sanitation & AC', desc: 'Deep-cleaned before every assignment with crisp functioning air conditioning guaranteed.', icon: '❄️' },
    { title: 'Custom Vehicles on Demand', desc: 'Need a Fortuner, BMW, Mercedes, or specific bus configuration? Available upon special request.', icon: '✨' }
];
