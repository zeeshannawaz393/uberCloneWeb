'use client';

import { useReserveStore } from '@/features/driver/reserve.state';
import { ReserveRequestCard } from '@/components/driver/reserve/ReserveRequestCard';
import { DashboardTabs } from '@/components/driver/dashboard/DashboardTabs';
import { useReserveSimulator } from '@/hooks/useReserveSimulator';
import { useRouter } from 'next/navigation';
import { Calendar, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function OpportunitiesPage() {
    const router = useRouter();
    const { availableReserves, loadAvailableReserves, acceptReserve } = useReserveStore();
    const { generateAvailableReserves } = useReserveSimulator();
    const [selectedRide, setSelectedRide] = useState<string | null>(null);

    useEffect(() => {
        // Load mock data on mount
        if (availableReserves.length === 0) {
            loadAvailableReserves(generateAvailableReserves());
        }
    }, []);

    const handleRefresh = () => {
        loadAvailableReserves(generateAvailableReserves());
    };

    const handleAccept = (rideId: string) => {
        acceptReserve(rideId);
        setSelectedRide(null);
        router.push('/driver/dashboard/reservations');
    };

    const handleDecline = () => {
        setSelectedRide(null);
    };

    const selectedRideData = availableReserves.find(r => r.id === selectedRide);

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Opportunities</h1>
                            <p className="text-sm text-gray-500">Available Reserve trips</p>
                        </div>
                        <button
                            onClick={handleRefresh}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-4 py-6">
                {availableReserves.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-10 h-10 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">No Available Reserves</h2>
                        <p className="text-gray-600 mb-6">Check back later for new opportunities</p>
                        <button
                            onClick={handleRefresh}
                            className="px-6 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
                        >
                            Refresh
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {availableReserves.map((ride) => (
                            <div
                                key={ride.id}
                                onClick={() => setSelectedRide(ride.id)}
                                className="bg-white rounded-xl shadow-md border border-gray-200 p-5 cursor-pointer hover:shadow-lg transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">
                                            {new Date(ride.scheduledTime).toLocaleDateString('en-US', {
                                                weekday: 'short',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </div>
                                        <div className="text-2xl font-bold">
                                            {new Date(ride.scheduledTime).toLocaleTimeString('en-US', {
                                                hour: 'numeric',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-gray-900">£{ride.price.toFixed(2)}</div>
                                        <div className="text-xs text-gray-500">Guaranteed</div>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-3">
                                    <div className="flex items-start gap-2">
                                        <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-1">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                        </div>
                                        <p className="text-sm text-gray-700">{ride.pickupAddress}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <div className="w-4 h-4 rounded-full border-2 border-black bg-white flex items-center justify-center flex-shrink-0 mt-1">
                                            <div className="w-1.5 h-1.5 bg-black rounded-sm" />
                                        </div>
                                        <p className="text-sm text-gray-700">{ride.dropoffAddress}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 text-xs text-gray-600">
                                    <span>{ride.distance}</span>
                                    <span>•</span>
                                    <span>{ride.duration}</span>
                                    <span>•</span>
                                    <span>{ride.type}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Selected Ride Modal */}
            {selectedRide && selectedRideData && (
                <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
                    <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                        <ReserveRequestCard
                            ride={selectedRideData}
                            onAccept={() => handleAccept(selectedRide)}
                            onDecline={handleDecline}
                        />
                    </div>
                </div>
            )}

            {/* Tab Navigation */}
            <DashboardTabs />
        </main>
    );
}
