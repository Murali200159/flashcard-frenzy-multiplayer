import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase config missing. Using demo mode.');
  
  // Demo client for development
  supabase = {
    auth: {
      getUser: () => Promise.resolve({ data: { user: { id: 'demo-user', email: 'demo@example.com' } } }),
      signInWithPassword: () => Promise.resolve({ data: { user: { id: 'demo-user' } } }),
      signOut: () => Promise.resolve(),
      onAuthStateChange: (callback) => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    channel: (name) => ({
      on: () => ({ subscribe: () => ({}), unsubscribe: () => {} }),
      subscribe: () => ({}),
      send: () => Promise.resolve()
    }),
    removeChannel: () => {}
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('✅ Supabase connected successfully');
}

export { supabase };