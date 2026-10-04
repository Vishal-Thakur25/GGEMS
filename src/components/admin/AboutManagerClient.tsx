'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  createAboutSectionAction,
  updateAboutSectionAction,
  deleteAboutSectionAction,
  reorderAboutSectionsAction,
} from '@/server/actions/admin';
import {
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Save,
  Loader2,
  Trash2,
  Edit,
  Plus,
  Image as ImageIcon,
  Video as VideoIcon,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  X,
  Upload,
  Play,
  Layers,
  Sparkles,
  Link as LinkIcon,
  HelpCircle,
} from 'lucide-react';
import VideoModal, { parseVideoUrl } from '@/components/about/VideoModal';

export interface AboutSectionData {
  id: string;
  sectionType: string;
  title: string;
  subtitle?: string | null;
  content?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaUrl?: string | null;
  imageUrl?: string | null;
  videoUrl?: string | null;
  styleConfig?: string | null;
  displayOrder: number;
  isVisible: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface AboutManagerClientProps {
  initialSections: AboutSectionData[];
}

const SECTION_TYPE_OPTIONS = [
  { value: 'HERO', label: 'Hero Banner', desc: 'Main headline, sub-headline, enquiry button & video button' },
  { value: 'STORY', label: 'Our Story & Documentary', desc: 'Academy background, video player, and 3 feature badges' },
  { value: 'MISSION_VISION', label: 'Mission & Vision', desc: 'Dual-panel mission and vision statements with animated core' },
  { value: 'IMPACT', label: 'Our Impact & Statistics', desc: 'Dark statistics grid showing coaching years, players & trophies' },
  { value: 'VALUES', label: 'Core Values', desc: 'Interactive cards for discipline, excellence, integrity, community' },
  { value: 'FOUNDER', label: 'Founder Profile', desc: 'Gyanendra Prajapati portrait, bio paragraphs, and founder quote' },
  { value: 'TEAM', label: 'Coaches & Team Section', desc: 'Dynamic showcase of certified coaches & link to team page' },
  { value: 'CTA', label: 'Final Call To Action', desc: 'Large enquiry banner with direct call button & audience pills' },
  { value: 'CUSTOM', label: 'Custom Content Block', desc: 'Flexible section with heading, paragraphs, image/video & buttons' },
];

export default function AboutManagerClient({ initialSections }: AboutManagerClientProps) {
  const [sections, setSections] = useState<AboutSectionData[]>(initialSections);
  const [editingSection, setEditingSection] = useState<Partial<AboutSectionData> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AboutSectionData | null>(null);

  // Loading states
  const [saveLoading, setSaveLoading] = useState(false);
  const [reorderLoading, setReorderLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  // Video preview modal
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);

  // Toast / feedback state
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback(null);
    }, 4500);
  };

  // Reorder sections Up/Down
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const reordered = updated.map((sec, idx) => ({
      ...sec,
      displayOrder: idx + 1,
    }));

    setSections(reordered);
  };

  // Toggle Visibility
  const toggleVisibility = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isVisible: !s.isVisible } : s))
    );
  };

  // Save Layout & Order
  const handleSaveLayout = async () => {
    setReorderLoading(true);
    const payload = sections.map((s, idx) => ({
      id: s.id,
      displayOrder: idx + 1,
      isVisible: s.isVisible,
    }));

    const res = await reorderAboutSectionsAction(payload);
    if (res.success) {
      showToast('success', 'About Us layout order and visibility updated successfully!');
    } else {
      showToast('error', res.error?.message || 'Failed to update section layout.');
    }
    setReorderLoading(false);
  };

  // Open Edit Form
  const openEdit = (section: AboutSectionData) => {
    setIsNew(false);
    setEditingSection(JSON.parse(JSON.stringify(section)));
  };

  // Open Create Form
  const openCreate = () => {
    setIsNew(true);
    setEditingSection({
      sectionType: 'CUSTOM',
      title: '',
      subtitle: '',
      content: '',
      imageUrl: '',
      videoUrl: '',
      ctaLabel: '',
      ctaUrl: '',
      secondaryCtaLabel: '',
      secondaryCtaUrl: '',
      styleConfig: '',
      isVisible: true,
      displayOrder: sections.length + 1,
    });
  };

  // Upload image file
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingSection) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'about');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload image file');
      }

      setEditingSection({
        ...editingSection,
        imageUrl: data.url,
      });
      showToast('success', 'Image uploaded successfully!');
    } catch (err: any) {
      showToast('error', err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  // Upload video file
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingSection) return;

    setUploadingVideo(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'about');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload video file');
      }

      setEditingSection({
        ...editingSection,
        videoUrl: data.url,
      });
      showToast('success', 'Video uploaded successfully!');
    } catch (err: any) {
      showToast('error', err.message || 'Video upload failed');
    } finally {
      setUploadingVideo(false);
    }
  };

  // Save Section Changes (Create or Update)
  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection || !editingSection.title) {
      showToast('error', 'Section title is required.');
      return;
    }

    setSaveLoading(true);

    if (isNew) {
      const res = await createAboutSectionAction({
        sectionType: editingSection.sectionType || 'CUSTOM',
        title: editingSection.title,
        subtitle: editingSection.subtitle,
        content: editingSection.content,
        imageUrl: editingSection.imageUrl,
        videoUrl: editingSection.videoUrl,
        ctaLabel: editingSection.ctaLabel,
        ctaUrl: editingSection.ctaUrl,
        secondaryCtaLabel: editingSection.secondaryCtaLabel,
        secondaryCtaUrl: editingSection.secondaryCtaUrl,
        styleConfig: editingSection.styleConfig,
        isVisible: editingSection.isVisible ?? true,
        displayOrder: sections.length + 1,
      });

      if (res.success && res.section) {
        setSections([...sections, res.section as AboutSectionData]);
        showToast('success', 'New section created successfully!');
        setEditingSection(null);
      } else {
        showToast('error', res.error?.message || 'Failed to create section.');
      }
    } else {
      if (!editingSection.id) return;
      const res = await updateAboutSectionAction(editingSection.id, {
        sectionType: editingSection.sectionType,
        title: editingSection.title,
        subtitle: editingSection.subtitle,
        content: editingSection.content,
        imageUrl: editingSection.imageUrl,
        videoUrl: editingSection.videoUrl,
        ctaLabel: editingSection.ctaLabel,
        ctaUrl: editingSection.ctaUrl,
        secondaryCtaLabel: editingSection.secondaryCtaLabel,
        secondaryCtaUrl: editingSection.secondaryCtaUrl,
        styleConfig: editingSection.styleConfig,
        isVisible: editingSection.isVisible,
        displayOrder: editingSection.displayOrder,
      });

      if (res.success) {
        setSections((prev) =>
          prev.map((s) => (s.id === editingSection.id ? ({ ...s, ...editingSection } as AboutSectionData) : s))
        );
        showToast('success', 'Section updated successfully!');
        setEditingSection(null);
      } else {
        showToast('error', res.error?.message || 'Failed to update section.');
      }
    }

    setSaveLoading(false);
  };

  // Delete Section Confirmation
  const handleDeleteSection = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    const res = await deleteAboutSectionAction(deleteTarget.id);

    if (res.success) {
      setSections((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      showToast('success', `Deleted section "${deleteTarget.title}"`);
      setDeleteTarget(null);
    } else {
      showToast('error', res.error?.message || 'Failed to delete section.');
    }
    setDeleteLoading(false);
  };

  // Parsers and helpers for specialized fields in styleConfig & content
  const getMissionVisionForm = () => {
    let mv = {
      missionLabel: 'OUR MISSION',
      missionTitle: 'Empowering Young Athletes',
      missionText: 'To provide world-class coaching...',
      visionLabel: 'OUR VISION',
      visionTitle: 'A Healthier, Stronger Tomorrow',
      visionText: 'To be a leading sports academy...',
    };
    if (editingSection?.content) {
      try {
        const parsed = JSON.parse(editingSection.content);
        if (parsed.mission) {
          mv.missionLabel = parsed.mission.label || mv.missionLabel;
          mv.missionTitle = parsed.mission.title || mv.missionTitle;
          mv.missionText = parsed.mission.description || mv.missionText;
        }
        if (parsed.vision) {
          mv.visionLabel = parsed.vision.label || mv.visionLabel;
          mv.visionTitle = parsed.vision.title || mv.visionTitle;
          mv.visionText = parsed.vision.description || mv.visionText;
        }
      } catch {}
    }
    return mv;
  };

  const updateMissionVisionField = (field: string, val: string) => {
    const cur = getMissionVisionForm();
    const updated = { ...cur, [field]: val };
    const jsonStr = JSON.stringify({
      mission: {
        label: updated.missionLabel,
        title: updated.missionTitle,
        description: updated.missionText,
      },
      vision: {
        label: updated.visionLabel,
        title: updated.visionTitle,
        description: updated.visionText,
      },
    });
    setEditingSection((prev) => (prev ? { ...prev, content: jsonStr } : null));
  };

  const getFounderForm = () => {
    let f = {
      name: 'Gyanendra Prajapati',
      role: 'Founder & CEO',
      quote: 'Our goal is to create not just better players, but stronger individuals.',
    };
    if (editingSection?.styleConfig) {
      try {
        const parsed = JSON.parse(editingSection.styleConfig);
        f.name = parsed.name || f.name;
        f.role = parsed.role || f.role;
        f.quote = parsed.quote || f.quote;
      } catch {}
    }
    return f;
  };

  const updateFounderField = (field: string, val: string) => {
    const cur = getFounderForm();
    const updated = { ...cur, [field]: val };
    setEditingSection((prev) => (prev ? { ...prev, styleConfig: JSON.stringify(updated) } : null));
  };

  const getValuesList = (): Array<{ title: string; description: string; icon: string }> => {
    if (editingSection?.styleConfig) {
      try {
        const parsed = JSON.parse(editingSection.styleConfig);
        if (Array.isArray(parsed.values)) return parsed.values;
      } catch {}
    }
    return [
      { icon: 'dumbbell', title: 'Discipline', description: 'Building strong habits for long-term success.' },
      { icon: 'star', title: 'Excellence', description: 'Striving for continuous improvement.' },
      { icon: 'shield', title: 'Integrity', description: 'Promoting fair play and respect.' },
      { icon: 'users', title: 'Community & Support', description: 'Nurturing environment for every athlete.' },
    ];
  };

  const updateValuesList = (newValues: Array<{ title: string; description: string; icon: string }>) => {
    setEditingSection((prev) => (prev ? { ...prev, styleConfig: JSON.stringify({ values: newValues }) } : null));
  };

  const getStoryFeaturesList = (): Array<{ title: string; icon: string }> => {
    if (editingSection?.styleConfig) {
      try {
        const parsed = JSON.parse(editingSection.styleConfig);
        if (Array.isArray(parsed.features)) return parsed.features;
      } catch {}
    }
    return [
      { title: 'Structured Programmes', icon: 'book' },
      { title: 'Experienced Coaches', icon: 'users' },
      { title: 'Focus on Overall Development', icon: 'chart' },
    ];
  };

  const updateStoryFeaturesList = (newFeatures: Array<{ title: string; icon: string }>) => {
    setEditingSection((prev) => (prev ? { ...prev, styleConfig: JSON.stringify({ features: newFeatures }) } : null));
  };

  const getCtaAudienceList = (): Array<{ label: string; icon: string }> => {
    if (editingSection?.styleConfig) {
      try {
        const parsed = JSON.parse(editingSection.styleConfig);
        if (Array.isArray(parsed.audience)) return parsed.audience;
      } catch {}
    }
    return [
      { icon: 'graduation', label: 'For Students' },
      { icon: 'users', label: 'For Parents' },
      { icon: 'school', label: 'For Schools' },
      { icon: 'building', label: 'For Institutions' },
    ];
  };

  const updateCtaAudienceList = (newAudience: Array<{ label: string; icon: string }>) => {
    setEditingSection((prev) => (prev ? { ...prev, styleConfig: JSON.stringify({ audience: newAudience }) } : null));
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {feedback && (
        <div
          className={`fixed top-6 right-6 z-50 p-4 rounded-2xl border shadow-2xl flex items-center gap-3 text-xs font-semibold backdrop-blur-md transition-all ${
            feedback.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
              : 'bg-red-950/90 border-red-500/40 text-red-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Top Action Bar */}
      <div className="p-6 rounded-3xl bg-[#0C0C0C] border border-white/10 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FFE000]/10 border border-[#FFE000]/20 flex items-center justify-center text-[#FFE000]">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-tight">
              About Us Sections ({sections.length})
            </h2>
            <p className="text-xs text-zinc-400">
              {sections.filter((s) => s.isVisible).length} visible on live site •{' '}
              {sections.filter((s) => !s.isVisible).length} hidden
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-extrabold text-xs uppercase tracking-wider transition-colors border border-white/10"
          >
            <Plus className="w-4 h-4 text-[#FFE000]" />
            <span>Add New Section</span>
          </button>

          <button
            type="button"
            onClick={handleSaveLayout}
            disabled={reorderLoading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FFE000] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#E6CA00] transition-colors disabled:opacity-50 shadow-lg shadow-[#FFE000]/15"
          >
            {reorderLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>Save Order & Layout</span>
          </button>
        </div>
      </div>

      {/* Section List */}
      <div className="space-y-4">
        {sections.map((section, idx) => {
          const hasImage = Boolean(section.imageUrl);
          const hasVideo = Boolean(section.videoUrl);

          return (
            <div
              key={section.id}
              className={`p-5 rounded-3xl border transition-all ${
                section.isVisible
                  ? 'bg-[#0E0E0E] border-white/10 hover:border-white/20'
                  : 'bg-[#080808] border-white/5 opacity-60'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left Info */}
                <div className="flex items-start gap-4">
                  {/* Sequence Number */}
                  <span className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-bold text-white flex items-center justify-center shrink-0 mt-0.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Media Thumbnail */}
                  <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                    {hasImage ? (
                      <Image
                        src={section.imageUrl!}
                        alt={section.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : hasVideo ? (
                      <div className="w-full h-full flex items-center justify-center text-[#FFE000] bg-zinc-950">
                        <VideoIcon className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono text-[#FFE000] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#FFE000]/10 border border-[#FFE000]/20">
                        {section.sectionType}
                      </span>

                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                          section.isVisible
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-red-950 text-red-400 border border-red-800'
                        }`}
                      >
                        {section.isVisible ? 'Visible' : 'Hidden'}
                      </span>

                      {hasImage && (
                        <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                          <ImageIcon className="w-3 h-3 text-sky-400" /> Image
                        </span>
                      )}

                      {hasVideo && (
                        <button
                          type="button"
                          onClick={() => setPreviewVideoUrl(section.videoUrl || null)}
                          className="text-[10px] text-[#FFE000] hover:underline font-mono flex items-center gap-1"
                        >
                          <Play className="w-3 h-3 fill-current" /> Video Attached
                        </button>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight">
                      {section.title}
                    </h3>

                    {section.subtitle && (
                      <p className="text-xs text-zinc-400 font-medium">
                        Eyebrow / Subtitle: <span className="text-zinc-200">{section.subtitle}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                  {/* Move Up */}
                  <button
                    type="button"
                    onClick={() => moveSection(idx, 'up')}
                    disabled={idx === 0}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>

                  {/* Move Down */}
                  <button
                    type="button"
                    onClick={() => moveSection(idx, 'down')}
                    disabled={idx === sections.length - 1}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  {/* Toggle Visibility */}
                  <button
                    type="button"
                    onClick={() => toggleVisibility(section.id)}
                    className={`p-2.5 rounded-xl transition-colors ${
                      section.isVisible
                        ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                        : 'bg-red-950/60 text-red-400 hover:bg-red-950'
                    }`}
                    title={section.isVisible ? 'Hide Section' : 'Show Section'}
                  >
                    {section.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  {/* Edit Section */}
                  <button
                    type="button"
                    onClick={() => openEdit(section)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5 text-[#FFE000]" />
                    <span>Edit</span>
                  </button>

                  {/* Delete Section */}
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(section)}
                    className="p-2.5 rounded-xl bg-red-950/30 hover:bg-red-950 text-red-400 transition-colors"
                    title="Delete Section"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* EDIT / CREATE DRAWER MODAL */}
      {editingSection && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#0F0F0F] rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-8 my-auto overflow-hidden max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
              <div>
                <span className="text-xs font-mono text-[#FFE000] uppercase font-bold tracking-widest block mb-1">
                  {isNew ? 'CREATE NEW SECTION' : 'EDIT SECTION CMS'}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  {isNew ? 'Add About Page Section' : editingSection.title || 'Edit Section'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditingSection(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleSaveSection} className="space-y-6 overflow-y-auto py-6 pr-2 flex-1 scrollbar-thin">
              {/* 1. Section Type & Visibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Section Type
                  </label>
                  <select
                    value={editingSection.sectionType || 'CUSTOM'}
                    onChange={(e) => setEditingSection({ ...editingSection, sectionType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                  >
                    {SECTION_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label} ({opt.value})
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    {SECTION_TYPE_OPTIONS.find((o) => o.value === editingSection.sectionType)?.desc}
                  </p>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Visibility on Live Website
                  </label>
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 h-[42px]">
                    <input
                      type="checkbox"
                      id="isVisibleToggle"
                      checked={editingSection.isVisible ?? true}
                      onChange={(e) => setEditingSection({ ...editingSection, isVisible: e.target.checked })}
                      className="w-4 h-4 rounded text-[#FFE000] focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="isVisibleToggle" className="text-xs text-zinc-300 font-semibold cursor-pointer">
                      {editingSection.isVisible ? 'Visible (Published on /about)' : 'Hidden (Draft Mode)'}
                    </label>
                  </div>
                </div>
              </div>

              {/* 2. Title & Eyebrow Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Section Title / Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingSection.title || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                    placeholder="e.g. Passion for Sports. Commitment to Excellence."
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Eyebrow / Subtitle / Label
                  </label>
                  <input
                    type="text"
                    value={editingSection.subtitle || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, subtitle: e.target.value })}
                    placeholder="e.g. OUR STORY or Building Stronger Athletes"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                  />
                </div>
              </div>

              {/* 3. Main Content Textarea (for standard or custom sections) */}
              {editingSection.sectionType !== 'MISSION_VISION' && (
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Main Description / Paragraph Content
                  </label>
                  <textarea
                    rows={4}
                    value={editingSection.content || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, content: e.target.value })}
                    placeholder="Enter paragraphs. Double line break creates a new paragraph."
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000] leading-relaxed font-sans"
                  />
                </div>
              )}

              {/* 4. MEDIA MANAGEMENT (IMAGE & VIDEO) */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#FFE000]" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Media Attachments (Image & Video)
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    Upload file or paste direct/embed URL
                  </span>
                </div>

                {/* Image Section */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                    Background / Featured Image
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <input
                      type="text"
                      value={editingSection.imageUrl || ''}
                      onChange={(e) => setEditingSection({ ...editingSection, imageUrl: e.target.value })}
                      placeholder="e.g. /images/about/story-squash-court.jpg or https://..."
                      className="flex-1 w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                    />

                    {/* Image Upload Button */}
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider cursor-pointer border border-white/10 shrink-0">
                      {uploadingImage ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5 text-[#FFE000]" />
                      )}
                      <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>

                    {editingSection.imageUrl && (
                      <button
                        type="button"
                        onClick={() => setEditingSection({ ...editingSection, imageUrl: '' })}
                        className="p-2.5 rounded-xl bg-red-950/40 text-red-400 hover:bg-red-950 transition-colors"
                        title="Remove Image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Image Preview Thumbnail */}
                  {editingSection.imageUrl && (
                    <div className="relative w-40 h-24 rounded-xl overflow-hidden border border-white/20 bg-zinc-950 mt-2">
                      <Image
                        src={editingSection.imageUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    </div>
                  )}
                </div>

                {/* Video Section */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Attached Video (YouTube, Vimeo, or MP4)
                    </label>
                    {editingSection.videoUrl && (
                      <button
                        type="button"
                        onClick={() => setPreviewVideoUrl(editingSection.videoUrl || null)}
                        className="text-[11px] font-bold text-[#FFE000] hover:underline flex items-center gap-1 font-mono"
                      >
                        <Play className="w-3 h-3 fill-current" /> Test Play Video
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <input
                      type="text"
                      value={editingSection.videoUrl || ''}
                      onChange={(e) => setEditingSection({ ...editingSection, videoUrl: e.target.value })}
                      placeholder="e.g. https://www.youtube.com/watch?v=... or /images/about/...mp4"
                      className="flex-1 w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                    />

                    {/* Video Upload Button */}
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider cursor-pointer border border-white/10 shrink-0">
                      {uploadingVideo ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5 text-[#FFE000]" />
                      )}
                      <span>{uploadingVideo ? 'Uploading...' : 'Upload Video File'}</span>
                      <input
                        type="file"
                        accept="video/mp4,video/webm"
                        onChange={handleVideoUpload}
                        disabled={uploadingVideo}
                        className="hidden"
                      />
                    </label>

                    {editingSection.videoUrl && (
                      <button
                        type="button"
                        onClick={() => setEditingSection({ ...editingSection, videoUrl: '' })}
                        className="p-2.5 rounded-xl bg-red-950/40 text-red-400 hover:bg-red-950 transition-colors"
                        title="Remove Video"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 5. Section Specific Custom Field Editors */}
              {/* A. MISSION & VISION */}
              {editingSection.sectionType === 'MISSION_VISION' && (() => {
                const mv = getMissionVisionForm();
                return (
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-5">
                    <span className="text-xs font-bold text-[#FFE000] uppercase tracking-wider block">
                      Mission & Vision Statements
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Mission */}
                      <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 space-y-3">
                        <span className="text-xs font-bold text-emerald-400 uppercase block">Mission Panel</span>
                        <input
                          type="text"
                          value={mv.missionLabel}
                          onChange={(e) => updateMissionVisionField('missionLabel', e.target.value)}
                          placeholder="Mission Eyebrow (OUR MISSION)"
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={mv.missionTitle}
                          onChange={(e) => updateMissionVisionField('missionTitle', e.target.value)}
                          placeholder="Mission Title"
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
                        />
                        <textarea
                          rows={3}
                          value={mv.missionText}
                          onChange={(e) => updateMissionVisionField('missionText', e.target.value)}
                          placeholder="Mission Description"
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
                        />
                      </div>

                      {/* Vision */}
                      <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 space-y-3">
                        <span className="text-xs font-bold text-sky-400 uppercase block">Vision Panel</span>
                        <input
                          type="text"
                          value={mv.visionLabel}
                          onChange={(e) => updateMissionVisionField('visionLabel', e.target.value)}
                          placeholder="Vision Eyebrow (OUR VISION)"
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={mv.visionTitle}
                          onChange={(e) => updateMissionVisionField('visionTitle', e.target.value)}
                          placeholder="Vision Title"
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
                        />
                        <textarea
                          rows={3}
                          value={mv.visionText}
                          onChange={(e) => updateMissionVisionField('visionText', e.target.value)}
                          placeholder="Vision Description"
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* B. FOUNDER DETAILS */}
              {editingSection.sectionType === 'FOUNDER' && (() => {
                const founder = getFounderForm();
                return (
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                    <span className="text-xs font-bold text-[#FFE000] uppercase tracking-wider block">
                      Founder Profile Details
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1">
                          Founder Full Name
                        </label>
                        <input
                          type="text"
                          value={founder.name}
                          onChange={(e) => updateFounderField('name', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1">
                          Founder Title / Role
                        </label>
                        <input
                          type="text"
                          value={founder.role}
                          onChange={(e) => updateFounderField('role', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-zinc-400 uppercase tracking-wider mb-1">
                        Highlighted Founder Quote
                      </label>
                      <textarea
                        rows={2}
                        value={founder.quote}
                        onChange={(e) => updateFounderField('quote', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white italic"
                      />
                    </div>
                  </div>
                );
              })()}

              {/* C. VALUES CARDS */}
              {editingSection.sectionType === 'VALUES' && (() => {
                const values = getValuesList();
                return (
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#FFE000] uppercase tracking-wider">
                        Core Values Cards ({values.length})
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateValuesList([
                            ...values,
                            { title: 'New Value', description: 'Value description', icon: 'star' },
                          ])
                        }
                        className="text-xs font-bold text-white hover:text-[#FFE000] flex items-center gap-1 font-mono uppercase"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Card
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {values.map((val, vIdx) => (
                        <div key={vIdx} className="p-4 rounded-xl bg-zinc-900 border border-white/10 space-y-2 relative">
                          <button
                            type="button"
                            onClick={() => updateValuesList(values.filter((_, i) => i !== vIdx))}
                            className="absolute top-3 right-3 text-red-400 hover:text-red-300"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="grid grid-cols-2 gap-2 pr-6">
                            <input
                              type="text"
                              value={val.title}
                              onChange={(e) => {
                                const copy = [...values];
                                copy[vIdx].title = e.target.value;
                                updateValuesList(copy);
                              }}
                              placeholder="Title"
                              className="px-2.5 py-1.5 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                            />
                            <select
                              value={val.icon}
                              onChange={(e) => {
                                const copy = [...values];
                                copy[vIdx].icon = e.target.value;
                                updateValuesList(copy);
                              }}
                              className="px-2.5 py-1.5 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                            >
                              <option value="dumbbell">Dumbbell</option>
                              <option value="star">Star</option>
                              <option value="shield">Shield</option>
                              <option value="users">Users</option>
                              <option value="heart">Heart</option>
                              <option value="trophy">Trophy</option>
                              <option value="award">Award</option>
                              <option value="zap">Zap</option>
                              <option value="target">Target</option>
                            </select>
                          </div>

                          <textarea
                            rows={2}
                            value={val.description}
                            onChange={(e) => {
                              const copy = [...values];
                              copy[vIdx].description = e.target.value;
                              updateValuesList(copy);
                            }}
                            placeholder="Description"
                            className="w-full px-2.5 py-1.5 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* D. STORY KEY FEATURES */}
              {editingSection.sectionType === 'STORY' && (() => {
                const feats = getStoryFeaturesList();
                return (
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#FFE000] uppercase tracking-wider">
                        Story Key Badges / Highlights ({feats.length})
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateStoryFeaturesList([...feats, { title: 'New Highlight', icon: 'check' }])
                        }
                        className="text-xs font-bold text-white hover:text-[#FFE000] flex items-center gap-1 font-mono uppercase"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Badge
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {feats.map((feat, fIdx) => (
                        <div key={fIdx} className="p-3 rounded-xl bg-zinc-900 border border-white/10 flex items-center gap-2">
                          <select
                            value={feat.icon}
                            onChange={(e) => {
                              const copy = [...feats];
                              copy[fIdx].icon = e.target.value;
                              updateStoryFeaturesList(copy);
                            }}
                            className="px-2 py-1.5 rounded bg-zinc-950 border border-white/10 text-[11px] text-white"
                          >
                            <option value="book">Book</option>
                            <option value="users">Users</option>
                            <option value="chart">Chart</option>
                            <option value="award">Award</option>
                            <option value="check">Check</option>
                          </select>

                          <input
                            type="text"
                            value={feat.title}
                            onChange={(e) => {
                              const copy = [...feats];
                              copy[fIdx].title = e.target.value;
                              updateStoryFeaturesList(copy);
                            }}
                            className="flex-1 px-2 py-1.5 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                          />

                          <button
                            type="button"
                            onClick={() => updateStoryFeaturesList(feats.filter((_, i) => i !== fIdx))}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* E. CTA TARGET AUDIENCE PILLS */}
              {editingSection.sectionType === 'CTA' && (() => {
                const aud = getCtaAudienceList();
                return (
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#FFE000] uppercase tracking-wider">
                        Audience Pillars ({aud.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCtaAudienceList([...aud, { label: 'For Community', icon: 'users' }])}
                        className="text-xs font-bold text-white hover:text-[#FFE000] flex items-center gap-1 font-mono uppercase"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Pillar
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {aud.map((item, aIdx) => (
                        <div key={aIdx} className="p-3 rounded-xl bg-zinc-900 border border-white/10 flex items-center gap-2">
                          <select
                            value={item.icon}
                            onChange={(e) => {
                              const copy = [...aud];
                              copy[aIdx].icon = e.target.value;
                              updateCtaAudienceList(copy);
                            }}
                            className="px-2 py-1.5 rounded bg-zinc-950 border border-white/10 text-[11px] text-white"
                          >
                            <option value="graduation">Graduation</option>
                            <option value="users">Users</option>
                            <option value="school">School</option>
                            <option value="building">Building</option>
                            <option value="star">Star</option>
                            <option value="trophy">Trophy</option>
                          </select>

                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) => {
                              const copy = [...aud];
                              copy[aIdx].label = e.target.value;
                              updateCtaAudienceList(copy);
                            }}
                            className="flex-1 px-2 py-1.5 rounded bg-zinc-950 border border-white/10 text-xs text-white"
                          />

                          <button
                            type="button"
                            onClick={() => updateCtaAudienceList(aud.filter((_, i) => i !== aIdx))}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* 6. CALL TO ACTION BUTTONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                {/* Primary CTA */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-white uppercase block">
                    Primary CTA Button
                  </span>
                  <input
                    type="text"
                    placeholder="Button Text (e.g. Enquire Now)"
                    value={editingSection.ctaLabel || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, ctaLabel: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Button Link (e.g. /contact)"
                    value={editingSection.ctaUrl || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, ctaUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
                  />
                </div>

                {/* Secondary CTA */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-white uppercase block">
                    Secondary CTA Button / Phone
                  </span>
                  <input
                    type="text"
                    placeholder="Secondary Button Text (e.g. Call Direct)"
                    value={editingSection.secondaryCtaLabel || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, secondaryCtaLabel: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Secondary URL or tel:8826433044"
                    value={editingSection.secondaryCtaUrl || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, secondaryCtaUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10 shrink-0">
                <button
                  type="button"
                  onClick={() => setEditingSection(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#FFE000] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#E6CA00] transition-colors disabled:opacity-50 shadow-lg shadow-[#FFE000]/15"
                >
                  {saveLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>{isNew ? 'Create Section' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#121212] rounded-3xl border border-red-500/30 p-6 sm:p-8 space-y-5 text-center shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-red-950/80 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto">
              <Trash2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                Delete About Section?
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Are you sure you want to permanently remove{' '}
                <span className="text-white font-bold">"{deleteTarget.title}"</span>?
                This section will no longer be visible on the public About Us page.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteSection}
                disabled={deleteLoading}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
              >
                {deleteLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                <span>Yes, Delete Section</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      <VideoModal
        isOpen={Boolean(previewVideoUrl)}
        onClose={() => setPreviewVideoUrl(null)}
        videoUrl={previewVideoUrl}
        title="Admin Video Preview"
      />
    </div>
  );
}
