'use client';

import axios from 'axios';
import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useScopedI18n } from '@/locales/client';

import { AlertModal } from '@/components/layouts/stcms/modals/AlertModal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ProductColumn } from './columns';

interface CellActionProps {
  data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const t = useScopedI18n('stores');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onView = () => {
    router.push(`/${data.storeId}/?productId=${data.id}`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/stcms/store/${params.storeId}/product/${data.id}`
      );
      router.refresh();
      toast({
        title: t('productDeleted'),
      });
    } catch (error) {
      toast({
        title: t('somethingWentWrong'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onView()}>
            <Eye className='ltr:mr-2 rtl:ml-2 h-4 w-4' />
            {t('view')}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/dashboard/store/${params.storeId}/${data.id}`)
            }
          >
            <Edit className='ltr:mr-2 rtl:ml-2 h-4 w-4' />
            {t('update')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='ltr:mr-2 rtl:ml-2 h-4 w-4' />
            {t('delete')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
