'use client';

import Link from 'next/link';

export function EmptyStateCard() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex flex-col md:flex-row">
                {/* Hero Image */}
                <div className="w-full md:w-3/5 bg-gradient-to-br from-purple-400 via-blue-400 to-orange-300 p-8 md:p-12 flex items-center justify-center min-h-[200px]">
                    <div className="text-center">
                        {/* Placeholder for illustration - you can add an actual image here */}
                        <div className="text-white text-6xl mb-4">🚗</div>
                        <p className="text-white text-sm opacity-90">No ongoing trips</p>
                    </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-black mb-6">
                        You have no ongoing trips
                    </h3>

                    <Link
                        href="/trip"
                        className="inline-flex items-center gap-2 px-5 py-3 border border-gray-300 rounded-lg font-semibold text-sm text-black hover:bg-gray-50 transition-colors w-fit"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                        </svg>
                        Book now
                    </Link>
                </div>
            </div>
        </div>
    );
}
