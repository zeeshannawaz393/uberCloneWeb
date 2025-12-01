/**
 * Trip Types
 */

export interface Location {
    latitude: number;
    longitude: number;
    address: string;
    placeId?: string;
}

export interface Trip {
    id: string;
    userId: string;
    pickup: Location;
    dropoff: Location;
    status: TripStatus;
    rideId?: string;
    estimatedPrice: number;
    actualPrice?: number;
    estimatedDuration: number;
    distance: number;
    createdAt: string;
    updatedAt: string;
}

export type TripStatus =
    | 'searching'
    | 'ride_selected'
    | 'payment_pending'
    | 'confirmed'
    | 'in_progress'
    | 'completed'
    | 'cancelled';

export interface TripEstimate {
    distance: number;
    duration: number;
    basePrice: number;
    surgeMultiplier: number;
    estimatedPrice: number;
}

// Trip History Types (for trips list page)
export interface TripHistory {
    id: string;
    destination: string;
    pickup?: string;
    date: string;
    time: string;
    price: number;
    currency: string;
    status: 'completed' | 'canceled' | 'unfulfilled';
    vehicleType: 'car' | 'scooter' | 'package';
    driverName?: string;
    mapData?: {
        pickupLat: number;
        pickupLng: number;
        destLat: number;
        destLng: number;
    };
    isFeatured?: boolean;
}

export interface TripFilters {
    type: 'personal' | 'business' | 'all';
    category: 'all' | 'ride' | 'delivery';
    dateRange?: {
        start: Date;
        end: Date;
    };
}
