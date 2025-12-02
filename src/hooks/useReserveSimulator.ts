import { ScheduledRide } from '@/features/driver/reserve.state';
import {
    calculateRequireOnlineTime,
    calculateArriveByTime,
    getWaitTimeMinutes,
    calculateCancellationDeadline
} from '@/lib/reserve-utils';

/**
 * Hook to generate mock scheduled rides for testing
 */
export function useReserveSimulator() {
    const generateMockReserves = (): ScheduledRide[] => {
        const now = Date.now();

        // Generate 3 scheduled rides at different times
        const rides: ScheduledRide[] = [
            // 1. Ride in 30 minutes (Economy - urgent!)
            {
                id: 'reserve-1',
                riderName: 'Emma Wilson',
                riderRating: 4.9,
                pickupAddress: '42 Baker Street, London',
                dropoffAddress: 'Heathrow Airport Terminal 5',
                distance: '24 km',
                duration: '35 min',
                price: 45.50,
                type: 'Standard',
                tier: 'economy',
                scheduledTime: now + (30 * 60 * 1000), // 30 min from now
                acceptedAt: now - (2 * 60 * 60 * 1000), // Accepted 2 hours ago
                status: 'accepted',
                requireOnlineAt: 0, // Will be calculated
                arriveByTime: 0,
                waitTimeMinutes: 0,
                cancellationDeadline: 0,
                driverOnline: false,
                arrivedEarly: false
            },

            // 2. Ride in 2 hours (Premium)
            {
                id: 'reserve-2',
                riderName: 'James Chen',
                riderRating: 5.0,
                pickupAddress: 'The Ritz Hotel, Piccadilly',
                dropoffAddress: 'London City Airport',
                distance: '18 km',
                duration: '28 min',
                price: 65.00,
                type: 'Executive',
                tier: 'premium',
                scheduledTime: now + (2 * 60 * 60 * 1000), // 2 hours from now
                acceptedAt: now - (1 * 60 * 60 * 1000),
                status: 'accepted',
                requireOnlineAt: 0,
                arriveByTime: 0,
                waitTimeMinutes: 0,
                cancellationDeadline: 0,
                driverOnline: false,
                arrivedEarly: false
            },

            // 3. Ride tomorrow at 9 AM (Economy)
            {
                id: 'reserve-3',
                riderName: 'Sarah Johnson',
                riderRating: 4.7,
                pickupAddress: '15 Downing Street, Westminster',
                dropoffAddress: 'King\'s Cross Station',
                distance: '5.2 km',
                duration: '12 min',
                price: 18.00,
                type: 'Standard',
                tier: 'economy',
                scheduledTime: getTomorrowAt9AM(),
                acceptedAt: now - (12 * 60 * 60 * 1000),
                status: 'accepted',
                requireOnlineAt: 0,
                arriveByTime: 0,
                waitTimeMinutes: 0,
                cancellationDeadline: 0,
                driverOnline: false,
                arrivedEarly: false
            }
        ];

        // Calculate time requirements for each ride
        return rides.map(ride => ({
            ...ride,
            requireOnlineAt: calculateRequireOnlineTime(ride.scheduledTime, ride.tier),
            arriveByTime: calculateArriveByTime(ride.scheduledTime, ride.tier),
            waitTimeMinutes: getWaitTimeMinutes(ride.tier),
            cancellationDeadline: calculateCancellationDeadline(ride.scheduledTime)
        }));
    };

    const generateAvailableReserves = (): ScheduledRide[] => {
        const now = Date.now();

        // Generate 2-3 available (not yet accepted) reserves
        const available: ScheduledRide[] = [
            {
                id: 'available-1',
                riderName: 'Michael Brown',
                riderRating: 4.8,
                pickupAddress: '88 Oxford Street, London',
                dropoffAddress: 'Gatwick Airport',
                distance: '42 km',
                duration: '55 min',
                price: 72.00,
                type: 'XL',
                tier: 'economy',
                scheduledTime: now + (4 * 60 * 60 * 1000), // 4 hours from now
                acceptedAt: 0,
                status: 'pending',
                requireOnlineAt: 0,
                arriveByTime: 0,
                waitTimeMinutes: 0,
                cancellationDeadline: 0
            },
            {
                id: 'available-2',
                riderName: 'Olivia Martinez',
                riderRating: 5.0,
                pickupAddress: 'Claridge\'s Hotel, Mayfair',
                dropoffAddress: 'Royal Opera House',
                distance: '3.8 km',
                duration: '10 min',
                price: 28.50,
                type: 'Executive',
                tier: 'premium',
                scheduledTime: getTodayAt8PM(),
                acceptedAt: 0,
                status: 'pending',
                requireOnlineAt: 0,
                arriveByTime: 0,
                waitTimeMinutes: 0,
                cancellationDeadline: 0
            }
        ];

        return available.map(ride => ({
            ...ride,
            requireOnlineAt: calculateRequireOnlineTime(ride.scheduledTime, ride.tier),
            arriveByTime: calculateArriveByTime(ride.scheduledTime, ride.tier),
            waitTimeMinutes: getWaitTimeMinutes(ride.tier),
            cancellationDeadline: calculateCancellationDeadline(ride.scheduledTime)
        }));
    };

    return {
        generateMockReserves,
        generateAvailableReserves
    };
}

// Helper to get tomorrow at 9 AM
function getTomorrowAt9AM(): number {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    return tomorrow.getTime();
}

// Helper to get today at 8 PM
function getTodayAt8PM(): number {
    const today = new Date();
    today.setHours(20, 0, 0, 0);

    // If 8 PM has already passed, use tomorrow at 8 PM
    if (today.getTime() < Date.now()) {
        today.setDate(today.getDate() + 1);
    }

    return today.getTime();
}
