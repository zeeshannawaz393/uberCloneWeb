'use client';

import { ScheduledRide } from '@/features/driver/reserve.state';
import { Navigation, Clock, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import {
    getCountdown,
    formatTime,
    formatDate,
    getStatusBadge,
    getUrgencyLevel
} from '@/lib/reserve-utils';

interface ReserveCardProps {
    ride: ScheduledRide;
    onNavigate?: () => void;
    onCancel?: () => void;
    onStart?: () => void;
}

export const ReserveCard = ({ ride, onNavigate, onCancel, onStart }: ReserveCardProps) => {
    const statusBadge = getStatusBadge(ride);
    const urgency = getUrgencyLevel(ride.requireOnlineAt);
    const now = Date.now();

    const isTimeToGoOnline = now >= ride.requireOnlineAt && !ride.driverOnline;
    const isTimeToArrive = now >= ride.arriveByTime && !ride.arrivedEarly;
    const isReadyToStart = now >= ride.scheduledTime;

    const getBadgeColor = (color: string) => {
        switch (color) {
            case 'red': return 'bg-red-100 text-red-800 border-red-200';
            case 'yellow': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'green': return 'bg-green-100 text-green-800 border-green-200';
            case 'blue': return 'bg-gray-100 text-gray-800 border-gray-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm font-medium">{formatDate(ride.scheduledTime)}</span>
                        </div>
                        <div className="text-2xl font-bold">{formatTime(ride.scheduledTime)}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm opacity-90">Estimated Fare</div>
                        <div className="text-2xl font-bold">£{ride.price.toFixed(2)}</div>
                    </div>
                </div>

                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${getBadgeColor(statusBadge.color)} border`}>
                    {statusBadge.text}
                </div>
            </div>

            {/* Body */}
            <div className="p-4">
                {/* Countdown / Status Alerts */}
                {isTimeToGoOnline && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="font-bold text-red-900 text-sm">GO ONLINE NOW</p>
                            <p className="text-xs text-red-700">Required to accept this reservation</p>
                        </div>
                    </div>
                )}

                {isTimeToArrive && ride.driverOnline && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 flex items-center gap-3">
                        <Navigation className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="font-bold text-yellow-900 text-sm">Navigate to Pickup</p>
                            <p className="text-xs text-yellow-700">Arrive by {formatTime(ride.arriveByTime)}</p>
                        </div>
                    </div>
                )}

                {!isTimeToGoOnline && !isReadyToStart && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Go Online</div>
                                <div className={`font-bold ${urgency === 'critical' ? 'text-red-600' : urgency === 'warning' ? 'text-yellow-600' : 'text-gray-900'}`}>
                                    {getCountdown(ride.requireOnlineAt)}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 mb-1">Arrive By</div>
                                <div className="font-bold text-gray-900">{formatTime(ride.arriveByTime)}</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Addresses */}
                <div className="space-y-3 mb-4">
                    <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">{ride.pickupAddress}</p>
                            <p className="text-xs text-gray-500">Pickup Location</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full border-2 border-black bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 bg-black rounded-sm" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">{ride.dropoffAddress}</p>
                            <p className="text-xs text-gray-500">Dropoff Location</p>
                        </div>
                    </div>
                </div>

                {/* Trip Details */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center bg-gray-50 rounded-lg p-3">
                    <div>
                        <div className="text-xs text-gray-500">Distance</div>
                        <div className="font-semibold text-sm">{ride.distance}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">Duration</div>
                        <div className="font-semibold text-sm">{ride.duration}</div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-500">Wait Time</div>
                        <div className="font-semibold text-sm">{ride.waitTimeMinutes}m</div>
                    </div>
                </div>

                {/* Status Indicators */}
                <div className="flex gap-2 mb-4">
                    {ride.driverOnline && (
                        <div className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Online</span>
                        </div>
                    )}
                    {ride.arrivedEarly && (
                        <div className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Arrived</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                    {onCancel && (
                        <button
                            onClick={onCancel}
                            className="py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                        >
                            Cancel
                        </button>
                    )}

                    {onNavigate && (isTimeToArrive || isReadyToStart) && (
                        <button
                            onClick={onNavigate}
                            className="py-3 rounded-lg font-bold text-white bg-black hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                            <Navigation className="w-4 h-4" />
                            Navigate
                        </button>
                    )}

                    {onStart && isReadyToStart && (
                        <button
                            onClick={onStart}
                            className="py-3 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700 transition-colors col-span-2 text-sm"
                        >
                            Start Trip
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
