"use client";

import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import socketService from '@/lib/socket';

/**
 * PresenceTracker - Invisible component that maintains WebSocket connection
 * for online/offline status tracking. Include this in your layout to enable
 * real-time presence tracking for all authenticated users.
 */
export default function PresenceTracker() {
  const { data: session, status } = useSession();
  const socketInitialized = useRef(false);

  useEffect(() => {
    // Only initialize if authenticated and not already initialized
    if (status !== 'authenticated' || !session?.user) return;
    if (socketInitialized.current) return;
    
    const initPresence = async () => {
      socketInitialized.current = true;
      
      try {
        console.log('[PresenceTracker] Initializing...');
        await socketService.init();
        const socket = socketService.connect();

        socket.on('connect', () => {
          console.log('[PresenceTracker] Connected, authenticating user...');
          socketService.authenticate(
            session.user.id,
            session.user.email || undefined,
            session.user.role || 'USER'
          );
        });

        socket.on('authenticated', (data: { success: boolean }) => {
          if (data.success) {
            console.log('[PresenceTracker] User authenticated for presence tracking');
          }
        });

        socket.on('disconnect', () => {
          console.log('[PresenceTracker] Disconnected');
        });

        // If already connected, authenticate immediately
        if (socket.connected) {
          socketService.authenticate(
            session.user.id,
            session.user.email || undefined,
            session.user.role || 'USER'
          );
        }
      } catch (error) {
        console.error('[PresenceTracker] Error:', error);
        socketInitialized.current = false;
      }
    };

    initPresence();

    // Cleanup on unmount
    return () => {
      // Don't disconnect here - let the socket persist across page navigation
    };
  }, [session, status]);

  // This component renders nothing - it's purely for side effects
  return null;
}
