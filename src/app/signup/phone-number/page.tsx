/**
 * Screen 10: Phone Number Entry
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
        <div className="bg-white rounded-lg p-12 shadow-sm">
            {/* Title */}
            <h1 className="text-2xl font-bold mb-2">
                Phone number
            </h1>

            <p className="text-gray-600 text-sm mb-8">
                You'll use this number to get notifications, sign in and recover your account.
            </p>

            {/* Phone Input */}
            <div className="mb-2">
                <div className="flex gap-3">
                    <CountrySelector
                        value={country}
                        onChange={setCountry}
                    />

                    <input
                        type="tel"
                        placeholder="1234567890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                    />
                </div>
            </div>

            <p className="text-sm text-gray-600 mb-8">
                A verification code will be sent to this number
            </p>

            {/* Update Button */}
            <button
                onClick={handleUpdate}
                disabled={!phone.trim()}
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                Update
            </button>
        </div>
    );
}
