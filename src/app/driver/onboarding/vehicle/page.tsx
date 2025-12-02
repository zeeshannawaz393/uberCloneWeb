'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/driver/ProgressBar';
import { Input } from '@/components/ui/Input';
import { FileUpload } from '@/components/ui/FileUpload';
import { useDriverOnboarding } from '@/features/driver/driver.state';
import { validateUKVehicleReg, DOCUMENT_ALLOWED_TYPES } from '@/lib/validation';

export default function VehicleOnboardingPage() {
    const router = useRouter();
    const {
        vehicleReg,
        vehicleMake,
        vehicleModel,
        vehicleYear,
        phvLicence,
        insurance,
        mot,
        v5c,
        setVehicleData,
        setCurrentStep
    } = useDriverOnboarding();

    const [formData, setFormData] = useState({
        reg: vehicleReg || '',
        make: vehicleMake || '',
        model: vehicleModel || '',
        year: vehicleYear || '',
        phv: phvLicence,
        ins: insurance,
        motDoc: mot,
        v5cDoc: v5c
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleContinue = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.reg.trim()) newErrors.reg = 'Vehicle registration is required';
        if (!formData.make.trim()) newErrors.make = 'Vehicle make is required';
        if (!formData.model.trim()) newErrors.model = 'Vehicle model is required';
        if (!formData.year.trim()) newErrors.year = 'Vehicle year is required';
        if (!formData.phv) newErrors.phv = 'PHV Licence is required';
        if (!formData.ins) newErrors.ins = 'Insurance document is required';
        if (!formData.motDoc) newErrors.motDoc = 'MOT certificate is required';
        if (!formData.v5cDoc) newErrors.v5cDoc = 'V5C document is required';

        if (formData.reg && !validateUKVehicleReg(formData.reg)) {
            newErrors.reg = 'Invalid UK registration (e.g., AB12 CDE)';
        }

        const currentYear = new Date().getFullYear();
        const yearNum = parseInt(formData.year);
        if (formData.year && (yearNum < 2000 || yearNum > currentYear)) {
            newErrors.year = `Year must be between 2000 and ${currentYear}`;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setVehicleData({
            vehicleReg: formData.reg,
            vehicleMake: formData.make,
            vehicleModel: formData.model,
            vehicleYear: formData.year,
            phvLicence: formData.phv,
            insurance: formData.ins,
            mot: formData.motDoc,
            v5c: formData.v5cDoc
        });
        setCurrentStep(6);
        router.push('/driver/onboarding/payout');
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-5 sm:p-8 md:p-12 shadow-sm w-full max-w-2xl">
                <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">
                    Vehicle Details
                </h1>
                <p className="text-center text-gray-600 mb-6 sm:mb-8">
                    Provide your vehicle information and documents
                </p>

                <ProgressBar currentStep={5} totalSteps={7} />

                <div className="space-y-6 mb-6">
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-4">Vehicle Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                variant="onboarding"
                                label="Registration"
                                value={formData.reg}
                                onChange={(e) => setFormData({ ...formData, reg: e.target.value.toUpperCase() })}
                                error={errors.reg}
                                required
                                placeholder="AB12 CDE"
                                maxLength={8}
                            />

                            <Input
                                variant="onboarding"
                                label="Year"
                                type="number"
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                error={errors.year}
                                required
                                placeholder="2020"
                            />

                            <Input
                                variant="onboarding"
                                label="Make"
                                value={formData.make}
                                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                                error={errors.make}
                                required
                                placeholder="Toyota"
                            />

                            <Input
                                variant="onboarding"
                                label="Model"
                                value={formData.model}
                                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                error={errors.model}
                                required
                                placeholder="Prius"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-4">Vehicle Documents</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FileUpload
                                label="PHV Licence"
                                value={formData.phv}
                                onChange={(base64) => setFormData({ ...formData, phv: base64 })}
                                accept={DOCUMENT_ALLOWED_TYPES}
                                required
                                error={errors.phv}
                            />

                            <FileUpload
                                label="Insurance"
                                value={formData.ins}
                                onChange={(base64) => setFormData({ ...formData, ins: base64 })}
                                accept={DOCUMENT_ALLOWED_TYPES}
                                required
                                error={errors.ins}
                            />

                            <FileUpload
                                label="MOT Certificate"
                                value={formData.motDoc}
                                onChange={(base64) => setFormData({ ...formData, motDoc: base64 })}
                                accept={DOCUMENT_ALLOWED_TYPES}
                                required
                                error={errors.motDoc}
                            />

                            <FileUpload
                                label="V5C (Logbook)"
                                value={formData.v5cDoc}
                                onChange={(base64) => setFormData({ ...formData, v5cDoc: base64 })}
                                accept={DOCUMENT_ALLOWED_TYPES}
                                required
                                error={errors.v5cDoc}
                            />
                        </div>
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
