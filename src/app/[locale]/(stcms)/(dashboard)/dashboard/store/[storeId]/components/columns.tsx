'use client';

import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from '@/lib/utils';
import { CellAction } from './cell-action';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  price: string;
  name: string;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
};

export const enColumns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className='truncate max-w-[300px]'>{row.original.name}</div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ cell }) => formatDate(cell.getValue() as Date, 'en-GB'),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ cell }) => formatDate(cell.getValue() as Date, 'en-GB'),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
export const faColumns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'عنوان',
    cell: ({ row }) => (
      <div className='truncate max-w-[300px]'>{row.original.name}</div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'دسته بندی',
  },
  {
    accessorKey: 'price',
    header: 'قیمت',
  },
  {
    accessorKey: 'createdAt',
    header: 'تاریخ ایجاد',
    cell: ({ cell }) => formatDate(cell.getValue() as Date, 'fa-IR'),
  },
  {
    accessorKey: 'updatedAt',
    header: 'تاریخ بروز رسانی',
    cell: ({ cell }) => formatDate(cell.getValue() as Date, 'fa-IR'),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
