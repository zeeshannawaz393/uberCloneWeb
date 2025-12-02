/**
 * Chat Errors
 * Centralized error handling for chat
 */

import { ChatError, ChatErrorCode } from './message.types';

// Re-export for convenience
export type { ChatError };
export { ChatErrorCode };

/**
 * Create a chat error
 */
export function createChatError(
    code: ChatErrorCode,
    message: string,
    details?: any
): ChatError {
    return {
        code,
        message,
        details,
        timestamp: Date.now(),
    };
}

/**
 * Get user-friendly error message
 */
export function getUserFriendlyErrorMessage(error: ChatError): string {
    switch (error.code) {
        case ChatErrorCode.CONNECTION_FAILED:
            return 'Unable to connect to chat. Please check your internet connection.';

        case ChatErrorCode.AUTHENTICATION_FAILED:
            return 'Authentication failed. Please log in again.';

        case ChatErrorCode.MESSAGE_SEND_FAILED:
            return 'Failed to send message. Please try again.';

        case ChatErrorCode.INVALID_MESSAGE:
            return 'Invalid message format. Please try again.';

        case ChatErrorCode.RATE_LIMITED:
            return 'You are sending messages too quickly. Please wait a moment.';

        case ChatErrorCode.CONVERSATION_NOT_FOUND:
            return 'Conversation not found. Starting a new conversation.';

        case ChatErrorCode.UNAUTHORIZED:
            return 'You are not authorized to perform this action.';

        case ChatErrorCode.SERVER_ERROR:
            return 'Server error occurred. Please try again later.';

        case ChatErrorCode.UNKNOWN_ERROR:
        default:
            return 'An unexpected error occurred. Please try again.';
    }
}

/**
 * Handle WebSocket error
 */
export function handleWebSocketError(error: any): ChatError {
    if (error.code) {
        return createChatError(
            error.code as ChatErrorCode,
            error.message || 'WebSocket error',
            error
        );
    }

    if (error.type === 'TransportError') {
        return createChatError(
            ChatErrorCode.CONNECTION_FAILED,
            'Connection failed',
            error
        );
    }

    return createChatError(
        ChatErrorCode.UNKNOWN_ERROR,
        error.message || 'Unknown error',
        error
    );
}

/**
 * Check if error is recoverable
 */
export function isRecoverableError(error: ChatError): boolean {
    const recoverableCodes = [
        ChatErrorCode.CONNECTION_FAILED,
        ChatErrorCode.MESSAGE_SEND_FAILED,
        ChatErrorCode.RATE_LIMITED,
    ];

    return recoverableCodes.includes(error.code);
}

/**
 * Get retry delay for error
 */
export function getRetryDelay(error: ChatError, attemptNumber: number): number {
    if (error.code === ChatErrorCode.RATE_LIMITED) {
        return 5000; // 5 seconds for rate limit
    }

    // Exponential backoff: 1s, 2s, 4s, 8s, 16s (max)
    return Math.min(1000 * Math.pow(2, attemptNumber), 16000);
}
