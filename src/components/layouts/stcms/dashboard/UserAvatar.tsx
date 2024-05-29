import { User } from 'next-auth';
import { FC } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Icons } from '@/components/Icons';
import { AvatarProps } from '@radix-ui/react-avatar';

interface UserAvatarProps extends AvatarProps {
  user: {
    phoneNumber: string;
  };
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      <AvatarFallback>
        <span className='sr-only'>{user?.phoneNumber}</span>
        <Icons.user className='h-4 w-4' />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
