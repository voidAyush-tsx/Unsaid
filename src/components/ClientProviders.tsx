"use client";

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import ChatWidget from '@/components/ChatWidget';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <ChatWidget />
    </SessionProvider>
  );
}
