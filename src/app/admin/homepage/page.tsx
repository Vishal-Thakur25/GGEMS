import { getCurrentAdmin } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getHeroSection, getHomepageSections } from '@/server/queries';
import HomepageManagerClient from '@/components/admin/HomepageManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminHomepagePage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const [hero, sections] = await Promise.all([
    getHeroSection(),
    getHomepageSections(),
  ]);

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono text-[#FFE000] uppercase font-bold tracking-widest block mb-1">
          CMS CONTROL
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          HOMEPAGE & HERO SECTIONS
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Directly control what visitors see on the public homepage. Drag or reorder sections, update media, and publish changes instantly.
        </p>
      </div>

      <HomepageManagerClient initialHero={hero} initialSections={sections} />
    </div>
  );
}
