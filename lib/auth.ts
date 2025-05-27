import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const { data: user, error } = await supabase.from("users").select("*").eq("email", credentials.email).single()

          if (error || !user) {
            return null
          }

          // In production, use proper password hashing (bcrypt)
          if (user.password === credentials.password) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              farmLocation: user.farm_location,
              farmSize: user.farm_size,
            }
          }

          return null
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [
          GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        // For GitHub OAuth, create user in database if doesn't exist
        if (account?.provider === "github") {
          try {
            const { data: existingUser } = await supabase.from("users").select("*").eq("email", user.email).single()

            if (!existingUser) {
              const { data: newUser } = await supabase
                .from("users")
                .insert({
                  email: user.email,
                  name: user.name,
                  password: "", // OAuth users don't need password
                  role: "farmer",
                })
                .select()
                .single()

              token.role = newUser?.role || "farmer"
              token.farmLocation = newUser?.farm_location
              token.farmSize = newUser?.farm_size
            } else {
              token.role = existingUser.role
              token.farmLocation = existingUser.farm_location
              token.farmSize = existingUser.farm_size
            }
          } catch (error) {
            console.error("Error creating OAuth user:", error)
            token.role = "farmer"
          }
        } else {
          token.role = user.role
          token.farmLocation = user.farmLocation
          token.farmSize = user.farmSize
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.farmLocation = token.farmLocation as string
        session.user.farmSize = token.farmSize as number
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}
