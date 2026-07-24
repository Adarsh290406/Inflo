import { createClient } from '@supabase/supabase-js';

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
try {
  // Safely extract only the protocol + host, ignoring trailing slashes or subpaths like /rest/v1/
  supabaseUrl = new URL(supabaseUrl).origin;
} catch (e) {
  // Fallback if URL is invalid
}
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

