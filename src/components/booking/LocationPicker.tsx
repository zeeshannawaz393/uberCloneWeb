/**
 * Location Picker Component
 * Combined pickup and destination inputs with Google Places API
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LocationInput } from './LocationInput';

export function LocationPicker() {
    const router = useRouter();
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');

    const handleSeePrices = () => {
        // Validation
        if (!pickup.trim()) {
            alert('Please enter a pickup location');
            return;
        }

        if (!destination.trim()) {
            alert('Please enter a destination');
            return;
        }

        // Navigate to trip page with query params
        const params = new URLSearchParams({
            pickup,
            destination,
        });

        router.push(`/trip?${params.toString()}`);
    };

    return (
        <div className="w-full max-w-2xl space-y-3">
            {/* Heading */}
            <h2 className="text-[18px] text-gray-700 mb-4">
                Discover the convenience of Uber. Request a ride now, or schedule one for later directly from your browser.
            </h2>

            {/* Pickup Location */}
            <LocationInput
                type="pickup"
                value={pickup}
                onChange={setPickup}
                onSelect={setPickup}
                placeholder="Enter location"
            />

            {/* Destination */}
            <LocationInput
                type="destination"
                value={destination}
                onChange={setDestination}
                onSelect={setDestination}
                placeholder="Enter destination"
            />

            {/* See Prices Button */}
            <button
                onClick={handleSeePrices}
                className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-lg text-[16px] font-semibold hover:bg-gray-800 transition-colors"
            >
                See prices
            </button>
        </div>
    );
}
