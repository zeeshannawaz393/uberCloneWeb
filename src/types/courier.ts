/**
 * Courier Types
 */

import { Location } from './trip';

export interface Delivery {
    id: string;
    customerId: string;
    courierId?: string;
    courier?: Courier;
    pickup: Location;
    dropoff: Location;
    recipient: Recipient;
    package: Package;
    status: DeliveryStatus;
    estimatedPrice: number;
    actualPrice?: number;
    eta?: string;
    createdAt: string;
    updatedAt: string;
}

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

export interface Recipient {
    name: string;
    phone: string;
    notes?: string;
}

export interface Package {
    description: string;
    weight?: number;
    dimensions?: {
        length: number;
        width: number;
        height: number;
    };
    fragile: boolean;
    value?: number;
}
