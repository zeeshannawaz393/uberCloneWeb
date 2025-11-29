/**
 * Screen 8: Accept Terms & Privacy
 * Legal consent screen
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignupState } from '@/features/signup/signup.state';

export default function TermsPage() {
    const router = useRouter();
    const { termsAccepted, setTermsAccepted, setCurrentStep } = useSignupState();

    const [isChecked, setIsChecked] = useState(termsAccepted);

    const handleBack = () => {
        router.back();
    };

    const handleNext = () => {
        if (!isChecked) return;

        setTermsAccepted(true);
        setCurrentStep('security-method');
        router.push('/signup/security-method');
    };

    return (
        <div className="bg-white rounded-lg p-12 shadow-sm">
            {/* Title */}
            <h1 className="text-2xl font-bold text-center mb-6">
                Accept Uber's Terms &<br />Review Privacy Notice
            </h1>

            {/* Text */}
            <p className="text-sm text-gray-700 mb-8">
                By selecting "I agree" below, I have reviewed and agree to the{' '}
                <a href="#" className="text-blue-600 underline">Terms of Use</a> and acknowledge the{' '}
                <a href="#" className="text-blue-600 underline">Privacy Notice</a>. I am at least 18 years of age.
            </p>

            {/* Checkbox */}
            <label className="flex items-start gap-3 mb-8 cursor-pointer group">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="mt-0.5 w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-black cursor-pointer"
                />
                <span className="text-sm font-medium group-hover:text-gray-700">
                    I agree
                </span>
            </label>

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
                    disabled={!isChecked}
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
