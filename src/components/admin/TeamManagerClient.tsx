'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import {
  saveTeamMemberAction,
  deleteTeamMemberAction,
  toggleTeamMemberStatusAction,
  updateTeamMemberOrderAction,
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
  Upload,
  ArrowUpDown,
  Search,
  ExternalLink,
  Eye,
  EyeOff,
  Instagram,
  Linkedin,
  Users,
} from 'lucide-react';

export interface AdminTeamMember {
  id: string;
  name: string;
  slug: string;
  role: string;
  designation?: string;
  experienceYears: number;
  qualifications: string;
  specialization: string;
  shortBio: string;
  fullBio: string;
  profileImage?: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'UNPUBLISHED' | 'ARCHIVED' | string;
  displayOrder: number;
  isFeatured: boolean;
  email?: string | null;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
}

interface TeamManagerClientProps {
  initialTeam: AdminTeamMember[];
}

export default function TeamManagerClient({ initialTeam }: TeamManagerClientProps) {
  const [team, setTeam] = useState<AdminTeamMember[]>(initialTeam);
  const [editingMember, setEditingMember] = useState<Partial<AdminTeamMember> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminTeamMember | null>(null);

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');

  const [, startTransition] = useTransition();

  const showToast = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => {
      setFeedback(null);
    }, 4500);
  };

  // Open Create Form
  const openNewForm = () => {
    const nextOrder =
      team.length > 0 ? Math.max(...team.map((m) => m.displayOrder || 0)) + 1 : 1;

    setEditingMember({
      name: '',
      slug: '',
      role: 'Squash Coach',
      experienceYears: 5,
      qualifications: 'Certified Squash Coach',
      specialization: 'Tactical Coaching & Footwork',
      shortBio: '',
      fullBio: '',
      profileImage: '',
      status: 'PUBLISHED',
      displayOrder: nextOrder,
      isFeatured: false,
      instagramUrl: '',
      linkedinUrl: '',
    });
    setFeedback(null);
  };

  // Auto-slugify when typing name (only for new members)
  const handleNameChange = (name: string) => {
    if (!editingMember) return;
    const isNew = !editingMember.id;
    const slug = isNew
      ? name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      : editingMember.slug;

    setEditingMember({
      ...editingMember,
      name,
      slug,
    });
  };

  // Image File Upload Handler
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingMember) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload image');
      }

      setEditingMember({
        ...editingMember,
        profileImage: data.url,
      });
      showToast('success', 'Image uploaded successfully!');
    } catch (err: any) {
      console.error('Upload failed:', err);
      showToast('error', err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  // Save / Update Member
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    setLoading(true);

    try {
      const payload = {
        id: editingMember.id,
        name: editingMember.name?.trim() || '',
        slug: editingMember.slug?.trim() || '',
        role: editingMember.role?.trim() || '',
        experienceYears: Number(editingMember.experienceYears) || 0,
        qualifications: editingMember.qualifications?.trim() || '',
        specialization: editingMember.specialization?.trim() || '',
        shortBio: editingMember.shortBio?.trim() || '',
        fullBio: editingMember.fullBio?.trim() || editingMember.shortBio?.trim() || '',
        profileImage: editingMember.profileImage || '',
        status: editingMember.status || 'PUBLISHED',
        displayOrder: Number(editingMember.displayOrder) || 0,
        isFeatured: Boolean(editingMember.isFeatured),
        instagramUrl: editingMember.instagramUrl || '',
        linkedinUrl: editingMember.linkedinUrl || '',
      };

      const res = await saveTeamMemberAction(payload);
      if (res.success) {
        showToast('success', editingMember.id ? 'Team member updated!' : 'Team member added!');
        setEditingMember(null);

        // Optimistically update local list or refresh
        startTransition(() => {
          if (editingMember.id) {
            setTeam((prev) =>
              prev.map((m) =>
                m.id === editingMember.id ? ({ ...m, ...payload } as AdminTeamMember) : m
              )
            );
          } else {
            // New record - refresh to get newly assigned database ID
            window.location.reload();
          }
        });
      } else {
        showToast('error', res.error?.message || 'Failed to save team member.');
      }
    } catch (err: any) {
      showToast('error', err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle Active/Inactive Status Directly from Table
  const handleToggleStatus = async (member: AdminTeamMember) => {
    const nextStatus = member.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    setLoading(true);

    try {
      const res = await toggleTeamMemberStatusAction(member.id, nextStatus);
      if (res.success) {
        setTeam((prev) =>
          prev.map((m) => (m.id === member.id ? { ...m, status: nextStatus } : m))
        );
        showToast(
          'success',
          `${member.name} is now ${nextStatus === 'PUBLISHED' ? 'Active' : 'Inactive'}`
        );
      } else {
        showToast('error', res.error?.message || 'Failed to update status.');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Failed to update status.');
    } finally {
      setLoading(false);
    }
  };

  // Update Display Order Directly from Table
  const handleQuickOrderChange = async (member: AdminTeamMember, newOrder: number) => {
    if (newOrder < 0 || newOrder === member.displayOrder) return;

    try {
      const res = await updateTeamMemberOrderAction(member.id, newOrder);
      if (res.success) {
        setTeam((prev) =>
          prev
            .map((m) => (m.id === member.id ? { ...m, displayOrder: newOrder } : m))
            .sort((a, b) => a.displayOrder - b.displayOrder)
        );
        showToast('success', `Display order updated to ${newOrder}`);
      }
    } catch (err: any) {
      showToast('error', err.message || 'Failed to update order');
    }
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    setLoading(true);
    try {
      const res = await deleteTeamMemberAction(deleteTarget.id);
      if (res.success) {
        setTeam((prev) => prev.filter((m) => m.id !== deleteTarget.id));
        showToast('success', `${deleteTarget.name} has been removed.`);
        setDeleteTarget(null);
      } else {
        showToast('error', res.error?.message || 'Failed to delete team member.');
      }
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete team member.');
    } finally {
      setLoading(false);
    }
  };

  // Filtered members list
  const filteredTeam = team
    .filter((m) => {
      if (statusFilter === 'PUBLISHED') return m.status === 'PUBLISHED';
      if (statusFilter === 'DRAFT') return m.status === 'DRAFT';
      return true;
    })
    .filter((m) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        m.name?.toLowerCase().includes(q) ||
        m.role?.toLowerCase().includes(q) ||
        m.specialization?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const activeCount = team.filter((m) => m.status === 'PUBLISHED').length;
  const inactiveCount = team.filter((m) => m.status === 'DRAFT').length;

  return (
    <div className="space-y-6">
      {/* Top Bar: Stats & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Stats Pills */}
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-[#FFE000]" />
            <span>Total: {team.length}</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs font-semibold text-emerald-400">
            Active (Live): {activeCount}
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-400">
            Inactive: {inactiveCount}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={openNewForm}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFE000] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#E6CA00] transition-colors cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Toast Notification */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-center justify-between gap-3 animate-in fade-in duration-200 ${
            feedback.type === 'success'
              ? 'bg-emerald-950/50 border-emerald-700/50 text-emerald-300'
              : 'bg-red-950/50 border-red-700/50 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="p-1 hover:opacity-70 text-current"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#0D0D0D] border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, role, or specialization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFE000]"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-white/5 self-start md:self-auto">
          {(['ALL', 'PUBLISHED', 'DRAFT'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                statusFilter === tab
                  ? 'bg-[#FFE000] text-black shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab === 'ALL' ? 'All' : tab === 'PUBLISHED' ? 'Active' : 'Inactive'}
            </button>
          ))}
        </div>
      </div>

      {/* Add / Edit Drawer Modal */}
      {editingMember && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0D0D] border border-white/15 shadow-2xl relative">
          <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
            <div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                {editingMember.id ? 'Edit Team Member' : 'Add New Team Member'}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Active team members appear on the public Our Team carousel slider.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEditingMember(null)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Row 1: Name & Slug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingMember.name || ''}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Gyanendra Prajapati"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={editingMember.slug || ''}
                  onChange={(e) =>
                    setEditingMember({
                      ...editingMember,
                      slug: e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9-]+/g, '-')
                        .replace(/^-+|-+$/g, ''),
                    })
                  }
                  placeholder="e.g. gyanendra-prajapati"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>
            </div>

            {/* Row 2: Designation, Experience, Qualifications */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Designation / Role *
                </label>
                <input
                  type="text"
                  required
                  value={editingMember.role || ''}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, role: e.target.value })
                  }
                  placeholder="e.g. Head Coach & Advisor"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Experience (Years) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="70"
                  required
                  value={editingMember.experienceYears ?? 0}
                  onChange={(e) =>
                    setEditingMember({
                      ...editingMember,
                      experienceYears: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Qualifications / Badges
                </label>
                <input
                  type="text"
                  value={editingMember.qualifications || ''}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, qualifications: e.target.value })
                  }
                  placeholder="e.g. WSF Certified | National Medalist"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>
            </div>

            {/* Row 3: Expertise / Specialization */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Expertise / Skills *
              </label>
              <input
                type="text"
                required
                value={editingMember.specialization || ''}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, specialization: e.target.value })
                }
                placeholder="e.g. Tactical Coaching, Biomechanics, Agility & Footwork"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
              />
            </div>

            {/* Profile Image with File Upload + URL */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Profile Image
              </label>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Image Preview Thumbnail */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 border border-white/15 shrink-0 flex items-center justify-center">
                  {editingMember.profileImage ? (
                    <Image
                      src={editingMember.profileImage}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Users className="w-6 h-6 text-zinc-600" />
                  )}
                </div>

                {/* Upload Button */}
                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-colors cursor-pointer border border-white/10">
                      {uploadingImage ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      <span>{uploadingImage ? 'Uploading...' : 'Upload Image File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageFileUpload}
                        disabled={uploadingImage}
                      />
                    </label>
                    <span className="text-[11px] text-zinc-500">or paste a URL / path below:</span>
                  </div>

                  <input
                    type="text"
                    value={editingMember.profileImage || ''}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, profileImage: e.target.value })
                    }
                    placeholder="/images/about/... or https://..."
                    className="w-full px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                  />
                </div>
              </div>
            </div>

            {/* Short Bio (Slider Card snippet) */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Short Bio (Slider Card Snippet) *
              </label>
              <textarea
                rows={2}
                required
                value={editingMember.shortBio || ''}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, shortBio: e.target.value })
                }
                placeholder="Brief summary appearing on the frontend team card..."
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
              />
            </div>

            {/* Full Detailed Biography */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Full Detailed Biography
              </label>
              <textarea
                rows={3}
                value={editingMember.fullBio || ''}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, fullBio: e.target.value })
                }
                placeholder="Comprehensive career background for the coach profile page..."
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
              />
            </div>

            {/* Social Media Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>Instagram Profile URL</span>
                </label>
                <input
                  type="text"
                  value={editingMember.instagramUrl || ''}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, instagramUrl: e.target.value })
                  }
                  placeholder="https://instagram.com/username"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                  <span>LinkedIn Profile URL</span>
                </label>
                <input
                  type="text"
                  value={editingMember.linkedinUrl || ''}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, linkedinUrl: e.target.value })
                  }
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>
            </div>

            {/* Status, Display Order, Featured */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Active / Publishing Status *
                </label>
                <select
                  value={editingMember.status || 'PUBLISHED'}
                  onChange={(e) =>
                    setEditingMember({
                      ...editingMember,
                      status: e.target.value as 'DRAFT' | 'PUBLISHED',
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                >
                  <option value="PUBLISHED">ACTIVE (Visible on Frontend)</option>
                  <option value="DRAFT">INACTIVE (Hidden Draft)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Display Order *
                </label>
                <input
                  type="number"
                  min="0"
                  value={editingMember.displayOrder ?? 0}
                  onChange={(e) =>
                    setEditingMember({
                      ...editingMember,
                      displayOrder: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>

              <div className="flex items-center gap-3 pt-6">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingMember.isFeatured || false}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, isFeatured: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#FFE000]"></div>
                  <span className="ml-2.5 text-xs font-semibold text-zinc-300 uppercase">
                    Featured Member
                  </span>
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFE000] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#E6CA00] transition-colors disabled:opacity-50 cursor-pointer shadow-md"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{editingMember.id ? 'Update Team Member' : 'Create Team Member'}</span>
              </button>

              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Team Members Table */}
      <div className="rounded-3xl bg-[#0C0C0C] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-zinc-400 uppercase font-mono border-b border-white/10">
              <tr>
                <th className="p-4 w-20">Order</th>
                <th className="p-4">Member</th>
                <th className="p-4">Role & Specialization</th>
                <th className="p-4">Credentials</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTeam.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">
                    No team members match your search or filter.
                  </td>
                </tr>
              ) : (
                filteredTeam.map((coach) => (
                  <tr key={coach.id} className="hover:bg-white/5 transition-colors">
                    {/* Display Order with Quick Editor */}
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          value={coach.displayOrder}
                          onChange={(e) =>
                            handleQuickOrderChange(coach, parseInt(e.target.value, 10))
                          }
                          className="w-12 px-1.5 py-1 text-center bg-zinc-900 border border-white/10 rounded font-mono font-bold text-white text-xs focus:outline-none focus:border-[#FFE000]"
                          title="Click to change order"
                        />
                      </div>
                    </td>

                    {/* Photo, Name, and Link */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-800 border border-white/10 shrink-0">
                          {coach.profileImage ? (
                            <Image
                              src={coach.profileImage}
                              alt={coach.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs font-bold">
                              {coach.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white uppercase text-sm">
                              {coach.name}
                            </span>
                            {coach.isFeatured && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#FFE000]/20 text-[#FFE000]">
                                FEATURED
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-zinc-400 font-mono">
                            /{coach.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Role & Specialization */}
                    <td className="p-4">
                      <p className="font-semibold text-white">{coach.role}</p>
                      <p className="text-[11px] text-[#FFE000] truncate max-w-xs">
                        {coach.specialization}
                      </p>
                    </td>

                    {/* Credentials / Experience */}
                    <td className="p-4 text-zinc-400">
                      <span className="text-zinc-300 font-semibold block">
                        {coach.experienceYears}+ Years
                      </span>
                      <span className="text-[11px] truncate max-w-xs block">
                        {coach.qualifications}
                      </span>
                    </td>

                    {/* Status Toggle Badge */}
                    <td className="p-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(coach)}
                        title="Click to toggle Active/Inactive"
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer border ${
                          coach.status === 'PUBLISHED'
                            ? 'bg-emerald-950/70 border-emerald-600/50 text-emerald-300 hover:bg-emerald-900/60'
                            : 'bg-zinc-800/80 border-zinc-700 text-zinc-400 hover:bg-zinc-700'
                        }`}
                      >
                        {coach.status === 'PUBLISHED' ? (
                          <>
                            <Eye className="w-3 h-3 text-emerald-400" />
                            <span>ACTIVE</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-zinc-400" />
                            <span>INACTIVE</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingMember(coach)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors cursor-pointer"
                          title="Edit Coach Details"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(coach)}
                          className="p-2 rounded-lg bg-red-950/40 hover:bg-red-950 text-red-400 transition-colors cursor-pointer"
                          title="Delete Coach"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#111111] border border-white/15 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <div className="p-2.5 rounded-full bg-red-950/80 border border-red-800/50">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <h4 className="text-base font-bold text-white uppercase tracking-tight">
                Confirm Deletion
              </h4>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <strong className="text-white font-bold">{deleteTarget.name}</strong> (
              {deleteTarget.role})? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                disabled={loading}
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-zinc-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleConfirmDelete}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-xs font-bold text-white transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                <span>Delete Permanently</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
