/**
 * Screen 9: Choose Security Method
 * Phone or Passkey authentication selection
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignupState } from '@/features/signup/signup.state';
import { RadioCard } from '@/components/ui/RadioCard';
import type { SecurityMethod } from '@/features/signup/signup.types';

export default function SecurityMethodPage() {
    const router = useRouter();
    const { securityMethod, setSecurityMethod, setCurrentStep } = useSignupState();

    const [selectedMethod, setSelectedMethod] = useState<SecurityMethod>(
        securityMethod || 'phone'
    );

    const handleNext = () => {
        setSecurityMethod(selectedMethod);
        setCurrentStep('phone-number');
        router.push('/signup/phone-number');
    };

    return (
        <div className="bg-white rounded-lg p-12 shadow-sm">
            {/* Title */}
            <h1 className="text-2xl font-bold mb-2">
                Keep your account secure
            </h1>

            <p className="text-gray-600 text-sm mb-8">
                To prevent unauthorized access to your account, choose an authentication method to protect your account.
            </p>

            {/* Radio Options */}
            <div className="space-y-4 mb-8">
                <RadioCard
                    id="phone"
                    name="security-method"
                    value="phone"
                    checked={selectedMethod === 'phone'}
                    onChange={(value) => setSelectedMethod(value as SecurityMethod)}
                    title="Phone"
                    description="Provide a phone number to use at log-in (Recommended)"
                    recommended
                />

                <RadioCard
                    id="passkey"
                    name="security-method"
                    value="passkey"
                    checked={selectedMethod === 'passkey'}
                    onChange={(value) => setSelectedMethod(value as SecurityMethod)}
                    title="Passkey"
                    description="Passkeys allow you to log in with your face, fingerprint or device PIN"
                />
            </div>

            {/* Next Button */}
            <button
                onClick={handleNext}
                className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}
