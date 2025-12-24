'use client';

import { io, Socket } from 'socket.io-client';

export type MessageData = {
  message: string;
  sender: string;
  senderId?: string;
  timestamp: number;
  room: string;
};

export type UserStatusData = {
  userId: string;
  email?: string;
  role?: string;
  isOnline: boolean;
  timestamp: string;
};

export type OnlineUser = {
  userId: string;
  email?: string;
  role?: string;
  connectedAt: Date;
};

class SocketService {
  private socket: Socket | null = null;
  private currentRoom: string | null = null;
  private initialized = false;
  private connecting = false;

  async init(): Promise<void> {
    if (this.initialized) return;
    
    try {
      // Initialize Socket.IO server by hitting the API endpoint
      await fetch('/api/socket');
      this.initialized = true;
    } catch (e) {
      console.error('[SocketService] Init failed:', e);
    }
  }

  connect(): Socket {
    // If already connected, return existing socket
    if (this.socket?.connected) return this.socket;
    
    // If socket exists but disconnected, try to reconnect
    if (this.socket && !this.socket.connected) {
      this.socket.connect();
      return this.socket;
    }

    // Create new socket
    this.socket = io(typeof window !== 'undefined' ? window.location.origin : '', {
      path: '/api/socket',
      transports: ['polling', 'websocket'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 20000,
      forceNew: false,
    });

    return this.socket;
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
    this.currentRoom = null;
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  authenticate(userId: string, email?: string, role?: string): void {
    this.socket?.emit('authenticate', { userId, email, role });
  }

  joinRoom(room: string, userId: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.socket) {
        resolve(false);
        return;
      }

      if (this.currentRoom && this.currentRoom !== room) {
        this.leaveRoom(this.currentRoom);
      }

      this.socket.emit('join-room', { room, userId });

      const onJoined = (data: { room: string; success: boolean }) => {
        if (data.room === room) {
          this.currentRoom = room;
          this.socket?.off('room-joined', onJoined);
          this.socket?.off('error', onError);
          resolve(data.success);
        }
      };

      const onError = () => {
        this.socket?.off('room-joined', onJoined);
        this.socket?.off('error', onError);
        resolve(false);
      };

      this.socket.on('room-joined', onJoined);
      this.socket.on('error', onError);
      setTimeout(() => resolve(false), 5000);
    });
  }

  leaveRoom(room: string): void {
    this.socket?.emit('leave-room', { room });
    if (this.currentRoom === room) this.currentRoom = null;
  }

  getCurrentRoom(): string | null {
    return this.currentRoom;
  }

  sendMessage(room: string, message: string, sender: string, senderId?: string): void {
    this.socket?.emit('message', { room, message, sender, senderId });
  }

  sendTyping(room: string, userId: string, isTyping: boolean): void {
    this.socket?.emit('typing', { room, userId, isTyping });
  }

  // Request online users list (admin only)
  requestOnlineUsers(): void {
    this.socket?.emit('get-online-users');
  }

  // Subscribe to user status changes
  onUserStatusChange(callback: (data: UserStatusData) => void): void {
    this.socket?.on('user-status-change', callback);
  }

  // Subscribe to online users list
  onOnlineUsersList(callback: (data: { users: OnlineUser[] }) => void): void {
    this.socket?.on('online-users-list', callback);
  }

  on(event: string, callback: (...args: unknown[]) => void): void {
    this.socket?.on(event, callback);
  }

  off(event: string, callback?: (...args: unknown[]) => void): void {
    if (callback) {
      this.socket?.off(event, callback);
    } else {
      this.socket?.off(event);
    }
  }

  removeAllListeners(): void {
    this.socket?.removeAllListeners();
  }
}

export const socketService = new SocketService();
export default socketService;
