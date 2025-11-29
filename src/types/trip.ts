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
