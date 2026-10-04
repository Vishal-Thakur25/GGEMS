import { getCurrentAdmin } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getTeamMembers } from '@/server/queries';
import TeamManagerClient from '@/components/admin/TeamManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminTeamPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const team = await getTeamMembers(false);

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono text-[#FFE000] uppercase font-bold tracking-widest block mb-1">
          COACHING ROSTER
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          COACHES & CONSULTANTS
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Manage profiles, qualifications, credentials, status, and display order for academy coaching staff.
        </p>
      </div>

      <TeamManagerClient initialTeam={team} />
    </div>
  );
}
