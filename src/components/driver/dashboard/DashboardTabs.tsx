'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, Calendar, DollarSign, User } from 'lucide-react';
import { useReserveStore } from '@/features/driver/reserve.state';

export const DashboardTabs = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { scheduledRides } = useReserveStore();

    const tabs = [
        {
            id: 'active',
            label: 'Active',
            icon: Home,
            path: '/driver/dashboard',
            badge: null
        },
        {
            id: 'reservations',
            label: 'Reservations',
            icon: Calendar,
            path: '/driver/dashboard/reservations',
            badge: scheduledRides.length > 0 ? scheduledRides.length : null
        },
        {
            id: 'earnings',
            label: 'Earnings',
            icon: DollarSign,
            path: '/driver/dashboard/earnings',
            badge: null
        },
        {
            id: 'profile',
            label: 'Profile',
            icon: User,
            path: '/driver/dashboard/profile',
            badge: null
        }
    ];

    const isActive = (path: string) => {
        if (path === '/driver/dashboard') {
            return pathname === path;
        }
        return pathname?.startsWith(path);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-bottom">
            <div className="max-w-2xl mx-auto grid grid-cols-4">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const active = isActive(tab.path);

                    return (
                        <button
                            key={tab.id}
                            onClick={() => router.push(tab.path)}
                            className={`flex flex-col items-center gap-1 py-3 transition-colors relative ${active
                                    ? 'text-black'
                                    : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <div className="relative">
                                <Icon className="w-6 h-6" />
                                {tab.badge !== null && (
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                        {tab.badge}
                                    </div>
                                )}
                            </div>
                            <span className={`text-xs font-medium ${active ? 'font-bold' : ''}`}>
                                {tab.label}
                            </span>
                            {active && (
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-black" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
