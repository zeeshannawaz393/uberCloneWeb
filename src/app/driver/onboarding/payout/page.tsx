'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/driver/ProgressBar';
import { Input } from '@/components/ui/Input';
import { useDriverOnboarding } from '@/features/driver/driver.state';
import { validateSortCode, validateAccountNumber, formatSortCode } from '@/lib/validation';

export default function PayoutSetupPage() {
    const router = useRouter();
    const {
        sortCode,
        accountNumber,
        accountHolderName,
        setPayoutData,
        setCurrentStep
    } = useDriverOnboarding();

    const [formData, setFormData] = useState({
        sortCode: sortCode || '',
        accountNumber: accountNumber || '',
        accountHolderName: accountHolderName || ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleContinue = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.sortCode.trim()) newErrors.sortCode = 'Sort code is required';
        if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
        if (!formData.accountHolderName.trim()) newErrors.accountHolderName = 'Account holder name is required';

        if (formData.sortCode && !validateSortCode(formData.sortCode)) {
            newErrors.sortCode = 'Invalid sort code (format: XX-XX-XX)';
        }

        if (formData.accountNumber && !validateAccountNumber(formData.accountNumber)) {
            newErrors.accountNumber = 'Invalid account number (must be 8 digits)';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setPayoutData(formData);
        setCurrentStep(7);
        router.push('/driver/onboarding/review');
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-5 sm:p-8 md:p-12 shadow-sm w-full max-w-md">
                <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">
                    Payout Setup
                </h1>
                <p className="text-center text-gray-600 mb-6 sm:mb-8">
                    Where should we send your earnings?
                </p>

                <ProgressBar currentStep={6} totalSteps={7} />

                <div className="space-y-6 mb-6">
                    <Input
                        variant="onboarding"
                        label="Sort Code"
                        value={formData.sortCode}
                        onChange={(e) => setFormData({ ...formData, sortCode: formatSortCode(e.target.value) })}
                        error={errors.sortCode}
                        required
                        placeholder="12-34-56"
                        maxLength={8}
                    />

                    <Input
                        variant="onboarding"
                        label="Account Number"
                        value={formData.accountNumber}
                        onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, '') })}
                        error={errors.accountNumber}
                        required
                        placeholder="12345678"
                        maxLength={8}
                    />

                    <Input
                        variant="onboarding"
                        label="Account Holder Name"
                        value={formData.accountHolderName}
                        onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                        error={errors.accountHolderName}
                        required
                        placeholder="John Smith"
                    />

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                            <strong>Note:</strong> Account must be in your name and able to receive direct deposits.
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleContinue}
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
