'use client';

import Link from 'next/link';

export function PromotionalCard() {
    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 max-w-sm">
            {/* Illustration */}
            <div className="mb-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl p-8 flex items-center justify-center min-h-[120px]">
                {/* Placeholder for illustration */}
                <div className="text-center">
                    <div className="text-5xl mb-2">🚕</div>
                    <div className="text-2xl">🗺️</div>
                </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-black mb-2">
                Get a ride in minutes
            </h3>

            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Book an Uber from a web browser, no app install necessary.
            </p>

            {/* CTA Button */}
            <Link
                href="/trip"
                className="block w-full bg-black text-white text-center px-6 py-3 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors"
            >
                Request a Ride
            </Link>
        </div>
    );
}
