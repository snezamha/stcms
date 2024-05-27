import { signOut } from 'next-auth/react';

export const logout = async () => {
  signOut({ callbackUrl: '/auth' });
};
