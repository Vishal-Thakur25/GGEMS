'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  GraduationCap,
  Users,
  Building,
  BarChart3,
  Trophy,
  Inbox,
  Palette,
  Compass,
  History,
  LogOut,
  ExternalLink,
  Shield,
  Info,
  MessageSquareQuote,
  Boxes,
  PhoneCall,
} from 'lucide-react';
import { logoutAdminAction } from '@/server/actions/admin';
import { useRouter } from 'next/navigation';

interface AdminSidebarProps {
  admin: {
    name: string;
    email: string;
    role: string;
  };
}

const navItems = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Homepage & Hero', href: '/admin/homepage', icon: Layers },
  { label: 'GGEMS Ecosystem', href: '/admin/ecosystem', icon: Boxes },
  { label: 'About Us CMS', href: '/admin/about', icon: Info },
  { label: 'Programs CMS', href: '/admin/programs', icon: GraduationCap },
  { label: 'Coaches & Team', href: '/admin/team', icon: Users },
  { label: 'Centers of Excellence', href: '/admin/centers', icon: Building },
  { label: 'Statistics & Impact', href: '/admin/statistics', icon: BarChart3 },
  { label: 'Achievements', href: '/admin/achievements', icon: Trophy },
  { label: 'Testimonials CMS', href: '/admin/testimonials', icon: MessageSquareQuote },
  { label: 'Contact Settings', href: '/admin/contact', icon: PhoneCall },
  { label: 'Contact Enquiries', href: '/admin/enquiries', icon: Inbox },
  { label: 'Theme Tokens', href: '/admin/theme', icon: Palette },
  { label: 'Navigation Menus', href: '/admin/navigation', icon: Compass },
  { label: 'Audit Logs', href: '/admin/audit-logs', icon: History },
];

export default function AdminSidebar({ admin }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAdminAction();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <aside className="w-64 bg-[#0A0A0A] border-r border-white/10 flex flex-col justify-between h-screen sticky top-0 shrink-0">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFE000] p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-black rounded-[6px] flex items-center justify-center font-black text-xs text-[#FFE000]">
                GG
              </div>
            </div>
            <div>
              <span className="font-extrabold text-sm text-white uppercase tracking-wider block">
                GGEMS CMS
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">ADMIN CONTROL</span>
            </div>
          </Link>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono font-bold">
            LIVE
          </span>
        </div>

        {/* User Card */}
        <div className="px-4 py-3 mx-4 my-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#FFE000]/20 text-[#FFE000] flex items-center justify-center font-bold text-xs">
            {admin.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{admin.name}</p>
            <p className="text-[10px] text-zinc-400 font-mono truncate">{admin.role}</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="px-3 py-2 space-y-1 overflow-y-auto max-h-[calc(100vh-250px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-colors ${
                  isActive
                    ? 'bg-[#FFE000] text-black font-bold shadow-lg shadow-[#FFE000]/15'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/10 flex flex-col gap-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#FFE000]" />
            <span>View Live Website</span>
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors w-full text-left"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out Securely</span>
        </button>
      </div>
    </aside>
  );
}
