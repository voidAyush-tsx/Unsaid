import Pusher from 'pusher';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

// We'll support two modes:
// - If FIREBASE_ADMIN_PRIVATE_KEY and FIREBASE_ADMIN_CLIENT_EMAIL are present, verify ID token via Firebase Admin SDK
// - Otherwise, use a simple shared secret (PUSHER_AUTH_SECRET) for development

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.PUSHER_CLUSTER || '',
  useTLS: true,
});

// Firebase admin verification removed: using NextAuth sessions server-side

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
  const { socket_id, channel_name, dev_secret } = body || {};

    if (!socket_id || !channel_name) {
      return NextResponse.json({ error: 'Missing socket_id or channel_name' }, { status: 400 });
    }

    // Dev fallback: if PUSHER_AUTH_SECRET is configured and matches dev_secret, allow
    if (process.env.PUSHER_AUTH_SECRET && dev_secret === process.env.PUSHER_AUTH_SECRET) {
      const auth = pusher.authenticate(socket_id, channel_name);
      return NextResponse.json(auth);
    }

    // Use NextAuth session server-side
    const session = await getServerSession(authOptions);
    if (!session || !session.user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

    // For private channels we expect a name like `private-chat-{counsellorId}-{patientId}`
    if (channel_name.startsWith('private-')) {
      // ensure the user is either the patient or counsellor in the channel name
      const parts = channel_name.split('-');
      const last = parts[parts.length - 1];
      const patientId = last; // pattern ends with patientId
      if (session.user.id !== patientId && session.user.id !== parts[2]) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      const auth = pusher.authenticate(socket_id, channel_name, { user_id: session.user.id });
      return NextResponse.json(auth);
    }

    // public channels
    const auth = pusher.authenticate(socket_id, channel_name);
    return NextResponse.json(auth);
  } catch (err) {
    console.error('pusher auth error', err);
    return NextResponse.json({ error: 'Auth error' }, { status: 500 });
  }
}
