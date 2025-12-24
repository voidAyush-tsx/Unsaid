import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';
import { Socket as NetSocket } from 'net';
import {prisma} from '@/lib/prisma';

interface SocketServer extends NetServer {
  io?: SocketIOServer;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

// Store connected users with their online status
const connectedUsers = new Map<string, {
  socketId: string;
  userId?: string;
  email?: string;
  role?: string;
  rooms: Set<string>;
  connectedAt: Date;
}>();

// Map userId to socketId for quick lookups
const userSocketMap = new Map<string, string>();

export const config = {
  api: {
    bodyParser: false,
  },
};

// Get all online users
function getOnlineUsers() {
  const onlineUsers: { userId: string; email?: string; role?: string; connectedAt: Date }[] = [];
  connectedUsers.forEach((user) => {
    if (user.userId) {
      onlineUsers.push({
        userId: user.userId,
        email: user.email,
        role: user.role,
        connectedAt: user.connectedAt,
      });
    }
  });
  return onlineUsers;
}

export default function SocketHandler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (res.socket.server.io) {
    console.log('[Socket.IO] Already initialized');
    res.end();
    return;
  }

  console.log('[Socket.IO] Initializing...');
  
  const io = new SocketIOServer(res.socket.server, {
    path: '/api/socket',
    addTrailingSlash: false,
    cors: {
      origin: process.env.NODE_ENV === 'development' 
        ? ['http://localhost:3000', 'http://localhost:3001'] 
        : [process.env.NEXT_PUBLIC_APP_URL || ''],
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  res.socket.server.io = io;

  io.on('connection', (clientSocket) => {
    console.log(`[Socket.IO] Connected: ${clientSocket.id}`);

    connectedUsers.set(clientSocket.id, {
      socketId: clientSocket.id,
      rooms: new Set(),
      connectedAt: new Date(),
    });

    // Authenticate
    clientSocket.on('authenticate', (data: { userId: string; email?: string; role?: string }) => {
      const user = connectedUsers.get(clientSocket.id);
      if (user) {
        user.userId = data.userId;
        user.email = data.email;
        user.role = data.role;
        
        // Map userId to socketId
        userSocketMap.set(data.userId, clientSocket.id);
        
        console.log(`[Socket.IO] Authenticated: ${data.email} (${data.role})`);
        clientSocket.emit('authenticated', { success: true });

        // Join admin room if admin
        if (data.role === 'ADMIN') {
          clientSocket.join('admin-status-room');
        }

        // Broadcast user online status to admins
        io.to('admin-status-room').emit('user-status-change', {
          userId: data.userId,
          email: data.email,
          role: data.role,
          isOnline: true,
          timestamp: new Date().toISOString(),
        });
      }
    });

    // Request online users list (for admins)
    clientSocket.on('get-online-users', () => {
      const user = connectedUsers.get(clientSocket.id);
      if (user?.role === 'ADMIN') {
        const onlineUsers = getOnlineUsers();
        clientSocket.emit('online-users-list', { users: onlineUsers });
      }
    });

    // Join room
    clientSocket.on('join-room', (data: { room: string; userId: string }) => {
      const { room, userId } = data;
      const user = connectedUsers.get(clientSocket.id);

      // Validate private room access
      if (room.startsWith('private-chat-')) {
        const parts = room.split('-');
        const counsellorId = parts[2];
        const patientId = parts[3];

        if (userId !== counsellorId && userId !== patientId) {
          console.warn(`[Socket.IO] Unauthorized: ${userId} -> ${room}`);
          clientSocket.emit('error', { message: 'Unauthorized' });
          return;
        }
      }

      clientSocket.join(room);
      if (user) user.rooms.add(room);
      console.log(`[Socket.IO] ${userId} joined: ${room}`);
      clientSocket.emit('room-joined', { room, success: true });
    });

    // Leave room
    clientSocket.on('leave-room', (data: { room: string }) => {
      clientSocket.leave(data.room);
      const user = connectedUsers.get(clientSocket.id);
      if (user) user.rooms.delete(data.room);
    });

    // Message
    clientSocket.on('message', async (data: { room: string; message: string; sender: string; senderId?: string }) => {
      const { room, message, sender, senderId } = data;
      console.log(`[Socket.IO] Message in ${room}: ${message.substring(0, 50)}`);

      try {
        // Save to database
        if (senderId) {
          await prisma.chatMessage.create({
            data: {
              room,
              message,
              sender,
              senderId,
            },
          });
        }
      } catch (error) {
        console.error('[Socket.IO] Error saving message:', error);
      }

      io.to(room).emit('message', {
        message,
        sender,
        senderId,
        timestamp: Date.now(),
        room,
      });
    });

    // Typing indicator
    clientSocket.on('typing', (data: { room: string; userId: string; isTyping: boolean }) => {
      clientSocket.to(data.room).emit('typing', { userId: data.userId, isTyping: data.isTyping });
    });

    clientSocket.on('disconnect', () => {
      const user = connectedUsers.get(clientSocket.id);
      console.log(`[Socket.IO] Disconnected: ${clientSocket.id} (${user?.email || 'unknown'})`);
      
      // Broadcast user offline status to admins
      if (user?.userId) {
        userSocketMap.delete(user.userId);
        io.to('admin-status-room').emit('user-status-change', {
          userId: user.userId,
          email: user.email,
          role: user.role,
          isOnline: false,
          timestamp: new Date().toISOString(),
        });
      }
      
      connectedUsers.delete(clientSocket.id);
    });
  });

  console.log('[Socket.IO] Server started');
  res.end();
}
