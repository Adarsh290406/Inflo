import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { validateLead } from '@/lib/validation';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const errors = validateLead(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const { name, email, budget_range, message } = body;

    const { error } = await supabase.from('leads').insert([
      { name: name.trim(), email: email.trim(), budget_range, message: message?.trim() || '' }
    ]);

    if (error) {
      console.error('DATABASE INSERT ERROR in /api/leads:', error.message, error.details);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message || 'Server error' }, { status: 500 });
  }
}
