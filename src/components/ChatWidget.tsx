"use client";

import React, { useEffect, useRef, useState } from 'react';
import Pusher, { Channel, ChannelAuthorizerGenerator, ChannelAuthorizationCallback } from 'pusher-js';
import { useSession } from 'next-auth/react';

const EVENT = 'message';

const ChatWidget: React.FC = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; ts: number; sender?: string }[]>([]);
  const [input, setInput] = useState('');
  const [channelName, setChannelName] = useState('public-chat');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const pusherRef = useRef<Pusher | null>(null);
  const channelRef = useRef<Channel | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  const subscribeToChannel = async (name: string, idToken?: string) => {
    // cleanup existing
    if (pusherRef.current) {
      try {
        pusherRef.current.disconnect();
      } catch {}
      pusherRef.current = null;
      channelRef.current = null;
    }

    console.debug('[ChatWidget] creating pusher with key', process.env.NEXT_PUBLIC_PUSHER_KEY);
    pusherRef.current = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || '',
      authEndpoint: '/api/pusher/auth',
  // Always provide an `auth` object (even if empty). Some pusher-js internals
  // check properties on the auth/options object using the `in` operator,
  // which throws if auth is `undefined`. Providing an object avoids that.
  auth: { ...(idToken ? { headers: { Authorization: `Bearer ${idToken}` } } : {}) },
      // Provide a custom authorizer so we can include credentials (cookies)
      // when the browser calls the auth endpoint. This allows NextAuth session
      // cookies to be sent and private channel auth to succeed.
      authorizer: (channel): ReturnType<ChannelAuthorizerGenerator> => {
        return {
          authorize: (socketId: string, callback: ChannelAuthorizationCallback) => {
            (async () => {
              try {
                console.debug('[ChatWidget] authorizer: requesting auth for channel', channel.name, 'socket', socketId);
                const res = await fetch('/api/pusher/auth', {
                  method: 'POST',
                  credentials: 'include',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ socket_id: socketId, channel_name: channel.name }),
                });
                const data = await res.json();
                console.debug('[ChatWidget] authorizer response', res.status, data);
                if (res.ok) callback(null, data);
                else callback(new Error('Auth error'), null);
              } catch (err) {
                console.error('[ChatWidget] authorizer error', err);
                callback(err as Error, null);
              }
            })();
          },
        };
      },
    });

    pusherRef.current.connection.bind('connected', () => console.debug('[ChatWidget] pusher connected'));
  pusherRef.current.connection.bind('error', (err: unknown) => console.error('[ChatWidget] pusher connection error', err));

    const channel = pusherRef.current.subscribe(name);
    channel.bind('pusher:subscription_succeeded', () => {
      console.debug('[ChatWidget] subscription succeeded', name);
      setIsSubscribed(true);
    });
    channel.bind('pusher:subscription_error', (err: unknown) => {
      console.error('[ChatWidget] subscription error', name, err);
      setIsSubscribed(false);
    });

    channel.bind(EVENT, (data: { message?: string; timestamp?: number; sender?: string }) => {
      if (data && typeof data.message === 'string') {
        const text = data.message;
        const ts = data.timestamp || Date.now();
        console.debug('[ChatWidget] incoming message', { text, ts, sender: data.sender });
        setMessages((m) => [...m, { text, ts, sender: data.sender }]);
      }
    });

    channelRef.current = channel;
    setChannelName(name);
  };

  // Auto-subscribe to public-chat when widget opens
  useEffect(() => {
    if (open && !isSubscribed) {
      console.debug('[ChatWidget] auto-subscribing to public-chat');
      subscribeToChannel('public-chat');
    }
  }, [open, isSubscribed]);

  // Listen for a global event to open the chat (used by pages like GetInTouchClient)
  useEffect(() => {
    const handler = async (ev: Event) => {
      setOpen(true);
      const anyEv = ev as CustomEvent<Record<string, string | undefined>>;
      const counsellorId = anyEv?.detail?.counsellorId;

      let name = 'public-chat';
      try {
        if (counsellorId) {
          const patientUid = user?.id;
          if (patientUid) {
            name = `private-chat-${counsellorId}-${patientUid}`;
          }
          await subscribeToChannel(name);
          return;
        }
      } catch (err) {
        console.error('subscribe error', err);
      }

      await subscribeToChannel('public-chat');
    };

    window.addEventListener('open-chat', handler as EventListener);
    return () => window.removeEventListener('open-chat', handler as EventListener);
  }, [user]);

  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const sender = user?.email ?? user?.id ?? 'Guest';
    const payload = { channel: channelName, event: EVENT, message: input, sender };
    console.debug('[ChatWidget] sending message', payload);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.debug('[ChatWidget] send response', response.status, result);
      setInput('');
    } catch (err) {
      console.error('sendMessage error', err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end">
        {open && (
          <div className="w-80 h-96 bg-[var(--background)] border border-gray-200 rounded-lg shadow-lg flex flex-col overflow-hidden">
            <div className="px-3 py-2 border-b flex items-center justify-between">
              <div className="font-unsaid font-semibold">Live Chat</div>
              <button onClick={() => setOpen(false)} className="text-sm">Close</button>
            </div>
            <div ref={messagesRef} className="flex-1 p-2 overflow-auto">
              {messages.map((m, i) => (
                <div key={i} className="mb-2">
                  <div className="text-sm text-gray-700">{m.sender ? `${m.sender}: ` : ''}{m.text}</div>
                </div>
              ))}
            </div>
            <div className="px-2 py-2 border-t flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-md border bg-transparent text-[var(--foreground)]"
                placeholder="Type a message..."
                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
              />
              <button onClick={sendMessage} className="bg-[#A1CDD9] px-3 py-2 rounded-md text-white">Send</button>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((s) => !s)}
          className="w-14 h-14 rounded-full bg-[#A1CDD9] flex items-center justify-center shadow-lg text-white font-bold"
          aria-label="Open chat"
        >
          {open ? '×' : '💬'}
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
