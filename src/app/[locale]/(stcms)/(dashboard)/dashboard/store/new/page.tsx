import { Heading } from '@/components/layouts/stcms/dashboard/Heading';
import { AddStoreForm } from '@/components/layouts/stcms/dashboard/forms/AddStoreForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getScopedI18n } from '@/locales/server';

const CreateStorePage = async () => {
  const t = await getScopedI18n('stores');
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={t('createStore')}
          description=''
        />
      </div>
      <Separator className='my-4' />
      <Card
        id='new-store-page-form-container'
        aria-labelledby='new-store-page-form-heading'
      >
        <CardHeader className='space-y-4'>
          <CardTitle className='text-2xl'>{t('addStore')}</CardTitle>
          <CardDescription>{t('addStoreHeadingDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <AddStoreForm />
        </CardContent>
      </Card>
    </>
  );
};

export default CreateStorePage;
