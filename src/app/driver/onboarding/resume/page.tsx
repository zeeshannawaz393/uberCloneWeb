'use client';

import { useRouter } from 'next/navigation';
import { useDriverOnboarding } from '@/features/driver/driver.state';

const STEPS = [
    {
        number: 1,
        title: 'City Selection',
        description: 'Choose where you will drive',
        href: '/driver/onboarding/city',
        requiredFields: ['city']
    },
    {
        number: 2,
        title: 'Personal Details',
        description: 'Your personal information',
        href: '/driver/onboarding/personal',
        requiredFields: ['firstName', 'lastName', 'dateOfBirth', 'phoneNumber', 'addressLine1', 'addressCity', 'postcode']
    },
    {
        number: 3,
        title: 'Licence Verification',
        description: 'Upload your driving credentials',
        href: '/driver/onboarding/licence',
        requiredFields: ['pcoLicenceFront', 'pcoLicenceBack', 'drivingLicenceFront', 'drivingLicenceBack', 'dvlaCheckCode']
    },
    {
        number: 4,
        title: 'Identity Check',
        description: 'Verify your identity',
        href: '/driver/onboarding/identity',
        requiredFields: ['profilePhoto', 'nationalInsurance']
    },
    {
        number: 5,
        title: 'Vehicle Details',
        description: 'Add your vehicle information',
        href: '/driver/onboarding/vehicle',
        requiredFields: ['vehicleReg', 'vehicleMake', 'vehicleModel', 'vehicleYear', 'phvLicence', 'insurance', 'mot', 'v5c']
    },
    {
        number: 6,
        title: 'Payout Setup',
        description: 'Configure your earnings account',
        href: '/driver/onboarding/payout',
        requiredFields: ['sortCode', 'accountNumber', 'accountHolderName']
    },
    {
        number: 7,
        title: 'Review & Submit',
        description: 'Finalize your application',
        href: '/driver/onboarding/review',
        requiredFields: ['consentBackgroundCheck', 'consentTerms']
    }
];

export default function ResumePage() {
    const router = useRouter();
    const state = useDriverOnboarding();

    // Check if a step is complete
    // NOTE: File fields (base64) don't persist to localStorage to avoid quota errors
    // So if user refreshes, they'll need to re-upload files
    const isStepComplete = (requiredFields: string[]) => {
        return requiredFields.every(field => {
            const value = state[field as keyof typeof state];

            // For booleans, check if true
            if (typeof value === 'boolean') return value;

            // For strings (including base64), check if non-empty
            if (typeof value === 'string') return value.trim() !== '';

            // For null/undefined, it's incomplete
            // NOTE: Files will be null after page refresh (they don't persist)
            return false;
        });
    };

    // Calculate completion
    const completedSteps = STEPS.filter(step => isStepComplete(step.requiredFields));
    const progress = Math.round((completedSteps.length / STEPS.length) * 100);

    // Find next incomplete step
    const nextStep = STEPS.find(step => !isStepComplete(step.requiredFields));

    const handleContinue = () => {
        if (nextStep) {
            router.push(nextStep.href);
        } else {
            router.push('/driver/onboarding/review');
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-5 sm:p-8 md:p-12 shadow-sm w-full max-w-2xl">
                <h1 className="text-xl sm:text-2xl font-bold text-center mb-4">
                    Continue Your Application
                </h1>
                <p className="text-center text-gray-600 mb-6 sm:mb-8">
                    You're {progress}% done! Complete the remaining steps to start driving.
                </p>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">
                            {completedSteps.length} of {STEPS.length} steps completed
                        </span>
                        <span className="text-sm text-gray-500">{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-black h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Steps List */}
                <div className="space-y-3 mb-8">
                    {STEPS.map((step) => {
                        const isComplete = isStepComplete(step.requiredFields);
                        const isCurrent = nextStep?.number === step.number;

                        return (
                            <button
                                key={step.number}
                                onClick={() => router.push(step.href)}
                                className={`w-full flex items-start gap-4 p-4 rounded-lg border-2 transition-all text-left ${isComplete
                                        ? 'border-green-200 bg-green-50 hover:border-green-300'
                                        : isCurrent
                                            ? 'border-black bg-gray-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                aria-label={`${step.title} - ${isComplete ? 'Completed' : isCurrent ? 'Current step' : 'Not started'}`}
                            >
                                {/* Step Icon */}
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isComplete
                                        ? 'bg-green-500 text-white'
                                        : isCurrent
                                            ? 'bg-black text-white'
                                            : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    {isComplete ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <span className="font-semibold">{step.number}</span>
                                    )}
                                </div>

                                {/* Step Content */}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Status Badge */}
                                {isComplete && (
                                    <span className="flex-shrink-0 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
                                        Complete
                                    </span>
                                )}
                                {isCurrent && !isComplete && (
                                    <span className="flex-shrink-0 text-xs font-medium text-gray-700 bg-gray-200 px-2 py-1 rounded">
                                        Next
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleContinue}
                        className="w-full h-12 bg-black text-white rounded-lg text-[15px] sm:text-base font-medium hover:bg-gray-800 transition-colors"
                    >
                        {progress === 100 ? 'Review & Submit' : 'Continue Application'}
                    </button>

                    <button
                        onClick={() => router.push('/driver')}
                        className="w-full text-center text-sm text-gray-600 hover:text-gray-700"
                    >
                        Back to Driver Home
                    </button>
                </div>
            </div>
        </main>
    );
}
