'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateThemeSettingsAction } from '@/server/actions/admin';
import { Save, Loader2, CheckCircle2, Palette, Shield, ExternalLink } from 'lucide-react';

interface ThemeSettingsProps {
  initialTheme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    surfaceColor: string;
    textColor: string;
    textMutedColor: string;
    borderColor: string;
    headingFont: string;
    bodyFont: string;
    borderRadius: string;
    buttonStyle: string;
    containerWidth: string;
  };
}

export default function ThemeManagerClient({ initialTheme }: ThemeSettingsProps) {
  const router = useRouter();
  const [theme, setTheme] = useState(initialTheme);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const res = await updateThemeSettingsAction(theme);
    if (res.success) {
      setFeedback('Global design tokens saved successfully! Refreshing live site...');
      router.refresh();
    } else {
      setFeedback(res.error?.message || 'Failed to update theme.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-zinc-300">
        <Shield className="w-5 h-5 text-[#FFE000] shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block uppercase mb-1">
            CSS Injection Protection Active:
          </strong>
          <span>
            All design tokens are strictly sanitized and validated against CSS color regexes.
            Arbitrary CSS code, scripts, or invalid values are rejected.
          </span>
        </div>
      </div>

      {feedback && (
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center gap-2 text-[#FFE000]">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Colors Palette */}
        <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FFE000] uppercase mb-6">
            <Palette className="w-4 h-4" />
            <span>Brand Colors & Surfaces (Hex/RGB/HSL)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Accent / Brand Volt
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.accentColor}
                  onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                  className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.accentColor}
                  onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                  className="flex-1 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Primary Dark Background
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                  className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                  className="flex-1 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Surface / Card Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.surfaceColor}
                  onChange={(e) => setTheme({ ...theme, surfaceColor: e.target.value })}
                  className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.surfaceColor}
                  onChange={(e) => setTheme({ ...theme, surfaceColor: e.target.value })}
                  className="flex-1 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Text Primary
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.textColor}
                  onChange={(e) => setTheme({ ...theme, textColor: e.target.value })}
                  className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.textColor}
                  onChange={(e) => setTheme({ ...theme, textColor: e.target.value })}
                  className="flex-1 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Border Accent Lines
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.borderColor}
                  onChange={(e) => setTheme({ ...theme, borderColor: e.target.value })}
                  className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={theme.borderColor}
                  onChange={(e) => setTheme({ ...theme, borderColor: e.target.value })}
                  className="flex-1 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Typography & Global Style Tokens */}
        <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 shadow-2xl">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-6">
            Typography & Component Design Tokens
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Heading Font Family
              </label>
              <select
                value={theme.headingFont}
                onChange={(e) => setTheme({ ...theme, headingFont: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white"
              >
                <option value="Inter">Inter (Clean Athletic)</option>
                <option value="Plus Jakarta Sans">Plus Jakarta Sans (Editorial Geometric)</option>
                <option value="Outfit">Outfit (High-Tech Sport)</option>
                <option value="Manrope">Manrope (Modern Executive)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Corner Border Radius
              </label>
              <select
                value={theme.borderRadius}
                onChange={(e) => setTheme({ ...theme, borderRadius: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white"
              >
                <option value="rounded-none">Sharp Corners (Technical)</option>
                <option value="rounded-md">Subtle Curve (rounded-md)</option>
                <option value="rounded-xl">Standard Curvature (rounded-xl)</option>
                <option value="rounded-2xl">Deep Curve (rounded-2xl)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Button Shape Style
              </label>
              <select
                value={theme.buttonStyle}
                onChange={(e) => setTheme({ ...theme, buttonStyle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white"
              >
                <option value="pill">Pill-Shaped Rounded Full</option>
                <option value="rounded">Rounded Modern</option>
                <option value="sharp">Sharp Rectangular</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Max Container Width
              </label>
              <select
                value={theme.containerWidth}
                onChange={(e) => setTheme({ ...theme, containerWidth: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white"
              >
                <option value="max-w-6xl">Compact (max-w-6xl)</option>
                <option value="max-w-7xl">Standard Luxury (1680px Laptop - max-w-7xl)</option>
                <option value="max-w-screen-2xl">Ultra Wide (max-w-screen-2xl)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FFE000] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#E6CA00] transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Apply Theme Tokens</span>
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#FFE000]" />
          </a>
        </div>
      </form>
    </div>
  );
}
