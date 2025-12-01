/**
 * Trip Booking Page - Responsive
 * Desktop: Three-column layout (Inputs | Ride Options | Map)
 * Mobile: Two-stage flow (INPUT_MODE → BOOKING_MODE)
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
import { LocationPickerModal } from '@/components/trip/LocationPickerModal';
import { PaymentMethodModal } from '@/components/trip/PaymentMethodModal';
import { Header } from '@/components/navigation/Header';
import { DeliveryDetails } from '@/types/delivery';
import { BottomSheet } from '@/components/trip/BottomSheet';

type MobileView = 'input' | 'booking';

function TripPageContent() {
    const searchParams = useSearchParams();
    const pickup = searchParams.get('pickup') || '';
    const destination = searchParams.get('destination') || '';

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

    // Mobile view state management
    const [mobileView, setMobileView] = useState<MobileView>('input');

    // Track which field should be focused (for location card clicks)
    const [focusedField, setFocusedField] = useState<'pickup' | 'destination' | null>(null);

    // Payment method state
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    // Auto-switch to booking mode when both locations are set (mobile only)
    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            if (pickup && destination) {
                setMobileView('booking');
            } else {
                setMobileView('input');
            }
        }
    }, [pickup, destination]);

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

    // Handlers for location card clicks
    const handlePickupCardClick = () => {
        // On mobile, switch to INPUT_MODE
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            setMobileView('input');
        }
        // Set focused field for highlighting
        setFocusedField('pickup');
        // Clear focus after a short delay
        setTimeout(() => setFocusedField(null), 2000);
    };

    const handleDestinationCardClick = () => {
        // On mobile, switch to INPUT_MODE
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            setMobileView('input');
        }
        // Set focused field for highlighting
        setFocusedField('destination');
        // Clear focus after a short delay
        setTimeout(() => setFocusedField(null), 2000);
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

    // Redirect if no locations provided - REMOVED to allow direct access to /trip
    // if (!pickup || !destination) {
    //     redirect('/');
    // }

    // Mock service availability check
    const UNAVAILABLE_LOCATIONS = [
        'Lahore Zoo',
        'LAHORE ORGANIC VILLAGE',
    ];

    const isServiceAvailable = !pickup || !UNAVAILABLE_LOCATIONS.some((loc) =>
        pickup.toLowerCase().includes(loc.toLowerCase())
    );

    // Handle searching state transition
    useEffect(() => {
        console.log('🔄 Trip State Changed:', tripState);
        if (tripState === 'searching') {
            console.log('⏱️ Starting 3-second timer for searching state...');
            const timer = setTimeout(() => {
                console.log('✅ Timer complete - transitioning to on_trip');
                setTripState('on_trip');
            }, 3000);
            return () => {
                console.log('🧹 Cleaning up timer');
                clearTimeout(timer);
            };
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
            {/* Header - Hidden on mobile */}
            <div className="hidden lg:block">
                <Header />
            </div>

            {/* MOBILE LAYOUT (< 1024px) */}
            <div className="lg:hidden flex-1 flex flex-col overflow-hidden">
                {tripState === 'on_trip' || tripState === 'completed' ? (
                    // ON_TRIP/COMPLETED MODE: Map + RideStatusCard/TripReceipt
                    <div className="relative h-full overflow-hidden">
                        {/* Map Container */}
                        <div className="absolute inset-0">
                            <TripMap
                                pickup={pickup}
                                destination={destination}
                                stops={stops}
                                isServiceAvailable={isServiceAvailable}
                                showLocationCards={false}
                                onEditPickup={handlePickupCardClick}
                                onEditDestination={handleDestinationCardClick}
                                onEditStop={() => { }}
                            />
                        </div>

                        {/* RideStatusCard or TripReceipt Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 z-20">
                            {tripState === 'completed' ? (
                                <TripReceipt
                                    pickup={pickup}
                                    destination={destination}
                                    driverName="Alex"
                                    rideName="UberX"
                                    isDelivery={isDeliveryMode}
                                />
                            ) : (
                                <RideStatusCard
                                    pickup={pickup}
                                    destination={destination}
                                    onCancel={() => setTripState('booking')}
                                    onTripComplete={() => setTripState('completed')}
                                />
                            )}
                        </div>
                    </div>
                ) : mobileView === 'input' ? (
                    // INPUT_MODE: TripSidebar + Small Map
                    <>
                        <div className="flex-shrink-0 p-4">
                            <TripSidebar
                                pickup={pickup}
                                destination={destination}
                                onStopsChange={setStops}
                                serviceMode={serviceMode}
                                onServiceModeChange={setServiceMode}
                                focusedField={focusedField}
                            />
                        </div>
                        <div className="flex-1 min-h-[200px]">
                            <TripMap
                                pickup={pickup}
                                destination={destination}
                                stops={[]}
                                isServiceAvailable={isServiceAvailable}
                                showLocationCards={!!(pickup && destination)}
                                onEditPickup={handlePickupCardClick}
                                onEditDestination={handleDestinationCardClick}
                                onEditStop={() => { }}
                            />
                        </div>
                    </>
                ) : (
                    // BOOKING_MODE: Map + Bottom Sheet (Fixed, no scroll)
                    <div className="relative h-full overflow-hidden">
                        {/* Back Button */}
                        <button
                            onClick={() => setMobileView('input')}
                            className="absolute top-20 left-4 z-30 bg-white rounded-full p-2 shadow-lg"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Map Container (60vh) with integrated location cards */}
                        <div className="relative h-[60vh] flex-shrink-0">
                            <TripMap
                                pickup={pickup}
                                destination={destination}
                                stops={stops}
                                isServiceAvailable={isServiceAvailable}
                                showLocationCards={true}
                                onEditPickup={handlePickupCardClick}
                                onEditDestination={handleDestinationCardClick}
                                onEditStop={() => { }}
                            />
                        </div>

                        {/* Bottom Sheet with Ride Options */}
                        <BottomSheet>
                            {/* Header - Choose a ride */}
                            <div className="text-center py-2 border-b border-gray-100">
                                <h2 className="text-lg font-semibold">Choose a ride</h2>
                            </div>

                            {/* Content with proper spacing - px-4 to match footer button */}
                            <div className="pb-32 px-4">
                                {/* Ride Options */}
                                {isLoadingRideOptions ? (
                                    <div className="space-y-2 pt-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
                                        ))}
                                    </div>
                                ) : isDeliveryMode ? (
                                    <div className="pt-4">
                                        <CourierOptions
                                            selectedCourier={selectedCourier}
                                            onSelect={handleCourierSelect}
                                        />
                                    </div>
                                ) : (
                                    <div className="pt-4">
                                        <RideOptions
                                            key={`${pickup}-${destination}`}
                                            onRequestClick={() => setShowPickupConfirm(true)}
                                            pickup={pickup}
                                        />
                                    </div>
                                )}
                            </div>
                        </BottomSheet>

                        {/* Mobile Footer - Payment & Request Button */}
                        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
                            {/* Payment Method Selector */}
                            <button
                                onClick={() => setShowPaymentModal(true)}
                                className="w-full flex items-center justify-between p-3 mb-3 hover:bg-gray-50 rounded-xl transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedPaymentMethod ? 'bg-green-100' : 'bg-gray-100'
                                        }`}>
                                        <svg className={`w-6 h-6 ${selectedPaymentMethod ? 'text-green-600' : 'text-gray-600'
                                            }`} fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                                        </svg>
                                    </div>
                                    <span className="text-base font-medium text-black">
                                        {selectedPaymentMethod || 'Select payment method'}
                                    </span>
                                </div>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Request Button */}
                            <button
                                onClick={() => setShowPickupConfirm(true)}
                                className="w-full bg-black text-white py-4 rounded-xl font-bold text-base hover:bg-gray-800 transition-colors"
                            >
                                Request {serviceMode === 'ride' ? 'UberX' : 'Delivery'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* DESKTOP LAYOUT (>= 1024px) */}
            <div className="hidden lg:flex flex-1 overflow-hidden pt-20 p-6 gap-6 relative items-start">

                {/* Left Panel Area */}
                <div className="w-[350px] flex-shrink-0 z-20 flex flex-col gap-4">
                    {tripState === 'booking' && (
                        <TripSidebar
                            pickup={pickup}
                            destination={destination}
                            onStopsChange={setStops}
                            serviceMode={serviceMode}
                            onServiceModeChange={setServiceMode}
                            focusedField={focusedField}
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

                {/* Middle/Overlay Area - Only show when we have both locations */}
                {tripState === 'booking' && pickup && destination && (
                    <div className="w-[500px] flex-shrink-0 z-10 h-full overflow-hidden">
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



                {/* Map Area */}
                <div className="flex-1 relative min-w-0 h-full">
                    <TripMap
                        pickup={pickup}
                        destination={destination}
                        stops={stops}
                        isServiceAvailable={isServiceAvailable}
                        showLocationCards={!!(tripState === 'booking' && pickup && destination)}
                        onEditPickup={handlePickupCardClick}
                        onEditDestination={handleDestinationCardClick}
                        onEditStop={() => { }}
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

            {/* Searching Overlay - Page Level */}
            {tripState === 'searching' && (
                <div className="fixed inset-0 z-[250] bg-white/80 backdrop-blur-sm flex items-center justify-center">
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

            {/* Pickup Confirmation Modal - Rendered at page level */}
            <LocationPickerModal
                isOpen={showPickupConfirm}
                mode="confirm"
                locationType="pickup"
                onClose={() => {
                    console.log('🔴 Modal onClose called');
                    setShowPickupConfirm(false);
                }}
                onConfirm={(location: string) => {
                    console.log('🟢 Modal onConfirm called', { location, currentState: tripState });
                    setShowPickupConfirm(false);
                    console.log('🟡 Setting trip state to searching...');
                    setTripState('searching');
                    console.log('✅ Trip state set to searching');
                }}
                initialLocation={pickup}
            />

            {/* Payment Method Modal */}
            <PaymentMethodModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                onSelect={(method) => {
                    setSelectedPaymentMethod(method);
                    setShowPaymentModal(false);
                }}
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
