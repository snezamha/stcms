import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id: string;
      fullName: string;
      phoneNumber: string;
      isAdmin: boolean;
      expires: string;
    };
  }
}
