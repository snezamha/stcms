import Link from 'next/link';

import { Heading } from '@/components/layouts/stcms/dashboard/Heading';
import { StoreCard } from '@/components/layouts/stcms/dashboard/StoreCard';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';
import { getScopedI18n } from '@/locales/server';

const StorePage = async () => {
  const session = await getServerSession(authOptions);
  const t = await getScopedI18n('stores');
  const stores = await prisma.store.findMany({
    where: {
      userId: session?.user._id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title={t('title')} description='' />
        {stores.length > 0 && (
          <Link className={buttonVariants()} href='/dashboard/store/new'>
            {t('createStore')}
          </Link>
        )}
      </div>
      <Separator className='my-4' />
      {stores.length > 0 ? (
        <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {stores.map((store) => (
            <StoreCard key={store.id} store={store!} />
          ))}
        </section>
      ) : (
        <section className='flex h-[50vh] text-center gap-4 flex-col items-center justify-center'>
          <h2 className='font-semibold smtext-2xl'>{t('noStore')}</h2>
          <Link className={buttonVariants()} href='/dashboard/store/new'>
            {t('createStore')}
          </Link>
        </section>
      )}
    </>
  );
};

export default StorePage;
