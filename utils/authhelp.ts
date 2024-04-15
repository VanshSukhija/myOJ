import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 100000,
      }
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_APP_SECRET_ID as string,
      httpOptions: {
        timeout: 100000,
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    }, 
    async jwt({ token, user, account }) {
      if(account){
        token.accessToken = account.access_token
        token.id = user?.id
      }
      return token
    }
  }
};
