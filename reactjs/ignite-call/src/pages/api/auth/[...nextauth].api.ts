import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const clientId = process.env.GOOGLE_AUTH_CLIENT_ID ?? ''
const clientSecret = process.env.GOOGLE_AUTH_SECRET_KEY ?? ''

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId,
      clientSecret,
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      const hasCalendarPermission = account?.scope?.includes(
        'https://www.googleapis.com/auth/calendar',
      )

      if (!hasCalendarPermission) {
        return '/register/calendar?error=permissions'
      }

      return true
    },
    async session({ session, user }) {
      return {
        ...session,
        user,
      }
    },
  },
}

export default NextAuth(authOptions)
