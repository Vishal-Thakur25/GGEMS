import { getCurrentAdmin } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import { Shield, History, CheckCircle2, AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminAuditLogsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const logs = await db.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono text-[#FFE000] uppercase font-bold tracking-widest block mb-1">
          SECURITY & COMPLIANCE
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          IMMUTABLE AUDIT LOG TRAIL
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Comprehensive historical record of all administrative logins, content mutations, and setting changes.
        </p>
      </div>

      <div className="rounded-3xl bg-[#0C0C0C] border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 text-zinc-400 uppercase font-mono border-b border-white/10">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Action</th>
                <th className="p-4">Entity</th>
                <th className="p-4">Actor Email</th>
                <th className="p-4">Details / Notes</th>
                <th className="p-4">Status</th>
                <th className="p-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-zinc-400 font-mono whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                        log.action.includes('DELETE')
                          ? 'bg-red-950 text-red-400'
                          : log.action.includes('CREATE')
                          ? 'bg-emerald-950 text-emerald-400'
                          : log.action.includes('LOGIN')
                          ? 'bg-[#FFE000]/15 text-[#FFE000]'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-white uppercase">{log.entity}</td>
                  <td className="p-4 text-zinc-300 font-mono">{log.userEmail}</td>
                  <td className="p-4 text-zinc-400 max-w-sm truncate">{log.details || '—'}</td>
                  <td className="p-4">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                        log.status === 'SUCCESS'
                          ? 'text-emerald-400'
                          : 'text-red-400'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="p-4 text-zinc-500 font-mono">{log.ipAddress || '127.0.0.1'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
