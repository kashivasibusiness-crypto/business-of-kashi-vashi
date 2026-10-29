import varanasiImg from '../../assets/destinations/varanasi.avif';
import sarnathImg from '../../assets/destinations/sarnath.avif';
import ayodhyaImg from '../../assets/destinations/ayodhya.avif';
import bodhgayaImg from '../../assets/destinations/bodhgaya.avif';
import prayagrajImg from '../../assets/destinations/prayagraj.avif';
import mirzapurImg from '../../assets/destinations/mirzapur.avif';
import lucknowImg from '../../assets/destinations/lucknow.avif';
import ujjainImg from '../../assets/destinations/ujjain.avif';

export const DESTINATION_CATEGORIES = [
    'All Destinations',
    'Spiritual & Pilgrimage',
    'Heritage & Culture',
    'Buddhist Heritage',
    'Nature & Scenic Getaways',
    'Multi-City Circuits'
];

export const DESTINATIONS = [
    {
        slug: 'varanasi',
        name: 'Varanasi (Kashi)',
        title: 'Varanasi (Kashi) Sacred Heritage & Destination Guide',
        tagline: 'The Eternal City of Light on the Sacred Ganges',
        category: 'Spiritual & Pilgrimage',
        categories: ['Spiritual & Pilgrimage', 'Heritage & Culture', 'Multi-City Circuits'],
        distanceFromCenter: 'City Center (0 km)',
        approxTravelTime: 'Base Hub in Varanasi',
        idealDays: '2 - 3 Days',
        bestTimeToVisit: 'October to March (Pleasant winter weather & festivals)',
        image: varanasiImg,
        alt: 'Kashi Vishwanath temple corridor and riverfront ghats in Varanasi',
        heroHighlight: 'The spiritual capital of India, continuously inhabited for over 3,000 years.',
        overview: 'Varanasi, also known as Kashi and Benares, is one of the world\'s oldest continuously inhabited living cities. Situated along the crescent-shaped western bank of the sacred Ganges River, it represents the philosophical heart of Hindu spirituality, Vedic scholarship, classical music, and handloom silk weaving.',
        attractions: [
            { name: 'Shri Kashi Vishwanath Dham', desc: 'The golden-spired sanctum housing one of the twelve sacred Jyotirlingas, connected directly to the river through the grand temple corridor.' },
            { name: 'Dashashwamedh Ghat', desc: 'The epicentre of river activity where Lord Brahma performed the ten-horse sacrifice, and the nightly venue for the grand Maha Ganga Aarti.' },
            { name: 'Assi Ghat', desc: 'The southernmost major ghat celebrating early morning Subah-e-Banaras Vedic chants, classical music, yoga, and vibrant traveler culture.' },
            { name: 'Manikarnika & Harishchandra Ghats', desc: 'The sacred cremation grounds where funeral pyres burn continuously, reminding pilgrims of liberation (Moksha) from the cycle of rebirth.' },
            { name: 'Kaal Bhairav Temple', desc: 'The ancient guardian deity (Kotwal) of Kashi where pilgrims traditionally pay homage before concluding their sacred pilgrimage.' },
            { name: 'Banaras Hindu University (BHU)', desc: 'Sprawling green university campus home to the peaceful New Vishwanath Temple (Birla Mandir) and the Bharat Kala Bhavan museum.' }
        ],
        howToReach: {
            air: 'Lal Bahadur Shastri International Airport (VNS) at Babatpur is approx. 24 km (45–60 mins) from the central ghats, with frequent daily flights from Delhi, Mumbai, Bengaluru, and Hyderabad.',
            train: 'Varanasi Junction / Cantt (BSB), Banaras Station (BSBS), and Pt. Deen Dayal Upadhyaya Junction (DDU, 18 km) offer extensive superfast and Vande Bharat rail connections.',
            road: 'Well connected via National Highway 19 (Grand Trunk Road) and Purvanchal Expressway with direct highway routes from Prayagraj, Ayodhya, and Lucknow.'
        },
        suggestedItinerary: [
            { day: 'Day 1', title: 'Subah-e-Banaras, Riverfront Ghats & Maha Aarti', desc: '05:30 AM sunrise boat ride from Assi to Dashashwamedh, walk through old city alleys, afternoon rest, and 06:30 PM evening Maha Ganga Aarti from a boat.' },
            { day: 'Day 2', title: 'Kashi Vishwanath Dham & Ancient Temples', desc: 'Morning darshan at Kashi Vishwanath Dham & Annapurna Mandir, followed by visits to Kaal Bhairav, Sankat Mochan Hanuman Temple, and Durga Kund.' },
            { day: 'Day 3', title: 'Heritage Silk Weaving & Sarnath Excursion', desc: 'Morning guided walk through traditional handloom silk weaving mohallas, followed by an afternoon trip to Sarnath Buddhist stupas and museum.' }
        ],
        localTransport: {
            summary: 'The riverfront and old temple corridors are pedestrian-only. For wider city travel, e-rickshaws, cycle rickshaws, and pre-booked AC cabs are the standard options.',
            modes: [
                'E-Rickshaws & Autos: Ideal for short hops between Godowlia, Cantt Station, and Assi Ghat.',
                'Private AC Cabs: Essential for airport pickups, Cantt transfers, and Sarnath/BHU day trips.',
                'Hand-Rowed & Motor Boats: Primary transport for traversing between the 84 ghats along the river.'
            ]
        },
        practicalTips: [
            'Wear comfortable slip-on shoes as footwear must be removed outside every temple entrance.',
            'Mobile phones, leather wallets/belts, and cameras are prohibited inside Kashi Vishwanath inner sanctum; secure lockers are available at entry gates.',
            'Photography is strictly prohibited at Manikarnika and Harishchandra cremation ghats out of respect for grieving families.'
        ],
        faqs: [
            { q: 'How many days are ideal to explore Varanasi?', a: '2 to 3 days are recommended to comfortably experience the main ghats, morning and evening aartis, Kashi Vishwanath Dham, and Sarnath without rushing.' },
            { q: 'Can elderly pilgrims navigate the narrow alleys?', a: 'Yes. For elderly travelers, we recommend staying in hotels with vehicle accessibility, utilizing wheelchair assistance at temple corridors, and booking private e-rickshaws.' },
            { q: 'When does the evening Ganga Aarti take place?', a: 'The Aarti begins around 06:00 PM in winter (October–March) and approximately 07:00 PM in summer (April–September) at Dashashwamedh Ghat.' }
        ],
        relatedSlugs: ['sarnath', 'ayodhya', 'prayagraj']
    },
    {
        slug: 'sarnath',
        name: 'Sarnath',
        title: 'Sarnath Buddhist Heritage & Stupa Excursion Guide',
        tagline: 'Where the Wheel of Dhamma Began to Turn',
        category: 'Buddhist Heritage',
        categories: ['Buddhist Heritage', 'Heritage & Culture'],
        distanceFromCenter: 'Approx. 10 km northeast of Varanasi',
        approxTravelTime: '25 - 35 Minutes by Private Cab',
        idealDays: 'Half Day (3 - 4 Hours)',
        bestTimeToVisit: 'October to March (Pleasant gardens and morning sunshine)',
        image: sarnathImg,
        alt: 'Dhamek Stupa ancient Buddhist monument at Sarnath near Varanasi',
        heroHighlight: 'The sacred deer park where Lord Buddha preached his First Sermon.',
        overview: 'Nestled in peaceful, green parklands just 10 kilometers northeast of Varanasi city, Sarnath is one of Buddhism\'s four primary global pilgrimage sites. Here, after attaining enlightenment under the Bodhi Tree in Bodh Gaya, Gautama Buddha delivered his first discourse (Dhammacakkappavattana Sutta) to his five disciples, setting the Wheel of Dhamma in motion.',
        attractions: [
            { name: 'Dhamek Stupa', desc: 'A monumental 43.6-meter tall cylindrical stone and brick stupa dating from the Gupta period, marking the sacred preaching spot of Lord Buddha.' },
            { name: 'Ashoka Pillar & Monastic Ruins', desc: 'Historic 3rd-century BC stone pillar fragments and surrounding foundation ruins of ancient Buddhist monasteries and viharas.' },
            { name: 'Archaeological Museum Sarnath', desc: 'India\'s oldest site museum, housing the original 3rd-century BC Lion Capital of Ashoka (National Emblem of India) and Buddha sculptures.' },
            { name: 'Mulagandha Kuti Vihar', desc: 'Modern Buddhist temple built by the Maha Bodhi Society featuring stunning Japanese frescoes depicting Buddha\'s life by artist Kosetsu Nosu.' },
            { name: 'Chaukhandi Stupa', desc: 'An ancient tiered brick stupa crowned with an octagonal Mughal tower constructed by Akbar to commemorate Emperor Humayun\'s visit.' }
        ],
        howToReach: {
            air: 'Varanasi Babatpur Airport (VNS) is approx. 25 km away; accessible in 35–45 minutes by direct cab.',
            train: 'Varanasi Junction (BSB) is 8 km away; local Sarnath passenger station also connects local shuttles.',
            road: 'Convenient 25–35 minute drive from Varanasi city center (Godowlia / Assi) via Ghazipur road by private AC taxi or auto.'
        },
        suggestedItinerary: [
            { day: 'Half Day', title: 'Buddhist Monument Walk & Archaeological Heritage', desc: '02:00 PM departure from Varanasi hotel, 02:45 PM visit to Dhamek Stupa and excavated ruins, 04:00 PM Archaeological Museum, 05:00 PM Mulagandha Kuti Vihar chanting, return by 06:15 PM.' }
        ],
        localTransport: {
            summary: 'Sarnath monuments are within comfortable walking distance of each other inside the archaeological precinct. E-rickshaws and battery cars are available for seniors.',
            modes: [
                'Walking: The central Deer Park and Dhamek Stupa zone is paved and peaceful for walking.',
                'Private AC Cab: The most comfortable round-trip mode from Varanasi with wait-and-return flexibility.'
            ]
        },
        practicalTips: [
            'The Archaeological Museum Sarnath is closed on Fridays; plan your visit accordingly.',
            'Maintain quiet and reverence around monastic ruins and meditation groves.',
            'Hire an approved monument guide inside the ticketed complex for accurate historical context.'
        ],
        faqs: [
            { q: 'Is Sarnath open on all days?', a: 'The Dhamek Stupa complex and Deer Park are open daily from sunrise to sunset. However, the Archaeological Museum is strictly closed on Fridays.' },
            { q: 'How much time is required to see Sarnath?', a: '3 to 4 hours are sufficient to explore the Dhamek Stupa, excavations, Museum, and modern international monasteries.' }
        ],
        relatedSlugs: ['varanasi', 'bodh-gaya']
    },
    {
        slug: 'ayodhya',
        name: 'Ayodhya Ji',
        title: 'Ayodhya Shri Ram Mandir Pilgrimage & Heritage Guide',
        tagline: 'The Sacred Birthplace of Maryada Purushottam Lord Rama',
        category: 'Spiritual & Pilgrimage',
        categories: ['Spiritual & Pilgrimage', 'Heritage & Culture', 'Multi-City Circuits'],
        distanceFromCenter: 'Approx. 215 km northwest of Varanasi',
        approxTravelTime: '3.5 - 4 Hours by Private Highway Cab',
        idealDays: '1 - 2 Days',
        bestTimeToVisit: 'October to March (Pleasant daytime temperatures)',
        image: ayodhyaImg,
        alt: 'Shri Ram Janmabhoomi Mandir sacred pilgrimage destination Ayodhya',
        heroHighlight: 'The ancient holy city on the banks of sacred Sarayu River.',
        overview: 'Ayodhya, situated along the holy Sarayu River, is one of the seven Moksha-giving holy cities (Sapta Puri) in Sanatana Dharma. Renowned as the historic capital of the ancient Kosala Kingdom and the revered birthplace of Lord Rama, the city has emerged as a major spiritual destination centered around the grand Shri Ram Janmabhoomi Mandir.',
        attractions: [
            { name: 'Shri Ram Janmabhoomi Temple', desc: 'The magnificent newly consecrated Nagara-style stone temple dedicated to Bhagwan Shri Ram Lalla.' },
            { name: 'Hanuman Garhi', desc: 'A 10th-century fortified hilltop temple dedicated to Lord Hanuman, traditionally visited by pilgrims first before entering Ram Janmabhoomi.' },
            { name: 'Kanak Bhawan', desc: 'A gilded architectural palace gifted to Mata Sita by Queen Kaikeyi, celebrated for its ornate courtyards and devotional atmosphere.' },
            { name: 'Sarayu River Ghats & Ram ki Paidi', desc: 'The sacred riverfront steps where thousands gather at dusk for the solemn Sarayu Sandhya Aarti and evening lighting.' },
            { name: 'Nageshwarnath Temple', desc: 'An ancient Shiva temple on the riverfront believed to have been established by Kush, son of Lord Rama.' }
        ],
        howToReach: {
            air: 'Maharishi Valmiki International Airport (AYJ) in Ayodhya connects major hubs; alternatively drive 3.5 hrs from Varanasi Airport.',
            train: 'Ayodhya Dham Junction (AY) and Ayodhya Cantt (AYC) have regular express and Vande Bharat trains connecting Varanasi and Lucknow.',
            road: 'Direct 4-lane highway route via NH-330 connecting Varanasi and Ayodhya in approximately 3.5 to 4 hours in a private AC cab.'
        },
        suggestedItinerary: [
            { day: 'Day 1', title: 'Hanuman Garhi, Ram Lalla Darshan & Sarayu Aarti', desc: '06:00 AM departure from Varanasi, 10:30 AM arrival in Ayodhya, morning darshan at Hanuman Garhi, afternoon darshan at Shri Ram Janmabhoomi Mandir and Kanak Bhawan, sunset Sarayu Aarti at Ram ki Paidi.' },
            { day: 'Day 2', title: 'Local Holy Shrines & Return Journey', desc: 'Morning darshan at Nageshwarnath, Dashrath Mahal, and Guptar Ghat before departing back to Varanasi or Lucknow.' }
        ],
        localTransport: {
            summary: 'The temple precinct around Ram Janmabhoomi is semi-pedestrianized with battery-operated electric carts available for seniors and families.',
            modes: [
                'E-Carts: Available along Ram Path and Bhakti Path for reaching temple gates.',
                'Private AC Cabs: Best for transfers between hotels, Ayodhya railway station, and Sarayu ghats.'
            ]
        },
        practicalTips: [
            'Security screening at Shri Ram Janmabhoomi is rigorous; avoid carrying electronic items, smart watches, bags, and metallic items into the queue.',
            'Devotees traveling from Varanasi on a day-trip should leave early by 05:30 AM to allow ample darshan time before afternoon queue pauses.'
        ],
        faqs: [
            { q: 'Is a same-day return trip from Varanasi to Ayodhya feasible?', a: 'Yes. With a private AC cab departing Varanasi by 05:30 AM, you arrive around 09:30 AM, complete darshan at Hanuman Garhi and Ram Janmabhoomi, attend the Sarayu aarti, and return to Varanasi by 10:30 PM.' },
            { q: 'Are wheelchairs available at Ram Janmabhoomi?', a: 'Yes, designated wheelchair pathways and assistance are provided for elderly pilgrims and individuals with reduced mobility.' }
        ],
        relatedSlugs: ['varanasi', 'prayagraj']
    },
    {
        slug: 'bodh-gaya',
        name: 'Bodh Gaya',
        title: 'Bodh Gaya UNESCO Buddhist Heritage & Mahabodhi Temple',
        tagline: 'The Sacred Land of Supreme Enlightenment',
        category: 'Buddhist Heritage',
        categories: ['Buddhist Heritage', 'Heritage & Culture', 'Multi-City Circuits'],
        distanceFromCenter: 'Approx. 250 km east of Varanasi',
        approxTravelTime: '5 Hours by Private Highway Cab',
        idealDays: '1 - 2 Days',
        bestTimeToVisit: 'October to March (Serene meditation climate & international pilgrims)',
        image: bodhgayaImg,
        alt: 'Mahabodhi Temple complex and sacred Bodhi tree at Bodh Gaya',
        heroHighlight: 'The UNESCO World Heritage Site where Siddhartha Gautama attained enlightenment.',
        overview: 'Bodh Gaya in Bihar is the supreme spiritual nucleus of global Buddhism. Under the sacred Bodhi Tree beside the soaring 5th-century Mahabodhi Temple, Prince Siddhartha Gautama sat in deep meditation and attained Supreme Enlightenment (Buddhatva), realizing the path to end universal suffering.',
        attractions: [
            { name: 'Mahabodhi Temple Complex', desc: 'A soaring 50-meter 5th-century stone temple and UNESCO World Heritage monument enshrining a golden statue of Buddha in earth-touching posture.' },
            { name: 'The Sacred Bodhi Tree & Vajrasana', desc: 'The holy peepal tree grown from a sapling of the original tree under which Lord Buddha meditated, alongside the Diamond Throne.' },
            { name: 'The 80-Foot Great Buddha Statue', desc: 'A colossal red granite and sandstone sculpture depicting Buddha seated in dhyana mudra atop a lotus pedestal.' },
            { name: 'International Monasteries', desc: 'Distinct cultural monasteries and pagodas built by Buddhist communities from Thailand, Bhutan, Japan, Sri Lanka, and Tibet.' },
            { name: 'Vishnupad Temple & Falgu River (Gaya)', desc: 'Located 12 km north in Gaya city, the historic riverside temple sacred for ancestral Pind Daan rituals.' }
        ],
        howToReach: {
            air: 'Gaya International Airport (GAY) is 10 km away; alternatively travel via 5-hour highway drive from Varanasi Airport.',
            train: 'Gaya Junction (16 km away) is a major mainline railway junction connected directly with Varanasi Junction.',
            road: 'Direct 4-lane highway drive along NH-19 (Grand Trunk Road) connecting Varanasi and Bodh Gaya in approximately 5 hours.'
        },
        suggestedItinerary: [
            { day: 'Day 1', title: 'Mahabodhi Sanctum & Sacred Bodhi Tree', desc: '06:00 AM departure from Varanasi, 11:30 AM arrival in Bodh Gaya, check-in, afternoon meditation at the Sacred Bodhi Tree and Mahabodhi Temple, evening walk through Thai and Japanese monasteries.' },
            { day: 'Day 2', title: 'Great Buddha Statue & Gaya Pind Daan / Return', desc: 'Morning visit to the 80-foot Buddha statue, optional ancestral Pind Daan rituals at Vishnupad Mandir in Gaya, afternoon drive back to Varanasi.' }
        ],
        localTransport: {
            summary: 'Bodh Gaya is a compact, peaceful pilgrimage town where temples and monasteries can be navigated via e-rickshaws, autos, or leisurely walking.',
            modes: [
                'E-Rickshaws: Readily available for hops between Mahabodhi Temple and international monasteries.',
                'Private AC Cabs: Essential for highway transit from Varanasi and excursions to Gaya Vishnupad Temple.'
            ]
        },
        practicalTips: [
            'Mobile phones and bags are not permitted inside the inner Mahabodhi Temple complex; secure locker counters are provided at the entrance.',
            'Footwear must be deposited at the outer gate; marble flooring can get chilly on winter mornings, so carrying clean socks is advisable.'
        ],
        faqs: [
            { q: 'Can Bodh Gaya and Gaya Pind Daan be covered together?', a: 'Yes, most pilgrims combine Bodh Gaya Buddhist meditation with ancestral Pind Daan rituals at Vishnupad Temple and Falgu River in Gaya.' }
        ],
        relatedSlugs: ['sarnath', 'varanasi']
    },
    {
        slug: 'prayagraj',
        name: 'Prayagraj (Allahabad)',
        title: 'Prayagraj Triveni Sangam & Sacred Teerthraj Guide',
        tagline: 'The Sacred Confluence of Ganga, Yamuna & Saraswati',
        category: 'Spiritual & Pilgrimage',
        categories: ['Spiritual & Pilgrimage', 'Heritage & Culture', 'Multi-City Circuits'],
        distanceFromCenter: 'Approx. 125 km west of Varanasi',
        approxTravelTime: '2.5 Hours by Highway AC Cab',
        idealDays: '1 Day Excursion',
        bestTimeToVisit: 'October to March (Magh Mela & pleasant river breezes)',
        image: prayagrajImg,
        alt: 'Holy Triveni Sangam confluence boats and ghats in Prayagraj',
        heroHighlight: 'The sacred Triveni Sangam, venue of the world-famous Maha Kumbh and Magh Mela.',
        overview: 'Prayagraj, historically celebrated as Prayag and Teerthraj (King of all Pilgrimage Centers), is consecrated at the sacred confluence of the muddy holy Ganges, deep blue Yamuna, and invisible celestial Saraswati rivers. Pilgrims travel from Kashi to take the holy snan (sacred bath) at the Sangam and offer prayers at Bade Hanuman Ji.',
        attractions: [
            { name: 'Triveni Sangam Holy Snan', desc: 'Wooden boat ride to the exact sacred meeting point of the contrasting river currents for prayers and the holy dip.' },
            { name: 'Shri Bade Hanuman Ji Mandir', desc: 'A subterranean riverside temple housing the colossal 20-foot reclining idol of Lord Hanuman, submerged during monsoon floods.' },
            { name: 'Akshayavat & Patalpuri Temple', desc: 'The ancient subterranean temple and immortal banyan tree revered across ancient puranas inside the Allahabad Fort ramparts.' },
            { name: 'Alopi Devi Shaktipeeth', desc: 'One of the revered 51 Shaktipeeths where the fingers of Goddess Sati are believed to have fallen, represented by an ornate wooden doli.' },
            { name: 'Anand Bhawan & Swaraj Bhawan', desc: 'The stately historical mansion and museum commemorating India\'s freedom movement.' }
        ],
        howToReach: {
            air: 'Prayagraj Airport (IXD) at Bamrauli connects major cities; Varanasi Airport is 125 km away.',
            train: 'Prayagraj Junction (PRYJ) is one of North India\'s primary rail hubs with constant superfast connectivity to Varanasi (2 hrs).',
            road: 'Smooth 4-to-6 lane National Highway 19 connects Varanasi and Prayagraj within 2.5 hours via private AC cab.'
        },
        suggestedItinerary: [
            { day: 'Day 1', title: 'Triveni Sangam Snan, Bade Hanuman & Fort Circuit', desc: '06:30 AM departure from Varanasi hotel, 09:00 AM arrival at Sangam, private wooden boat to confluence for holy snan, 11:30 AM Bade Hanuman Ji darshan, 01:00 PM lunch, 02:30 PM Alopi Devi Shaktipeeth and Anand Bhawan, return to Varanasi by 07:30 PM.' }
        ],
        localTransport: {
            summary: 'Boats are required to reach the middle Sangam confluence. For city sights, private AC cabs and local auto-rickshaws are widely used.',
            modes: [
                'Wooden Boats: Available at Qila Ghat and Sangam banks for visiting the confluence.',
                'Private AC Cabs: The most efficient way to link all scattered shrines comfortably in a single day.'
            ]
        },
        practicalTips: [
            'Agree upon boat rates clearly prior to boarding; during Magh Mela and major bathing days, fixed administration rates apply.',
            'Carry a change of dry clothes and waterproof pouches for mobile phones during the holy Sangam snan.'
        ],
        faqs: [
            { q: 'Is Prayagraj easily visited as a day trip from Varanasi?', a: 'Yes. Due to the high-speed NH-19 expressway, thousands of pilgrims complete a comfortable day trip departing at 06:30 AM and returning to Varanasi by dinner.' }
        ],
        relatedSlugs: ['varanasi', 'ayodhya']
    },
    {
        slug: 'mirzapur',
        name: 'Mirzapur Shaktipeeth Circuit',
        title: 'Maa Vindhyavasini, Kali Khoh & Ashtabhuja Shaktipeeth Guide',
        tagline: 'The Trio of Divine Shakti on the Sacred Vindhya Hills',
        category: 'Nature & Scenic Getaways',
        categories: ['Nature & Scenic Getaways', 'Spiritual & Pilgrimage'],
        distanceFromCenter: 'Approx. 65 km southwest of Varanasi',
        approxTravelTime: '1.5 Hours by Private Cab',
        idealDays: '1 Day Circuit',
        bestTimeToVisit: 'Throughout the year (Navratri festivals are especially vibrant)',
        image: mirzapurImg,
        alt: 'Maa Vindhyavasini temple and scenic Vindhya hills in Mirzapur',
        heroHighlight: 'The sacred Trikona Parikrama connecting Maa Vindhyavasini, Kali Khoh, and Ashtabhuja Devi.',
        overview: 'Situated along the Ganges and rugged Vindhyan hill range just 65 km southwest of Varanasi, Mirzapur hosts the sacred Shaktipeeth where Goddess Durga took residence. The traditional Trikon Yatra parikrama links Maa Vindhyavasini on the riverfront, Kali Khoh cave temple, and hilltop Ashtabhuja Devi, combined with the scenic 16th-century Chunar Fort ramparts.',
        attractions: [
            { name: 'Maa Vindhyavasini Temple', desc: 'One of the most active Shaktipeeths in North India, nestled right by the holy Vindhyachal Ganges ghats.' },
            { name: 'Kali Khoh Temple', desc: 'An ancient tantric shrine dedicated to Goddess Kali, situated in a scenic natural hill cave surrounded by forest streams.' },
            { name: 'Maa Ashtabhuja Devi Temple & Ropeway', desc: 'Hilltop shrine dedicated to the eight-armed sister of Lord Krishna, accessible via a modern ropeway with valley views.' },
            { name: 'Chunar Fort Ramparts', desc: 'A formidable historical fortress perched over the Ganges cliff, famous for King Vikramaditya legends and Sher Shah Suri.' }
        ],
        howToReach: {
            air: 'Varanasi Babatpur International Airport (VNS) is the nearest airport (approx. 70 km).',
            train: 'Mirzapur Railway Station (MZP) and Vindhyachal (BDL) are on the main Delhi-Howrah route.',
            road: 'Pleasant 1.5 hour highway drive from Varanasi via NH-35.'
        },
        suggestedItinerary: [
            { day: 'Day 1', title: 'Complete Trikona Parikrama & Chunar Fort Walk', desc: '07:30 AM departure from Varanasi, 09:00 AM Maa Vindhyavasini darshan, 10:30 AM Kali Khoh cave temple, 12:00 PM Ashtabhuja Devi via scenic ropeway, 02:00 PM lunch, 03:30 PM Chunar Fort exploration over the Ganges, return to Varanasi by 06:30 PM.' }
        ],
        localTransport: {
            summary: 'Private AC taxi is the only practical way to complete the dispersed hill shrines and Chunar Fort comfortably in a single day.',
            modes: [
                'Ropeway: Cable car operating between Ashtabhuja Devi and Kali Khoh hills.',
                'Private AC Cabs: Essential for round-trip hill transfers.'
            ]
        },
        practicalTips: [
            'During Chaitra and Sharadiya Navratri, temple queues can be lengthy; travel early in the morning.',
            'The ropeway offers scenic views across the Vindhyan valley and saves stairs for senior citizens.'
        ],
        faqs: [
            { q: 'What is the significance of the Trikona Yatra in Vindhyachal?', a: 'The sacred triangle connects the three aspects of the Supreme Mother: Mahalakshmi (Vindhyavasini), Mahakali (Kali Khoh), and Mahasaraswati (Ashtabhuja).' }
        ],
        relatedSlugs: ['varanasi', 'prayagraj']
    },
    {
        slug: 'lucknow',
        name: 'Lucknow (Awadh Heritage)',
        title: 'Lucknow Royal Awadh, Bara Imambara & Culinary Guide',
        tagline: 'The City of Nawabs, Tehzeeb & Chikan Embroidery',
        category: 'Heritage & Culture',
        categories: ['Heritage & Culture'],
        distanceFromCenter: 'Approx. 300 km northwest of Varanasi',
        approxTravelTime: '4.5 Hours by Highway AC Cab / Vande Bharat',
        idealDays: '1 - 2 Days',
        bestTimeToVisit: 'October to March (Cool weather ideal for monuments and street food)',
        image: lucknowImg,
        alt: 'Bara Imambara and Rumi Darwaza architectural heritage in Lucknow',
        heroHighlight: 'Spectacular Mughal-Awadhi architecture, refined hospitality, and legendary gastronomy.',
        overview: 'The capital of Uttar Pradesh, Lucknow is celebrated globally for its magnificent Nawabi architectural landmarks, exquisite Lakhnawi Chikankari needlework, refined cultural etiquette (Tehzeeb), and royal Awadhi culinary traditions. It serves as an ideal extended heritage circuit from Varanasi and Ayodhya.',
        attractions: [
            { name: 'Bara Imambara & Bhool Bhulaiya', desc: 'Colossal 18th-century architectural marvel featuring an unsupported central arched hall and famous labyrinth of passageways.' },
            { name: 'Rumi Darwaza', desc: 'The 60-foot soaring triumphal gateway modeled after the historic Sublime Porte in Istanbul.' },
            { name: 'Chota Imambara', desc: 'Ornate palace of lights adorned with Belgian crystal chandeliers, calligraphy, and gilded domes.' },
            { name: 'Hazratganj & Chowk Heritage Markets', desc: 'Historic shopping boulevards celebrated for authentic handmade Chikankari garments, attar, and culinary heritage.' }
        ],
        howToReach: {
            air: 'Chaudhary Charan Singh International Airport (LKO) connects all domestic and international hubs.',
            train: 'Lucknow Charbagh (LKO/LJN) offers multiple daily express and Vande Bharat connections to Varanasi (approx 4 hrs).',
            road: 'Fast 4.5-hour highway drive from Varanasi via Purvanchal Expressway and NH-30.'
        },
        suggestedItinerary: [
            { day: 'Day 1', title: 'Awadhi Monuments & Heritage Street Walk', desc: 'Morning visit to Bara Imambara and Bhool Bhulaiya maze, walk through Rumi Darwaza to Chota Imambara, afternoon Chikan shopping in Chowk, evening culinary walk in Aminabad.' },
            { day: 'Day 2', title: 'British Residency, La Martiniere & Departure', desc: 'Morning historical walk through the 1857 British Residency ruins and La Martiniere College architecture before departure.' }
        ],
        localTransport: {
            summary: 'Modern metro, app-cabs, auto-rickshaws, and private cabs make navigating Lucknow comfortable.',
            modes: [
                'Lucknow Metro: Efficient for airport and central railway transit.',
                'Private AC Cabs: Most convenient for covering monuments and heritage markets.'
            ]
        },
        practicalTips: [
            'Hire an authorized monument guide at Bara Imambara to navigate the Bhool Bhulaiya labyrinth safely.',
            'Monuments close before dusk; start your heritage visits by 09:30 AM.'
        ],
        faqs: [
            { q: 'Can Lucknow be combined with Ayodhya and Varanasi?', a: 'Yes, the Lucknow-Ayodhya-Varanasi circuit is one of the most popular heritage and cultural routes in Northern India.' }
        ],
        relatedSlugs: ['ayodhya', 'varanasi']
    },
    {
        slug: 'ujjain',
        name: 'Ujjain (Mahakaleshwar)',
        title: 'Ujjain Mahakal Jyotirlinga & Sacred Kshipra Guide',
        tagline: 'The Eternal City of Time and Lord Mahakaleshwar',
        category: 'Spiritual & Pilgrimage',
        categories: ['Spiritual & Pilgrimage', 'Multi-City Circuits'],
        distanceFromCenter: 'Central India Jyotirlinga Circuit',
        approxTravelTime: 'Connected via Direct Rail / Express Routes',
        idealDays: '1 - 2 Days',
        bestTimeToVisit: 'October to March (Comfortable temple queues & pleasant climate)',
        image: ujjainImg,
        alt: 'Shri Mahakaleshwar Jyotirlinga and Mahakal Lok corridor in Ujjain',
        heroHighlight: 'The only south-facing (Dakshinmukhi) Jyotirlinga and venue of the world-famous Bhasma Aarti.',
        overview: 'Ujjain in Madhya Pradesh, perched on the banks of the sacred Shipra River, is celebrated as one of the seven Moksha-giving holy cities (Sapta Puri) alongside Kashi. It houses Lord Mahakaleshwar—the master of time and death—and features the magnificent Shri Mahakal Lok corridor.',
        attractions: [
            { name: 'Shri Mahakaleshwar Jyotirlinga', desc: 'The sacred Swayambhu Jyotirlinga renowned for the pre-dawn Bhasma Aarti performed with sacred ash.' },
            { name: 'Shri Mahakal Lok Corridor', desc: 'One of India\'s largest temple corridors depicting stories of Lord Shiva through 108 grand murals, statues, and fountains.' },
            { name: 'Kaal Bhairav Ujjain', desc: 'Ancient guardian temple where traditional offerings are made to the deity according to ancient tantric customs.' },
            { name: 'Ram Ghat on River Shipra', desc: 'The holy riverfront steps where millions bathe during the Simhastha Kumbh and attend the evening Shipra Aarti.' }
        ],
        howToReach: {
            air: 'Devi Ahilyabai Holkar Airport in Indore (55 km away) has direct flights from Delhi, Mumbai, and Varanasi.',
            train: 'Ujjain Junction (UJN) connects directly with Varanasi Junction via express rail lines.',
            road: 'Connected via multi-lane national highways across Central India.'
        },
        suggestedItinerary: [
            { day: 'Day 1', title: 'Mahakal Darshan & Mahakal Lok Corridor', desc: 'Early morning Bhasma Aarti / General Darshan at Mahakaleshwar, afternoon exploration of Mahakal Lok corridor sculptures, sunset aarti at Ram Ghat.' },
            { day: 'Day 2', title: 'Kaal Bhairav, Harsiddhi & Gadkalika', desc: 'Morning darshan at Kaal Bhairav Mandir, Harsiddhi Shaktipeeth, and Sandipani Ashram before onward journey.' }
        ],
        localTransport: {
            summary: 'E-rickshaws and auto-rickshaws are abundant throughout Ujjain. The Mahakal Lok corridor has dedicated electric buggies for seniors.',
            modes: [
                'Electric Carts: Operating within the Mahakal Lok complex for elder devotees.',
                'Private AC Cabs: Recommended for transfers between Indore Airport and Ujjain.'
            ]
        },
        practicalTips: [
            'Bhasma Aarti requires prior advance registration via the official Shri Mahakaleshwar Temple Management Committee portal.',
            'Traditional dress code (dhoti-kurta for men, saree for women) is mandatory for entering the inner sanctum during specific rituals.'
        ],
        faqs: [
            { q: 'How does Kashi connect to Ujjain?', a: 'Both Kashi Vishwanath and Ujjain Mahakaleshwar are prime Jyotirlingas, frequently combined by devotees in sacred all-India Shiva pilgrimage itineraries.' }
        ],
        relatedSlugs: ['varanasi']
    }
];

export const getDestinationBySlug = (slug) => {
    return DESTINATIONS.find(d => d.slug === slug) || null;
};
