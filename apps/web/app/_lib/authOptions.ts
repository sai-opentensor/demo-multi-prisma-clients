import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { AuthOptions } from 'next-auth'

import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '@repo/database'


export const authOptionConfig = {
  session: {
    strategy: 'database'
  },
  debug: true,
  // pages: {
  //   signIn: '/auth/sign-in',
  //   error: '/auth/sign-in',
  //   signOut: '/'
  // },
  callbacks: {
    async session({ session, user }) {
      console.log({ session })
      console.log({ user })
      return session
    }
  },
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma)
} as AuthOptions

export default NextAuth(authOptionConfig)
