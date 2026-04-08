import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uhmzdrpetrgwuxfodiaf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseAnonKey) {
  console.warn('⚠️ Supabase anon key not configured');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
