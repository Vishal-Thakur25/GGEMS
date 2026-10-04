import { getCurrentAdmin } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getAchievements } from '@/server/queries';
import AchievementsManagerClient from '@/components/admin/AchievementsManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminAchievementsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const achievements = await getAchievements(false);

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono text-[#FFE000] uppercase font-bold tracking-widest block mb-1">
          HALL OF FAME
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          ACHIEVERS & NATIONAL RANKINGS
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Maintain verified tournament accolades, top 10 national ranking records, and junior circuit medals.
        </p>
      </div>

      <AchievementsManagerClient initialAchievements={achievements} />
    </div>
  );
}
