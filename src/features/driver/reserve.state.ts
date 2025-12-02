import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ReserveTier = 'economy' | 'premium';

export interface ScheduledRide {
    id: string;
    riderName: string;
    riderRating: number;
    pickupAddress: string;
    dropoffAddress: string;
    distance: string;
    duration: string;
    price: number;
    type: 'Standard' | 'XL' | 'Executive';

    // Reserve-specific fields
    scheduledTime: number; // Unix timestamp
    acceptedAt: number;
    tier: ReserveTier;

    // Time requirements
    requireOnlineAt: number; // When driver must go online
    arriveByTime: number; // When driver should arrive
    waitTimeMinutes: number; // Complimentary wait time
    cancellationDeadline: number; // Last time to cancel without penalty

    // Status tracking
    status: 'pending' | 'accepted' | 'active' | 'completed' | 'cancelled';
    driverOnline?: boolean;
    arrivedEarly?: boolean;
}

interface ReserveState {
    // Available reserve requests (not yet accepted)
    availableReserves: ScheduledRide[];

    // Accepted scheduled rides
    scheduledRides: ScheduledRide[];

    // Currently active scheduled ride
    activeScheduledRide: ScheduledRide | null;

    // Notifications
    notifications: {
        id: string;
        rideId: string;
        type: 'reminder' | 'go_online' | 'navigate' | 'critical';
        message: string;
        timestamp: number;
        dismissed: boolean;
    }[];

    // Actions
    loadAvailableReserves: (reserves: ScheduledRide[]) => void;
    acceptReserve: (rideId: string) => void;
    cancelReserve: (rideId: string) => boolean; // Returns false if penalty
    markDriverOnline: (rideId: string) => void;
    markArrived: (rideId: string) => void;
    startReserveTrip: (rideId: string) => void;
    completeReserveTrip: (rideId: string) => void;

    // Notification actions
    addNotification: (rideId: string, type: string, message: string) => void;
    dismissNotification: (notificationId: string) => void;
    clearOldNotifications: () => void;
}

export const useReserveStore = create<ReserveState>()(
    persist(
        (set, get) => ({
            availableReserves: [],
            scheduledRides: [],
            activeScheduledRide: null,
            notifications: [],

            loadAvailableReserves: (reserves) => set({ availableReserves: reserves }),

            acceptReserve: (rideId) => {
                const reserve = get().availableReserves.find(r => r.id === rideId);
                if (!reserve) return;

                const acceptedRide: ScheduledRide = {
                    ...reserve,
                    status: 'accepted',
                    acceptedAt: Date.now()
                };

                set((state) => ({
                    availableReserves: state.availableReserves.filter(r => r.id !== rideId),
                    scheduledRides: [...state.scheduledRides, acceptedRide].sort(
                        (a, b) => a.scheduledTime - b.scheduledTime
                    )
                }));

                // Add confirmation notification
                get().addNotification(
                    rideId,
                    'reminder',
                    `Reserved! Go online by ${new Date(acceptedRide.requireOnlineAt).toLocaleTimeString()}`
                );
            },

            cancelReserve: (rideId) => {
                const ride = get().scheduledRides.find(r => r.id === rideId);
                if (!ride) return false;

                const now = Date.now();
                const hasPenalty = now > ride.cancellationDeadline;

                set((state) => ({
                    scheduledRides: state.scheduledRides.filter(r => r.id !== rideId)
                }));

                return hasPenalty;
            },

            markDriverOnline: (rideId) => {
                set((state) => ({
                    scheduledRides: state.scheduledRides.map(r =>
                        r.id === rideId ? { ...r, driverOnline: true } : r
                    )
                }));
            },

            markArrived: (rideId) => {
                set((state) => ({
                    scheduledRides: state.scheduledRides.map(r =>
                        r.id === rideId ? { ...r, arrivedEarly: true } : r
                    )
                }));
            },

            startReserveTrip: (rideId) => {
                const ride = get().scheduledRides.find(r => r.id === rideId);
                if (!ride) return;

                set((state) => ({
                    scheduledRides: state.scheduledRides.filter(r => r.id !== rideId),
                    activeScheduledRide: { ...ride, status: 'active' }
                }));
            },

            completeReserveTrip: (rideId) => {
                set({
                    activeScheduledRide: null
                });
            },

            addNotification: (rideId, type, message) => {
                const notification = {
                    id: Math.random().toString(36).substr(2, 9),
                    rideId,
                    type: type as any,
                    message,
                    timestamp: Date.now(),
                    dismissed: false
                };

                set((state) => ({
                    notifications: [...state.notifications, notification]
                }));
            },

            dismissNotification: (notificationId) => {
                set((state) => ({
                    notifications: state.notifications.map(n =>
                        n.id === notificationId ? { ...n, dismissed: true } : n
                    )
                }));
            },

            clearOldNotifications: () => {
                const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
                set((state) => ({
                    notifications: state.notifications.filter(
                        n => n.timestamp > oneDayAgo && !n.dismissed
                    )
                }));
            }
        }),
        {
            name: 'reserve-storage',
            partialize: (state) => ({
                scheduledRides: state.scheduledRides,
                notifications: state.notifications
            })
        }
    )
);
