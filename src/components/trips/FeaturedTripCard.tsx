'use client';

import { TripHistory } from '@/types/trip';

interface FeaturedTripCardProps {
    trip: TripHistory;
}

export function FeaturedTripCard({ trip }: FeaturedTripCardProps) {
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="flex flex-col md:flex-row">
                {/* Map Section */}
                <div className="w-full md:w-2/5 bg-gray-100 min-h-[200px] relative">
                    {/* Placeholder map - you can integrate Google Maps here */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-4xl mb-2">📍</div>
                            <p className="text-xs text-gray-500">Map Preview</p>
                        </div>
                    </div>

                    {/* Map overlay with street names (simulated) */}
                    <div className="absolute top-4 left-4 bg-white/90 px-2 py-1 rounded text-xs font-medium text-gray-700 transform -rotate-12">
                        Malir Halt
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 px-2 py-1 rounded text-xs font-medium text-gray-700">
                        {trip.pickup || 'Pickup Location'}
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-3/5 p-6">
                    {/* Destination */}
                    <h3 className="text-lg font-bold text-black mb-2 truncate">
                        {trip.destination}
                    </h3>

                    {/* Details */}
                    <p className="text-sm text-gray-600 mb-1">
                        {trip.date} • {trip.time}
                    </p>

                    {/* Price & Status */}
                    <p className={`text-sm ${getStatusColor(trip.status)} mb-4`}>
                        {trip.currency}{trip.price.toFixed(2)} • {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-sm font-medium text-black hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Help
                        </button>

                        <button className="flex items-center gap-2 text-sm font-medium text-black hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Details
                        </button>

                        <button className="flex items-center gap-2 text-sm font-medium text-black hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Rebook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
