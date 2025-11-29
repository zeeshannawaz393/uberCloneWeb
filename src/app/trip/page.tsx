/**
 * Trip Booking Page
 * Three-column layout: Inputs | Ride Options | Map
 */

'use client';

import { useSearchParams, redirect } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { TripSidebar } from '@/components/trip/TripSidebar';
import { TripMap } from '@/components/trip/TripMap';
import { RideOptions } from '@/components/trip/RideOptions';
import { CourierOptions } from '@/components/trip/CourierOptions';
import { DeliveryDetailsForm } from '@/components/trip/DeliveryDetailsForm';
import { ErrorState } from '@/components/trip/ErrorState';
import { RideStatusCard } from '@/components/trip/RideStatusCard';
import { TripReceipt } from '@/components/trip/TripReceipt';
import { ConfirmPickupModal } from '@/components/trip/ConfirmPickupModal';
import { Header } from '@/components/navigation/Header';
import { DeliveryDetails } from '@/types/delivery';

function TripPageContent() {
    const searchParams = useSearchParams();
    const pickup = searchParams.get('pickup');
    const destination = searchParams.get('destination');

    // Get trip state from URL or default to 'booking'
    const urlTripState = searchParams.get('state') as 'booking' | 'searching' | 'on_trip' | 'completed' | null;
    const [tripState, setTripStateInternal] = useState<'booking' | 'searching' | 'on_trip' | 'completed'>(
        urlTripState || 'booking'
    );

    const [showPickupConfirm, setShowPickupConfirm] = useState(false);
    const [isLoadingRideOptions, setIsLoadingRideOptions] = useState(false);
    const [stops, setStops] = useState<string[]>([]); // Track intermediate stops

    // Service mode state - read from URL or default to 'ride'
    const urlServiceMode = searchParams.get('mode') as 'ride' | 'send' | 'receive' | null;
    const [serviceMode, setServiceModeInternal] = useState<'ride' | 'send' | 'receive'>(
        urlServiceMode || 'ride'
    );

    const urlSelectedCourier = searchParams.get('courier');
    const [selectedCourier, setSelectedCourierInternal] = useState<string | undefined>(
        urlSelectedCourier || undefined
    );

    const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);

    const isDeliveryMode = serviceMode === 'send' || serviceMode === 'receive';

    // Function to update service mode and URL
    const setServiceMode = (newMode: 'ride' | 'send' | 'receive') => {
        setServiceModeInternal(newMode);

        // Update URL with new mode
        const params = new URLSearchParams(searchParams.toString());
        params.set('mode', newMode);

        // Reset courier selection when switching modes
        if (newMode === 'ride') {
            params.delete('courier');
            setSelectedCourierInternal(undefined);
        }

        window.history.replaceState({}, '', `?${params.toString()}`);
    };

    // Function to update selected courier and URL
    const setSelectedCourier = (courierId: string | undefined) => {
        setSelectedCourierInternal(courierId);

        // Update URL with selected courier
        const params = new URLSearchParams(searchParams.toString());
        if (courierId) {
            params.set('courier', courierId);
        } else {
            params.delete('courier');
        }
        window.history.replaceState({}, '', `?${params.toString()}`);
    };

    // Function to update trip state and URL
    const setTripState = (newState: 'booking' | 'searching' | 'on_trip' | 'completed') => {
        setTripStateInternal(newState);

        // Update URL with new state
        const params = new URLSearchParams(searchParams.toString());
        params.set('state', newState);
        window.history.replaceState({}, '', `?${params.toString()}`);
    };

    // Reset trip state when pickup or destination changes
    useEffect(() => {
        setIsLoadingRideOptions(true);
        setTripState('booking');
        setShowPickupConfirm(false);

        // Simulate loading delay for shimmer effect
        const timer = setTimeout(() => {
            setIsLoadingRideOptions(false);
        }, 800);

        return () => clearTimeout(timer);
    }, [pickup, destination]);

    // Redirect if no locations provided
    if (!pickup || !destination) {
        redirect('/');
    }

    // Mock service availability check
    const UNAVAILABLE_LOCATIONS = [
        'Lahore Zoo',
        'LAHORE ORGANIC VILLAGE',
    ];

    const isServiceAvailable = !UNAVAILABLE_LOCATIONS.some((loc) =>
        pickup.toLowerCase().includes(loc.toLowerCase())
    );

    // Handle searching state transition
    useEffect(() => {
        if (tripState === 'searching') {
            const timer = setTimeout(() => {
                setTripState('on_trip');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [tripState]);

    // Handlers for delivery mode
    const handleCourierSelect = (courierId: string) => {
        setSelectedCourier(courierId);
        setShowDeliveryDetails(true);
    };

    const handleDeliverySubmit = (details: DeliveryDetails) => {
        console.log('Delivery details:', details);
        // TODO: Submit delivery request
        setShowPickupConfirm(true); // Show confirmation modal
    };

    if (!isServiceAvailable) {
        return (
            <div className="flex flex-col h-screen bg-white">
                <Header />
                <div className="flex flex-1">
                    <div className="w-[400px] border-r border-gray-200">
                        <ErrorState pickup={pickup} destination={destination} />
                    </div>
                    <div className="flex-1 bg-gray-100">
                        {/* Empty map state for error */}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-white">
            <Header />
            <div className="flex flex-1 overflow-hidden p-6 gap-6 pt-24 relative">

                {/* Left Panel Area */}
                <div className="w-[350px] flex-shrink-0 z-20 flex flex-col gap-4">
                    {tripState === 'booking' && (
                        <TripSidebar
                            pickup={pickup}
                            destination={destination}
                            onStopsChange={setStops}
                            serviceMode={serviceMode}
                            onServiceModeChange={setServiceMode}
                        />
                    )}

                    {(tripState === 'on_trip' || tripState === 'completed') && (
                        <RideStatusCard
                            pickup={pickup}
                            destination={destination}
                            onCancel={() => setTripState('booking')}
                            onTripComplete={() => setTripState('completed')}
                        />
                    )}
                </div>

                {/* Middle/Overlay Area */}
                {tripState === 'booking' && (
                    <div className="w-[500px] flex-shrink-0 z-10">
                        {isLoadingRideOptions ? (
                            // Shimmer skeleton
                            <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                                <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="mb-4 p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                                            <div className="h-6 bg-gray-200 rounded w-1/5"></div>
                                        </div>
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                    </div>
                                ))}
                                <div className="h-12 bg-gray-200 rounded-xl mt-6"></div>
                            </div>
                        ) : isDeliveryMode ? (
                            // Delivery Mode: Show courier options or delivery details form
                            showDeliveryDetails && selectedCourier ? (
                                <DeliveryDetailsForm
                                    pickupAddress={pickup}
                                    dropoffAddress={destination}
                                    onSubmit={handleDeliverySubmit}
                                />
                            ) : (
                                <CourierOptions
                                    selectedCourier={selectedCourier}
                                    onSelect={handleCourierSelect}
                                />
                            )
                        ) : (
                            // Ride Mode: Show ride options
                            <RideOptions
                                key={`${pickup}-${destination}`}
                                onRequestClick={() => setShowPickupConfirm(true)}
                                pickup={pickup}
                            />
                        )}
                    </div>
                )}

                {/* Searching Overlay */}
                {tripState === 'searching' && (
                    <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-md text-center">
                            {/* Animated Pulse Ring */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
                                <div className="relative w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
                                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-black mb-2">Finding your ride</h3>
                            <p className="text-gray-500 mb-6">Connecting you to a nearby driver...</p>

                            {/* Progress Bar */}
                            <div className="w-64 h-1.5 bg-gray-100 rounded-full overflow-hidden mb-8">
                                <div className="h-full bg-black rounded-full animate-progress"></div>
                            </div>

                            <button
                                onClick={() => setTripState('booking')}
                                className="px-8 py-3 bg-gray-100 text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
                            >
                                Cancel Request
                            </button>
                        </div>
                    </div>
                )}

                {/* Map Area */}
                <div className="flex-1 relative min-w-0 py-4">
                    <TripMap
                        pickup={pickup}
                        destination={destination}
                        stops={stops}
                        isServiceAvailable={isServiceAvailable}
                    />
                </div>

                {/* Trip Receipt Modal */}
                {tripState === 'completed' && (
                    <TripReceipt
                        pickup={pickup}
                        destination={destination}
                        driverName="Alex"
                        rideName="UberX"
                        isDelivery={isDeliveryMode}
                    />
                )}
            </div>

            {/* Pickup Confirmation Modal - Rendered at page level */}
            <ConfirmPickupModal
                isOpen={showPickupConfirm}
                onClose={() => setShowPickupConfirm(false)}
                onConfirm={(location) => {
                    setShowPickupConfirm(false);
                    setTripState('searching');
                }}
                initialLocation={pickup}
            />
        </div>
    );
}

export default function TripPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
            <TripPageContent />
        </Suspense>
    );
}
