import { Heading } from '@/components/layouts/stcms/dashboard/Heading';
import { Separator } from '@/components/ui/separator';
import { getScopedI18n } from '@/locales/server';
import ProfileForm from './profile-form';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export default async function Profile() {
  const t = await getScopedI18n('profile');
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className='flex items-center justify-between'>
        <Heading
          title={t('profile')}
          description='Please log in to manage your profile.'
        />
      </div>
    );
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title={t('profile')} description='' />
      </div>
      <Separator className='my-4' />
      <ProfileForm currentUser={session.user} />
    </>
  );
}
