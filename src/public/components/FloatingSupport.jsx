import React, { useState, useEffect, lazy, Suspense } from 'react';
import { trackWhatsAppClick, trackCallClick } from '../utils/analytics';
import { WHATSAPP_URL, PHONE_URL } from '../../shared/config/brand';

const CustomerAssistant = lazy(() => import('./ai/CustomerAssistant'));

/**
 * FloatingSupport - Animated Speed Dial Floating Action Hub (FAB)
 * 
 * Expands smoothly into:
 * - 💬 WhatsApp
 * - 📞 Call Help
 * - 🛕 Plan with AI
 * - ▲ Back to Top
 */
export default function FloatingSupport() {
    const [isOpen, setIsOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isAssistantOpen, setIsAssistantOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 350) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        const handleOpenAi = () => {
            setIsAssistantOpen(true);
            setIsOpen(false);
        };

        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('open-ai-assistant', handleOpenAi);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('open-ai-assistant', handleOpenAi);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsOpen(false);
    };

    const handleOpenAiAssistant = () => {
        setIsAssistantOpen(true);
        setIsOpen(false);
    };

    return (
        <>
            {/* Backdrop Dismiss Catcher when Speed Dial is open */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-stone-900/25 backdrop-blur-[2px] transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            <aside 
                aria-label="Floating Quick Support Hub" 
                className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none"
            >
                {/* SPEED DIAL EXPANDED MENU ITEMS */}
                <div 
                    className={`flex flex-col items-end gap-3 mb-3 transition-all duration-300 origin-bottom-right ${
                        isOpen 
                            ? 'opacity-100 scale-100 pointer-events-auto translate-y-0' 
                            : 'opacity-0 scale-90 pointer-events-none translate-y-6'
                    }`}
                >
                    {/* 1. Scroll Back to Top (Visible if user has scrolled) */}
                    {showScrollTop && (
                        <button
                            type="button"
                            onClick={scrollToTop}
                            className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white px-3.5 py-2.5 rounded-full shadow-xl border border-stone-700 text-xs font-semibold cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 group"
                            aria-label="Scroll back to top"
                        >
                            <span className="text-[11px] font-medium text-stone-300 group-hover:text-white">
                                Back to Top
                            </span>
                            <div className="w-6 h-6 rounded-full bg-stone-800 flex items-center justify-center text-amber-400 group-hover:text-white">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                </svg>
                            </div>
                        </button>
                    )}

                    {/* 2. Plan with AI Assistant */}
                    <button
                        type="button"
                        onClick={handleOpenAiAssistant}
                        className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-600 hover:to-amber-500 text-stone-950 font-bold px-4 py-2.5 rounded-full shadow-xl border border-amber-300 text-xs cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 group"
                        aria-label="Plan with AI Assistant"
                    >
                        <span className="text-xs font-bold tracking-wide">
                            Plan with AI
                        </span>
                        <div className="w-6 h-6 rounded-full bg-amber-600/20 flex items-center justify-center text-sm">
                            🛕
                        </div>
                    </button>

                    {/* 3. Call Helpline */}
                    <a
                        href={PHONE_URL}
                        onClick={() => {
                            trackCallClick('floating_support_fab');
                            setIsOpen(false);
                        }}
                        className="flex items-center gap-2 bg-stone-900 hover:bg-stone-850 text-white font-semibold px-4 py-2.5 rounded-full shadow-xl border border-stone-700 text-xs cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 group"
                        aria-label="Call Kashi-Vashi Helpline"
                    >
                        <span className="text-xs font-semibold text-stone-200 group-hover:text-white">
                            Call Help
                        </span>
                        <div className="w-6 h-6 rounded-full bg-stone-800 flex items-center justify-center text-amber-400">
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M21.384 17.791c-1.115-1.115-2.6-1.115-3.715 0l-.821.821c-.151.151-.377.197-.577.121-2.282-.873-4.14-2.732-5.014-5.014-.076-.2-.03-.426.121-.577l.821-.821c1.115-1.115 1.115-2.6 0-3.715L10.36 6.769C9.245 5.654 7.6 5.654 6.485 6.769l-.821.821c-1.354 1.354-1.815 3.324-1.189 5.176 1.488 4.407 4.966 7.886 9.373 9.373 1.853.626 3.823.165 5.176-1.189l.821-.821c1.115-1.115 1.115-2.6 0-3.715l-1.838-1.838z"/>
                            </svg>
                        </div>
                    </a>

                    {/* 4. WhatsApp Quick Chat */}
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                            trackWhatsAppClick('floating_support_fab');
                            setIsOpen(false);
                        }}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-full shadow-xl border border-emerald-500 text-xs cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 group"
                        aria-label="Chat on WhatsApp"
                    >
                        <span className="text-xs font-bold tracking-wide">
                            WhatsApp
                        </span>
                        <div className="w-6 h-6 rounded-full bg-emerald-700/60 flex items-center justify-center text-white">
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.488 1.449 5.412 1.451 5.428 0 9.845-4.414 9.848-9.847.002-2.632-1.023-5.105-2.887-6.97C17.152 1.922 14.68 .898 12.01 .898c-5.43 0-9.847 4.414-9.85 9.849-.001 1.932.501 3.815 1.455 5.421L2.642 22.28l6.005-1.574zM17.92 14.87c-.318-.16-1.877-.926-2.162-1.03-.285-.104-.493-.155-.7.156-.207.31-.8.926-.98 1.132-.18.207-.36.233-.678.074-1.69-.844-2.8-1.522-3.922-3.447-.297-.51.297-.474.85-1.583.093-.187.047-.35-.023-.454-.07-.104-.7-1.682-.958-2.306-.252-.603-.509-.522-.7-.522-.181-.001-.389-.001-.597-.001-.207 0-.544.078-.83.392-.285.31-1.088 1.065-1.088 2.597 0 1.532 1.114 3.013 1.27 3.22.155.207 2.193 3.349 5.313 4.699.742.32 1.322.512 1.774.656.745.237 1.423.204 1.959.124.598-.09 1.877-.767 2.137-1.474.26-.707.26-1.316.182-1.443-.078-.127-.285-.207-.604-.367z" />
                            </svg>
                        </div>
                    </a>
                </div>

                {/* MAIN SPEED DIAL CIRCULAR TOGGLE BUTTON (FAB) */}
                <div className="relative">
                    {/* Subtle pulse indicator when closed */}
                    {!isOpen && (
                        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 z-10">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
                        </span>
                    )}

                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        aria-label={isOpen ? "Close Quick Support Menu" : "Open Quick Support Menu"}
                        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 transform active:scale-95 ${
                            isOpen 
                                ? 'bg-stone-900 text-white rotate-90 border-2 border-stone-700 hover:bg-stone-800' 
                                : 'bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 hover:from-amber-700 hover:to-amber-500 text-stone-950 border-2 border-amber-300 hover:scale-105'
                        }`}
                        style={{
                            boxShadow: isOpen 
                                ? '0 12px 28px -5px rgba(0, 0, 0, 0.4)' 
                                : '0 12px 30px -5px rgba(217, 119, 6, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.4) inset'
                        }}
                    >
                        {isOpen ? (
                            /* Close Icon (X) */
                            <svg className="w-6 h-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            /* Support / Chat Icon */
                            <svg className="w-6 h-6 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Lazy-Loaded Customer Assistant Modal */}
                {isAssistantOpen && (
                    <Suspense fallback={null}>
                        <CustomerAssistant
                            isOpen={isAssistantOpen}
                            onClose={() => setIsAssistantOpen(false)}
                        />
                    </Suspense>
                )}
            </aside>
        </>
    );
}
