'use server';

import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

// Setup secure server client
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
try {
  supabaseUrl = new URL(supabaseUrl).origin;
} catch (e) {}

// Use service_role key to safely bypass RLS checks on the server-side, falling back to anon key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

const supabaseServer = createClient(supabaseUrl, supabaseKey);

// Verification helper
function isAdminAuthenticated() {
  return cookies().get('inflo_session')?.value === 'active';
}

export async function fetchLeads() {
  if (!isAdminAuthenticated()) {
    throw new Error('Unauthorized access to administrative database.');
  }

  const { data, error } = await supabaseServer
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('DATABASE SERVER SELECT ERROR:', error.message);
    throw new Error(error.message);
  }

  return data || [];
}

export async function updateLeadStatus(leadId: string, newStatus: 'New' | 'Contacted' | 'Closed') {
  if (!isAdminAuthenticated()) {
    throw new Error('Unauthorized database write operation.');
  }

  const { data, error } = await supabaseServer
    .from('leads')
    .update({ status: newStatus })
    .eq('id', leadId)
    .select();

  if (error) {
    console.error('DATABASE SERVER UPDATE ERROR:', error.message);
    throw new Error(error.message);
  }

  return data;
}
