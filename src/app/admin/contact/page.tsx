import { getCurrentAdmin } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import {
  getAllContactPhones,
  getAllContactEmails,
  getAllContactAddresses,
} from '@/server/queries';
import ContactSettingsManagerClient from '@/components/admin/ContactSettingsManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminContactPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const [phones, emails, addresses] = await Promise.all([
    getAllContactPhones(),
    getAllContactEmails(),
    getAllContactAddresses(),
  ]);

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono text-[#FFE000] uppercase font-bold tracking-widest block mb-1">
          CMS CONTROL
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          CONTACT INFORMATION CMS SETTINGS
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Manage multiple phone numbers with specific roles (Founder &amp; CEO, Admissions, Partnerships), dynamic email addresses, office locations, primary contact methods, display order, and live status for the Contact page.
        </p>
      </div>

      <ContactSettingsManagerClient
        initialPhones={phones}
        initialEmails={emails}
        initialAddresses={addresses}
      />
    </div>
  );
}
