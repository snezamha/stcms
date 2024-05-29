import { Heading } from '@/components/layouts/stcms/dashboard/Heading';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function AddNewStoreLoading() {
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title=''
          description=''
        />
      </div>
      <Separator className='my-4' />
      <Card>
        <CardHeader className='space-y-2'>
          <Skeleton className='h-6 w-1/4' />
          <Skeleton className='h-4 w-2/4' />
        </CardHeader>
        <CardContent>
          <div className='grid w-full max-w-xl gap-5'>
            <div className='space-y-2.5'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-6' />
            </div>
            <div className='space-y-2.5'>
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-20' />
            </div>
            <div className='flex flex-col gap-2 xl:flex-row'>
              <Skeleton className='h-10 w-full xl:w-32' />
              <Skeleton className='h-10 w-full xl:w-32' />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
