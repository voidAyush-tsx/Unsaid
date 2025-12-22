"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import socketService, { MessageData } from '@/lib/socket';

type Patient = {
  id: string;
  email?: string | null;
  name?: string | null;
  lastActive?: string | null;
};

type Assignment = {
  id: string;
  patientId: string;
  patient: Patient;
};

const ChatWidget: React.FC = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; ts: number; sender?: string; senderId?: string }[]>([]);
  const [input, setInput] = useState('');
  const [channelName, setChannelName] = useState('public-chat');
  const [isConnected, setIsConnected] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [assignedCounsellor, setAssignedCounsellor] = useState<{ id: string; name?: string; email?: string } | null>(null);
  const [assignedPatients, setAssignedPatients] = useState<Assignment[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [loadingPatients, setLoadingPatients] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const initRef = useRef(false);

  // Initialize socket
  const initSocket = useCallback(async () => {
    // If already connected via PresenceTracker or previous init, just update state
    if (socketService.isConnected()) {
      setIsConnected(true);
      return;
    }
    
    // Prevent multiple simultaneous init attempts
    if (initRef.current) return;
    initRef.current = true;
    
    console.log('[Chat] Initializing socket...');

    try {
      // Initialize the Socket.IO server first
      await socketService.init();
      
      const socket = socketService.connect();

      const onConnect = () => {
        console.log('[Chat] Connected, socket id:', socket.id);
        setIsConnected(true);
        initRef.current = false;
        if (user) socketService.authenticate(user.id, user.email ?? undefined, user.role);
      };

      const onDisconnect = (reason: string) => {
        console.log('[Chat] Disconnected:', reason);
        setIsConnected(false);
        setIsSubscribed(false);
        initRef.current = false;
      };

      const onConnectError = (err: Error) => {
        console.error('[Chat] Connection error:', err.message);
        initRef.current = false;
      };

      // Remove any existing listeners first to avoid duplicates
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);

      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('connect_error', onConnectError);

      // If already connected (e.g., by PresenceTracker)
      if (socket.connected) {
        setIsConnected(true);
        initRef.current = false;
        if (user) socketService.authenticate(user.id, user.email ?? undefined, user.role);
      }
    } catch (e) {
      console.error('[Chat] Init error:', e);
      initRef.current = false;
    }
  }, [user]);

  // Sync connection state - check if PresenceTracker already connected the socket
  useEffect(() => {
    const syncConnectionState = () => {
      const connected = socketService.isConnected();
      if (connected && !isConnected) {
        console.log('[Chat] Socket already connected, syncing state...');
        setIsConnected(true);
      }
    };

    // Check immediately
    syncConnectionState();

    // Also check periodically in case connection happens after mount
    const interval = setInterval(syncConnectionState, 500);
    
    // Stop checking after 5 seconds
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isConnected]);

  // Subscribe to channel
  const subscribeToChannel = useCallback(async (name: string) => {
    if (!user) return;

    console.log('[Chat] Subscribing to:', name);

    if (!socketService.isConnected()) {
      await initSocket();
      await new Promise<void>((resolve) => {
        const check = () => socketService.isConnected() ? resolve() : setTimeout(check, 100);
        check();
        setTimeout(resolve, 5000);
      });
    }

    const success = await socketService.joinRoom(name, user.id);
    if (success) {
      setIsSubscribed(true);
      setChannelName(name);
    }
  }, [user, initSocket]);

  // Handle messages
  useEffect(() => {
    if (!isConnected) return;

    const handleMessage = (data: MessageData) => {
      if (data.room !== channelName) return;

      setMessages((prev) => {
        const isDupe = prev.some(m => m.text === data.message && m.sender === data.sender && Math.abs(m.ts - data.timestamp) < 1000);
        if (isDupe) return prev;
        return [...prev, { text: data.message, ts: data.timestamp, sender: data.sender, senderId: data.senderId }];
      });
    };

    socketService.on('message', handleMessage as (...args: unknown[]) => void);
    return () => socketService.off('message', handleMessage as (...args: unknown[]) => void);
  }, [isConnected, channelName]);

  // Fetch assigned counsellor (for patients)
  useEffect(() => {
    if (!session || !user || user.role !== 'USER') return;

    fetch('/api/assignments')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.assignment?.counsellor) setAssignedCounsellor(data.assignment.counsellor);
      })
      .catch(() => {});
  }, [session, user]);

  // Fetch assigned patients (for counsellors)
  useEffect(() => {
    if (!session || !user || user.role !== 'COUNSELLOR') return;

    const fetchPatients = async () => {
      setLoadingPatients(true);
      try {
        const res = await fetch('/api/assignments');
        if (res.ok) {
          const data = await res.json();
          setAssignedPatients(data.assignments || []);
        }
      } catch (err) {
        console.error('Failed to fetch patients:', err);
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchPatients();
  }, [session, user]);

  // Activity heartbeat
  useEffect(() => {
    if (!session || !user) return;

    const update = () => fetch('/api/activity', { method: 'POST' }).catch(() => {});
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, [session, user]);

  // Auto-subscribe on open
  useEffect(() => {
    if (!session || !user || !open) return;
    
    // Counsellors need to select a patient first (unless they already have one selected)
    if (user.role === 'COUNSELLOR' && !selectedPatient) {
      // Don't auto-subscribe, show patient selection instead
      return;
    }
    
    // Always try to connect when chat opens
    const connectAndSubscribe = async () => {
      // Make sure we're connected first
      if (!socketService.isConnected()) {
        await initSocket();
        // Wait for connection
        let attempts = 0;
        while (!socketService.isConnected() && attempts < 50) {
          await new Promise(r => setTimeout(r, 100));
          attempts++;
        }
      }
      
      if (!isSubscribed && socketService.isConnected()) {
        if (user.role === 'COUNSELLOR' && selectedPatient) {
          // Counsellor with selected patient joins private chat
          subscribeToChannel(`private-chat-${user.id}-${selectedPatient.id}`);
        } else if (user.role === 'USER' && assignedCounsellor) {
          // Patient with assigned counsellor joins private chat
          subscribeToChannel(`private-chat-${assignedCounsellor.id}-${user.id}`);
        } else {
          // Fallback to public chat
          subscribeToChannel('public-chat');
        }
      }
    };
    
    connectAndSubscribe();
  }, [session, user, open, isSubscribed, assignedCounsellor, selectedPatient, subscribeToChannel, initSocket]);

  // Handle counsellor selecting a patient to chat with
  const selectPatientToChat = async (patient: Patient) => {
    setSelectedPatient(patient);
    setMessages([]); // Clear previous messages
    setIsSubscribed(false); // Reset subscription to trigger new subscription
  };

  // Listen for open-chat event
  useEffect(() => {
    if (!session || !user) return;

    const handler = async (ev: Event) => {
      setOpen(true);
      setMessages([]); // Clear previous messages
      const detail = (ev as CustomEvent<Record<string, string | undefined>>)?.detail;
      const { counsellorId, patientId } = detail || {};

      if (user.role === 'COUNSELLOR' && patientId) {
        // Find the patient in assigned patients to set selectedPatient
        const patient = assignedPatients.find(a => a.patientId === patientId)?.patient;
        if (patient) setSelectedPatient(patient);
        setIsSubscribed(false);
        await subscribeToChannel(`private-chat-${user.id}-${patientId}`);
      } else if (counsellorId) {
        await subscribeToChannel(`private-chat-${counsellorId}-${user.id}`);
      } else if (user.role === 'USER' && assignedCounsellor) {
        await subscribeToChannel(`private-chat-${assignedCounsellor.id}-${user.id}`);
      } else {
        await subscribeToChannel('public-chat');
      }
    };

    window.addEventListener('open-chat', handler as EventListener);
    return () => window.removeEventListener('open-chat', handler as EventListener);
  }, [user, session, assignedCounsellor, assignedPatients, subscribeToChannel]);

  // Auto-scroll
  useEffect(() => {
    messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  // Cleanup
  useEffect(() => () => socketService.removeAllListeners(), []);

  const sendMessage = () => {
    if (!input.trim()) return;
    const sender = user?.email ?? user?.id ?? 'Guest';
    socketService.sendMessage(channelName, input, sender, user?.id);
    setInput('');
  };

  const isOwnMessage = (sender?: string, senderId?: string) => {
    return sender === user?.email || sender === user?.id || senderId === user?.id;
  };

  if (!session || !user) return null;

  const shouldHideButton = user.role === 'COUNSELLOR' && pathname === '/connect';
  const showPatientSelection = user.role === 'COUNSELLOR' && !selectedPatient && open;

  const isOnline = (lastActive?: string | null) => {
    if (!lastActive) return false;
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    return new Date(lastActive).getTime() > fiveMinutesAgo;
  };

  return (
    <>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f7f4f2; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #a1cdd9; border-radius: 10px; border: 2px solid #f7f4f2; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #7db7c7; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #a1cdd9 #f7f4f2; }
      `}</style>

      <div className={`fixed inset-0 bg-[#000000cd] bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className={`w-[500px] h-[600px] bg-[#F7F4F2] border-4 border-[#C6C3C2] rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${open ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 pb-2">
            <div className="flex flex-col">
              <div className="text-2xl font-extrabold text-[#736B66] cursor-default">
                {showPatientSelection ? 'Select Patient' : 'Live Chat'}
                {!showPatientSelection && !isConnected && <span className="ml-2 text-sm font-normal text-yellow-600">(Connecting...)</span>}
              </div>
              {user.role === 'USER' && assignedCounsellor && (
                <div className="text-sm text-gray-600">With: {assignedCounsellor.name || assignedCounsellor.email}</div>
              )}
              {user.role === 'COUNSELLOR' && selectedPatient && (
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  With: {selectedPatient.name || selectedPatient.email}
                  <button 
                    onClick={() => { setSelectedPatient(null); setIsSubscribed(false); setMessages([]); }}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    (change)
                  </button>
                </div>
              )}
            </div>
            <button onClick={() => setOpen(false)} className="text-3xl text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center cursor-pointer">&times;</button>
          </div>

          {/* Patient Selection for Counsellors */}
          {showPatientSelection ? (
            <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
              {loadingPatients ? (
                <div className="text-center py-8 text-gray-600">Loading patients...</div>
              ) : assignedPatients.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                  <p className="text-lg font-semibold mb-2">No patients assigned</p>
                  <p className="text-sm">You will see your patients here once assigned.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 mb-3">Select a patient to start chatting:</p>
                  {assignedPatients.map((assignment) => (
                    <button
                      key={assignment.id}
                      onClick={() => selectPatientToChat(assignment.patient)}
                      className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border-2 border-transparent hover:border-[#A1CDD9] transition-all"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#A1CDD9] flex items-center justify-center text-white font-bold">
                        {(assignment.patient.name || assignment.patient.email || 'P')[0].toUpperCase()}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-[#736B66]">
                          {assignment.patient.name || 'Patient'}
                        </div>
                        <div className="text-sm text-gray-500">{assignment.patient.email}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isOnline(assignment.patient.lastActive) ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">🟢 Online</span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-medium">⚪ Offline</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Messages */}
              <div ref={messagesRef} className="flex-1 overflow-y-auto px-4 py-2 space-y-4 custom-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${isOwnMessage(m.sender, m.senderId) ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[60%] px-6 py-3 rounded-xl ${isOwnMessage(m.sender, m.senderId) ? "bg-[#A1CDD9] text-white" : "bg-white text-[#736B66]"} text-xl font-unsaid font-bold border border-[#F4A258]`}>
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
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  disabled={!isConnected}
                />
                <button
                  onClick={sendMessage}
                  disabled={!isConnected}
                  className="bg-[#F4A258] hover:bg-[#DC924F] disabled:bg-gray-400 text-xl text-white font-extrabold px-8 py-2 rounded-3xl cursor-pointer shadow-md active:shadow-none active:scale-95 transition-all disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      {!shouldHideButton && (
        <div className="fixed bottom-6 right-6 z-40">
          <button onClick={() => setOpen((s) => !s)} className="w-16 h-16 rounded-full bg-[#9DCDDC] hover:bg-[#8BBDCC] flex items-center justify-center shadow-xl text-2xl transition-all" aria-label="Toggle chat">💬</button>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
