/**
 * User Types
 */

import { Role } from '@/access/roles';

export interface User {
    id: string;
    username: string;
    email: string;
    phone: string;
    countryCode: string;
    role: Role;
    avatar?: string;
    walletAddress?: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserProfile extends User {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
}

export interface UserSecurity {
    twoFactorEnabled: boolean;
    biometricEnabled: boolean;
    pinEnabled: boolean;
    lastPasswordChange?: string;
}

export interface UserPrivacy {
    shareLocation: boolean;
    shareRideHistory: boolean;
    marketingEmails: boolean;
    pushNotifications: boolean;
}
