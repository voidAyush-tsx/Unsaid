import Pusher from 'pusher';
import { NextResponse } from 'next/server';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.PUSHER_CLUSTER || '',
  useTLS: true,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { channel = 'public-chat', event = 'message', message, sender } = body || {};

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
    }

    const payload = { message, timestamp: Date.now() } as Record<string, unknown>;
    if (sender && typeof sender === 'string') payload.sender = sender;

    console.log('[chat API] triggering pusher event:', { channel, event, payload });
    await pusher.trigger(channel, event, payload);
    console.log('[chat API] pusher trigger completed successfully');

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('chat POST error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
