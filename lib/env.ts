// Environment variable validation for client-side
export const validateClientEnv = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!supabaseUrl || !supabaseAnonKey) {
    const missingVars = [];
    if (!supabaseUrl) missingVars.push('NEXT_PUBLIC_SUPABASE_URL');
    if (!supabaseAnonKey) missingVars.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
    
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env file and ensure these variables are set.'
    );
  }

  return {
    NEXT_PUBLIC_SUPABASE_URL: supabaseUrl,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: supabaseAnonKey,
    NEXT_PUBLIC_PAYPAL_CLIENT_ID: paypalClientId,
  };
};

// Environment variable validation for server-side
export const validateServerEnv = () => {
  const clientEnv = validateClientEnv();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const paypalClientSecret = process.env.PAYPAL_CLIENT_SECRET;

  // Validate PayPal Client Secret exists for server operations
  if (!paypalClientSecret && process.env.NODE_ENV === 'production') {
    console.warn('PAYPAL_CLIENT_SECRET not found - PayPal verification will fail');
  }

  return {
    ...clientEnv,
    SUPABASE_SERVICE_ROLE_KEY: serviceRoleKey,
    PAYPAL_CLIENT_SECRET: paypalClientSecret,
  };
};

// Check if we're on the server side
export const isServerSide = () => typeof window === 'undefined';

// Get environment variables based on context
export const getEnv = () => {
  if (isServerSide()) {
    return validateServerEnv();
  } else {
    return validateClientEnv();
  }
};

// Get optional environment variables (won't throw if missing)
export const getOptionalEnv = () => {
  try {
    return validateServerEnv();
  } catch (error) {
    console.warn('Some environment variables missing:', error);
    return {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
      PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
    };
  }
};

// Legacy function for backward compatibility
export const validateEnv = validateClientEnv;
