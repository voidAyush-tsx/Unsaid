"use client";

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import ChatWidget from '@/components/ChatWidget';
import PresenceTracker from '@/components/PresenceTracker';
import PasswordChangeCheck from '@/components/auth/PasswordChangeCheck';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PasswordChangeCheck />
      <PresenceTracker />
      {children}
      <ChatWidget />
    </SessionProvider>
  );
}
