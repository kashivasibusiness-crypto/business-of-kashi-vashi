import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../seo/SEO';
import Breadcrumb from '../components/Breadcrumb';
import guideImgAvif from '../../assets/services/srv-guide.avif';
import guideImgJpg from '../../assets/services/srv-guide.jpg';
import travelGuideImgAvif from '../../assets/services/srv-boat-aarti.avif';
import travelGuideImgJpg from '../../assets/services/srv-boat-aarti.jpg';
import { DISPLAY_PHONE, PHONE_URL, WHATSAPP_RAW_NUMBER } from '../../shared/config/brand';
import { trackWhatsAppClick } from '../utils/analytics';

export default function GuidesHubPage() {
    const handleWhatsAppInquiry = () => {
        trackWhatsAppClick('guides_hub_cta');
        const text = encodeURIComponent(
            'Namaste Kashi Vashi! I am exploring your Guides section and would like advice on hiring a personal local guide or planning my Varanasi trip.'
        );
        window.open(`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="bg-stone-50 min-h-screen text-stone-800">
            <SEO
                title="Guides | Personal Local Guide & Varanasi Travel Handbook | Kashi Vashi"
                description="Explore Varanasi with confidence. Choose between hiring a verified, multi-lingual personal local tour guide or reading our comprehensive Varanasi travel handbook with itineraries and timings."
                pathname="/guides"
            />

            {/* Breadcrumb Header */}
            <div className="bg-white border-b border-stone-200/80 py-3.5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <Breadcrumb
                        items={[
                            { label: 'Home', path: '/' },
                            { label: 'Guides', path: '/guides' }
                        ]}
                    />
                </div>
            </div>

            {/* Hero Section */}
            <section className="pt-12 pb-8 sm:pt-16 sm:pb-12 text-center max-w-4xl mx-auto px-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-100 text-amber-700 border border-amber-300 shadow-xs mb-5">
                    <span className="text-2xl" role="img" aria-label="Compass">🧭</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight">
                    Guides
                </h1>
                
                <p className="mt-3 text-lg sm:text-xl font-serif text-amber-800 font-semibold">
                    दो स्पष्ट विकल्प • Two Clear Options
                </p>

                <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
                    चाहे आपको काशी की गलियों और मंदिरों के लिए एक प्रमाणित पर्सनल गाइड की आवश्यकता हो, 
                    या फिर यात्रा की पूरी तैयारी के लिए वाराणसी ट्रैवल गाइड — अपनी सुविधा अनुसार उपयुक्त विकल्प चुनें।
                </p>
            </section>

            {/* Two Clear Options Cards */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    
                    {/* OPTION 1: Personal Guide */}
                    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
                        <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-900">
                            <picture>
                                <source srcSet={guideImgAvif} type="image/avif" />
                                <img
                                    src={guideImgJpg}
                                    alt="Personal Local Guide in Varanasi with Travelers"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="eager"
                                />
                            </picture>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute top-4 left-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-md">
                                    <span>🧑‍💼</span> Verified Local Escort
                                </span>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300">
                                    Option 1 • गाइड सेवा एवं पूछताछ (Guide Inquiry)
                                </span>
                                <h2 className="text-2xl font-serif font-bold text-white mt-0.5">
                                    Personal Guide
                                </h2>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                            <div>
                                <p className="text-sm sm:text-base font-medium text-stone-800 leading-relaxed">
                                    गाइड की जानकारी, उपलब्ध भाषाएँ, अवधि, कीमत और बुकिंग।
                                </p>
                                <p className="text-xs sm:text-sm text-stone-500 mt-2 leading-relaxed">
                                    काशी विश्वनाथ धाम, मणिकर्णिका, दशाश्वमेध और सारनाथ के लिए पहचान-सत्यापित, 
                                    सभ्य और अनुभवी स्थानीय गाइड। आपकी भाषा में पूरी प्रामाणिक जानकारी और सुगम दर्शन सहायता।
                                </p>

                                <div className="mt-5 space-y-2 border-t border-stone-100 pt-4 text-xs sm:text-sm text-stone-700">
                                    <div className="flex items-center gap-2">
                                        <span className="text-emerald-600 font-bold">✓</span>
                                        <span>पहचान-सत्यापित गाइड और ज़ीरो कमीशन बाजी नीति (Strict Zero Tout Policy)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-emerald-600 font-bold">✓</span>
                                        <span>हिंदी, अंग्रेजी, बंगाली, तमिल, तेलुगु एवं अन्य क्षेत्रीय भाषाएँ</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-emerald-600 font-bold">✓</span>
                                        <span>हाफ-डे (4 घंटे) एवं फुल-डे (8 घंटे) सुविधाजनक स्लॉट्स</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                                <Link
                                    to="/guides/personal-guide"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-colors"
                                >
                                    <span>Book a Guide</span>
                                    <span>→</span>
                                </Link>
                                <span className="text-xs font-mono text-stone-400">
                                    /guides/personal-guide
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* OPTION 2: Varanasi Travel Guide */}
                    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
                        <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-900">
                            <picture>
                                <source srcSet={travelGuideImgAvif} type="image/avif" />
                                <img
                                    src={travelGuideImgJpg}
                                    alt="Varanasi Ganga Ghats and Morning Boat Ride"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    loading="eager"
                                />
                            </picture>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute top-4 left-4">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-600 text-white shadow-md">
                                    <span>📖</span> Travel Handbook & Advice
                                </span>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <span className="text-xs uppercase tracking-wider font-semibold text-amber-300">
                                    Option 2 • यात्रा मार्गदर्शिका
                                </span>
                                <h2 className="text-2xl font-serif font-bold text-white mt-0.5">
                                    Varanasi Travel Guide
                                </h2>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                            <div>
                                <p className="text-sm sm:text-base font-medium text-stone-800 leading-relaxed">
                                    घूमने का सही समय, दर्शनीय स्थल, यात्रा मार्ग और इटिनरेरी।
                                </p>
                                <p className="text-xs sm:text-sm text-stone-500 mt-2 leading-relaxed">
                                    स्थानीय निवासियों द्वारा तैयार की गई संपूर्ण मार्गदर्शिका। 
                                    मौसम, घाटों के नियम, सुबह व शाम की आरती का समय, आवागमन के साधन और दिन-वार सुझाई गई यात्रा योजनाएँ।
                                </p>

                                <div className="mt-5 space-y-2 border-t border-stone-100 pt-4 text-xs sm:text-sm text-stone-700">
                                    <div className="flex items-center gap-2">
                                        <span className="text-amber-600 font-bold">✓</span>
                                        <span>घूमने का सबसे उत्तम समय, मौसम और प्रमुख त्योहारों की जानकारी</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-amber-600 font-bold">✓</span>
                                        <span>हवाई, रेल एवं सड़क मार्ग से वाराणसी पहुँचने के सीधे विकल्प</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-amber-600 font-bold">✓</span>
                                        <span>1-दिन, 2-दिन और 3-दिवसीय व्यवस्थित यात्रा इटिनरेरी</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                                <Link
                                    to="/travel-guide"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-colors"
                                >
                                    <span>Plan Your Visit</span>
                                    <span>→</span>
                                </Link>
                                <span className="text-xs font-mono text-stone-400">
                                    /travel-guide
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Quick Comparison Section */}
            <section className="bg-stone-100 border-t border-stone-200/80 py-12 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-center text-stone-900 mb-6">
                        दोनों में क्या अंतर है? • Quick Comparison
                    </h3>
                    
                    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden text-xs sm:text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200">
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-emerald-700 font-bold text-base mb-2">
                                    <span>🧑‍💼</span>
                                    <h4>Personal Guide (व्यक्तिगत गाइड)</h4>
                                </div>
                                <p className="text-stone-600 mb-3">
                                    जब आप काशी में व्यक्तिगत रूप से एक स्थानीय गाइड के साथ घूमना चाहते हैं, जो आपको घाटों की कहानियाँ सुनाए, मंदिर दर्शन में कतार व्यवस्थित कराए और भीड़ में सुरक्षित रखे।
                                </p>
                                <ul className="space-y-1.5 text-stone-700 font-medium">
                                    <li>• लाइव एस्कॉर्ट और दर्शन सहयोग</li>
                                    <li>• निजी परिवार या समूह के लिए समर्पित</li>
                                    <li>• भाषाओं में विशेषज्ञता</li>
                                </ul>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-2 text-amber-700 font-bold text-base mb-2">
                                    <span>📖</span>
                                    <h4>Varanasi Travel Guide (ट्रैवल हैंडबुक)</h4>
                                </div>
                                <p className="text-stone-600 mb-3">
                                    जब आप अपनी यात्रा की योजना स्वयं बना रहे हों और आपको होटल, मौसम, सही समय, बजट, घाटों के नियम और दिन-वार शेड्यूल की सटीक जानकारी पढ़नी हो।
                                </p>
                                <ul className="space-y-1.5 text-stone-700 font-medium">
                                    <li>• 100% निःशुल्क ऑनलाइन गाइड व ब्लॉग</li>
                                    <li>• दिन-वार इटिनरेरी और रूट सलाह</li>
                                    <li>• स्थानीय यात्रा टिप्स एवं सावधानियाँ</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Need Custom Guidance CTA */}
            <section className="bg-stone-900 text-stone-200 py-12 px-4 sm:px-6 border-t border-stone-800">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                        Need Assistance?
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                        कोई प्रश्न या विशेष आवश्यकता है?
                    </h3>
                    <p className="text-stone-400 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
                        हमारी स्थानीय टीम आपके समय, परिवार की आवश्यकताओं और भाषा के अनुकूल गाइड व संपूर्ण यात्रा पैकेज तैयार करने में सहायता के लिए सदैव तत्पर है।
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
                        <button
                            type="button"
                            onClick={handleWhatsAppInquiry}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition shadow-md"
                        >
                            <span>💬 WhatsApp पर पूछें</span>
                        </button>
                        <a
                            href={PHONE_URL}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white font-bold text-xs sm:text-sm border border-stone-700 transition"
                        >
                            <span>📞 Call: {DISPLAY_PHONE}</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

