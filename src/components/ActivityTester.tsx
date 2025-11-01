"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function ActivityTester() {
  const { data: session } = useSession();
  const [lastHeartbeat, setLastHeartbeat] = useState<Date | null>(null);
  const [heartbeatCount, setHeartbeatCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user) return;

    const updateActivity = async () => {
      try {
        const res = await fetch('/api/activity', { method: 'POST' });
        const data = await res.json();
        
        if (res.ok) {
          setLastHeartbeat(new Date());
          setHeartbeatCount(prev => prev + 1);
          setError(null);
          console.log('[ActivityTester] Heartbeat successful:', data);
        } else {
          setError(`Failed: ${res.status} - ${data.error || 'Unknown error'}`);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(`Error: ${message}`);
      }
    };

    // Initial update
    updateActivity();

    // Update every 10 seconds for testing
    const interval = setInterval(updateActivity, 10000);

    return () => clearInterval(interval);
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
      <h3 className="font-bold text-blue-900 mb-2">Activity Heartbeat Tester</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${lastHeartbeat ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
          <span className="font-medium">Status:</span>
          <span>{lastHeartbeat ? '✅ Active' : '⏳ Waiting...'}</span>
        </div>
        
        {lastHeartbeat && (
          <>
            <div>
              <span className="font-medium">Last heartbeat:</span> {lastHeartbeat.toLocaleTimeString()}
            </div>
            <div>
              <span className="font-medium">Total heartbeats:</span> {heartbeatCount}
            </div>
          </>
        )}
        
        {error && (
          <div className="text-red-600 bg-red-50 p-2 rounded text-xs">
            {error}
          </div>
        )}
        
        <div className="text-xs text-gray-600 mt-2">
          Heartbeat interval: 10 seconds (for testing)
        </div>
      </div>
    </div>
  );
}
