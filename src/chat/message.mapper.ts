/**
 * Message Mapper
 * Maps raw WebSocket messages to typed message objects
 */

import {
    ChatMessage,
    MessageType,
    QuickReplyButton,
} from './message.types';

/**
 * Map raw WebSocket message to ChatMessage
 */
export function mapRawMessage(raw: any): ChatMessage {
    return {
        id: raw.id || `msg-${Date.now()}-${Math.random()}`,
        conversationId: raw.conversationId || '',
        type: raw.type || MessageType.BOT_MESSAGE,
        content: raw.content || '',
        timestamp: raw.timestamp || Date.now(),
        sender: {
            id: raw.sender?.id || 'unknown',
            name: raw.sender?.name || 'Unknown',
            role: raw.sender?.role || 'bot',
        },
        quickReplies: raw.quickReplies ? mapQuickReplies(raw.quickReplies) : undefined,
        metadata: raw.metadata,
    };
}

/**
 * Map quick replies
 */
function mapQuickReplies(raw: any[]): QuickReplyButton[] {
    if (!Array.isArray(raw)) return [];

    return raw.map((button, index) => ({
        id: button.id || `qr-${index}`,
        label: button.label || button.text || '',
        value: button.value || button.label || '',
        type: button.type || 'secondary',
        icon: button.icon,
    }));
}

/**
 * Format timestamp for display
 */
export function formatMessageTime(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    }

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isYesterday) {
        return 'Yesterday';
    }

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Group messages by date
 */
export function groupMessagesByDate(messages: ChatMessage[]): Map<string, ChatMessage[]> {
    const groups = new Map<string, ChatMessage[]>();

    messages.forEach((message) => {
        const date = new Date(message.timestamp);
        const dateKey = date.toDateString();

        if (!groups.has(dateKey)) {
            groups.set(dateKey, []);
        }

        groups.get(dateKey)?.push(message);
    });

    return groups;
}

/**
 * Check if two messages are from the same sender
 */
export function isSameSender(msg1: ChatMessage, msg2: ChatMessage): boolean {
    return msg1.sender.id === msg2.sender.id && msg1.sender.role === msg2.sender.role;
}

/**
 * Check if messages should be grouped together
 */
export function shouldGroupMessages(msg1: ChatMessage, msg2: ChatMessage): boolean {
    if (!isSameSender(msg1, msg2)) return false;

    // Group if within 2 minutes
    const timeDiff = Math.abs(msg2.timestamp - msg1.timestamp);
    return timeDiff < 2 * 60 * 1000;
}
