'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

export default function CourierPage() {
    const user = useAuthStore((state) => state.user);
    const [isOnline, setIsOnline] = useState(false);
    const [activeTab, setActiveTab] = useState<'requests' | 'active' | 'history'>('requests');

    return (
        <main className="min-h-screen bg-gradient-to-br from-accent-50 via-white to-primary-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-dark-900 mb-2">
                            Courier Dashboard
                        </h1>
                        <p className="text-dark-600">Welcome, {user?.username || 'Courier'}!</p>
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
                                ? 'bg-accent-600 text-white shadow-lg'
                                : 'bg-white text-dark-700 hover:bg-dark-50'
                            }`}
                    >
                        Delivery Requests
                    </button>
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'active'
                                ? 'bg-accent-600 text-white shadow-lg'
                                : 'bg-white text-dark-700 hover:bg-dark-50'
                            }`}
                    >
                        Active Delivery
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === 'history'
                                ? 'bg-accent-600 text-white shadow-lg'
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
                        {activeTab === 'requests' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Incoming Delivery Requests</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {!isOnline ? (
                                        <p className="text-dark-600 text-center py-8">
                                            Go online to start receiving delivery requests
                                        </p>
                                    ) : (
                                        <p className="text-dark-600 text-center py-8">
                                            No delivery requests at the moment. Stay online to receive requests!
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'active' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>No Active Delivery</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-dark-600 text-center py-8">
                                        You don&apos;t have any active deliveries. Accept a delivery request to get started!
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'history' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Delivery History</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-dark-600 text-center py-8">
                                        No delivery history yet. Your completed deliveries will appear here.
                                    </p>
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
                                        <div className="text-sm text-dark-600">Deliveries Completed</div>
                                        <div className="text-2xl font-bold">0</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-dark-600">Earnings</div>
                                        <div className="text-2xl font-bold text-accent-600">$0.00</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-dark-600">Hours Online</div>
                                        <div className="text-2xl font-bold">0h 0m</div>
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
                                <CardTitle className="text-lg">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Button variant="outline" className="w-full">
                                        📦 View Package Guidelines
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        📍 Update Location
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        💬 Contact Support
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
