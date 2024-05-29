'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { useScopedI18n } from '@/locales/client';
import { FreePlanLimitError } from '@/lib/stcms/utils';
import { useCurrentLocale } from '@/locales/client';

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
import { checkIfFreePlanLimitReached } from './action';

export function AddStoreForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const t = useScopedI18n('stores');
  const locale = useCurrentLocale();
  const form = useForm<storePayload>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (values: storePayload) => {
    try {
      setIsLoading(true);
      const limitReached = await checkIfFreePlanLimitReached();
      if (limitReached) {
        throw new FreePlanLimitError();
      }
      await axios.post('/api/stcms/store', values);
      toast({
        title: t('storeIsCreated'),
      });
      window.location.assign('/dashboard/store');
    } catch (error: any) {
      if (error instanceof FreePlanLimitError) {
        return toast({
          title: locale === 'fa'
          ? 'به سقف استفاده از طرح رایگان رسیده‌اید. لطفاً طرح خود را ارتقا دهید.'
          : 'Free plan limit reached. Please upgrade your plan.',
          variant: 'destructive',
        });
      }
      toast({
        title: error.response.data,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
              <FormLabel> {t('name')}</FormLabel>
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
              <FormLabel> {t('description')}</FormLabel>
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
        <Button disabled={isLoading}>
          {t('add')}
          <span className='sr-only'>Add Store</span>
        </Button>
      </form>
    </Form>
  );
}
