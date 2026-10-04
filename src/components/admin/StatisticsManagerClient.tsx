'use client';

import { useState } from 'react';
import { saveStatisticAction } from '@/server/actions/admin';
import { Save, Loader2, CheckCircle2, Edit } from 'lucide-react';

interface StatisticItem {
  id: string;
  key: string;
  label: string;
  numericValue: number;
  prefix?: string | null;
  suffix?: string | null;
  description?: string | null;
  displayOrder: number;
  isVisible: boolean;
}

export default function StatisticsManagerClient({
  initialStatistics,
}: {
  initialStatistics: StatisticItem[];
}) {
  const [stats, setStats] = useState<StatisticItem[]>(initialStatistics);
  const [editingStat, setEditingStat] = useState<StatisticItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStat) return;

    setLoading(true);
    setFeedback(null);

    const res = await saveStatisticAction(editingStat);
    if (res.success) {
      setFeedback('Statistic updated successfully!');
      setEditingStat(null);
      window.location.reload();
    } else {
      setFeedback(res.error?.message || 'Failed to update statistic.');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white uppercase">Live Impact Statistics</h2>
          <p className="text-xs text-zinc-400">
            Real-world metrics verified from academy records. Updates animate live on the public site.
          </p>
        </div>
      </div>

      {feedback && (
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center gap-2 text-[#FFE000]">
          <CheckCircle2 className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {editingStat && (
        <div className="p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 shadow-2xl">
          <h3 className="text-base font-bold text-white uppercase mb-4">
            Edit Metric: {editingStat.label}
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Numeric Value *
                </label>
                <input
                  type="number"
                  required
                  value={editingStat.numericValue}
                  onChange={(e) =>
                    setEditingStat({
                      ...editingStat,
                      numericValue: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Prefix (Optional)
                </label>
                <input
                  type="text"
                  value={editingStat.prefix || ''}
                  onChange={(e) => setEditingStat({ ...editingStat, prefix: e.target.value })}
                  placeholder="e.g. +"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                  Suffix (Optional)
                </label>
                <input
                  type="text"
                  value={editingStat.suffix || ''}
                  onChange={(e) => setEditingStat({ ...editingStat, suffix: e.target.value })}
                  placeholder="e.g. %, +"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Metric Label *
              </label>
              <input
                type="text"
                required
                value={editingStat.label}
                onChange={(e) => setEditingStat({ ...editingStat, label: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#FFE000]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Description / Context
              </label>
              <input
                type="text"
                value={editingStat.description || ''}
                onChange={(e) => setEditingStat({ ...editingStat, description: e.target.value })}
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
                <span>Save Metric</span>
              </button>

              <button
                type="button"
                onClick={() => setEditingStat(null)}
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid of stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div
            key={s.id}
            className="p-6 rounded-2xl bg-[#0C0C0C] border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#FFE000] uppercase font-bold">
                  {s.key}
                </span>
                <button
                  onClick={() => setEditingStat(s)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                  title="Edit Value"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-4xl font-black text-white">
                {s.prefix}
                {s.numericValue}
                {s.suffix}
              </p>
              <h4 className="text-xs font-bold text-zinc-200 uppercase mt-2">{s.label}</h4>
              <p className="text-[11px] text-zinc-500 mt-1">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
