import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Environment check:', {
  supabaseUrl: !!supabaseUrl,
  supabaseAnonKey: !!supabaseAnonKey,
  supabaseServiceKey: !!supabaseServiceKey,
  nodeEnv: process.env.NODE_ENV
});

if (!supabaseUrl || !supabaseAnonKey) {
  const missing = [];
  if (!supabaseUrl) missing.push('NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseAnonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  
  throw new Error(`Missing Supabase environment variables: ${missing.join(', ')}. Please check your .env file.`);
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// For admin operations (server-side only)
export const supabaseAdmin = (() => {
  if (!supabaseServiceKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY not found. Admin operations will use anon key with limited permissions.');
    return supabase;
  }
  
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
})();
