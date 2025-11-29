/**
 * Trip Feature - State
 */

import { create } from 'zustand';
import { TripState, TripStep } from './trip.types';
import { Location } from '@/types/trip';

interface TripFeatureState extends TripState {
    setStep: (step: TripStep) => void;
    setPickup: (location: Location) => void;
    setDropoff: (location: Location) => void;
    selectRide: (rideId: string) => void;
    selectRider: (riderId: string) => void;
    selectPaymentMethod: (methodId: string) => void;
    reset: () => void;
}

const initialState: TripState = {
    step: 'search',
    pickup: null,
    dropoff: null,
    selectedRideId: null,
    selectedRiderId: null,
    paymentMethodId: null,
};

export const useTripFeature = create<TripFeatureState>((set) => ({
    ...initialState,

    setStep: (step) => set({ step }),
    setPickup: (pickup) => set({ pickup }),
    setDropoff: (dropoff) => set({ dropoff }),
    selectRide: (selectedRideId) => set({ selectedRideId, step: 'select_rider' }),
    selectRider: (selectedRiderId) => set({ selectedRiderId, step: 'payment' }),
    selectPaymentMethod: (paymentMethodId) => set({ paymentMethodId, step: 'confirm' }),
    reset: () => set(initialState),
}));
