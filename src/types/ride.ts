/**
 * Ride Types
 */

import { Location } from './trip';

export interface Ride {
    id: string;
    tripId: string;
    driverId?: string;
    driver?: Driver;
    vehicleType: VehicleType;
    status: RideStatus;
    pickup: Location;
    dropoff: Location;
    estimatedPrice: number;
    actualPrice?: number;
    eta?: string;
    route?: RoutePoint[];
    createdAt: string;
    updatedAt: string;
}

export type VehicleType = 'economy' | 'comfort' | 'premium' | 'xl';

export type RideStatus =
    | 'pending'
    | 'accepted'
    | 'driver_arriving'
    | 'arrived'
    | 'in_progress'
    | 'completed'
    | 'cancelled';

export interface Driver {
    id: string;
    name: string;
    phone: string;
    rating: number;
    vehicle: Vehicle;
    currentLocation?: Location;
}

export interface Vehicle {
    model: string;
    color: string;
    plateNumber: string;
    year: number;
}

export interface RideOption {
    vehicleType: VehicleType;
    name: string;
    description: string;
    capacity: number;
    estimatedPrice: number;
    eta: number;
    available: boolean;
}

export interface RoutePoint {
    latitude: number;
    longitude: number;
    timestamp?: string;
}
