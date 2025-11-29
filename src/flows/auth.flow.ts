/**
 * Auth Flow - State Machine
 * Explicit state machine for authentication flow
 */

import { AuthStep, AuthFlowContext } from '@/features/auth/auth.types';

export type AuthEvent =
    | { type: 'START' }
    | { type: 'ENTER_PHONE'; phone: string }
    | { type: 'VERIFY_OTP'; otp: string }
    | { type: 'COMPLETE_PROFILE'; profile: any }
    | { type: 'ACCEPT_TERMS' }
    | { type: 'SET_SECURITY'; method: string }
    | { type: 'BACK' }
    | { type: 'RESET' };

export interface AuthFlowState {
    current: AuthStep;
    context: AuthFlowContext;
}

export function authFlowReducer(
    state: AuthFlowState,
    event: AuthEvent
): AuthFlowState {
    switch (event.type) {
        case 'START':
            return { current: 'phone', context: {} };

        case 'ENTER_PHONE':
            return {
                current: 'otp',
                context: { ...state.context, phone: event.phone },
            };

        case 'VERIFY_OTP':
            return {
                current: 'profile',
                context: { ...state.context, otp: event.otp },
            };

        case 'COMPLETE_PROFILE':
            return {
                current: 'terms',
                context: { ...state.context, profile: event.profile },
            };

        case 'ACCEPT_TERMS':
            return {
                current: 'security',
                context: { ...state.context, termsAccepted: true },
            };

        case 'SET_SECURITY':
            return {
                current: 'complete',
                context: { ...state.context, securityMethod: event.method as any },
            };

        case 'BACK':
            const stepOrder: AuthStep[] = ['start', 'phone', 'otp', 'profile', 'terms', 'security', 'complete'];
            const currentIndex = stepOrder.indexOf(state.current);
            const previousStep = currentIndex > 0 ? stepOrder[currentIndex - 1] : state.current;
            return { ...state, current: previousStep };

        case 'RESET':
            return { current: 'start', context: {} };

        default:
            return state;
    }
}
