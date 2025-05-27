"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "farmer" | "expert"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  loginWithGitHub: () => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users for testing
const DEMO_USERS: User[] = [
  { id: "1", email: "admin@example.com", name: "Admin User", role: "admin" },
  { id: "2", email: "farmer@example.com", name: "John Farmer", role: "farmer" },
  { id: "3", email: "expert@example.com", name: "Dr. Expert", role: "expert" },
]

const DEMO_PASSWORDS: Record<string, string> = {
  "admin@example.com": "admin123",
  "farmer@example.com": "farmer123",
  "expert@example.com": "expert123",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("auth-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("auth-user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check demo credentials
    const demoUser = DEMO_USERS.find((u) => u.email === email)
    if (demoUser && DEMO_PASSWORDS[email] === password) {
      setUser(demoUser)
      localStorage.setItem("auth-user", JSON.stringify(demoUser))
      setLoading(false)
      return true
    }

    setLoading(false)
    return false
  }

  const loginWithGitHub = async (): Promise<void> => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID

    if (!clientId) {
      throw new Error("GitHub OAuth not configured")
    }

    const redirectUri = `${window.location.origin}/auth/github/callback`
    const scope = "user:email"
    const state = Math.random().toString(36).substring(7)

    localStorage.setItem("github-oauth-state", state)

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${state}`

    window.location.href = authUrl
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth-user")
    localStorage.removeItem("github-oauth-state")
  }

  const value: AuthContextType = {
    user,
    login,
    loginWithGitHub,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
