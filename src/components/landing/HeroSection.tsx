/**
 * Hero Section Component
 * Main hero with location picker
 */

'use client';

import { LocationPicker } from '@/components/booking/LocationPicker';

export function HeroSection() {
    return (
        <section className="relative min-h-[600px] bg-white pt-[64px]">
            <div className="max-w-[1280px] mx-auto px-4 lg:px-16 py-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Heading + Location Picker */}
                    <div className="space-y-8">
                        <h1 className="text-[52px] leading-[1.1] font-bold text-black">
                            Get ready for your<br />first trip
                        </h1>

                        <LocationPicker />
                    </div>

                    {/* Right: Illustration */}
                    <div className="hidden lg:block">
                        <div className="w-full h-[500px] bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-8xl mb-4">🚗</div>
                                <p className="text-gray-600">Uber Ride Illustration</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
