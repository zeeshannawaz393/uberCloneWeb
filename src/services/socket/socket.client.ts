/**
 * Socket Client
 * Real-time communication via Socket.io
 */

import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

class SocketClient {
    private socket: Socket | null = null;
    private static instance: SocketClient;

    private constructor() { }

    static getInstance(): SocketClient {
        if (!SocketClient.instance) {
            SocketClient.instance = new SocketClient();
        }
        return SocketClient.instance;
    }

    connect(token?: string): Socket {
        if (this.socket?.connected) {
            return this.socket;
        }

        this.socket = io(SOCKET_URL, {
            auth: { token: token || (typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null) },
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5,
        });

        this.setupListeners();
        return this.socket;
    }

    private setupListeners(): void {
        if (!this.socket) return;

        this.socket.on('connect', () => {
            console.log('[Socket] Connected:', this.socket?.id);
        });

        this.socket.on('disconnect', (reason) => {
            console.log('[Socket] Disconnected:', reason);
        });

        this.socket.on('connect_error', (error) => {
            console.error('[Socket] Connection error:', error);
        });
    }

    disconnect(): void {
        this.socket?.disconnect();
        this.socket = null;
    }

    getSocket(): Socket | null {
        return this.socket;
    }

    emit(event: string, data: any): void {
        if (this.socket?.connected) {
            this.socket.emit(event, data);
        } else {
            console.warn('[Socket] Not connected. Cannot emit:', event);
        }
    }

    on(event: string, callback: (...args: any[]) => void): void {
        this.socket?.on(event, callback);
    }

    off(event: string, callback?: (...args: any[]) => void): void {
        this.socket?.off(event, callback);
    }
}

export const socketClient = SocketClient.getInstance();
