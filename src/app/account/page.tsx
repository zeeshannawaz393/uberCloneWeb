/**
 * Account Home Page
 * Main account dashboard with profile and suggestions
 */

'use client';

import { useRouter } from 'next/navigation';
import { IconCard } from '@/components/account/IconCard';
import { SuggestionCard } from '@/components/account/SuggestionCard';

export default function AccountPage() {
    const router = useRouter();

    return (
        <div>
            {/* Warning Banner */}
            <div className="mb-6 p-4 bg-[#FFF3CD] rounded-lg flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div className="flex-1">
                    <h3 className="font-bold text-black mb-1">Secure your account</h3>
                    <p className="text-sm text-[#5E5E5E]">Add another sign-in method</p>
                </div>
                <button className="px-4 py-2 bg-white rounded text-sm font-medium text-black hover:bg-gray-50 transition-colors">
                    Set up
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Ask me anything about your Uber account"
                        className="w-full px-4 py-3 pl-10 bg-[#F6F6F6] border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                    />
                    <svg className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <div className="flex items-center gap-1 mt-2">
                    <span className="text-[13px] text-[#8A8A8A]">Powered by</span>
                    <span className="text-[13px] text-[#8A8A8A]">🤖</span>
                </div>
            </div>

            {/* Profile Section */}
            <div className="text-center mb-10">
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                </div>

                {/* Name and Email */}
                <h2 className="text-lg font-bold text-black mb-1">zeeshan</h2>
                <p className="text-sm text-[#5E5E5E] mb-6">usmanm.9841@gmail.com</p>

                {/* Icon Cards */}
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    <IconCard
                        icon={
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        }
                        label="General"
                        onClick={() => router.push('/account/personal-info')}
                    />

                    <IconCard
                        icon={
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        }
                        label="Security"
                        onClick={() => router.push('/account/security')}
                    />

                    <IconCard
                        icon={
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                        }
                        label="Privacy & data"
                        onClick={() => router.push('/account/privacy-data')}
                    />
                </div>
            </div>

            {/* Suggestions Section */}
            <div className="mt-10">
                <h2 className="text-lg font-bold text-black mb-4">Suggestions</h2>

                <SuggestionCard
                    title="Complete your account check-up"
                    description="Complete your account check-up to make other work better for you and keep you secure"
                    linkText="Begin check-up"
                    onClick={() => console.log('Begin check-up')}
                    icon={
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    }
                />
            </div>
        </div>
    );
}
