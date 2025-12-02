'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function DriverSignup() {
    return (
        <section className="bg-white py-16 lg:py-24 border-t border-gray-100">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-black">
                        Sign up to drive
                    </h2>
                    <Link href="/driver/onboarding/resume">
                        <Button
                            variant="ghost"
                            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 p-0"
                        >
                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
