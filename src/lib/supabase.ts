import { createClient } from '@supabase/supabase-js';

// For client-side (Vite): use import.meta.env
// For server-side (Node.js scripts): use process.env
const getSupabaseUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_SUPABASE_URL || 'https://uhmzdrpetrgwuxfodiaf.supabase.co';
  }
  return process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://uhmzdrpetrgwuxfodiaf.supabase.co';
};

const getSupabaseKey = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  }
  return process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
};

const supabaseUrl = getSupabaseUrl();
const supabaseAnonKey = getSupabaseKey();

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;