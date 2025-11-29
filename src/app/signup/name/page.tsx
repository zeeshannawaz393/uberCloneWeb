/**
 * Screens 6-7: Name Entry
 * First and last name collection
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSignupState } from '@/features/signup/signup.state';

export default function NamePage() {
    const router = useRouter();
    const { firstName, lastName, setName, setCurrentStep } = useSignupState();

    const [firstNameValue, setFirstNameValue] = useState(firstName);
    const [lastNameValue, setLastNameValue] = useState(lastName);
    const [isNextEnabled, setIsNextEnabled] = useState(false);

    useEffect(() => {
        // Enable Next button when both names are filled
        setIsNextEnabled(
            firstNameValue.trim().length > 0 && lastNameValue.trim().length > 0
        );
    }, [firstNameValue, lastNameValue]);

    const handleBack = () => {
        router.back();
    };

    const handleNext = () => {
        if (!isNextEnabled) return;

        setName(firstNameValue, lastNameValue);
        setCurrentStep('terms');
        router.push('/signup/terms');
    };

    return (
        <div className="bg-white rounded-lg p-12 shadow-sm">
            {/* Title */}
            <h1 className="text-2xl font-bold text-center mb-2">
                What's your name?
            </h1>

            <p className="text-center text-gray-600 text-sm mb-8">
                Let us know how to properly address you
            </p>

            {/* Form */}
            <div className="space-y-4 mb-8">
                {/* First Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        First name
                    </label>
                    <input
                        type="text"
                        placeholder="Please enter first name"
                        value={firstNameValue}
                        onChange={(e) => setFirstNameValue(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last name
                    </label>
                    <input
                        type="text"
                        placeholder="Please enter surname"
                        value={lastNameValue}
                        onChange={(e) => setLastNameValue(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                    />
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-black hover:text-gray-700"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={handleNext}
                    disabled={!isNextEnabled}
                    className="bg-black text-white px-8 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
