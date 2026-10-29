import tour1dayImg from '../../assets/tours/tour-1day.avif';
import tour2dayImg from '../../assets/tours/tour-2day.avif';
import tour3dayImg from '../../assets/tours/tour-3day.avif';
import ayodhyaPkg from '../../assets/destinations/ayodhya.avif';
import bodhgayaPkg from '../../assets/destinations/bodhgaya.avif';
import chunarPkg from '../../assets/destinations/mirzapur.avif';
import circuitPkg from '../../assets/services/srv-circuit.avif';
import nepalPkg from '../../assets/tour packege photo/NepalTour.png';

export const TOUR_CATEGORIES = [
    'All Tours',
    '1-Day Sightseeing',
    '2–3 Day Varanasi & Sarnath Tours',
    'Pilgrimage & Buddhist Circuits',
    'Multi-City Spiritual Tours',
    'Future Routes'
];

export const TOURS = [
    {
        slug: '1-day-varanasi',
        title: '1-Day Complete Kashi Sightseeing Tour',
        category: '1-Day Sightseeing',
        tagline: 'The complete spiritual essence of Varanasi curated in a single dawn-to-dusk journey.',
        shortDesc: 'A time-optimized single-day spiritual journey covering sunrise Ganges boat ride, Kashi Vishwanath darshan, Sarnath heritage, and evening Ganga Aarti.',
        duration: '1 Day (Dawn to Night)',
        startingPrice: '₹3,499',
        price: '₹3,499',
        priceNote: 'Starting price per person (group size 4+)',
        pricingUnit: 'per person (group size 4+)',
        pricingModel: 'indicative',
        vehicleType: 'Private AC Dedicated Sedan / SUV',
        image: tour1dayImg,
        alt: '1 Day complete Kashi Varanasi tour itinerary',
        isBestSeller: true,
        badge: 'Best Seller',
        status: 'active',
        destinationsCovered: 'Varanasi Ghats, Kashi Vishwanath Corridor, Sarnath, Dashashwamedh',
        overview: 'Designed specifically for pilgrims with limited time or weekend transit. This dawn-to-night itinerary ensures you experience every spiritual landmark of Varanasi comfortably with dedicated private transport, local temple coordinator, and boat ride.',
        itinerary: [
            { time: '05:30 AM', title: 'Sunrise Boat Ride at Assi Ghat', desc: 'Board your private wooden boat to witness Subah-e-Banaras and sunrise over the Ganges.' },
            { time: '08:00 AM', title: 'Traditional Banarasi Breakfast', desc: 'Savor piping hot Bedmi Kachori, spicy aloo sabzi, and fresh jalebi.' },
            { time: '09:30 AM', title: 'Shri Kashi Vishwanath Temple Corridor', desc: 'Darshan at the Jyotirlinga sanctum, Annapurna Mandir, and Vishalakshi Temple.' },
            { time: '01:30 PM', title: 'Pure Veg Lunch & Rest', desc: 'Enjoy authentic thali lunch at a verified clean restaurant.' },
            { time: '03:00 PM', title: 'Sarnath Buddhist Heritage Tour', desc: 'Explore Dhamek Stupa, Ashoka Pillar ruins, and Sarnath Archaeological Museum (except Fridays).' },
            { time: '06:00 PM', title: 'Maha Ganga Aarti from Reserved Boat', desc: 'Conclude your day viewing the magnificent Ganga Aarti at Dashashwamedh Ghat.' }
        ],
        inclusions: [
            'Private Sanitized AC Sedan / SUV for the full day',
            'Morning private boat ride on the Ganges (Assi to Manikarnika)',
            'Dedicated local tour coordinator and temple queue assistance',
            'Evening boat viewing coordinates for Maha Ganga Aarti',
            'Bottled mineral water & hotel/airport pickup and drop-off'
        ],
        exclusions: [
            'Temple VIP Sugam Darshan passes (optional add-on at official cost)',
            'Sarnath monument entry tickets (₹25 Indian nationals)',
            'Lunch and personal shopping expenses'
        ],
        practicalTips: [
            'Mobile phones, electronic watches, and leather items are prohibited inside the Kashi Vishwanath inner sanctum; our coordinator manages safe lockers.',
            'Dress respectfully in comfortable cotton clothing suitable for entering active temples.',
            'If arriving by morning flight or train, our chauffeur receives you directly at the terminal with a paging board.'
        ],
        idealFor: 'Transit travelers, weekend visitors, business travelers with 1 day in Kashi',
        faqs: [
            { q: 'Can we get picked up directly from the airport for this tour?', a: 'Yes, our chauffeur can receive you at Lal Bahadur Shastri Airport (VNS) or Varanasi Cantt Station and start your sightseeing immediately.' },
            { q: 'Is this tour too hectic for elderly family members?', a: 'We pace the day with comfortable air-conditioned transit between stops, minimal walking through congested streets, and ample sitting breaks.' },
            { q: 'What happens if our flight arrives late?', a: 'Because this is a 100% private tour, your driver and coordinator adapt the schedule to your actual arrival time without missing key spiritual highlights.' }
        ],
        relatedSlugs: ['2-day-varanasi-sarnath', 'varanasi-tour', 'mirzapur-chunar-tour']
    },
    {
        slug: 'varanasi-tour',
        title: 'Varanasi Spiritual Immersion (3 Days / 2 Nights)',
        category: '2–3 Day Varanasi & Sarnath Tours',
        tagline: 'An unhurried 3-day spiritual pilgrimage tailored for families, senior citizens, and devotees.',
        shortDesc: 'Our signature peaceful journey covering Subah-e-Banaras, Kashi Vishwanath corridor, Kaal Bhairav, Sarnath, and private evening boat cruises.',
        duration: '2 Nights / 3 Days',
        startingPrice: '₹8,999',
        price: '₹8,999',
        priceNote: 'Starting per person including verified 3-star hotel stay',
        pricingUnit: 'per person (with 3-star stay, twin sharing)',
        pricingModel: 'indicative',
        vehicleType: 'Dedicated AC Sedan / Innova Crysta throughout',
        image: tour3dayImg,
        alt: 'Varanasi spiritual tour kashi vishwanath darshan',
        isBestSeller: true,
        badge: 'Best Seller',
        status: 'active',
        destinationsCovered: 'Varanasi Ghats, Kashi Vishwanath Corridor, Sarnath, Ramnagar, BHU',
        overview: 'The definitive Varanasi pilgrimage. Structured meticulously for families and senior citizens, ensuring relaxed darshan at Kashi Vishwanath, private boat cruises, handpicked vegetarian hotels near the ghats, and cultural immersion without haste.',
        itinerary: [
            { day: 'Day 1', title: 'Arrival, Evening Boat Cruise & Ganga Aarti', desc: 'Airport/Station pickup in private AC cab. Hotel check-in. Evening private boat cruise to Dashashwamedh Ghat for the majestic Maha Ganga Aarti.' },
            { day: 'Day 2', title: 'Dawn Ghats, Kashi Vishwanath & Sarnath', desc: 'Sunrise boat ride from Assi to Manikarnika. Morning darshan at Kashi Vishwanath Jyotirlinga, Annapurna, and Kaal Bhairav. Afternoon excursion to ancient Sarnath.' },
            { day: 'Day 3', title: 'Ancient Temples, Handloom Weavers & Departure', desc: 'Visits to Sankat Mochan, Durga Kund, and BHU New Vishwanath Temple. Authentic Banarasi handloom weaving exploration. Airport transfer.' }
        ],
        inclusions: [
            '2 Nights in vetted 3-Star hotel close to the river ghats (or heritage haveli upgrade)',
            'Daily complimentary hot buffet breakfast',
            'Dedicated private AC Sedan / SUV with professional local driver throughout the trip',
            'Private wooden boat ride for Sunrise & Evening Ganga Aarti',
            'Experienced local coordinator for Sarnath & Temple corridor darshan',
            'All parking, tolls, fuel, and driver allowances'
        ],
        exclusions: [
            'Airfare or railway tickets',
            'Lunches and dinners',
            'Personal temple offerings or pooja dakshina'
        ],
        practicalTips: [
            'Early morning Sparsh Darshan at Kashi Vishwanath allows touching the sacred Shiva Linga before queues lengthen.',
            'We select hotels with lift access and ground-floor availability for elderly family comfort.',
            'Winter morning cruises (November to February) are chilly; bring a light woolen sweater or shawl.'
        ],
        idealFor: 'Families, senior citizens, couples seeking relaxed spiritual immersion',
        faqs: [
            { q: 'Are the hotel rooms wheelchair accessible?', a: 'Yes, we select properties with elevator access and ground-floor rooms upon request. Please inform us during enquiry.' },
            { q: 'Is it possible to customize the itinerary?', a: 'Yes! All tour plans can be adapted to your flight dates, special pooja requirements, or extended stays.' },
            { q: 'Can we add a private pandit for Rudrabhishek pooja?', a: 'Yes, our local team coordinates verified Vedic priests for sacred pooja rituals at certified spots.' }
        ],
        relatedSlugs: ['1-day-varanasi', '2-day-varanasi-sarnath', 'kashi-prayagraj-ayodhya-tour']
    },
    {
        slug: '2-day-varanasi-sarnath',
        title: 'Varanasi & Sarnath Heritage Tour (2 Days / 1 Night)',
        category: '2–3 Day Varanasi & Sarnath Tours',
        tagline: 'A seamless 48-hour circuit combining Kashi’s sacred riverfront with the meditative calm of Sarnath.',
        shortDesc: 'A balanced 2-day circuit combining Varanasi temple darshans and river rituals with the peaceful Buddhist stupas of Sarnath.',
        duration: '1 Night / 2 Days',
        startingPrice: '₹5,999',
        price: '₹5,999',
        priceNote: 'Starting per person with hotel accommodation',
        pricingUnit: 'per person (twin sharing with hotel)',
        pricingModel: 'indicative',
        vehicleType: 'Private AC Dedicated Cab',
        image: tour2dayImg,
        alt: 'Varanasi Sarnath 2 day tour package',
        isBestSeller: false,
        badge: 'Recommended Weekend',
        status: 'active',
        destinationsCovered: 'Varanasi Ghats, Kashi Vishwanath, Sarnath Stupas',
        overview: 'Perfect for travelers with 48 hours in Varanasi. Experience both the Hindu spiritual devotion of the ghats and the peaceful heritage of Sarnath with smooth private logistics and dedicated coordination.',
        itinerary: [
            { day: 'Day 1', title: 'Arrival, Kashi Vishwanath & Ganga Aarti', desc: 'Arrival pickup, check-in, Kashi Vishwanath darshan, and private boat viewing of evening Ganga Aarti at Dashashwamedh.' },
            { day: 'Day 2', title: 'Subah-e-Banaras & Sarnath Exploration', desc: 'Sunrise boat cruise at Assi Ghat. Check-out and scenic drive to Sarnath for Dhamek Stupa and museum. Afternoon airport drop.' }
        ],
        inclusions: [
            '1 Night clean 3-star hotel stay with hot breakfast',
            'Private AC transport for both days (pickup to drop-off)',
            'Private sunrise wooden boat ride on the Ganges',
            'Evening boat viewing coordination for Ganga Aarti',
            'Local temple queue coordinator assistance'
        ],
        exclusions: ['Monument camera fees and ASI tickets', 'Personal meals and shopping'],
        practicalTips: [
            'Keep your departure flight after 4:00 PM on Day 2 to comfortably explore Sarnath without rushing.',
            'Sarnath Archaeological Museum is closed on Fridays; archaeological park grounds remain open.'
        ],
        idealFor: 'Short weekend getaways, couples, pilgrims in transit',
        faqs: [
            { q: 'Can this tour be arranged on weekdays?', a: 'Yes, available every day of the week. Please note Sarnath museum is closed on Fridays.' },
            { q: 'Can the hotel stay be skipped if we arrange our own accommodation?', a: 'Yes! We can provide a Cab + Boat + Guide only package at a lower vehicle-only quote.' }
        ],
        relatedSlugs: ['1-day-varanasi', 'varanasi-tour', 'ayodhya-tour']
    },
    {
        slug: 'ayodhya-tour',
        title: 'Ayodhya Shri Ram Mandir Darshan Tour',
        category: 'Pilgrimage & Buddhist Circuits',
        tagline: 'A sacred road pilgrimage from Varanasi to Lord Rama’s newly consecrated Janmabhoomi in Ayodhya Dham.',
        shortDesc: 'A holy day or overnight pilgrimage to Shri Ram Janmabhoomi, Hanuman Garhi, Kanak Bhawan, and the evening Sarayu River Aarti.',
        duration: '1 Night / 2 Days',
        startingPrice: '₹6,999',
        price: '₹6,999',
        priceNote: 'Starting per person from Varanasi roundtrip',
        pricingUnit: 'per person (roundtrip with Ayodhya stay)',
        pricingModel: 'indicative',
        vehicleType: 'Private AC Sedan / Ertiga / Innova',
        image: ayodhyaPkg,
        alt: 'Ayodhya Ram Mandir package tour from Varanasi',
        isBestSeller: true,
        badge: 'Popular Pilgrimage',
        status: 'active',
        destinationsCovered: 'Varanasi to Ayodhya Ji (via Purvanchal Expressway)',
        overview: 'A comfortable, air-conditioned road journey from Varanasi to Lord Rama\'s sacred birthplace in Ayodhya. Covers the newly consecrated Shri Ram Janmabhoomi Mandir, Hanuman Garhi fort temple, Kanak Bhawan, and twilight Sarayu Sandhya Aarti.',
        itinerary: [
            { day: 'Day 1', title: 'Varanasi to Ayodhya, Hanuman Garhi & Sarayu Aarti', desc: 'Morning drive to Ayodhya (approx 4 hrs). Hotel check-in. Afternoon darshan at Hanuman Garhi and Kanak Bhawan. Evening Sarayu River Aarti at Naya Ghat.' },
            { day: 'Day 2', title: 'Shri Ram Janmabhoomi Darshan & Return', desc: 'Morning darshan at the grand Shri Ram Janmabhoomi Mandir. Visit to Dashrath Mahal and Ram ki Paidi. Return drive to Varanasi.' }
        ],
        inclusions: [
            'Round-trip private AC transport from Varanasi to Ayodhya',
            '1 Night hotel stay near Ram Path in Ayodhya with breakfast',
            'Darshan guidance and local coordinator assistance',
            'All highway tolls, parking, and driver allowances'
        ],
        exclusions: ['VIP darshan passes (managed directly by Trust)', 'Lunch and dinner'],
        practicalTips: [
            'Electronic items, smartwatches, and leather belts are prohibited inside Shri Ram Janmabhoomi complex; use Trust locker facilities.',
            'Climbing the 76 steps of Hanuman Garhi can be steep; elderly guests can take their time with sitting rests.',
            'Highway driving takes roughly 3.5 to 4 hours via National Highway; comfort stops are provided on the expressway.'
        ],
        idealFor: 'Devotees wishing to combine Varanasi and Ayodhya in one pilgrimage',
        faqs: [
            { q: 'How long is the drive from Varanasi to Ayodhya?', a: 'The journey takes approximately 3.5 to 4 hours via National Highway NH330 / Purvanchal connection.' },
            { q: 'Is a same-day return to Varanasi possible?', a: 'Yes! We also operate an early morning same-day return (depart 5:30 AM, return 9:30 PM) for guests with limited time.' }
        ],
        relatedSlugs: ['kashi-prayagraj-ayodhya-tour', 'varanasi-tour', 'bodh-gaya-tour']
    },
    {
        slug: 'kashi-prayagraj-ayodhya-tour',
        title: 'Kashi, Prayagraj & Ayodhya Sacred Triveni Circuit',
        category: 'Multi-City Spiritual Tours',
        tagline: 'North India’s supreme 3-city pilgrimage uniting holy Kashi Vishwanath, Triveni Sangam, and Shri Ram Janmabhoomi.',
        shortDesc: 'A masterfully planned 3-day spiritual circuit covering the holy snan at Prayagraj Triveni Sangam, darshan at Ayodhya Ram Mandir, and sacred Kashi Vishwanath Jyotirlinga.',
        duration: '2 Nights / 3 Days',
        startingPrice: '₹14,999',
        price: '₹14,999',
        priceNote: 'Indicative per dedicated vehicle (AC Sedan, up to 4 guests, excl. hotels)',
        pricingUnit: 'per vehicle (dedicated cab, up to 4 passengers)',
        pricingModel: 'indicative',
        vehicleType: 'Dedicated AC Sedan / Innova Crysta for 3 Days',
        image: circuitPkg,
        alt: 'Kashi Prayagraj Ayodhya 3 day pilgrimage tour circuit',
        isBestSeller: true,
        badge: 'Premier Multi-City Circuit',
        status: 'active',
        destinationsCovered: 'Varanasi, Prayagraj (Sangam), Ayodhya Dham',
        overview: 'This is the most sacred and sought-after pilgrimage triumvirate in Northern India. Seamlessly connecting Lord Shiva’s eternal city (Kashi), the supreme holy confluence of Ganga, Yamuna & Saraswati (Prayag), and the revered birthplace of Maryada Purushottam Shri Ram (Ayodhya). With dedicated air-conditioned private transport and local coordinator support in each holy town, your family travels without logistical worries.',
        itinerary: [
            { day: 'Day 1', title: 'Varanasi to Prayagraj Sangam & Drive to Ayodhya', desc: 'Depart Varanasi at 6:00 AM (125 km / 2.5 hrs). Sacred holy bath and boat ride at Triveni Sangam. Blessings at Lete Hue Hanuman Ji and Alopi Devi Shaktipeeth. Afternoon highway drive to Ayodhya (165 km / 3.5 hrs). Hotel check-in and evening Sarayu River Aarti.' },
            { day: 'Day 2', title: 'Ayodhya Shri Ram Mandir Darshan & Return to Kashi', desc: 'Early morning darshan at Hanuman Garhi and the grand Shri Ram Janmabhoomi Mandir. Visit Kanak Bhawan and Dashrath Mahal. Scenic drive back to Varanasi (215 km / 4.5 hrs). Check-in and evening boat viewing of Maha Ganga Aarti at Dashashwamedh.' },
            { day: 'Day 3', title: 'Kashi Dawn Boat Cruise, Temple Darshan & Departure', desc: 'Subah-e-Banaras sunrise boat cruise from Assi Ghat to Manikarnika. Darshan at Shri Kashi Vishwanath Jyotirlinga, Annapurna Mandir, and Kaal Bhairav. Afternoon drop at Varanasi Airport (VNS) or Railway Station.' }
        ],
        inclusions: [
            'Dedicated private air-conditioned vehicle for 3 complete days (approx 750 km coverage)',
            'All highway tolls, state road taxes, parking fees, and driver night allowances',
            'Triveni Sangam boat ride facilitation in Prayagraj',
            'Private wooden boat for evening Ganga Aarti and dawn sunrise cruise in Varanasi',
            'Local coordination assistance at all three pilgrimage hubs',
            'Bottled mineral water throughout highway journeys'
        ],
        exclusions: [
            'Hotel stays in Ayodhya and Varanasi (available as verified hotel package upgrade)',
            'VIP fast-track temple darshan passes',
            'Pooja dakshina, special snan rituals, and meals'
        ],
        practicalTips: [
            'Pack a spare set of traditional dry clothes in a small day bag for the sacred bath at Triveni Sangam.',
            'Highway driving total is approx 750 km across 3 days; we pace stops every 2 hours for tea and washroom breaks.',
            'Carry original Aadhaar cards or government photo IDs for temple corridor security checks.'
        ],
        idealFor: 'Families and devotees wanting to complete the complete holy UP spiritual triangle with comfort and dignity',
        faqs: [
            { q: 'Can hotel accommodations be added to this package?', a: 'Yes! We offer flexible packages: either vehicle-only (for guests booking their own hotels) or complete packages with verified 3-star/heritage stays in Ayodhya and Varanasi.' },
            { q: 'Is the boat ride at Triveni Sangam included?', a: 'Yes, boat facilitation to the exact confluence point (Sangam) for the holy dip is included in the package coordination.' },
            { q: 'Can we start this tour from Prayagraj or Ayodhya instead of Varanasi?', a: 'Yes! We customize the circuit starting point depending on whether you land at Ayodhya (AYJ), Varanasi (VNS), or Prayagraj (IXD) airport.' }
        ],
        relatedSlugs: ['ayodhya-tour', 'varanasi-tour', '1-day-varanasi']
    },
    {
        slug: 'bodh-gaya-tour',
        title: 'Bodh Gaya Buddhist Circuit Pilgrimage',
        category: 'Pilgrimage & Buddhist Circuits',
        tagline: 'Walk the sacred grounds where Prince Siddhartha attained supreme enlightenment under the Bodhi Tree.',
        shortDesc: 'Trace the footprints of Lord Buddha to the UNESCO World Heritage Mahabodhi Temple, the sacred Bodhi Tree, and international monasteries.',
        duration: '1 Night / 2 Days',
        startingPrice: '₹7,999',
        price: '₹7,999',
        priceNote: 'Starting per person from Varanasi roundtrip',
        pricingUnit: 'per person (with Bodh Gaya stay)',
        pricingModel: 'indicative',
        vehicleType: 'Private AC Inter-State Cab',
        image: bodhgayaPkg,
        alt: 'Bodh Gaya Mahabodhi temple tour from Varanasi',
        isBestSeller: false,
        badge: 'Buddhist Heritage',
        status: 'active',
        destinationsCovered: 'Varanasi to Bodh Gaya & Gaya (Bihar)',
        overview: 'An enlightening 2-day pilgrimage from Varanasi to Bodh Gaya, where Prince Siddhartha attained supreme enlightenment. Visit the Mahabodhi Temple, the ancient Bodhi Tree, the 80-foot Great Buddha Statue, and unique Thai, Bhutanese, and Japanese monasteries.',
        itinerary: [
            { day: 'Day 1', title: 'Varanasi to Bodh Gaya & Monasteries', desc: 'Morning drive from Varanasi to Bodh Gaya (approx 5.5 hrs). Check-in and afternoon visits to international Buddhist monasteries.' },
            { day: 'Day 2', title: 'Mahabodhi Temple, Bodhi Tree & Return', desc: 'Peaceful morning meditation at Mahabodhi Temple and the sacred Bodhi Tree. Visit the Great Buddha statue before returning to Varanasi.' }
        ],
        inclusions: [
            'Round-trip private AC cab from Varanasi',
            '1 Night 3-star hotel stay in Bodh Gaya with breakfast',
            'Sightseeing coordinates and parking clearances',
            'Interstate road tax, toll fees, and driver allowances'
        ],
        exclusions: ['Camera/video permits at Mahabodhi Temple', 'Personal expenses'],
        practicalTips: [
            'Mobile phones are strictly barred inside the Mahabodhi Temple complex; deposit them at the secure entry counter.',
            'Highway transit between Varanasi and Bodh Gaya is approx 250 km (5–5.5 hrs); depart early by 6:00 AM.'
        ],
        idealFor: 'Buddhist pilgrims, meditation practitioners, history researchers',
        faqs: [
            { q: 'Can we perform Pind Daan at Gaya during this trip?', a: 'Yes, we can arrange an early morning stop at Vishnupad Temple in Gaya for Pind Daan rituals before heading to Bodh Gaya.' },
            { q: 'Is the highway drive safe?', a: 'Yes, the route runs along the well-maintained Grand Trunk Road (NH19) with frequent clean food plazas.' }
        ],
        relatedSlugs: ['sarnath-buddhist-heritage', 'varanasi-tour', '1-day-varanasi']
    },
    {
        slug: 'mirzapur-chunar-tour',
        title: 'Chunar Fort & Vindhyachal Devi Heritage Tour',
        category: '1-Day Sightseeing',
        tagline: 'Explore medieval stone battlements on the Ganges and seek blessings at sacred Maa Vindhyavasini Shaktipeeth.',
        shortDesc: 'Discover the ancient riverside ramparts of Chunar Fort on the Ganges, seek blessings at Vindhyachal Shaktipeeth, and visit scenic waterfalls.',
        duration: '1 Day Excursion',
        startingPrice: '₹4,499',
        price: '₹4,499',
        priceNote: 'Starting price per vehicle (up to 4 persons)',
        pricingUnit: 'per vehicle (full day excursion)',
        pricingModel: 'indicative',
        vehicleType: 'Private AC Dedicated Vehicle',
        image: chunarPkg,
        alt: 'Chunar Fort Vindhyachal Temple day trip from Varanasi',
        isBestSeller: false,
        badge: 'Scenic Excursion',
        status: 'active',
        destinationsCovered: 'Chunar Fort & Vindhyachal Dham (Mirzapur)',
        overview: 'A captivating day excursion just 45 km from Varanasi. Explore the historic Chunar Fort overlooking the Ganges with its centuries of Mughal and British history, followed by darshan at Maa Vindhyavasini Devi Temple (one of the 51 sacred Shaktipeeths).',
        itinerary: [
            { time: '08:00 AM', title: 'Departure from Varanasi', desc: 'Pick up from your hotel in private AC vehicle.' },
            { time: '09:30 AM', title: 'Chunar Fort Heritage Exploration', desc: 'Guided walk through the ancient stone ramparts, Sonwa Mandap, and panoramic Ganges view tower.' },
            { time: '01:00 PM', title: 'Traditional Lunch at Mirzapur', desc: 'Relaxing lunch break with regional flavors.' },
            { time: '02:30 PM', title: 'Vindhyachal Dham Temple Darshan', desc: 'Prayers at Maa Vindhyavasini Temple, Kali Khoh, and Ashtabhuja Temple.' },
            { time: '06:30 PM', title: 'Return to Varanasi', desc: 'Comfortable evening return drive to your Varanasi hotel.' }
        ],
        inclusions: [
            'Full day private AC car with fuel, tolls, and driver allowance',
            'Hotel pickup and drop-off in Varanasi',
            'Parking and interstate entry clearances'
        ],
        exclusions: ['Monument entry fees', 'Personal meals and pooja items'],
        practicalTips: [
            'Wear comfortable footwear suited for climbing the stone ramparts of Chunar Fort.',
            'Combine with a seasonal stop at Wyndham Falls or Sirsi Dam during or right after monsoon.'
        ],
        idealFor: 'Heritage buffs, families, travelers seeking offbeat day trips from Kashi',
        faqs: [
            { q: 'Is walking inside Chunar Fort easy for senior citizens?', a: 'Most paths are wide and gentle, though some viewing towers have steps.' },
            { q: 'Can this excursion be completed before an evening train?', a: 'Yes, we typically return to Varanasi by 6:00 PM, well in time for evening train departures.' }
        ],
        relatedSlugs: ['1-day-varanasi', 'varanasi-tour', 'kashi-prayagraj-ayodhya-tour']
    },
    {
        slug: 'nepal-tour',
        title: 'Varanasi to Nepal Cross-Border Circuit',
        category: 'Future Routes',
        tagline: 'An upcoming Himalayan pilgrimage linking sacred Kashi with Lumbini, Pokhara, and Pashupatinath.',
        shortDesc: 'A seamless international road circuit from Varanasi to Lord Buddha\'s birthplace in Lumbini, Pokhara lakes, and Kathmandu temples.',
        duration: '4 Nights / 5 Days',
        startingPrice: '₹18,999',
        price: '₹18,999',
        priceNote: 'Indicative per person with hotel stays (Custom Enquiry Only)',
        pricingUnit: 'per person (custom enquiry only)',
        pricingModel: 'enquiry_only',
        vehicleType: 'Cross-Border Tourist Vehicle',
        image: nepalPkg,
        alt: 'Varanasi to Nepal Lumbini Pokhara Kathmandu tour',
        isBestSeller: false,
        badge: 'Future Expansion',
        status: 'coming_soon',
        isFutureRoute: true,
        destinationsCovered: 'Lumbini, Pokhara, Kathmandu (Nepal)',
        overview: 'An extensive spiritual circuit connecting holy Kashi with the Himalayan realm of Nepal. Experience Maya Devi Temple in Lumbini, serene Phewa Lake in Pokhara, and the sacred Pashupatinath Temple in Kathmandu with cross-border transport permits. Please note: this route is an upcoming expansion operated strictly on customized advance inquiry.',
        itinerary: [
            { day: 'Day 1', title: 'Varanasi to Lumbini', desc: 'Drive to Indo-Nepal border at Sonauli. Customs clearance and transfer to Lumbini.' },
            { day: 'Day 2', title: 'Lumbini to Pokhara', desc: 'Visit Sacred Garden and Maya Devi temple. Scenic drive through Himalayan foothills to Pokhara.' },
            { day: 'Day 3', title: 'Pokhara Sightseeing', desc: 'Sunrise at Sarangkot, boat ride on Phewa Lake, Devi\'s Fall, and Gupteshwor Cave.' },
            { day: 'Day 4', title: 'Pokhara to Kathmandu', desc: 'Scenic mountain drive to Kathmandu valley. Evening stroll in Thamel.' },
            { day: 'Day 5', title: 'Pashupatinath Darshan & Departure', desc: 'Morning darshan at sacred Pashupatinath Temple and Boudhanath Stupa before departure.' }
        ],
        inclusions: [
            'All transport with valid cross-border permits',
            '4 Nights hotel stays with daily breakfast',
            'Customs and border crossing coordination'
        ],
        exclusions: ['Nepal visa fees (free for Indian nationals with valid Voter ID / Passport)', 'Meals'],
        practicalTips: [
            'Original Voter ID card or Indian Passport is mandatory for Indian citizens crossing into Nepal; Aadhaar is not officially accepted at immigration.',
            'Currencies: Indian Rupee notes of ₹100 and ₹50 are widely accepted across Nepal; ₹500 notes are regulated.'
        ],
        idealFor: 'Extended vacationers, international pilgrims, custom circuit travelers',
        faqs: [
            { q: 'Is this tour currently operational on fixed departure dates?', a: 'This route is currently operated strictly on customized group inquiry. Please contact our local travel desk 3–4 weeks in advance for cross-border permit clearances.' },
            { q: 'Do Indian citizens require a passport for this tour?', a: 'Indian citizens can travel with a valid original Voter ID or Passport.' }
        ],
        relatedSlugs: ['bodh-gaya-tour', 'kashi-prayagraj-ayodhya-tour', 'varanasi-tour']
    }
];

export const getTourBySlug = (slug) => {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();
    return TOURS.find(t => t.slug === cleanSlug) || null;
};
