/**
 * Signup Feature Types
 */

export type SignupStep =
    | 'email-phone'
    | 'verify-code'
    | 'name'
    | 'terms'
    | 'security-method'
    | 'phone-number'
    | 'complete';

export type SecurityMethod = 'phone' | 'passkey';

export interface SignupState {
    // Current step
    currentStep: SignupStep;

    // Form data
    emailOrPhone: string;
    otpCode: string[];
    firstName: string;
    lastName: string;
    termsAccepted: boolean;
    securityMethod: SecurityMethod | null;
    phoneNumber: string;
    countryCode: string;

    // UI state
    isLoading: boolean;
    otpError: string | null;
    otpResent: boolean;
    formErrors: Record<string, string>;

    // Actions
    setEmailOrPhone: (value: string) => void;
    setOtpCode: (code: string[]) => void;
    setOtpError: (error: string | null) => void;
    setOtpResent: (resent: boolean) => void;
    setName: (firstName: string, lastName: string) => void;
    setTermsAccepted: (accepted: boolean) => void;
    setSecurityMethod: (method: SecurityMethod) => void;
    setPhoneNumber: (phone: string, countryCode: string) => void;
    setCurrentStep: (step: SignupStep) => void;
    setLoading: (loading: boolean) => void;
    setFormError: (field: string, error: string) => void;
    clearFormErrors: () => void;
    reset: () => void;
}
