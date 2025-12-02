'use client';

import Image from 'next/image';
import Link from 'next/link';

export function DriverApp() {
    return (
        <section className="bg-gray-100 py-16 lg:py-24">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Text Content */}
                    <div className="flex-1 max-w-xl">
                        <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
                            The Driver app
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Easy to use and reliable, the app was built for drivers, with drivers.
                        </p>
                        <Link
                            href="/driver/app"
                            className="text-black font-medium hover:underline flex items-center gap-1 text-lg"
                        >
                            Download the Driver app
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Image */}
                    <div className="flex-1 w-full max-w-md">
                        <div className="relative aspect-[3/4] w-full">
                            <Image
                                src="/images/driver/app.png"
                                alt="Driver App"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
