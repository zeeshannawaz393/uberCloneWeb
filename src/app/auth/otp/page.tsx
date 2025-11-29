'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { routes } from '@/lib/routes';
import { useAuthFeature } from '@/features/auth/auth.state';

export default function OTPPage() {
    const router = useRouter();
    const { phone, setOTP, setStep } = useAuthFeature();
    const [otp, setOtpValue] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');

    const handleOTPChange = (index: number, value: string) => {
        if (value.length > 1) return;

        const newOTP = [...otp];
        newOTP[index] = value;
        setOtpValue(newOTP);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleVerify = () => {
        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            setError('Please enter the complete 6-digit code');
            return;
        }

        setOTP(otpCode);
        setStep('profile');
        router.push(routes.auth.profile);
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Verify Your Phone</CardTitle>
                    <p className="text-dark-600 mt-2">
                        Enter the 6-digit code sent to {phone}
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2 justify-center">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOTPChange(index, e.target.value)}
                                className="w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 border-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                        ))}
                    </div>

                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                    <Button variant="primary" className="w-full" onClick={handleVerify}>
                        Verify
                    </Button>

                    <button
                        onClick={() => router.back()}
                        className="w-full text-center text-sm text-dark-600 hover:text-dark-700"
                    >
                        Back
                    </button>

                    <p className="text-center text-sm text-dark-600">
                        Didn&apos;t receive code?{' '}
                        <button className="text-primary-600 hover:text-primary-700 font-medium">
                            Resend
                        </button>
                    </p>
                </CardContent>
            </Card>
        </main>
    );
}
