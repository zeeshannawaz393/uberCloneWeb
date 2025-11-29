/**
 * Auth Feature - Types
 */

export interface AuthState {
    step: AuthStep;
    phone: string | null;
    otp: string | null;
    profile: ProfileData | null;
    termsAccepted: boolean;
    securityMethod: SecurityMethod | null;
}

export type AuthStep =
    | 'start'
    | 'phone'
    | 'otp'
    | 'profile'
    | 'terms'
    | 'security'
    | 'complete';

export interface ProfileData {
    username: string;
    email: string;
    role: 'rider' | 'driver' | 'courier';
}

export type SecurityMethod = 'pin' | 'biometric' | 'none';

export interface AuthFlowContext {
    phone?: string;
    otp?: string;
    profile?: ProfileData;
    termsAccepted?: boolean;
    securityMethod?: SecurityMethod;
}
