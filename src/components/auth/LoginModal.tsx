'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const router = useRouter();
    const [value, setValue] = useState('');

    if (!isOpen) return null;

    const handleContinue = () => {
        if (!value.trim()) return;

        // Mock: Detect user type and route accordingly
        // In production, this would call an API to verify credentials
        const isDriver = value.includes('driver') || value.includes('@driver');

        if (isDriver) {
            router.push('/driver/dashboard');
        } else {
            router.push('/rider/dashboard');
        }

        onClose();
    };

    const handleSocialLogin = (provider: string) => {
        console.log(`Social login with ${provider}`);
        // Mock routing - in production would handle OAuth
        router.push('/driver/dashboard');
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="bg-white rounded-lg p-5 sm:p-8 md:p-12 shadow-xl w-full max-w-md pointer-events-auto animate-in zoom-in-95 duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Title */}
                    <h1 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
                        What's your phone number or email?
                    </h1>

                    {/* Input */}
                    <input
                        type="text"
                        placeholder="Enter phone number or email"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleContinue()}
                        className="w-full h-12 px-4 text-[15px] sm:text-base border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-black transition-colors"
                        autoFocus
                    />

                    {/* Continue Button */}
                    <button
                        onClick={handleContinue}
                        disabled={!value.trim()}
                        className="w-full h-12 bg-black text-white rounded-lg text-[15px] sm:text-base font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-5 sm:mb-6"
                    >
                        Continue
                    </button>

                    {/* Divider */}
                    <div className="relative my-5 sm:my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">or</span>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <button
                        onClick={() => handleSocialLogin('google')}
                        className="w-full h-12 flex items-center justify-center gap-2 sm:gap-3 text-[14px] sm:text-base border-2 border-gray-300 rounded-lg mb-3 hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span className="font-medium">Continue with Google</span>
                    </button>

                    <button
                        onClick={() => handleSocialLogin('apple')}
                        className="w-full h-12 flex items-center justify-center gap-2 sm:gap-3 text-[14px] sm:text-base border-2 border-gray-300 rounded-lg mb-5 sm:mb-6 hover:bg-gray-50 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                        <span className="font-medium">Continue with Apple</span>
                    </button>

                    {/* Divider */}
                    <div className="relative my-5 sm:my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">or</span>
                        </div>
                    </div>

                    {/* QR Code Login */}
                    <button className="w-full h-12 flex items-center justify-center gap-2 text-[14px] sm:text-base border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mb-5 sm:mb-6">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                        <span className="font-medium">Log in with QR code</span>
                    </button>

                    {/* Terms Text */}
                    <p className="text-[11px] sm:text-xs text-center text-gray-500 leading-relaxed">
                        By continuing, you agree to our{' '}
                        <a href="#" className="underline">Terms</a> and{' '}
                        <a href="#" className="underline">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </>
    );
}
