import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Socket as NetSocket } from 'net';

interface SocketServer extends NetServer {
  io?: SocketIOServer;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

// Store connected users
const connectedUsers = new Map<string, {
  socketId: string;
  userId?: string;
  email?: string;
  role?: string;
  rooms: Set<string>;
}>();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (res.socket.server.io) {
    console.log('[Socket.IO] Already initialized');
    res.end();
    return;
  }

  console.log('[Socket.IO] Initializing...');
  
  const io = new SocketIOServer(res.socket.server, {
    path: '/api/socketio',
    addTrailingSlash: false,
    cors: {
      origin: process.env.NODE_ENV === 'development' 
        ? ['http://localhost:3000'] 
        : [process.env.NEXT_PUBLIC_APP_URL || ''],
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  io.on('connection', (socket) => {
    console.log(`[Socket.IO] Connected: ${socket.id}`);

    connectedUsers.set(socket.id, {
      socketId: socket.id,
      rooms: new Set(),
    });

    // Authenticate
    socket.on('authenticate', (data: { userId: string; email?: string; role?: string }) => {
      const user = connectedUsers.get(socket.id);
      if (user) {
        user.userId = data.userId;
        user.email = data.email;
        user.role = data.role;
        console.log(`[Socket.IO] Authenticated: ${data.email}`);
        socket.emit('authenticated', { success: true });
      }
    });

    // Join room
    socket.on('join-room', (data: { room: string; userId: string }) => {
      const { room, userId } = data;
      const user = connectedUsers.get(socket.id);

      // Validate private room access
      if (room.startsWith('private-chat-')) {
        const parts = room.split('-');
        const counsellorId = parts[2];
        const patientId = parts[3];

        if (userId !== counsellorId && userId !== patientId) {
          console.warn(`[Socket.IO] Unauthorized: ${userId} -> ${room}`);
          socket.emit('error', { message: 'Unauthorized' });
          return;
        }
      }

      socket.join(room);
      if (user) user.rooms.add(room);
      console.log(`[Socket.IO] ${userId} joined: ${room}`);
      socket.emit('room-joined', { room, success: true });
    });

    // Leave room
    socket.on('leave-room', (data: { room: string }) => {
      socket.leave(data.room);
      const user = connectedUsers.get(socket.id);
      if (user) user.rooms.delete(data.room);
    });

    // Message
    socket.on('message', (data: { room: string; message: string; sender: string; senderId?: string }) => {
      const { room, message, sender, senderId } = data;
      console.log(`[Socket.IO] Message in ${room}: ${message.substring(0, 50)}`);

      io.to(room).emit('message', {
        message,
        sender,
        senderId,
        timestamp: Date.now(),
        room,
      });
    });

    // Typing indicator
    socket.on('typing', (data: { room: string; userId: string; isTyping: boolean }) => {
      socket.to(data.room).emit('typing', { userId: data.userId, isTyping: data.isTyping });
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Disconnected: ${socket.id}`);
      connectedUsers.delete(socket.id);
    });
  });

  res.socket.server.io = io;
  console.log('[Socket.IO] Server started');
  res.end();
}
