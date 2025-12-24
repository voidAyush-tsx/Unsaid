import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {prisma} from '@/lib/prisma';

/**
 * This route is kept for backwards compatibility and potential HTTP fallback.
 * Primary real-time messaging now uses WebSocket via Socket.io.
 */
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const room = searchParams.get('room');

  if (!room) {
    return NextResponse.json({ error: 'Room is required' }, { status: 400 });
  }

  // Security check: Ensure user is part of the private room
  if (room.startsWith('private-chat-')) {
    const parts = room.split('-');
    const counsellorId = parts[2];
    const patientId = parts[3];

    if (session.user.id !== counsellorId && session.user.id !== patientId && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  try {
    const messages = await prisma.chatMessage.findMany({
      where: { room },
      orderBy: { timestamp: 'asc' },
      take: 50, // Limit to last 50 messages
    });

    // Convert Date to number timestamp for frontend consistency
    const formattedMessages = messages.map(m => ({
      text: m.message,
      ts: m.timestamp.getTime(),
      sender: m.sender,
      senderId: m.senderId
    }));

    return NextResponse.json({ messages: formattedMessages });
  } catch (error) {
    console.error('Failed to fetch chat history:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, sender, channel } = body || {};

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    // Log the message (in production, you might want to store this in a database)
    console.log('[chat API] Message received via HTTP:', {
      channel: channel || 'public-chat',
      sender,
      message,
      timestamp: Date.now(),
    });

    // Note: Real-time delivery is now handled by WebSocket server (server.ts)
    // This endpoint is for HTTP fallback only
    return NextResponse.json({ 
      success: true, 
      note: 'Message logged. Real-time delivery requires WebSocket connection.' 
    });
  } catch (err: unknown) {
    console.error('chat POST error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
