/**
 * Delivery Types
 */

export type DeliveryMode = 'send' | 'receive';
export type MeetingOption = 'meet_at_curb' | 'meet_at_door' | 'pickup_at_door' | 'leave_at_door';

export interface DeliveryDetails {
    // Pickup Details
    pickupBusinessName?: string;
    pickupMeetingOption: MeetingOption;
    pickupNote?: string;

    // Recipient Details
    recipientName: string;
    recipientPhone: string;
    recipientCountryCode: string;

    // Dropoff Details
    dropoffBusinessName?: string;
    dropoffAptSuiteFloor?: string;
    dropoffMeetingOption: MeetingOption;
    dropoffNote?: string;

    // Additional
    requirePIN: boolean;
}

export interface CourierService {
    id: string;
    name: string;
    description: string;
    price: number;
    time: string;
    weight: string;
}
