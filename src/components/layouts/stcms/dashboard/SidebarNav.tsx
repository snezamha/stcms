'use client';

import { Store ,CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { useScopedI18n } from '@/locales/client';

import { cn } from '@/lib/utils';
import { DashboardIcon } from '@radix-ui/react-icons';

export function SidebarNav() {
  const segment = useSelectedLayoutSegment();
  const scopedT = useScopedI18n('sideBarNav');

  return (
    <nav>
      <ul className='space-y-4'>
        <li>
          <Link aria-label='Dashboard' href='/dashboard'>
            <span
              className={cn(
                'font-medium flex w-full items-center rounded-md border border-transparent px-2 py-1',
                segment == null
                  ? 'bg-muted font-medium text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              <DashboardIcon
                className='ltr:mr-2 rtl:ml-2 h-4 w-4'
                aria-hidden='true'
              />
              <span>{scopedT('dashboard')}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link aria-label='Stores' href='/dashboard/store'>
            <span
              className={cn(
                'font-medium flex w-full items-center rounded-md border border-transparent px-2 py-1',
                segment === 'stores'
                  ? 'bg-muted font-medium text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              <Store className='ltr:mr-2 rtl:ml-2 h-4 w-4' aria-hidden='true' />
              <span>{scopedT('stores')}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link aria-label='Subscription' href='/dashboard/subscription'>
            <span
              className={cn(
                'font-medium flex w-full items-center rounded-md border border-transparent px-2 py-1',
                segment === 'subscription'
                  ? 'bg-muted font-medium text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              <CreditCard className='ltr:mr-2 rtl:ml-2 h-4 w-4' aria-hidden='true' />
              <span>{scopedT('subscription')}</span>
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
