"use client";

import React, { useEffect, useState } from 'react';

type User = {
  id: string;
  email?: string | null;
  name?: string | null;
  role: 'ADMIN' | 'COUNSELLOR' | 'USER';
  createdAt: string;
};

type NewUser = {
  email: string;
  password: string;
  name: string;
  role: 'ADMIN' | 'COUNSELLOR' | 'USER';
};

export default function AdminUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ email: string; name: string; role: string }>({ email: '', name: '', role: 'USER' });
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<NewUser>({ email: '', password: '', name: '', role: 'USER' });

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/users');
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);



  const deleteUser = async (id: string) => {
    if (!confirm('Delete this user? This cannot be undone.')) return;
    try {
      const res = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (!res.ok) throw new Error('Delete failed');
      await fetchUsers();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Failed to delete');
    }
  };

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setEditForm({
      email: user.email || '',
      name: user.name || '',
      role: user.role
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ email: '', name: '', role: 'USER' });
  };

  const saveEdit = async (id: string) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id, 
          email: editForm.email,
          name: editForm.name,
          role: editForm.role
        })
      });
      if (!res.ok) throw new Error('Update failed');
      setEditingId(null);
      await fetchUsers();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Failed to update');
    }
  };

  const createUser = async () => {
    if (!newUser.email || !newUser.password) {
      setError('Email and password are required');
      return;
    }
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Create failed');
      }
      setNewUser({ email: '', password: '', name: '', role: 'USER' });
      setShowAddForm(false);
      await fetchUsers();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message || 'Failed to create user');
    }
  };

  return (
    <div>
      {loading && <div>Loading users...</div>}
      {error && <div className="text-red-600 mb-4">Error: {error}</div>}
      
      {/* Add User Button */}
      <div className="mb-4">
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showAddForm ? 'Cancel' : 'Add User'}
        </button>
      </div>

      {/* Add User Form */}
      {showAddForm && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">Add New User</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              className="border px-3 py-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({...newUser, password: e.target.value})}
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Name (optional)"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              className="border px-3 py-2 rounded"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value as 'ADMIN' | 'COUNSELLOR' | 'USER'})}
              className="border px-3 py-2 rounded"
            >
              <option value="USER">USER</option>
              <option value="COUNSELLOR">COUNSELLOR</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="mt-4">
            <button 
              onClick={createUser}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
            >
              Create User
            </button>
            <button 
              onClick={() => setShowAddForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1 text-left">Email</th>
            <th className="border px-2 py-1 text-left">Name</th>
            <th className="border px-2 py-1 text-left">Role</th>
            <th className="border px-2 py-1 text-left">Created</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="odd:bg-gray-50">
              {editingId === u.id ? (
                // Edit mode
                <>
                  <td className="border px-2 py-1">
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full border px-2 py-1 rounded"
                      placeholder="Name"
                    />
                  </td>
                  <td className="border px-2 py-1">
                    <select
                      value={editForm.role}
                      onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                      className="w-full border px-2 py-1 rounded"
                    >
                      <option value="USER">USER</option>
                      <option value="COUNSELLOR">COUNSELLOR</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  </td>
                  <td className="border px-2 py-1">{new Date(u.createdAt).toLocaleString()}</td>
                  <td className="border px-2 py-1 text-center space-x-1">
                    <button 
                      onClick={() => saveEdit(u.id)}
                      className="text-sm bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button 
                      onClick={cancelEdit}
                      className="text-sm bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                // View mode
                <>
                  <td className="border px-2 py-1">{u.email || '-'}</td>
                  <td className="border px-2 py-1">{u.name || '-'}</td>
                  <td className="border px-2 py-1">{u.role}</td>
                  <td className="border px-2 py-1">{new Date(u.createdAt).toLocaleString()}</td>
                  <td className="border px-2 py-1 text-center space-x-1">
                    <button 
                      onClick={() => startEdit(u)}
                      className="text-sm bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteUser(u.id)}
                      className="text-sm bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
