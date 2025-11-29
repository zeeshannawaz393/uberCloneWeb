/**
 * Country Selector Component
 * Dropdown for selecting country code
 */

'use client';

import { useState } from 'react';

interface Country {
    code: string;
    name: string;
    flag: string;
}

const countries: Country[] = [
    { code: '+1', name: 'United States', flag: '🇺🇸' },
    { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+86', name: 'China', flag: '🇨🇳' },
    { code: '+81', name: 'Japan', flag: '🇯🇵' },
];

interface CountrySelectorProps {
    value: string;
    onChange: (code: string) => void;
}

export function CountrySelector({ value, onChange }: CountrySelectorProps) {
    const [isOpen, setIsOpen] = useState(false);

    const selectedCountry = countries.find(c => c.code === value) || countries[0];

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="h-12 flex items-center gap-2 px-3 sm:px-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors bg-white"
            >
                <span className="text-xl sm:text-2xl">{selectedCountry.flag}</span>
                <span className="text-[14px] sm:text-base font-medium">{selectedCountry.code}</span>
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                        {countries.map((country) => (
                            <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                    onChange(country.code);
                                    setIsOpen(false);
                                }}
                                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-left
                  hover:bg-gray-100 transition-colors
                  ${country.code === value ? 'bg-gray-50' : ''}
                `}
                            >
                                <span className="text-2xl">{country.flag}</span>
                                <div className="flex-1">
                                    <div className="font-medium">{country.name}</div>
                                    <div className="text-sm text-gray-600">{country.code}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
