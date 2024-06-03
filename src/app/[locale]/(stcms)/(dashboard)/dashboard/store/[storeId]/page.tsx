import { DataTable } from '@/components/layouts/stcms/dashboard/DataTable';
import prisma from '@/lib/db';
import { ProductColumn, enColumns, faColumns } from './components/columns';
import { getCurrentLocale } from '@/locales/server';
export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const locale = getCurrentLocale();
  const data = await prisma.product.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedData: ProductColumn[] = data.map((item) => ({
    id: item.id,
    price: item.price,
    name: item.name,
    storeId: item.storeId,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));

  return (
    <div>
      <DataTable
        searchKey='name'
        columns={locale === 'fa' ? faColumns : enColumns}
        data={formattedData}
      />
    </div>
  );
}
