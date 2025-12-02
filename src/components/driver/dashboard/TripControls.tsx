'use client';

import { useDriverJourney } from '@/features/driver/driver-journey.state';
import { Navigation, Phone, MessageSquare, Shield, Camera, User } from 'lucide-react';
import { useState } from 'react';

export const TripControls = () => {
    const {
        status,
        activeRide,
        queuedRide,
        arriveAtPickup,
        verifyPin,
        startTrip,
        arriveAtDropoff,
        completeTrip
    } = useDriverJourney();

    const [pin, setPin] = useState(['', '', '', '']);
    const [pinError, setPinError] = useState(false);
    const [showPhotoModal, setShowPhotoModal] = useState(false);

    if (!activeRide) return null;

    const handlePinChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        // Auto-focus next input
        if (value && index < 3) {
            const nextInput = document.getElementById(`pin-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleVerifyPin = () => {
        const pinString = pin.join('');
        if (verifyPin(pinString)) {
            setPinError(false);
            startTrip();
        } else {
            setPinError(true);
            setPin(['', '', '', '']); // Reset
            document.getElementById('pin-0')?.focus();
        }
    };

    const renderContent = () => {
        switch (status) {
            case 'pickup':
                return (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold">Picking up {activeRide.riderName}</h3>
                                <p className="text-gray-500 text-sm">{activeRide.pickupAddress}</p>
                            </div>
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-gray-600" />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <button
                                onClick={() => {
                                    const address = encodeURIComponent(activeRide.pickupAddress);
                                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
                                }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                    <Navigation className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-medium">Navigate</span>
                            </button>
                            <button
                                onClick={() => {
                                    // Mock phone number - in real app, would come from activeRide
                                    alert('Calling rider...\n\nIn production, this would dial:\n+44 7123 456789');
                                }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-medium">Call</span>
                            </button>
                            <button
                                onClick={() => {
                                    alert(`Chat with ${activeRide.riderName}\n\nIn production, this would open an in-app chat.`);
                                }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-medium">Chat</span>
                            </button>
                            <button
                                onClick={() => {
                                    const options = [
                                        '🚨 Emergency Services',
                                        '📞 Safety Line',
                                        '⚠️ Report Issue',
                                        '🛡️ Share Trip Status'
                                    ].join('\n');
                                    alert(`Safety Options:\n\n${options}\n\nIn production, this would show a safety modal.`);
                                }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-medium">Safety</span>
                            </button>
                        </div>

                        <button
                            onClick={arriveAtPickup}
                            className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 transition-colors"
                        >
                            Arrived at Pickup
                        </button>
                    </>
                );

            case 'arrived':
                return (
                    <>
                        <h3 className="text-xl font-bold text-center mb-2">Verify Rider</h3>
                        <p className="text-gray-500 text-center text-sm mb-6">Ask {activeRide.riderName} for their 4-digit PIN</p>

                        <div className="flex justify-center gap-4 mb-6">
                            {pin.map((digit, i) => (
                                <input
                                    key={i}
                                    id={`pin-${i}`}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handlePinChange(i, e.target.value)}
                                    className={`w-14 h-16 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none focus:border-black transition-colors ${pinError ? 'border-red-500 bg-red-50' : 'border-gray-200'
                                        }`}
                                />
                            ))}
                        </div>

                        {pinError && (
                            <p className="text-red-500 text-center text-sm mb-4 font-medium">Incorrect PIN. Try again (Hint: 1234)</p>
                        )}

                        <button
                            onClick={handleVerifyPin}
                            disabled={pin.some(d => !d)}
                            className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Verify & Start Trip
                        </button>
                    </>
                );

            case 'in_progress':
                return (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold">Heading to Dropoff</h3>
                                <p className="text-gray-500 text-sm">{activeRide.dropoffAddress}</p>
                            </div>
                            <div className="bg-black text-white px-3 py-1 rounded-lg text-sm font-bold">
                                {activeRide.duration}
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl mb-6 flex gap-4 items-center">
                            <Navigation className="w-6 h-6 text-blue-600" />
                            <div className="flex-1">
                                <p className="font-medium text-sm">Follow route to destination</p>
                                <p className="text-xs text-gray-500">{activeRide.distance} remaining</p>
                            </div>
                        </div>

                        <button
                            onClick={arriveAtDropoff}
                            className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 transition-colors"
                        >
                            Arrived at Dropoff
                        </button>
                    </>
                );

            case 'dropping_off':
                return (
                    <>
                        {!showPhotoModal ? (
                            <>
                                <h3 className="text-xl font-bold text-center mb-2">Complete Trip</h3>
                                <p className="text-gray-500 text-center text-sm mb-6">Confirm safe dropoff for {activeRide.riderName}</p>

                                {queuedRide && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold text-blue-800">NEXT TRIP QUEUED</p>
                                            <p className="text-sm font-medium text-blue-900">
                                                {queuedRide.riderName} • {queuedRide.distance} away
                                            </p>
                                        </div>
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Navigation className="w-4 h-4 text-blue-600" />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <button
                                        onClick={() => setShowPhotoModal(true)}
                                        className="w-full py-4 bg-white border-2 border-black text-black rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Camera className="w-5 h-5" />
                                        Take Photo Proof
                                    </button>

                                    <button
                                        onClick={completeTrip}
                                        className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-green-700 transition-colors"
                                    >
                                        {queuedRide ? 'Complete & Start Next Trip' : 'Complete Trip'}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold text-center mb-4">Photo Proof</h3>
                                <div className="aspect-video bg-gray-900 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
                                    <Camera className="w-12 h-12 text-white opacity-50" />
                                    {/* Mock Camera View */}
                                    <div className="absolute bottom-4 text-white text-xs bg-black/50 px-2 py-1 rounded">
                                        Mock Camera View
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setShowPhotoModal(false)}
                                        className="py-3 font-medium text-gray-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={completeTrip}
                                        className="py-3 bg-black text-white rounded-xl font-bold"
                                    >
                                        Submit & Complete
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.2)] w-full max-w-md mx-auto p-6 animate-slide-up">
            {renderContent()}
        </div>
    );
};
