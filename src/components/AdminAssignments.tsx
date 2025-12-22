"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSession } from 'next-auth/react';
import socketService, { UserStatusData } from '@/lib/socket';

type User = {
  id: string;
  email?: string | null;
  name?: string | null;
  role: 'ADMIN' | 'COUNSELLOR' | 'USER';
  lastActive?: string | null;
};

type Assignment = {
  id: string;
  patientId: string;
  counsellorId: string;
  assignedAt: string;
  isActive: boolean;
  patient: User;
  counsellor: User;
};

// Track online status by userId
type OnlineStatus = Map<string, { isOnline: boolean; timestamp: string }>;

export default function AdminAssignments() {
  const { data: session } = useSession();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [counsellors, setCounsellors] = useState<User[]>([]);
  const [patients, setPatients] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedCounsellor, setSelectedCounsellor] = useState('');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [onlineStatus, setOnlineStatus] = useState<OnlineStatus>(new Map());
  const [socketConnected, setSocketConnected] = useState(false);
  const socketInitialized = useRef(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch assignments
      const assignRes = await fetch('/api/assignments');
      if (!assignRes.ok) throw new Error('Failed to load assignments');
      const assignData = await assignRes.json();
      setAssignments(assignData.assignments || []);

      // Fetch all users to get counsellors and patients
      const usersRes = await fetch('/api/admin/users');
      if (!usersRes.ok) throw new Error('Failed to load users');
      const usersData = await usersRes.json();
      const allUsers = usersData.users || [];
      
      setCounsellors(allUsers.filter((u: User) => u.role === 'COUNSELLOR'));
      setPatients(allUsers.filter((u: User) => u.role === 'USER'));
      setLastRefresh(new Date());
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Initialize WebSocket for real-time status updates
    const initSocket = async () => {
      if (socketInitialized.current) return;
      if (!session?.user) return;
      socketInitialized.current = true;
      
      await socketService.init();
      const socket = socketService.connect();
      
      socket.on('connect', () => {
        console.log('[AdminAssignments] Socket connected');
        setSocketConnected(true);
        
        // Authenticate as admin to join admin-status-room
        socketService.authenticate(
          session.user.id,
          session.user.email || undefined,
          session.user.role || 'ADMIN'
        );
        
        // Request initial online users list
        setTimeout(() => {
          socketService.requestOnlineUsers();
        }, 500);
      });
      
      socket.on('disconnect', () => {
        console.log('[AdminAssignments] Socket disconnected');
        setSocketConnected(false);
      });
      
      // Listen for user status changes
      socketService.onUserStatusChange((data: UserStatusData) => {
        console.log('[AdminAssignments] User status change:', data);
        setOnlineStatus(prev => {
          const newStatus = new Map(prev);
          newStatus.set(data.userId, { 
            isOnline: data.isOnline, 
            timestamp: data.timestamp 
          });
          return newStatus;
        });
        setLastRefresh(new Date());
      });
      
      // Listen for initial online users list
      socketService.onOnlineUsersList((data) => {
        console.log('[AdminAssignments] Online users list:', data.users);
        const newStatus = new Map<string, { isOnline: boolean; timestamp: string }>();
        data.users.forEach(user => {
          newStatus.set(user.userId, { 
            isOnline: true, 
            timestamp: new Date(user.connectedAt).toISOString() 
          });
        });
        setOnlineStatus(newStatus);
        setLastRefresh(new Date());
      });
    };
    
    initSocket();
    
    return () => {
      // Clean up socket listeners when component unmounts
      socketService.off('user-status-change');
      socketService.off('online-users-list');
    };
  }, [session]);

  const createAssignment = async () => {
    if (!selectedPatient || !selectedCounsellor) {
      setError('Please select both patient and counsellor');
      return;
    }

    try {
      const res = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          patientId: selectedPatient, 
          counsellorId: selectedCounsellor 
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create assignment');
      }

      setShowCreateForm(false);
      setSelectedPatient('');
      setSelectedCounsellor('');
      await fetchData();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    }
  };

  const deleteAssignment = async (assignmentId: string) => {
    if (!confirm('Deactivate this assignment?')) return;

    try {
      const res = await fetch('/api/assignments', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assignmentId }),
      });

      if (!res.ok) throw new Error('Failed to delete assignment');
      await fetchData();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    }
  };

  const isOnline = useCallback((userId: string) => {
    const status = onlineStatus.get(userId);
    return status?.isOnline ?? false;
  }, [onlineStatus]);

  const getLastSeen = useCallback((userId: string) => {
    const status = onlineStatus.get(userId);
    return status?.timestamp ? new Date(status.timestamp).toLocaleTimeString() : null;
  }, [onlineStatus]);

  const getStatusBadge = (user: User) => {
    const online = isOnline(user.id);
    const lastSeen = getLastSeen(user.id);
    return (
      <div>
        <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center gap-1 ${online ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
          <span className={`w-2 h-2 rounded-full ${online ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
          {online ? 'Online' : 'Offline'}
        </span>
        {lastSeen && (
          <div className="text-xs text-gray-500 mt-1">
            Last: {lastSeen}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Counsellor-Patient Assignments</h2>
          <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 ${socketConnected ? 'text-green-600' : 'text-red-600'}`}>
              <span className={`w-2 h-2 rounded-full ${socketConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
              {socketConnected ? 'WebSocket Connected' : 'WebSocket Disconnected'}
            </span>
            • Last updated: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              fetchData();
              socketService.requestOnlineUsers();
            }}
            disabled={loading}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 disabled:opacity-50"
          >
            {loading ? '↻ Refreshing...' : '↻ Refresh Now'}
          </button>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {showCreateForm ? 'Cancel' : 'Create Assignment'}
          </button>
        </div>
      </div>

      {loading && <div>Loading assignments...</div>}
      {error && <div className="text-red-600 bg-red-50 p-3 rounded">Error: {error}</div>}

      {/* Create Assignment Form */}
      {showCreateForm && (
        <div className="p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">Create New Assignment</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Patient</label>
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select a patient...</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name || p.email} {getStatusBadge(p)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Counsellor</label>
              <select
                value={selectedCounsellor}
                onChange={(e) => setSelectedCounsellor(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select a counsellor...</option>
                {counsellors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name || c.email}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={createAssignment}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
            >
              Create
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Assignments Table */}
      <div className="border rounded overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Patient</th>
              <th className="border px-4 py-2 text-left">Counsellor</th>
              <th className="border px-4 py-2 text-left">Patient Status</th>
              <th className="border px-4 py-2 text-left">Counsellor Status</th>
              <th className="border px-4 py-2 text-left">Assigned At</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.filter(a => a.isActive).map((assignment) => (
              <tr key={assignment.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  <div className="font-medium">{assignment.patient.name || 'Unnamed'}</div>
                  <div className="text-sm text-gray-600">{assignment.patient.email}</div>
                </td>
                <td className="border px-4 py-2">
                  <div className="font-medium">{assignment.counsellor.name || 'Unnamed'}</div>
                  <div className="text-sm text-gray-600">{assignment.counsellor.email}</div>
                </td>
                <td className="border px-4 py-2">
                  {getStatusBadge(assignment.patient)}
                </td>
                <td className="border px-4 py-2">
                  {getStatusBadge(assignment.counsellor)}
                </td>
                <td className="border px-4 py-2 text-sm">
                  {new Date(assignment.assignedAt).toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => deleteAssignment(assignment.id)}
                    className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
            {assignments.filter(a => a.isActive).length === 0 && (
              <tr>
                <td colSpan={6} className="border px-4 py-8 text-center text-gray-500">
                  No active assignments. Create one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 border rounded bg-blue-50">
          <div className="text-2xl font-bold text-blue-700">{assignments.filter(a => a.isActive).length}</div>
          <div className="text-sm text-blue-600">Active Assignments</div>
        </div>
        <div className="p-4 border rounded bg-green-50">
          <div className="text-2xl font-bold text-green-700">
            {assignments.filter(a => a.isActive && isOnline(a.patient.id)).length}
          </div>
          <div className="text-sm text-green-600">Patients Online</div>
        </div>
        <div className="p-4 border rounded bg-purple-50">
          <div className="text-2xl font-bold text-purple-700">
            {counsellors.filter(c => isOnline(c.id)).length}
          </div>
          <div className="text-sm text-purple-600">Counsellors Online</div>
        </div>
      </div>
    </div>
  );
}
