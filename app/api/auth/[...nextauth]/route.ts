import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Simple mock authentication - replace with real database check
        if (credentials?.email === "admin@example.com" && credentials?.password === "admin123") {
          return {
            id: "1",
            email: "admin@example.com",
            name: "Admin User",
            role: "admin",
          }
        }
        if (credentials?.email === "farmer@example.com" && credentials?.password === "farmer123") {
          return {
            id: "2",
            email: "farmer@example.com",
            name: "Farmer User",
            role: "farmer",
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
