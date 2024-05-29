'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Product } from '@prisma/client';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { useScopedI18n } from '@/locales/client';
import { Textarea } from '@/components/ui/textarea';
import { productPayload, productSchema } from '@/lib/stcms/validators/product';

import { FileUpload } from './FileUpload';

export function AddProductForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const t = useScopedI18n('stores');

  const form = useForm<productPayload>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
    },
  });

  const onSubmit = async (values: productPayload) => {
    try {
      setIsLoading(true);
      const { data }: { data: Product } = await axios.post(
        `/api/stcms/store/${params.storeId}/product`,
        values
      );
      toast({
        title: t('productIsCreated'),
      });
      window.location.assign(`/dashboard/store/${data.storeId}`);
    } catch (error: any) {
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
                  placeholder={t('pNPlaceholder')}
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
                  placeholder={t('pDPlaceholder')}
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col items-start gap-6 sm:flex-row'>
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem className='flex-1 w-full'>
                <FormLabel>{t('category')}</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value: typeof field.value) =>
                    field.onChange(value)
                  }
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('sACategory')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='simcard'>{t('simcard')}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='flex-1 w-full'>
                <FormLabel>{t('price')}</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='0'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='images'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('images')}</FormLabel>
              <FormControl>
                <FileUpload
                  endpoint='imageUploader'
                  value={field.value}
                  onChange={(file) =>
                    field.value
                      ? field.onChange([...(field.value || []), ...file])
                      : field.onChange([...file])
                  }
                  onRemove={(url) =>
                    field.onChange([
                      ...(field.value || []).filter(
                        (current) => current.url !== url
                      ),
                    ])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading}>
        {t('addProduct')}
          <span className='sr-only'> {t('addProduct')}</span>
        </Button>
      </form>
    </Form>
  );
}
