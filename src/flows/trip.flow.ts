/**
 * Trip Flow - State Machine
 */

import { TripStep } from '@/features/trip/trip.types';

export type TripEvent =
    | { type: 'SET_LOCATIONS'; pickup: any; dropoff: any }
    | { type: 'SELECT_RIDE'; rideId: string }
    | { type: 'SELECT_RIDER'; riderId: string }
    | { type: 'SELECT_PAYMENT'; methodId: string }
    | { type: 'CONFIRM' }
    | { type: 'BACK' }
    | { type: 'RESET' };

export interface TripFlowState {
    current: TripStep;
    context: Record<string, any>;
}

export function tripFlowReducer(
    state: TripFlowState,
    event: TripEvent
): TripFlowState {
    switch (event.type) {
        case 'SET_LOCATIONS':
            return {
                current: 'select_ride',
                context: { ...state.context, pickup: event.pickup, dropoff: event.dropoff },
            };

        case 'SELECT_RIDE':
            return {
                current: 'select_rider',
                context: { ...state.context, selectedRideId: event.rideId },
            };

        case 'SELECT_RIDER':
            return {
                current: 'payment',
                context: { ...state.context, selectedRiderId: event.riderId },
            };

        case 'SELECT_PAYMENT':
            return {
                current: 'confirm',
                context: { ...state.context, paymentMethodId: event.methodId },
            };

        case 'CONFIRM':
            return { current: 'booked', context: state.context };

        case 'BACK':
            const stepOrder: TripStep[] = ['search', 'select_ride', 'select_rider', 'payment', 'confirm', 'booked'];
            const currentIndex = stepOrder.indexOf(state.current);
            const previousStep = currentIndex > 0 ? stepOrder[currentIndex - 1] : state.current;
            return { ...state, current: previousStep };

        case 'RESET':
            return { current: 'search', context: {} };

        default:
            return state;
    }
}
