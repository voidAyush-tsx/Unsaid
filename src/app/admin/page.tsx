import React from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

import AdminUserList from '../../components/AdminUserList';

export const metadata = {
  title: 'Admin - Users'
};

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== 'ADMIN') {
    // not authorized
    redirect('/');
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Admin: Manage Users</h1>
      <p className="mb-6">From here you can view, change roles and delete users.</p>
  {/* Client component handles fetching and actions */}
      <AdminUserList />
    </main>
  );
}
