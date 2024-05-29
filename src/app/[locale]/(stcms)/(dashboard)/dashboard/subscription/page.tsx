import { Heading } from '@/components/layouts/stcms/dashboard/Heading';
import { getUserSubscriptionPlan } from '@/lib/stcms/subscription';
import { Separator } from '@/components/ui/separator';
import { getScopedI18n } from '@/locales/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { BillingForm } from '@/components/layouts/stcms/dashboard/subscription/billing-form';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function Subscription() {
  const t = await getScopedI18n('subscription');
  const session = await getServerSession(authOptions);
  const subscriptionPlan = await getUserSubscriptionPlan(
    session?.user._id as string
  );
  let isCanceled = false;
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title={t('manageSubscription')} description='' />
      </div>
      <Separator className='my-4' />
      <BillingForm
        subscriptionPlan={{
          ...subscriptionPlan,
          isCanceled,
        }}
      />
    </>
  );
}
