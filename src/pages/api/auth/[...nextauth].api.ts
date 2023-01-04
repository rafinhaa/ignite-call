import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '../../../lib/auth/prisma-adapter'

const USER_INFO_EMAIL = 'https://www.googleapis.com/auth/userinfo.email'
const USER_INFO_PROFILE = 'https://www.googleapis.com/auth/userinfo.profile'
const CALENDAR = 'https://www.googleapis.com/auth/calendar'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: `${USER_INFO_EMAIL} ${USER_INFO_PROFILE} ${CALENDAR}`,
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (!account?.scope?.includes(CALENDAR))
        return '/register/connect-calendar/?error=permissions'
      return true
    },
  },
}

export default NextAuth(authOptions)
