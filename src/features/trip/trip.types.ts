/**
 * Trip Feature - Types
 */

import { Location } from '@/types/trip';

export interface TripState {
    step: TripStep;
    pickup: Location | null;
    dropoff: Location | null;
    selectedRideId: string | null;
    selectedRiderId: string | null;
    paymentMethodId: string | null;
}

export type TripStep =
    | 'search'
    | 'select_ride'
    | 'select_rider'
    | 'payment'
    | 'confirm'
    | 'booked';
