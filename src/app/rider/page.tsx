'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

export default function RiderPage() {
    const user = useAuthStore((state) => state.user);
    const [activeTab, setActiveTab] = useState<'book' | 'active' | 'history'>('book');

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-dark-900 mb-2">
                        Welcome, {user?.username || 'Rider'}!
                    </h1>
                    <p className="text-dark-600">Book a ride or track your journey</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setActiveTab('book')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'book'
                                ? 'bg-primary-600 text-white shadow-lg'
                                : 'bg-white text-dark-700 hover:bg-dark-50'
                            }`}
                    >
                        Book Ride
                    </button>
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'active'
                                ? 'bg-primary-600 text-white shadow-lg'
                                : 'bg-white text-dark-700 hover:bg-dark-50'
                            }`}
                    >
                        Active Ride
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'history'
                                ? 'bg-primary-600 text-white shadow-lg'
                                : 'bg-white text-dark-700 hover:bg-dark-50'
                            }`}
                    >
                        History
                    </button>
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {activeTab === 'book' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Book a Ride</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-dark-700 mb-2">
                                                Pickup Location
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter pickup address"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-dark-700 mb-2">
                                                Dropoff Location
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter destination"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-dark-700 mb-2">
                                                Vehicle Type
                                            </label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['Economy', 'Comfort', 'Premium', 'XL'].map((type) => (
                                                    <button
                                                        key={type}
                                                        className="p-4 rounded-xl border-2 border-dark-200 hover:border-primary-500 hover:bg-primary-50 transition-all text-left"
                                                    >
                                                        <div className="font-medium">{type}</div>
                                                        <div className="text-sm text-dark-600">
                                                            ${type === 'Economy' ? '8' : type === 'Comfort' ? '12' : type === 'Premium' ? '18' : '15'} - 5 min away
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <Button variant="primary" className="w-full" size="lg">
                                            Request Ride
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'active' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>No Active Ride</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-dark-600 text-center py-8">
                                        You don&apos;t have any active rides. Book a ride to get started!
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'history' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ride History</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-dark-600 text-center py-8">
                                        No ride history yet. Your completed rides will appear here.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Quick Stats</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-dark-600">Total Rides</div>
                                        <div className="text-2xl font-bold">0</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-dark-600">Total Spent</div>
                                        <div className="text-2xl font-bold">$0.00</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-dark-600">Favorite Route</div>
                                        <div className="text-sm font-medium">N/A</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Saved Places</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <button className="w-full p-3 rounded-lg border-2 border-dashed border-dark-300 hover:border-primary-500 hover:bg-primary-50 transition-all text-dark-600 hover:text-primary-600">
                                        + Add Home
                                    </button>
                                    <button className="w-full p-3 rounded-lg border-2 border-dashed border-dark-300 hover:border-primary-500 hover:bg-primary-50 transition-all text-dark-600 hover:text-primary-600">
                                        + Add Work
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
