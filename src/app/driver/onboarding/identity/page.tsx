'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/driver/ProgressBar';
import { Input } from '@/components/ui/Input';
import { FileUpload } from '@/components/ui/FileUpload';
import { useDriverOnboarding } from '@/features/driver/driver.state';
import { validateNINumber, IMAGE_ALLOWED_TYPES } from '@/lib/validation';

export default function IdentityCheckPage() {
    const router = useRouter();
    const {
        profilePhoto,
        nationalInsurance,
        setIdentityData,
        setCurrentStep
    } = useDriverOnboarding();

    const [formData, setFormData] = useState({
        photo: profilePhoto,
        niNumber: nationalInsurance || ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleContinue = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.photo) newErrors.photo = 'Profile photo is required';
        if (!formData.niNumber.trim()) newErrors.niNumber = 'National Insurance Number is required';

        if (formData.niNumber && !validateNINumber(formData.niNumber)) {
            newErrors.niNumber = 'Invalid NI Number format (e.g., AB 12 34 56 C)';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIdentityData({
            profilePhoto: formData.photo,
            nationalInsurance: formData.niNumber
        });
        setCurrentStep(5);
        router.push('/driver/onboarding/vehicle');
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-5 sm:p-8 md:p-12 shadow-sm w-full max-w-md">
                <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">
                    Identity Check
                </h1>
                <p className="text-center text-gray-600 mb-6 sm:mb-8">
                    Verify your identity for background checks
                </p>

                <ProgressBar currentStep={4} totalSteps={7} />

                <div className="space-y-6 mb-6">
                    <FileUpload
                        label="Profile Photo (Selfie)"
                        value={formData.photo}
                        onChange={(base64) => setFormData({ ...formData, photo: base64 })}
                        accept={IMAGE_ALLOWED_TYPES}
                        required
                        error={errors.photo}
                    />

                    <Input
                        variant="onboarding"
                        label="National Insurance Number"
                        value={formData.niNumber}
                        onChange={(e) => setFormData({ ...formData, niNumber: e.target.value.toUpperCase() })}
                        error={errors.niNumber}
                        required
                        placeholder="AB 12 34 56 C"
                        maxLength={13}
                    />
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
