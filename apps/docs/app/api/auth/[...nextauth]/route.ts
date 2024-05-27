import NextAuth from 'next-auth'
import { authOptionConfig } from '../../../_lib/authOptions'

const handler = NextAuth(authOptionConfig)
export { handler as GET, handler as POST }
