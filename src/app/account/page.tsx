'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Navbar_v2 from '@/components/navBar_v2';
import ChangePasswordForm from '@/components/auth/ChangePasswordForm';

interface AssessmentResult {
  id: string;
  type: string;
  score: number;
  level: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [assessments, setAssessments] = useState<AssessmentResult[]>([]);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session?.user?.name]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/user/assessments')
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setAssessments(data);
          }
        })
        .catch((err) => console.error('Failed to fetch assessments', err));
    }
  }, [status]);

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

        {/* Assessment History */}
        {assessments.length > 0 && (
          <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-unsaid font-bold text-[#3A3633] mb-6 text-center">Assessment History</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-gray-600">Date</th>
                      <th className="px-6 py-4 font-semibold text-gray-600">Test Type</th>
                      <th className="px-6 py-4 font-semibold text-gray-600">Score</th>
                      <th className="px-6 py-4 font-semibold text-gray-600">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {assessments.map((assessment) => (
                      <tr key={assessment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(assessment.createdAt).toLocaleDateString()} {new Date(assessment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-800">{assessment.type}</td>
                        <td className="px-6 py-4 text-gray-600">{assessment.score}</td>
                        <td className="px-6 py-4">
                          <span 
                            className={`px-3 py-1 rounded-full text-sm font-medium
                              ${assessment.level.includes('Severe') ? 'bg-red-100 text-red-700' :
                                assessment.level.includes('Moderate') ? 'bg-orange-100 text-orange-700' :
                                assessment.level.includes('Mild') ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}
                          >
                            {assessment.level}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
