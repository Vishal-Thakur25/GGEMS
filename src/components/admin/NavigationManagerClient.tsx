'use client';

import { useState } from 'react';
import { saveNavigationItemAction, deleteNavigationItemAction } from '@/server/actions/admin';
import { Plus, Edit, Trash2, Save, X, Loader2, CheckCircle2, Compass } from 'lucide-react';

interface NavItem {
  id: string;
  navigationId: string;
  label: string;
  url: string;
  isExternal: boolean;
  openInNewTab: boolean;
  displayOrder: number;
  isVisible: boolean;
}

export default function NavigationManagerClient({
  headerNav,
  footerNav,
}: {
  headerNav: any;
  footerNav: any;
}) {
  const [activeTab, setActiveTab] = useState<'HEADER' | 'FOOTER'>('HEADER');
  const [editingItem, setEditingItem] = useState<Partial<NavItem> | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentNav = activeTab === 'HEADER' ? headerNav : footerNav;
  const items: NavItem[] = currentNav?.items || [];

  const openNewForm = () => {
    setEditingItem({
      navigationId: currentNav.id,
      label: '',
      url: '/',
      isExternal: false,
      openInNewTab: false,
      displayOrder: items.length + 1,
      isVisible: true,
    });
    setFeedback(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setLoading(true);
    setFeedback(null);

    const res = await saveNavigationItemAction(editingItem);
    if (res.success) {
      setFeedback('Navigation item saved successfully!');
      setEditingItem(null);
      window.location.reload();
    } else {
      setFeedback(res.error?.message || 'Failed to save navigation item.');
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this navigation link?')) return;

    setLoading(true);
    const res = await deleteNavigationItemAction(id);
    if (res.success) {
      setFeedback('Navigation item deleted.');
      window.location.reload();
    } else {
      setFeedback(res.error?.message || 'Failed to delete navigation item.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-900 border border-white/10 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('HEADER')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase transition-colors ${
            activeTab === 'HEADER' ? 'bg-[#FFE000] text-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Header Main Nav ({headerNav?.items?.length || 0})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('FOOTER')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase transition-colors ${
            activeTab === 'FOOTER' ? 'bg-[#FFE000] text-black' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Footer Links ({footerNav?.items?.length || 0})
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white uppercase">
            {activeTab === 'HEADER' ? 'Header Navigation' : 'Footer Navigation'}
          </h2>
          <p className="text-xs text-zinc-400">
            Control links, ordering, and destinations for menus on live website.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewForm}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFE000] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#E6CA00] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Link</span>
        </button>
      </div>

      {feedback && (
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center gap-2 text-[#FFE000]">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Editing Form */}
      {editingItem && (
        <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 shadow-2xl relative">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
            <h3 className="text-lg font-bold text-white uppercase">
              {editingItem.id ? 'Edit Link' : 'Add New Link'}
            </h3>
            <button
              onClick={() => setEditingItem(null)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Link Label *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.label || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
                  placeholder="e.g. Programs, About, Centers"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Target Destination URL *
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.url || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                  placeholder="e.g. /programs, /contact, https://..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Display Order
                </label>
                <input
                  type="number"
                  value={editingItem.displayOrder || 0}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      displayOrder: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="openInNewTab"
                  checked={editingItem.openInNewTab || false}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, openInNewTab: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#FFE000]"
                />
                <label htmlFor="openInNewTab" className="text-xs text-zinc-300">
                  Open in New Tab
                </label>
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="isVisible"
                  checked={editingItem.isVisible ?? true}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, isVisible: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#FFE000]"
                />
                <label htmlFor="isVisible" className="text-xs text-zinc-300">
                  Visible on Live Menu
                </label>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFE000] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#E6CA00] transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Link</span>
              </button>

              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="rounded-3xl bg-[#0C0C0C] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-zinc-400 uppercase font-mono border-b border-white/10">
              <tr>
                <th className="p-4">Order</th>
                <th className="p-4">Label</th>
                <th className="p-4">URL</th>
                <th className="p-4">New Tab</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono font-bold text-zinc-500">0{item.displayOrder}</td>
                  <td className="p-4 font-bold text-white uppercase">{item.label}</td>
                  <td className="p-4 text-zinc-400 font-mono">{item.url}</td>
                  <td className="p-4 text-zinc-400">{item.openInNewTab ? 'Yes' : 'No'}</td>
                  <td className="p-4">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                        item.isVisible ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
                      }`}
                    >
                      {item.isVisible ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingItem(item)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                        title="Edit Link"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg bg-red-950/40 hover:bg-red-950 text-red-400 transition-colors"
                        title="Delete Link"
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
