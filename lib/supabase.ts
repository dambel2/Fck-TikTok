import { createClient } from '@supabase/supabase-js';

// Wklej swoje dane z panelu Supabase:
const SUPABASE_URL = 'https://njsmuggziuntxzxsyhlo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qc211Z2d6aXVudHh6eHN5aGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyOTM2NTIsImV4cCI6MjA3MTg2OTY1Mn0.ohkrSMzK6vj8j0T1pRwZz6aZhNvvsHIZT1Ji57mtNco';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  }
);