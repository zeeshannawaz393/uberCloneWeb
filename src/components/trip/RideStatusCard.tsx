'use client';

import { useState, useEffect } from 'react';
import { CancelRideModal } from './CancelRideModal';

interface RideStatusCardProps {
    pickup: string;
    destination: string;
    onCancel: () => void;
    onTripComplete: () => void;
}

export function RideStatusCard({ pickup, destination, onCancel, onTripComplete }: RideStatusCardProps) {
    const [status, setStatus] = useState<'on_way' | 'arriving' | 'picked_up' | 'in_progress'>('on_way');
    const [showCancelModal, setShowCancelModal] = useState(false);

    // Mock status progression
    useEffect(() => {
        const timer1 = setTimeout(() => setStatus('arriving'), 8000);
        const timer2 = setTimeout(() => setStatus('picked_up'), 16000);
        const timer3 = setTimeout(() => setStatus('in_progress'), 24000);
        const timer4 = setTimeout(() => onTripComplete(), 32000); // Trip completes after 32 seconds

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, [onTripComplete]);

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col w-full h-fit border border-gray-100">
            {/* 1. Status Header */}
            <div className="p-5 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-1">
                    {status === 'on_way' && (
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">3</span>
                        </div>
                    )}
                    {status === 'arriving' && (
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center animate-pulse">
                            <span className="text-white text-sm font-bold">0</span>
                        </div>
                    )}
                    <h2 className="text-2xl font-bold text-black tracking-tight">
                        {status === 'on_way' && 'Driver on the way'}
                        {status === 'arriving' && 'Driver arriving'}
                        {status === 'picked_up' && 'Heading to destination'}
                        {status === 'in_progress' && 'Trip in progress'}
                    </h2>
                </div>
                <p className="text-gray-500 text-sm font-medium">
                    {status === 'on_way' && 'Alex is heading to your pickup'}
                    {status === 'arriving' && 'Alex is arriving now'}
                    {status === 'picked_up' && 'On the way to dropoff'}
                    {status === 'in_progress' && 'You are on your way'}
                </p>
            </div>

            {/* 2. ETA (Only when on way) */}
            {status === 'on_way' && (
                <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                    <span className="text-black font-medium">Alex arrives in</span>
                    <span className="text-black font-bold text-lg">3 minutes</span>
                </div>
            )}

            {/* 3. Driver Profile */}
            <div className="p-5 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden relative">
                        {/* Placeholder Avatar */}
                        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-black leading-tight">Alex</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-600 mt-0.5">
                            <span className="font-medium">5.0</span>
                            <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                            <span>•</span>
                            <span>1,240 trips</span>
                        </div>
                    </div>
                </div>

                {/* 4. Vehicle Info (Compact) */}
                <div className="text-right">
                    <div className="w-20 h-12 relative ml-auto mb-1">
                        {/* Car Image Placeholder */}
                        <img src="/images/uber-x.png" alt="Car" className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                    </div>
                    <p className="text-sm font-bold text-black leading-tight">Toyota Corolla</p>
                    <p className="text-xs text-gray-500 font-mono bg-gray-100 px-1.5 py-0.5 rounded inline-block mt-1">ABC-123</p>
                </div>
            </div>

            {/* 5. Pickup / Destination Summary */}
            <div className="p-5 space-y-4 border-b border-gray-100">
                <div className={`flex items-start gap-3 ${status === 'picked_up' || status === 'in_progress' ? 'opacity-40' : ''}`}>
                    <div className="w-2 h-2 mt-1.5 bg-black rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Pickup</p>
                        <p className="text-sm font-medium text-black line-clamp-1">{pickup}</p>
                    </div>
                </div>
                <div className={`flex items-start gap-3 ${status === 'on_way' || status === 'arriving' ? 'opacity-40' : ''}`}>
                    <div className="w-2 h-2 mt-1.5 bg-black rounded-none flex-shrink-0"></div>
                    <div className="flex-1">
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Destination</p>
                        <p className="text-sm font-medium text-black line-clamp-1">{destination}</p>
                    </div>
                </div>
            </div>

            {/* 6. Driver Actions */}
            <div className="p-5 flex items-center justify-between gap-4">
                <div className="flex gap-3">
                    <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </button>
                    <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    </button>
                </div>

                {status !== 'in_progress' && (
                    <button
                        onClick={() => setShowCancelModal(true)}
                        className="text-red-600 font-medium text-sm hover:bg-red-50 px-6 py-3 rounded-full transition-colors"
                    >
                        Cancel ride
                    </button>
                )}
            </div>

            {/* Cancel Modal */}
            <CancelRideModal
                isOpen={showCancelModal}
                onClose={() => {
                    setShowCancelModal(false);
                    onCancel();
                }}
                tripState={status}
            />
        </div>
    );
}
