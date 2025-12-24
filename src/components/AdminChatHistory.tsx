"use client";

import React, { useEffect, useState } from 'react';

type ChatRoom = {
  room: string;
  counsellorName?: string;
  patientName?: string;
  _max: {
    timestamp: string;
  };
};

type Message = {
  id: string;
  room: string;
  sender: string;
  senderId: string;
  message: string;
  timestamp: string;
};

const AdminChatHistory: React.FC = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/chat-history');
      if (res.ok) {
        const data = await res.json();
        setRooms(data.rooms || []);
      }
    } catch (err) {
      console.error('Failed to fetch rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (room: string) => {
    setSelectedRoom(room);
    setLoadingMessages(true);
    try {
      const res = await fetch(`/api/admin/chat-history?room=${encodeURIComponent(room)}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const formatRoomName = (r: ChatRoom) => {
    if (r.room === 'public-chat') return 'Public Chat';
    if (r.room.startsWith('private-chat-')) {
      return `${r.counsellorName} & ${r.patientName}`;
    }
    return r.room;
  };

  const filteredRooms = rooms.filter(r => {
    const query = searchQuery.toLowerCase();
    const name = formatRoomName(r).toLowerCase();
    return name.includes(query);
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
      {/* Rooms List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b bg-gray-50 font-bold text-[#736B66] flex justify-between items-center">
          <span>Conversations</span>
          <button 
            onClick={fetchRooms}
            className="text-xs bg-[#A1CDD9] text-white px-2 py-1 rounded hover:bg-[#8BBDCC] transition-colors"
          >
            Refresh
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="p-3 border-b bg-white">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#F7F4F2] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#A1CDD9] outline-none"
            />
            <svg 
              className="absolute left-3 top-2.5 text-gray-400" 
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : filteredRooms.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {searchQuery ? 'No matches found.' : 'No chat history found.'}
            </div>
          ) : (
            filteredRooms.map((r) => (
              <button
                key={r.room}
                onClick={() => fetchMessages(r.room)}
                className={`w-full text-left p-4 border-b hover:bg-blue-50 transition-colors ${
                  selectedRoom === r.room ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="font-bold text-[#736B66]">{formatRoomName(r)}</div>
                <div className="text-xs text-gray-400 mt-1">
                  Last active: {new Date(r._max.timestamp).toLocaleString()}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Messages View */}
      <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b bg-gray-50 font-bold text-[#736B66]">
          {selectedRoom ? formatRoomName(rooms.find(r => r.room === selectedRoom) || { room: selectedRoom, _max: { timestamp: '' } }) : 'Select a conversation'}
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F7F4F2]">
          {!selectedRoom ? (
            <div className="h-full flex items-center justify-center text-gray-400 italic">
              Select a room from the left to view messages
            </div>
          ) : loadingMessages ? (
            <div className="h-full flex items-center justify-center text-gray-500">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">No messages in this room.</div>
          ) : (
            messages.map((m) => (
              <div key={m.id} className="flex flex-col">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-extrabold text-sm text-[#736B66]">{m.sender}</span>
                  <span className="text-[10px] text-gray-400 uppercase">
                    {new Date(m.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-200 text-[#736B66] shadow-sm max-w-[90%]">
                  {m.message}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChatHistory;
