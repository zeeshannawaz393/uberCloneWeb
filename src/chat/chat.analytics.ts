/**
 * Chat Analytics
 * Analytics event tracking for chat interactions
 */

import { chatConfig } from './chat.config';
import { MessageType, OwnershipState } from './message.types';
import { UserRole } from '@/store/authStore';

// Analytics event types
export enum ChatAnalyticsEvent {
    CHAT_OPENED = 'chat_opened',
    CHAT_CLOSED = 'chat_closed',
    MESSAGE_SENT = 'message_sent',
    MESSAGE_RECEIVED = 'message_received',
    QUICK_REPLY_CLICKED = 'quick_reply_clicked',
    ESCALATION_TO_AGENT = 'escalation_to_agent',
    CONVERSATION_STARTED = 'conversation_started',
    CONVERSATION_ENDED = 'conversation_ended',
    ERROR_OCCURRED = 'error_occurred',
    CONNECTION_LOST = 'connection_lost',
    CONNECTION_RESTORED = 'connection_restored',
}

interface AnalyticsEventData {
    event: ChatAnalyticsEvent;
    properties?: Record<string, any>;
    timestamp: number;
}

/**
 * Track analytics event
 */
function trackEvent(event: ChatAnalyticsEvent, properties?: Record<string, any>): void {
    if (!chatConfig.analyticsEnabled) {
        return;
    }

    const eventData: AnalyticsEventData = {
        event,
        properties,
        timestamp: Date.now(),
    };

    console.log('[ChatAnalytics]', eventData);

    // Integration points for analytics services
    // Example: Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', event, properties);
    }

    // Example: Mixpanel
    if (typeof window !== 'undefined' && (window as any).mixpanel) {
        (window as any).mixpanel.track(event, properties);
    }

    // Example: Custom analytics endpoint
    // You can send to your own analytics service here
}

/**
 * Track chat opened
 */
export function trackChatOpened(userRole: UserRole | null, source?: string): void {
    trackEvent(ChatAnalyticsEvent.CHAT_OPENED, {
        user_role: userRole,
        source,
    });
}

/**
 * Track chat closed
 */
export function trackChatClosed(
    userRole: UserRole | null,
    duration: number,
    messageCount: number
): void {
    trackEvent(ChatAnalyticsEvent.CHAT_CLOSED, {
        user_role: userRole,
        duration_seconds: Math.round(duration / 1000),
        message_count: messageCount,
    });
}

/**
 * Track message sent
 */
export function trackMessageSent(
    userRole: UserRole | null,
    messageLength: number,
    conversationId: string
): void {
    trackEvent(ChatAnalyticsEvent.MESSAGE_SENT, {
        user_role: userRole,
        message_length: messageLength,
        conversation_id: conversationId,
    });
}

/**
 * Track message received
 */
export function trackMessageReceived(
    messageType: MessageType,
    conversationId: string,
    hasQuickReplies: boolean
): void {
    trackEvent(ChatAnalyticsEvent.MESSAGE_RECEIVED, {
        message_type: messageType,
        conversation_id: conversationId,
        has_quick_replies: hasQuickReplies,
    });
}

/**
 * Track quick reply clicked
 */
export function trackQuickReplyClicked(
    quickReplyId: string,
    quickReplyLabel: string,
    conversationId: string
): void {
    trackEvent(ChatAnalyticsEvent.QUICK_REPLY_CLICKED, {
        quick_reply_id: quickReplyId,
        quick_reply_label: quickReplyLabel,
        conversation_id: conversationId,
    });
}

/**
 * Track escalation to agent
 */
export function trackEscalationToAgent(
    conversationId: string,
    reason?: string,
    messageCount?: number
): void {
    trackEvent(ChatAnalyticsEvent.ESCALATION_TO_AGENT, {
        conversation_id: conversationId,
        reason,
        message_count: messageCount,
    });
}

/**
 * Track conversation started
 */
export function trackConversationStarted(
    userRole: UserRole | null,
    conversationId: string,
    context?: Record<string, any>
): void {
    trackEvent(ChatAnalyticsEvent.CONVERSATION_STARTED, {
        user_role: userRole,
        conversation_id: conversationId,
        context,
    });
}

/**
 * Track conversation ended
 */
export function trackConversationEnded(
    conversationId: string,
    duration: number,
    messageCount: number,
    ownership: OwnershipState
): void {
    trackEvent(ChatAnalyticsEvent.CONVERSATION_ENDED, {
        conversation_id: conversationId,
        duration_seconds: Math.round(duration / 1000),
        message_count: messageCount,
        final_ownership: ownership,
    });
}

/**
 * Track error occurred
 */
export function trackErrorOccurred(
    errorCode: string,
    errorMessage: string,
    conversationId?: string
): void {
    trackEvent(ChatAnalyticsEvent.ERROR_OCCURRED, {
        error_code: errorCode,
        error_message: errorMessage,
        conversation_id: conversationId,
    });
}

/**
 * Track connection lost
 */
export function trackConnectionLost(conversationId?: string): void {
    trackEvent(ChatAnalyticsEvent.CONNECTION_LOST, {
        conversation_id: conversationId,
    });
}

/**
 * Track connection restored
 */
export function trackConnectionRestored(
    conversationId?: string,
    disconnectedDuration?: number
): void {
    trackEvent(ChatAnalyticsEvent.CONNECTION_RESTORED, {
        conversation_id: conversationId,
        disconnected_duration_seconds: disconnectedDuration
            ? Math.round(disconnectedDuration / 1000)
            : undefined,
    });
}
