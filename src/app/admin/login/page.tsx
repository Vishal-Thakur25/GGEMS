'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAdminAction } from '@/server/actions/admin';
import { Lock, Mail, ShieldAlert, Loader2, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await loginAdminAction({ email, password });
      if (res.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(res.error?.message || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setError('An unexpected system error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 court-grid-pattern opacity-20 pointer-events-none" />

      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#0C0C0C] border border-white/10 shadow-2xl relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#FFE000] p-1 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[#FFE000]/20">
            <div className="w-full h-full bg-black rounded-xl flex items-center justify-center font-black text-base text-[#FFE000]">
              GG
            </div>
          </div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            GGEMS CMS PORTAL
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Enterprise Security & Content Management
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ggemssquash.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE000] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE000] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#FFE000] hover:bg-[#E6CA00] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-[#FFE000]/20 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In To Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-[11px] text-zinc-500">
            Protected by Session-Level RBAC & Sliding Rate Limiting.
          </p>
        </div>
      </div>
    </div>
  );
}
