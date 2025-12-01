'use client';

import { useState } from 'react';
import { BaseModal } from '@/components/common/BaseModal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface PaymentMethodModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (method: string) => void;
}

type View = 'list' | 'add-gift-card' | 'add-paypal';

export function PaymentMethodModal({ isOpen, onClose, onSelect }: PaymentMethodModalProps) {
    const [view, setView] = useState<View>('list');
    const [giftCode, setGiftCode] = useState('');

    const handleBack = () => {
        setView('list');
    };

    const handleClose = () => {
        setView('list');
        onClose();
    };

    const getTitle = () => {
        switch (view) {
            case 'add-gift-card':
                return 'Add gift card';
            case 'add-paypal':
                return 'Add PayPal';
            default:
                return 'Add a payment method';
        }
    };

    const footer = () => {
        if (view === 'add-gift-card') {
            return (
                <Button
                    variant="solid"
                    size="lg"
                    onClick={() => { }}
                    disabled={!giftCode}
                    className="w-full"
                >
                    Apply
                </Button>
            );
        }
        if (view === 'add-paypal') {
            return (
                <button
                    className="w-full py-4 rounded-xl text-lg font-bold bg-[#FFC439] text-black hover:bg-[#F4BB33] transition-colors"
                >
                    PayPal
                </button>
            );
        }
        return null;
    };

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={handleClose}
            title={getTitle()}
            showBackButton={view !== 'list'}
            onBack={handleBack}
            showHeaderBorder={false}
            showFooterBorder={view !== 'list'}
            footer={footer()}
            size="md"
        >
            {view === 'list' && (
                <div className="p-6">
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
                    <div className="bg-gray-100 h-32 rounded-xl flex items-center justify-center mb-6">
                        <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
                        </svg>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Note: Gift cards are not eligible to be applied to Uber Eats Grocery orders.</p>
                    <Input
                        variant="filled"
                        value={giftCode}
                        onChange={(e) => setGiftCode(e.target.value)}
                        placeholder="Enter your code"
                    />
                </div>
            )}

            {view === 'add-paypal' && (
                <div className="p-6">
                    <p className="text-[16px] text-black">You will be re-directed to PayPal to verify your account.</p>
                </div>
            )}
        </BaseModal>
    );
}
