'use client';

import { useReserveStore, ScheduledRide } from '@/features/driver/reserve.state';
import { ReserveCard } from '@/components/driver/reserve/ReserveCard';
import { DashboardTabs } from '@/components/driver/dashboard/DashboardTabs';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Plus } from 'lucide-react';
import { useState } from 'react';

export default function ReservationsPage() {
    const router = useRouter();
    const { scheduledRides, cancelReserve, markDriverOnline, markArrived, startReserveTrip } = useReserveStore();
    const [showCancelModal, setShowCancelModal] = useState<string | null>(null);

    const handleCancel = (rideId: string) => {
        const hasPenalty = cancelReserve(rideId);
        setShowCancelModal(null);

        if (hasPenalty) {
            alert('Cancellation fee applied. This may affect your Reserve eligibility.');
        }
    };

    const handleNavigate = (ride: ScheduledRide) => {
        // Mark driver as online if not already
        if (!ride.driverOnline) {
            markDriverOnline(ride.id);
        }

        // Mark arrived if at pickup time
        if (Date.now() >= ride.arriveByTime && !ride.arrivedEarly) {
            markArrived(ride.id);
        }

        // In real app, would open navigation
        alert(`Navigation to: ${ride.pickupAddress}`);
    };

    const handleStart = (rideId: string) => {
        startReserveTrip(rideId);
        router.push('/driver/dashboard');
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
                            <p className="text-sm text-gray-500">{scheduledRides.length} scheduled {scheduledRides.length === 1 ? 'trip' : 'trips'}</p>
                        </div>
                        <button
                            onClick={() => router.push('/driver/dashboard/opportunities')}
                            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Browse
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-4 py-6">
                {scheduledRides.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-10 h-10 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">No Reservations</h2>
                        <p className="text-gray-600 mb-6">You don't have any scheduled trips yet</p>
                        <button
                            onClick={() => router.push('/driver/dashboard/opportunities')}
                            className="px-6 py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
                        >
                            Browse Available Reserves
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {scheduledRides.map((ride) => (
                            <ReserveCard
                                key={ride.id}
                                ride={ride}
                                onNavigate={() => handleNavigate(ride)}
                                onCancel={() => setShowCancelModal(ride.id)}
                                onStart={() => handleStart(ride.id)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Cancel Confirmation Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold mb-2">Cancel Reservation?</h3>
                        <p className="text-gray-600 mb-6">
                            {(() => {
                                const ride = scheduledRides.find(r => r.id === showCancelModal);
                                if (!ride) return '';

                                const now = Date.now();
                                const canCancelFree = now < ride.cancellationDeadline;

                                if (canCancelFree) {
                                    return 'You can cancel this reservation without penalty.';
                                } else {
                                    return 'Cancelling within 1 hour of pickup may result in a fee and affect your Reserve eligibility.';
                                }
                            })()}
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setShowCancelModal(null)}
                                className="py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                Keep It
                            </button>
                            <button
                                onClick={() => handleCancel(showCancelModal)}
                                className="py-3 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
                            >
                                Cancel Trip
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab Navigation */}
            <DashboardTabs />
        </main>
    );
}
