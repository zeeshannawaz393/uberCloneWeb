/**
 * useSavedPlaces Hook
 * Manages saved places with localStorage persistence
 */

'use client';

import { useState, useEffect } from 'react';
import savedPlacesData from '@/mocks/savedPlaces.json';

export interface SavedPlace {
    id: string;
    label: string;
    address: string;
    icon: string;
    editable?: boolean;
}

const STORAGE_KEY = 'uber_saved_places';

export function useSavedPlaces() {
    const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>([]);

    // Load saved places from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setSavedPlaces(parsed);
            } catch (error) {
                console.error('Error parsing saved places:', error);
                // Fallback to default places
                const defaultPlaces = [savedPlacesData.home, savedPlacesData.work];
                setSavedPlaces(defaultPlaces);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPlaces));
            }
        } else {
            // Initialize with default places
            const defaultPlaces = [savedPlacesData.home, savedPlacesData.work];
            setSavedPlaces(defaultPlaces);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPlaces));
        }
    }, []);

    // Save to localStorage whenever places change
    const updateStorage = (places: SavedPlace[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(places));
        setSavedPlaces(places);
    };

    const addPlace = (name: string, address: string) => {
        const newPlace: SavedPlace = {
            id: `custom_${Date.now()}`,
            label: name,
            address: address,
            icon: 'custom',
            editable: true
        };
        const updated = [...savedPlaces, newPlace];
        updateStorage(updated);
    };

    const updatePlace = (id: string, name: string, address: string) => {
        const updated = savedPlaces.map(place =>
            place.id === id
                ? { ...place, label: name, address: address }
                : place
        );
        updateStorage(updated);
    };

    const deletePlace = (id: string) => {
        const updated = savedPlaces.filter(place => place.id !== id);
        updateStorage(updated);
    };

    return {
        savedPlaces,
        addPlace,
        updatePlace,
        deletePlace
    };
}
