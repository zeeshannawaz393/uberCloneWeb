'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useAuthStore } from '@/store/authStore';

export default function DriverPage() {
    const user = useAuthStore((state) => state.user);
    const [isOnline, setIsOnline] = useState(false);
    const [activeTab, setActiveTab] = useState<'requests' | 'active' | 'earnings'>('requests');

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-dark-900 mb-2">
                            Driver Dashboard
                        </h1>
                        <p className="text-dark-600">Welcome, {user?.username || 'Driver'}!</p>
                    </div>
                    <button
                        onClick={() => setIsOnline(!isOnline)}
                        className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${isOnline
                                ? 'bg-success-600 text-white shadow-lg shadow-success-500/30'
                                : 'bg-dark-300 text-dark-700'
                            }`}
                    >
                        {isOnline ? '🟢 Online' : '⚫ Offline'}
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => setActiveTab('requests')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'requests'
                                ? 'bg-primary-600 text-white shadow-lg'
                                : 'bg-white text-dark-700 hover:bg-dark-50'
                            }`}
                    >
                        Ride Requests
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
                        onClick={() => setActiveTab('earnings')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'earnings'
                                ? 'bg-primary-600 text-white shadow-lg'
                                : 'bg-white text-dark-700 hover:bg-dark-50'
                            }`}
                    >
                        Earnings
                    </button>
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {activeTab === 'requests' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Incoming Ride Requests</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {!isOnline ? (
                                        <p className="text-dark-600 text-center py-8">
                                            Go online to start receiving ride requests
                                        </p>
                                    ) : (
                                        <p className="text-dark-600 text-center py-8">
                                            No ride requests at the moment. Stay online to receive requests!
                                        </p>
                                    )}
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
                                        You don&apos;t have any active rides. Accept a ride request to get started!
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'earnings' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Earnings Overview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="text-center p-4 bg-primary-50 rounded-xl">
                                                <div className="text-sm text-dark-600">Today</div>
                                                <div className="text-2xl font-bold text-primary-600">$0.00</div>
                                            </div>
                                            <div className="text-center p-4 bg-accent-50 rounded-xl">
                                                <div className="text-sm text-dark-600">This Week</div>
                                                <div className="text-2xl font-bold text-accent-600">$0.00</div>
                                            </div>
                                            <div className="text-center p-4 bg-success-50 rounded-xl">
                                                <div className="text-sm text-dark-600">This Month</div>
                                                <div className="text-2xl font-bold text-success-600">$0.00</div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-medium mb-3">Recent Trips</h3>
                                            <p className="text-dark-600 text-center py-4">
                                                No trips yet. Complete rides to see your earnings history.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Today&apos;s Stats</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-dark-600">Trips Completed</div>
                                        <div className="text-2xl font-bold">0</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-dark-600">Hours Online</div>
                                        <div className="text-2xl font-bold">0h 0m</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-dark-600">Acceptance Rate</div>
                                        <div className="text-2xl font-bold">N/A</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-dark-600">Rating</div>
                                        <div className="text-2xl font-bold">⭐ 5.0</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Vehicle Info</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-dark-600">Model</span>
                                        <span className="font-medium">Toyota Camry</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-dark-600">Color</span>
                                        <span className="font-medium">Silver</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-dark-600">Plate</span>
                                        <span className="font-medium">ABC-1234</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-dark-600">Type</span>
                                        <span className="font-medium">Comfort</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
