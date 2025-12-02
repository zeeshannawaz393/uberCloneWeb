/**
 * Message Types & Protocol
 * TypeScript definitions for chat messages and events
 */

import { UserRole } from '@/store/authStore';

// Message Types
export enum MessageType {
    USER_MESSAGE = 'USER_MESSAGE',
    BOT_MESSAGE = 'BOT_MESSAGE',
    AGENT_MESSAGE = 'AGENT_MESSAGE',
    SYSTEM_MESSAGE = 'SYSTEM_MESSAGE',
    ERROR_MESSAGE = 'ERROR_MESSAGE',
}

// Ownership States
export enum OwnershipState {
    AI = 'AI',
    AGENT = 'AGENT',
    SYSTEM = 'SYSTEM',
}

// WebSocket Event Types
export enum ChatEventType {
    // Outgoing events
    SEND_MESSAGE = 'chat:send_message',
    START_CONVERSATION = 'chat:start_conversation',
    RESUME_CONVERSATION = 'chat:resume_conversation',
    CLOSE_CONVERSATION = 'chat:close_conversation',
    TYPING_START = 'chat:typing_start',
    TYPING_STOP = 'chat:typing_stop',

    // Incoming events
    MESSAGE_RECEIVED = 'chat:message_received',
    OWNERSHIP_CHANGED = 'chat:ownership_changed',
    TYPING_INDICATOR = 'chat:typing_indicator',
    CONVERSATION_STARTED = 'chat:conversation_started',
    CONVERSATION_RESUMED = 'chat:conversation_resumed',
    CONVERSATION_CLOSED = 'chat:conversation_closed',
    ERROR = 'chat:error',

    // Connection events
    CONNECTED = 'connect',
    DISCONNECTED = 'disconnect',
    CONNECT_ERROR = 'connect_error',
    RECONNECT = 'reconnect',
    RECONNECT_ATTEMPT = 'reconnect_attempt',
    RECONNECT_ERROR = 'reconnect_error',
    RECONNECT_FAILED = 'reconnect_failed',
}

// Quick Reply Button
export interface QuickReplyButton {
    id: string;
    label: string;
    value: string;
    type?: 'primary' | 'secondary' | 'danger';
    icon?: string;
}

// Base Message Interface
export interface ChatMessage {
    id: string;
    conversationId: string;
    type: MessageType;
    content: string;
    timestamp: number;
    sender: {
        id: string;
        name: string;
        role: UserRole | 'bot' | 'agent' | 'system';
    };
    quickReplies?: QuickReplyButton[];
    metadata?: Record<string, any>;
}

// Typing Indicator
export interface TypingIndicator {
    conversationId: string;
    isTyping: boolean;
    typingUser: {
        id: string;
        name: string;
        role: 'bot' | 'agent';
    };
}

// Ownership Change Event
export interface OwnershipChangeEvent {
    conversationId: string;
    previousOwner: OwnershipState;
    newOwner: OwnershipState;
    reason?: string;
    agentInfo?: {
        id: string;
        name: string;
    };
}

// Conversation
export interface Conversation {
    id: string;
    userId: string;
    userRole: UserRole;
    ownership: OwnershipState;
    status: 'active' | 'closed' | 'archived';
    createdAt: number;
    updatedAt: number;
    metadata?: Record<string, any>;
}

// WebSocket Message Payloads
export interface SendMessagePayload {
    conversationId: string;
    content: string;
    metadata?: Record<string, any>;
}

export interface StartConversationPayload {
    userId: string;
    userRole: UserRole;
    context?: {
        currentPage?: string;
        rideId?: string;
        [key: string]: any;
    };
}

export interface ResumeConversationPayload {
    conversationId: string;
    userId: string;
}

// Error Types
export enum ChatErrorCode {
    CONNECTION_FAILED = 'CONNECTION_FAILED',
    AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
    MESSAGE_SEND_FAILED = 'MESSAGE_SEND_FAILED',
    INVALID_MESSAGE = 'INVALID_MESSAGE',
    RATE_LIMITED = 'RATE_LIMITED',
    CONVERSATION_NOT_FOUND = 'CONVERSATION_NOT_FOUND',
    UNAUTHORIZED = 'UNAUTHORIZED',
    SERVER_ERROR = 'SERVER_ERROR',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

export interface ChatError {
    code: ChatErrorCode;
    message: string;
    details?: any;
    timestamp: number;
}

// Connection Status
export enum ConnectionStatus {
    DISCONNECTED = 'DISCONNECTED',
    CONNECTING = 'CONNECTING',
    CONNECTED = 'CONNECTED',
    RECONNECTING = 'RECONNECTING',
    ERROR = 'ERROR',
}
