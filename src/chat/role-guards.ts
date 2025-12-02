/**
 * Role Guards
 * Role-based UI behavior and feature availability
 */

import { UserRole } from '@/store/authStore';
import { QuickReplyButton } from './message.types';

/**
 * Check if user can access chat
 */
export function canAccessChat(role: UserRole | null): boolean {
    // All users can access chat
    return true;
}

/**
 * Check if user can book rides
 */
export function canBookRide(role: UserRole | null): boolean {
    return role === 'rider' || role === 'customer';
}

/**
 * Check if user can view driver features
 */
export function canViewDriverFeatures(role: UserRole | null): boolean {
    return role === 'driver';
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(role: UserRole | null): boolean {
    return role !== null;
}

/**
 * Get role-specific quick replies
 */
export function getRoleSpecificQuickReplies(role: UserRole | null): QuickReplyButton[] {
    const commonReplies: QuickReplyButton[] = [
        {
            id: 'help',
            label: 'Help',
            value: 'I need help',
            type: 'secondary',
        },
    ];

    if (!role) {
        // Anonymous user
        return [
            {
                id: 'signup',
                label: 'Sign Up',
                value: 'I want to sign up',
                type: 'primary',
            },
            {
                id: 'login',
                label: 'Log In',
                value: 'I want to log in',
                type: 'secondary',
            },
            ...commonReplies,
        ];
    }

    if (role === 'rider' || role === 'customer') {
        return [
            {
                id: 'book_ride',
                label: 'Book a Ride',
                value: 'I want to book a ride',
                type: 'primary',
            },
            {
                id: 'track_ride',
                label: 'Track My Ride',
                value: 'Where is my ride?',
                type: 'secondary',
            },
            {
                id: 'cancel_ride',
                label: 'Cancel Ride',
                value: 'I want to cancel my ride',
                type: 'danger',
            },
            ...commonReplies,
        ];
    }

    if (role === 'driver') {
        return [
            {
                id: 'go_online',
                label: 'Go Online',
                value: 'I want to go online',
                type: 'primary',
            },
            {
                id: 'earnings',
                label: 'View Earnings',
                value: 'Show my earnings',
                type: 'secondary',
            },
            {
                id: 'support',
                label: 'Driver Support',
                value: 'I need driver support',
                type: 'secondary',
            },
            ...commonReplies,
        ];
    }

    if (role === 'courier') {
        return [
            {
                id: 'deliveries',
                label: 'My Deliveries',
                value: 'Show my deliveries',
                type: 'primary',
            },
            ...commonReplies,
        ];
    }

    return commonReplies;
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: UserRole | null): string {
    if (!role) return 'Guest';

    const roleNames: Record<UserRole, string> = {
        rider: 'Rider',
        driver: 'Driver',
        courier: 'Courier',
        customer: 'Customer',
    };

    return roleNames[role] || 'User';
}

/**
 * Get welcome message based on role
 */
export function getWelcomeMessage(role: UserRole | null, userName?: string): string {
    const greeting = userName ? `Hi ${userName}!` : 'Hello!';

    if (!role) {
        return `${greeting} Welcome to our chat. How can I help you today?`;
    }

    const roleMessages: Record<UserRole, string> = {
        rider: `${greeting} I'm here to help you book rides, track your trips, or answer any questions.`,
        driver: `${greeting} I'm here to help with earnings, trips, or any driver-related questions.`,
        courier: `${greeting} I'm here to help with deliveries and courier services.`,
        customer: `${greeting} I'm here to help you with your orders and deliveries.`,
    };

    return roleMessages[role] || `${greeting} How can I assist you today?`;
}

/**
 * Filter quick replies based on role
 */
export function filterQuickRepliesByRole(
    quickReplies: QuickReplyButton[],
    role: UserRole | null
): QuickReplyButton[] {
    return quickReplies.filter(reply => {
        // Filter out ride-related actions for drivers
        if (role === 'driver') {
            const rideActions = ['book_ride', 'track_ride', 'cancel_ride'];
            return !rideActions.includes(reply.id);
        }

        // Filter out driver-specific actions for riders
        if (role === 'rider' || role === 'customer') {
            const driverActions = ['go_online', 'earnings', 'driver_support'];
            return !driverActions.includes(reply.id);
        }

        // Show all for other roles
        return true;
    });
}
