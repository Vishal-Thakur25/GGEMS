import { getCurrentAdmin } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getAdminDashboardStats } from '@/server/queries';
import Link from 'next/link';
import {
  GraduationCap,
  Users,
  Building,
  Trophy,
  Inbox,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Shield,
  Layers,
  Palette,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const stats = await getAdminDashboardStats();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs font-mono text-[#FFE000] uppercase tracking-widest font-semibold block mb-1">
            CONTROL CENTER
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            ACADEMY OVERVIEW
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Logged in as <strong className="text-white">{admin.email}</strong> ({admin.role})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/homepage"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold tracking-wider uppercase border border-white/10 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-[#FFE000]" />
            <span>Manage Homepage</span>
          </Link>
          <Link
            href="/admin/programs"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFE000] text-black text-xs font-bold tracking-wider uppercase hover:bg-[#E6CA00] transition-colors"
          >
            <span>+ Add Program</span>
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-[#0C0C0C] border border-white/10">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-medium uppercase">Active Programs</span>
            <GraduationCap className="w-4 h-4 text-[#FFE000]" />
          </div>
          <p className="text-3xl font-black text-white">{stats.programsCount}</p>
          <Link href="/admin/programs" className="text-[11px] text-[#FFE000] hover:underline mt-2 inline-block">
            Manage Programs →
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-[#0C0C0C] border border-white/10">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-medium uppercase">Coaches & Team</span>
            <Users className="w-4 h-4 text-[#FFE000]" />
          </div>
          <p className="text-3xl font-black text-white">{stats.teamCount}</p>
          <Link href="/admin/team" className="text-[11px] text-[#FFE000] hover:underline mt-2 inline-block">
            View 13 Coaches →
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-[#0C0C0C] border border-white/10">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-medium uppercase">Centers of Excellence</span>
            <Building className="w-4 h-4 text-[#FFE000]" />
          </div>
          <p className="text-3xl font-black text-white">{stats.centersCount}</p>
          <Link href="/admin/centers" className="text-[11px] text-[#FFE000] hover:underline mt-2 inline-block">
            View 10 Hubs →
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-[#0C0C0C] border border-white/10">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-medium uppercase">Champions & Ranks</span>
            <Trophy className="w-4 h-4 text-[#FFE000]" />
          </div>
          <p className="text-3xl font-black text-white">{stats.achievementsCount}</p>
          <Link href="/admin/achievements" className="text-[11px] text-[#FFE000] hover:underline mt-2 inline-block">
            Manage Achievers →
          </Link>
        </div>

        <div className="p-5 rounded-2xl bg-[#0C0C0C] border border-white/10">
          <div className="flex items-center justify-between text-zinc-400 mb-3">
            <span className="text-xs font-medium uppercase">New Enquiries</span>
            <Inbox className="w-4 h-4 text-[#FFE000]" />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-white">{stats.newEnquiriesCount}</p>
            <span className="text-xs text-zinc-500">/ {stats.enquiriesCount} total</span>
          </div>
          <Link href="/admin/enquiries" className="text-[11px] text-[#FFE000] hover:underline mt-2 inline-block">
            Review Enquiries →
          </Link>
        </div>
      </div>

      {/* Two Column Section: Recent Enquiries & Audit Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0C0C0C] border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Recent Contact & Assessment Enquiries
              </h2>
              <p className="text-xs text-zinc-400">Latest leads from athletes, parents, and schools</p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-semibold text-[#FFE000] hover:underline"
            >
              View All
            </Link>
          </div>

          {stats.recentEnquiries.length === 0 ? (
            <p className="text-xs text-zinc-500 py-6 text-center">No enquiries received yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{enq.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
                        {enq.userType}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {enq.phone} • {enq.email}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                        enq.status === 'NEW'
                          ? 'bg-[#FFE000] text-black font-extrabold'
                          : enq.status === 'CONTACTED'
                          ? 'bg-blue-900/60 text-blue-300 border border-blue-500/30'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {enq.status}
                    </span>
                    <p className="text-[10px] text-zinc-500 mt-1 font-mono">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Audit Log Activity */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0C0C0C] border border-white/10 p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Security & Audit Trail
              </h2>
              <p className="text-xs text-zinc-400">Real-time system events</p>
            </div>
            <Link
              href="/admin/audit-logs"
              className="text-xs font-semibold text-[#FFE000] hover:underline"
            >
              Full Trail
            </Link>
          </div>

          <div className="space-y-3">
            {stats.recentAuditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3 text-xs"
              >
                <div className="w-2 h-2 rounded-full bg-[#FFE000] mt-1.5 shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white uppercase">{log.action}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-zinc-400 truncate">
                    {log.entity} • {log.userEmail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
