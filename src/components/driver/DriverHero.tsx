'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function DriverHero() {
    return (
        <section className="bg-black text-white pt-16 pb-16 lg:pt-24 lg:pb-24">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Text Content */}
                    <div className="flex-1 max-w-xl">
                        <h1 className="text-4xl lg:text-[52px] font-bold leading-[1.1] mb-6">
                            Opportunity is everywhere
                        </h1>
                        <p className="text-lg mb-8 text-gray-300">
                            Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Uber.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/driver/onboarding/resume">
                                <Button variant="white" size="lg" className="rounded-full px-8 py-6 text-lg">
                                    Sign up to drive
                                </Button>
                            </Link>
                            <Link href="/auth/login">
                                <Button variant="outline-white" size="lg" className="rounded-full px-8 py-6 text-lg">
                                    Log in
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="flex-1 w-full max-w-lg lg:max-w-xl">
                        {/* Placeholder for the driver illustration */}
                        <div className="relative aspect-[4/3] bg-gray-800 rounded-lg overflow-hidden">
                            <Image
                                src="/images/driver/hero.png"
                                alt="Driver in car"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
