import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { Heading } from '@/components/layouts/stcms/dashboard/Heading';
import { StoreTabs } from '@/components/layouts/stcms/dashboard/pagers/StoreTabs';
import prisma from '@/lib/db';
import { getScopedI18n } from '@/locales/server';

export default async function UpdateStoreLayout({
  children,
  params: { storeId },
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const session = await getServerSession(authOptions);
  const t = await getScopedI18n('stores');
  const store = await prisma.store.findFirst({
    where: {
      id: storeId,
      userId: session?.user._id,
    },
  });

  if (!store) {
    return redirect('/dashboard/store');
  }
  return (
    <>
      <Heading title={t('title')} description='' />
      <section className='space-y-8 overflow-auto'>
        <StoreTabs storeId={storeId} />
        {children}
      </section>
    </>
  );
}
