'use client';

import { LayoutDashboard, LogOut, Home } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useScopedI18n } from '@/locales/client';

import UserAvatar from './UserAvatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UserAccountNavProps {
  user: {
    _id: string;
    phoneNumber: string;
    isAdmin: boolean;
    expires: string;
  };
}

const UserAccountNav: React.FC<UserAccountNavProps> = ({ user }) => {
  const scopedT = useScopedI18n('settings');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none'>
        <UserAvatar
          className='h-8 w-8'
          user={{
            phoneNumber: user.phoneNumber,
          }}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <div className='flex items-center justify-center gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            {user.phoneNumber && (
              <p className='truncate text-xs text-muted-foreground'>
                {user.phoneNumber}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href='/'>
              <Home className='ltr:mr-2 rtl:ml-2 h-4 w-4' aria-hidden='true' />
              {scopedT('mainPage')}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href='/dashboard'>
              <LayoutDashboard
                className='ltr:mr-2 rtl:ml-2 h-4 w-4'
                aria-hidden='true'
              />
              {scopedT('dashboard')}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()} asChild>
          <div>
            <LogOut className='ltr:mr-2 rtl:ml-2 h-4 w-4' aria-hidden='true' />
            {scopedT('signOut')}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
