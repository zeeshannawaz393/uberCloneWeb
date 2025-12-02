'use client';

import { ScheduledRide } from '@/features/driver/reserve.state';
import { Calendar, Clock, MapPin, User, Info } from 'lucide-react';
import { formatTime, formatDate, canCancelWithoutPenalty } from '@/lib/reserve-utils';

interface ReserveRequestCardProps {
    ride: ScheduledRide;
    onAccept: () => void;
    onDecline: () => void;
}

export const ReserveRequestCard = ({ ride, onAccept, onDecline }: ReserveRequestCardProps) => {
    const canCancel = canCancelWithoutPenalty(ride.scheduledTime);

    return (
        <div className="bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.2)] w-full max-w-md mx-auto overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-xs opacity-90">Uber Reserve</div>
                            <div className="font-bold text-lg">{formatDate(ride.scheduledTime)}</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold">£{ride.price.toFixed(2)}</div>
                        <div className="text-xs opacity-90">Guaranteed Fare</div>
                    </div>
                </div>
            </div>

            {/* Scheduled Time */}
            <div className="bg-gray-50 border-b border-gray-200 p-4">
                <div className="flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5 text-gray-700" />
                    <span className="text-2xl font-bold text-gray-900">{formatTime(ride.scheduledTime)}</span>
                </div>
                <p className="text-center text-sm text-gray-700 mt-1">Scheduled Pickup Time</p>
            </div>

            {/* Requirements */}
            <div className="p-5 bg-gray-50 border-b border-gray-200">
                <h4 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Requirements
                </h4>
                <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-gray-700">1</span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Go online by {formatTime(ride.requireOnlineAt)}</p>
                            <p className="text-xs text-gray-600">
                                {ride.tier === 'premium' ? '45 minutes' : '30 minutes'} before pickup
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-gray-700">2</span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Arrive by {formatTime(ride.arriveByTime)}</p>
                            <p className="text-xs text-gray-600">
                                {ride.tier === 'premium' ? '15 minutes' : '5 minutes'} before pickup
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-gray-700">3</span>
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{ride.waitTimeMinutes} min complimentary wait time</p>
                            <p className="text-xs text-gray-600">After scheduled pickup time</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trip Details */}
            <div className="p-5">
                {/* Addresses */}
                <div className="space-y-4 mb-5">
                    <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-900">{ride.pickupAddress}</p>
                            <p className="text-xs text-gray-500">Pickup</p>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full border-2 border-black bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 bg-black rounded-sm" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-900">{ride.dropoffAddress}</p>
                            <p className="text-xs text-gray-500">Dropoff</p>
                        </div>
                    </div>
                </div>

                {/* Trip Info */}
                <div className="grid grid-cols-3 gap-3 mb-5 p-3 bg-gray-50 rounded-lg">
                    <div className="text-center">
                        <div className="text-xs text-gray-500">Distance</div>
                        <div className="font-semibold text-sm">{ride.distance}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-gray-500">Duration</div>
                        <div className="font-semibold text-sm">{ride.duration}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-gray-500">Type</div>
                        <div className="font-semibold text-sm">{ride.type}</div>
                    </div>
                </div>

                {/* Rider Info */}
                <div className="flex items-center justify-between mb-5 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">{ride.riderName}</p>
                            <p className="text-xs text-gray-500">★ {ride.riderRating}</p>
                        </div>
                    </div>
                    <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                        Verified
                    </div>
                </div>

                {/* Cancellation Policy */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-5">
                    <p className="text-xs text-yellow-900">
                        <span className="font-bold">Cancellation Policy:</span> You can cancel without penalty up to 1 hour before the scheduled time.
                        Cancelling within 1 hour may result in a fee.
                    </p>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={onDecline}
                        className="py-4 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        onClick={onAccept}
                        className="py-4 rounded-xl font-bold text-white bg-black hover:bg-gray-800 transition-colors shadow-lg"
                    >
                        Accept Reserve
                    </button>
                </div>
            </div>
        </div>
    );
};
