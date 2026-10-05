import { getCurrentAdmin } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getSiteSettings } from '@/server/queries';
import { parseSiteLogos } from '@/lib/logo';
import BrandingManagerClient from '@/components/admin/BrandingManagerClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Brand & Logo Management | GGEMS Admin',
  description: 'Manage dynamic header and footer logos for GGems Sports Academy',
};

export default async function AdminBrandingPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const siteSettings = await getSiteSettings();
  const logos = parseSiteLogos(siteSettings?.logoUrl);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono text-[#6CD34A] uppercase font-bold tracking-widest block mb-1">
          BRAND IDENTITY
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          BRAND & LOGO MANAGEMENT
        </h1>
        <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
          Upload and configure dynamic brand logos for the sticky website Header and Footer. Changes reflect immediately across all pages without rebuilding the application.
        </p>
      </div>

      <BrandingManagerClient
        initialLogos={logos}
        siteName={siteSettings?.siteName || 'GGems Sports Academy'}
      />
    </div>
  );
}
