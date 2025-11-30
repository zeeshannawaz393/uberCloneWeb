'use client';

import { useState, useEffect, useRef } from 'react';

interface LocationPickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (location: string) => void;
    initialLocation?: string;
    mode: 'set' | 'confirm';
    locationType?: 'pickup' | 'destination' | 'stop';
    title?: string;
}

declare global {
    interface Window {
        google: any;
        initMap: () => void;
    }
}

export function LocationPickerModal({
    isOpen,
    onClose,
    onConfirm,
    initialLocation = '',
    mode = 'set',
    locationType = 'pickup',
    title
}: LocationPickerModalProps) {
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);
    const [mapCenter, setMapCenter] = useState({ lat: 31.5204, lng: 74.3587 }); // Lahore default
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const markerRef = useRef<any>(null);

    useEffect(() => {
        if (!isOpen) return;

        // Load Google Maps script
        const loadGoogleMaps = () => {
            if (window.google) {
                initializeMap();
                return;
            }

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,marker&v=beta`;
            script.async = true;
            script.defer = true;
            script.onload = initializeMap;
            document.head.appendChild(script);
        };

        const initializeMap = () => {
            if (!mapRef.current || !window.google) return;

            // Initialize map
            const map = new window.google.maps.Map(mapRef.current, {
                center: mapCenter,
                zoom: 16,
                mapId: 'DEMO_MAP_ID',
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
            });

            mapInstanceRef.current = map;

            // Add invisible marker at center (for position tracking)
            const markerContent = document.createElement('div');
            markerContent.style.width = '0';
            markerContent.style.height = '0';

            const marker = new window.google.maps.marker.AdvancedMarkerElement({
                position: mapCenter,
                map: map,
                content: markerContent,
            });

            markerRef.current = marker;

            // Update marker position when map moves
            map.addListener('center_changed', () => {
                const center = map.getCenter();
                if (center) {
                    marker.setPosition(center);
                }
            });

            // Reverse geocode on idle (when user stops dragging)
            map.addListener('idle', () => {
                const center = map.getCenter();
                if (center) {
                    reverseGeocode(center.lat(), center.lng());
                }
            });
        };

        const reverseGeocode = (lat: number, lng: number) => {
            if (!window.google) return;

            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode(
                { location: { lat, lng } },
                (results: any[], status: string) => {
                    if (status === 'OK' && results[0]) {
                        setSelectedLocation(results[0].formatted_address);
                    }
                }
            );
        };

        loadGoogleMaps();
    }, [isOpen, mapCenter]);

    // Sync selectedLocation with initialLocation when it changes
    useEffect(() => {
        if (initialLocation) {
            setSelectedLocation(initialLocation);
        }
    }, [initialLocation]);

    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm(selectedLocation);
        onClose(); // Close modal for both modes
    };

    // Get appropriate icon based on location type
    const getLocationIcon = () => {
        switch (locationType) {
            case 'pickup':
                return <div className="w-3 h-3 rounded-full bg-black"></div>;
            case 'destination':
                return (
                    <div className="w-3 h-3 bg-black" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                );
            case 'stop':
                return <div className="w-3 h-3 rounded-sm bg-black"></div>;
            default:
                return <div className="w-3 h-3 rounded-full bg-black"></div>;
        }
    };

    // Get title based on mode and locationType
    const getTitle = () => {
        if (title) return title;

        if (mode === 'confirm') {
            return 'Confirm pickup';
        }

        switch (locationType) {
            case 'pickup':
                return 'Set pickup location';
            case 'destination':
                return 'Set destination';
            case 'stop':
                return 'Set stop location';
            default:
                return 'Set location';
        }
    };

    // Get button text based on mode
    const getButtonText = () => {
        if (mode === 'confirm') {
            return 'Confirm Pickup Location';
        }
        return 'Confirm location';
    };

    return (
        <div className="fixed inset-0 z-[200] flex bg-white transition-none">
            {/* Desktop: Left Side - Confirmation Card */}
            <div className="hidden lg:flex w-[400px] flex-col bg-white border-r border-gray-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-4">
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-bold text-black">{getTitle()}</h2>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-6">
                    {/* Instruction */}
                    <div className="mb-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <p className="text-sm font-medium text-blue-900">Move the map to adjust</p>
                                    <p className="text-xs text-blue-700 mt-1">Drag the map to position the pin at your exact location</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Location Display */}
                    <div className="mb-6">
                        <label className="text-sm font-medium text-gray-600 mb-2 block">
                            {mode === 'confirm' ? 'Pickup location' : 'Selected location'}
                        </label>
                        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="mt-1.5 flex-shrink-0">
                                {getLocationIcon()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-black break-words">
                                    {selectedLocation || 'Move map to select location'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1"></div>

                    {/* Action Buttons */}
                    <div className="space-y-3 relative z-10">
                        <button
                            onClick={handleConfirm}
                            disabled={!selectedLocation}
                            className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg cursor-pointer relative z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {getButtonText()}
                        </button>
                        {mode === 'set' && (
                            <button
                                onClick={onClose}
                                className="w-full py-3 text-black font-medium hover:bg-gray-100 rounded-xl transition-colors cursor-pointer relative z-10"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile: Top Back Button */}
            <button
                onClick={onClose}
                className="lg:hidden fixed top-4 left-4 z-30 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Right Side - Interactive Map (Full width on mobile) */}
            <div className="flex-1 relative">
                {/* Map Container */}
                <div ref={mapRef} className="absolute inset-0"></div>

                {/* Center Pin Overlay */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none z-20">
                    <svg className="w-12 h-12 text-black drop-shadow-2xl" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                </div>

                {/* Desktop: Instruction Overlay */}
                <div className="hidden lg:block absolute top-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-200 z-20">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                        </svg>
                        <p className="text-sm font-medium text-black">Drag map to adjust pin</p>
                    </div>
                </div>

                {/* Mobile: Bottom Sheet with Controls */}
                <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-20">
                    {/* Drag Handle */}
                    <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-4" />

                    {/* Content */}
                    <div className="px-4 pb-6">
                        {/* Title */}
                        <h2 className="text-xl font-bold text-black mb-4">{getTitle()}</h2>

                        {/* Instruction */}
                        <div className="mb-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                                <div className="flex items-start gap-2">
                                    <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-xs text-blue-700">Drag the map to position the pin at your exact location</p>
                                </div>
                            </div>
                        </div>

                        {/* Location Display */}
                        <div className="mb-4">
                            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-black">
                                        {selectedLocation || 'Locating...'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Confirm Button */}
                        <button
                            onClick={() => {
                                console.log('🔵 Mobile Confirm Button Clicked', {
                                    selectedLocation,
                                    mode,
                                    disabled: !selectedLocation
                                });
                                handleConfirm();
                            }}
                            disabled={!selectedLocation}
                            className="w-full bg-black text-white py-4 rounded-xl font-bold text-base hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed relative z-30"
                            style={{ pointerEvents: 'auto' }}
                        >
                            {getButtonText()}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
