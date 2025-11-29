import { create } from 'zustand';
import { Location } from './rideStore';

export type DeliveryStatus =
    | 'pending'
    | 'accepted'
    | 'courier_arriving'
    | 'picked_up'
    | 'in_transit'
    | 'delivered'
    | 'cancelled';

export interface Courier {
    id: string;
    name: string;
    phone: string;
    rating: number;
    currentLocation?: Location;
}

export interface PackageDetails {
    description: string;
    weight?: number;
    dimensions?: {
        length: number;
        width: number;
        height: number;
    };
    fragile: boolean;
}

export interface Delivery {
    id: string;
    customerId: string;
    courierId?: string;
    courier?: Courier;
    pickup: Location;
    dropoff: Location;
    recipient: {
        name: string;
        phone: string;
    };
    package: PackageDetails;
    status: DeliveryStatus;
    estimatedPrice: number;
    actualPrice?: number;
    eta?: string;
    createdAt: string;
    updatedAt: string;
}

interface DeliveryState {
    currentDelivery: Delivery | null;
    courierLocation: Location | null;
    setCurrentDelivery: (delivery: Delivery | null) => void;
    updateDeliveryStatus: (status: DeliveryStatus) => void;
    updateCourierLocation: (location: Location) => void;
    updateETA: (eta: string) => void;
    clearDelivery: () => void;
}

export const useDeliveryStore = create<DeliveryState>((set) => ({
    currentDelivery: null,
    courierLocation: null,
    setCurrentDelivery: (delivery) => set({ currentDelivery: delivery }),
    updateDeliveryStatus: (status) =>
        set((state) => ({
            currentDelivery: state.currentDelivery
                ? { ...state.currentDelivery, status }
                : null,
        })),
    updateCourierLocation: (location) => set({ courierLocation: location }),
    updateETA: (eta) =>
        set((state) => ({
            currentDelivery: state.currentDelivery
                ? { ...state.currentDelivery, eta }
                : null,
        })),
    clearDelivery: () => set({ currentDelivery: null, courierLocation: null }),
}));
