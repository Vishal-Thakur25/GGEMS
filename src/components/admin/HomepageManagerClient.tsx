'use client';

import { useState } from 'react';
import {
  updateHeroSectionAction,
  reorderHomepageSectionsAction,
  updatePageSectionContentAction,
} from '@/server/actions/admin';
import {
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Save,
  Loader2,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface HomepageManagerProps {
  initialHero: any;
  initialSections: any[];
}

export default function HomepageManagerClient({
  initialHero,
  initialSections,
}: HomepageManagerProps) {
  // Hero State
  const [hero, setHero] = useState(initialHero);
  const [heroLoading, setHeroLoading] = useState(false);
  const [heroFeedback, setHeroFeedback] = useState<string | null>(null);

  // Sections State
  const [sections, setSections] = useState(initialSections);
  const [sectionLoading, setSectionLoading] = useState(false);
  const [sectionFeedback, setSectionFeedback] = useState<string | null>(null);

  // Hero Save Handler
  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setHeroLoading(true);
    setHeroFeedback(null);

    const res = await updateHeroSectionAction(hero);
    if (res.success) {
      setHeroFeedback('Hero section banner updated successfully!');
    } else {
      setHeroFeedback(res.error?.message || 'Failed to update hero section.');
    }
    setHeroLoading(false);
  };

  // Move Section Up/Down
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Recalculate displayOrder
    const reordered = updated.map((sec, idx) => ({
      ...sec,
      displayOrder: idx + 1,
    }));

    setSections(reordered);
  };

  // Toggle Section Visibility
  const toggleVisibility = (index: number) => {
    const updated = [...sections];
    updated[index].isVisible = !updated[index].isVisible;
    setSections(updated);
  };

  // Save Sections Order & Visibility
  const handleSaveSections = async () => {
    setSectionLoading(true);
    setSectionFeedback(null);

    const payload = sections.map((s, idx) => ({
      id: s.id,
      displayOrder: idx + 1,
      isVisible: s.isVisible,
    }));

    const res = await reorderHomepageSectionsAction(payload);
    if (res.success) {
      setSectionFeedback('Homepage layout & section sequence updated successfully!');
    } else {
      setSectionFeedback(res.error?.message || 'Failed to update sections.');
    }
    setSectionLoading(false);
  };

  return (
    <div className="space-y-12">
      {/* 1. Hero CMS Section */}
      <div className="p-8 rounded-3xl bg-[#0C0C0C] border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono text-[#FFE000] uppercase font-bold tracking-widest block mb-1">
              HERO MANAGEMENT
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Homepage Hero Banner & Media
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                hero.isActive
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              {hero.isActive ? 'Active on Live' : 'Hidden'}
            </span>
          </div>
        </div>

        {heroFeedback && (
          <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center gap-2 text-[#FFE000]">
            <CheckCircle2 className="w-4 h-4" />
            <span>{heroFeedback}</span>
          </div>
        )}

        <form onSubmit={handleSaveHero} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Eyebrow Badge Text
              </label>
              <input
                type="text"
                value={hero.badgeText}
                onChange={(e) => setHero({ ...hero, badgeText: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Hero Headline
              </label>
              <input
                type="text"
                value={hero.headline}
                onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Sub-Headline
              </label>
              <input
                type="text"
                value={hero.subHeadline}
                onChange={(e) => setHero({ ...hero, subHeadline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Call Now Direct Phone
              </label>
              <input
                type="text"
                value={hero.callNowPhone}
                onChange={(e) => setHero({ ...hero, callNowPhone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Hero Description Text
            </label>
            <textarea
              rows={3}
              value={hero.description}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
            />
          </div>

          {/* Media Switcher: Image vs Video */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Hero Background Media
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setHero({ ...hero, mediaType: 'IMAGE' })}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${
                    hero.mediaType === 'IMAGE'
                      ? 'bg-[#FFE000] text-black'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Image</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHero({ ...hero, mediaType: 'VIDEO' })}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${
                    hero.mediaType === 'VIDEO'
                      ? 'bg-[#FFE000] text-black'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Video</span>
                </button>
              </div>
            </div>

            {hero.mediaType === 'IMAGE' ? (
              <div>
                <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1">
                  Background Image URL
                </label>
                <input
                  type="text"
                  value={hero.imageUrl || ''}
                  onChange={(e) => setHero({ ...hero, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>
            ) : (
              <div>
                <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1">
                  Background Video MP4 URL
                </label>
                <input
                  type="text"
                  value={hero.videoUrl || ''}
                  onChange={(e) => setHero({ ...hero, videoUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-white uppercase block">Primary CTA</span>
              <input
                type="text"
                placeholder="Button Label"
                value={hero.primaryCtaText}
                onChange={(e) => setHero({ ...hero, primaryCtaText: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Button URL (/contact)"
                value={hero.primaryCtaUrl}
                onChange={(e) => setHero({ ...hero, primaryCtaUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
              />
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-white uppercase block">Secondary CTA</span>
              <input
                type="text"
                placeholder="Button Label"
                value={hero.secondaryCtaText}
                onChange={(e) => setHero({ ...hero, secondaryCtaText: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Button URL (/school-partnership)"
                value={hero.secondaryCtaUrl}
                onChange={(e) => setHero({ ...hero, secondaryCtaUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={heroLoading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFE000] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#E6CA00] transition-colors disabled:opacity-50"
          >
            {heroLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Hero Configuration</span>
          </button>
        </form>
      </div>

      {/* 2. Dynamic Homepage Sections Reorder & Toggle */}
      <div className="p-8 rounded-3xl bg-[#0C0C0C] border border-white/10 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-mono text-[#FFE000] uppercase font-bold tracking-widest block mb-1">
              SECTION SEQUENCING
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Homepage Layout & Order
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Reorder sections, toggle visibility, and control homepage layout without code changes.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSaveSections}
            disabled={sectionLoading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFE000] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#E6CA00] transition-colors disabled:opacity-50 self-start sm:self-auto"
          >
            {sectionLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Save Section Sequence</span>
          </button>
        </div>

        {sectionFeedback && (
          <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center gap-2 text-[#FFE000]">
            <CheckCircle2 className="w-4 h-4" />
            <span>{sectionFeedback}</span>
          </div>
        )}

        <div className="space-y-3">
          {sections.map((section, idx) => (
            <div
              key={section.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                section.isVisible
                  ? 'bg-zinc-900/60 border-white/10'
                  : 'bg-zinc-950/40 border-white/5 opacity-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-bold text-white flex items-center justify-center shrink-0">
                  0{idx + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#FFE000] uppercase font-bold">
                      {section.sectionType}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                        section.isVisible
                          ? 'bg-emerald-950 text-emerald-400'
                          : 'bg-red-950 text-red-400'
                      }`}
                    >
                      {section.isVisible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white uppercase mt-0.5">
                    {section.title}
                  </h3>
                </div>
              </div>

              {/* Actions: Move Up / Down, Toggle Visible */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => moveSection(idx, 'up')}
                  disabled={idx === 0}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(idx, 'down')}
                  disabled={idx === sections.length - 1}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleVisibility(idx)}
                  className={`p-2 rounded-lg transition-colors ${
                    section.isVisible
                      ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                      : 'bg-red-950/60 text-red-400 hover:bg-red-950'
                  }`}
                  title={section.isVisible ? 'Hide Section' : 'Show Section'}
                >
                  {section.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
