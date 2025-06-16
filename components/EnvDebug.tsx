'use client';

import { useEffect, useState } from 'react';

export function EnvDebug() {
  const [envStatus, setEnvStatus] = useState<{
    supabaseUrl: boolean;
    supabaseAnonKey: boolean;
    serviceRoleKey: boolean;
  }>({
    supabaseUrl: false,
    supabaseAnonKey: false,
    serviceRoleKey: false,
  });

  useEffect(() => {
    setEnvStatus({
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      serviceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    });
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50">
      <div className="font-bold mb-2">Environment Variables Status:</div>
      <div className={envStatus.supabaseUrl ? 'text-green-400' : 'text-red-400'}>
        NEXT_PUBLIC_SUPABASE_URL: {envStatus.supabaseUrl ? '✓' : '✗'}
      </div>
      <div className={envStatus.supabaseAnonKey ? 'text-green-400' : 'text-red-400'}>
        NEXT_PUBLIC_SUPABASE_ANON_KEY: {envStatus.supabaseAnonKey ? '✓' : '✗'}
      </div>
      <div className={envStatus.serviceRoleKey ? 'text-green-400' : 'text-yellow-400'}>
        SUPABASE_SERVICE_ROLE_KEY: {envStatus.serviceRoleKey ? '✓' : '✗ (not available in static export)'}
      </div>
    </div>
  );
}
