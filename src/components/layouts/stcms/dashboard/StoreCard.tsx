import { Store } from '@prisma/client';
import Link from 'next/link';
import { getScopedI18n } from '@/locales/server';

import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StoreCardProps {
  store: Store;
}

export async function StoreCard({ store }: StoreCardProps) {
  const t = await getScopedI18n('stores');
  return (
    <Link href={`/dashboard/store/${store.id}`}>
      <Card className='h-full overflow-hidden hover:bg-accent'>
        <CardHeader>
          <CardTitle className='line-clamp-1 text-lg'>
            {t('storeTitle')}: {store.name}
          </CardTitle>
          <CardDescription className='line-clamp-2'>
            {t('storeDescription')}: {store.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p
            className={cn(
              buttonVariants({
                className: 'w-full rounded-lg',
              })
            )}
          >
            {t('addProduct')}
          </p>
        </CardContent>
      </Card>
      <span className='sr-only'>{store.name}</span>
    </Link>
  );
}
