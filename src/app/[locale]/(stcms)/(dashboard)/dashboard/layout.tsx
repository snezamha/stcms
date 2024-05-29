import { redirect } from 'next/navigation';

import Footer from '@/components/layouts/stcms/dashboard/Footer';
import Navbar from '@/components/layouts/stcms/dashboard/Navbar';
import { SidebarNav } from '@/components/layouts/stcms/dashboard/SidebarNav';
import { getAuthSession } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect('/auth');
  }

  return (
    <>
      <Navbar user={session?.user} />
      <div className='flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <aside className='hidden md:block ltr:border-r rtl:border-l min-h-screen pt-10 ltr:pr-6 rtl:pl-6 w-[200px]'>
          <SidebarNav />
        </aside>
        <main className='py-6 md:py-10 md:px-10 w-full'>{children}</main>
      </div>
      <Footer />
    </>
  );
}
