/**
 * Utility functions for Uber Reserve (scheduled rides)
 */

import { ReserveTier, ScheduledRide } from '@/features/driver/reserve.state';

/**
 * Calculate when driver must go online based on tier
 * Economy: 30 min before, Premium: 45 min before
 */
export function calculateRequireOnlineTime(scheduledTime: number, tier: ReserveTier): number {
    const minutesBefore = tier === 'premium' ? 45 : 30;
    return scheduledTime - (minutesBefore * 60 * 1000);
}

/**
 * Calculate when driver should arrive at pickup
 * Economy: 5 min before, Premium: 15 min before
 */
export function calculateArriveByTime(scheduledTime: number, tier: ReserveTier): number {
    const minutesBefore = tier === 'premium' ? 15 : 5;
    return scheduledTime - (minutesBefore * 60 * 1000);
}

/**
 * Get complimentary wait time in minutes
 * Economy: 5 min, Premium: 15 min
 */
export function getWaitTimeMinutes(tier: ReserveTier): number {
    return tier === 'premium' ? 15 : 5;
}

/**
 * Calculate cancellation deadline (1 hour before pickup)
 */
export function calculateCancellationDeadline(scheduledTime: number): number {
    return scheduledTime - (60 * 60 * 1000);
}

/**
 * Check if driver can cancel without penalty
 */
export function canCancelWithoutPenalty(scheduledTime: number): boolean {
    return Date.now() < calculateCancellationDeadline(scheduledTime);
}

/**
 * Get time until event in human-readable format
 */
export function getTimeUntil(targetTime: number): string {
    const diff = targetTime - Date.now();

    if (diff < 0) return 'Past due';

    const minutes = Math.floor(diff / (60 * 1000));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    return `${minutes}m`;
}

/**
 * Get countdown string (e.g., "2h 15m" or "45m" or "5m")
 */
export function getCountdown(targetTime: number): string {
    const diff = targetTime - Date.now();

    if (diff < 0) return '0m';

    const totalMinutes = Math.floor(diff / (60 * 1000));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}

/**
 * Get urgency level based on time until event
 */
export function getUrgencyLevel(targetTime: number): 'critical' | 'warning' | 'normal' {
    const diff = targetTime - Date.now();
    const minutes = diff / (60 * 1000);

    if (minutes < 10) return 'critical';
    if (minutes < 30) return 'warning';
    return 'normal';
}

/**
 * Format time for display (e.g., "2:30 PM")
 */
export function formatTime(timestamp: number): string {
    return new Date(timestamp).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

/**
 * Format date for display (e.g., "Today", "Tomorrow", "Mon, Dec 2")
 */
export function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Reset time for comparison
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());

    if (dateOnly.getTime() === todayOnly.getTime()) return 'Today';
    if (dateOnly.getTime() === tomorrowOnly.getTime()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Get status badge info
 */
export function getStatusBadge(ride: ScheduledRide): {
    text: string;
    color: 'red' | 'yellow' | 'green' | 'blue' | 'gray';
} {
    const now = Date.now();

    if (ride.status === 'cancelled') {
        return { text: 'Cancelled', color: 'gray' };
    }

    if (ride.status === 'completed') {
        return { text: 'Completed', color: 'green' };
    }

    if (ride.status === 'active') {
        return { text: 'In Progress', color: 'blue' };
    }

    // For accepted rides, check time-based status
    if (now >= ride.scheduledTime) {
        return { text: 'Ready to Start', color: 'green' };
    }

    if (now >= ride.arriveByTime && !ride.arrivedEarly) {
        return { text: 'Arrive Now', color: 'red' };
    }

    if (now >= ride.requireOnlineAt && !ride.driverOnline) {
        return { text: 'Go Online Now', color: 'red' };
    }

    const minutesUntilOnline = (ride.requireOnlineAt - now) / (60 * 1000);
    if (minutesUntilOnline < 10) {
        return { text: `Go Online in ${Math.floor(minutesUntilOnline)}m`, color: 'yellow' };
    }

    return { text: formatDate(ride.scheduledTime), color: 'blue' };
}

/**
 * Check if it's time to show a notification
 */
export function shouldNotify(ride: ScheduledRide, type: 'go_online' | 'navigate' | 'reminder'): boolean {
    const now = Date.now();

    switch (type) {
        case 'go_online':
            // Notify at exact time to go online
            return now >= ride.requireOnlineAt && !ride.driverOnline;

        case 'navigate':
            // Notify when it's time to head to pickup
            return now >= ride.arriveByTime && !ride.arrivedEarly;

        case 'reminder':
            // Notify 1 hour before
            const oneHourBefore = ride.scheduledTime - (60 * 60 * 1000);
            return now >= oneHourBefore && now < ride.requireOnlineAt;

        default:
            return false;
    }
}
