'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { mockTrips } from '@/mocks/trips';

export default function TripDetailsPage() {
    const params = useParams();
    const tripId = params.id as string;

    // Find the trip by ID
    const trip = mockTrips.find(t => t.id === tripId);

    if (!trip) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-black mb-4">Trip not found</h1>
                    <Link href="/trips" className="text-blue-600 hover:underline">
                        Back to trips
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200 px-6 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link
                        href="/trips"
                        className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to trips
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link href="/trips" className="text-black hover:text-gray-600">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                            </svg>
                        </Link>
                        <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-8">
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-black mb-4">Your Trip</h1>

                {/* Trip Info */}
                <p className="text-base text-black mb-6">
                    {trip.time}, {trip.date} {trip.driverName && `with ${trip.driverName}`}
                </p>

                {/* Map Section */}
                <div className="bg-gray-100 rounded-xl h-80 mb-8 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-5xl mb-2">🗺️</div>
                        <p className="text-sm text-gray-500">Route Map</p>
                        <p className="text-xs text-gray-400 mt-1">
                            {trip.pickup || 'Pickup'} → {trip.destination}
                        </p>
                    </div>
                </div>

                {/* Rate Trip Section */}
                {trip.status === 'completed' && (
                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-black mb-4">Rate trip</h2>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    className="text-4xl text-gray-300 hover:text-black transition-colors"
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                {/* Trip Details Section */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-black mb-4">Trip details</h2>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className="text-lg">📍</span>
                            <span className="text-sm text-black">2.46 kilometers</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-lg">⏱️</span>
                            <span className="text-sm text-black">5 min</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-lg">💵</span>
                            <span className="text-sm text-black">{trip.currency} {trip.price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-lg">💳</span>
                            <span className="text-sm text-black">Cash</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button className="flex items-center gap-2 px-5 py-3 border border-gray-300 rounded-lg text-sm font-medium text-black hover:bg-gray-50 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            View Receipt
                        </button>
                        <button className="flex items-center gap-2 px-5 py-3 border border-gray-300 rounded-lg text-sm font-medium text-black hover:bg-gray-50 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                            Resend Receipt
                        </button>
                    </div>
                </section>

                {/* Route Section */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold text-black mb-4">Route</h2>
                    <div className="space-y-6">
                        {/* Pickup */}
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 bg-black rounded-full"></div>
                                <div className="w-0.5 h-16 bg-gray-300"></div>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-black">{trip.pickup || 'Pickup Location'}</p>
                                <p className="text-xs text-gray-500 mt-1">{trip.time}</p>
                            </div>
                        </div>

                        {/* Destination */}
                        <div className="flex gap-4">
                            <div className="w-3 h-3 bg-black"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-black">{trip.destination}</p>
                                <p className="text-xs text-gray-500 mt-1">3:33 PM</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Get Help Section */}
                <section className="border-t border-gray-200 pt-6">
                    <button className="flex items-center justify-between w-full hover:bg-gray-50 -mx-3 px-3 py-3 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <span className="text-base font-medium text-black">Get Help</span>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </section>
            </main>
        </div>
    );
}
