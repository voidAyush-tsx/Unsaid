"use client";

import React, { useEffect, useState } from 'react';

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

export default function AdminAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [counsellors, setCounsellors] = useState<User[]>([]);
  const [patients, setPatients] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedCounsellor, setSelectedCounsellor] = useState('');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

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
    
    // Refresh every 5 seconds to show updated activity (more responsive)
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const isOnline = (lastActive?: string | null) => {
    if (!lastActive) return false;
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    return new Date(lastActive).getTime() > fiveMinutesAgo;
  };

  const getStatusBadge = (user: User) => {
    const online = isOnline(user.lastActive);
    return (
      <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center gap-1 ${online ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
        <span className={online ? 'animate-pulse' : ''}>
          {online ? '🟢' : '⚪'}
        </span>
        {online ? 'Online' : 'Offline'}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Counsellor-Patient Assignments</h2>
          <p className="text-xs text-gray-500 mt-1">
            Last updated: {lastRefresh.toLocaleTimeString()} • Auto-refreshes every 5s
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => fetchData()}
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
                  {assignment.patient.lastActive && (
                    <div className="text-xs text-gray-500 mt-1">
                      Last: {new Date(assignment.patient.lastActive).toLocaleTimeString()}
                    </div>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {getStatusBadge(assignment.counsellor)}
                  {assignment.counsellor.lastActive && (
                    <div className="text-xs text-gray-500 mt-1">
                      Last: {new Date(assignment.counsellor.lastActive).toLocaleTimeString()}
                    </div>
                  )}
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
            {assignments.filter(a => a.isActive && isOnline(a.patient.lastActive)).length}
          </div>
          <div className="text-sm text-green-600">Patients Online</div>
        </div>
        <div className="p-4 border rounded bg-purple-50">
          <div className="text-2xl font-bold text-purple-700">
            {counsellors.filter(c => isOnline(c.lastActive)).length}
          </div>
          <div className="text-sm text-purple-600">Counsellors Online</div>
        </div>
      </div>
    </div>
  );
}
