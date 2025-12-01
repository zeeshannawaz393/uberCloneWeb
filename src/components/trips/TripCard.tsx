'use client';

import Link from 'next/link';
import { TripHistory } from '@/types/trip';

interface TripCardProps {
    trip: TripHistory;
}

export function TripCard({ trip }: TripCardProps) {
    const getVehicleIcon = (type: string) => {
        switch (type) {
            case 'car':
                return '🚗';
            case 'scooter':
                return '🛵';
            case 'package':
                return '📦';
            default:
                return '🚗';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'canceled':
                return 'text-red-600';
            case 'unfulfilled':
                return 'text-yellow-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <Link href={`/trips/${trip.id}`}>
            <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-4">
                    {/* Vehicle Icon */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        trip.vehicleType === 'package' ? 'bg-yellow-100' : 'bg-gray-100'
                    }`}>
                        <span className="text-2xl">{getVehicleIcon(trip.vehicleType)}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Destination */}
                        <h3 className="text-base font-bold text-black truncate mb-1">
                            {trip.destination}
                        </h3>

                        {/* Details */}
                        <p className="text-xs text-gray-600 mb-1">
                            {trip.date} • {trip.time}
                        </p>

                        {/* Price & Status */}
                        <p className={`text-xs ${getStatusColor(trip.status)}`}>
                            {trip.currency}{trip.price.toFixed(2)} • {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center gap-3 mt-3">
                            <button 
                                onClick={(e) => e.preventDefault()}
                                className="flex items-center gap-1 text-xs font-medium text-black hover:bg-gray-100 px-2 py-1 rounded transition-colors"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Help
                            </button>

                            <button 
                                onClick={(e) => e.preventDefault()}
                                className="flex items-center gap-1 text-xs font-medium text-black hover:bg-gray-100 px-2 py-1 rounded transition-colors"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Rebook
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
