
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { RiderModal } from './RiderModal';
import { PickupTimeModal } from './PickupTimeModal';
import { ServiceModeToggle } from './ServiceModeToggle';
import { ServiceTypeSelector } from './ServiceTypeSelector';
import { LocationIcon } from './LocationIcon';
import { LocationPickerModal } from './LocationPickerModal';
import { AddPlaceModal } from './AddPlaceModal';
import { EditPlaceModal } from './EditPlaceModal';
import { SavedPlacesModal } from './SavedPlacesModal';
import { usePlacesAutocomplete } from '@/hooks/usePlacesAutocomplete';
import { useSavedPlaces } from '@/hooks/useSavedPlaces';
import savedPlacesData from '@/mocks/savedPlaces.json';

interface TripSidebarProps {
    pickup: string;
    destination: string;
    onStopsChange?: (stops: string[]) => void;
    serviceMode: 'ride' | 'send' | 'receive';
    onServiceModeChange: (mode: 'ride' | 'send' | 'receive') => void;
    focusedField?: 'pickup' | 'destination' | null;
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

export function TripSidebar({
    pickup: initialPickup,
    destination: initialDestination,
    onStopsChange,
    serviceMode,
    onServiceModeChange,
    focusedField
}: TripSidebarProps) {
    const router = useRouter();
    const [showRiderModal, setShowRiderModal] = useState(false);
    const [showTimeModal, setShowTimeModal] = useState(false);
    const [selectedRider, setSelectedRider] = useState<Rider>({ id: 'me', name: 'Me', type: 'me' });
    const [pickupTime, setPickupTime] = useState('Pick up now');

    const isDeliveryMode = serviceMode === 'send' || serviceMode === 'receive';

    // State for locations including intermediate stops
    const [locations, setLocations] = useState<LocationItem[]>([
        { id: 'pickup', value: initialPickup, type: 'pickup', placeholder: 'Add a pickup location' },
        { id: 'dropoff', value: initialDestination, type: 'destination', placeholder: 'Enter destination' }
    ]);

    const [activeInputId, setActiveInputId] = useState<string | null>(null);
    const [showMapModal, setShowMapModal] = useState(false);
    const [mapModalLocationId, setMapModalLocationId] = useState<string | null>(null);
    const [showAddPlaceModal, setShowAddPlaceModal] = useState(false);
    const [showEditPlaceModal, setShowEditPlaceModal] = useState(false);
    const [showSavedPlacesModal, setShowSavedPlacesModal] = useState(false);
    const [savedPlacesInputId, setSavedPlacesInputId] = useState<string | null>(null);
    const [editingPlace, setEditingPlace] = useState<{ id: string; name: string; address: string } | null>(null);

    // Saved places management
    const { savedPlaces, addPlace, updatePlace, deletePlace } = useSavedPlaces();

    // Get the active input value for Places API
    const activeInput = locations.find(loc => loc.id === activeInputId);
    const { predictions } = usePlacesAutocomplete(activeInput?.value || '', {
        debounceMs: 300,
    });

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            // Don't close if clicking on an input or suggestion
            if (!target.closest('input') && !target.closest('[data-suggestions-dropdown]')) {
                setActiveInputId(null);
            }
        };

        if (activeInputId) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [activeInputId]);

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
        <div className="flex flex-col bg-white rounded-2xl shadow-[0_0_16px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden h-full">
            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
                <div className="p-5 pb-5 flex flex-col">
                    {/* Service Type Selector (Ride vs Delivery) */}
                    <ServiceTypeSelector
                        serviceMode={serviceMode}
                        onModeChange={onServiceModeChange}
                    />

                    {/* Send/Receive Toggle (Delivery mode only) */}
                    {isDeliveryMode && (
                        <ServiceModeToggle
                            mode={serviceMode as 'send' | 'receive'}
                            onChange={(mode) => onServiceModeChange(mode)}
                        />
                    )}

                    {/* Header */}
                    <div className="mb-5">
                        <h2 className="text-[20px] font-bold text-black tracking-tight">
                            {isDeliveryMode ? 'Uber Package' : 'Get a ride'}
                        </h2>
                    </div>

                    {/* Inputs Section */}
                    <div className="space-y-2 relative mb-4">
                        {locations.map((loc, index) => {
                            const isLast = index === locations.length - 1;
                            const isFirst = index === 0;
                            const showClear = loc.value && activeInputId === loc.id && !isLast;
                            const showRemove = loc.type === 'stop' && !isDeliveryMode; // Hide remove in delivery mode

                            // Calculate padding based on visible buttons
                            let paddingRight = 'pr-10';
                            if (showClear && showRemove) {
                                paddingRight = 'pr-20';
                            }

                            const showSuggestions = activeInputId === loc.id;

                            // Check if this field should be highlighted (from location card click)
                            const isHighlighted = focusedField === loc.type;

                            return (
                                <div key={loc.id} className="relative">
                                    {/* Location Icon */}
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                                        {isFirst ? (
                                            <div className="w-3 h-3 rounded-full bg-black"></div>
                                        ) : isLast ? (
                                            <div className="w-3 h-3 bg-black" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                                        ) : (
                                            <div className="w-3 h-3 rounded-sm bg-black"></div>
                                        )}
                                    </div>

                                    {/* Input Field */}
                                    <input
                                        type="text"
                                        value={loc.value}
                                        onChange={(e) => handleLocationChange(loc.id, e.target.value)}
                                        onFocus={() => setActiveInputId(loc.id)}
                                        placeholder={loc.placeholder}
                                        className={`w-full pl-10 ${paddingRight} py-4 bg-[#F3F3F3] rounded-xl text-[15px] font-medium outline-none transition-all ${loc.value ? 'text-black' : 'text-gray-400'
                                            } ${isHighlighted
                                                ? 'ring-4 ring-blue-500 ring-opacity-50 bg-blue-50 animate-pulse'
                                                : 'focus:bg-white focus:ring-2 focus:ring-black'
                                            }`}
                                    />
                                    {/* Clear Button */}
                                    {showClear && (
                                        <button
                                            onClick={() => handleLocationChange(loc.id, '')}
                                            className="absolute right-12 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors z-20"
                                        >
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}

                                    {/* Remove Stop Button */}
                                    {showRemove && (
                                        <button
                                            onClick={() => handleRemoveStop(loc.id)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors z-20"
                                        >
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                                            </svg>
                                        </button>
                                    )}

                                    {/* Enhanced Suggestions Dropdown */}
                                    {showSuggestions && (
                                        <div
                                            data-suggestions-dropdown
                                            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-[400px] overflow-y-auto z-[100]"
                                        >
                                            {/* Current Location (Pickup field only, shown first) */}
                                            {loc.type === 'pickup' && !loc.value && (
                                                <>
                                                    <button
                                                        onMouseDown={(e) => {
                                                            e.preventDefault();
                                                            // Get current location
                                                            if (navigator.geolocation) {
                                                                navigator.geolocation.getCurrentPosition(
                                                                    (position) => {
                                                                        handleLocationSelect(loc.id, `Current Location (${position.coords.latitude}, ${position.coords.longitude})`);
                                                                        setActiveInputId(null);
                                                                    },
                                                                    (error) => {
                                                                        console.error('Error getting location:', error);
                                                                    }
                                                                );
                                                            }
                                                        }}
                                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                                                    >
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                                                            </svg>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-[15px] font-semibold text-black">Use current location</div>
                                                        </div>
                                                    </button>
                                                    <div className="border-t border-gray-100"></div>
                                                </>
                                            )}

                                            {/* Saved Places Button (when field is empty) */}
                                            {!loc.value && (
                                                <>
                                                    <button
                                                        onMouseDown={(e) => {
                                                            e.preventDefault();
                                                            setSavedPlacesInputId(loc.id);
                                                            setShowSavedPlacesModal(true);
                                                            setActiveInputId(null);
                                                        }}
                                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                                                    >
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                            </svg>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-[15px] font-semibold text-black">Saved places</div>
                                                            <div className="text-[13px] text-gray-500">Home, Work, and more</div>
                                                        </div>
                                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                    <div className="border-t border-gray-100"></div>
                                                </>
                                            )}

                                            {/* Places API Predictions */}
                                            {predictions.length > 0 && predictions.map((suggestion, i) => (
                                                <button
                                                    key={i}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        handleLocationSelect(loc.id, suggestion.description);
                                                        setActiveInputId(null);
                                                    }}
                                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                                                >
                                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                        <LocationIcon types={suggestion.types} className="text-black" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-[15px] font-semibold text-black">
                                                            {suggestion.structured_formatting?.main_text || suggestion.description}
                                                        </div>
                                                        {suggestion.structured_formatting?.secondary_text && (
                                                            <div className="text-[13px] text-gray-500">
                                                                {suggestion.structured_formatting.secondary_text}
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
                                            ))}

                                            {/* Set Location on Map */}
                                            {(predictions.length > 0 || loc.value) && (
                                                <>
                                                    <div className="border-t border-gray-100"></div>
                                                    <button
                                                        onMouseDown={(e) => {
                                                            e.preventDefault();
                                                            setMapModalLocationId(loc.id);
                                                            setShowMapModal(true);
                                                            setActiveInputId(null);
                                                        }}
                                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                                                    >
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                                            </svg>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-[15px] font-semibold text-black">Set location on map</div>
                                                        </div>
                                                    </button>
                                                </>
                                            )}

                                            {/* Search for query */}
                                            {loc.value && predictions.length > 0 && (
                                                <>
                                                    <div className="border-t border-gray-100"></div>
                                                    <button
                                                        onMouseDown={(e) => {
                                                            e.preventDefault();
                                                            // Keep the current search
                                                            setActiveInputId(null);
                                                        }}
                                                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3"
                                                    >
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                                                            </svg>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-[15px] font-semibold text-black">Search for {loc.value}</div>
                                                        </div>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Add Stop Button (Ride mode only) */}
                    {!isDeliveryMode && locations.length < 5 && (
                        <button
                            onClick={handleAddStop}
                            className="flex items-center gap-2 text-[14px] text-gray-600 hover:text-black transition-colors mb-4"
                        >
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <span>Add stop</span>
                        </button>
                    )}

                    {/* Time and Rider Selection (Ride mode only) */}
                    {!isDeliveryMode && (
                        <div className="space-y-3 mb-5">
                            {/* Pick up time */}
                            <button
                                onClick={() => setShowTimeModal(true)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-[14px] font-medium text-black">{pickupTime}</span>
                            </button>

                            {/* Rider selection */}
                            <button
                                onClick={() => setShowRiderModal(true)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                                <span className="text-[14px] font-medium text-black">{selectedRider.name}</span>
                            </button>
                        </div>
                    )}
                </div>
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

            {/* Set Location Modal */}
            {showMapModal && mapModalLocationId && (
                <LocationPickerModal
                    isOpen={showMapModal}
                    mode="set"
                    onClose={() => {
                        setShowMapModal(false);
                        setMapModalLocationId(null);
                    }}
                    onConfirm={(location) => {
                        handleLocationSelect(mapModalLocationId, location);
                    }}
                    initialLocation={locations.find(l => l.id === mapModalLocationId)?.value}
                    title={
                        mapModalLocationId === 'pickup' ? 'Set pickup location' :
                            mapModalLocationId === 'dropoff' ? 'Set destination' :
                                'Set stop location'
                    }
                    locationType={
                        locations.find(l => l.id === mapModalLocationId)?.type || 'pickup'
                    }
                />
            )}

            {/* Add Place Modal */}
            <AddPlaceModal
                isOpen={showAddPlaceModal}
                onClose={() => setShowAddPlaceModal(false)}
                onSave={(name, address) => {
                    addPlace(name, address);
                    setShowAddPlaceModal(false);
                }}
            />

            {/* Edit Place Modal */}
            {editingPlace && (
                <EditPlaceModal
                    isOpen={showEditPlaceModal}
                    onClose={() => {
                        setShowEditPlaceModal(false);
                        setEditingPlace(null);
                    }}
                    onSave={(name, address) => {
                        updatePlace(editingPlace.id, name, address);
                        setShowEditPlaceModal(false);
                        setEditingPlace(null);
                    }}
                    onDelete={() => {
                        deletePlace(editingPlace.id);
                        setShowEditPlaceModal(false);
                        setEditingPlace(null);
                    }}
                    initialName={editingPlace.name}
                    initialAddress={editingPlace.address}
                />
            )}

            {/* Saved Places Modal */}
            <SavedPlacesModal
                isOpen={showSavedPlacesModal}
                onClose={() => {
                    setShowSavedPlacesModal(false);
                    setSavedPlacesInputId(null);
                }}
                onSelectPlace={(address) => {
                    if (savedPlacesInputId) {
                        handleLocationSelect(savedPlacesInputId, address);
                    }
                }}
                onAddPlace={() => {
                    setShowSavedPlacesModal(false);
                    setShowAddPlaceModal(true);
                }}
                onEditPlace={(place) => {
                    setEditingPlace({
                        id: place.id,
                        name: place.label,
                        address: place.address
                    });
                    setShowSavedPlacesModal(false);
                    setShowEditPlaceModal(true);
                }}
                savedPlaces={savedPlaces}
            />
        </div>
    );
}
