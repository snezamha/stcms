import { redirect } from 'next/navigation';

import { UpdateProductForm } from '@/components/layouts/stcms/dashboard/forms/UpdateProductForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import prisma from '@/lib/db';
import { getScopedI18n } from '@/locales/server';

const NewProductPage = async ({
  params,
}: {
  params: { storeId: string; productId: string };
}) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
  });

  if (!product) {
    redirect(`/dashboard/store/${params.storeId}/products`);
  }
  const t = await getScopedI18n('stores');
  return (
    <Card
      id='new-product-page-form-container'
      aria-labelledby='new-product-page-form-heading'
    >
      <CardHeader className='space-y-4'>
        <CardTitle className='text-2xl'>{t('updateProduct')}</CardTitle>
      </CardHeader>
      <CardContent>
        <UpdateProductForm product={product!} />
      </CardContent>
    </Card>
  );
};

export default NewProductPage;
