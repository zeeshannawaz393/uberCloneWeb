/**
 * Screens 2-5: OTP Verification - Responsive
 * Handles normal, error, and resent states
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSignupState } from '@/features/signup/signup.state';
import { OTPInput } from '@/components/auth/OTPInput';
import { ResendModal } from '@/components/auth/ResendModal';

export default function VerifyCodePage() {
    const router = useRouter();
    const {
        emailOrPhone,
        otpCode,
        otpError,
        otpResent,
        setOtpCode,
        setOtpError,
        setOtpResent,
        setCurrentStep,
    } = useSignupState();

    const [showResendModal, setShowResendModal] = useState(false);
    const [isNextEnabled, setIsNextEnabled] = useState(false);

    useEffect(() => {
        // Enable Next button when all 4 digits are filled
        setIsNextEnabled(otpCode.every(digit => digit !== ''));
    }, [otpCode]);

    useEffect(() => {
        // Auto-hide success notification after 3 seconds
        if (otpResent) {
            const timer = setTimeout(() => setOtpResent(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [otpResent, setOtpResent]);

    const handleBack = () => {
        router.back();
    };

    const handleNext = () => {
        if (!isNextEnabled) return;

        // Simulate validation
        const code = otpCode.join('');

        // Demo: Show error if code is 1111
        if (code === '1111') {
            setOtpError('The email passcode you\'ve entered is incorrect.');
            return;
        }

        // Success - proceed to next screen
        setCurrentStep('name');
        router.push('/signup/name');
    };

    const handleResend = () => {
        // Simulate resending code
        setOtpCode(['', '', '', '']);
        setOtpError(null);
        setOtpResent(true);
    };

    return (
        <div className="bg-white rounded-lg p-5 sm:p-8 md:p-12 shadow-sm">
            {/* Success Notification */}
            {otpResent && (
                <div className="mb-5 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-[13px] sm:text-sm text-green-800 text-center">
                        Your code has been re-sent
                    </p>
                </div>
            )}

            {/* Title - Responsive */}
            <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">
                Enter the 4-digit code sent to you at:
            </h1>

            <p className="text-center text-[15px] sm:text-base text-gray-700 mb-6 sm:mb-8">
                {emailOrPhone}
            </p>

            {/* OTP Input */}
            <div className="mb-5 sm:mb-6">
                <OTPInput
                    value={otpCode}
                    onChange={setOtpCode}
                    hasError={!!otpError}
                />
            </div>

            {/* Error Message */}
            {otpError && (
                <p className="text-[13px] sm:text-sm text-red-600 text-center mb-4">
                    {otpError}
                </p>
            )}

            {/* Tip */}
            <p className="text-[13px] sm:text-sm text-center text-gray-600 mb-5 sm:mb-6">
                Tip: Be sure to check your inbox and spam folders
            </p>

            {/* Resend Button */}
            <button
                onClick={() => setShowResendModal(true)}
                className="text-[13px] sm:text-sm text-black underline mx-auto block mb-6 sm:mb-8 hover:text-gray-700"
            >
                Resend
            </button>

            {/* Navigation */}
            <div className="flex items-center justify-between">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-black hover:text-gray-700"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={handleNext}
                    disabled={!isNextEnabled}
                    className="h-12 bg-black text-white px-6 sm:px-8 rounded-full text-[15px] sm:text-base font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Resend Modal */}
            <ResendModal
                isOpen={showResendModal}
                onClose={() => setShowResendModal(false)}
                onResend={handleResend}
                emailOrPhone={emailOrPhone}
            />
        </div>
    );
}
