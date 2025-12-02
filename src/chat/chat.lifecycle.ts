/**
 * Chat Lifecycle Manager
 * Manages conversation lifecycle and WebSocket connection
 */

import { chatSocket } from './ChatSocket';
import { useChatStore } from './chat.store';
import {
    ChatEventType,
    Conversation,
    OwnershipState,
    MessageType,
    ConnectionStatus,
    ChatMessage,
    OwnershipChangeEvent,
    TypingIndicator,
    ChatErrorCode,
} from './message.types';
import { mapRawMessage } from './message.mapper';
import { handleWebSocketError, createChatError } from './chat.errors';
import { UserRole } from '@/store/authStore';

class ChatLifecycleManager {
    private static instance: ChatLifecycleManager;
    private isInitialized = false;

    private constructor() { }

    static getInstance(): ChatLifecycleManager {
        if (!ChatLifecycleManager.instance) {
            ChatLifecycleManager.instance = new ChatLifecycleManager();
        }
        return ChatLifecycleManager.instance;
    }

    /**
     * Initialize chat system
     */
    initialize(token?: string): void {
        if (this.isInitialized) {
            console.log('[ChatLifecycle] Already initialized');
            return;
        }

        // Try to connect to WebSocket
        try {
            chatSocket.connect(token);
        } catch (error) {
            console.warn('[ChatLifecycle] WebSocket connection failed, will use mock mode');
            // Set connection status to CONNECTED for mock mode
            useChatStore.getState().setConnectionStatus(ConnectionStatus.CONNECTED);
        }

        // Setup event listeners
        this.setupEventListeners();

        // Monitor connection status
        chatSocket.on('connectionStatusChanged', (status: ConnectionStatus) => {
            useChatStore.getState().setConnectionStatus(status);
        });

        this.isInitialized = true;
        console.log('[ChatLifecycle] Initialized');
    }

    /**
     * Setup WebSocket event listeners
     */
    private setupEventListeners(): void {
        // Message received
        chatSocket.on(ChatEventType.MESSAGE_RECEIVED, (data: any) => {
            console.log('[ChatLifecycle] Message received:', data);
            const message = mapRawMessage(data);
            useChatStore.getState().addMessage(message);
        });

        // Conversation started
        chatSocket.on(ChatEventType.CONVERSATION_STARTED, (data: any) => {
            console.log('[ChatLifecycle] Conversation started:', data);
            const conversation: Conversation = {
                id: data.conversationId,
                userId: data.userId,
                userRole: data.userRole,
                ownership: data.ownership || OwnershipState.AI,
                status: 'active',
                createdAt: Date.now(),
                updatedAt: Date.now(),
                metadata: data.metadata,
            };
            useChatStore.getState().setConversation(conversation);

            // Save to localStorage for resume
            this.saveConversationToStorage(conversation);
        });

        // Conversation resumed
        chatSocket.on(ChatEventType.CONVERSATION_RESUMED, (data: any) => {
            console.log('[ChatLifecycle] Conversation resumed:', data);
            const conversation: Conversation = {
                id: data.conversationId,
                userId: data.userId,
                userRole: data.userRole,
                ownership: data.ownership || OwnershipState.AI,
                status: 'active',
                createdAt: data.createdAt || Date.now(),
                updatedAt: Date.now(),
                metadata: data.metadata,
            };
            useChatStore.getState().setConversation(conversation);

            // Load messages if provided
            if (data.messages && Array.isArray(data.messages)) {
                const messages = data.messages.map(mapRawMessage);
                useChatStore.getState().setMessages(messages);
            }
        });

        // Ownership changed
        chatSocket.on(ChatEventType.OWNERSHIP_CHANGED, (data: OwnershipChangeEvent) => {
            console.log('[ChatLifecycle] Ownership changed:', data);
            useChatStore.getState().updateOwnership(data.newOwner, data.agentInfo);
        });

        // Typing indicator
        chatSocket.on(ChatEventType.TYPING_INDICATOR, (data: TypingIndicator) => {
            console.log('[ChatLifecycle] Typing indicator:', data);
            useChatStore.getState().setTyping({
                isTyping: data.isTyping,
                typingUser: data.isTyping ? data.typingUser : null,
            });
        });

        // Conversation closed
        chatSocket.on(ChatEventType.CONVERSATION_CLOSED, (data: any) => {
            console.log('[ChatLifecycle] Conversation closed:', data);
            this.handleConversationClosed();
        });

        // Error
        chatSocket.on(ChatEventType.ERROR, (error: any) => {
            console.error('[ChatLifecycle] Error:', error);
            const chatError = handleWebSocketError(error);

            // Add error message to chat
            const errorMessage: ChatMessage = {
                id: `error-${Date.now()}`,
                conversationId: useChatStore.getState().conversation?.id || '',
                type: MessageType.ERROR_MESSAGE,
                content: error.message || 'An error occurred',
                timestamp: Date.now(),
                sender: {
                    id: 'system',
                    name: 'System',
                    role: 'system',
                },
                metadata: { error: chatError },
            };
            useChatStore.getState().addMessage(errorMessage);
        });
    }

    /**
     * Start a new conversation
     */
    async startConversation(
        userId: string,
        userRole: UserRole,
        context?: Record<string, any>
    ): Promise<void> {
        console.log('[ChatLifecycle] Starting conversation...');

        // Use mock service if WebSocket is not connected
        if (!chatSocket.isConnected()) {
            console.log('[ChatLifecycle] WebSocket not connected, using mock service');
            const { mockChatService } = await import('./chat.mock');
            mockChatService.startConversation(userId, userRole);
            return;
        }

        chatSocket.startConversation({
            userId,
            userRole,
            context,
        });
    }

    /**
     * Resume existing conversation
     */
    async resumeConversation(conversationId: string, userId: string): Promise<void> {
        console.log('[ChatLifecycle] Resuming conversation:', conversationId);

        if (!chatSocket.isConnected()) {
            throw createChatError(
                ChatErrorCode.CONNECTION_FAILED,
                'Not connected to chat server'
            );
        }

        chatSocket.resumeConversation({
            conversationId,
            userId,
        });
    }

    /**
     * Try to resume from localStorage
     */
    tryResumeFromStorage(userId: string): boolean {
        const stored = this.getStoredConversation();
        if (stored && stored.userId === userId) {
            this.resumeConversation(stored.id, userId);
            return true;
        }
        return false;
    }

    /**
     * Send a message
     */
    sendMessage(content: string, metadata?: Record<string, any>): void {
        const conversation = useChatStore.getState().conversation;

        if (!conversation) {
            throw createChatError(
                ChatErrorCode.CONVERSATION_NOT_FOUND,
                'No active conversation'
            );
        }

        // Use mock service if WebSocket is not connected
        if (!chatSocket.isConnected()) {
            console.log('[ChatLifecycle] WebSocket not connected, using mock service');
            import('./chat.mock').then(({ mockChatService }) => {
                mockChatService.handleUserMessage(content);
            });

            // Add user message to store immediately for optimistic UI
            const userMessage: ChatMessage = {
                id: `temp-${Date.now()}`,
                conversationId: conversation.id,
                type: MessageType.USER_MESSAGE,
                content,
                timestamp: Date.now(),
                sender: {
                    id: conversation.userId,
                    name: 'You',
                    role: conversation.userRole,
                },
                metadata,
            };
            useChatStore.getState().addMessage(userMessage);
            return;
        }

        chatSocket.sendMessage({
            conversationId: conversation.id,
            content,
            metadata,
        });

        // Add user message to store immediately for optimistic UI
        const userMessage: ChatMessage = {
            id: `temp-${Date.now()}`,
            conversationId: conversation.id,
            type: MessageType.USER_MESSAGE,
            content,
            timestamp: Date.now(),
            sender: {
                id: conversation.userId,
                name: 'You',
                role: conversation.userRole,
            },
            metadata,
        };
        useChatStore.getState().addMessage(userMessage);
    }

    /**
     * Close conversation
     */
    closeConversation(): void {
        const conversation = useChatStore.getState().conversation;
        if (conversation) {
            chatSocket.closeConversation(conversation.id);
            this.handleConversationClosed();
        }
    }

    /**
     * Handle conversation closed
     */
    private handleConversationClosed(): void {
        this.clearStoredConversation();
        useChatStore.getState().reset();
    }

    /**
     * Disconnect and cleanup
     */
    disconnect(): void {
        chatSocket.disconnect();
        this.isInitialized = false;
        console.log('[ChatLifecycle] Disconnected');
    }

    /**
     * Save conversation to localStorage
     */
    private saveConversationToStorage(conversation: Conversation): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem('chat_conversation', JSON.stringify(conversation));
        }
    }

    /**
     * Get stored conversation from localStorage
     */
    private getStoredConversation(): Conversation | null {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('chat_conversation');
            if (stored) {
                try {
                    return JSON.parse(stored);
                } catch (e) {
                    console.error('[ChatLifecycle] Failed to parse stored conversation:', e);
                }
            }
        }
        return null;
    }

    /**
     * Clear stored conversation
     */
    private clearStoredConversation(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('chat_conversation');
        }
    }
}

export const chatLifecycle = ChatLifecycleManager.getInstance();
