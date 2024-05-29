import Link from 'next/link';

const DesktopNav = () => {
  return (
    <div className='hidden lg:flex gap-x-8 items-center'>
      <Link href='/' className='flex space-x-2'>
        <span className='hidden font-bold lg:inline-block'>StCMS</span>
      </Link>
    </div>
  );
};

export default DesktopNav;
