import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getSiteSettings, getNavigation } from '@/server/queries';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [siteSettings, headerNav, footerNav] = await Promise.all([
    getSiteSettings(),
    getNavigation('HEADER_MAIN'),
    getNavigation('FOOTER_QUICK_LINKS'),
  ]);

  // Safe Fallbacks
  const safeSiteSettings = siteSettings || {
    siteName: 'GGEMS SQUASH ACADEMY',
    siteTagline: 'Unleash Your Inner Champion',
    siteDescription:
      'With over 20 years of experience in squash coaching and sports development, GGems develops players from grassroots to national excellence across Delhi NCR.',
    phone: '8826433044',
    secondaryPhone: null,
    email: 'contact@ggemssquash.com',
    address: 'Jaypee Wish Town, Kosmos-62, Sector 134',
    city: 'Noida',
    state: 'Delhi NCR',
    pincode: '201304',
    associationText: 'In Association with Dhairya Bharat Foundation, India',
    instagramUrl: 'https://instagram.com/ggemssquash',
    instagramAltUrl: 'https://instagram.com/ggemssirifort',
    youtubeUrl: 'https://youtube.com/@ggemssquash',
    copyrightText: '© 2026 GGems Squash Academy. All Rights Reserved.',
  };

  const navItems =
    headerNav?.items && headerNav.items.length > 0
      ? headerNav.items
      : [
          { id: '1', label: 'Home', url: '/', isExternal: false, openInNewTab: false, isMegaMenu: false, displayOrder: 1, parentId: null },
          { id: '2', label: 'About', url: '/about', isExternal: false, openInNewTab: false, isMegaMenu: false, displayOrder: 2, parentId: null },
          { id: '3', label: 'Programs', url: '/programs', isExternal: false, openInNewTab: false, isMegaMenu: false, displayOrder: 3, parentId: null },
          { id: '4', label: 'Team', url: '/team', isExternal: false, openInNewTab: false, isMegaMenu: false, displayOrder: 4, parentId: null },
          { id: '5', label: 'Centers', url: '/centers', isExternal: false, openInNewTab: false, isMegaMenu: false, displayOrder: 5, parentId: null },
          { id: '6', label: 'School Partnership', url: '/school-partnership', isExternal: false, openInNewTab: false, isMegaMenu: false, displayOrder: 6, parentId: null },
          { id: '7', label: 'Achievements', url: '/achievements', isExternal: false, openInNewTab: false, isMegaMenu: false, displayOrder: 7, parentId: null },
          { id: '8', label: 'Contact', url: '/contact', isExternal: false, openInNewTab: false, isMegaMenu: false, displayOrder: 8, parentId: null },
        ];

  const quickLinks =
    footerNav?.items && footerNav.items.length > 0
      ? footerNav.items
      : [
          { id: 'f1', label: 'About GGems', url: '/about' },
          { id: 'f2', label: 'Programs', url: '/programs' },
          { id: 'f3', label: 'Coaches', url: '/team' },
          { id: 'f4', label: 'Centers of Excellence', url: '/centers' },
          { id: 'f5', label: 'School Partnership', url: '/school-partnership' },
          { id: 'f6', label: 'Contact', url: '/contact' },
        ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar items={navItems} siteName={safeSiteSettings.siteName} phone={safeSiteSettings.phone} />
      <main className="flex-1">{children}</main>
      <Footer siteSettings={safeSiteSettings} quickLinks={quickLinks} />
    </div>
  );
}
