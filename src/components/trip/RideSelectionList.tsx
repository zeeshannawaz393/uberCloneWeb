
'use client';

import { useState } from 'react';
import Image from 'next/image';

interface RideOption {
    id: string;
    name: string;
    capacity: number;
    price: number;
    description: string;
    eta: string;
    image: string; // We'll use placeholders or emojis if actual images aren't available, but ideally paths
    isPromo?: boolean;
}

const RIDE_OPTIONS: RideOption[] = [
    {
        id: 'comfort',
        name: 'Comfort',
        capacity: 4,
        price: 35.11,
        description: 'Newer cars with extra legroom',
        eta: '4 mins away • 23:54',
        image: '/images/comfort.png' // Placeholder
    },
    {
        id: 'exec',
        name: 'Exec XXL',
        capacity: 7,
        price: 44.99,
        description: 'High end cars for large groups and luggage',
        eta: '9 mins away • 0:00',
        image: '/images/exec.png' // Placeholder
    },
    {
        id: 'access',
        name: 'Access',
        capacity: 2,
        price: 30.95,
        description: 'Wheelchair accessible vehicles',
        eta: 'Unavailable',
        image: '/images/access.png' // Placeholder
    },
    {
        id: 'assist',
        name: 'Assist',
        capacity: 4,
        price: 30.95,
        description: 'Special assistance from trained drivers',
        eta: '10 mins away • 23:58',
        image: '/images/assist.png' // Placeholder
    }
];

export function RideSelectionList() {
    const [selectedRideId, setSelectedRideId] = useState<string | null>(null);

    return (
        <div className="flex-1 overflow-y-auto -mx-5 px-5">
            {/* Suggestions / Promo Header could go here */}

            <div className="space-y-2">
                {RIDE_OPTIONS.map((ride) => (
                    <button
                        key={ride.id}
                        onClick={() => setSelectedRideId(ride.id)}
                        className={`w-full flex items-center p-3 rounded-xl border-2 transition-all ${selectedRideId === ride.id
                                ? 'border-black bg-white'
                                : 'border-transparent hover:bg-gray-50'
                            }`}
                    >
                        {/* Image */}
                        <div className="w-16 h-16 relative mr-4 flex-shrink-0">
                            {/* Using a placeholder div for now if image fails, but structure is ready for Next/Image */}
                            <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
                                🚗
                            </div>
                        </div>

                        {/* Details */}
                        <div className="flex-1 text-left">
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="font-bold text-[18px] text-black">{ride.name}</span>
                                <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gray-100 rounded-full">
                                    <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                    <span className="text-[12px] font-medium text-black">{ride.capacity}</span>
                                </div>
                            </div>
                            <div className="text-[14px] text-gray-500 mb-0.5">{ride.eta}</div>
                            <div className="text-[12px] text-gray-500 leading-tight">{ride.description}</div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                            <span className="text-[18px] font-bold text-black">£{ride.price.toFixed(2)}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
