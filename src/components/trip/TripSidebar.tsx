
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiderModal } from './RiderModal';
import { PickupTimeModal } from './PickupTimeModal';
import { usePlacesAutocomplete } from '@/hooks/usePlacesAutocomplete';

interface TripSidebarProps {
    pickup: string;
    destination: string;
    onStopsChange?: (stops: string[]) => void; // Callback when stops change
}



export interface Rider {
    id: string;
    name: string;
    type: 'me' | 'guest';
    phoneNumber?: string;
}

type LocationItem = {
    id: string;
    value: string;
    type: 'pickup' | 'destination' | 'stop';
    placeholder: string;
};

export function TripSidebar({ pickup: initialPickup, destination: initialDestination, onStopsChange }: TripSidebarProps) {
    const router = useRouter();
    const [showRiderModal, setShowRiderModal] = useState(false);
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [selectedRider, setSelectedRider] = useState<Rider>({ id: 'me', name: 'Me', type: 'me' });
    const [pickupTime, setPickupTime] = useState('Pick up now');

    // State for locations including intermediate stops
    const [locations, setLocations] = useState<LocationItem[]>([
        { id: 'pickup', value: initialPickup, type: 'pickup', placeholder: 'Add a pickup location' },
        { id: 'dropoff', value: initialDestination, type: 'destination', placeholder: 'Enter destination' }
    ]);

    const [activeInputId, setActiveInputId] = useState<string | null>(null);

    // Get the active input value for Places API
    const activeInput = locations.find(loc => loc.id === activeInputId);
    const { predictions } = usePlacesAutocomplete(activeInput?.value || '', {
        debounceMs: 300,
    });

    const handleAddStop = () => {
        if (locations.length >= 5) return; // Max 5 stops

        const newLocations = [...locations];
        // Insert before the last item (destination)
        const insertIndex = newLocations.length - 1;
        const newId = `stop-${Date.now()}`;
        newLocations.splice(insertIndex, 0, {
            id: newId,
            value: '',
            type: 'stop' as const,
            placeholder: 'Add a stop'
        });

        setLocations(newLocations);
        setActiveInputId(newId);
    };

    const handleRemoveStop = (id: string) => {
        setLocations(locations.filter(loc => loc.id !== id));
    };

    const handleLocationChange = (id: string, newValue: string) => {
        setLocations(locations.map(loc =>
            loc.id === id ? { ...loc, value: newValue } : loc
        ));
    };

    const handleLocationSelect = (id: string, selectedValue: string) => {
        const updatedLocations = locations.map(loc =>
            loc.id === id ? { ...loc, value: selectedValue } : loc
        );
        setLocations(updatedLocations);
        setActiveInputId(null);

        // Update URL parameters when pickup or destination changes
        const pickupLoc = updatedLocations.find(l => l.type === 'pickup');
        const destLoc = updatedLocations.find(l => l.type === 'destination');

        if (pickupLoc?.value && destLoc?.value) {
            const params = new URLSearchParams();
            params.set('pickup', pickupLoc.value);
            params.set('destination', destLoc.value);
            router.push(`/trip?${params.toString()}`);
        }

        // Notify parent of stops changes
        if (onStopsChange) {
            const stopValues = updatedLocations
                .filter(l => l.type === 'stop' && l.value)
                .map(l => l.value);
            onStopsChange(stopValues);
        }
    };

    return (
        <div className="flex flex-col bg-white rounded-2xl shadow-[0_0_16px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
            <div className="p-5 pb-0 flex flex-col h-full">
                {/* Header */}
                <div className="mb-5 flex-shrink-0">
                    <h2 className="text-[20px] font-bold text-black tracking-tight">Get a ride</h2>
                </div>

                {/* Inputs Section */}
                <div className="space-y-2 relative mb-4 flex-shrink-0">
                    {locations.map((loc, index) => {
                        const isLast = index === locations.length - 1;
                        const isFirst = index === 0;
                        const showClear = loc.value && activeInputId === loc.id && !isLast;
                        const showRemove = loc.type === 'stop';

                        // Calculate padding based on visible buttons
                        let paddingRight = 'pr-10';
                        if (showRemove && showClear) paddingRight = 'pr-24';
                        else if (showRemove || showClear || isLast) paddingRight = 'pr-12';

                        return (
                            <div key={loc.id} className="relative group">
                                {/* Icon */}
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                                    {isFirst ? (
                                        <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                                    ) : isLast ? (
                                        <div className="w-2.5 h-2.5 bg-black"></div>
                                    ) : (
                                        <div className="w-4 h-4 bg-black text-white text-[10px] font-bold flex items-center justify-center">
                                            {index}
                                        </div>
                                    )}
                                </div>

                                {/* Input Field */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={loc.value}
                                        onChange={(e) => handleLocationChange(loc.id, e.target.value)}
                                        onFocus={() => setActiveInputId(loc.id)}
                                        placeholder={loc.placeholder}
                                        className={`w-full pl-12 ${paddingRight} py-3.5 bg-[#F3F3F3] rounded-xl text-[16px] font-medium text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black transition-all ${activeInputId === loc.id ? 'bg-white ring-2 ring-black' : 'hover:bg-[#E8E8E8]'
                                            }`}
                                    />

                                    {/* Add Stop Button (Only on the last item) */}
                                    {isLast && (
                                        <button
                                            onClick={handleAddStop}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors z-20"
                                            title="Add stop"
                                        >
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    )}

                                    {/* Remove Stop Button */}
                                    {showRemove && (
                                        <button
                                            onClick={() => handleRemoveStop(loc.id)}
                                            className={`absolute ${showClear ? 'right-12' : 'right-4'} top-1/2 -translate-y-1/2 w-6 h-6 bg-[#E2E2E2] rounded-full flex items-center justify-center hover:bg-[#D4D4D4] transition-colors z-20`}
                                            title="Remove stop"
                                        >
                                            <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}

                                    {/* Clear Button */}
                                    {showClear && (
                                        <button
                                            onClick={() => handleLocationChange(loc.id, '')}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#E2E2E2] rounded-full flex items-center justify-center hover:bg-[#D4D4D4] transition-colors z-20"
                                        >
                                            <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                {/* Dropdown Suggestions */}
                                {activeInputId === loc.id && predictions.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-100">
                                        {predictions.map((suggestion, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleLocationSelect(loc.id, suggestion)}
                                                className="w-full text-left px-6 py-4 hover:bg-gray-50 flex items-center gap-4 border-b border-gray-50 last:border-0"
                                            >
                                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                                    </svg>
                                                </div>
                                                <span className="text-[16px] font-medium text-black">{suggestion}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Time Selector */}
                <button
                    onClick={() => setShowTimeModal(true)}
                    className="w-full flex-shrink-0 flex items-center justify-between px-4 py-3 bg-[#F3F3F3] rounded-xl mb-2 hover:bg-[#E8E8E8] transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                            </svg>
                        </div>
                        <span className="text-[16px] font-bold text-black">{pickupTime}</span>
                    </div>
                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Rider Selector */}
                <button
                    onClick={() => setShowRiderModal(true)}
                    className="w-fit flex-shrink-0 flex items-center gap-3 px-4 py-2 bg-[#F3F3F3] rounded-full hover:bg-[#E8E8E8] transition-colors mb-4"
                >
                    <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <span className="text-[14px] font-medium text-black">
                        {selectedRider.type === 'me' ? 'For me' : selectedRider.name}
                    </span>
                    <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {/* Modals */}
            {showRiderModal && (
                <RiderModal
                    selectedRider={selectedRider}
                    onSelect={setSelectedRider}
                    onClose={() => setShowRiderModal(false)}
                    isOpen={showRiderModal}
                />
            )}

            {showTimeModal && (
                <PickupTimeModal
                    pickupName={locations.find(l => l.id === 'pickup')?.value || 'Pickup Location'}
                    onClose={() => setShowTimeModal(false)}
                    onSchedule={(date, time) => {
                        setPickupTime(`${date.toLocaleDateString()}, ${time}`);
                        setShowTimeModal(false);
                    }}
                    isOpen={showTimeModal}
                />
            )}
        </div>
    );
}
