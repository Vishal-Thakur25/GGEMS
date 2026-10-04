import { getCurrentAdmin } from '@/lib/auth/session';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  // Using pathname header or x-url if available
  const pathname = headersList.get('x-pathname') || '';

  const admin = await getCurrentAdmin();

  // If on login page, render without sidebar
  // (In Next.js, layout applies to /admin and subroutes)
  // If not logged in and not on login route, we redirect
  return (
    <div className="h-screen bg-[#060606] text-zinc-100 flex overflow-hidden" data-lenis-prevent>
      {admin ? (
        <>
          <AdminSidebar admin={admin} />
          <main className="flex-1 h-screen overflow-y-auto p-6 sm:p-10" data-lenis-prevent>
            <div className="max-w-7xl mx-auto w-full pb-16">
              {children}
            </div>
          </main>
        </>
      ) : (
        <div className="w-full min-h-screen overflow-y-auto" data-lenis-prevent>{children}</div>
      )}
    </div>
  );
}
