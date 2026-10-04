import { getCurrentAdmin } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { getTestimonials } from '@/server/queries';
import TestimonialsManagerClient from '@/components/admin/TestimonialsManagerClient';

export const dynamic = 'force-dynamic';

export default async function AdminTestimonialsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect('/admin/login');
  }

  const testimonials = await getTestimonials(false);

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-white/10">
        <span className="text-xs font-mono text-[#63D13F] uppercase font-bold tracking-widest block mb-1">
          SOCIAL PROOF & REPUTATION
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          TESTIMONIALS & REVIEWS CMS
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Manage authentic athlete, parent, and institutional testimonials displayed on the homepage slider. Add new reviews, edit content, and toggle visibility.
        </p>
      </div>

      <TestimonialsManagerClient initialTestimonials={testimonials} />
    </div>
  );
}
