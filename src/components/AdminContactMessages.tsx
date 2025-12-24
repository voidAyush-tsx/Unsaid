"use client";

import React, { useEffect, useState } from 'react';

type ContactMessage = {
  id: string;
  name: string;
  occupation: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  isRead: boolean;
};

const AdminContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/contact-messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error('Failed to fetch contact messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/contact-messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isRead: !currentStatus }),
      });
      if (res.ok) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: !currentStatus } : m));
      }
    } catch (err) {
      console.error('Failed to update message status:', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b bg-gray-50 font-bold text-[#736B66] flex justify-between items-center">
        <span>Contact Form Submissions</span>
        <button 
          onClick={fetchMessages}
          className="text-xs bg-[#A1CDD9] text-white px-3 py-1.5 rounded-lg hover:bg-[#8BBDCC] transition-colors"
        >
          Refresh
        </button>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No messages received yet.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[#736B66] text-sm uppercase tracking-wider">
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold">From</th>
                <th className="p-4 font-bold">Contact Info</th>
                <th className="p-4 font-bold">Message</th>
                <th className="p-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {messages.map((m) => (
                <tr key={m.id} className={`hover:bg-gray-50 transition-colors ${!m.isRead ? 'bg-blue-50/30' : ''}`}>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${m.isRead ? 'bg-gray-100 text-gray-500' : 'bg-blue-100 text-blue-600'}`}>
                      {m.isRead ? 'Read' : 'New'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Date(m.createdAt).toLocaleDateString()}<br/>
                    <span className="text-[10px]">{new Date(m.createdAt).toLocaleTimeString()}</span>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-[#736B66]">{m.name}</div>
                    <div className="text-xs text-gray-400">{m.occupation}</div>
                  </td>
                  <td className="p-4 text-sm">
                    <div className="text-[#736B66]">{m.email}</div>
                    <div className="text-gray-400">{m.phone}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-[#736B66] max-w-xs line-clamp-2 hover:line-clamp-none cursor-help" title={m.message}>
                      {m.message}
                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleRead(m.id, m.isRead)}
                      className={`text-xs font-bold px-3 py-1 rounded-lg transition-colors ${
                        m.isRead ? 'text-gray-400 hover:text-blue-600' : 'text-blue-600 hover:text-blue-800'
                      }`}
                    >
                      {m.isRead ? 'Mark Unread' : 'Mark Read'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminContactMessages;
