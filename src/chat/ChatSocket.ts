/**
 * Chat WebSocket Client
 * Dedicated WebSocket client for chat communication
 */

import { io, Socket } from 'socket.io-client';
import { chatConfig } from './chat.config';
import {
    ChatEventType,
    ConnectionStatus,
    SendMessagePayload,
    StartConversationPayload,
    ResumeConversationPayload,
} from './message.types';

type EventCallback = (...args: any[]) => void;

class ChatSocketClient {
    private socket: Socket | null = null;
    private static instance: ChatSocketClient;
    private reconnectAttempts = 0;
    private heartbeatInterval: NodeJS.Timeout | null = null;
    private connectionStatus: ConnectionStatus = ConnectionStatus.DISCONNECTED;
    private eventListeners: Map<string, Set<EventCallback>> = new Map();

    private constructor() { }

    static getInstance(): ChatSocketClient {
        if (!ChatSocketClient.instance) {
            ChatSocketClient.instance = new ChatSocketClient();
        }
        return ChatSocketClient.instance;
    }

    /**
     * Connect to chat WebSocket server
     */
    connect(token?: string): Socket {
        if (this.socket?.connected) {
            return this.socket;
        }

        this.connectionStatus = ConnectionStatus.CONNECTING;

        const authToken = token || (typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null);

        this.socket = io(`${chatConfig.socketUrl}/chat`, {
            auth: { token: authToken },
            reconnection: chatConfig.reconnection.enabled,
            reconnectionDelay: chatConfig.reconnection.delay,
            reconnectionDelayMax: chatConfig.reconnection.delayMax,
            reconnectionAttempts: chatConfig.reconnection.attempts,
            transports: ['websocket', 'polling'],
        });

        this.setupInternalListeners();
        this.startHeartbeat();

        return this.socket;
    }

    /**
     * Setup internal connection listeners
     */
    private setupInternalListeners(): void {
        if (!this.socket) return;

        this.socket.on(ChatEventType.CONNECTED, () => {
            console.log('[ChatSocket] Connected:', this.socket?.id);
            this.connectionStatus = ConnectionStatus.CONNECTED;
            this.reconnectAttempts = 0;
            this.notifyListeners('connectionStatusChanged', ConnectionStatus.CONNECTED);
        });

        this.socket.on(ChatEventType.DISCONNECTED, (reason: string) => {
            console.log('[ChatSocket] Disconnected:', reason);
            this.connectionStatus = ConnectionStatus.DISCONNECTED;
            this.stopHeartbeat();
            this.notifyListeners('connectionStatusChanged', ConnectionStatus.DISCONNECTED);
        });

        this.socket.on(ChatEventType.CONNECT_ERROR, (error: Error) => {
            console.error('[ChatSocket] Connection error:', error);
            this.connectionStatus = ConnectionStatus.ERROR;
            this.notifyListeners('connectionStatusChanged', ConnectionStatus.ERROR);
        });

        this.socket.on(ChatEventType.RECONNECT_ATTEMPT, (attempt: number) => {
            console.log('[ChatSocket] Reconnection attempt:', attempt);
            this.connectionStatus = ConnectionStatus.RECONNECTING;
            this.reconnectAttempts = attempt;
            this.notifyListeners('connectionStatusChanged', ConnectionStatus.RECONNECTING);
        });

        this.socket.on(ChatEventType.RECONNECT, (attempt: number) => {
            console.log('[ChatSocket] Reconnected after', attempt, 'attempts');
            this.connectionStatus = ConnectionStatus.CONNECTED;
            this.reconnectAttempts = 0;
            this.notifyListeners('connectionStatusChanged', ConnectionStatus.CONNECTED);
        });

        this.socket.on(ChatEventType.RECONNECT_FAILED, () => {
            console.error('[ChatSocket] Reconnection failed');
            this.connectionStatus = ConnectionStatus.ERROR;
            this.notifyListeners('connectionStatusChanged', ConnectionStatus.ERROR);
        });
    }

    /**
     * Start heartbeat/ping mechanism
     */
    private startHeartbeat(): void {
        this.stopHeartbeat();

        this.heartbeatInterval = setInterval(() => {
            if (this.socket?.connected) {
                this.socket.emit('ping', { timestamp: Date.now() });
            }
        }, chatConfig.heartbeat.interval);
    }

    /**
     * Stop heartbeat
     */
    private stopHeartbeat(): void {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }

    /**
     * Disconnect from chat server
     */
    disconnect(): void {
        this.stopHeartbeat();
        this.socket?.disconnect();
        this.socket = null;
        this.connectionStatus = ConnectionStatus.DISCONNECTED;
        this.eventListeners.clear();
    }

    /**
     * Get current socket instance
     */
    getSocket(): Socket | null {
        return this.socket;
    }

    /**
     * Get connection status
     */
    getConnectionStatus(): ConnectionStatus {
        return this.connectionStatus;
    }

    /**
     * Check if connected
     */
    isConnected(): boolean {
        return this.socket?.connected ?? false;
    }

    /**
     * Emit event to server
     */
    emit(event: string, data: any): void {
        if (this.socket?.connected) {
            this.socket.emit(event, data);
        } else {
            console.warn('[ChatSocket] Not connected. Cannot emit:', event);
        }
    }

    /**
     * Listen to event
     */
    on(event: string, callback: EventCallback): void {
        this.socket?.on(event, callback);

        // Track listeners for cleanup
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, new Set());
        }
        this.eventListeners.get(event)?.add(callback);
    }

    /**
     * Remove event listener
     */
    off(event: string, callback?: EventCallback): void {
        if (callback) {
            this.socket?.off(event, callback);
            this.eventListeners.get(event)?.delete(callback);
        } else {
            this.socket?.off(event);
            this.eventListeners.delete(event);
        }
    }

    /**
     * Notify internal listeners
     */
    private notifyListeners(event: string, ...args: any[]): void {
        const listeners = this.eventListeners.get(event);
        if (listeners) {
            listeners.forEach(callback => callback(...args));
        }
    }

    // ===== Chat-specific methods =====

    /**
     * Start a new conversation
     */
    startConversation(payload: StartConversationPayload): void {
        this.emit(ChatEventType.START_CONVERSATION, payload);
    }

    /**
     * Resume existing conversation
     */
    resumeConversation(payload: ResumeConversationPayload): void {
        this.emit(ChatEventType.RESUME_CONVERSATION, payload);
    }

    /**
     * Send a message
     */
    sendMessage(payload: SendMessagePayload): void {
        this.emit(ChatEventType.SEND_MESSAGE, payload);
    }

    /**
     * Close conversation
     */
    closeConversation(conversationId: string): void {
        this.emit(ChatEventType.CLOSE_CONVERSATION, { conversationId });
    }

    /**
     * Send typing start indicator
     */
    sendTypingStart(conversationId: string): void {
        this.emit(ChatEventType.TYPING_START, { conversationId });
    }

    /**
     * Send typing stop indicator
     */
    sendTypingStop(conversationId: string): void {
        this.emit(ChatEventType.TYPING_STOP, { conversationId });
    }
}

export const chatSocket = ChatSocketClient.getInstance();
