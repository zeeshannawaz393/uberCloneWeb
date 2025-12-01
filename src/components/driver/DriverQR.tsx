'use client';

import Image from 'next/image';
import Link from 'next/link';

export function DriverQR() {
    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
                <h2 className="text-3xl lg:text-4xl font-bold text-black mb-12">
                    Drive your way in the app
                </h2>

                <div className="flex flex-col md:flex-row items-start gap-8">
                    {/* QR Code */}
                    <div className="w-32 h-32 relative bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                            src="/images/driver/qr.png"
                            alt="QR Code"
                            fill
                            className="object-cover p-2"
                        />
                    </div>

                    {/* Links */}
                    <div className="flex flex-col gap-4">
                        <Link
                            href="#"
                            className="text-black font-medium hover:underline flex items-center gap-1 text-lg"
                        >
                            Download the Driver app for iOS
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href="#"
                            className="text-black font-medium hover:underline flex items-center gap-1 text-lg"
                        >
                            Download the Driver app for Android
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
