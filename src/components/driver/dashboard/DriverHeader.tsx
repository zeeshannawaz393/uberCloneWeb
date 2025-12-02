'use client';

import { useDriverJourney } from '@/features/driver/driver-journey.state';
import { Menu, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const DriverHeader = () => {
    const router = useRouter();
    const { isOnline, todayEarnings } = useDriverJourney();

    return (
        <header className="absolute top-0 left-0 right-0 z-10 p-4 pt-12 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
            <div className="flex justify-between items-start pointer-events-auto">
                {/* Profile / Menu */}
                <button
                    onClick={() => {
                        const menuOptions = [
                            '⚙️ Settings',
                            '❓ Help & Support',
                            '📚 Driver Guide',
                            '🚗 Vehicle Info',
                            '🔔 Notifications',
                            '🚪 Logout'
                        ].join('\n');
                        alert(`Menu:\n\n${menuOptions}\n\nIn production, this would show a slide-in menu.`);
                    }}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                >
                    <Menu className="w-5 h-5 text-gray-700" />
                </button>

                {/* Earnings (Visible when online) */}
                {isOnline && (
                    <div className="bg-black text-white px-4 py-2 rounded-full shadow-lg flex flex-col items-center">
                        <span className="text-xs font-medium text-gray-300">TODAY</span>
                        <span className="text-lg font-bold">£{todayEarnings.toFixed(2)}</span>
                    </div>
                )}

                {/* Notifications */}
                <button
                    onClick={() => {
                        alert('Notifications:\n\n• New Reserve trip available\n• Earnings summary ready\n• Document expiring soon\n\nIn production, this would show a notification center.');
                    }}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors relative"
                >
                    <Bell className="w-5 h-5 text-gray-700" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        3
                    </div>
                </button>
            </div>

            {/* Status Indicator */}
            <div className="mt-4 flex justify-center">
                {isOnline ? (
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        You are online
                    </div>
                ) : (
                    <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                        Offline
                    </div>
                )}
            </div>
        </header>
    );
};
