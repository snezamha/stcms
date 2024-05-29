import { freePlan, proPlan } from './config/subscription';
import db from '../db';

interface UserSubscriptionPlan {
  stCmsCurrentPeriodEnd: number;
  isPro: boolean;
}

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      stCmsCurrentPeriodEnd: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Check if user is on a pro plan.
  const isPro = Boolean(
    user.stCmsCurrentPeriodEnd?.getTime()! + 86_400_000 > Date.now()
  );

  const plan = isPro ? proPlan : freePlan;
  return {
    ...plan,
    ...user,
    stCmsCurrentPeriodEnd: user.stCmsCurrentPeriodEnd?.getTime()!,
    isPro,
  };
}
