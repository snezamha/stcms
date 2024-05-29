'use server';

import db from '@/lib/db';
import { getUserSubscriptionPlan } from '@/lib/stcms/subscription';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function checkIfFreePlanLimitReached() {
  // Get the current session
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error('User session not found');
  }

  // Get the user's subscription plan
  const subscriptionPlan = await getUserSubscriptionPlan(
    session.user._id as string
  );
  // If the user is on a Pro plan, they haven't reached the free plan limit
  if (subscriptionPlan?.isPro || session.user.isAdmin) return false;

  // Count the number of stores the user has
  const count = await db.store.count({
    where: {
      userId: session.user._id,
    },
  });

  // Return true if the user has reached or exceeded the limit for free plans (1 store)
  return count >= 1;
}
