"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

type Patient = {
  id: string;
  email?: string | null;
  name?: string | null;
  role: string;
  lastActive?: string | null;
};

type Assignment = {
  id: string;
  patientId: string;
  assignedAt: string;
  patient: Patient;
};

export default function CounsellorDashboard() {
  const { data: session } = useSession();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/assignments');
      if (res.ok) {
        const data = await res.json();
        setAssignments(data.assignments || []);
      }
    } catch (err) {
      console.error('Failed to fetch assignments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.role === 'COUNSELLOR') {
      fetchAssignments();
      
      // Refresh every 30 seconds to update activity status
      const interval = setInterval(fetchAssignments, 30000);
      return () => clearInterval(interval);
    }
  }, [session]);

  const openChat = (patientId: string) => {
    if (session?.user?.id) {
      window.dispatchEvent(
        new CustomEvent('open-chat', {
          detail: { counsellorId: session.user.id, patientId },
        })
      );
    }
  };

  const isOnline = (lastActive?: string | null) => {
    if (!lastActive) return false;
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    return new Date(lastActive).getTime() > fiveMinutesAgo;
  };

  if (!session?.user || session.user.role !== 'COUNSELLOR') {
    return null;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Assigned Patients</h2>
      
      {loading && <div className="text-gray-600">Loading...</div>}
      
      {!loading && assignments.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          <p>No patients assigned yet.</p>
        </div>
      )}

      {!loading && assignments.length > 0 && (
        <div className="space-y-3">
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                    {(assignment.patient.name || assignment.patient.email || 'P')[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {assignment.patient.name || 'Patient'}
                    </h3>
                    <p className="text-sm text-gray-600">{assignment.patient.email}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Assigned: {new Date(assignment.assignedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  {isOnline(assignment.patient.lastActive) ? (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      🟢 Online
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                      ⚪ Offline
                    </span>
                  )}
                  {assignment.patient.lastActive && (
                    <p className="text-xs text-gray-500 mt-1 text-center">
                      {new Date(assignment.patient.lastActive).toLocaleTimeString()}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => openChat(assignment.patientId)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  💬 Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Patients are automatically assigned to you. Chat with them by clicking the chat button above.
        </p>
      </div>
    </div>
  );
}
