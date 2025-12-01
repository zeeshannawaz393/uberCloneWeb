'use client';

import { useState } from 'react';
import { PaymentMethodModal } from './PaymentMethodModal';

interface RideOptionsProps {
    onRequestClick: () => void;
    pickup: string;
}

export function RideOptions({ onRequestClick, pickup }: RideOptionsProps) {
    const [selectedRide, setSelectedRide] = useState('UberX');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState({ type: 'Personal', label: 'Cash' });
    const [isRequesting, setIsRequesting] = useState(false);

    const rideTypes = [
        {
            id: 'UberX',
            name: 'UberX',
            capacity: 4,
            time: '4 mins away',
            dropoff: '4:38',
            price: '£26.90',
            image: '/images/uber-x.png',
            promo: 'Faster',
            description: 'Affordable everyday trips'
        },
        {
            id: 'UberXL',
            name: 'UberXL',
            capacity: 6,
            time: '3 mins away',
            dropoff: '4:39',
            price: '£34.22',
            image: '/images/uber-xl.png',
            promo: '',
            description: 'Affordable rides for groups up to 6'
        },
        {
            id: 'Electric',
            name: 'Electric',
            capacity: 4,
            time: '7 mins away',
            dropoff: '4:40',
            price: '£26.90',
            image: '/images/uber-electric.png',
            promo: '',
            description: 'Sustainable rides in electric vehicles'
        },
    ];

    const handleRequest = () => {
        onRequestClick();
    };

    const handlePaymentSelect = (method: string) => {
        // Map the selected method string to our state object
        let label = 'Cash';
        if (method === 'card') label = '•••• 4242';
        else if (method === 'paypal') label = 'PayPal';

        setSelectedPayment({ type: 'Personal', label });
        setShowPaymentModal(false);
    };

    return (
        <div className="flex flex-col h-full bg-white relative">
            {/* Header - Hide on mobile when in bottom sheet */}
            <div className="hidden lg:block px-8 pb-4">
                <h2 className="text-[36px] font-bold text-black mb-2 tracking-tight leading-none">Choose a ride</h2>
                <p className="text-[18px] text-black font-bold">Rides we think you'll like</p>
            </div>

            {/* Ride List */}
            <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-2 space-y-2 sm:space-y-4 pb-32">
                {rideTypes.map((ride) => (
                    <button
                        key={ride.id}
                        onClick={() => setSelectedRide(ride.id)}
                        className={`w-full flex items-center justify-between p-3 sm:p-4 rounded-xl border-2 transition-all relative ${selectedRide === ride.id
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0">
                            {/* Vehicle Image */}
                            <div className="w-16 h-12 sm:w-24 sm:h-16 lg:w-28 lg:h-16 relative flex-shrink-0">
                                <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
                                    <img
                                        src={ride.image}
                                        alt={ride.name}
                                        className="w-full h-full object-contain"
                                        onError={(e) => e.currentTarget.style.display = 'none'}
                                    />
                                </div>
                            </div>

                            <div className="text-left flex-1 min-w-0">
                                {/* Name and Capacity */}
                                <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                                    <span className="font-bold text-base sm:text-lg lg:text-[22px] text-black truncate">
                                        {ride.name}
                                    </span>
                                    <div className="flex items-center gap-0.5 text-gray-700 flex-shrink-0">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                        <span className="text-xs font-medium">{ride.capacity}</span>
                                    </div>
                                </div>

                                {/* Time and Dropoff */}
                                <div className="text-xs sm:text-sm text-gray-600 mb-1">
                                    <span>{ride.time}</span> • <span>{ride.dropoff}</span>
                                </div>

                                {/* Description - Hide on mobile */}
                                {ride.description && (
                                    <p className="hidden sm:block text-sm text-gray-500 truncate">{ride.description}</p>
                                )}

                                {/* Promo Badge */}
                                {ride.promo && (
                                    <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded bg-[#276EF1] text-white text-[11px] sm:text-xs font-bold">
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                                        </svg>
                                        {ride.promo}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Price */}
                        <div className="text-right self-start mt-0.5 sm:mt-1 flex-shrink-0 ml-2">
                            <span className="font-bold text-lg sm:text-xl lg:text-[22px] text-black">{ride.price}</span>
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
                        disabled={isRequesting}
                        className="flex-[2] bg-black text-white py-4 rounded-xl text-[20px] font-bold hover:bg-gray-800 transition-colors shadow-lg flex items-center justify-center gap-3 disabled:opacity-80 disabled:cursor-wait"
                    >
                        {isRequesting ? (
                            <>
                                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Requesting...</span>
                            </>
                        ) : (
                            <span>Request {selectedRide}</span>
                        )}
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
