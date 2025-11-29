'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { routes } from '@/lib/routes';
import { useAuthFeature } from '@/features/auth/auth.state';

export default function PhonePage() {
    const router = useRouter();
    const { setPhone, setStep } = useAuthFeature();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+1');
    const [error, setError] = useState('');

    const handleContinue = () => {
        if (phoneNumber.length < 10) {
            setError('Please enter a valid phone number');
            return;
        }

        const fullPhone = `${countryCode}${phoneNumber}`;
        setPhone(fullPhone);
        setStep('otp');
        router.push(routes.auth.otp);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Enter Your Phone Number</CardTitle>
                    <p className="text-dark-600 mt-2">
                        We&apos;ll send you a verification code
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-dark-700 mb-2">
                            Phone Number
                        </label>
                        <div className="flex gap-2">
                            <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="px-3 py-3 rounded-xl border-2 border-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                                <option value="+91">+91</option>
                            </select>
                            <Input
                                type="tel"
                                placeholder="1234567890"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                error={error}
                            />
                        </div>
                    </div>

                    <Button variant="primary" className="w-full" onClick={handleContinue}>
                        Continue
                    </Button>

                    <button
                        onClick={() => router.back()}
                        className="w-full text-center text-sm text-dark-600 hover:text-dark-700"
                    >
                        Back
                    </button>
                </CardContent>
            </Card>
        </main>
    );
}
