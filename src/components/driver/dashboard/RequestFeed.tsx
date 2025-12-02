'use client';

import { useDriverJourney } from '@/features/driver/driver-journey.state';
import { User } from 'lucide-react';
import { useEffect, useState } from 'react';

export const RequestFeed = () => {
    const { incomingRequest, acceptRequest, ignoreRequest, status } = useDriverJourney();
    const [timeLeft, setTimeLeft] = useState(15);

    useEffect(() => {
        if (!incomingRequest) return;

        setTimeLeft(15);
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    ignoreRequest(); // Auto-ignore if time runs out
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [incomingRequest, ignoreRequest]);

    if (!incomingRequest) return null;

    const isOverlay = status === 'dropping_off';

    return (
        <div className={`bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.2)] w-full max-w-md mx-auto overflow-hidden animate-slide-up ${isOverlay ? 'absolute bottom-0 left-0 right-0 z-50 border-t-4 border-blue-500' : ''}`}>
            {/* Header / Timer */}
            <div className="bg-black text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {isOverlay && <span className="bg-blue-500 text-xs font-bold px-2 py-1 rounded">NEXT TRIP</span>}
                    <span className="font-bold text-lg">{incomingRequest.distance} away</span>
                    <span className="text-gray-400 text-sm">({incomingRequest.duration})</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-bold text-sm">
                        {timeLeft}
                    </div>
                </div>
            </div>

            {/* Map Preview (Placeholder) */}
            <div className="h-32 bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                    Route Preview
                </div>
                {/* Route Line Mock */}
                <div className="absolute top-1/2 left-1/4 right-1/4 h-1 bg-black rounded-full" />
                <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-black rounded-full -mt-1" />
                <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-black rounded-full -mt-1" />
            </div>

            {/* Request Details */}
            <div className="p-5">
                {/* Price & Type */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-2xl font-bold">£{incomingRequest.price.toFixed(2)}</h3>
                        <span className="text-gray-500 text-sm">Estimated earnings</span>
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded-lg font-medium text-sm">
                        {incomingRequest.type}
                    </div>
                </div>

                {/* Addresses */}
                <div className="space-y-6 relative mb-8">
                    {/* Connecting Line */}
                    <div className="absolute left-[11px] top-8 bottom-8 w-0.5 bg-gray-200" />

                    <div className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0 z-10">
                            <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{incomingRequest.pickupAddress}</p>
                            <p className="text-xs text-gray-500">Pickup</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-6 h-6 rounded-full border-2 border-black bg-white flex items-center justify-center flex-shrink-0 z-10">
                            <div className="w-2 h-2 bg-black rounded-sm" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{incomingRequest.dropoffAddress}</p>
                            <p className="text-xs text-gray-500">Dropoff</p>
                        </div>
                    </div>
                </div>

                {/* Rider Info */}
                <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">{incomingRequest.riderName}</p>
                            <p className="text-xs text-gray-500">★ {incomingRequest.riderRating}</p>
                        </div>
                    </div>
                    <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                        Verified Rider
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={ignoreRequest}
                        className="py-4 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        onClick={acceptRequest}
                        className="py-4 rounded-xl font-bold text-white bg-black hover:bg-gray-800 transition-colors shadow-lg"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};
