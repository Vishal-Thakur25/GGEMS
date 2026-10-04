import { getCurrentAdmin } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getEcosystemVerticals } from '@/server/queries';
import EcosystemManagerClient from '@/components/admin/EcosystemManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminEcosystemPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const verticals = await getEcosystemVerticals(false);

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono text-[#63D13F] uppercase font-bold tracking-widest block mb-1">
          HOMEPAGE VERTICALS & BRAND ARCHITECTURE
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          GGEMS ECOSYSTEM CMS
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Manage the 3 major pillars of GGEMS (Sports Development, Sports Infrastructure, and Squash Centre of Excellence). Update titles, imagery, links, and display order.
        </p>
      </div>

      <EcosystemManagerClient initialVerticals={verticals} />
    </div>
  );
}
