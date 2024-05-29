import { Heading } from '@/components/layouts/stcms/dashboard/Heading';
import { StoreCardSkeleton } from '@/components/layouts/stcms/dashboard/skeletons/StoreCardSkeleton';
import { Separator } from '@/components/ui/separator';

export default function StoresLoading() {
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title='' description='' />
      </div>
      <Separator className='my-4' />
      <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <StoreCardSkeleton key={i} />
        ))}
      </section>
    </>
  );
}
