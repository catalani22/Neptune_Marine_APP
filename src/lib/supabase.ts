import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uhmzdrpetrgwuxfodiaf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVobXpkcnBldHJnd3V4Zm9kaWFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTY3NjkyOCwiZXhwIjoyMDkxMjUyOTI4fQ.0XPLbJhe-JWRVpkXg1xVxXdnT808t_Og7JonYD2y9LA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
