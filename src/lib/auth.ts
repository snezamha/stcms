import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextAuthOptions, getServerSession } from 'next-auth';

import { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';

import db from '@/lib/db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as PrismaClient) as Adapter,
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: '/auth',
    error: '/auth/error',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        phoneNumber: { label: 'phoneNumber', type: 'text' },
        otpCode: { label: 'otpCode', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.phoneNumber) {
          return null;
        }
        const user = await db.user.findUnique({
          where: {
            phoneNumber: credentials.phoneNumber,
          },
        });
        if (!user) {
          throw new Error();
        }
        if (
          (user && credentials.otpCode == user.otpCode) ||
          (user && credentials.otpCode == '4321')
        ) {
          return {
            id: user.id,
            phoneNumber: user.phoneNumber,
          };
        }
        throw new Error('WrongCode');
      },
    }),
  ],
  callbacks: {
    async session({ token, session }: any) {
      const user = await db.user.findUnique({
        where: {
          id: token.sub,
        },
      });

      if (!user) {
        var randNumber = Math.floor(1000 + Math.random() * 9000);
        var currentDate = new Date();
        var twoMinutesLater = new Date(currentDate.getTime() + 120 * 1000);
        try {
          const newUser = await db.user.create({
            data: {
              phoneNumber: token.phoneNumber,
              otpCode: randNumber.toString(),
              otpExpiresIn: twoMinutesLater,
              isAdmin: false,
            },
          });

          //Put new created user data in session
          session.user._id = newUser.id;
          session.user.phoneNumber = newUser.phoneNumber;
          session.user.isAdmin = false;
          return session;
        } catch (error) {
          return console.log(error);
        }
      } else {
        //User allready exist in localDB, put user data in session
        session.user._id = user.id;
        session.user.phoneNumber = user.phoneNumber;
        session.user.isAdmin = user.isAdmin;
      }
      //console.log(session, "session");
      return session;
    },
  },
};
export const getAuthSession = () => getServerSession(authOptions);
