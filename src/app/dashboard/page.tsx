'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import CounsellorDashboard from '@/components/CounsellorDashboard';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  // Redirect to signin if not authenticated
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    redirect('/signin');
  }

  const user = session?.user;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {user?.role === 'COUNSELLOR' ? 'Counsellor Dashboard' : 'Patient Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">{user?.name || user?.email}</span>
              <button
                onClick={() => window.location.href = '/api/auth/signout'}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user?.role === 'COUNSELLOR' ? (
          <CounsellorDashboard />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h2>
            <p className="text-gray-600 mb-6">
              You can access your mental health resources and chat with your assigned counsellor.
            </p>
            <button
              onClick={() => window.dispatchEvent(new Event('open-chat'))}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
            >
              💬 Open Chat
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
