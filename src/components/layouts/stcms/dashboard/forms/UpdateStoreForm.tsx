'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Store } from '@prisma/client';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { storePayload, storeSchema } from '@/lib/stcms/validators/store';
import { AlertModal } from '@/components/layouts/stcms/modals/AlertModal';
import { useScopedI18n } from '@/locales/client';

interface UpdateStoreFormProps {
  store: Store;
}

export const UpdateStoreForm: React.FC<UpdateStoreFormProps> = ({ store }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const t = useScopedI18n('stores');

  const form = useForm<storePayload>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: store.name,
      description: store.description!,
    },
  });

  const onSubmit = async (values: storePayload) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/stcms/store/${store.id}`, values);
      toast({
        title: t('storeIsUpdated'),
      });
      window.location.assign('/dashboard/store');
    } catch (error: any) {
      toast({
        title: error.response.data,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/stcms/store/${store.id}`);
      window.location.assign('/dashboard/store');
      toast({
        title: t('storeIsDeleted'),
      });
    } catch (error: any) {
      toast({
        title: error.response.data,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <Form {...form}>
        <form
          className='grid w-full max-w-xl gap-5'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('name')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('sNPlaceholder')}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('description')}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('sDPlaceholder')}
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col gap-2 xl:flex-row'>
            <Button disabled={isLoading}>
            {t('updateStore')}
              <span className='sr-only'>{t('updateStore')}</span>
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
              variant='destructive'
            >
              {t('deleteStore')}
              <span className='sr-only'>{t('deleteStore')}</span>
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
