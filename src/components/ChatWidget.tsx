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
  const [assignedCounsellor, setAssignedCounsellor] = useState<{ id: string; name?: string; email?: string } | null>(null);
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
      auth: { ...(idToken ? { headers: { Authorization: `Bearer ${idToken}` } } : {}) },
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

  // Fetch assigned counsellor on mount (for patients)
  useEffect(() => {
    if (!session || !user || user.role !== 'USER') return;

    const fetchAssignment = async () => {
      try {
        const res = await fetch('/api/assignments');
        if (res.ok) {
          const data = await res.json();
          if (data.assignment?.counsellor) {
            setAssignedCounsellor(data.assignment.counsellor);
            console.debug('[ChatWidget] Assigned counsellor:', data.assignment.counsellor);
          }
        }
      } catch (err) {
        console.error('[ChatWidget] Failed to fetch assignment:', err);
      }
    };

    fetchAssignment();
  }, [session, user]);

  // Activity heartbeat - update lastActive every 2 minutes
  useEffect(() => {
    if (!session || !user) return;

    const updateActivity = async () => {
      try {
        await fetch('/api/activity', { method: 'POST' });
      } catch (err) {
        console.debug('[ChatWidget] Activity update failed:', err);
      }
    };

    // Initial update
    updateActivity();

    // Update every 2 minutes
    const interval = setInterval(updateActivity, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [session, user]);

  useEffect(() => {
    if (session && user && open && !isSubscribed) {
      console.debug('[ChatWidget] auto-subscribing to channel');
      
      // If patient with assigned counsellor, use private channel
      if (user.role === 'USER' && assignedCounsellor) {
        const privateChannel = `private-chat-${assignedCounsellor.id}-${user.id}`;
        console.debug('[ChatWidget] Using private channel with assigned counsellor:', privateChannel);
        subscribeToChannel(privateChannel);
      } else {
        // Otherwise use public chat
        subscribeToChannel('public-chat');
      }
    }
  }, [session, user, open, isSubscribed, assignedCounsellor]);

  // Listen for a global event to open the chat (used by counsellor/patient dashboards)
  useEffect(() => {
    if (!session || !user) return;

    const handler = async (ev: Event) => {
      setOpen(true);
      const anyEv = ev as CustomEvent<Record<string, string | undefined>>;
      const counsellorId = anyEv?.detail?.counsellorId;
      const patientId = anyEv?.detail?.patientId;

      let name = 'public-chat';
      try {
        // If counsellor opening chat with patient
        if (user.role === 'COUNSELLOR' && patientId) {
          name = `private-chat-${user.id}-${patientId}`;
          console.debug('[ChatWidget] Counsellor opening chat with patient:', name);
          await subscribeToChannel(name);
          return;
        }

        // If patient opening chat with counsellor (or assigned counsellor)
        if (counsellorId) {
          const patientUid = user?.id;
          if (patientUid) {
            name = `private-chat-${counsellorId}-${patientUid}`;
            console.debug('[ChatWidget] Patient opening chat with counsellor:', name);
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
  }, [user, session]);

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

  const isOwnMessage = (sender?: string) => {
    if (!sender) return false;
    return sender === user?.email || sender === user?.id;
  };

  // Don't render widget if user is not authenticated
  if (!session || !user) {
    return null;
  }

  return (
    <>
      {/* Global styles for custom scrollbar */}
      <style jsx>{`
        /* Custom Scrollbar for WebKit browsers (Chrome, Edge, Safari) */
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f7f4f2;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a1cdd9;
          border-radius: 10px;
          border: 2px solid #f7f4f2;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7db7c7;
        }

        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #a1cdd9 #f7f4f2;
        }
      `}</style>

      <div
        className={`fixed inset-0 bg-[#000000cd] bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`w-[500px] h-[600px] bg-[#F7F4F2] border-4 border-[#C6C3C2] rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 pb-2">
            <div className="flex flex-col">
              <div className="text-2xl font-extrabold text-[#736B66] cursor-default">Live Chat</div>
              {user.role === 'USER' && assignedCounsellor && (
                <div className="text-sm text-gray-600">
                  With: {assignedCounsellor.name || assignedCounsellor.email}
                </div>
              )}
              {user.role === 'COUNSELLOR' && channelName.startsWith('private-') && (
                <div className="text-sm text-gray-600">Private conversation</div>
              )}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-3xl text-gray-500 hover:text-gray-700 leading-none w-8 h-8 flex items-center justify-center cursor-pointer"
            >
              &times;
            </button>
          </div>

          {/* Messages */}
          <div ref={messagesRef} className="flex-1 overflow-y-auto px-4 py-2 space-y-4 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${isOwnMessage(m.sender) ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[60%] px-6 py-3 rounded-xl ${
                    isOwnMessage(m.sender)
                      ? "bg-[#A1CDD9] text-white text-xl font-unsaid font-bold border border-[#F4A258]"
                      : "bg-white text-[#736B66] text-xl font-unsaid font-bold border border-[#F4A258]"
                  }`}
                >
                  <div className="text-base leading-relaxed">{m.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="bg-[#FBFAF9] border-t border-[#C4B5A0] p-3 flex items-center justify-between">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-[#736B66] font-semibold outline-none ml-3 text-xl placeholder-[#B9B5B3]"
              placeholder="Type your message..."
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button
              onClick={sendMessage}
              className="bg-[#F4A258] hover:bg-[#DC924F] text-xl text-white font-extrabold px-8 py-2 rounded-3xl cursor-pointer shadow-md transform active:shadow-none active:scale-95 transition-all duration-75 ease-out"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setOpen((s) => !s)}
          className="w-16 h-16 rounded-full bg-[#9DCDDC] hover:bg-[#8BBDCC] flex items-center justify-center shadow-xl text-2xl transition-all"
          aria-label="Toggle chat"
        >
          💬
        </button>
      </div>
    </>
  );
};

export default ChatWidget;