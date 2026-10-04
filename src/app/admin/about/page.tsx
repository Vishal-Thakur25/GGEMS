import { getCurrentAdmin } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getAboutSections } from '@/server/queries';
import AboutManagerClient from '@/components/admin/AboutManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminAboutPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const sections = await getAboutSections(true);

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono text-[#FFE000] uppercase font-bold tracking-widest block mb-1">
          CMS CONTROL
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          ABOUT US CONTENT & MEDIA MANAGEMENT
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Directly manage all sections, text content, hero badges, story documentaries, mission & vision, impact stats, founder quotes, values, images, and videos on the live About Us page.
        </p>
      </div>

      <AboutManagerClient initialSections={sections} />
    </div>
  );
}
