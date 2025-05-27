"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function GitHubCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [status, setStatus] = useState("Processing...")

  useEffect(() => {
    const handleGitHubCallback = async () => {
      const code = searchParams.get("code")
      const error = searchParams.get("error")

      if (error) {
        setStatus("Authentication failed. Redirecting...")
        setTimeout(() => router.push("/auth/signin"), 2000)
        return
      }

      if (!code) {
        setStatus("No authorization code received. Redirecting...")
        setTimeout(() => router.push("/auth/signin"), 2000)
        return
      }

      try {
        setStatus("Exchanging code for access token...")

        // Exchange code for access token
        const tokenResponse = await fetch("/api/auth/github/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        })

        if (!tokenResponse.ok) {
          throw new Error("Failed to exchange code for token")
        }

        const { access_token } = await tokenResponse.json()

        setStatus("Fetching user information...")

        // Get user info from GitHub
        const userResponse = await fetch("https://api.github.com/user", {
          headers: { Authorization: `Bearer ${access_token}` },
        })

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user info")
        }

        const githubUser = await userResponse.json()

        // Get user email
        const emailResponse = await fetch("https://api.github.com/user/emails", {
          headers: { Authorization: `Bearer ${access_token}` },
        })

        const emails = await emailResponse.json()
        const primaryEmail = emails.find((email: any) => email.primary)?.email || githubUser.email

        // Create user session
        const userSession = {
          id: githubUser.id.toString(),
          email: primaryEmail,
          name: githubUser.name || githubUser.login,
          role: "farmer" as const, // Default role for GitHub users
          avatar: githubUser.avatar_url,
          provider: "github" as const,
        }

        localStorage.setItem("auth-user", JSON.stringify(userSession))
        setStatus("Login successful! Redirecting...")

        setTimeout(() => router.push("/dashboard"), 1000)
      } catch (error) {
        console.error("GitHub callback error:", error)
        setStatus("Authentication failed. Redirecting...")
        setTimeout(() => router.push("/auth/signin"), 2000)
      }
    }

    handleGitHubCallback()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            GitHub Authentication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">{status}</p>
        </CardContent>
      </Card>
    </div>
  )
}
