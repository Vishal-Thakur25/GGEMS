import { getCurrentAdmin } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getPrograms } from '@/server/queries';
import ProgramsManagerClient from '@/components/admin/ProgramsManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminProgramsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  // Fetch all programs including drafts for CMS management
  const programs = await getPrograms(false);

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono text-[#FFE000] uppercase font-bold tracking-widest block mb-1">
          CURRICULUM ARCHITECTURE
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          PROGRAMS & TRAINING TRACKS
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Manage beginner clinics, junior advance squads, elite professional regimes, and holiday development camps.
        </p>
      </div>

      <ProgramsManagerClient initialPrograms={programs} />
    </div>
  );
}
