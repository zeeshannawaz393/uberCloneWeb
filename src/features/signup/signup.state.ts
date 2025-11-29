/**
 * Signup State Store
 * Manages entire signup flow state
 */

import { create } from 'zustand';
import { SignupState } from './signup.types';

export const useSignupState = create<SignupState>((set) => ({
    // Initial state
    currentStep: 'email-phone',
    emailOrPhone: '',
    otpCode: ['', '', '', ''],
    firstName: '',
    lastName: '',
    termsAccepted: false,
    securityMethod: null,
    phoneNumber: '',
    countryCode: '+1',
    isLoading: false,
    otpError: null,
    otpResent: false,
    formErrors: {},

    // Actions
    setEmailOrPhone: (value) => set({ emailOrPhone: value }),

    setOtpCode: (code) => set({ otpCode: code, otpError: null }),

    setOtpError: (error) => set({ otpError: error }),

    setOtpResent: (resent) => set({ otpResent: resent }),

    setName: (firstName, lastName) => set({ firstName, lastName }),

    setTermsAccepted: (accepted) => set({ termsAccepted: accepted }),

    setSecurityMethod: (method) => set({ securityMethod: method }),

    setPhoneNumber: (phone, countryCode) => set({ phoneNumber: phone, countryCode }),

    setCurrentStep: (step) => set({ currentStep: step }),

    setLoading: (loading) => set({ isLoading: loading }),

    setFormError: (field, error) => set((state) => ({
        formErrors: { ...state.formErrors, [field]: error }
    })),

    clearFormErrors: () => set({ formErrors: {} }),

    reset: () => set({
        currentStep: 'email-phone',
        emailOrPhone: '',
        otpCode: ['', '', '', ''],
        firstName: '',
        lastName: '',
        termsAccepted: false,
        securityMethod: null,
        phoneNumber: '',
        countryCode: '+1',
        isLoading: false,
        otpError: null,
        otpResent: false,
        formErrors: {},
    }),
}));
