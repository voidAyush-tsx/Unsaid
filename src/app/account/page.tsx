'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Navbar_v2 from '@/components/navBar_v2';
import ChangePasswordForm from '@/components/auth/ChangePasswordForm';

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  React.useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4F2]">
        <div className="text-xl text-[#736B66] font-unsaid">Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    redirect('/signin');
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error('Failed to update profile');

      await update({ name }); // Update session
      setMessage('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      setMessage('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4F2]">
      <Navbar_v2 />
      
      <main className="max-w-7xl mx-auto px-4 pt-32 pb-12">
        <h1 className="text-4xl font-unsaid font-bold text-[#3A3633] mb-8 text-center">My Profile</h1>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
          {/* Profile Details Card */}
          <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
              <p className="text-gray-600 mt-2">
                Manage your personal details
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-600">
                  {session?.user?.email}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <div className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 capitalize">
                  {session?.user?.role?.toLowerCase()}
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isEditing 
                        ? 'border-blue-500 bg-white focus:ring-2 focus:ring-blue-500' 
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    } transition-all outline-none`}
                  />
                </div>
                
                <div className="pt-4">
                  {isEditing ? (
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 py-2 bg-[#F4A258] text-white font-semibold rounded-lg shadow-md hover:bg-[#e08b42] transition-all"
                      >
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setName(session?.user?.name || '');
                        }}
                        className="flex-1 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="w-full py-2 border-2 border-[#A1CDD9] text-[#2C5F6D] font-semibold rounded-lg hover:bg-[#A1CDD9] hover:text-white transition-all"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </form>
              
              {message && (
                <div className={`text-center text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                  {message}
                </div>
              )}
            </div>
          </div>

          {/* Change Password Card */}
          <ChangePasswordForm />
        </div>
      </main>
    </div>
  );
}
