'use client';
import React from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { useScopedI18n } from '@/locales/client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';

export default function LogOutButton() {
  const scopedT = useScopedI18n('settings');
  return (
    <DropdownMenuItem asChild>
      <Link onClick={() => signOut()} href='#'>
        <LogOut className='ltr:mr-2 rtl:ml-2 h-4 w-4' aria-hidden='true' />
        {scopedT('signOut')}
      </Link>
    </DropdownMenuItem>
  );
}
