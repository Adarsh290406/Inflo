'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@digitalheroes.co');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        setError('Supabase connection parameters are not configured in environment variables.');
        setLoading(false);
        return;
      }

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      // Successfully signed in via Supabase Auth
      document.cookie = `inflo_session=active; path=/; max-age=86400`;
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-140px)] border-t border-black">
      {/* Left Column - Restricted Access Info */}
      <div className="bg-[#0E0E0E] text-[#F4EFE6] p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-r-2 border-black">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#F4EFE6]/60">
            § Access — Restricted
          </div>
          
          <h2 className="font-serif text-[42px] sm:text-[56px] md:text-[64px] leading-[0.95] mt-16 font-normal max-w-md">
            A quiet <br />
            <span className="italic text-[#E4572E]">back office</span> <br />
            for the pipeline.
          </h2>

          <p className="text-[#F4EFE6]/70 mt-8 max-w-sm text-sm leading-relaxed">
            Sign in to review inbound leads, update statuses, and keep every conversation moving forward. No bells, no whistles.
          </p>
        </div>

        <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#F4EFE6]/40 mt-12">
          Vol. 01 · Iss. 04 · Plate II
        </div>
      </div>

      {/* Right Column - Authentication Form */}
      <div className="bg-[#F4EFE6] text-[#0E0E0E] p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
        <div className="max-w-sm w-full mx-auto space-y-8">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/60">
              § Sign in
            </div>
            <h1 className="font-serif text-4xl mt-3 font-normal">
              Return to <span className="italic">Inflo.</span>
            </h1>
            <p className="text-black/60 text-xs mt-1.5">Enter your credentials to open a session.</p>
          </div>

          {error && (
            <div className="p-3.5 bg-[#E4572E]/10 border-2 border-[#E4572E] text-[#E4572E] text-xs font-mono uppercase tracking-wider">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/60 block mb-1">
                01 Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="brutal-input text-[15px]"
                required
              />
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/60 block mb-1">
                02 Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="brutal-input text-[15px]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-black hover:bg-[#E4572E] text-[#F4EFE6] font-mono text-xs uppercase tracking-[0.22em] py-4 transition-colors disabled:opacity-50"
            >
              {loading ? 'Opening Session...' : 'Open Session →'}
            </button>
          </form>

          <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-black/40 text-center pt-4">
            Security — Authorized Admin Session Only
          </div>
        </div>
      </div>
    </div>
  );
}
