"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import socketService from '@/lib/socket';

export default function ActivityTester() {
  const { data: session } = useSession();
  const [isConnected, setIsConnected] = useState(false);
  const [connectedAt, setConnectedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const socketInitialized = useRef(false);

  useEffect(() => {
    if (!session?.user) return;
    if (socketInitialized.current) return;
    socketInitialized.current = true;

    const initSocket = async () => {
      try {
        await socketService.init();
        const socket = socketService.connect();
        
        socket.on('connect', () => {
          console.log('[ActivityTester] Socket connected');
          setIsConnected(true);
          setConnectedAt(new Date());
          setError(null);
          
          // Authenticate with user info
          socketService.authenticate(
            session.user.id,
            session.user.email || undefined,
            session.user.role || 'USER'
          );
        });

        socket.on('authenticated', (data: { success: boolean }) => {
          if (data.success) {
            console.log('[ActivityTester] Authenticated successfully');
          }
        });

        socket.on('disconnect', () => {
          console.log('[ActivityTester] Socket disconnected');
          setIsConnected(false);
        });

        socket.on('connect_error', (err: Error) => {
          console.error('[ActivityTester] Connection error:', err);
          setError(`Connection error: ${err.message}`);
          setIsConnected(false);
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(`Error: ${message}`);
      }
    };

    initSocket();

    return () => {
      // Clean up on unmount
      socketService.off('connect');
      socketService.off('disconnect');
      socketService.off('authenticated');
      socketService.off('connect_error');
    };
  }, [session]);

  if (!session?.user) {
    return (
      <div className="p-4 border rounded bg-yellow-50">
        <p className="text-sm text-yellow-800">Sign in to test activity tracking</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded bg-blue-50">
      <h3 className="font-bold text-blue-900 mb-2">WebSocket Status</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
          <span className="font-medium">Status:</span>
          <span>{isConnected ? '✅ Connected' : '⏳ Disconnected'}</span>
        </div>
        
        {connectedAt && (
          <div>
            <span className="font-medium">Connected at:</span> {connectedAt.toLocaleTimeString()}
          </div>
        )}
        
        <div>
          <span className="font-medium">User:</span> {session.user.email}
        </div>
        
        <div>
          <span className="font-medium">Role:</span> {session.user.role || 'USER'}
        </div>
        
        {error && (
          <div className="text-red-600 bg-red-50 p-2 rounded text-xs">
            {error}
          </div>
        )}
        
        <div className="text-xs text-gray-600 mt-2">
          Real-time status via WebSocket (no polling)
        </div>
      </div>
    </div>
  );
}
