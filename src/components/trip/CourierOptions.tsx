/**
 * CourierOptions Component
 * Display courier service options for delivery - matches RideOptions design
 */

'use client';

import { useState } from 'react';
import { PaymentMethodModal } from './PaymentMethodModal';
import courierData from '@/mocks/couriers.json';

interface CourierOption {
    id: string;
    name: string;
    description: string;
    time: string;
    weight: string;
    price: number;
    image: string;
}

interface CourierOptionsProps {
    onSelect: (courierId: string) => void;
    selectedCourier?: string;
}

export function CourierOptions({ onSelect, selectedCourier }: CourierOptionsProps) {
    const couriers: CourierOption[] = Object.values(courierData);
    const [selectedCourierLocal, setSelectedCourierLocal] = useState(selectedCourier || couriers[0].id);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState({ type: 'Personal', label: 'Cash' });

    const handlePaymentSelect = (method: string) => {
        let label = 'Cash';
        if (method === 'card') label = '•••• 4242';
        else if (method === 'paypal') label = 'PayPal';

        setSelectedPayment({ type: 'Personal', label });
        setShowPaymentModal(false);
    };

    const handleRequest = () => {
        onSelect(selectedCourierLocal);
    };

    return (
        <div className="flex flex-col h-full bg-white relative">
            {/* Header - Hide on mobile when in bottom sheet */}
            <div className="hidden lg:block px-8 pt-8 pb-4">
                <h2 className="text-[36px] font-bold text-black mb-2 tracking-tight leading-none">Choose an option</h2>
                <p className="text-[18px] text-black font-bold">Delivery options we think you'll like</p>
            </div>

            {/* Courier List */}
            <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-2 space-y-2 sm:space-y-4 pb-32">
                {couriers.map((courier) => (
                    <button
                        key={courier.id}
                        onClick={() => setSelectedCourierLocal(courier.id)}
                        className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 transition-all relative ${selectedCourierLocal === courier.id
                                ? 'border-black bg-gray-50'
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0">
                            {/* Courier Icon */}
                            <div className="w-16 h-12 sm:w-24 sm:h-16 lg:w-28 lg:h-16 relative flex-shrink-0">
                                <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
                                    {/* Courier person icon */}
                                    <svg className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        <path d="M18 8h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z" opacity="0.5" />
                                    </svg>
                                </div>
                            </div>

                            <div className="text-left flex-1 min-w-0">
                                {/* Name */}
                                <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                                    <span className="font-bold text-base sm:text-lg lg:text-[22px] text-black truncate">
                                        {courier.name}
                                    </span>
                                </div>

                                {/* Time and Weight */}
                                <div className="text-xs sm:text-sm text-gray-600 mb-1">
                                    <span>{courier.time}</span> • <span>{courier.weight}</span>
                                </div>

                                {/* Description - Hide on mobile */}
                                <p className="hidden sm:block text-sm text-gray-500 truncate">
                                    Send packages up to 30 lbs
                                </p>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="text-right self-start mt-0.5 sm:mt-1 flex-shrink-0 ml-2">
                            <span className="font-bold text-lg sm:text-xl lg:text-[22px] text-black">${courier.price.toFixed(2)}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Sticky Footer - Hide on mobile (in bottom sheet) */}
            <div className="hidden lg:block absolute bottom-6 left-6 right-6 p-4 bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_rgba(0,0,0,0.15)] transition-shadow duration-300 z-20 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-4">
                    {/* Payment Selector */}
                    <div
                        onClick={() => setShowPaymentModal(true)}
                        className="flex-1 flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] font-bold text-black leading-tight">{selectedPayment.type}</span>
                                <span className="text-[12px] text-gray-500 leading-tight">{selectedPayment.label}</span>
                            </div>
                        </div>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {/* Request Button */}
                    <button
                        onClick={handleRequest}
                        className="flex-[2] bg-black text-white py-4 rounded-xl text-[20px] font-bold hover:bg-gray-800 transition-colors shadow-lg flex items-center justify-center gap-3"
                    >
                        <span>Request {couriers.find(c => c.id === selectedCourierLocal)?.name}</span>
                    </button>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <PaymentMethodModal
                    isOpen={showPaymentModal}
                    onClose={() => setShowPaymentModal(false)}
                    onSelect={handlePaymentSelect}
                />
            )}
        </div>
    );
}
