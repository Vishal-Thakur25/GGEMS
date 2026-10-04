import { getCurrentAdmin } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getCenters } from '@/server/queries';
import CentersManagerClient from '@/components/admin/CentersManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminCentersPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const centers = await getCenters(false);

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono text-[#FFE000] uppercase font-bold tracking-widest block mb-1">
          FACILITY OPERATIONS
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          CENTERS OF EXCELLENCE
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Manage location addresses, court specifications, Google Maps links, and contact channels for all 10 centers.
        </p>
      </div>

      <CentersManagerClient initialCenters={centers} />
    </div>
  );
}
