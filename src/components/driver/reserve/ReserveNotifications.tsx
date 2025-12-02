'use client';

import { Bell, X } from 'lucide-react';
import { useReserveStore } from '@/features/driver/reserve.state';
import { formatTime } from '@/lib/reserve-utils';

export const ReserveNotifications = () => {
    const { notifications, dismissNotification } = useReserveStore();

    const activeNotifications = notifications.filter(n => !n.dismissed);

    if (activeNotifications.length === 0) return null;

    const getNotificationColor = (type: string) => {
        switch (type) {
            case 'urgent': return 'bg-red-50 border-red-200 text-red-900';
            case 'warning': return 'bg-orange-50 border-orange-200 text-orange-900';
            case 'success': return 'bg-green-50 border-green-200 text-green-900';
            default: return 'bg-gray-50 border-gray-200 text-gray-900';
        }
    };

    const getIcon = (type: string) => {
        return <Bell className="w-4 h-4" />;
    };

    return (
        <div className="fixed top-20 left-0 right-0 z-30 px-4 pointer-events-none">
            <div className="max-w-md mx-auto space-y-2 pointer-events-auto">
                {activeNotifications.slice(0, 3).map((notification) => (
                    <div
                        key={notification.id}
                        className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg animate-slide-down ${getNotificationColor(notification.type)}`}
                    >
                        <div className="flex-shrink-0 mt-0.5">
                            {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{notification.message}</p>
                            <p className="text-xs opacity-75 mt-1">
                                {formatTime(notification.timestamp)}
                            </p>
                        </div>
                        <button
                            onClick={() => dismissNotification(notification.id)}
                            className="flex-shrink-0 p-1 hover:bg-black/10 rounded-full transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
