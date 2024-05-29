'use client';

import Link from 'next/link';

import UserAccountNav from './UserAccountNav';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';
import { buttonVariants } from '@/components/ui/button';

interface NavbarProps {
  user: {
    _id: string;
    phoneNumber: string;
    isAdmin: boolean;
    expires: string;
  };
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background py-3'>
      <nav className='container px-2 sm:px-4 lg:px-6 flex items-center justify-between'>
        {/* Left */}
        <MobileNav />
        <DesktopNav />

        {/* Right */}
        <div className='flex items-center gap-x-2'>
          {user ? (
            <UserAccountNav user={user} />
          ) : (
            <Link
              href='/sign-in'
              className={buttonVariants({
                size: 'sm',
              })}
            >
              Sign In
              <span className='sr-only'>Sign In</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
