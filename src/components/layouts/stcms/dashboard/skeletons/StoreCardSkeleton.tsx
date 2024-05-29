import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function StoreCardSkeleton() {
  return (
    <Card className='h-full overflow-hidden'>
      <CardHeader className='space-y-2'>
        <Skeleton className='h-4 w-1/2' />
        <Skeleton className='h-4 w-1/4' />
      </CardHeader>
    </Card>
  );
}
