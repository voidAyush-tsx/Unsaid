import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import { prisma } from './prisma';

type UserWithRole = { id: string; name?: string | null; email?: string | null; role?: 'ADMIN' | 'COUNSELLOR' | 'USER' };
type JWTToken = { id?: string; role?: 'ADMIN' | 'COUNSELLOR' | 'USER'; [k: string]: unknown };

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user || !user.hashedPassword) return null;
        const valid = await compare(credentials.password, user.hashedPassword);
        if (!valid) return null;
        return { id: user.id, name: user.name, email: user.email };
      }
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      // on initial sign in, persist user id and role into the token
      if (user) {
        const u = user as unknown as UserWithRole;
        token.id = (u && (u.id as string)) || token.id;
        if (u?.role) token.role = u.role;
      }
      return token;
    },
    async session({ session, token }) {
      // expose id and role from token to session.user
      if (session.user) {
        const t = token as JWTToken;
  if (t.id) session.user.id = String(t.id);
  if (t.role) session.user.role = t.role;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};
