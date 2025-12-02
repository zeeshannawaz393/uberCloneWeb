/**
 * Ownership Manager
 * Manages conversation ownership and transitions
 */

import { OwnershipState } from './message.types';
import { useChatStore } from './chat.store';

/**
 * Check if user can send messages based on ownership
 */
export function canUserSendMessage(ownership: OwnershipState): boolean {
    // User can always send messages, even when agent has control
    return true;
}

/**
 * Check if input should be disabled
 */
export function shouldDisableInput(ownership: OwnershipState): boolean {
    // Only disable if system has control (rare case)
    return ownership === OwnershipState.SYSTEM;
}

/**
 * Get input placeholder based on ownership
 */
export function getInputPlaceholder(ownership: OwnershipState): string {
    switch (ownership) {
        case OwnershipState.AI:
            return 'Type your message...';
        case OwnershipState.AGENT:
            return 'Chatting with support agent...';
        case OwnershipState.SYSTEM:
            return 'Chat is temporarily unavailable';
        default:
            return 'Type your message...';
    }
}

/**
 * Get ownership display text
 */
export function getOwnershipDisplayText(ownership: OwnershipState): string {
    switch (ownership) {
        case OwnershipState.AI:
            return 'AI Assistant';
        case OwnershipState.AGENT:
            return 'Support Agent';
        case OwnershipState.SYSTEM:
            return 'System';
        default:
            return 'Chat';
    }
}

/**
 * Get ownership status color
 */
export function getOwnershipStatusColor(ownership: OwnershipState): string {
    switch (ownership) {
        case OwnershipState.AI:
            return 'text-blue-600';
        case OwnershipState.AGENT:
            return 'text-green-600';
        case OwnershipState.SYSTEM:
            return 'text-gray-600';
        default:
            return 'text-gray-600';
    }
}

/**
 * Check if ownership transition is valid
 */
export function isValidOwnershipTransition(
    from: OwnershipState,
    to: OwnershipState
): boolean {
    // All transitions are valid, but some are more common
    // AI -> AGENT (escalation)
    // AGENT -> AI (resolution)
    // Any -> SYSTEM (emergency)
    return true;
}

/**
 * Get ownership transition message
 */
export function getOwnershipTransitionMessage(
    from: OwnershipState,
    to: OwnershipState,
    agentName?: string
): string {
    if (from === OwnershipState.AI && to === OwnershipState.AGENT) {
        return agentName
            ? `You are now chatting with ${agentName} from support.`
            : 'You are now chatting with a support agent.';
    }

    if (from === OwnershipState.AGENT && to === OwnershipState.AI) {
        return 'You are now chatting with our AI assistant.';
    }

    if (to === OwnershipState.SYSTEM) {
        return 'Chat is temporarily managed by the system.';
    }

    return 'Chat ownership has changed.';
}
