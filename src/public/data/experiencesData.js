import aartiImg from '../../assets/ExperienceVaranasi/GangaAarti.avif';
import assiImg from '../../assets/ExperienceVaranasi/AssiMorning.avif';
import kashiImg from '../../assets/ExperienceVaranasi/KashiVT.avif';
import sarnathImg from '../../assets/destinations/sarnath.avif';
import srvSilkImg from '../../assets/services/srv-silk.avif';
import srvGuideImg from '../../assets/services/srv-guide.avif';

export const EXPERIENCE_CATEGORIES = [
    'All Experiences',
    'River Experience',
    'Spiritual',
    'Culture & History',
    'Local Culture',
    'Food & Lifestyle',
    'History & Spirituality'
];

export const EXPERIENCES = [
    {
        slug: 'sunrise-boat-ride',
        aliases: ['varanasi-boat-ride'],
        title: 'Sunrise Boat Ride & Subah-e-Banaras',
        category: 'River Experience',
        categories: ['River Experience'],
        tagline: 'Witness the golden morning sun bathe 84 historic ghats from the tranquil waters of the sacred Ganges.',
        shortDesc: 'Glide along historic ghats as morning rays touch ancient havelis, pilgrims perform dawn rituals, and temple chants resonate across the river.',
        duration: '1.5 - 2 Hours',
        durationEstimate: 'Approx. 1.5 – 2 hours (Dawn)',
        bestTime: 'Sunrise (5:30 AM – 7:30 AM, varies by season)',
        timingEstimateDisclaimer: 'Departure is timed with the seasonal sunrise. In winter, boarding typically starts between 6:00 AM – 6:15 AM; in summer, boarding is around 5:30 AM.',
        experienceType: 'Private Wooden Rowing or Motor Boat / Shared Option Available',
        meetingPoint: 'Assi Ghat Boat Steps, Southern Varanasi',
        meetingInstructions: 'Your assigned boatman or local escort will receive you directly at the Assi Ghat platform near the morning yoga pavilion.',
        guideRole: 'Local boatman with generational navigation experience and historical storytelling covering major ghats.',
        languages: ['Hindi', 'Basic English', 'Regional dialects'],
        pricing: {
            model: 'indicative',
            unit: 'per boat (up to 4–6 passengers)',
            display: 'On Request / Transparent Seasonal Quote',
            note: 'Indicative seasonal pricing shared prior to confirmation. District authorities regulate monsoon boat operations; festive high-demand periods like Dev Deepawali feature separate government-gazetted rates.'
        },
        image: assiImg,
        alt: 'Sunrise boat ride along 84 ghats Varanasi Assi to Manikarnika',
        heroHighlight: 'The quintessential dawn experience of Kashi: quiet morning currents, ringing bells, and centuries of devotion.',
        destinationSlug: 'varanasi',
        destinationName: 'Varanasi',
        overview: [
            'A sunrise boat ride in Varanasi is not just sightseeing; it is an intimate glimpse into the timeless spiritual heartbeat of India. Boarding at dawn from Assi Ghat, you glide past grand stone palaces, medieval Maratha fortresses, and bathing steps where millions of seekers have greeted the sun for millennia.',
            'As the golden dawn light spreads over the river, you witness Subah-e-Banaras: priests chanting Vedic mantras, morning raga renditions floating from music pavilions, and quiet devotees offering marigold flowers to Mother Ganga.',
            'The boat drifts slowly past prominent landmarks including Tulsi Ghat, Harishchandra Ghat, Chet Singh Fort, Dashashwamedh Ghat, and reaches the revered Manikarnika Ghat before an unhurried return to your starting point.'
        ],
        whatToExpect: [
            'Private wooden boat reserved exclusively for your family or traveling group.',
            'Gentle cruise spanning from Assi Ghat to Manikarnika Ghat and back.',
            'Live narrative commentary on historical ghat architecture, saintly legends, and riverside life.',
            'Option to release biodegradable marigold leaf-diyas (deepdan) with your morning prayers.',
            'Flocks of migratory Siberian gulls hovering over the water during winter months (November to February).'
        ],
        proposedRoute: [
            { step: '01', title: 'Boarding at Assi Ghat', desc: 'Meet your boatman at dawn; safety briefing and life jacket wear.' },
            { step: '02', title: 'Tulsi & Harishchandra Ghats', desc: 'Drift past Goswami Tulsidas\'s writing retreat and the ancient cremation ghat.' },
            { step: '03', title: 'Historic Palace Ghats', desc: 'Observe Chet Singh Fort, Darbhanga Mahal, and Munshi Ghat architectural facades.' },
            { step: '04', title: 'Dashashwamedh & Manikarnika', desc: 'Reach the central pilgrimage hub and the eternal sacred flame of Manikarnika.' },
            { step: '05', title: 'Unhurried Return to Assi', desc: 'Gentle upstream row with morning tea / chai break at ghat steps on request.' }
        ],
        whatsIncluded: [
            'Private boat hire with licensed local boatman for 1.5–2 hours',
            'Mandatory government-compliant life jackets for every passenger',
            'Fresh marigold flower diya for river prayer offering',
            'Assistance with elderly passenger boarding and disembarking at the ghat steps'
        ],
        whatsExcluded: [
            'Hotel pickup/drop transfers (can be added via Private Cab in Trip Planner)',
            'Ghatside tea/snacks and personal purchases',
            'Priest dakshina or temple rituals on the ghats (completely voluntary)',
            'Special drone or commercial filming permits (strictly regulated by local police)'
        ],
        safetyAndRegulations: [
            'District administration strictly mandates life jackets for all boat passengers on River Ganga.',
            'Photography is strictly prohibited facing directly toward funeral pyres at Manikarnika and Harishchandra Ghats out of sacred decorum.',
            'During high monsoon water levels (typically July–September), river boating is subject to district administration safety closures. In such cases, full refunds or alternative land itineraries are provided.'
        ],
        cancellationConditions: 'Free cancellation or rescheduling up to 12 hours prior to dawn departure. Weather-mandated safety suspensions by police/administration receive an immediate 100% refund.',
        practicalTips: [
            'Dress in layers during winter (November–February) as early morning river winds can be chilly.',
            'Wear slip-resistant flat footwear suited for stone steps, which can occasionally be damp.',
            'Keep your mobile phone secured with a lanyard while leaning over the boat gunwale.'
        ],
        faqs: [
            {
                q: 'Is a rowing boat better or a motor boat?',
                a: 'For peaceful photography and authentic atmosphere, a traditional hand-rowed wooden boat is unparalleled. Motor boats are faster and better suited for larger family groups of 10+ passengers.'
            },
            {
                q: 'Is sunrise boating safe for senior citizens and young children?',
                a: 'Yes. Our boatmen provide attentive hand support during step boarding. Life jackets are provided for all sizes. Please inform us in advance if any member has limited mobility.'
            },
            {
                q: 'What happens if it rains or there is heavy morning fog?',
                a: 'In moderate winter fog, boats proceed safely along the ghat shoreline. If severe weather or district restrictions occur, we coordinate with you for a sunset slot or issue a complete refund.'
            }
        ],
        relatedSlugs: ['ganga-aarti', 'old-kashi-heritage-walk', 'banarasi-food-walk']
    },
    {
        slug: 'ganga-aarti',
        aliases: [],
        title: 'Maha Ganga Aarti Experience',
        category: 'Spiritual',
        categories: ['Spiritual', 'River Experience'],
        tagline: 'Experience the world-renowned evening brass lamp ceremony where Vedic chants, incense, and devotion illuminate Dashashwamedh Ghat.',
        shortDesc: 'Witness the iconic evening ritual where Vedic priests hoist towering brass lamps, conch shells echo, and thousands of floating diyas light the holy river.',
        duration: '2 Hours (Evening)',
        durationEstimate: 'Approx. 2 hours (5:30 PM – 7:30 PM)',
        bestTime: 'Evening Twilight (Winter: 5:45 PM – 7:15 PM | Summer: 6:45 PM – 8:15 PM)',
        timingEstimateDisclaimer: 'Aarti start times shift with seasonal sunset. Arrival at least 45 minutes prior to the ritual is required for optimal boat anchoring or reserved ghat seating.',
        experienceType: 'Private Boat Anchor View or Dedicated Ghat Platform Seating',
        meetingPoint: 'Dashashwamedh Ghat Main Steps or Rajendra Prasad Ghat',
        meetingInstructions: 'Meeting at Godowlia Chauraha escort point or directly at Rajendra Prasad Ghat boat pier.',
        guideRole: 'Local spiritual host to assist through crowd navigation, explain Vedic rituals, and handle boat anchoring.',
        languages: ['Hindi', 'English'],
        pricing: {
            model: 'indicative',
            unit: 'per boat or per reserved seat',
            display: 'On Request / Transparent Seasonal Quote',
            note: 'Ghat step viewing is free and open to all; curated pricing applies to private boat anchoring, dedicated escort coordination, or priority platform seats.'
        },
        image: aartiImg,
        alt: 'Maha Ganga Aarti Dashashwamedh Ghat Varanasi brass lamp ceremony',
        heroHighlight: 'The mesmerizing spiritual pinnacle of Varanasi: coordinated brass lamps, Vedic chanting, and an ocean of river devotion.',
        destinationSlug: 'varanasi',
        destinationName: 'Varanasi',
        overview: [
            'Every evening at dusk, Dashashwamedh Ghat transforms into an open-air amphitheater of transcendent faith. Clad in traditional dhoti-kurta and angavastram, seven young trained Vedic priests ascend elevated platforms to worship Mother Ganga.',
            'The ritual unfolds with rhythmic precision: blowing of sacred conch shells (Shankhnaad), sweeping of peacock-feather fans, waving of fragrant incense sticks, and the climactic lifting of multi-tiered brass lamps radiating incandescent flames into the twilight sky.',
            'Guests can witness this awe-inspiring spectacle either anchored quietly from the river on a private wooden boat—offering unobstructed wide-angle views—or from arranged step seating close to the priests.'
        ],
        whatToExpect: [
            'Coordinated chanting of the sacred Ganga Stotram, Shiva Tandava Stotra, and evening aradhana.',
            'Dramatic brass lamps weighing over 4 kg manipulated with fluid devotional cadence.',
            'Option to release illuminated marigold leaf-boats onto the river as a personal offering.',
            'Vibrant river atmosphere packed with hundreds of anchored boats creating an amphitheater effect.'
        ],
        proposedRoute: [
            { step: '01', title: 'Pre-Aarti Assembly', desc: 'Meet your coordinator by 5:15 PM (winter) or 6:15 PM (summer) at the designated meeting point.' },
            { step: '02', title: 'Boat Embarkation or Seating', desc: 'Board your private boat or walk to reserved steps before the main crowds arrive.' },
            { step: '03', title: 'Riverfront Twilight Positioning', desc: 'Anchor in prime line-of-sight directly facing the seven central priest daises.' },
            { step: '04', title: 'Maha Ganga Aarti Ritual', desc: '45 minutes of synchronized Vedic chanting, shankh blasts, and multi-tiered flame offerings.' },
            { step: '05', title: 'Deepdan & Disembarkation', desc: 'Float your diya boat into the sacred current; unhurried exit assisted through crowd flow.' }
        ],
        whatsIncluded: [
            'Reserved private wooden boat anchoring or arranged ghatside seating',
            'Local escort to guide you through congested Godowlia lanes to the ghat',
            'Life jackets and certified boat crew',
            'Traditional deepdan (marigold diya) for each guest'
        ],
        whatsExcluded: [
            'Special VIP canopy seats (subject to direct temple committee donation)',
            'Hotel vehicle pickup/drop (available via Custom Trip Planner)',
            'Personal food, beverages, and tips'
        ],
        safetyAndRegulations: [
            'Dashashwamedh Ghat experiences heavy crowds every evening; keep young children by the hand at all times.',
            'Beware of unvetted touts promising "temple committee VIP darshan passes" in the streets.',
            'Boats remain stationary and tied together during the ritual; listen carefully to crew safety instructions.'
        ],
        cancellationConditions: 'Cancel up to 6 hours before event start for full refund. Adverse weather or river restriction cancellations receive 100% refund.',
        practicalTips: [
            'Vehicles are barred from entering Godowlia Chowk in the evening; be prepared for an 8–10 minute flat walk through heritage market lanes.',
            'Carry a camera with good low-light capabilities; flash photography should be respectful and not pointed in priests\' eyes.',
            'Dress modestly in comfortable clothes suitable for sitting on wooden boat decks or stone steps.'
        ],
        faqs: [
            {
                q: 'Which view is better: from a boat on the river or from the ghat steps?',
                a: 'Watching from a boat on the water provides an unobstructed panoramic view of all seven priests simultaneously without crowd obstruction. Sitting on the ghat puts you closer to the bells and chanting aroma, but can feel more crowded.'
            },
            {
                q: 'Can senior citizens with knee problems manage this experience?',
                a: 'Yes, if arranged properly. We guide senior citizens through cleaner side alleys to avoid the steepest ghat steps, and help them directly onto comfortable boat seating.'
            },
            {
                q: 'Does the Aarti take place if it rains?',
                a: 'Yes. The Maha Ganga Aarti is conducted 365 days a year without interruption. In rain, priests perform under protective canopies while boats carry tarpaulin covers.'
            }
        ],
        relatedSlugs: ['sunrise-boat-ride', 'old-kashi-heritage-walk', 'banarasi-silk-craft']
    },
    {
        slug: 'old-kashi-heritage-walk',
        aliases: ['temple-darshan'],
        title: 'Old Kashi Heritage & Sacred Alleys Walk',
        category: 'Culture & History',
        categories: ['Culture & History', 'Spiritual'],
        tagline: 'Navigate the labyrinthine medieval galis, ancient shrines, hidden havelis, and living traditions of the world’s oldest living city.',
        shortDesc: 'Wander through timeless alleyways with a knowledgeable local heritage guide to discover hidden shrines, secret courtyards, and ancient philosophy.',
        duration: '2.5 - 3 Hours',
        durationEstimate: 'Approx. 2.5 – 3 hours',
        bestTime: 'Morning (7:30 AM – 10:30 AM) or Late Afternoon (3:30 PM – 6:30 PM)',
        timingEstimateDisclaimer: 'Walk timings avoid the midday sun and peak temple congestion hours.',
        experienceType: 'Private Guided Walking Tour with Local Heritage Storyteller',
        meetingPoint: 'Godowlia Chauraha (Near Church Cross / Police Booth)',
        meetingInstructions: 'Your guide will be waiting holding a discreet Kashi Vashi greeting card at the landmark intersection.',
        guideRole: 'Varanasi-born heritage storyteller with deep knowledge of alley geography, mythology, and architectural history.',
        languages: ['Hindi', 'English', 'Bengali on request'],
        pricing: {
            model: 'indicative',
            unit: 'per private group walk (up to 6 guests)',
            display: 'On Request / Transparent Quote',
            note: 'Guided walking experience quote includes dedicated local host and neighborhood permissions; personal offerings or purchases are separate.'
        },
        image: srvGuideImg,
        alt: 'Guided heritage walk through ancient lanes of Kashi Varanasi',
        heroHighlight: 'Step into a 3,000-year-old living maze of sacred shrines, medieval havelis, and vibrant artisan life.',
        destinationSlug: 'varanasi',
        destinationName: 'Varanasi',
        overview: [
            'Mark Twain famously noted that Varanasi is "older than history, older than tradition, older even than legend, and looks twice as old as all of them put together." Nowhere is this ancient truth more palpable than inside the pulsating, narrow galis (alleys) behind the ghats.',
            'These pedestrian-only labyrinthine passages, often less than four feet wide, shield ancient shrines that predated modern city grids by hundreds of years. Along the way, you pass generational perfumers blending rose attar, wooden doorway carvings dating to the Maratha era, and sacred bulls sauntering peacefully.',
            'Our guided heritage walk connects iconic alleys like Kachori Gali, Vishwanath Gali, Dalmandi, and the historic havelis of Bengali Tola, revealing the philosophical resilience that keeps Kashi eternally vibrant.'
        ],
        whatToExpect: [
            'Unhurried exploration through the iconic medieval alleys of Old Varanasi.',
            'Stories of Adi Shankaracharya, Goswami Tulsidas, and Kabir Das connected to local spots.',
            'Visits to lesser-known heritage temples and neighborhood shrines tucked behind haveli walls.',
            'Safe, respectful guidance avoiding tout corridors and high-pressure commercial shops.',
            'Interaction with generational sweetmakers, flower garland knotters, and attar distillers.'
        ],
        proposedRoute: [
            { step: '01', title: 'Meeting at Godowlia', desc: 'Introduction to Kashi’s ancient urban topography and alley layout.' },
            { step: '02', title: 'Kachori Gali & Spice Market', desc: 'Passing generational snack masters, spice shops, and brass idol shops.' },
            { step: '03', title: 'Vishwanath Gali Precinct', desc: 'Appreciating the historical periphery of the sacred Golden Corridor and Annapurna shrine.' },
            { step: '04', title: 'Nepali Temple & Lalita Ghat', desc: 'Admiring 19th-century pagoda-style terracotta and wooden craftsmanship.' },
            { step: '05', title: 'Bengali Tola Haveli Alleys', desc: 'Quiet residential quarter famous for classical music schools, library archives, and art.' }
        ],
        whatsIncluded: [
            'Dedicated private local heritage guide for 2.5–3 hours',
            'Curated walking route adapted to your group’s walking pace and interests',
            'Traditional refreshment stop (mineral water + hot kulhad chai)',
            'Shoe-keeping assistance at temple thresholds'
        ],
        whatsExcluded: [
            'Direct Temple VIP fast-track tickets (can be arranged separately via Trip Planner)',
            'Personal shopping purchases and voluntary temple donations',
            'Motorized transfers to the walking start point'
        ],
        safetyAndRegulations: [
            'Lanes are narrow and paved with river stone; strollers or wheelchairs cannot navigate steps inside the deeper galis.',
            'Footwear must be removed at shrine entrances; we recommend easily slip-on walking shoes.',
            'Mobile phones, cameras, leather items, and smart watches are prohibited inside the Kashi Vishwanath inner corridor.'
        ],
        cancellationConditions: 'Full refund on cancellations made at least 12 hours prior to scheduled start time.',
        practicalTips: [
            'Wear comfortable, breathable cotton clothing covering knees and shoulders.',
            'Carry a small bag or pouch for your shoes if you prefer carrying them between shrines.',
            'Stay close to your guide as mobile phone network can occasionally drop inside dense haveli lanes.'
        ],
        faqs: [
            {
                q: 'How much walking is involved?',
                a: 'The route covers approximately 2.5 to 3 kilometers at an easy, leisurely pace with frequent stops for stories and photos.'
            },
            {
                q: 'Does this walk include entry into Kashi Vishwanath temple?',
                a: 'This walk explores the historic heritage precinct and outer corridor. If you wish to perform inner sanctum sparsh darshan, we can seamlessly extend the walk with dedicated queue assistance.'
            },
            {
                q: 'Is this walk safe for solo women travelers and families?',
                a: 'Absolutely. Our verified local guides are lifelong Banaras residents who ensure a respectful, safe, and welcoming experience throughout.'
            }
        ],
        relatedSlugs: ['banarasi-food-walk', 'banarasi-silk-craft', 'sunrise-boat-ride']
    },
    {
        slug: 'banarasi-silk-craft',
        aliases: ['silk-handicrafts'],
        title: 'Banarasi Silk & Weaver Heritage Discovery',
        category: 'Local Culture',
        categories: ['Local Culture', 'Culture & History'],
        tagline: 'Discover the extraordinary craftsmanship of genuine Handloom Banarasi Silk directly inside master weaver colonies.',
        shortDesc: 'Step away from commercial commission showrooms to witness generational artisans weaving genuine gold and silver zari sarees on pit looms.',
        duration: '2 - 3 Hours',
        durationEstimate: 'Approx. 2 – 3 hours',
        bestTime: 'Mid-Morning to Afternoon (11:00 AM – 4:00 PM)',
        timingEstimateDisclaimer: 'Weaver colonies operate primarily during daylight hours when natural light illuminates intricate warp threads.',
        experienceType: 'Private Cultural Artisan Excursion with Local Facilitator',
        meetingPoint: 'Madanpura Chowk or Chowk Weaver Quarter, Varanasi',
        meetingInstructions: 'Our vehicle or escort meets you at your hotel or a designated accessible pick-up point near the weaver enclave.',
        guideRole: 'Textile-literate heritage host who bridges dialogue between guests and artisan families.',
        languages: ['Hindi', 'English'],
        pricing: {
            model: 'indicative',
            unit: 'per private family / group visit',
            display: 'On Request / Transparent Service Fee',
            note: 'We do not operate on showroom sales commissions. Our service is a transparent facilitation fee ensuring you visit ethical, genuine artisan cooperatives.'
        },
        image: srvSilkImg,
        alt: 'Authentic Banarasi handloom saree pit loom weaving Varanasi',
        heroHighlight: 'Witness the painstaking art of pure Katan silk and gold zari weaving passed down over five centuries.',
        destinationSlug: 'varanasi',
        destinationName: 'Varanasi',
        overview: [
            'Banarasi silk is celebrated globally for its opulent gold and silver metallic brocades, fine silk, and intricate Mughal and floral jaal motifs. Yet, majority of travelers are redirected by auto-drivers to commercial tourist showrooms selling machine-made polyester blends.',
            'Our Silk & Craft Discovery takes you behind the tourist veil into the historic weaver colonies of Madanpura, Peeli Kothi, and Lallapura. Here, generational master craftsmen (Karigars) work hand-in-hand with wooden pit looms that have remained virtually unchanged for centuries.',
            'You will observe the Jacquard card punch-paper coding systems, understand how a single bridal saree can take 30 to 180 days of hand-weaving, and learn practical tests to verify pure silk and authentic Silk Mark certifications.'
        ],
        whatToExpect: [
            'Live demonstration of warp and weft Jacquard pit-loom weaving by national award-winning artisans.',
            'Hands-on explanation of pure Katan, Kora (Organza), Georgette, and Shatir fabrics.',
            'How to distinguish genuine real silver zari from cheap electroplated copper thread.',
            'Direct conversation with weaver families regarding their generational heritage and modern challenges.',
            'Exploration of Gulabi Meenakari (pink silver enameling) and wooden lacquer craft upon request.'
        ],
        proposedRoute: [
            { step: '01', title: 'Arrival at Heritage Weaver Enclave', desc: 'Brief introduction to the history of Banarasi handloom traditions.' },
            { step: '02', title: 'Design & Naksha Studio', desc: 'See how motifs are transferred onto graph paper and punched into Jacquard cards.' },
            { step: '03', title: 'The Pit Loom Workshop', desc: 'Watch master weavers coordinate foot pedals and hand shuttles with rhythmic focus.' },
            { step: '04', title: 'Silk Mark & Authenticity Workshop', desc: 'Interactive burn tests, weave inspection, and understanding ethical craft pricing.' },
            { step: '05', title: 'Artisan Cooperative Visit', desc: 'Direct access to purchase certified authentic handloom sarees without middleman pressure.' }
        ],
        whatsIncluded: [
            'Dedicated textile-literate local escort for 2–3 hours',
            'Entry into genuine family-run handloom weaving workshops',
            'Silk testing guidance and Silk Mark verification tutorial',
            'Complimentary bottled water and welcome tea with artisan host'
        ],
        whatsExcluded: [
            'Saree or textile purchases (any purchase is 100% voluntary and paid directly to weavers)',
            'Air-conditioned cab transfer (can be added in Trip Planner)'
        ],
        safetyAndRegulations: [
            'Weaving workshops are active artisan residences with narrow doorways and low ceilings; please tread carefully around loom pits.',
            'Please request permission before photographing individual weavers while they work on intricate patterns.'
        ],
        cancellationConditions: 'Free cancellation up to 12 hours prior to scheduled excursion.',
        practicalTips: [
            'If planning to purchase a bridal or heirloom saree, set aside extra time for color selection.',
            'Carry cash or UPI apps; card machines are available at registered weaver cooperatives.'
        ],
        faqs: [
            {
                q: 'Are we obliged to buy a saree during this tour?',
                a: 'Never. Our experience is designed as an educational cultural journey. You are under zero obligation to buy anything. If you do wish to buy, you receive genuine artisan pricing without middleman inflation.'
            },
            {
                q: 'How do I know the silk is 100% genuine?',
                a: 'Our host will demonstrate real fire burn-testing (pure silk smells like singed hair and burns to fine ash, whereas polyester melts into a hard plastic bead) and show you how to read the government-certified Silk Mark label.'
            }
        ],
        relatedSlugs: ['old-kashi-heritage-walk', 'banarasi-food-walk', 'sunrise-boat-ride']
    },
    {
        slug: 'banarasi-food-walk',
        aliases: ['culinary-walk'],
        title: 'Authentic Banarasi Food & Culinary Trail',
        category: 'Food & Lifestyle',
        categories: ['Food & Lifestyle', 'Local Culture'],
        tagline: 'Taste the generational vegetarian street delicacies that define Banaras: steaming kachori-jalebi, thick kulhad lassi, seasonal malaiyo, and royal paan.',
        shortDesc: 'Savor legendary breakfast dishes, creamy clay-pot lassis, and world-famous street food at centuries-old, hygienic family sweetshops.',
        duration: '2 - 2.5 Hours',
        durationEstimate: 'Approx. 2 – 2.5 hours',
        bestTime: 'Morning (7:30 AM – 10:00 AM) or Evening (5:00 PM – 7:30 PM)',
        timingEstimateDisclaimer: 'Breakfast walks feature hot Bedmi Kachori and Jalebi; evening walks feature savory chaats (Tamatar Chaat, Palak Chaat) and rich lassi.',
        experienceType: 'Curated Gastronomic Walk with Local Food Connoisseur',
        meetingPoint: 'Gowdowlia Crossing or Thatheri Gali Entrance',
        meetingInstructions: 'Meet your food guide directly at the designated sweetshop threshold in central Godowlia.',
        guideRole: 'Lifelong Banarasi food enthusiast who curates vetted, clean, high-reputation generational food stalls.',
        languages: ['Hindi', 'English'],
        pricing: {
            model: 'indicative',
            unit: 'per person / small group',
            display: 'On Request / Transparent Quote',
            note: 'Package includes all food tastings and mineral water across 5–6 legendary tasting stops.'
        },
        image: assiImg,
        alt: 'Banarasi street food kachori jalebi malaiyo and kulhad lassi',
        heroHighlight: 'A sensory explosion of pure vegetarian culinary heritage perfected over generations.',
        destinationSlug: 'varanasi',
        destinationName: 'Varanasi',
        overview: [
            'Banaras is a city that eats with spiritual reverence. The city’s culinary tradition is steeped in satvik principles, generational recipes, and unhurried craftsmanship. Here, a halwai frying jalebis at sunrise carries a family legacy dating back to the 1800s.',
            'Our culinary walk leads you down vibrant market alleys where the aromas of pure desi ghee, crushed cardamom, and sizzling cumin fill the air. You will sample iconic dishes like spicy Bedmi Kachori served with chana-aloo sabzi, freshly made sweet jalebis, and Varanasi’s signature Tamatar Chaat—a savory hot tomato reduction unique to this city.',
            'During winter months (November to February), you will delight in Malaiyo: a cloud-like, saffron-infused milk froth that melts on the tongue, followed by the digestive masterpiece: a fragrant Banarasi Meetha Paan.'
        ],
        whatToExpect: [
            '5 to 6 curated food tasting stops at vetted, generational sweetshops.',
            'Tasting of iconic Bedmi Kachori, Aloo Sabzi, and crisp saffron Jalebi.',
            'Sampling of famous Banarasi Tamatar Chaat and Palak Patta Chaat.',
            'Thick churned creamy Dahi Lassi served in earthenware kulhads topped with rabri.',
            'Winter seasonal delight: heavenly Malaiyo (in season) or Rabri Jalebi.',
            'Authentic royal Banarasi Paan prepared with gulkand, kattha, and fragrant betel leaf.'
        ],
        proposedRoute: [
            { step: '01', title: 'The Sunrise Breakfast Stop', desc: 'Crisp kachori served on leaf bowls with spicy chana curry and piping hot jalebi.' },
            { step: '02', title: 'The Chaat Trail at Kashi Chat Bhandar', desc: 'World-famous Tamatar Chaat, Golgappe, and Palak Chaat prepared in pure desi ghee.' },
            { step: '03', title: 'Thatheri Bazaar Sweets', desc: 'Sample generational Lal Peda and dry-fruit-studded rabri.' },
            { step: '04', title: 'Legendary Lassi Haven', desc: 'Hand-churned yogurt topped with thick malai and rose water in clay cups.' },
            { step: '05', title: 'The Royal Paan Finale', desc: 'Watch a master paan artisan craft a melt-in-mouth Meetha Banarasi Paan.' }
        ],
        whatsIncluded: [
            'All food tastings and delicacies at 5–6 selected heritage eateries',
            'Packaged sealed mineral water bottles throughout the tour',
            'Dedicated local food guide explaining food history and ingredients',
            'Disposable biodegradable plates and cutlery'
        ],
        whatsExcluded: [
            'Packaged bulk sweet boxes or take-away souvenirs',
            'Alcohol and non-vegetarian food (all food in Kashi heritage quarter is strictly vegetarian)'
        ],
        safetyAndRegulations: [
            'All food stops are personally vetted for stringent kitchen hygiene and use of purified water.',
            'Please inform your guide in advance if you have nut, dairy, or gluten allergies.'
        ],
        cancellationConditions: 'Free cancellation up to 12 hours prior to scheduled tasting trail.',
        practicalTips: [
            'Come with a hearty appetite—portions are generous across the 5 stops!',
            'Wear comfortable footwear suited for walking between historic market galis.'
        ],
        faqs: [
            {
                q: 'Is the street food safe for sensitive foreign stomachs?',
                a: 'Yes. We deliberately avoid unhygienic roadside carts. Every stop on our trail is a renowned, licensed establishment with decades of local reputation using purified water and fresh ingredients.'
            },
            {
                q: 'Is all food vegetarian?',
                a: 'Yes, 100% pure vegetarian. Varanasi’s historic quarters operate on strictly satvik and vegetarian food culture.'
            }
        ],
        relatedSlugs: ['old-kashi-heritage-walk', 'sunrise-boat-ride', 'ganga-aarti']
    },
    {
        slug: 'sarnath-buddhist-heritage',
        aliases: ['sarnath'],
        title: 'Sarnath Buddhist Heritage & Dhamek Stupa',
        category: 'History & Spirituality',
        categories: ['History & Spirituality', 'Culture & History'],
        tagline: 'Walk the sacred grounds of the Deer Park where Gautama Buddha delivered his first sermon and turned the Wheel of Law.',
        shortDesc: 'Explore the 5th-century Dhamek Stupa, Ashoka Lion Capital ruins, and peaceful international Buddhist monasteries just 10 km from Kashi.',
        duration: '3 - 4 Hours',
        durationEstimate: 'Approx. 3 – 4 hours (Half Day)',
        bestTime: 'Morning (9:00 AM – 1:00 PM) or Afternoon (2:00 PM – 5:00 PM)',
        timingEstimateDisclaimer: 'The Sarnath Archaeological Museum is strictly closed on Fridays. Archaeological site grounds remain open seven days a week from sunrise to sunset.',
        experienceType: 'Private Guided Historical Excursion with Dedicated Cab & Escort',
        meetingPoint: 'Hotel Pickup in Varanasi or Sarnath Archeological Park Gate',
        meetingInstructions: 'Your private AC cab driver and guide pick you up from your hotel lobby in Varanasi and drive 10 km northeast to Sarnath.',
        guideRole: 'Certified historical monument guide detailing Buddhist iconography, Mauryan archaeology, and world monastic traditions.',
        languages: ['Hindi', 'English', 'Japanese / Thai on request'],
        pricing: {
            model: 'indicative',
            unit: 'per private car excursion (up to 4–6 passengers)',
            display: 'On Request / Transparent Excursion Quote',
            note: 'Package typically combines private AC round-trip cab from Varanasi, monument guide, and site entry management.'
        },
        image: sarnathImg,
        alt: 'Sarnath Dhamek Stupa ancient archaeological park deer park',
        heroHighlight: 'The birthplace of the Buddhist Sangha where Lord Buddha first set the Dharmachakra in motion.',
        destinationSlug: 'sarnath',
        destinationName: 'Sarnath',
        overview: [
            'Just 10 kilometers northeast of the bustling river ghats of Varanasi lies Sarnath—one of the four supreme pilgrimage sites of Buddhism worldwide (alongside Lumbini, Bodh Gaya, and Kushinagar). In this tranquil Deer Park (Isipatana), Gautama Buddha delivered his first discourse, the Dhammacakkappavattana Sutta, to his first five disciples.',
            'The archaeological complex is dominated by the monumental Dhamek Stupa, a 43.6-meter-high stone-faced cylindrical structure dating to 500 CE, embellished with exquisite Gupta-era floral stone carvings and geometric swastika bands.',
            'Nearby stands the ruin of the ancient Ashoka Pillar, whose famous four-lion capital was adopted as the official National Emblem of the Republic of India and is safely preserved inside the on-site Archaeological Museum.'
        ],
        whatToExpect: [
            'Circumambulating the massive Dhamek Stupa with serene Buddhist pilgrims and monks.',
            'Visiting the excavated ruins of the Dharmarajika Stupa and ancient Gupta monasteries.',
            'Exploring the Sarnath Archaeological Museum housing the original Ashokan Lion Capital (except Fridays).',
            'Contemplation under the Bodhi Tree at Mulagandha Kuti Vihar featuring Japanese artist Kosetsu Nosu’s frescoes.',
            'Visits to contemporary Thai, Tibetan, Sri Lankan, and Japanese monasteries.'
        ],
        proposedRoute: [
            { step: '01', title: 'Drive to Sarnath', desc: 'Comfortable 30-minute private AC ride from Varanasi city center.' },
            { step: '02', title: 'Archaeological Park & Dhamek Stupa', desc: 'Guided walk through the Ashokan ruins, stupa circumambulation, and meditation grounds.' },
            { step: '03', title: 'Sarnath Archaeological Museum', desc: 'Witness the iconic 3rd-century BC Lion Capital of Ashoka and exquisite Buddha statues (closed Fridays).' },
            { step: '04', title: 'Mulagandha Kuti Vihar & Bodhi Tree', desc: 'Admire the vibrant wall frescoes depicting Lord Buddha’s life story.' },
            { step: '05', title: 'International Monasteries & Return', desc: 'Visit the 80-foot Giant Buddha statue and Thai temple before return drive.' }
        ],
        whatsIncluded: [
            'Round-trip private air-conditioned cab transfer from Varanasi hotel',
            'Experienced heritage guide dedicated to your family',
            'All parking fees and toll taxes',
            'Complimentary bottled water in cab'
        ],
        whatsExcluded: [
            'Archaeological Survey of India (ASI) monument entry tickets (purchasable online or at ASI counter)',
            'Museum entry tickets (nominal fee)',
            'Personal meals and souvenirs'
        ],
        safetyAndRegulations: [
            'Sarnath Archaeological Museum is closed on all Fridays. Plan your travel day accordingly.',
            'Shoe covers or shoe removal is required at Mulagandha Kuti Vihar and active monasteries.',
            'Silence and decorum are expected around active meditation stupas and prayer wheels.'
        ],
        cancellationConditions: 'Free cancellation up to 12 hours prior to pick-up time.',
        practicalTips: [
            'Combine this excursion with your transit to or from Lal Bahadur Shastri Airport (VNS) for efficient scheduling.',
            'Carry a sun hat and sunglasses during afternoon visits as the archaeological park has open lawns.'
        ],
        faqs: [
            {
                q: 'Is Sarnath open on Fridays?',
                a: 'The archaeological park (Dhamek Stupa grounds) and monasteries are open on Fridays, but the Sarnath Archaeological Museum is strictly CLOSED every Friday. If viewing the original Lion Capital is essential, visit on Saturday through Thursday.'
            },
            {
                q: 'How far is Sarnath from Varanasi city center?',
                a: 'Sarnath is approximately 10 km from the ghats and takes roughly 25 to 35 minutes by private cab depending on city traffic.'
            }
        ],
        relatedSlugs: ['sunrise-boat-ride', 'ganga-aarti', 'old-kashi-heritage-walk']
    }
];

export const getExperienceBySlug = (slug) => {
    if (!slug) return null;
    const cleanSlug = slug.toLowerCase().trim();
    return EXPERIENCES.find(exp => exp.slug === cleanSlug || (exp.aliases && exp.aliases.includes(cleanSlug))) || null;
};
