import { create } from 'zustand';

export type RideStatus =
    | 'pending'
    | 'accepted'
    | 'driver_arriving'
    | 'arrived'
    | 'in_progress'
    | 'completed'
    | 'cancelled';

export interface Location {
    latitude: number;
    longitude: number;
    address?: string;
}

export interface Driver {
    id: string;
    name: string;
    phone: string;
    vehicle: {
        model: string;
        color: string;
        plateNumber: string;
    };
    rating: number;
    currentLocation?: Location;
}

export interface Ride {
    id: string;
    riderId: string;
    driverId?: string;
    driver?: Driver;
    pickup: Location;
    dropoff: Location;
    status: RideStatus;
    vehicleType: string;
    estimatedPrice: number;
    actualPrice?: number;
    estimatedDuration?: number;
    eta?: string;
    createdAt: string;
    updatedAt: string;
}

interface RideState {
    currentRide: Ride | null;
    driverLocation: Location | null;
    setCurrentRide: (ride: Ride | null) => void;
    updateRideStatus: (status: RideStatus) => void;
    updateDriverLocation: (location: Location) => void;
    updateETA: (eta: string) => void;
    clearRide: () => void;
}

export const useRideStore = create<RideState>((set) => ({
    currentRide: null,
    driverLocation: null,
    setCurrentRide: (ride) => set({ currentRide: ride }),
    updateRideStatus: (status) =>
        set((state) => ({
            currentRide: state.currentRide
                ? { ...state.currentRide, status }
                : null,
        })),
    updateDriverLocation: (location) => set({ driverLocation: location }),
    updateETA: (eta) =>
        set((state) => ({
            currentRide: state.currentRide ? { ...state.currentRide, eta } : null,
        })),
    clearRide: () => set({ currentRide: null, driverLocation: null }),
}));
