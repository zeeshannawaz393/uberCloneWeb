'use client';

import { DashboardTabs } from '@/components/driver/dashboard/DashboardTabs';
import { useRouter } from 'next/navigation';
import { User, Star, Car, FileText, Settings, LogOut, ChevronRight, Shield, Bell } from 'lucide-react';

export default function ProfilePage() {
    const router = useRouter();

    // Mock driver data
    const driver = {
        name: 'John Driver',
        rating: 4.9,
        totalTrips: 1247,
        memberSince: 'January 2023',
        vehicle: {
            make: 'Toyota',
            model: 'Prius',
            year: 2022,
            plate: 'AB12 CDE'
        }
    };

    const menuItems = [
        { icon: User, label: 'Personal Information', path: '/driver/profile/personal' },
        { icon: Car, label: 'Vehicle Details', path: '/driver/profile/vehicle' },
        { icon: FileText, label: 'Documents', path: '/driver/profile/documents', badge: '2 expiring' },
        { icon: Bell, label: 'Notifications', path: '/driver/profile/notifications' },
        { icon: Shield, label: 'Safety & Security', path: '/driver/profile/safety' },
        { icon: Settings, label: 'Settings', path: '/driver/profile/settings' },
    ];

    return (
        <main className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <div className="max-w-2xl mx-auto px-4 py-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                            <User className="w-10 h-10 text-gray-500" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold mb-1">{driver.name}</h1>
                            <div className="flex items-center gap-2 text-sm opacity-90">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{driver.rating}</span>
                                <span>•</span>
                                <span>{driver.totalTrips} trips</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                            <div className="text-xs opacity-75 mb-1">Member Since</div>
                            <div className="font-semibold">{driver.memberSince}</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                            <div className="text-xs opacity-75 mb-1">Vehicle</div>
                            <div className="font-semibold">{driver.vehicle.year} {driver.vehicle.make}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
                {/* Menu Items */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-200">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.path}
                                onClick={() => router.push(item.path)}
                                className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                            >
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-5 h-5 text-gray-600" />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="font-medium text-gray-900">{item.label}</div>
                                    {item.badge && (
                                        <div className="text-xs text-orange-600 font-medium mt-0.5">{item.badge}</div>
                                    )}
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </button>
                        );
                    })}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => alert('View trip history')}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        <FileText className="w-6 h-6 text-gray-600 mb-2" />
                        <div className="font-medium text-gray-900 text-sm">Trip History</div>
                        <div className="text-xs text-gray-500 mt-1">{driver.totalTrips} total trips</div>
                    </button>

                    <button
                        onClick={() => alert('View ratings')}
                        className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                        <Star className="w-6 h-6 text-yellow-500 mb-2" />
                        <div className="font-medium text-gray-900 text-sm">My Ratings</div>
                        <div className="text-xs text-gray-500 mt-1">{driver.rating} average</div>
                    </button>
                </div>

                {/* Logout */}
                <button
                    onClick={() => {
                        if (confirm('Are you sure you want to logout?')) {
                            router.push('/driver/onboarding/city');
                        }
                    }}
                    className="w-full bg-white rounded-xl p-4 shadow-sm border border-red-200 hover:bg-red-50 transition-colors flex items-center justify-center gap-2 text-red-600 font-medium"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>

                {/* Version Info */}
                <div className="text-center text-xs text-gray-400">
                    Version 1.0.0 • Driver App
                </div>
            </div>

            {/* Tab Navigation */}
            <DashboardTabs />
        </main>
    );
}
