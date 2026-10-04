import { getCurrentAdmin } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import EnquiriesManagerClient from '@/components/admin/EnquiriesManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminEnquiriesPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const enquiries = await db.contactEnquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono text-[#FFE000] uppercase font-bold tracking-widest block mb-1">
          LEAD MANAGEMENT
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          CONTACT & EVALUATION ENQUIRIES
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Review, filter, and track incoming student evaluations, school partnership inquiries, and parent requests.
        </p>
      </div>

      <EnquiriesManagerClient initialEnquiries={enquiries} />
    </div>
  );
}
