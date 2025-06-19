import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check if we're on the server side
const isServerSide = typeof window === 'undefined';

console.log('Supabase Environment check:', {
  supabaseUrl: !!supabaseUrl,
  supabaseAnonKey: !!supabaseAnonKey,
  supabaseServiceKey: !!supabaseServiceKey,
  isServerSide,
  nodeEnv: process.env.NODE_ENV
});

if (!supabaseUrl || !supabaseAnonKey) {
  const missing = [];
  if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseAnonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  
  throw new Error(`Missing Supabase environment variables: ${missing.join(', ')}. Please check your .env file.`);
}

// Main Supabase client for general use
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// For admin operations (server-side only)
export const supabaseAdmin = (() => {
  // Only show warning on server side where service key should be available
  if (isServerSide && !supabaseServiceKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY not found on server. Admin operations will use anon key with limited permissions.');
    return supabase;
  }
  
  // On client side, always use anon key
  if (!isServerSide) {
    return supabase;
  }
  
  // Server side with service key
  if (supabaseServiceKey) {
    return createClient<Database>(
      supabaseUrl,
      supabaseServiceKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }
  
  return supabase;
})();
