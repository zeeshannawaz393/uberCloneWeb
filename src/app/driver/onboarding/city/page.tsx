'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/driver/ProgressBar';
import { useDriverOnboarding } from '@/features/driver/driver.state';

const UK_CITIES = [
    'London',
    'Manchester',
    'Birmingham',
    'Leeds',
    'Glasgow',
    'Edinburgh',
    'Liverpool',
    'Bristol',
    'Sheffield',
    'Newcastle',
    'Cardiff',
    'Belfast',
    'Nottingham',
    'Leicester',
    'Brighton',
    'Other'
];

export default function CitySelectionPage() {
    const router = useRouter();
    const { city, setCity, setCurrentStep } = useDriverOnboarding();
    const [selectedCity, setSelectedCity] = useState(city || '');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCities = UK_CITIES.filter(c =>
        c.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleContinue = () => {
        if (!selectedCity) return;

        setCity(selectedCity);
        setCurrentStep(2);
        router.push('/driver/onboarding/personal');
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-5 sm:p-8 md:p-12 shadow-sm w-full max-w-md">
                <h1 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
                    Where will you drive?
                </h1>

                <ProgressBar currentStep={1} totalSteps={6} />

                <input
                    type="text"
                    placeholder="Type to search cities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-12 px-4 text-[15px] sm:text-base border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-black transition-colors"
                />

                <div className="space-y-2 max-h-64 overflow-y-auto mb-6">
                    {filteredCities.map((cityName) => (
                        <label
                            key={cityName}
                            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg border-2 transition-all cursor-pointer ${selectedCity === cityName
                                ? 'border-black bg-gray-50'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <input
                                type="radio"
                                name="city"
                                value={cityName}
                                checked={selectedCity === cityName}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                            />
                            <span className={`${selectedCity === cityName ? 'font-medium' : ''}`}>
                                {cityName}
                            </span>
                        </label>
                    ))}
                </div>

                <button
                    onClick={handleContinue}
                    disabled={!selectedCity}
                    className="w-full h-12 bg-black text-white rounded-lg text-[15px] sm:text-base font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-5 sm:mb-6"
                >
                    Continue
                </button>

                <button
                    onClick={() => router.back()}
                    className="w-full text-center text-sm text-gray-600 hover:text-gray-700"
                >
                    Back
                </button>
            </div>
        </main>
    );
}
