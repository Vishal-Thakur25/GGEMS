'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  saveCenterAction,
  deleteCenterAction,
  toggleCenterStatusAction,
  updateCenterOrderAction,
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
  Building,
  Image as ImageIcon,
  BookOpen,
  Award,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

interface GalleryImageItem {
  id?: string;
  imageUrl: string;
  caption?: string;
  displayOrder?: number;
}

interface ProgrammeItem {
  id?: string;
  title: string;
  description: string;
  icon?: string;
}

interface CenterItem {
  id: string;
  name: string;
  slug: string;
  city: string;
  state?: string;
  address?: string;
  phone?: string;
  email?: string | null;
  facilities?: string;
  image?: string | null;
  googleMapsUrl?: string | null;
  status: 'DRAFT' | 'PUBLISHED';
  displayOrder: number;
  isFeatured?: boolean;

  // Extended Partner Page CMS fields
  category?: string | null;
  location?: string | null;
  shortDescription?: string | null;
  heroImage?: string | null;
  brochureUrl?: string | null;
  websiteUrl?: string | null;
  aboutLabel?: string | null;
  aboutHeading?: string | null;
  aboutDescription?: string | null;
  aboutImage?: string | null;
  videoUrl?: string | null;
  partnershipType?: string | null;
  sportsOffered?: string | null;
  studentEngagement?: string | null;
  programmesData?: string | null;
  testimonialQuote?: string | null;
  testimonialAuthor?: string | null;
  testimonialRole?: string | null;
  testimonialImage?: string | null;
  testimonialsData?: string | null;
  ctaLabel?: string | null;
  ctaHeading?: string | null;
  ctaDescription?: string | null;
  ctaBackgroundImage?: string | null;

  images?: GalleryImageItem[];
}

interface CentersManagerClientProps {
  initialCenters: any[];
}

export default function CentersManagerClient({ initialCenters }: CentersManagerClientProps) {
  const [centers, setCenters] = useState<CenterItem[]>(initialCenters);
  const [editingCenter, setEditingCenter] = useState<Partial<CenterItem> | null>(null);
  const [galleryList, setGalleryList] = useState<GalleryImageItem[]>([]);
  const [programmesList, setProgrammesList] = useState<ProgrammeItem[]>([]);
  const [activeTab, setActiveTab] = useState<'general' | 'about' | 'gallery' | 'programmes' | 'testimonial_cta'>('general');
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const openNewForm = () => {
    setEditingCenter({
      name: '',
      slug: '',
      category: 'SCHOOL PARTNER',
      city: 'Noida',
      state: 'Uttar Pradesh',
      location: 'Noida, Uttar Pradesh',
      address: 'Jaypee Greens Sports Complex, Sector 128',
      phone: '8826433044',
      shortDescription:
        'A leading educational institution committed to holistic development, with excellent sports facilities and a strong focus on student growth.',
      facilities: 'WSF Approved Squash Courts, Glass Back, Conditioning Center',
      heroImage: '/images/centers/center-jaypee.jpg',
      image: '/images/centers/center-jaypee.jpg',
      brochureUrl: '',
      websiteUrl: '',
      aboutLabel: 'ABOUT THE SCHOOL',
      aboutHeading: 'Excellence in Education & Sports',
      aboutDescription:
        'Reputed institution known for its academic excellence and state-of-the-art sports facilities. The school provides a nurturing environment where students learn, grow and explore their potential in academics as well as sports.\n\nIn collaboration with GGems Sports Academy, the school offers structured sports training programmes, especially in Squash and Badminton, helping students build essential skills, discipline and a healthy lifestyle.',
      aboutImage: '/images/about/story-squash-court.jpg',
      videoUrl: '',
      partnershipType: 'Sports Training Programme',
      sportsOffered: 'Squash, Badminton & Other Sports',
      studentEngagement: 'Regular Training & Competitions',
      testimonialQuote:
        'Our focus is on providing the best opportunities for our students in academics and sports. Our partnership with GGems Sports Academy has strengthened our sports ecosystem and inspired many young athletes to achieve their goals.',
      testimonialAuthor: 'School Representative',
      testimonialRole: 'Jaypee Public School & Club, Noida',
      testimonialImage: '/images/centers/representative-avatar.jpg',
      ctaLabel: 'PARTNER WITH US',
      ctaHeading: "Let's Build Brighter Futures",
      ctaDescription:
        'Collaborate with GGems Sports Academy to bring world-class sports training to your institution.',
      ctaBackgroundImage: '/images/about/cta-squash-racket-ball.jpg',
      googleMapsUrl: '',
      status: 'PUBLISHED',
      displayOrder: centers.length + 1,
      isFeatured: false,
    });

    setGalleryList([
      { imageUrl: '/images/centers/gallery-campus.jpg', caption: 'School Campus', displayOrder: 1 },
      { imageUrl: '/images/centers/gallery-squash.jpg', caption: 'Squash Facility', displayOrder: 2 },
      { imageUrl: '/images/centers/gallery-badminton.jpg', caption: 'Badminton Facility', displayOrder: 3 },
      { imageUrl: '/images/centers/gallery-fitness.jpg', caption: 'Fitness Area', displayOrder: 4 },
      { imageUrl: '/images/centers/gallery-club.jpg', caption: 'School Club', displayOrder: 5 },
    ]);

    setProgrammesList([
      { title: 'Squash Training', description: 'Structured coaching for all age groups.', icon: 'squash' },
      { title: 'Badminton Training', description: 'Skill development and match practice.', icon: 'badminton' },
      { title: 'Sports for All', description: 'Encouraging participation in multiple sports.', icon: 'users' },
      { title: 'Student Growth', description: 'Building discipline, fitness and confidence.', icon: 'growth' },
    ]);

    setActiveTab('general');
    setFeedback(null);
  };

  const openEditForm = (center: CenterItem) => {
    setEditingCenter({ ...center });

    // Populate gallery images
    if (center.images && center.images.length > 0) {
      setGalleryList([...center.images]);
    } else {
      setGalleryList([
        { imageUrl: '/images/centers/gallery-campus.jpg', caption: 'School Campus', displayOrder: 1 },
        { imageUrl: '/images/centers/gallery-squash.jpg', caption: 'Squash Facility', displayOrder: 2 },
      ]);
    }

    // Populate programmes
    if (center.programmesData) {
      try {
        const parsed = JSON.parse(center.programmesData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProgrammesList(parsed);
        } else {
          setProgrammesList([
            { title: 'Squash Training', description: 'Structured coaching for all age groups.', icon: 'squash' },
            { title: 'Badminton Training', description: 'Skill development and match practice.', icon: 'badminton' },
          ]);
        }
      } catch {
        setProgrammesList([]);
      }
    } else {
      setProgrammesList([
        { title: 'Squash Training', description: 'Structured coaching for all age groups.', icon: 'squash' },
        { title: 'Badminton Training', description: 'Skill development and match practice.', icon: 'badminton' },
        { title: 'Sports for All', description: 'Encouraging participation in multiple sports.', icon: 'users' },
        { title: 'Student Growth', description: 'Building discipline, fitness and confidence.', icon: 'growth' },
      ]);
    }

    setActiveTab('general');
    setFeedback(null);
  };

  // Upload an image via /api/upload
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onUploaded: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'centers');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload image');
      }

      onUploaded(data.url);
      setFeedback({ type: 'success', message: 'Image uploaded successfully!' });
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Image upload failed' });
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCenter) return;

    setLoading(true);
    setFeedback(null);

    // Merge programmes into JSON string
    const payload = {
      ...editingCenter,
      programmesData: JSON.stringify(programmesList),
      galleryImages: galleryList.map((g, idx) => ({
        id: g.id,
        imageUrl: g.imageUrl,
        caption: g.caption || '',
        displayOrder: idx + 1,
      })),
    };

    const res = await saveCenterAction(payload);
    if (res.success) {
      setFeedback({ type: 'success', message: 'Center saved successfully!' });
      setTimeout(() => {
        window.location.reload();
      }, 800);
    } else {
      setFeedback({
        type: 'error',
        message: res.error?.message || 'Failed to save center.',
      });
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    const res = await deleteCenterAction(id);
    if (res.success) {
      setCenters((prev) => prev.filter((c) => c.id !== id));
      setFeedback({ type: 'success', message: 'Center deleted successfully.' });
    } else {
      setFeedback({
        type: 'error',
        message: res.error?.message || 'Failed to delete center.',
      });
    }
    setLoading(false);
  };

  const handleToggleStatus = async (id: string, currentStatus: 'PUBLISHED' | 'DRAFT') => {
    const nextStatus = currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    const res = await toggleCenterStatusAction(id, nextStatus);
    if (res.success) {
      setCenters((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: nextStatus } : c))
      );
      setFeedback({
        type: 'success',
        message: `Center status set to ${nextStatus}.`,
      });
    } else {
      setFeedback({
        type: 'error',
        message: res.error?.message || 'Failed to change status.',
      });
    }
  };

  const handleOrderChange = async (id: string, currentOrder: number, delta: number) => {
    const newOrder = Math.max(0, currentOrder + delta);
    const res = await updateCenterOrderAction(id, newOrder);
    if (res.success) {
      setCenters((prev) =>
        prev
          .map((c) => (c.id === id ? { ...c, displayOrder: newOrder } : c))
          .sort((a, b) => a.displayOrder - b.displayOrder)
      );
    }
  };

  // Gallery Helpers
  const addGalleryItem = () => {
    setGalleryList((prev) => [
      ...prev,
      {
        imageUrl: '/images/centers/gallery-campus.jpg',
        caption: 'Facility Area',
        displayOrder: prev.length + 1,
      },
    ]);
  };

  const updateGalleryItem = (index: number, key: keyof GalleryImageItem, value: any) => {
    setGalleryList((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  };

  const removeGalleryItem = (index: number) => {
    setGalleryList((prev) => prev.filter((_, i) => i !== index));
  };

  // Programmes Helpers
  const addProgrammeItem = () => {
    setProgrammesList((prev) => [
      ...prev,
      {
        title: 'New Training Programme',
        description: 'Coaching and skills development.',
        icon: 'squash',
      },
    ]);
  };

  const updateProgrammeItem = (index: number, key: keyof ProgrammeItem, value: any) => {
    setProgrammesList((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  };

  const removeProgrammeItem = (index: number) => {
    setProgrammesList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight font-heading">
            Centers & School Partners ({centers.length})
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage individual center pages, hero details, facility galleries, programmes, and testimonials.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewForm}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#63D13F] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#45B52D] transition-colors cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Center</span>
        </button>
      </div>

      {/* Global Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center justify-between gap-2 border ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
              : 'bg-red-950/40 border-red-500/30 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#63D13F] shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modal / Full-Feature Drawer for Adding / Editing */}
      {editingCenter && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0F0F0F] border border-white/10 shadow-2xl relative">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono text-[#63D13F] font-bold uppercase tracking-wider block mb-1">
                {editingCenter.id ? 'EDITING CENTER CMS' : 'NEW CENTER CMS'}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white uppercase font-heading">
                {editingCenter.name || 'Untitled Center Partner'}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setEditingCenter(null)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-white/10 scrollbar-none text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('general')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                activeTab === 'general'
                  ? 'bg-[#63D13F] text-black shadow-xs'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>General & Hero</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                activeTab === 'about'
                  ? 'bg-[#63D13F] text-black shadow-xs'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Quick Info & About</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                activeTab === 'gallery'
                  ? 'bg-[#63D13F] text-black shadow-xs'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Facilities Gallery ({galleryList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('programmes')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                activeTab === 'programmes'
                  ? 'bg-[#63D13F] text-black shadow-xs'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Programmes ({programmesList.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('testimonial_cta')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                activeTab === 'testimonial_cta'
                  ? 'bg-[#63D13F] text-black shadow-xs'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Testimonial & CTA</span>
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            
            {/* TAB 1: GENERAL & HERO */}
            {activeTab === 'general' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Center Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingCenter.name || ''}
                      onChange={(e) => {
                        const name = e.target.value;
                        const slug = name
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/^-+|-+$/g, '');
                        setEditingCenter({
                          ...editingCenter,
                          name,
                          slug: editingCenter.id ? editingCenter.slug : slug,
                        });
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      URL Slug * (Unique)
                    </label>
                    <input
                      type="text"
                      required
                      value={editingCenter.slug || ''}
                      onChange={(e) =>
                        setEditingCenter({ ...editingCenter, slug: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Eyebrow / Category
                    </label>
                    <input
                      type="text"
                      value={editingCenter.category || ''}
                      onChange={(e) =>
                        setEditingCenter({ ...editingCenter, category: e.target.value })
                      }
                      placeholder="e.g. SCHOOL PARTNER or ACADEMY HUB"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingCenter.city || ''}
                      onChange={(e) =>
                        setEditingCenter({ ...editingCenter, city: e.target.value })
                      }
                      placeholder="e.g. Noida, New Delhi"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingCenter.state || ''}
                      onChange={(e) =>
                        setEditingCenter({ ...editingCenter, state: e.target.value })
                      }
                      placeholder="e.g. Uttar Pradesh, Delhi"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Hero Location Subtitle
                    </label>
                    <input
                      type="text"
                      value={editingCenter.location || ''}
                      onChange={(e) =>
                        setEditingCenter({ ...editingCenter, location: e.target.value })
                      }
                      placeholder="e.g. Noida, Uttar Pradesh"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Contact Phone
                    </label>
                    <input
                      type="text"
                      value={editingCenter.phone || ''}
                      onChange={(e) =>
                        setEditingCenter({ ...editingCenter, phone: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                    Hero Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingCenter.shortDescription || ''}
                    onChange={(e) =>
                      setEditingCenter({
                        ...editingCenter,
                        shortDescription: e.target.value,
                      })
                    }
                    placeholder="Short overview shown directly below title in Hero section"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                  />
                </div>

                {/* Hero Image Upload & URL */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-white uppercase tracking-wider">
                      Hero Image
                    </label>
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        className="hidden"
                        onChange={(e) =>
                          handleFileUpload(e, (url) => {
                            setEditingCenter({
                              ...editingCenter,
                              heroImage: url,
                              image: url,
                            });
                          })
                        }
                      />
                    </label>
                  </div>

                  <div className="flex gap-4 items-center">
                    <input
                      type="text"
                      value={editingCenter.heroImage || ''}
                      onChange={(e) =>
                        setEditingCenter({
                          ...editingCenter,
                          heroImage: e.target.value,
                          image: e.target.value,
                        })
                      }
                      placeholder="/images/centers/center-jaypee.jpg or https://..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    />
                    {editingCenter.heroImage && (
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden border border-white/20 bg-black shrink-0">
                        <Image
                          src={editingCenter.heroImage}
                          alt="Hero Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Brochure Download URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={editingCenter.brochureUrl || ''}
                      onChange={(e) =>
                        setEditingCenter({
                          ...editingCenter,
                          brochureUrl: e.target.value,
                        })
                      }
                      placeholder="e.g. /brochures/jaypee-sports.pdf"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Google Maps URL
                    </label>
                    <input
                      type="text"
                      value={editingCenter.googleMapsUrl || ''}
                      onChange={(e) =>
                        setEditingCenter({
                          ...editingCenter,
                          googleMapsUrl: e.target.value,
                        })
                      }
                      placeholder="https://maps.google.com/..."
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Status
                    </label>
                    <select
                      value={editingCenter.status || 'PUBLISHED'}
                      onChange={(e) =>
                        setEditingCenter({
                          ...editingCenter,
                          status: e.target.value as 'DRAFT' | 'PUBLISHED',
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    >
                      <option value="PUBLISHED">PUBLISHED (Live on Website)</option>
                      <option value="DRAFT">DRAFT (Hidden from Public)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={editingCenter.displayOrder ?? 0}
                      onChange={(e) =>
                        setEditingCenter({
                          ...editingCenter,
                          displayOrder: parseInt(e.target.value, 10) || 0,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: QUICK INFO & ABOUT */}
            {activeTab === 'about' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Quick Info Strip Fields */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                  <h4 className="text-xs font-bold text-[#63D13F] uppercase tracking-wider">
                    Quick Information Strip (4 Blocks)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Block 1: Location Text
                      </label>
                      <input
                        type="text"
                        value={editingCenter.location || ''}
                        onChange={(e) =>
                          setEditingCenter({
                            ...editingCenter,
                            location: e.target.value,
                          })
                        }
                        placeholder="Noida, Uttar Pradesh / Sector 128"
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Block 2: Partnership Type
                      </label>
                      <input
                        type="text"
                        value={editingCenter.partnershipType || ''}
                        onChange={(e) =>
                          setEditingCenter({
                            ...editingCenter,
                            partnershipType: e.target.value,
                          })
                        }
                        placeholder="Sports Training Programme"
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Block 3: Sports Offered
                      </label>
                      <input
                        type="text"
                        value={editingCenter.sportsOffered || ''}
                        onChange={(e) =>
                          setEditingCenter({
                            ...editingCenter,
                            sportsOffered: e.target.value,
                          })
                        }
                        placeholder="Squash, Badminton & Other Sports"
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Block 4: Student Engagement
                      </label>
                      <input
                        type="text"
                        value={editingCenter.studentEngagement || ''}
                        onChange={(e) =>
                          setEditingCenter({
                            ...editingCenter,
                            studentEngagement: e.target.value,
                          })
                        }
                        placeholder="Regular Training & Competitions"
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                      />
                    </div>
                  </div>
                </div>

                {/* About The School / Center Section */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                  <h4 className="text-xs font-bold text-[#63D13F] uppercase tracking-wider">
                    About The School / Center
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Section Eyebrow Label
                      </label>
                      <input
                        type="text"
                        value={editingCenter.aboutLabel || ''}
                        onChange={(e) =>
                          setEditingCenter({
                            ...editingCenter,
                            aboutLabel: e.target.value,
                          })
                        }
                        placeholder="ABOUT THE SCHOOL"
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        About Heading
                      </label>
                      <input
                        type="text"
                        value={editingCenter.aboutHeading || ''}
                        onChange={(e) =>
                          setEditingCenter({
                            ...editingCenter,
                            aboutHeading: e.target.value,
                          })
                        }
                        placeholder="Excellence in Education & Sports"
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                      About Description (supports multiple paragraphs)
                    </label>
                    <textarea
                      rows={5}
                      value={editingCenter.aboutDescription || ''}
                      onChange={(e) =>
                        setEditingCenter({
                          ...editingCenter,
                          aboutDescription: e.target.value,
                        })
                      }
                      placeholder="Detailed narrative about the partnership..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-[11px] font-semibold text-zinc-400 uppercase">
                          About Facility Image
                        </label>
                        <label className="text-[11px] text-[#63D13F] font-bold cursor-pointer hover:underline">
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            disabled={uploadingImage}
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e, (url) =>
                                setEditingCenter({ ...editingCenter, aboutImage: url })
                              )
                            }
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={editingCenter.aboutImage || ''}
                        onChange={(e) =>
                          setEditingCenter({
                            ...editingCenter,
                            aboutImage: e.target.value,
                          })
                        }
                        placeholder="/images/about/story-squash-court.jpg"
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Video Tour URL (Optional, e.g. YouTube)
                      </label>
                      <input
                        type="text"
                        value={editingCenter.videoUrl || ''}
                        onChange={(e) =>
                          setEditingCenter({
                            ...editingCenter,
                            videoUrl: e.target.value,
                          })
                        }
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                      School Official Website URL (CTA link)
                    </label>
                    <input
                      type="text"
                      value={editingCenter.websiteUrl || ''}
                      onChange={(e) =>
                        setEditingCenter({
                          ...editingCenter,
                          websiteUrl: e.target.value,
                        })
                      }
                      placeholder="https://jaypeeschools.edu.in"
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: GALLERY */}
            {activeTab === 'gallery' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Campus & Facilities Images ({galleryList.length})
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      These appear in the dark horizontal facilities gallery shown in the reference.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addGalleryItem}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#63D13F] text-black font-extrabold text-xs uppercase cursor-pointer hover:bg-[#45B52D] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Image</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                  {galleryList.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 flex flex-col sm:flex-row items-center gap-3"
                    >
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-white/10 bg-black shrink-0">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.caption || 'Facility'}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-600">
                            <ImageIcon className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                        <div>
                          <input
                            type="text"
                            value={item.caption || ''}
                            onChange={(e) =>
                              updateGalleryItem(idx, 'caption', e.target.value)
                            }
                            placeholder="Caption (e.g. School Campus, Squash Facility)"
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                          />
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={item.imageUrl}
                            onChange={(e) =>
                              updateGalleryItem(idx, 'imageUrl', e.target.value)
                            }
                            placeholder="Image URL"
                            className="flex-1 px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                          />
                          <label className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer shrink-0 flex items-center">
                            <Upload className="w-3 h-3" />
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploadingImage}
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, (url) =>
                                  updateGalleryItem(idx, 'imageUrl', url)
                                )
                              }
                            />
                          </label>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeGalleryItem(idx)}
                        className="p-2 rounded-lg bg-red-950/40 hover:bg-red-950 text-red-400 transition-colors cursor-pointer self-end sm:self-auto shrink-0"
                        title="Delete image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: PROGRAMMES */}
            {activeTab === 'programmes' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Sports Programmes At This Center ({programmesList.length})
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Displayed as the 4 clean cards on white background with sports icons.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addProgrammeItem}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#63D13F] text-black font-extrabold text-xs uppercase cursor-pointer hover:bg-[#45B52D] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Programme</span>
                  </button>
                </div>

                <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                  {programmesList.map((prog, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-zinc-900 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-3"
                    >
                      <div className="w-full sm:w-36 shrink-0">
                        <label className="block text-[10px] text-zinc-400 uppercase font-mono mb-1">
                          Icon Type
                        </label>
                        <select
                          value={prog.icon || 'squash'}
                          onChange={(e) =>
                            updateProgrammeItem(idx, 'icon', e.target.value)
                          }
                          className="w-full px-2.5 py-1.5 rounded-lg bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                        >
                          <option value="squash">Squash Racket</option>
                          <option value="badminton">Badminton Shuttle</option>
                          <option value="users">Sports For All (Group)</option>
                          <option value="growth">Student Growth (Trend)</option>
                          <option value="trophy">Trophy</option>
                        </select>
                      </div>

                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                        <div>
                          <label className="block text-[10px] text-zinc-400 uppercase font-mono mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            value={prog.title}
                            onChange={(e) =>
                              updateProgrammeItem(idx, 'title', e.target.value)
                            }
                            placeholder="Programme Title"
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-zinc-400 uppercase font-mono mb-1">
                            Description
                          </label>
                          <input
                            type="text"
                            value={prog.description}
                            onChange={(e) =>
                              updateProgrammeItem(idx, 'description', e.target.value)
                            }
                            placeholder="Short description"
                            className="w-full px-3 py-1.5 rounded-lg bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeProgrammeItem(idx)}
                        className="p-2 rounded-lg bg-red-950/40 hover:bg-red-950 text-red-400 transition-colors cursor-pointer self-end sm:self-auto shrink-0 mt-3 sm:mt-0"
                        title="Delete programme"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: TESTIMONIAL & CTA */}
            {activeTab === 'testimonial_cta' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Testimonial Section Fields */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                  <h4 className="text-xs font-bold text-[#63D13F] uppercase tracking-wider">
                    School Partner Testimonial
                  </h4>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                      Testimonial Quote *
                    </label>
                    <textarea
                      rows={3}
                      value={editingCenter.testimonialQuote || ''}
                      onChange={(e) =>
                        setEditingCenter({
                          ...editingCenter,
                          testimonialQuote: e.target.value,
                        })
                      }
                      placeholder="Quote from school representative..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Representative Name
                      </label>
                      <input
                        type="text"
                        value={editingCenter.testimonialAuthor || ''}
                        onChange={(e) =>
                          setEditingCenter({
                            ...editingCenter,
                            testimonialAuthor: e.target.value,
                          })
                        }
                        placeholder="e.g. School Representative"
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        Designation / School Name
                      </label>
                      <input
                        type="text"
                        value={editingCenter.testimonialRole || ''}
                        onChange={(e) =>
                          setEditingCenter({
                            ...editingCenter,
                            testimonialRole: e.target.value,
                          })
                        }
                        placeholder="e.g. Jaypee Public School & Club, Noida"
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase">
                        Representative Portrait Image
                      </label>
                      <label className="text-[11px] text-[#63D13F] font-bold cursor-pointer hover:underline">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploadingImage}
                          className="hidden"
                          onChange={(e) =>
                            handleFileUpload(e, (url) =>
                              setEditingCenter({
                                ...editingCenter,
                                testimonialImage: url,
                              })
                            )
                          }
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={editingCenter.testimonialImage || ''}
                      onChange={(e) =>
                        setEditingCenter({
                          ...editingCenter,
                          testimonialImage: e.target.value,
                        })
                      }
                      placeholder="/images/centers/representative-avatar.jpg"
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    />
                  </div>
                </div>

                {/* Final CTA Fields */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                  <h4 className="text-xs font-bold text-[#63D13F] uppercase tracking-wider">
                    Bottom Partner CTA Section
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        CTA Eyebrow Label
                      </label>
                      <input
                        type="text"
                        value={editingCenter.ctaLabel || ''}
                        onChange={(e) =>
                          setEditingCenter({
                            ...editingCenter,
                            ctaLabel: e.target.value,
                          })
                        }
                        placeholder="PARTNER WITH US"
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                        CTA Heading
                      </label>
                      <input
                        type="text"
                        value={editingCenter.ctaHeading || ''}
                        onChange={(e) =>
                          setEditingCenter({
                            ...editingCenter,
                            ctaHeading: e.target.value,
                          })
                        }
                        placeholder="Let's Build Brighter Futures"
                        className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                      CTA Description
                    </label>
                    <textarea
                      rows={2}
                      value={editingCenter.ctaDescription || ''}
                      onChange={(e) =>
                        setEditingCenter({
                          ...editingCenter,
                          ctaDescription: e.target.value,
                        })
                      }
                      placeholder="Collaborate with GGems Sports Academy..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-1">
                      CTA Background Image
                    </label>
                    <input
                      type="text"
                      value={editingCenter.ctaBackgroundImage || ''}
                      onChange={(e) =>
                        setEditingCenter({
                          ...editingCenter,
                          ctaBackgroundImage: e.target.value,
                        })
                      }
                      placeholder="/images/about/cta-squash-racket-ball.jpg"
                      className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#63D13F]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#63D13F] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#45B52D] transition-colors disabled:opacity-50 cursor-pointer shadow-md"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 stroke-[2.2]" />
                  )}
                  <span>Save Center CMS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setEditingCenter(null)}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              {editingCenter.slug && (
                <a
                  href={`/centers/${editingCenter.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#63D13F] font-semibold transition-colors"
                >
                  <span>Preview Live Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </form>
        </div>
      )}

      {/* Centers Table List */}
      <div className="rounded-3xl bg-[#0C0C0C] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-zinc-400 uppercase font-mono border-b border-white/10">
              <tr>
                <th className="p-4 w-16">Order</th>
                <th className="p-4">Center / School Partner</th>
                <th className="p-4">Location</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {centers.map((c) => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <span className="font-mono font-bold text-zinc-400 text-xs">
                        {String(c.displayOrder).padStart(2, '0')}
                      </span>
                      <div className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => handleOrderChange(c.id, c.displayOrder, -1)}
                          className="text-zinc-500 hover:text-white"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOrderChange(c.id, c.displayOrder, 1)}
                          className="text-zinc-500 hover:text-white"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-9 rounded-lg overflow-hidden border border-white/10 bg-black shrink-0">
                        <Image
                          src={c.heroImage || c.image || '/images/centers/center-jaypee.jpg'}
                          alt={c.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-white uppercase font-heading">{c.name}</p>
                        <span className="text-[11px] text-[#63D13F] font-mono">
                          /centers/{c.slug}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-zinc-300">
                    <p className="font-medium text-white">{c.city}</p>
                    <p className="text-[11px] text-zinc-500">{c.state || 'Delhi NCR'}</p>
                  </td>

                  <td className="p-4">
                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-bold uppercase tracking-wider">
                      {c.category || 'SCHOOL PARTNER'}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(c.id, c.status)}
                      className={`text-[10px] px-2.5 py-1 rounded-full font-mono font-bold uppercase cursor-pointer transition-all ${
                        c.status === 'PUBLISHED'
                          ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900'
                          : 'bg-zinc-800/80 border border-zinc-700 text-zinc-400 hover:bg-zinc-700'
                      }`}
                      title="Click to toggle status"
                    >
                      {c.status}
                    </button>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={`/centers/${c.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-[#63D13F] transition-colors"
                        title="View Live Center Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        type="button"
                        onClick={() => openEditForm(c)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
                        title="Edit Center CMS"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(c.id, c.name)}
                        className="p-2 rounded-lg bg-red-950/40 hover:bg-red-950 text-red-400 transition-colors cursor-pointer"
                        title="Delete Center"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
