/**
 * Chat State Store
 * Zustand store for managing chat state
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    ChatMessage,
    Conversation,
    OwnershipState,
    ConnectionStatus,
    MessageType,
} from './message.types';
import { UserRole } from '@/store/authStore';

interface TypingState {
    isTyping: boolean;
    typingUser: {
        id: string;
        name: string;
        role: 'bot' | 'agent';
    } | null;
}

interface ChatState {
    // Conversation state
    conversation: Conversation | null;
    messages: ChatMessage[];

    // UI state
    isOpen: boolean;
    unreadCount: number;
    typing: TypingState;
    connectionStatus: ConnectionStatus;

    // Actions
    setConversation: (conversation: Conversation | null) => void;
    addMessage: (message: ChatMessage) => void;
    setMessages: (messages: ChatMessage[]) => void;
    clearMessages: () => void;

    setIsOpen: (isOpen: boolean) => void;
    incrementUnread: () => void;
    resetUnread: () => void;

    setTyping: (typing: TypingState) => void;
    setConnectionStatus: (status: ConnectionStatus) => void;

    updateOwnership: (ownership: OwnershipState, agentInfo?: { id: string; name: string }) => void;

    // Utility actions
    reset: () => void;
}

const initialState = {
    conversation: null,
    messages: [],
    isOpen: false,
    unreadCount: 0,
    typing: {
        isTyping: false,
        typingUser: null,
    },
    connectionStatus: ConnectionStatus.DISCONNECTED,
};

export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            ...initialState,

            setConversation: (conversation) => set({ conversation }),

            addMessage: (message) => {
                set((state) => ({
                    messages: [...state.messages, message],
                }));

                // Increment unread if chat is closed and message is not from user
                if (!get().isOpen && message.type !== MessageType.USER_MESSAGE) {
                    get().incrementUnread();
                }
            },

            setMessages: (messages) => set({ messages }),

            clearMessages: () => set({ messages: [] }),

            setIsOpen: (isOpen) => {
                set({ isOpen });
                if (isOpen) {
                    get().resetUnread();
                }
            },

            incrementUnread: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),

            resetUnread: () => set({ unreadCount: 0 }),

            setTyping: (typing) => set({ typing }),

            setConnectionStatus: (status) => set({ connectionStatus: status }),

            updateOwnership: (ownership, agentInfo) => {
                set((state) => {
                    if (!state.conversation) return state;

                    return {
                        conversation: {
                            ...state.conversation,
                            ownership,
                            updatedAt: Date.now(),
                        },
                    };
                });

                // Add system message for ownership change
                if (ownership === OwnershipState.AGENT && agentInfo) {
                    const systemMessage: ChatMessage = {
                        id: `system-${Date.now()}`,
                        conversationId: get().conversation?.id || '',
                        type: MessageType.SYSTEM_MESSAGE,
                        content: `You are now chatting with ${agentInfo.name} from support.`,
                        timestamp: Date.now(),
                        sender: {
                            id: 'system',
                            name: 'System',
                            role: 'system',
                        },
                    };
                    get().addMessage(systemMessage);
                } else if (ownership === OwnershipState.AI) {
                    const systemMessage: ChatMessage = {
                        id: `system-${Date.now()}`,
                        conversationId: get().conversation?.id || '',
                        type: MessageType.SYSTEM_MESSAGE,
                        content: 'You are now chatting with our AI assistant.',
                        timestamp: Date.now(),
                        sender: {
                            id: 'system',
                            name: 'System',
                            role: 'system',
                        },
                    };
                    get().addMessage(systemMessage);
                }
            },

            reset: () => set(initialState),
        }),
        {
            name: 'chat-storage',
            partialize: (state) => ({
                conversation: state.conversation,
                messages: state.messages,
            }),
        }
    )
);
