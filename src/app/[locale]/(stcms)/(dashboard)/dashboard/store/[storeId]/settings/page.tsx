import { redirect } from 'next/navigation';
import { getScopedI18n } from '@/locales/server';
import { UpdateStoreForm } from '@/components/layouts/stcms/dashboard/forms/UpdateStoreForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/db';

const UpdateStorePage = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const session = await getServerSession(authOptions);
  const store = await prisma.store.findFirst({
    where: {
      id: storeId,
      userId: session?.user._id,
    },
  });

  if (!store) {
    return redirect('/dashboard/store');
  }
  const t = await getScopedI18n('stores');
  return (
    <Card aria-labelledby='update-store-page-form-heading'>
      <CardHeader className='space-y-4'>
        <CardTitle className='text-2xl'>{t('updateYourStore')}</CardTitle>
        <CardDescription>
        {t('updateYourStoreDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UpdateStoreForm store={store!} />
      </CardContent>
    </Card>
  );
};

export default UpdateStorePage;
