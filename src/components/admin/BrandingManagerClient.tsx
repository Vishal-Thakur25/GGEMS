'use client';

import { useState } from 'react';
import Image from 'next/image';
import { updateBrandLogosAction } from '@/server/actions/admin';
import { DEFAULT_HEADER_LOGO, SiteLogos } from '@/lib/logo';
import GGemsLogo from '@/components/layout/GGemsLogo';
import {
  Upload,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Copy,
  ExternalLink,
  Sparkles,
  Eye,
} from 'lucide-react';

interface BrandingManagerClientProps {
  initialLogos: SiteLogos;
  siteName?: string;
}

export default function BrandingManagerClient({
  initialLogos,
  siteName = 'GGems Sports Academy',
}: BrandingManagerClientProps) {
  const [headerLogo, setHeaderLogo] = useState<string>(initialLogos.headerLogo || '');
  const [footerLogo, setFooterLogo] = useState<string>(initialLogos.footerLogo || '');
  const [uploadingHeader, setUploadingHeader] = useState(false);
  const [uploadingFooter, setUploadingFooter] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleFileUpload = async (
    file: File,
    target: 'header' | 'footer'
  ) => {
    if (!file) return;

    // Instant local preview
    const objectUrl = URL.createObjectURL(file);
    if (target === 'header') {
      setHeaderLogo(objectUrl);
      setUploadingHeader(true);
    } else {
      setFooterLogo(objectUrl);
      setUploadingFooter(true);
    }

    setStatusMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'branding');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload logo image');
      }

      if (target === 'header') {
        setHeaderLogo(data.url);
      } else {
        setFooterLogo(data.url);
      }

      setStatusMessage({
        type: 'success',
        text: `${target === 'header' ? 'Header' : 'Footer'} logo uploaded successfully! Click "Save & Publish Logos" to save.`,
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Image upload failed. Please try again.',
      });
    } finally {
      if (target === 'header') setUploadingHeader(false);
      else setUploadingFooter(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    const res = await updateBrandLogosAction({
      headerLogo: headerLogo.trim() || null,
      footerLogo: footerLogo.trim() || null,
    });

    if (res.success) {
      setStatusMessage({
        type: 'success',
        text: 'Brand logos updated successfully! Navbar and Footer are now displaying your new logos.',
      });
    } else {
      setStatusMessage({
        type: 'error',
        text: res.error?.message || 'Failed to save brand logos.',
      });
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Status Notification Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 border transition-all ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/70 border-red-500/40 text-red-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
          )}
          <p className="text-sm font-medium">{statusMessage.text}</p>
        </div>
      )}

      {/* Main Grid: 2 Columns for Header & Footer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card 1: Header Logo (Light Theme Navbar) */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-[#6CD34A] flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white uppercase tracking-tight">
                    Header Navbar Logo
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Appears in top fixed navbar (light / transparent background)
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-zinc-300">
                LIGHT BG
              </span>
            </div>

            {/* Live Preview Box */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#6CD34A]" />
                <span>Live Navbar Preview</span>
              </label>
              <div className="w-full h-24 rounded-xl bg-white border border-zinc-200 flex items-center justify-between px-6 shadow-inner relative overflow-hidden">
                <div className="flex items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={headerLogo.trim() || DEFAULT_HEADER_LOGO}
                    alt={siteName}
                    className="h-10 sm:h-11 w-auto max-w-[220px] object-contain"
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_HEADER_LOGO;
                    }}
                  />
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-zinc-400">
                  <span className="px-2 py-1 rounded bg-zinc-100 text-zinc-700">Home</span>
                  <span className="px-2 py-1 text-zinc-500">About</span>
                  <span className="px-2 py-1 text-zinc-500">Programs</span>
                </div>
              </div>
            </div>

            {/* Upload Button */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                Upload New Image
              </label>
              <div className="flex items-center gap-3">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    className="hidden"
                    disabled={uploadingHeader}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'header');
                    }}
                  />
                  <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all">
                    {uploadingHeader ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#6CD34A]" />
                        <span>Uploading Logo...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-[#6CD34A]" />
                        <span>Select File from Device (PNG, SVG, WEBP)</span>
                      </>
                    )}
                  </div>
                </label>

                {headerLogo && (
                  <button
                    type="button"
                    onClick={() => setHeaderLogo('')}
                    title="Reset to default logo"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Direct URL input */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1.5">
                Or Direct Image URL
              </label>
              <input
                type="text"
                value={headerLogo}
                onChange={(e) => setHeaderLogo(e.target.value)}
                placeholder="/images/GGEMS_Sports_Academy_Logo.png"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-[#6CD34A] font-mono placeholder:text-zinc-600"
              />
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-white/5 text-[11px] text-zinc-500">
            Recommended size: <strong className="text-zinc-400">180×50px</strong> or high-res vector SVG with transparent background.
          </div>
        </div>

        {/* Card 2: Footer Logo (Dark Theme Footer) */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-[#6CD34A] flex items-center justify-center font-bold">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white uppercase tracking-tight">
                    Footer Logo
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Appears in bottom website footer (dark #0A0A0A background)
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-zinc-300">
                DARK BG
              </span>
            </div>

            {/* Live Preview Box */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#6CD34A]" />
                <span>Live Footer Preview</span>
              </label>
              <div className="w-full h-24 rounded-xl bg-[#0A0A0A] border border-white/15 flex items-center justify-between px-6 shadow-inner relative overflow-hidden">
                <div className="flex items-center">
                  {footerLogo.trim() ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={footerLogo.trim()}
                      alt={siteName}
                      className="h-10 sm:h-11 w-auto max-w-[220px] object-contain brightness-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <GGemsLogo variant="dark" />
                  )}
                </div>
                <div className="text-[11px] text-zinc-500 hidden sm:block">
                  Building stronger athletes...
                </div>
              </div>
            </div>

            {/* Upload Button & Action */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                Upload New Image
              </label>
              <div className="flex items-center gap-3">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    className="hidden"
                    disabled={uploadingFooter}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'footer');
                    }}
                  />
                  <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all">
                    {uploadingFooter ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#6CD34A]" />
                        <span>Uploading Logo...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-[#6CD34A]" />
                        <span>Select File from Device (PNG, SVG, WEBP)</span>
                      </>
                    )}
                  </div>
                </label>

                {headerLogo && (
                  <button
                    type="button"
                    onClick={() => setFooterLogo(headerLogo)}
                    title="Copy Header Logo to Footer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 text-xs"
                  >
                    <Copy className="w-4 h-4 text-[#6CD34A]" />
                    <span className="hidden sm:inline">Use Header Logo</span>
                  </button>
                )}

                {footerLogo && (
                  <button
                    type="button"
                    onClick={() => setFooterLogo('')}
                    title="Reset to default vector logo"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Direct URL input */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1.5">
                Or Direct Image URL
              </label>
              <input
                type="text"
                value={footerLogo}
                onChange={(e) => setFooterLogo(e.target.value)}
                placeholder="Leave blank to use default dark GGems logo"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-[#6CD34A] font-mono placeholder:text-zinc-600"
              />
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-white/5 text-[11px] text-zinc-500">
            Tip: For dark backgrounds, use a logo with white typography or lighter accent elements.
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-zinc-400">
          Changes will immediately take effect across all public pages.
        </div>

        <button
          type="submit"
          disabled={saving || uploadingHeader || uploadingFooter}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#6CD34A] hover:bg-[#4CAF35] text-black font-extrabold text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#6CD34A]/20 active:scale-[0.98] disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4 stroke-[2.5]" />
              <span>Save & Publish Logos</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
