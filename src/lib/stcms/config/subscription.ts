import { getCurrentLocale } from '@/locales/server';
let locale: string;
try {
  locale = getCurrentLocale();
} catch (error) {
  locale = 'en';
}

interface SubscriptionPlan {
  name: string;
  description: string;
  stripePriceId: string;
}

export const freePlan: SubscriptionPlan = {
  name: locale === 'fa' ? 'رایگان' : 'Free',
  description:
    locale === 'fa'
      ? 'می توانید حداکثر 1 فروشگاه ایجاد کنید. برای فروشگاه های نامحدود به طرح حرفه ای ارتقا دهید.'
      : 'You can create up to 1 Store. Upgrade to the PRO plan for unlimited stores.',
  stripePriceId: '',
};

export const proPlan: SubscriptionPlan = {
  name: locale === 'fa' ? 'حرفه ای' : 'PRO',
  description:
    locale === 'fa'
      ? 'اکنون شما فروشگاه های نامحدودی دارید!'
      : 'Now you have unlimited stores!',
  stripePriceId: process.env.PRO_PLN_PRICE as string,
};
