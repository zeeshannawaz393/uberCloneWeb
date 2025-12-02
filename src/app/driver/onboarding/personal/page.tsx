'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/driver/ProgressBar';
import { Input } from '@/components/ui/Input';
import { useDriverOnboarding } from '@/features/driver/driver.state';
import { useAuthFeature } from '@/features/auth/auth.state';
import {
    validateUKPostcode,
    validateUKPhone,
    validateAge
} from '@/lib/validation';

export default function PersonalDetailsPage() {
    const router = useRouter();
    const {
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        addressLine1,
        addressLine2,
        addressCity,
        postcode,
        setPersonalData,
        setCurrentStep
    } = useDriverOnboarding();

    const authState = useAuthFeature();

    const [formData, setFormData] = useState({
        firstName: firstName || '',
        lastName: lastName || '',
        dateOfBirth: dateOfBirth || '',
        phoneNumber: phoneNumber || authState.phone || '',
        addressLine1: addressLine1 || '',
        addressLine2: addressLine2 || '',
        addressCity: addressCity || '',
        postcode: postcode || ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Pre-fill from auth on mount
    useEffect(() => {
        if (!phoneNumber && authState.phone) {
            setFormData(prev => ({ ...prev, phoneNumber: authState.phone || '' }));
        }
    }, [authState.phone, phoneNumber]);

    const handleContinue = () => {
        const newErrors: Record<string, string> = {};

        // Required field validation
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
        if (!formData.addressCity.trim()) newErrors.addressCity = 'City is required';
        if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required';

        // UK-specific validation
        if (formData.dateOfBirth) {
            const ageCheck = validateAge(formData.dateOfBirth, 21);
            if (!ageCheck.valid) {
                newErrors.dateOfBirth = `You must be at least 21 years old (currently ${ageCheck.age})`;
            }
        }

        if (formData.phoneNumber && !validateUKPhone(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid UK phone number (e.g., 07123456789 or +44 7123 456789)';
        }

        if (formData.postcode && !validateUKPostcode(formData.postcode)) {
            newErrors.postcode = 'Invalid UK postcode (e.g., SW1A 1AA)';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setPersonalData(formData);
        setCurrentStep(3);
        router.push('/driver/onboarding/licence');
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-5 sm:p-8 md:p-12 shadow-sm w-full max-w-2xl">
                <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">
                    Personal Details
                </h1>
                <p className="text-center text-gray-600 mb-6 sm:mb-8">
                    We need your personal information for identity verification
                </p>

                <ProgressBar currentStep={2} totalSteps={7} />

                <div className="space-y-6 mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            variant="onboarding"
                            label="First Name"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            error={errors.firstName}
                            required
                            placeholder="John"
                            autoComplete="given-name"
                        />

                        <Input
                            variant="onboarding"
                            label="Last Name"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            error={errors.lastName}
                            required
                            placeholder="Smith"
                            autoComplete="family-name"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            variant="onboarding"
                            label="Date of Birth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                            error={errors.dateOfBirth}
                            required
                            autoComplete="bday"
                        />

                        <Input
                            variant="onboarding"
                            label="Phone Number"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            error={errors.phoneNumber}
                            required
                            placeholder="+44 7700 900000"
                            autoComplete="tel"
                        />
                    </div>

                    <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-4">Residential Address</h3>

                        <div className="space-y-4">
                            <Input
                                variant="onboarding"
                                label="Address Line 1"
                                value={formData.addressLine1}
                                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                                error={errors.addressLine1}
                                required
                                placeholder="123 High Street"
                                autoComplete="address-line1"
                            />

                            <Input
                                variant="onboarding"
                                label="Address Line 2"
                                value={formData.addressLine2}
                                onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                                placeholder="Flat 4B (Optional)"
                                autoComplete="address-line2"
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Input
                                    variant="onboarding"
                                    label="City"
                                    value={formData.addressCity}
                                    onChange={(e) => setFormData({ ...formData, addressCity: e.target.value })}
                                    error={errors.addressCity}
                                    required
                                    placeholder="London"
                                    autoComplete="address-level2"
                                />

                                <Input
                                    variant="onboarding"
                                    label="Postcode"
                                    value={formData.postcode}
                                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
                                    error={errors.postcode}
                                    required
                                    placeholder="SW1A 1AA"
                                    maxLength={8}
                                    autoComplete="postal-code"
                                />
                            </div>
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
