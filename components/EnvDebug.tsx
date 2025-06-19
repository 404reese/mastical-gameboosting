'use client';

import { useEffect, useState } from 'react';

export function EnvDebug() {
  const [envStatus, setEnvStatus] = useState<{
    supabaseUrl: boolean;
    supabaseAnonKey: boolean;
    serviceRoleKey: boolean;
    paypalClientId: boolean;
    paypalClientSecret: boolean;
  }>({
    supabaseUrl: false,
    supabaseAnonKey: false,
    serviceRoleKey: false,
    paypalClientId: false,
    paypalClientSecret: false,
  });
  useEffect(() => {
    setEnvStatus({
      supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      serviceRoleKey: false, // Not available on client side
      paypalClientId: !!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
      paypalClientSecret: false, // Not available on client side
    });
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null; // Don't show in production
  }
  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-sm">
      <div className="font-bold mb-2">Environment Variables Status:</div>
      <div className={envStatus.supabaseUrl ? 'text-green-400' : 'text-red-400'}>
        NEXT_PUBLIC_SUPABASE_URL: {envStatus.supabaseUrl ? '✓' : '✗'}
      </div>
      <div className={envStatus.supabaseAnonKey ? 'text-green-400' : 'text-red-400'}>
        NEXT_PUBLIC_SUPABASE_ANON_KEY: {envStatus.supabaseAnonKey ? '✓' : '✗'}
      </div>      <div className={envStatus.serviceRoleKey ? 'text-green-400' : 'text-yellow-400'}>
        SUPABASE_SERVICE_ROLE_KEY: ✗ (server-side only)
      </div>
      <div className="border-t border-gray-600 my-2"></div>
      <div className={envStatus.paypalClientId ? 'text-green-400' : 'text-red-400'}>
        NEXT_PUBLIC_PAYPAL_CLIENT_ID: {envStatus.paypalClientId ? '✓' : '✗'}
      </div>
      <div className={envStatus.paypalClientSecret ? 'text-green-400' : 'text-yellow-400'}>
        PAYPAL_CLIENT_SECRET: ✗ (server-side only)
      </div>
    </div>
  );
}
