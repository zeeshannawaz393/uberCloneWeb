/**
 * Screen 10: Phone Number Entry - Responsive
 * Final screen - phone number for auth + notifications
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignupState } from '@/features/signup/signup.state';
import { useSessionState } from '@/state/session.state';
import { CountrySelector } from '@/components/auth/CountrySelector';

export default function PhoneNumberPage() {
    const router = useRouter();
    const { phoneNumber, countryCode, firstName, lastName, emailOrPhone, setPhoneNumber, setCurrentStep } = useSignupState();
    const { login } = useSessionState();

    const [phone, setPhone] = useState(phoneNumber);
    const [country, setCountry] = useState(countryCode);

    const handleUpdate = () => {
        if (!phone.trim()) return;

        setPhoneNumber(phone, country);
        setCurrentStep('complete');

        // Set user session
        const fullName = `${firstName} ${lastName}`;
        login(fullName, emailOrPhone);

        // Redirect to home page
        router.push('/');
    };

    return (
        <div className="bg-white rounded-lg p-5 sm:p-8 md:p-12 shadow-sm">
            {/* Title - Responsive */}
            <h1 className="text-xl sm:text-2xl font-bold mb-2">
                Phone number
            </h1>

            <p className="text-gray-600 text-[13px] sm:text-sm mb-6 sm:mb-8">
                You'll use this number to get notifications, sign in and recover your account.
            </p>

            {/* Phone Input - Consistent Height */}
            <div className="mb-2">
                <div className="flex gap-2 sm:gap-3">
                    <CountrySelector
                        value={country}
                        onChange={setCountry}
                    />

                    <input
                        type="tel"
                        placeholder="1234567890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 h-12 px-4 text-[15px] sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                    />
                </div>
            </div>

            <p className="text-[13px] sm:text-sm text-gray-600 mb-6 sm:mb-8">
                A verification code will be sent to this number
            </p>

            {/* Update Button - Consistent Height */}
            <button
                onClick={handleUpdate}
                disabled={!phone.trim()}
                className="w-full h-12 bg-black text-white rounded-lg text-[15px] sm:text-base font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Update
            </button>
        </div>
    );
}
