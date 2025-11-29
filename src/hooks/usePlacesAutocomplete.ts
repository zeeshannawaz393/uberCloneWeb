/**
 * usePlacesAutocomplete Hook
 * Provides Google Places Autocomplete predictions with debouncing
 */

'use client';

import { useState, useEffect, useRef } from 'react';

interface PlacesAutocompleteOptions {
    debounceMs?: number;
    componentRestrictions?: { country?: string | string[] };
}

export function usePlacesAutocomplete(
    input: string,
    options: PlacesAutocompleteOptions = {}
) {
    const { debounceMs = 300, componentRestrictions } = options;
    const [predictions, setPredictions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const serviceRef = useRef<any>(null);
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Initialize AutocompleteService when Google Maps is loaded
        if (typeof window !== 'undefined' && window.google?.maps?.places) {
            serviceRef.current = new window.google.maps.places.AutocompleteService();
        }
    }, []);

    useEffect(() => {
        // Clear previous timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        // Reset if input is empty
        if (!input || input.trim().length === 0) {
            setPredictions([]);
            setLoading(false);
            setError(null);
            return;
        }

        // Don't search if input is too short
        if (input.trim().length < 2) {
            setPredictions([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        // Debounce the API call
        debounceTimerRef.current = setTimeout(() => {
            if (!serviceRef.current) {
                // If service not ready, try to initialize
                if (typeof window !== 'undefined' && window.google?.maps?.places) {
                    serviceRef.current = new window.google.maps.places.AutocompleteService();
                } else {
                    setError('Google Maps not loaded');
                    setLoading(false);
                    return;
                }
            }

            const request: any = {
                input: input.trim(),
            };

            // Add component restrictions if provided
            if (componentRestrictions) {
                request.componentRestrictions = componentRestrictions;
            }

            serviceRef.current.getPlacePredictions(
                request,
                (predictions: any[], status: string) => {
                    setLoading(false);

                    if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                        // Return full prediction objects with structured_formatting
                        setPredictions(predictions);
                        setError(null);
                    } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
                        setPredictions([]);
                        setError(null);
                    } else {
                        console.error('Places Autocomplete error:', status);
                        setPredictions([]);
                        setError('Failed to fetch suggestions');
                    }
                }
            );
        }, debounceMs);

        // Cleanup
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [input, debounceMs, componentRestrictions]);

    return { predictions, loading, error };
}
