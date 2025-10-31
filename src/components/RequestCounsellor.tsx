"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

type Counsellor = {
  id: string;
  email?: string | null;
  name?: string | null;
  lastActive?: string | null;
};

export default function RequestCounsellor() {
  const { data: session } = useSession();
  const [assignedCounsellor, setAssignedCounsellor] = useState<Counsellor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssignment = async () => {
    try {
      const res = await fetch('/api/assignments');
      if (res.ok) {
        const data = await res.json();
        if (data.assignment?.counsellor) {
          setAssignedCounsellor(data.assignment.counsellor);
        }
      }
    } catch (err) {
      console.error('Failed to fetch assignment:', err);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchAssignment();
    }
  }, [session]);

  const requestAssignment = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to assign counsellor');
      }

      const data = await res.json();
      setAssignedCounsellor(data.assignment.counsellor);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const openChat = () => {
    if (assignedCounsellor) {
      window.dispatchEvent(
        new CustomEvent('open-chat', {
          detail: { counsellorId: assignedCounsellor.id },
        })
      );
    }
  };

  const isOnline = (lastActive?: string | null) => {
    if (!lastActive) return false;
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    return new Date(lastActive).getTime() > fiveMinutesAgo;
  };

  if (!session?.user) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg text-center">
        <p className="text-gray-600">Please sign in to connect with a counsellor.</p>
      </div>
    );
  }

  if (session.user.role !== 'USER') {
    return null; // Only show for patients
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {assignedCounsellor ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Your Counsellor</h3>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                {assignedCounsellor.name || assignedCounsellor.email || 'Assigned Counsellor'}
              </p>
              {assignedCounsellor.email && (
                <p className="text-sm text-gray-600 mt-1">{assignedCounsellor.email}</p>
              )}
            </div>
            <div>
              {isOnline(assignedCounsellor.lastActive) ? (
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  🟢 Online
                </span>
              ) : (
                <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                  ⚪ Offline
                </span>
              )}
            </div>
          </div>

          <button
            onClick={openChat}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            💬 Start Chat
          </button>
        </div>
      ) : (
        <div className="space-y-4 text-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect with a Counsellor</h3>
            <p className="text-gray-600">
              You haven&apos;t been assigned a counsellor yet. Click below to get randomly matched with an available counsellor.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={requestAssignment}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            {loading ? 'Assigning...' : 'Get Counsellor'}
          </button>
        </div>
      )}
    </div>
  );
}
