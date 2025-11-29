/**
 * Location Input Component
 * Uber-style autocomplete input with Google Places API
 */

'use client';

import { useState, useRef } from 'react';
import { usePlacesAutocomplete } from '@/hooks/usePlacesAutocomplete';

interface LocationInputProps {
    type: 'pickup' | 'destination';
    value: string;
    onChange: (value: string) => void;
    onSelect: (location: string) => void;
    placeholder: string;
    onFocus?: () => void;
    onBlur?: () => void;
}

export function LocationInput({
    type,
    value,
    onChange,
    onSelect,
    placeholder,
    onFocus,
    onBlur,
}: LocationInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Use Places API for autocomplete
    const { predictions, loading } = usePlacesAutocomplete(value, {
        debounceMs: 300,
    });

    const handleFocus = () => {
        setIsFocused(true);
        onFocus?.();
    };

    const handleBlur = () => {
        // Delay to allow click on suggestion
        setTimeout(() => {
            setIsFocused(false);
            onBlur?.();
        }, 200);
    };

    const handleClear = () => {
        onChange('');
        inputRef.current?.focus();
    };

    const handleSelectSuggestion = (suggestion: string) => {
        onSelect(suggestion);
        setIsFocused(false);
    };

    return (
        <div className="relative">
            {/* Input Field */}
            <div
                className={`flex items-center gap-3 px-4 py-4 bg-[#F6F6F6] rounded-lg transition-all ${isFocused ? 'ring-2 ring-black bg-white' : ''
                    }`}
            >
                {/* Icon */}
                <div className="flex-shrink-0">
                    {type === 'pickup' ? (
                        <div className="w-3 h-3 rounded-full bg-black"></div>
                    ) : (
                        <div className="w-3 h-3 bg-black"></div>
                    )}
                </div>

                {/* Input */}
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent outline-none text-[16px] text-black placeholder:text-[#6B6B6B]"
                />

                {/* Loading Indicator */}
                {loading && (
                    <div className="flex-shrink-0">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Clear Button */}
                {value && !loading && (
                    <button
                        onClick={handleClear}
                        className="flex-shrink-0 w-6 h-6 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                        <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
            </div>

            {/* Suggestions Dropdown */}
            {isFocused && predictions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden z-50 max-h-[400px] overflow-y-auto">
                    {predictions.map((prediction, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelectSuggestion(prediction.description)}
                            className="w-full px-6 py-4 text-left hover:bg-[#F6F6F6] transition-colors border-b border-[#EEEEEE] last:border-b-0 flex items-center gap-3"
                        >
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <div className="text-[15px] font-semibold text-black">
                                    {prediction.structured_formatting?.main_text || prediction.description}
                                </div>
                                {prediction.structured_formatting?.secondary_text && (
                                    <div className="text-[13px] text-gray-500">
                                        {prediction.structured_formatting.secondary_text}
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
