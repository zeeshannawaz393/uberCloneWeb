/**
 * Payment Types
 */

export interface PaymentMethod {
    id: string;
    type: PaymentMethodType;
    isDefault: boolean;
    details: CardDetails | PayPalDetails | GiftCardDetails | WalletDetails;
    createdAt: string;
}

export type PaymentMethodType = 'card' | 'paypal' | 'gift_card' | 'wallet';

export interface CardDetails {
    last4: string;
    brand: string;
    expiryMonth: number;
    expiryYear: number;
    holderName: string;
}

export interface PayPalDetails {
    email: string;
}

export interface GiftCardDetails {
    code: string;
    balance: number;
}

export interface WalletDetails {
    address: string;
    balance: number;
}

export interface Payment {
    id: string;
    tripId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    methodId: string;
    createdAt: string;
    completedAt?: string;
}

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
