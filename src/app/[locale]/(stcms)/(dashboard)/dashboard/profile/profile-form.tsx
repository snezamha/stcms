'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
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
import { toast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { useScopedI18n } from '@/locales/client';

import { updateUser } from './actions';
export const profileSchema = z.object({
  fullName: z
    .string({
      required_error: 'Please type your name.',
    })
    .min(3, {
      message: 'Name must be at least 3 characters.',
    })
    .max(50, {
      message: 'Name must be at most 50 characters.',
    }),
  phoneNumber: z.string(),
});

export type ProfileValues = z.infer<typeof profileSchema>;
interface ProfileFormProps {
  currentUser: {
    _id: string;
    fullName: string;
    phoneNumber: string;
    isAdmin: boolean;
    expires: string;
  };
}

const ProfileForm: React.FC<ProfileFormProps> = ({ currentUser }) => {
  const [pending, startTransition] = useTransition();

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
    values: {
      fullName: currentUser.fullName,
      phoneNumber: currentUser.phoneNumber,
    },
  });

  const { formState } = form;
  const scopedT = useScopedI18n('profile');

  function onSubmit(data: ProfileValues) {
    if (!formState.isDirty) return;

    startTransition(() => {
      const updatePromise = updateUser(currentUser._id, data);

      return updatePromise
        .then(() => {
          toast({
            title: scopedT('updatedSuccessfully'),
          });
        })
        .catch(() => {
          toast({
            title: scopedT('somethingWentWrong'),
            variant: 'destructive',
          });
        });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='max-w-2xl space-y-8 rounded-md border p-6 '
      >
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{scopedT('fullName')}</FormLabel>
              <FormControl>
                <Input placeholder='Your full name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phoneNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{scopedT('phoneNumber')}</FormLabel>
              <FormControl>
                <Input
                  className=' bg-muted'
                  readOnly
                  placeholder='Your phone number'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='inline-flex gap-x-4'>
          <Button
            type='submit'
            disabled={formState.isSubmitting || pending || !formState.isDirty}
          >
            {formState.isSubmitting || pending ? (
              <>
                <Loader2 className='ltr:mr-2 rtl:ml-2 h-4 w-4 animate-spin' />
                {scopedT('updating')} ...
              </>
            ) : (
              scopedT('update')
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default ProfileForm;
