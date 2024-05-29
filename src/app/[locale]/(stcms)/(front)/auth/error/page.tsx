'use client';
import { useSearchParams } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { useScopedI18n } from '@/locales/client';
import { useCurrentLocale } from '@/locales/client';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const scopedT = useScopedI18n('auth');
  const locale = useCurrentLocale();

  let errorMessage;
  switch (error) {
    case 'OAuthAccountNotLinked':
      errorMessage =
        'To confirm your identity, sign in with the same account you used originally.';
      break;
    case 'EmailCreateAccount':
      errorMessage =
        'An account with this email already exists. Please log in.';
      break;
    case 'AccessDenied':
      errorMessage = 'You do not have permission to sign in.';
      break;
    case 'WrongCode':
      errorMessage =
        locale === 'fa'
          ? 'کد تایید اشتباه است.'
          : 'The verification code is incorrect.';
      break;
    case 'Configuration':
      errorMessage = 'There is a problem with the server configuration.';
      break;
    default:
      errorMessage =
        locale === 'fa'
          ? 'یک خطای ناشناخته رخ داد. لطفا دوباره تلاش کنید.'
          : 'An unknown error occurred. Please try again.';
      break;
  }

  return (
    <section className='flex items-center h-full'>
      <div className='flex flex-col items-center justify-center space-y-8 text-center'>
        <h1 className='text-xl font-bold mb-4'>
          {scopedT('authenticationError')}
        </h1>
        <p>{errorMessage}</p>
        <Link href='/auth' className={buttonVariants()}>
          {scopedT('backToAuth')}
        </Link>
      </div>
    </section>
  );
}
