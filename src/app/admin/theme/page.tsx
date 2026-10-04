import { getCurrentAdmin } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getThemeSettings } from '@/server/queries';
import ThemeManagerClient from '@/components/admin/ThemeManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminThemePage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const theme = await getThemeSettings();

  const safeTheme = theme || {
    primaryColor: '#050505',
    secondaryColor: '#0B0B0B',
    accentColor: '#FFE000',
    backgroundColor: '#050505',
    surfaceColor: '#121212',
    textColor: '#FFFFFF',
    textMutedColor: '#888888',
    borderColor: '#1F1F1F',
    headingFont: 'Inter',
    bodyFont: 'Inter',
    borderRadius: 'rounded-xl',
    buttonStyle: 'pill',
    containerWidth: 'max-w-7xl',
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono text-[#FFE000] uppercase font-bold tracking-widest block mb-1">
          DESIGN SYSTEM
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          THEME & DESIGN TOKENS
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Customize brand palette, background tones, and typography tokens with strictly validated safety guardrails.
        </p>
      </div>

      <ThemeManagerClient initialTheme={safeTheme} />
    </div>
  );
}
