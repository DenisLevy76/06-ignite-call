import NextAuth, { NextAuthOptions } from 'next-auth'
import GOOGLEProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GOOGLEProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
}
export default NextAuth(authOptions)
