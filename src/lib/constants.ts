/**
 * Application Constants
 */

export const APP_NAME = 'RideShare Platform';
export const APP_VERSION = '1.0.0';

// Vehicle types
export const VEHICLE_TYPES = {
    ECONOMY: 'economy',
    COMFORT: 'comfort',
    PREMIUM: 'premium',
    XL: 'xl',
} as const;

// Ride statuses
export const RIDE_STATUS = {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    DRIVER_ARRIVING: 'driver_arriving',
    ARRIVED: 'arrived',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
} as const;

// Delivery statuses
export const DELIVERY_STATUS = {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    COURIER_ARRIVING: 'courier_arriving',
    PICKED_UP: 'picked_up',
    IN_TRANSIT: 'in_transit',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
} as const;

// Payment methods
export const PAYMENT_METHODS = {
    CARD: 'card',
    PAYPAL: 'paypal',
    GIFT_CARD: 'gift_card',
    WALLET: 'wallet',
} as const;

// Auth flow steps
export const AUTH_STEPS = {
    START: 'start',
    PHONE: 'phone',
    OTP: 'otp',
    PROFILE: 'profile',
    TERMS: 'terms',
    SECURITY: 'security',
    COMPLETE: 'complete',
} as const;

// Trip flow steps
export const TRIP_STEPS = {
    SEARCH: 'search',
    SELECT_RIDE: 'select_ride',
    SELECT_RIDER: 'select_rider',
    PAYMENT: 'payment',
    CONFIRM: 'confirm',
    BOOKED: 'booked',
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Timeouts
export const API_TIMEOUT = 10000; // 10 seconds
export const SOCKET_RECONNECT_DELAY = 1000; // 1 second
export const TOAST_DURATION = 5000; // 5 seconds
