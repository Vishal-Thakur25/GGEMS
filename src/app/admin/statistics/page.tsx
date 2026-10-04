import { getCurrentAdmin } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getStatistics } from '@/server/queries';
import StatisticsManagerClient from '@/components/admin/StatisticsManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminStatisticsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const statistics = await getStatistics();

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono text-[#FFE000] uppercase font-bold tracking-widest block mb-1">
          ANALYTICS & METRICS
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          IMPACT & NUMERICAL BENCHMARKS
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Control official academy metrics, court percentages, and player base distributions.
        </p>
      </div>

      <StatisticsManagerClient initialStatistics={statistics as any} />
    </div>
  );
}
