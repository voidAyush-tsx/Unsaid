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
      
      // Fetch history
      try {
        const res = await fetch(`/api/chat?room=${encodeURIComponent(name)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.messages) {
            setMessages(data.messages);
          }
        }
      } catch (err) {
        console.error('[Chat] Failed to fetch history:', err);
      }
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

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e5e7eb transparent; }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>

      <div className={`fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 transition-all duration-500 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className={`w-[450px] h-[650px] max-h-[90vh] bg-[#F7F4F2] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-white/50 transition-all duration-500 ease-out ${open ? "scale-100 translate-y-0" : "scale-95 translate-y-10"}`}>
          
          {/* Header */}
          <div className="bg-white px-6 py-5 flex items-center justify-between border-b border-[#E5E1DE]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#A1CDD9] flex items-center justify-center text-white shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-unsaid font-extrabold text-[#736B66] leading-tight">
                  {showPatientSelection ? 'Select Patient' : 'Unsaid Chat'}
                </h3>
                {!showPatientSelection && (
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></div>
                    <span className="text-xs font-medium text-[#A39C98]">
                      {isConnected ? 'Connected' : 'Connecting...'}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <button 
              onClick={() => setOpen(false)} 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F7F4F2] text-[#736B66] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Sub-header for context */}
          {!showPatientSelection && (user.role === 'USER' && assignedCounsellor || user.role === 'COUNSELLOR' && selectedPatient) && (
            <div className="bg-[#FDFCFB] px-6 py-2 border-b border-[#E5E1DE] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#A39C98]">Chatting with</span>
                <span className="text-xs font-extrabold text-[#736B66]">
                  {user.role === 'USER' ? assignedCounsellor?.name : selectedPatient?.name}
                </span>
              </div>
              {user.role === 'COUNSELLOR' && (
                <button 
                  onClick={() => { setSelectedPatient(null); setIsSubscribed(false); setMessages([]); }}
                  className="text-[10px] font-bold text-[#A1CDD9] hover:text-[#8BBDCC] uppercase tracking-wider"
                >
                  Switch
                </button>
              )}
            </div>
          )}

          {/* Patient Selection for Counsellors */}
          {showPatientSelection ? (
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {loadingPatients ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-[#A39C98]">
                  <div className="w-8 h-8 border-3 border-[#A1CDD9] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm font-bold font-unsaid">Finding your patients...</p>
                </div>
              ) : assignedPatients.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4">
                  <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mb-4 shadow-sm">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A1CDD9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <h4 className="text-lg font-extrabold text-[#736B66] mb-1">No patients yet</h4>
                  <p className="text-sm text-[#A39C98]">When patients are assigned to you, they will appear here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {assignedPatients.map((assignment) => (
                    <button
                      key={assignment.id}
                      onClick={() => selectPatientToChat(assignment.patient)}
                      className="w-full group flex items-center gap-4 p-4 bg-white rounded-3xl border border-transparent hover:border-[#A1CDD9] hover:shadow-md transition-all duration-300 text-left"
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-[#F7F4F2] group-hover:bg-[#A1CDD9]/10 flex items-center justify-center text-[#A1CDD9] font-extrabold text-lg transition-colors">
                          {(assignment.patient.name || assignment.patient.email || 'P')[0].toUpperCase()}
                        </div>
                        {isOnline(assignment.patient.lastActive) && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-extrabold text-[#736B66] truncate">
                          {assignment.patient.name || 'Patient'}
                        </div>
                        <div className="text-xs text-[#A39C98] truncate">{assignment.patient.email}</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#F7F4F2] group-hover:bg-[#A1CDD9] group-hover:text-white flex items-center justify-center transition-all">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Messages */}
              <div ref={messagesRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-6 custom-scrollbar bg-[#F7F4F2]">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center opacity-40 grayscale">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#736B66" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    </div>
                    <p className="text-sm font-bold font-unsaid text-[#736B66]">Start a conversation</p>
                  </div>
                ) : (
                  messages.map((m, i) => {
                    const own = isOwnMessage(m.sender, m.senderId);
                    return (
                      <div key={i} className={`flex flex-col ${own ? "items-end" : "items-start"}`}>
                        <div className={`max-w-[85%] px-5 py-3.5 rounded-3xl text-base font-unsaid font-bold shadow-sm ${
                          own 
                            ? "bg-[#A1CDD9] text-white rounded-tr-none" 
                            : "bg-white text-[#736B66] rounded-tl-none border border-[#E5E1DE]"
                        }`}>
                          {m.text}
                        </div>
                        <span className="text-[10px] font-bold text-[#A39C98] mt-1.5 px-2 uppercase tracking-tighter">
                          {formatTime(m.ts)}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Input */}
              <div className="p-6 bg-white border-t border-[#E5E1DE]">
                <div className="flex items-center gap-3 bg-[#F7F4F2] rounded-[2rem] p-2 pl-5 border border-transparent focus-within:border-[#A1CDD9] focus-within:bg-white transition-all duration-300">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent text-[#736B66] font-bold outline-none text-base placeholder-[#A39C98]"
                    placeholder="Type a message..."
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    disabled={!isConnected}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!isConnected || !input.trim()}
                    className="w-10 h-10 rounded-full bg-[#F4A258] hover:bg-[#E89245] disabled:bg-[#E5E1DE] disabled:text-[#A39C98] text-white flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      {!shouldHideButton && (
        <div className="fixed bottom-8 right-8 z-40">
          <button 
            onClick={() => setOpen((s) => !s)} 
            className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group ${
              open ? 'bg-[#F4A258] rotate-90' : 'bg-[#A1CDD9]'
            }`}
            aria-label="Toggle chat"
          >
            {open ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <div className="relative">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#F4A258] rounded-full border-2 border-[#A1CDD9] animate-pulse"></div>
              </div>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
