'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  saveProgramAction,
  deleteProgramAction,
} from '@/server/actions/admin';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Upload,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Layers,
  Sparkles,
  HelpCircle,
  Trophy,
  Dumbbell,
  Users,
  Video,
  Image as ImageIcon,
  Building,
  GraduationCap,
} from 'lucide-react';

export interface ProgramItem {
  id: string;
  title: string;
  slug: string;
  category?: string | null;
  ageGroup: string;
  skillLevel: string;
  duration: string;
  shortDescription: string;
  fullDescription: string;
  featuredImage?: string | null;
  trainingFocus: string;
  scheduleInfo?: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  displayOrder: number;
  isFeatured: boolean;

  // Extended Detail Page CMS Fields
  heroEyebrow?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroDescription?: string | null;
  heroImage?: string | null;
  heroVideo?: string | null;
  primaryCtaText?: string | null;
  primaryCtaLink?: string | null;
  secondaryCtaText?: string | null;
  secondaryCtaLink?: string | null;
  heroBadgesData?: string | null;

  highlightsTitle?: string | null;
  highlightsData?: string | null;

  overviewLabel?: string | null;
  overviewTitle?: string | null;
  overviewDescription?: string | null;
  overviewSecondaryDescription?: string | null;
  overviewImage?: string | null;
  overviewVideo?: string | null;
  overviewCtaText?: string | null;
  overviewCtaLink?: string | null;

  whoCanJoinTitle?: string | null;
  audienceData?: string | null;

  trainingStructureEyebrow?: string | null;
  trainingStructureTitle?: string | null;
  trainingStructureDescription?: string | null;
  stagesData?: string | null;

  facilitiesEyebrow?: string | null;
  facilitiesTitle?: string | null;
  facilitiesDescription?: string | null;
  facilitiesData?: string | null;

  testimonialEyebrow?: string | null;
  testimonialTitle?: string | null;
  testimonialsData?: string | null;

  faqEyebrow?: string | null;
  faqTitle?: string | null;
  faqDescription?: string | null;
  faqsData?: string | null;

  ctaLabel?: string | null;
  ctaTitle?: string | null;
  ctaDescription?: string | null;
  ctaBackgroundImage?: string | null;
  ctaPrimaryText?: string | null;
  ctaPrimaryLink?: string | null;
  ctaSecondaryText?: string | null;
  ctaSecondaryLink?: string | null;
  ctaAudienceLinks?: string | null;

  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
}

interface ProgramsManagerClientProps {
  initialPrograms: any[];
}

type TabType =
  | 'basic'
  | 'hero'
  | 'highlights_overview'
  | 'audience_stages'
  | 'facilities_testimonials'
  | 'faqs_cta_seo';

export default function ProgramsManagerClient({
  initialPrograms,
}: ProgramsManagerClientProps) {
  const [programs, setPrograms] = useState<ProgramItem[]>(initialPrograms);
  const [editingProgram, setEditingProgram] = useState<Partial<ProgramItem> | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [deleteTarget, setDeleteTarget] = useState<ProgramItem | null>(null);

  // Loading & Feedback states
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');

  const showToast = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback(null);
    }, 4500);
  };

  // Open Form to create new programme
  const openNewForm = () => {
    setEditingProgram({
      title: '',
      slug: '',
      category: 'Racket Sports',
      ageGroup: 'All Age Groups (Ages 6+)',
      skillLevel: 'Beginner to Advanced',
      duration: 'Ongoing Professional Batches',
      shortDescription: '',
      fullDescription: '',
      featuredImage: '/images/Dynamic-Squash-Court-Action.png',
      trainingFocus: 'Technical skills, agility footwork, strategy, and endurance.',
      scheduleInfo: 'Weekday & Weekend Batches Available',
      status: 'PUBLISHED',
      displayOrder: programs.length + 1,
      isFeatured: false,

      heroEyebrow: 'OUR PROGRAMME',
      heroTitle: '',
      heroSubtitle: 'Build Skills. Develop Discipline. Compete with Confidence.',
      heroDescription: '',
      heroImage: '/images/Dynamic-Squash-Court-Action.png',
      heroVideo: '',
      primaryCtaText: 'Enquire Now',
      primaryCtaLink: '/contact',
      secondaryCtaText: 'Watch Video',
      secondaryCtaLink: '',
      heroBadgesData: JSON.stringify([
        { icon: 'Users', title: 'For All Age Groups', subtitle: 'Beginner to Advanced' },
        { icon: 'Award', title: 'Professional Coaching', subtitle: 'Certified Coaches' },
        { icon: 'Layers', title: 'Individual & Group Training', subtitle: 'Flexible Batches' },
        { icon: 'Trophy', title: 'Tournament Exposure', subtitle: 'State, National & International' },
      ], null, 2),

      highlightsTitle: 'PROGRAMME HIGHLIGHTS',
      highlightsData: JSON.stringify([
        { id: 'h1', title: 'Technical Skills', description: 'Strong foundation with expert guidance.', icon: 'Activity', displayOrder: 1, published: true },
        { id: 'h2', title: 'Physical Fitness', description: 'Improve strength, speed and endurance.', icon: 'Dumbbell', displayOrder: 2, published: true },
        { id: 'h3', title: 'Mental Resilience', description: 'Build focus and competitive mindset.', icon: 'Brain', displayOrder: 3, published: true },
        { id: 'h4', title: 'Career Growth', description: 'Pathway to state, national and international level.', icon: 'TrendingUp', displayOrder: 4, published: true },
      ], null, 2),

      overviewLabel: 'PROGRAMME OVERVIEW',
      overviewTitle: '',
      overviewDescription: '',
      overviewSecondaryDescription: '',
      overviewImage: '/images/about/story-squash-court.jpg',
      overviewVideo: '',
      overviewCtaText: 'Join the Programme',
      overviewCtaLink: '/contact',

      whoCanJoinTitle: 'WHO CAN JOIN?',
      audienceData: JSON.stringify([
        { id: 'a1', title: 'Kids (6+ Years)', icon: 'Smile', published: true },
        { id: 'a2', title: 'School Students', icon: 'GraduationCap', published: true },
        { id: 'a3', title: 'College Students', icon: 'BookOpen', published: true },
        { id: 'a4', title: 'Working Professionals', icon: 'Briefcase', published: true },
        { id: 'a5', title: 'Competitive Players', icon: 'Trophy', published: true },
      ], null, 2),

      trainingStructureEyebrow: 'TRAINING STRUCTURE',
      trainingStructureTitle: 'A Step-by-Step Approach',
      trainingStructureDescription: 'Our structured developmental pathway ensures clear progression for every athlete.',
      stagesData: JSON.stringify([
        { id: 's1', stepNumber: '01', title: 'Beginner Level', description: 'Learn basics, technique and game rules.', icon: 'Footprints', displayOrder: 1, published: true },
        { id: 's2', stepNumber: '02', title: 'Intermediate Level', description: 'Skill development, match practice and strategy building.', icon: 'BarChart3', displayOrder: 2, published: true },
        { id: 's3', stepNumber: '03', title: 'Advanced Level', description: 'High-performance training and tournament preparation.', icon: 'Trophy', displayOrder: 3, published: true },
        { id: 's4', stepNumber: '04', title: 'Competitive Exposure', description: 'Opportunities in state, national and international tournaments.', icon: 'Medal', displayOrder: 4, published: true },
      ], null, 2),

      facilitiesEyebrow: 'OUR FACILITIES',
      facilitiesTitle: 'World-Class Training Environment',
      facilitiesDescription: 'World-class courts and conditioning zones.',
      facilitiesData: JSON.stringify([
        { id: 'f1', title: 'Squash Courts', description: 'WSF standard glass-back courts with maple hardwood flooring.', image: '/images/centers/gallery-squash.jpg', displayOrder: 1, published: true },
        { id: 'f2', title: 'Fitness Training', description: 'State-of-the-art conditioning zone with agility hurdles & cardio.', image: '/images/centers/gallery-fitness.jpg', displayOrder: 2, published: true },
        { id: 'f3', title: 'Training Sessions', description: 'Focused 1-on-1 coach drills and high-tempo tactical ghosting.', image: '/images/centers/hero-squash-court.jpg', displayOrder: 3, published: true },
        { id: 'f4', title: 'Group Classes', description: 'Dynamic group squads fostering competitive peer sparring.', image: '/images/centers/gallery-club.jpg', displayOrder: 4, published: true },
      ], null, 2),

      testimonialEyebrow: 'WHAT OUR PLAYERS SAY',
      testimonialTitle: 'Student Success Stories',
      testimonialsData: JSON.stringify([
        { id: 't1', name: 'Student', designation: 'Training Programme', organization: 'GGems Sports Academy', profileImage: '/images/centers/representative-avatar.jpg', quote: 'The training at GGems has helped me improve my game, fitness and confidence. The coaches are very supportive.', rating: 5, displayOrder: 1, published: true }
      ], null, 2),

      faqEyebrow: 'FREQUENTLY ASKED QUESTIONS',
      faqTitle: 'Quick Answers',
      faqDescription: 'Common questions about training and batches.',
      faqsData: JSON.stringify([
        { id: 'faq1', question: 'What age groups can join this programme?', answer: 'Our programmes welcome athletes from age 6 onwards, grouped by age and skill level.', displayOrder: 1, published: true },
        { id: 'faq2', question: 'Do you provide beginner level training?', answer: 'Yes! We have dedicated beginner tracks focusing on fundamental techniques and game rules.', displayOrder: 2, published: true },
        { id: 'faq3', question: 'Are there opportunities to participate in tournaments?', answer: 'Yes, we conduct internal tournaments and take athletes to state and national circuits.', displayOrder: 3, published: true }
      ], null, 2),

      ctaLabel: 'READY TO START?',
      ctaTitle: 'Take Your Game to the Next Level',
      ctaDescription: 'Join our sports programme and be part of a professional and supportive sporting community.',
      ctaBackgroundImage: '/images/about/cta-squash-racket-ball.jpg',
      ctaPrimaryText: 'Enquire Now',
      ctaPrimaryLink: '/contact',
      ctaSecondaryText: 'Call Now',
      ctaSecondaryLink: 'tel:8826433044',
      ctaAudienceLinks: JSON.stringify([
        { label: 'For Students', link: '/contact?type=student', icon: 'GraduationCap' },
        { label: 'For Parents', link: '/contact?type=parent', icon: 'Users' },
        { label: 'For Schools', link: '/school-partnership', icon: 'Building' },
        { label: 'For Institutions', link: '/contact?type=institution', icon: 'Landmark' },
      ], null, 2),

      metaTitle: '',
      metaDescription: '',
      ogImage: '/images/Dynamic-Squash-Court-Action.png',
    });
    setActiveTab('basic');
  };

  // Upload an image via /api/upload
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldKey: keyof ProgramItem
  ) => {
    const file = e.target.files?.[0];
    if (!file || !editingProgram) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'programs');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload image');
      }

      setEditingProgram((prev) => ({
        ...prev,
        [fieldKey]: data.url,
      }));
      showToast('success', 'Image uploaded successfully!');
    } catch (err: any) {
      showToast('error', err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  // Save Programme
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram) return;

    if (!editingProgram.title || !editingProgram.slug) {
      showToast('error', 'Title and Slug are required.');
      return;
    }

    setSaving(true);
    try {
      const res = await saveProgramAction(editingProgram);
      if (res.success) {
        showToast('success', 'Programme saved successfully!');
        setEditingProgram(null);
        window.location.reload();
      } else {
        showToast('error', res.error?.message || 'Failed to save programme.');
      }
    } catch (err: any) {
      showToast('error', err.message || 'An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  // Toggle published status quickly
  const togglePublish = async (program: ProgramItem) => {
    const newStatus = program.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      const res = await saveProgramAction({
        ...program,
        status: newStatus,
      });
      if (res.success) {
        setPrograms(
          programs.map((p) => (p.id === program.id ? { ...p, status: newStatus } : p))
        );
        showToast('success', `Programme marked as ${newStatus}.`);
      } else {
        showToast('error', res.error?.message || 'Failed to update status.');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Failed to update status.');
    }
  };

  // Move programme order Up or Down
  const moveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= programs.length) return;

    const updated = [...programs];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const reordered = updated.map((p, idx) => ({ ...p, displayOrder: idx + 1 }));
    setPrograms(reordered);

    // Save both
    await Promise.all([
      saveProgramAction({ ...reordered[index], displayOrder: index + 1 }),
      saveProgramAction({ ...reordered[targetIndex], displayOrder: targetIndex + 1 }),
    ]);
    showToast('success', 'Display order updated.');
  };

  // Delete Programme
  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      const res = await deleteProgramAction(deleteTarget.id);
      if (res.success) {
        setPrograms(programs.filter((p) => p.id !== deleteTarget.id));
        setDeleteTarget(null);
        showToast('success', 'Programme permanently deleted.');
      } else {
        showToast('error', res.error?.message || 'Failed to delete programme.');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete programme.');
    } finally {
      setDeleting(false);
    }
  };

  // Filter programmes
  const filteredPrograms = programs.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'PUBLISHED' && p.status === 'PUBLISHED') ||
      (statusFilter === 'DRAFT' && p.status !== 'PUBLISHED');
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-xs uppercase tracking-wider font-bold ${
            feedback.type === 'success'
              ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400'
              : 'bg-red-950/80 border border-red-500/40 text-red-400'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Control Top Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#111111] p-4 rounded-2xl border border-white/10">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, slug or sport..."
            className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-hidden focus:border-[#63D13F]"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs font-bold uppercase tracking-wider focus:outline-hidden"
          >
            <option value="ALL">All Status</option>
            <option value="PUBLISHED">Published Only</option>
            <option value="DRAFT">Draft Only</option>
          </select>

          <button
            type="button"
            onClick={openNewForm}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#63D13F] hover:bg-[#45B52D] text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Programme</span>
          </button>
        </div>
      </div>

      {/* Programmes List Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredPrograms.map((prog, idx) => (
          <div
            key={prog.id}
            className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group"
          >
            {/* Left: Thumbnail & Info */}
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                <Image
                  src={prog.heroImage || prog.featuredImage || '/images/Dynamic-Squash-Court-Action.png'}
                  alt={prog.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <span className="text-xs font-mono font-bold text-[#63D13F] uppercase">
                    #{prog.displayOrder}
                  </span>
                  <h3 className="text-base font-bold text-white uppercase tracking-tight group-hover:text-[#63D13F] transition-colors">
                    {prog.title}
                  </h3>
                  {prog.isFeatured && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase font-bold">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span className="font-mono text-zinc-500">/{prog.slug}</span>
                  <span>•</span>
                  <span>{prog.skillLevel}</span>
                  <span>•</span>
                  <span className="text-zinc-500">{prog.category || 'Racket Sports'}</span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t border-white/5 md:border-0">
              {/* Order Reorder Buttons */}
              <div className="flex items-center border border-white/10 rounded-xl overflow-hidden bg-black/40">
                <button
                  type="button"
                  onClick={() => moveOrder(idx, 'up')}
                  disabled={idx === 0}
                  className="p-2 hover:bg-white/10 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => moveOrder(idx, 'down')}
                  disabled={idx === programs.length - 1}
                  className="p-2 hover:bg-white/10 text-zinc-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Status Toggle */}
              <button
                type="button"
                onClick={() => togglePublish(prog)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  prog.status === 'PUBLISHED'
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                    : 'bg-zinc-800/60 text-zinc-400 border border-zinc-700'
                }`}
              >
                {prog.status === 'PUBLISHED' ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Draft</span>
                  </>
                )}
              </button>

              {/* Live Preview Button */}
              <Link
                href={`/programmes/${prog.slug}`}
                target="_blank"
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                title="View Live Page"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>

              {/* Edit Button */}
              <button
                type="button"
                onClick={() => {
                  setEditingProgram(prog);
                  setActiveTab('basic');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit CMS</span>
              </button>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => setDeleteTarget(prog)}
                className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-400 transition-colors cursor-pointer"
                title="Delete Programme"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredPrograms.length === 0 && (
          <div className="text-center py-16 bg-[#111111] rounded-2xl border border-white/10 text-zinc-400 text-xs">
            No programmes match your filter criteria.
          </div>
        )}
      </div>

      {/* Complete CMS Modal Editor */}
      {editingProgram && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-[#111111] border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div>
                <span className="text-[11px] font-mono text-[#63D13F] uppercase font-bold tracking-widest block">
                  PROGRAMME CMS EDITOR
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                  {editingProgram.id ? `Edit: ${editingProgram.title || 'Programme'}` : 'Create New Programme'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditingProgram(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 px-6 pt-3 border-b border-white/10 overflow-x-auto scrollbar-none bg-black/20">
              {[
                { id: 'basic', label: '1. General' },
                { id: 'hero', label: '2. Hero & Badges' },
                { id: 'highlights_overview', label: '3. Highlights & Overview' },
                { id: 'audience_stages', label: '4. Audience & Stages' },
                { id: 'facilities_testimonials', label: '5. Facilities & Reviews' },
                { id: 'faqs_cta_seo', label: '6. FAQs, CTA & SEO' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-4 py-3 border-b-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-[#63D13F] text-white bg-white/5'
                      : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Body */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* TAB 1: General Core Details */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Programme Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProgram.title || ''}
                        onChange={(e) =>
                          setEditingProgram({
                            ...editingProgram,
                            title: e.target.value,
                            slug: editingProgram.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-[#63D13F] focus:outline-hidden"
                        placeholder="e.g. Squash Training"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        URL Slug * (lowercase & hyphens)
                      </label>
                      <input
                        type="text"
                        required
                        value={editingProgram.slug || ''}
                        onChange={(e) =>
                          setEditingProgram({ ...editingProgram, slug: e.target.value.toLowerCase() })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:border-[#63D13F] focus:outline-hidden"
                        placeholder="e.g. squash-training"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        value={editingProgram.category || 'Racket Sports'}
                        onChange={(e) => setEditingProgram({ ...editingProgram, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-[#63D13F] focus:outline-hidden"
                        placeholder="e.g. Racket Sports"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Skill Level
                      </label>
                      <input
                        type="text"
                        value={editingProgram.skillLevel || 'Beginner to Advanced'}
                        onChange={(e) => setEditingProgram({ ...editingProgram, skillLevel: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-[#63D13F] focus:outline-hidden"
                        placeholder="e.g. Beginner to Advanced"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Age Group
                      </label>
                      <input
                        type="text"
                        value={editingProgram.ageGroup || 'All Age Groups (6+ Years)'}
                        onChange={(e) => setEditingProgram({ ...editingProgram, ageGroup: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-[#63D13F] focus:outline-hidden"
                        placeholder="e.g. All Age Groups (6+ Years)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Short Summary Description *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={editingProgram.shortDescription || ''}
                      onChange={(e) => setEditingProgram({ ...editingProgram, shortDescription: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-[#63D13F] focus:outline-hidden leading-relaxed"
                      placeholder="Concise overview description for cards and search snippets..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Publish Status
                      </label>
                      <select
                        value={editingProgram.status || 'PUBLISHED'}
                        onChange={(e) => setEditingProgram({ ...editingProgram, status: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-bold focus:border-[#63D13F] focus:outline-hidden"
                      >
                        <option value="PUBLISHED">Published (Live)</option>
                        <option value="DRAFT">Draft</option>
                        <option value="ARCHIVED">Archived</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Display Order
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={editingProgram.displayOrder ?? 0}
                        onChange={(e) => setEditingProgram({ ...editingProgram, displayOrder: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-[#63D13F] focus:outline-hidden"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-6">
                      <input
                        type="checkbox"
                        id="isFeaturedCheck"
                        checked={editingProgram.isFeatured || false}
                        onChange={(e) => setEditingProgram({ ...editingProgram, isFeatured: e.target.checked })}
                        className="w-5 h-5 rounded accent-[#63D13F] cursor-pointer"
                      />
                      <label htmlFor="isFeaturedCheck" className="text-xs font-bold uppercase tracking-wider text-white cursor-pointer">
                        Feature in Highlights
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Hero Section & Badges */}
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Hero Eyebrow
                      </label>
                      <input
                        type="text"
                        value={editingProgram.heroEyebrow || 'OUR PROGRAMME'}
                        onChange={(e) => setEditingProgram({ ...editingProgram, heroEyebrow: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-[#63D13F] focus:outline-hidden"
                        placeholder="OUR PROGRAMME"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Custom Hero Title (Optional override)
                      </label>
                      <input
                        type="text"
                        value={editingProgram.heroTitle || ''}
                        onChange={(e) => setEditingProgram({ ...editingProgram, heroTitle: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-[#63D13F] focus:outline-hidden"
                        placeholder="e.g. SQUASH TRAINING"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Hero Subtitle
                    </label>
                    <input
                      type="text"
                      value={editingProgram.heroSubtitle || ''}
                      onChange={(e) => setEditingProgram({ ...editingProgram, heroSubtitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-[#63D13F] focus:outline-hidden"
                      placeholder="Build Skills. Develop Discipline. Compete with Confidence."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Hero Detailed Narrative
                    </label>
                    <textarea
                      rows={3}
                      value={editingProgram.heroDescription || ''}
                      onChange={(e) => setEditingProgram({ ...editingProgram, heroDescription: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:border-[#63D13F] focus:outline-hidden leading-relaxed"
                    />
                  </div>

                  {/* Hero Media & Upload */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <span className="text-xs font-bold text-[#63D13F] uppercase tracking-wider block">
                      Hero Athlete Cutout Image
                    </span>

                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      <div className="relative w-36 h-24 rounded-xl overflow-hidden bg-black border border-white/10 shrink-0">
                        <Image
                          src={editingProgram.heroImage || editingProgram.featuredImage || '/images/Dynamic-Squash-Court-Action.png'}
                          alt="Hero preview"
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 w-full space-y-2">
                        <input
                          type="text"
                          value={editingProgram.heroImage || ''}
                          onChange={(e) => setEditingProgram({ ...editingProgram, heroImage: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono"
                          placeholder="/images/Dynamic-Squash-Court-Action.png"
                        />
                        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploadingImage ? 'Uploading...' : 'Upload Image File'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'heroImage')}
                            className="hidden"
                            disabled={uploadingImage}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Video & CTAs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Hero Video URL (YouTube, Vimeo, MP4)
                      </label>
                      <input
                        type="text"
                        value={editingProgram.heroVideo || ''}
                        onChange={(e) => setEditingProgram({ ...editingProgram, heroVideo: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono"
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-2">
                        Primary CTA Button Text & Link
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={editingProgram.primaryCtaText || 'Enquire Now'}
                          onChange={(e) => setEditingProgram({ ...editingProgram, primaryCtaText: e.target.value })}
                          className="px-3 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs"
                          placeholder="Enquire Now"
                        />
                        <input
                          type="text"
                          value={editingProgram.primaryCtaLink || '/contact'}
                          onChange={(e) => setEditingProgram({ ...editingProgram, primaryCtaLink: e.target.value })}
                          className="px-3 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono"
                          placeholder="/contact"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Overlaid Badges JSON Config */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                    <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                      Overlaid 4 Feature Badges (JSON)
                    </span>
                    <textarea
                      rows={5}
                      value={editingProgram.heroBadgesData || ''}
                      onChange={(e) => setEditingProgram({ ...editingProgram, heroBadgesData: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/10 text-emerald-400 font-mono text-xs focus:outline-hidden"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: Highlights & Overview */}
              {activeTab === 'highlights_overview' && (
                <div className="space-y-6">
                  {/* Highlights */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#63D13F] uppercase tracking-wider">
                        4 Programme Highlights Cards (JSON Array)
                      </span>
                    </div>
                    <textarea
                      rows={6}
                      value={editingProgram.highlightsData || ''}
                      onChange={(e) => setEditingProgram({ ...editingProgram, highlightsData: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/10 text-emerald-400 font-mono text-xs focus:outline-hidden"
                    />
                  </div>

                  {/* Overview Section */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-5">
                    <span className="text-xs font-bold text-[#63D13F] uppercase tracking-wider block">
                      Programme Overview Editorial Narrative
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                          Overview Label
                        </label>
                        <input
                          type="text"
                          value={editingProgram.overviewLabel || 'PROGRAMME OVERVIEW'}
                          onChange={(e) => setEditingProgram({ ...editingProgram, overviewLabel: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                          Overview Title
                        </label>
                        <input
                          type="text"
                          value={editingProgram.overviewTitle || ''}
                          onChange={(e) => setEditingProgram({ ...editingProgram, overviewTitle: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs"
                          placeholder="About Squash Training"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                        First Paragraph
                      </label>
                      <textarea
                        rows={3}
                        value={editingProgram.overviewDescription || ''}
                        onChange={(e) => setEditingProgram({ ...editingProgram, overviewDescription: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                        Second Paragraph
                      </label>
                      <textarea
                        rows={3}
                        value={editingProgram.overviewSecondaryDescription || ''}
                        onChange={(e) => setEditingProgram({ ...editingProgram, overviewSecondaryDescription: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs"
                      />
                    </div>

                    {/* Overview Image Upload */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                      <div className="relative w-32 h-20 rounded-xl overflow-hidden bg-black border border-white/10 shrink-0">
                        <Image
                          src={editingProgram.overviewImage || '/images/about/story-squash-court.jpg'}
                          alt="Overview preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 w-full space-y-2">
                        <input
                          type="text"
                          value={editingProgram.overviewImage || ''}
                          onChange={(e) => setEditingProgram({ ...editingProgram, overviewImage: e.target.value })}
                          className="w-full px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono"
                        />
                        <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase cursor-pointer">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Overview Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'overviewImage')}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Audience & Stages */}
              {activeTab === 'audience_stages' && (
                <div className="space-y-6">
                  {/* Who can join audience */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <span className="text-xs font-bold text-[#63D13F] uppercase tracking-wider block">
                      "WHO CAN JOIN?" Audience Cards (JSON Array)
                    </span>
                    <input
                      type="text"
                      value={editingProgram.whoCanJoinTitle || 'WHO CAN JOIN?'}
                      onChange={(e) => setEditingProgram({ ...editingProgram, whoCanJoinTitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-bold mb-2"
                      placeholder="WHO CAN JOIN?"
                    />
                    <textarea
                      rows={6}
                      value={editingProgram.audienceData || ''}
                      onChange={(e) => setEditingProgram({ ...editingProgram, audienceData: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/10 text-emerald-400 font-mono text-xs focus:outline-hidden"
                    />
                  </div>

                  {/* Training Structure Stages */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <span className="text-xs font-bold text-[#63D13F] uppercase tracking-wider block">
                      Training Structure - Step-by-Step Approach (JSON Array)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={editingProgram.trainingStructureEyebrow || 'TRAINING STRUCTURE'}
                        onChange={(e) => setEditingProgram({ ...editingProgram, trainingStructureEyebrow: e.target.value })}
                        className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs"
                        placeholder="TRAINING STRUCTURE"
                      />
                      <input
                        type="text"
                        value={editingProgram.trainingStructureTitle || 'A Step-by-Step Approach'}
                        onChange={(e) => setEditingProgram({ ...editingProgram, trainingStructureTitle: e.target.value })}
                        className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-bold"
                        placeholder="A Step-by-Step Approach"
                      />
                    </div>
                    <textarea
                      rows={6}
                      value={editingProgram.stagesData || ''}
                      onChange={(e) => setEditingProgram({ ...editingProgram, stagesData: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/10 text-emerald-400 font-mono text-xs focus:outline-hidden"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: Facilities & Testimonials */}
              {activeTab === 'facilities_testimonials' && (
                <div className="space-y-6">
                  {/* Facilities */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <span className="text-xs font-bold text-[#63D13F] uppercase tracking-wider block">
                      Our Facilities Gallery Cards (JSON Array)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={editingProgram.facilitiesEyebrow || 'OUR FACILITIES'}
                        onChange={(e) => setEditingProgram({ ...editingProgram, facilitiesEyebrow: e.target.value })}
                        className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs"
                      />
                      <input
                        type="text"
                        value={editingProgram.facilitiesTitle || 'World-Class Training Environment'}
                        onChange={(e) => setEditingProgram({ ...editingProgram, facilitiesTitle: e.target.value })}
                        className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-bold"
                      />
                    </div>
                    <textarea
                      rows={6}
                      value={editingProgram.facilitiesData || ''}
                      onChange={(e) => setEditingProgram({ ...editingProgram, facilitiesData: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/10 text-emerald-400 font-mono text-xs focus:outline-hidden"
                    />
                  </div>

                  {/* Testimonials */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <span className="text-xs font-bold text-[#63D13F] uppercase tracking-wider block">
                      Player Testimonials Carousel (JSON Array)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={editingProgram.testimonialEyebrow || 'WHAT OUR PLAYERS SAY'}
                        onChange={(e) => setEditingProgram({ ...editingProgram, testimonialEyebrow: e.target.value })}
                        className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs"
                      />
                      <input
                        type="text"
                        value={editingProgram.testimonialTitle || 'Student Success Stories'}
                        onChange={(e) => setEditingProgram({ ...editingProgram, testimonialTitle: e.target.value })}
                        className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-bold"
                      />
                    </div>
                    <textarea
                      rows={6}
                      value={editingProgram.testimonialsData || ''}
                      onChange={(e) => setEditingProgram({ ...editingProgram, testimonialsData: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/10 text-emerald-400 font-mono text-xs focus:outline-hidden"
                    />
                  </div>
                </div>
              )}

              {/* TAB 6: FAQs, Final CTA & SEO */}
              {activeTab === 'faqs_cta_seo' && (
                <div className="space-y-6">
                  {/* FAQs */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <span className="text-xs font-bold text-[#63D13F] uppercase tracking-wider block">
                      Frequently Asked Questions (JSON Array)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={editingProgram.faqEyebrow || 'FREQUENTLY ASKED QUESTIONS'}
                        onChange={(e) => setEditingProgram({ ...editingProgram, faqEyebrow: e.target.value })}
                        className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs"
                      />
                      <input
                        type="text"
                        value={editingProgram.faqTitle || 'Quick Answers'}
                        onChange={(e) => setEditingProgram({ ...editingProgram, faqTitle: e.target.value })}
                        className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-bold"
                      />
                    </div>
                    <textarea
                      rows={6}
                      value={editingProgram.faqsData || ''}
                      onChange={(e) => setEditingProgram({ ...editingProgram, faqsData: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/10 text-emerald-400 font-mono text-xs focus:outline-hidden"
                    />
                  </div>

                  {/* Final CTA */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <span className="text-xs font-bold text-[#63D13F] uppercase tracking-wider block">
                      Final Dark Cinematic CTA Banner
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={editingProgram.ctaLabel || 'READY TO START?'}
                        onChange={(e) => setEditingProgram({ ...editingProgram, ctaLabel: e.target.value })}
                        className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs"
                        placeholder="READY TO START?"
                      />
                      <input
                        type="text"
                        value={editingProgram.ctaTitle || 'Take Your Game to the Next Level'}
                        onChange={(e) => setEditingProgram({ ...editingProgram, ctaTitle: e.target.value })}
                        className="px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-bold"
                        placeholder="Take Your Game to the Next Level"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={editingProgram.ctaDescription || ''}
                      onChange={(e) => setEditingProgram({ ...editingProgram, ctaDescription: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs"
                      placeholder="Join our sports programme and be part of a professional sporting community."
                    />
                  </div>

                  {/* SEO Settings */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                      Search Engine Optimization (SEO Metadata)
                    </span>
                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        value={editingProgram.metaTitle || ''}
                        onChange={(e) => setEditingProgram({ ...editingProgram, metaTitle: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs"
                        placeholder="e.g. Squash Training | GGEMS Sports Academy"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                        Meta Description
                      </label>
                      <textarea
                        rows={2}
                        value={editingProgram.metaDescription || ''}
                        onChange={(e) => setEditingProgram({ ...editingProgram, metaDescription: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-xs"
                        placeholder="SEO meta description..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons Footer */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setEditingProgram(null)}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#63D13F] hover:bg-[#45B52D] text-black font-extrabold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer shadow-lg shadow-[#63D13F]/25"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save Programme</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-red-950/60 border border-red-800/40 text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">
                Delete Programme?
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Are you sure you want to permanently delete{' '}
                <span className="text-white font-bold">"{deleteTarget.title}"</span>?
                Its page (<span className="text-zinc-300 font-mono">/programmes/{deleteTarget.slug}</span>) will return 404.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
              >
                {deleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                <span>Yes, Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
