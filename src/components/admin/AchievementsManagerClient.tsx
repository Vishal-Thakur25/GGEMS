'use client';

import { useState } from 'react';
import { saveAchievementAction, deleteAchievementAction } from '@/server/actions/admin';
import { Plus, Edit, Trash2, Save, X, Loader2, CheckCircle2, Trophy, Medal } from 'lucide-react';

interface AchievementItem {
  id: string;
  athleteName: string;
  category: string;
  rank: string;
  title: string;
  competition?: string | null;
  year?: string | null;
  athleteImage?: string | null;
  medal?: string | null;
  status: 'DRAFT' | 'PUBLISHED';
  displayOrder: number;
}

export default function AchievementsManagerClient({
  initialAchievements,
}: {
  initialAchievements: any[];
}) {
  const [achievements, setAchievements] = useState<AchievementItem[]>(initialAchievements);
  const [editingAch, setEditingAch] = useState<Partial<AchievementItem> | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const openNewForm = () => {
    setEditingAch({
      athleteName: '',
      category: 'Under-19',
      rank: 'India Rank - 10',
      title: 'Top 10 Junior National Ranking',
      competition: 'SRFI National Circuit',
      year: '2024',
      athleteImage: '',
      medal: 'National Medalist',
      status: 'PUBLISHED',
      displayOrder: achievements.length + 1,
    });
    setFeedback(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAch) return;

    setLoading(true);
    setFeedback(null);

    const res = await saveAchievementAction(editingAch);
    if (res.success) {
      setFeedback('Champion record saved successfully!');
      setEditingAch(null);
      window.location.reload();
    } else {
      setFeedback(res.error?.message || 'Failed to save achievement.');
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this achievement record?')) return;

    setLoading(true);
    const res = await deleteAchievementAction(id);
    if (res.success) {
      setAchievements(achievements.filter((a) => a.id !== id));
      setFeedback('Achievement removed.');
    } else {
      setFeedback(res.error?.message || 'Failed to delete achievement.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white uppercase">
            Hall of Fame Champions ({achievements.length})
          </h2>
          <p className="text-xs text-zinc-400">
            National rankings, state representatives, and tournament title holders.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewForm}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FFE000] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#E6CA00] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Champion / Ranker</span>
        </button>
      </div>

      {feedback && (
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center gap-2 text-[#FFE000]">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {editingAch && (
        <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 shadow-2xl relative">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
            <h3 className="text-lg font-bold text-white uppercase">
              {editingAch.id ? 'Edit Champion Record' : 'Add New Champion Record'}
            </h3>
            <button
              onClick={() => setEditingAch(null)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Athlete Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingAch.athleteName || ''}
                  onChange={(e) =>
                    setEditingAch({ ...editingAch, athleteName: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <input
                  type="text"
                  required
                  value={editingAch.category || ''}
                  onChange={(e) => setEditingAch({ ...editingAch, category: e.target.value })}
                  placeholder="e.g. Men's Category, Boys Under-19"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Official Rank / Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingAch.rank || ''}
                  onChange={(e) => setEditingAch({ ...editingAch, rank: e.target.value })}
                  placeholder="e.g. India Rank - 08"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Achievement Headline *
              </label>
              <input
                type="text"
                required
                value={editingAch.title || ''}
                onChange={(e) => setEditingAch({ ...editingAch, title: e.target.value })}
                placeholder="e.g. Top 10 Men's National Squash Circuit"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Competition
                </label>
                <input
                  type="text"
                  value={editingAch.competition || ''}
                  onChange={(e) => setEditingAch({ ...editingAch, competition: e.target.value })}
                  placeholder="e.g. SRFI National Circuit"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Year
                </label>
                <input
                  type="text"
                  value={editingAch.year || ''}
                  onChange={(e) => setEditingAch({ ...editingAch, year: e.target.value })}
                  placeholder="2024"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Medal / Distinction
                </label>
                <input
                  type="text"
                  value={editingAch.medal || ''}
                  onChange={(e) => setEditingAch({ ...editingAch, medal: e.target.value })}
                  placeholder="e.g. Bronze Medalist"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Athlete Photo URL
              </label>
              <input
                type="text"
                value={editingAch.athleteImage || ''}
                onChange={(e) =>
                  setEditingAch({ ...editingAch, athleteImage: e.target.value })
                }
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
              />
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFE000] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#E6CA00] transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Achievement</span>
              </button>

              <button
                type="button"
                onClick={() => setEditingAch(null)}
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
                <th className="p-4">Rank</th>
                <th className="p-4">Athlete</th>
                <th className="p-4">Category</th>
                <th className="p-4">Accolade</th>
                <th className="p-4">Year</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {achievements.map((ach) => (
                <tr key={ach.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded bg-[#FFE000] text-black font-black text-xs font-mono">
                      {ach.rank}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-white uppercase">{ach.athleteName}</td>
                  <td className="p-4 text-zinc-300 font-semibold">{ach.category}</td>
                  <td className="p-4 text-zinc-400 truncate max-w-xs">{ach.title}</td>
                  <td className="p-4 text-zinc-500 font-mono">{ach.year || '2024'}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingAch(ach)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                        title="Edit Record"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(ach.id)}
                        className="p-2 rounded-lg bg-red-950/40 hover:bg-red-950 text-red-400 transition-colors"
                        title="Delete Record"
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
