import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
export default async function AuthLayout({
  children,
}: React.PropsWithChildren) {
  const session = await getServerSession(authOptions);
  if (session) redirect('/');
  return (
    <>
      <div className='flex-grow flex justify-center items-center mt-16'>
        <div className='w-full max-w-[400px] px-5'>{children}</div>
      </div>
    </>
  );
}
