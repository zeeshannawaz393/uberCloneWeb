/**
 * Auth Feature - State
 */

import { create } from 'zustand';
import { AuthState, AuthStep } from './auth.types';

interface AuthFeatureState extends AuthState {
    setStep: (step: AuthStep) => void;
    setPhone: (phone: string) => void;
    setOTP: (otp: string) => void;
    setProfile: (profile: AuthState['profile']) => void;
    acceptTerms: () => void;
    setSecurityMethod: (method: AuthState['securityMethod']) => void;
    reset: () => void;
}

const initialState: AuthState = {
    step: 'start',
    phone: null,
    otp: null,
    profile: null,
    termsAccepted: false,
    securityMethod: null,
};

export const useAuthFeature = create<AuthFeatureState>((set) => ({
    ...initialState,

    setStep: (step) => set({ step }),
    setPhone: (phone) => set({ phone }),
    setOTP: (otp) => set({ otp }),
    setProfile: (profile) => set({ profile }),
    acceptTerms: () => set({ termsAccepted: true }),
    setSecurityMethod: (securityMethod) => set({ securityMethod }),
    reset: () => set(initialState),
}));
