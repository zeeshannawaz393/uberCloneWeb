'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProgressBar } from '@/components/driver/ProgressBar';
import { useDriverOnboarding } from '@/features/driver/driver.state';
import { useToast } from '@/components/ui/Toast';

export default function ReviewActivationPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const {
        city,
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        addressLine1,
        addressLine2,
        addressCity,
        postcode,
        dvlaCheckCode,
        nationalInsurance,
        vehicleReg,
        vehicleMake,
        vehicleModel,
        sortCode,
        accountNumber,
        accountHolderName,
        consentBackgroundCheck,
        consentTerms,
        setConsent
    } = useDriverOnboarding();

    const [localConsent, setLocalConsent] = useState({
        backgroundCheck: consentBackgroundCheck,
        terms: consentTerms
    });

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!localConsent.backgroundCheck || !localConsent.terms) {
            setError('Please accept all consents to continue');
            return;
        }

        setConsent({
            consentBackgroundCheck: localConsent.backgroundCheck,
            consentTerms: localConsent.terms
        });

        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        showToast('Application submitted successfully! You will receive an email once reviewed.', 'success');

        setTimeout(() => {
            router.push('/driver/onboarding/success');
        }, 2000);
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-5 sm:p-8 md:p-12 shadow-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">
                    Review & Submit
                </h1>
                <p className="text-center text-gray-600 mb-6 sm:mb-8">
                    Please review your information before submitting
                </p>

                <ProgressBar currentStep={7} totalSteps={7} />

                <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-900">Personal Information</h3>
                            <button
                                onClick={() => router.push('/driver/onboarding/personal')}
                                className="text-sm text-blue-600 hover:text-blue-700"
                                aria-label="Edit personal information"
                            >
                                Edit
                            </button>
                        </div>
                        <div className="text-sm space-y-1">
                            <p className="text-gray-600">Name: <span className="text-gray-900 font-medium">{firstName} {lastName}</span></p>
                            <p className="text-gray-600">DOB: <span className="text-gray-900 font-medium">{dateOfBirth}</span></p>
                            <p className="text-gray-600">Phone: <span className="text-gray-900 font-medium">{phoneNumber}</span></p>
                            <p className="text-gray-600">Address: <span className="text-gray-900 font-medium">{addressLine1}{addressLine2 && `, ${addressLine2}`}</span></p>
                            <p className="text-gray-600">City: <span className="text-gray-900 font-medium">{addressCity}, {postcode}</span></p>
                            <p className="text-gray-600">Operating City: <span className="text-gray-900 font-medium">{city}</span></p>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-900">Licensing & Identity</h3>
                            <button
                                onClick={() => router.push('/driver/onboarding/licence')}
                                className="text-sm text-blue-600 hover:text-blue-700"
                                aria-label="Edit licensing information"
                            >
                                Edit
                            </button>
                        </div>
                        <div className="text-sm space-y-1">
                            <p className="text-gray-600">DVLA Code: <span className="text-gray-900 font-medium">{dvlaCheckCode}</span></p>
                            <p className="text-gray-600">NI Number: <span className="text-gray-900 font-medium">{nationalInsurance}</span></p>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-900">Vehicle Details</h3>
                            <button
                                onClick={() => router.push('/driver/onboarding/vehicle')}
                                className="text-sm text-blue-600 hover:text-blue-700"
                                aria-label="Edit vehicle information"
                            >
                                Edit
                            </button>
                        </div>
                        <div className="text-sm space-y-1">
                            <p className="text-gray-600">Registration: <span className="text-gray-900 font-medium">{vehicleReg}</span></p>
                            <p className="text-gray-600">Make/Model: <span className="text-gray-900 font-medium">{vehicleMake} {vehicleModel}</span></p>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-900">Payout Details</h3>
                            <button
                                onClick={() => router.push('/driver/onboarding/payout')}
                                className="text-sm text-blue-600 hover:text-blue-700"
                                aria-label="Edit payout information"
                            >
                                Edit
                            </button>
                        </div>
                        <div className="text-sm space-y-1">
                            <p className="text-gray-600">Sort Code: <span className="text-gray-900 font-medium">{sortCode}</span></p>
                            <p className="text-gray-600">Account: <span className="text-gray-900 font-medium">****{accountNumber?.slice(-4)}</span></p>
                            <p className="text-gray-600">Name: <span className="text-gray-900 font-medium">{accountHolderName}</span></p>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 mb-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={localConsent.backgroundCheck}
                            onChange={(e) => setLocalConsent({ ...localConsent, backgroundCheck: e.target.checked })}
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                            aria-label="Consent to background check"
                        />
                        <span className="text-sm text-gray-700">
                            I consent to a background check including DBS verification
                        </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={localConsent.terms}
                            onChange={(e) => setLocalConsent({ ...localConsent, terms: e.target.checked })}
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                            aria-label="Agree to terms and conditions"
                        />
                        <span className="text-sm text-gray-700">
                            I agree to the Terms of Service and Driver Agreement
                        </span>
                    </label>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6" role="alert">
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full h-12 bg-black text-white rounded-lg text-[15px] sm:text-base font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-5 sm:mb-6"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>

                <button
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                    className="w-full text-center text-sm text-gray-600 hover:text-gray-700 disabled:text-gray-400"
                >
                    Back
                </button>
            </div>
        </main>
    );
}
