import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL) ||
  'https://uhmzdrpetrgwuxfodiaf.supabase.co';

const supabaseAnonKey =
  (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof process !== 'undefined' && (process.env?.VITE_SUPABASE_ANON_KEY || process.env?.SUPABASE_ANON_KEY)) ||
  '';

let _supabase: SupabaseClient;

try {
  if (!supabaseAnonKey) {
    throw new Error('VITE_SUPABASE_ANON_KEY is not set');
  }
  _supabase = createClient(supabaseUrl, supabaseAnonKey);
} catch {
  // Fallback: create client with a placeholder so the app mounts even without the key.
  // All Supabase queries will return errors gracefully instead of crashing the app.
  _supabase = createClient(supabaseUrl, 'placeholder-not-configured');
}

export const supabase = _supabase;
export default supabase;
