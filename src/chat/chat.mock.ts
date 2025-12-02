/**
 * Mock Chat Service
 * Simulates backend responses for testing without a real backend
 */

import { useChatStore } from './chat.store';
import {
    ChatMessage,
    MessageType,
    OwnershipState,
    Conversation,
    QuickReplyButton,
} from './message.types';
import { UserRole } from '@/store/authStore';

class MockChatService {
    private static instance: MockChatService;
    private conversationId: string = '';
    private messageCount: number = 0;

    private constructor() { }

    static getInstance(): MockChatService {
        if (!MockChatService.instance) {
            MockChatService.instance = new MockChatService();
        }
        return MockChatService.instance;
    }

    /**
     * Start a mock conversation
     */
    startConversation(userId: string, userRole: UserRole): void {
        this.conversationId = `mock-conv-${Date.now()}`;
        this.messageCount = 0;

        const conversation: Conversation = {
            id: this.conversationId,
            userId,
            userRole,
            ownership: OwnershipState.AI,
            status: 'active',
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        useChatStore.getState().setConversation(conversation);

        // Send welcome message after a short delay
        setTimeout(() => {
            this.sendBotMessage(this.getWelcomeMessage(userRole), this.getInitialQuickReplies(userRole));
        }, 500);
    }

    /**
     * Handle user message and generate response
     */
    handleUserMessage(content: string): void {
        this.messageCount++;

        // Show typing indicator
        useChatStore.getState().setTyping({
            isTyping: true,
            typingUser: {
                id: 'bot',
                name: 'AI Assistant',
                role: 'bot',
            },
        });

        // Simulate processing delay
        setTimeout(() => {
            // Stop typing
            useChatStore.getState().setTyping({
                isTyping: false,
                typingUser: null,
            });

            // Generate response based on content
            const response = this.generateResponse(content);
            this.sendBotMessage(response.message, response.quickReplies);
        }, 1000 + Math.random() * 1000);
    }

    /**
     * Send bot message
     */
    private sendBotMessage(content: string, quickReplies?: QuickReplyButton[]): void {
        const message: ChatMessage = {
            id: `bot-${Date.now()}-${Math.random()}`,
            conversationId: this.conversationId,
            type: MessageType.BOT_MESSAGE,
            content,
            timestamp: Date.now(),
            sender: {
                id: 'bot',
                name: 'AI Assistant',
                role: 'bot',
            },
            quickReplies,
        };

        useChatStore.getState().addMessage(message);
    }

    /**
     * Get welcome message based on role
     */
    private getWelcomeMessage(role: UserRole): string {
        const messages: Record<UserRole, string> = {
            rider: "Hi! I'm your AI assistant. I can help you book rides, track your trips, or answer any questions. How can I help you today?",
            driver: "Hello! I'm here to help with your earnings, trips, or any driver-related questions. What would you like to know?",
            courier: "Hi! I can help you with deliveries and courier services. What do you need help with?",
            customer: "Hello! I'm here to help with your orders and deliveries. How can I assist you?",
        };

        return messages[role] || "Hi! How can I help you today?";
    }

    /**
     * Get initial quick replies based on role
     */
    private getInitialQuickReplies(role: UserRole): QuickReplyButton[] {
        if (role === 'rider' || role === 'customer') {
            return [
                { id: 'book_ride', label: 'Book a Ride', value: 'I want to book a ride', type: 'primary' },
                { id: 'track_ride', label: 'Track My Ride', value: 'Where is my ride?', type: 'secondary' },
                { id: 'help', label: 'Help', value: 'I need help', type: 'secondary' },
            ];
        }

        if (role === 'driver') {
            return [
                { id: 'earnings', label: 'View Earnings', value: 'Show my earnings', type: 'primary' },
                { id: 'go_online', label: 'Go Online', value: 'I want to go online', type: 'secondary' },
                { id: 'help', label: 'Help', value: 'I need help', type: 'secondary' },
            ];
        }

        return [
            { id: 'help', label: 'Help', value: 'I need help', type: 'secondary' },
        ];
    }

    /**
     * Generate response based on user input
     */
    private generateResponse(content: string): { message: string; quickReplies?: QuickReplyButton[] } {
        const lowerContent = content.toLowerCase();

        // Book ride
        if (lowerContent.includes('book') || lowerContent.includes('ride')) {
            return {
                message: "Great! I can help you book a ride. Where would you like to go?",
                quickReplies: [
                    { id: 'confirm', label: 'Confirm Pickup', value: 'Confirm my location', type: 'primary' },
                    { id: 'change', label: 'Change Location', value: 'I want to change location', type: 'secondary' },
                ],
            };
        }

        // Track ride
        if (lowerContent.includes('track') || lowerContent.includes('where')) {
            return {
                message: "Your driver is 5 minutes away! You can track them in real-time on the map. Would you like me to send you updates?",
                quickReplies: [
                    { id: 'yes', label: 'Yes, send updates', value: 'Yes', type: 'primary' },
                    { id: 'no', label: 'No thanks', value: 'No', type: 'secondary' },
                ],
            };
        }

        // Cancel
        if (lowerContent.includes('cancel')) {
            return {
                message: "I understand you want to cancel. Are you sure? Cancellation fees may apply.",
                quickReplies: [
                    { id: 'confirm_cancel', label: 'Yes, Cancel', value: 'Yes, cancel my ride', type: 'danger' },
                    { id: 'keep', label: 'Keep Ride', value: 'Keep my ride', type: 'primary' },
                ],
            };
        }

        // Earnings (driver)
        if (lowerContent.includes('earning') || lowerContent.includes('money')) {
            return {
                message: "Your earnings this week are $450.00. You've completed 32 trips. Great job! Would you like to see a detailed breakdown?",
                quickReplies: [
                    { id: 'details', label: 'Show Details', value: 'Show detailed breakdown', type: 'primary' },
                    { id: 'withdraw', label: 'Withdraw', value: 'I want to withdraw', type: 'secondary' },
                ],
            };
        }

        // Go online (driver)
        if (lowerContent.includes('online') || lowerContent.includes('start')) {
            return {
                message: "Ready to go online? Make sure you're in a safe location to accept rides.",
                quickReplies: [
                    { id: 'go_online', label: 'Go Online Now', value: 'Yes, go online', type: 'primary' },
                    { id: 'not_now', label: 'Not Now', value: 'Not now', type: 'secondary' },
                ],
            };
        }

        // Help or general query
        if (lowerContent.includes('help') || lowerContent.includes('support')) {
            // Simulate escalation to agent after 3 messages
            if (this.messageCount >= 3) {
                setTimeout(() => {
                    useChatStore.getState().updateOwnership(OwnershipState.AGENT, {
                        id: 'agent-1',
                        name: 'Sarah',
                    });
                }, 1500);

                return {
                    message: "I'm connecting you with a support agent who can better assist you. Please wait a moment...",
                };
            }

            return {
                message: "I'm here to help! You can ask me about rides, payments, account settings, or any other questions. What would you like to know?",
                quickReplies: [
                    { id: 'account', label: 'Account Help', value: 'Help with my account', type: 'secondary' },
                    { id: 'payment', label: 'Payment Help', value: 'Help with payment', type: 'secondary' },
                    { id: 'agent', label: 'Talk to Agent', value: 'I want to talk to a human', type: 'primary' },
                ],
            };
        }

        // Agent request
        if (lowerContent.includes('agent') || lowerContent.includes('human') || lowerContent.includes('person')) {
            setTimeout(() => {
                useChatStore.getState().updateOwnership(OwnershipState.AGENT, {
                    id: 'agent-1',
                    name: 'Sarah',
                });

                // Send agent message
                setTimeout(() => {
                    const agentMessage: ChatMessage = {
                        id: `agent-${Date.now()}`,
                        conversationId: this.conversationId,
                        type: MessageType.AGENT_MESSAGE,
                        content: "Hi! I'm Sarah from support. I've reviewed your conversation. How can I help you today?",
                        timestamp: Date.now(),
                        sender: {
                            id: 'agent-1',
                            name: 'Sarah',
                            role: 'agent',
                        },
                    };
                    useChatStore.getState().addMessage(agentMessage);
                }, 2000);
            }, 1000);

            return {
                message: "Sure! Let me connect you with a support agent. This will just take a moment...",
            };
        }

        // Default response
        const responses = [
            "That's interesting! Can you tell me more?",
            "I understand. How else can I help you?",
            "Got it! Is there anything specific you'd like to know?",
            "Thanks for letting me know. What would you like to do next?",
        ];

        return {
            message: responses[Math.floor(Math.random() * responses.length)],
            quickReplies: [
                { id: 'more_help', label: 'I need more help', value: 'I need more help', type: 'primary' },
                { id: 'done', label: "I'm all set", value: "I'm done", type: 'secondary' },
            ],
        };
    }
}

export const mockChatService = MockChatService.getInstance();
