'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { cn, formatDate } from '@/lib/utils';
import { useScopedI18n } from '@/locales/client';
import { LoaderCircle } from 'lucide-react';

interface UserSubscriptionPlan {
  name: string;
  description: string;
  stCmsCurrentPeriodEnd: number;
  isPro: boolean;
}
interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan: UserSubscriptionPlan & {
    isCanceled: boolean;
  };
}

export function BillingForm({
  subscriptionPlan,
  className,
  ...props
}: BillingFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scopedT = useScopedI18n('subscription');
  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(!isLoading);

    const response = await fetch('/api/subscription');

    if (!response?.ok) {
      return toast({
        title: scopedT('somethingWentWrong'),
        description: scopedT('tryAgain'),
        variant: 'destructive',
      });
    }
    const session = await response.json();
    if (session) {
      window.location.href = session.url;
    }
  }

  return (
    <form className={cn(className)} onSubmit={onSubmit} {...props}>
      <Card>
        <CardHeader className='space-y-4'>
          <CardTitle>{scopedT('subscription')}</CardTitle>
          <CardDescription>
            <em>
              {scopedT('yourCurrentSubscription')}:{' '}
              <strong className='text-green-600'>
                {subscriptionPlan.name}
              </strong>
            </em>
          </CardDescription>
        </CardHeader>
        <CardContent className='font-medium '>
          {subscriptionPlan.description}
        </CardContent>
        <CardFooter className='flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0'>
          <Button type='submit' disabled={isLoading || subscriptionPlan.isPro}>
            {isLoading && (
              <LoaderCircle className='ltr:mr-2 rtl:ml-2 h-4 w-4 animate-spin' />
            )}
            {subscriptionPlan.isPro
              ? scopedT('noNeedToRenew')
              : scopedT('upgradeToPRO')}
          </Button>
          {subscriptionPlan.isPro ? (
            <p className='rounded-full text-red-600 text-xs font-medium md:self-end '>
              {scopedT('canceledOn')}
              {formatDate(subscriptionPlan.stCmsCurrentPeriodEnd, 'en-GB')}.
            </p>
          ) : null}
        </CardFooter>
      </Card>
    </form>
  );
}
