'use client';

import { DashboardTabs } from '@/components/driver/dashboard/DashboardTabs';
import { useDriverJourney } from '@/features/driver/driver-journey.state';
import { DollarSign, TrendingUp, Calendar, Clock, ChevronRight } from 'lucide-react';

export default function EarningsPage() {
    const { todayEarnings } = useDriverJourney();

    // Mock data
    const weeklyEarnings = 287.50;
    const tripsToday = 12;
    const hoursOnline = 6.5;

    const recentTrips = [
        { id: '1', time: '2:45 PM', from: 'Baker Street', to: 'Heathrow Airport', earnings: 45.50 },
        { id: '2', time: '1:30 PM', from: 'Oxford Street', to: 'King\'s Cross', earnings: 18.00 },
        { id: '3', time: '12:15 PM', from: 'Piccadilly', to: 'London Bridge', earnings: 22.50 },
    ];

    return (
        <main className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">Earnings</h1>
                    <p className="text-sm text-gray-500">Track your income and trips</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                {/* Today's Earnings Card */}
                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5" />
                        <span className="text-sm font-medium opacity-90">Today's Earnings</span>
                    </div>
                    <div className="text-4xl font-bold mb-1">£{todayEarnings.toFixed(2)}</div>
                    <div className="flex items-center gap-4 text-sm opacity-90">
                        <span>{tripsToday} trips</span>
                        <span>•</span>
                        <span>{hoursOnline}h online</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-4 h-4 text-gray-600" />
                            <span className="text-xs text-gray-500">This Week</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">£{weeklyEarnings.toFixed(2)}</div>
                        <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                            <TrendingUp className="w-3 h-3" />
                            <span>+12% vs last week</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-purple-600" />
                            <span className="text-xs text-gray-500">Avg per Hour</span>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">£{(todayEarnings / hoursOnline).toFixed(2)}</div>
                        <div className="text-xs text-gray-500 mt-1">Based on today</div>
                    </div>
                </div>

                {/* Recent Trips */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="font-bold text-gray-900">Recent Trips</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {recentTrips.map((trip) => (
                            <div key={trip.id} className="p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-500 mb-1">{trip.time}</div>
                                        <div className="space-y-1">
                                            <div className="flex items-start gap-2">
                                                <div className="w-3 h-3 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-1">
                                                    <div className="w-1 h-1 bg-white rounded-full" />
                                                </div>
                                                <span className="text-sm text-gray-700">{trip.from}</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <div className="w-3 h-3 rounded-full border-2 border-black bg-white flex items-center justify-center flex-shrink-0 mt-1">
                                                    <div className="w-1 h-1 bg-black rounded-sm" />
                                                </div>
                                                <span className="text-sm text-gray-700">{trip.to}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-gray-900">£{trip.earnings.toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full p-4 text-center text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                        View All Trips
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Coming Soon */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-900 font-medium">📊 More detailed analytics coming soon!</p>
                    <p className="text-xs text-gray-700 mt-1">Weekly summaries, tax reports, and payout tracking</p>
                </div>
            </div>

            {/* Tab Navigation */}
            <DashboardTabs />
        </main>
    );
}
