import Link from 'next/link';
import { Suspense } from 'react';
import { siteConfig } from '@/config/site';
import LocaleToggler from '../locale-toggler';
import ThemeToggle from '../theme-toggle';
import { getScopedI18n } from '@/locales/server';
import Settings from './settings';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export default async function Footer() {
  const scopedT = await getScopedI18n('footer');
  const session = await getServerSession(authOptions);

  return (
    <footer className='relative z-10 w-full border-t'>
      <div className='mx-auto flex max-w-7xl flex-col justify-between gap-1 px-4 py-1 sm:flex-row sm:items-center'>
        <div className='flex flex-col items-center gap-4 md:flex-row md:gap-2'>
          <p className='text-center text-sm leading-loose text-muted-foreground md:text-left'>
            {scopedT('copyRight')}
            <Link
              href={siteConfig().creator.link}
              target='_blank'
              rel='noreferrer'
              className='font-medium underline underline-offset-4'
            >
              {siteConfig().creator.name}
            </Link>
          </p>
        </div>

        <nav className='flex flex-row gap-1 font-medium justify-center'>
          <Settings session={session} />
          <Suspense>
            <LocaleToggler />
          </Suspense>
          <ThemeToggle />
        </nav>
      </div>
    </footer>
  );
}
