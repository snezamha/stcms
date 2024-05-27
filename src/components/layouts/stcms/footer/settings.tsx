'use client';
import { Settings, Home, LogIn, LayoutDashboard } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useScopedI18n } from '@/locales/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DefaultSession } from 'next-auth';
import LogOutButton from './logout';

interface SettingsProps {
  session: DefaultSession | null;
}

export default function SettingsMenu({ session }: SettingsProps) {
  const scopedT = useScopedI18n('settings');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Settings className='h-5 w-5' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem asChild>
          <Link href='/'>
            <Home className='ltr:mr-2 rtl:ml-2 h-4 w-4' aria-hidden='true' />
            {scopedT('mainPage')}
          </Link>
        </DropdownMenuItem>
        {session ? (
          <>
            <DropdownMenuItem asChild>
              <Link href='/dashboard'>
                <LayoutDashboard
                  className='ltr:mr-2 rtl:ml-2 h-4 w-4'
                  aria-hidden='true'
                />
                {scopedT('dashboard')}
              </Link>
            </DropdownMenuItem>
            <LogOutButton />
          </>
        ) : (
          <DropdownMenuItem asChild>
            <Link href='/auth'>
              <LogIn className='ltr:mr-2 rtl:ml-2 h-4 w-4' aria-hidden='true' />
              {scopedT('signIn')}
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
