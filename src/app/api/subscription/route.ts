import { type NextRequest } from 'next/server';
import { z } from 'zod';
import { siteConfig } from '@/config/site';
import { proPlan } from '@/lib/stcms/config/subscription';
import { getUserSubscriptionPlan } from '@/lib/stcms/subscription';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
export async function GET(req: NextRequest) {
  const locale = req.cookies.get('Next-Locale')?.value || 'en';

  const Url = siteConfig(locale).url + '/dashboard/subscription/';
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const subscriptionPlan = await getUserSubscriptionPlan(session.user._id);

    // The user is on the pro plan.
    // Create a portal session to manage subscription.
    if (subscriptionPlan.isPro) {
      return Response.json({ url: Url });
    }

    // The user is on the free plan.
    // Create a checkout session to upgrade.
    // ye gohii bokhor

    return new Response(JSON.stringify({ url: Url }));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
