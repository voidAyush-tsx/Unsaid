"use client";

import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import AdminUserList from '../../components/AdminUserList';
import AdminUserUpload from '../../components/AdminUserUpload';
import AdminAssignments from '../../components/AdminAssignments';
import ActivityTester from '../../components/ActivityTester';
import AdminChatHistory from '../../components/AdminChatHistory';

type Tab = 'users' | 'assignments' | 'chats';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('assignments');
  const [usersRefreshKey, setUsersRefreshKey] = useState(0);

  const handleSignOut = () => {
    // Use next-auth signOut and redirect to the sign-in page
    signOut({ callbackUrl: '/signin' });
  };

  return (
    <main className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="ml-4 px-4 py-2 rounded-full bg-[#F4A258] text-white font-semibold hover:opacity-90 transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab('assignments')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'assignments'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Assignments & Activity
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'users'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Manage Users
        </button>
        <button
          onClick={() => setActiveTab('chats')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'chats'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Chat History
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'assignments' && (
        <div>
          <p className="mb-6 text-gray-600">
            View and manage counsellor-patient assignments. Monitor online/offline status in real-time.
          </p>
          
          {/* Activity Tester - for debugging */}
          <div className="mb-6">
            <ActivityTester />
          </div>
          
          <AdminAssignments />
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <p className="mb-6 text-gray-600">
            View, create, edit, and delete users. Change user roles and manage authentication.
          </p>
          <AdminUserUpload onUploadSuccess={() => setUsersRefreshKey(prev => prev + 1)} />
          <AdminUserList refreshKey={usersRefreshKey} />
        </div>
      )}

      {activeTab === 'chats' && (
        <div>
          <p className="mb-6 text-gray-600">
            Monitor and review chat conversations between counsellors and patients.
          </p>
          <AdminChatHistory />
        </div>
      )}
    </main>
  );
}
