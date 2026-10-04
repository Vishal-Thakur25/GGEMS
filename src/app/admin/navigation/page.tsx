import { getCurrentAdmin } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getNavigation } from '@/server/queries';
import NavigationManagerClient from '@/components/admin/NavigationManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminNavigationPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const [headerNav, footerNav] = await Promise.all([
    getNavigation('HEADER_MAIN'),
    getNavigation('FOOTER_QUICK_LINKS'),
  ]);

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono text-[#FFE000] uppercase font-bold tracking-widest block mb-1">
          SITE STRUCTURE
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          DYNAMIC NAVIGATION MENUS
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Add, edit, reorder, and toggle links in the primary Header bar and Footer columns without code modifications.
        </p>
      </div>

      <NavigationManagerClient headerNav={headerNav} footerNav={footerNav} />
    </div>
  );
}
