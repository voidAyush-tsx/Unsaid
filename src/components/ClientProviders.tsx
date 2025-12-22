"use client";

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import ChatWidget from '@/components/ChatWidget';
import PresenceTracker from '@/components/PresenceTracker';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PresenceTracker />
      {children}
      <ChatWidget />
    </SessionProvider>
  );
}
