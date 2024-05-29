import { AddProductForm } from '@/components/layouts/stcms/dashboard/forms/AddProductForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getScopedI18n } from '@/locales/server';

const NewProductPage = async () => {
  const t = await getScopedI18n('stores');
  return (
    <Card
      id='new-product-page-form-container'
      aria-labelledby='new-product-page-form-heading'
    >
      <CardHeader className='space-y-4'>
        <CardTitle className='text-2xl'>{t('addProduct')}</CardTitle>
        <CardDescription>{t('addANewProductToYourStore')}</CardDescription>
      </CardHeader>
      <CardContent>
        <AddProductForm />
      </CardContent>
    </Card>
  );
};

export default NewProductPage;
