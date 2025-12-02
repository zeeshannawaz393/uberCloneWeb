'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/driver/ProgressBar';
import { Input } from '@/components/ui/Input';
import { FileUpload } from '@/components/ui/FileUpload';
import { useDriverOnboarding } from '@/features/driver/driver.state';
import { validateDVLACheckCode, IMAGE_ALLOWED_TYPES, DOCUMENT_ALLOWED_TYPES } from '@/lib/validation';

export default function LicenceVerificationPage() {
    const router = useRouter();
    const {
        pcoLicenceFront,
        pcoLicenceBack,
        drivingLicenceFront,
        drivingLicenceBack,
        dvlaCheckCode,
        setLicenceData,
        setCurrentStep
    } = useDriverOnboarding();

    const [formData, setFormData] = useState({
        pcoFront: pcoLicenceFront,
        pcoBack: pcoLicenceBack,
        drivingFront: drivingLicenceFront,
        drivingBack: drivingLicenceBack,
        checkCode: dvlaCheckCode || ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleContinue = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.pcoFront) newErrors.pcoFront = 'PCO Licence front is required';
        if (!formData.pcoBack) newErrors.pcoBack = 'PCO Licence back/badge is required';
        if (!formData.drivingFront) newErrors.drivingFront = 'Driving Licence front is required';
        if (!formData.drivingBack) newErrors.drivingBack = 'Driving Licence back is required';
        if (!formData.checkCode.trim()) newErrors.checkCode = 'DVLA Check Code is required';

        if (formData.checkCode && !validateDVLACheckCode(formData.checkCode)) {
            newErrors.checkCode = 'Invalid DVLA Check Code (8 characters)';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLicenceData({
            pcoLicenceFront: formData.pcoFront,
            pcoLicenceBack: formData.pcoBack,
            drivingLicenceFront: formData.drivingFront,
            drivingLicenceBack: formData.drivingBack,
            dvlaCheckCode: formData.checkCode
        });
        setCurrentStep(4);
        router.push('/driver/onboarding/identity');
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-5 sm:p-8 md:p-12 shadow-sm w-full max-w-2xl">
                <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">
                    Licence Verification
                </h1>
                <p className="text-center text-gray-600 mb-6 sm:mb-8">
                    We need to verify your driving credentials
                </p>

                <ProgressBar currentStep={3} totalSteps={7} />

                <div className="space-y-6 mb-6">
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-4">PCO Licence</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FileUpload
                                label="Paper Copy"
                                value={formData.pcoFront}
                                onChange={(base64) => setFormData({ ...formData, pcoFront: base64 })}
                                accept={DOCUMENT_ALLOWED_TYPES}
                                required
                                error={errors.pcoFront}
                            />

                            <FileUpload
                                label="Badge Photo"
                                value={formData.pcoBack}
                                onChange={(base64) => setFormData({ ...formData, pcoBack: base64 })}
                                accept={IMAGE_ALLOWED_TYPES}
                                required
                                error={errors.pcoBack}
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-4">UK Driving Licence</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FileUpload
                                label="Front Side"
                                value={formData.drivingFront}
                                onChange={(base64) => setFormData({ ...formData, drivingFront: base64 })}
                                accept={IMAGE_ALLOWED_TYPES}
                                required
                                error={errors.drivingFront}
                            />

                            <FileUpload
                                label="Back Side"
                                value={formData.drivingBack}
                                onChange={(base64) => setFormData({ ...formData, drivingBack: base64 })}
                                accept={IMAGE_ALLOWED_TYPES}
                                required
                                error={errors.drivingBack}
                            />
                        </div>
                    </div>

                    <Input
                        variant="onboarding"
                        label="DVLA Check Code"
                        value={formData.checkCode}
                        onChange={(e) => setFormData({ ...formData, checkCode: e.target.value.toUpperCase() })}
                        error={errors.checkCode}
                        required
                        placeholder="ABC12345"
                        maxLength={8}
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
