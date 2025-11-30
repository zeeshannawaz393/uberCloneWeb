
'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentMethodModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (method: string) => void;
}

type View = 'list' | 'add-gift-card' | 'add-paypal';

export function PaymentMethodModal({ isOpen, onClose, onSelect }: PaymentMethodModalProps) {
    const [mounted, setMounted] = useState(false);
    const [view, setView] = useState<View>('list');
    const [giftCode, setGiftCode] = useState('');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Detect viewport size
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => {
            setMounted(false);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const handleBack = () => {
        setView('list');
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
                        onClick={onClose}
                    />

                    {/* Modal Container - Bottom Sheet on Mobile, Centered Modal on Desktop */}
                    <div className={`fixed z-[100] pointer-events-none ${isMobile
                            ? 'inset-x-0 bottom-0'
                            : 'inset-0 flex items-center justify-center'
                        }`}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
                            className={`bg-white shadow-2xl overflow-hidden pointer-events-auto ${isMobile
                                    ? 'w-full rounded-t-3xl max-h-[90vh]'
                                    : 'w-[480px] rounded-2xl'
                                }`}
                        >
                            {/* Drag Handle (Mobile Only) */}
                            {isMobile && (
                                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-2" />
                            )}
                            {view === 'list' && (
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-black">Add a payment method</h3>
                                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                                            <div className="flex items-center gap-4">
                                                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                                                </svg>
                                                <span className="text-[16px] font-medium text-black">Credit or debit card</span>
                                            </div>
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={() => setView('add-paypal')}
                                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <svg className="w-6 h-6 text-[#003087]" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M7.076 21.337l.756-3.883h2.606c3.854 0 6.666-2.725 6.666-6.556 0-3.275-2.253-6.142-6.308-6.142H4.119a.935.935 0 0 0-.935.935l-1.65 11.166a.466.466 0 0 0 .466.534h3.916a.466.466 0 0 0 .466-.466l.694-3.588z" />
                                                </svg>
                                                <span className="text-[16px] font-medium text-black">PayPal</span>
                                            </div>
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={() => setView('add-gift-card')}
                                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
                                                </svg>
                                                <span className="text-[16px] font-medium text-black">Gift card</span>
                                            </div>
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {view === 'add-gift-card' && (
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full -ml-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <h3 className="text-xl font-bold text-black">Add gift card</h3>
                                        </div>
                                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="mb-6">
                                        <div className="bg-gray-100 h-32 rounded-xl flex items-center justify-center mb-6">
                                            <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4">Note: Gift cards are not eligible to be applied to Uber Eats Grocery orders.</p>
                                        <input
                                            type="text"
                                            value={giftCode}
                                            onChange={(e) => setGiftCode(e.target.value)}
                                            placeholder="Enter your code"
                                            className="w-full px-4 py-3 bg-[#F3F3F3] rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                                        />
                                    </div>

                                    <button
                                        disabled={!giftCode}
                                        className={`w-full py-3.5 rounded-lg text-[16px] font-semibold transition-colors ${giftCode ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        Apply
                                    </button>
                                </div>
                            )}

                            {view === 'add-paypal' && (
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full -ml-2">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <h3 className="text-xl font-bold text-black">Add PayPal</h3>
                                        </div>
                                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="mb-8">
                                        <p className="text-[16px] text-black">You will be re-directed to PayPal to verify your account.</p>
                                    </div>

                                    <button
                                        className="w-full py-3.5 rounded-lg text-[16px] font-bold bg-[#FFC439] text-black hover:bg-[#F4BB33] transition-colors"
                                    >
                                        PayPal
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
