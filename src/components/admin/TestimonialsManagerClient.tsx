'use client';

import { useState } from 'react';
import {
  saveTestimonialAction,
  deleteTestimonialAction,
  toggleTestimonialStatusAction,
} from '@/server/actions/admin';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  CheckCircle2,
  Star,
  Quote,
  Upload,
  User,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';

export interface TestimonialItem {
  id: string;
  authorName: string;
  authorRole: string;
  athleteName?: string | null;
  quote: string;
  rating: number;
  avatarUrl?: string | null;
  displayOrder: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface TestimonialsManagerClientProps {
  initialTestimonials: any[];
}

export default function TestimonialsManagerClient({
  initialTestimonials,
}: TestimonialsManagerClientProps) {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialTestimonials);
  const [editingItem, setEditingItem] = useState<Partial<TestimonialItem> | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const openNewForm = () => {
    setEditingItem({
      authorName: '',
      authorRole: 'Parent of Junior Athlete',
      athleteName: '',
      quote: '',
      rating: 5,
      avatarUrl: '',
      displayOrder: testimonials.length + 1,
      status: 'PUBLISHED',
    });
    setFeedback(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setFeedback(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setEditingItem((prev) => (prev ? { ...prev, avatarUrl: data.url } : null));
        setFeedback({ type: 'success', message: 'Avatar image uploaded successfully!' });
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to upload image.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Error uploading image file.' });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (!editingItem.authorName?.trim()) {
      setFeedback({ type: 'error', message: 'Author name is required.' });
      return;
    }
    if (!editingItem.authorRole?.trim()) {
      setFeedback({ type: 'error', message: 'Author role is required.' });
      return;
    }
    if (!editingItem.quote?.trim()) {
      setFeedback({ type: 'error', message: 'Testimonial quote text is required.' });
      return;
    }

    setLoading(true);
    setFeedback(null);

    const payload = {
      ...editingItem,
      rating: Number(editingItem.rating) || 5,
      displayOrder: Number(editingItem.displayOrder) || 0,
    };

    const res = await saveTestimonialAction(payload);
    if (res.success && res.testimonial) {
      const saved = res.testimonial as TestimonialItem;
      if (editingItem.id) {
        setTestimonials((prev) => prev.map((t) => (t.id === saved.id ? saved : t)));
      } else {
        setTestimonials((prev) => [...prev, saved]);
      }
      setFeedback({ type: 'success', message: 'Testimonial saved and synced successfully!' });
      setEditingItem(null);
    } else {
      setFeedback({ type: 'error', message: res.error?.message || 'Failed to save testimonial.' });
    }
    setLoading(false);
  };

  const handleToggleStatus = async (item: TestimonialItem) => {
    setLoading(true);
    setFeedback(null);
    const res = await toggleTestimonialStatusAction(item.id, item.status);
    if (res.success && res.status) {
      setTestimonials((prev) =>
        prev.map((t) => (t.id === item.id ? { ...t, status: res.status as any } : t))
      );
      setFeedback({
        type: 'success',
        message: `Status updated to ${res.status}.`,
      });
    } else {
      setFeedback({ type: 'error', message: res.error?.message || 'Failed to toggle status.' });
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    setFeedback(null);
    const res = await deleteTestimonialAction(id);
    if (res.success) {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      setFeedback({ type: 'success', message: 'Testimonial deleted successfully.' });
    } else {
      setFeedback({ type: 'error', message: res.error?.message || 'Failed to delete testimonial.' });
    }
    setLoading(false);
  };

  const publishedCount = testimonials.filter((t) => t.status === 'PUBLISHED').length;

  return (
    <div className="space-y-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/60 p-6 rounded-2xl border border-white/5">
        <div>
          <h2 className="text-xl font-bold text-white uppercase flex items-center gap-2.5">
            <span>Verified Testimonials</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#63D13F]/20 text-[#63D13F] text-xs font-mono font-bold">
              {publishedCount} Published / {testimonials.length} Total
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Display reviews dynamically on the homepage carousel. Real stories from parents, athletes, and partners.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewForm}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#63D13F] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#52be2e] transition-colors shadow-lg shadow-[#63D13F]/20 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Testimonial</span>
        </button>
      </div>

      {/* Global Toast Feedback */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs font-semibold ${
            feedback.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
              : 'bg-red-950/60 border-red-800 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
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

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className={`p-6 rounded-2xl bg-zinc-900/80 border transition-all duration-300 flex flex-col justify-between group relative ${
              t.status === 'PUBLISHED'
                ? 'border-white/10 hover:border-[#63D13F]/50 shadow-md'
                : 'border-white/5 opacity-70 bg-zinc-950/60'
            }`}
          >
            <div>
              {/* Card Header: Rating & Status */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < t.rating
                          ? 'fill-[#FFE000] text-[#FFE000]'
                          : 'fill-zinc-700 text-zinc-700'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    Order: {t.displayOrder}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(t)}
                    title={`Click to ${t.status === 'PUBLISHED' ? 'unpublish' : 'publish'}`}
                    className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-colors ${
                      t.status === 'PUBLISHED'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}
                  >
                    {t.status === 'PUBLISHED' ? (
                      <>
                        <Eye className="w-3 h-3" />
                        <span>LIVE</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" />
                        <span>DRAFT</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quote */}
              <div className="relative mb-5">
                <Quote className="w-6 h-6 text-[#63D13F]/20 absolute -top-1 -left-1 pointer-events-none" />
                <p className="text-xs text-zinc-300 italic leading-relaxed pl-5 line-clamp-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            </div>

            {/* Author Footer */}
            <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                {t.avatarUrl ? (
                  <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-white/15">
                    <Image
                      src={t.avatarUrl}
                      alt={t.authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#63D13F]/20 text-[#63D13F] font-bold text-xs flex items-center justify-center shrink-0 border border-[#63D13F]/30">
                    {t.authorName.charAt(0)}
                  </div>
                )}

                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider truncate">
                    {t.authorName}
                  </h4>
                  <p className="text-[11px] text-[#63D13F] truncate">{t.authorRole}</p>
                  {t.athleteName && (
                    <p className="text-[10px] text-zinc-400 truncate">
                      Athlete: {t.athleteName}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingItem(t);
                    setFeedback(null);
                  }}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-colors"
                  title="Edit Testimonial"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(t.id)}
                  className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 transition-colors"
                  title="Delete Testimonial"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {testimonials.length === 0 && (
          <div className="col-span-full py-16 text-center bg-zinc-950/40 rounded-2xl border border-white/5">
            <Quote className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-white uppercase">No Testimonials Found</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
              Click &quot;Add New Testimonial&quot; above to add your first parent or athlete review.
            </p>
          </div>
        )}
      </div>

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111111] border border-white/15 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#63D13F]/20 text-[#63D13F] flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                    {editingItem.id ? 'Edit Testimonial' : 'Add New Testimonial'}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Authentic feedback to be featured on the GGEMS homepage carousel.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Author Name */}
                <div>
                  <label className="text-xs font-bold uppercase text-zinc-300 block mb-1.5 font-mono">
                    Author Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.authorName || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, authorName: e.target.value })
                    }
                    placeholder="e.g. Sunita Patel"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-[#63D13F]"
                  />
                </div>

                {/* Author Role */}
                <div>
                  <label className="text-xs font-bold uppercase text-zinc-300 block mb-1.5 font-mono">
                    Author Role / Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.authorRole || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, authorRole: e.target.value })
                    }
                    placeholder="e.g. Parent of Vedant Patel (India Rank - 08)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-[#63D13F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Athlete Name (Optional) */}
                <div>
                  <label className="text-xs font-bold uppercase text-zinc-300 block mb-1.5 font-mono">
                    Athlete Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={editingItem.athleteName || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, athleteName: e.target.value })
                    }
                    placeholder="e.g. Vedant Patel"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-[#63D13F]"
                  />
                </div>

                {/* Star Rating */}
                <div>
                  <label className="text-xs font-bold uppercase text-zinc-300 block mb-1.5 font-mono">
                    Star Rating (1 - 5)
                  </label>
                  <div className="flex items-center gap-2 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setEditingItem({ ...editingItem, rating: star })}
                        className="p-1 rounded hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= (editingItem.rating || 5)
                              ? 'fill-[#FFE000] text-[#FFE000]'
                              : 'fill-zinc-700 text-zinc-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs text-zinc-400 ml-2 font-mono">
                      {editingItem.rating || 5} Stars
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote / Review Text */}
              <div>
                <label className="text-xs font-bold uppercase text-zinc-300 block mb-1.5 font-mono">
                  Testimonial Quote / Review <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={editingItem.quote || ''}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, quote: e.target.value })
                  }
                  placeholder="Enter the full testimonial quote here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-[#63D13F] leading-relaxed resize-y"
                />
              </div>

              {/* Avatar Upload & URL */}
              <div>
                <label className="text-xs font-bold uppercase text-zinc-300 block mb-1.5 font-mono">
                  Author Avatar Photo (Optional)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-900 border border-white/15 shrink-0 flex items-center justify-center">
                    {editingItem.avatarUrl ? (
                      <Image
                        src={editingItem.avatarUrl}
                        alt="Avatar preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-zinc-500" />
                    )}
                  </div>

                  <input
                    type="text"
                    value={editingItem.avatarUrl || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, avatarUrl: e.target.value })
                    }
                    placeholder="https://... or upload photo"
                    className="flex-1 w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-[#63D13F]"
                  />

                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shrink-0 transition-colors">
                    {uploading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#63D13F]" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Display Order & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-bold uppercase text-zinc-300 block mb-1.5 font-mono">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingItem.displayOrder ?? 0}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        displayOrder: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-[#63D13F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-zinc-300 block mb-1.5 font-mono">
                    Visibility Status
                  </label>
                  <select
                    value={editingItem.status || 'PUBLISHED'}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        status: e.target.value as any,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-hidden focus:border-[#63D13F]"
                  >
                    <option value="PUBLISHED">PUBLISHED (Visible on Homepage)</option>
                    <option value="DRAFT">DRAFT (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  disabled={loading}
                  className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#63D13F] hover:bg-[#52be2e] text-black font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-[#63D13F]/25 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{editingItem.id ? 'Update Testimonial' : 'Create Testimonial'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
