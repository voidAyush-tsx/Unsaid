import { NextResponse } from 'next/server';

/**
 * This route is kept for backwards compatibility and potential HTTP fallback.
 * Primary real-time messaging now uses WebSocket via Socket.io.
 * 
 * In production, messages are sent directly via WebSocket from the client.
 * This endpoint can be used for:
 * - Server-to-server messaging
 * - Fallback when WebSocket is unavailable
 * - Logging/auditing purposes
 */
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
