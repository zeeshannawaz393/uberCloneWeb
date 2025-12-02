import { create } from 'zustand';

export type DriverStatus =
    | 'offline'
    | 'online'
    | 'requesting' // Receiving a request
    | 'pickup'     // Navigating to pickup
    | 'arrived'    // At pickup location
    | 'in_progress' // Trip started
    | 'dropping_off' // At dropoff location
    | 'completed';   // Trip finished

export interface RideRequest {
    id: string;
    riderName: string;
    riderRating: number;
    pickupAddress: string;
    dropoffAddress: string;
    distance: string; // e.g. "3.2 km"
    duration: string; // e.g. "12 min"
    price: number;
    type: 'Standard' | 'XL' | 'Executive';
}

export interface ActiveRide extends RideRequest {
    status: 'accepted' | 'arrived' | 'started' | 'completed';
    pinVerified: boolean;
    photoVerified: boolean;
    startTime?: number;
    endTime?: number;
}

interface DriverJourneyState {
    // Status
    status: DriverStatus;
    isOnline: boolean;

    // Data
    currentLocation: { lat: number; lng: number } | null;
    incomingRequest: RideRequest | null;
    activeRide: ActiveRide | null;
    queuedRide: ActiveRide | null; // Back-to-back ride
    todayEarnings: number;

    // Actions
    goOnline: () => void;
    goOffline: () => void;
    setIncomingRequest: (request: RideRequest | null) => void;
    acceptRequest: () => void;
    ignoreRequest: () => void;

    // Trip Actions
    arriveAtPickup: () => void;
    verifyPin: (pin: string) => boolean;
    startTrip: () => void;
    arriveAtDropoff: () => void;
    completeTrip: () => void;
    resetJourney: () => void;
}

// Mock PIN for verification
const MOCK_PIN = '1234';

export const useDriverJourney = create<DriverJourneyState>((set, get) => ({
    status: 'offline',
    isOnline: false,
    currentLocation: { lat: 51.5074, lng: -0.1278 }, // Default to London
    incomingRequest: null,
    activeRide: null,
    queuedRide: null,
    todayEarnings: 0,

    goOnline: () => set({ status: 'online', isOnline: true }),

    goOffline: () => set({
        status: 'offline',
        isOnline: false,
        incomingRequest: null,
        activeRide: null,
        queuedRide: null
    }),

    setIncomingRequest: (request) => {
        const { status } = get();
        // Allow requests if online OR if dropping off (back-to-back)
        if (status === 'online' || status === 'dropping_off') {
            set({
                incomingRequest: request,
                // Only change status to 'requesting' if we are idle. 
                // If dropping off, we keep 'dropping_off' but show the feed overlay.
                status: status === 'online' ? 'requesting' : status
            });
        }
    },

    acceptRequest: () => {
        const { incomingRequest, activeRide } = get();
        if (!incomingRequest) return;

        const newRide: ActiveRide = {
            ...incomingRequest,
            status: 'accepted',
            pinVerified: false,
            photoVerified: false
        };

        if (activeRide) {
            // If we already have a ride, queue this one
            set({
                queuedRide: newRide,
                incomingRequest: null,
                // Status stays as is (e.g. dropping_off)
            });
        } else {
            // Normal flow
            set({
                activeRide: newRide,
                incomingRequest: null,
                status: 'pickup'
            });
        }
    },

    ignoreRequest: () => {
        const { status } = get();
        set({
            incomingRequest: null,
            // If we were in 'requesting' state, go back to 'online'. 
            // If we were 'dropping_off', stay there.
            status: status === 'requesting' ? 'online' : status
        });
    },

    arriveAtPickup: () => set({ status: 'arrived' }),

    verifyPin: (pin) => {
        if (pin === MOCK_PIN) {
            set((state) => ({
                activeRide: state.activeRide ? { ...state.activeRide, pinVerified: true } : null
            }));
            return true;
        }
        return false;
    },

    startTrip: () => set((state) => ({
        status: 'in_progress',
        activeRide: state.activeRide ? { ...state.activeRide, status: 'started', startTime: Date.now() } : null
    })),

    arriveAtDropoff: () => set({ status: 'dropping_off' }),

    completeTrip: () => set((state) => {
        const earnings = state.activeRide?.price || 0;
        const { queuedRide } = state;

        if (queuedRide) {
            // Seamless transition to next ride
            return {
                status: 'pickup',
                activeRide: queuedRide,
                queuedRide: null,
                todayEarnings: state.todayEarnings + earnings
            };
        }

        // Normal completion
        return {
            status: 'online',
            activeRide: null,
            todayEarnings: state.todayEarnings + earnings
        };
    }),

    resetJourney: () => set({
        status: 'online',
        incomingRequest: null,
        activeRide: null,
        queuedRide: null
    })
}));
