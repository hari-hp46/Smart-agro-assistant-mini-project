"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "farmer" | "expert"
  avatar?: string
  provider?: "credentials" | "github"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  loginWithGitHub: () => Promise<void>
  logout: () => void
  isLoading: boolean
  isGitHubEnabled: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database
const mockUsers = [
  { id: "1", email: "admin@example.com", password: "admin123", name: "Admin User", role: "admin" as const },
  { id: "2", email: "farmer@example.com", password: "farmer123", name: "John Farmer", role: "farmer" as const },
  { id: "3", email: "expert@example.com", password: "expert123", name: "Dr. Expert", role: "expert" as const },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Check if GitHub OAuth is configured
  const isGitHubEnabled =
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID &&
    process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID !== "your_github_client_id"

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("auth-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const userSession = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        provider: "credentials" as const,
      }
      setUser(userSession)
      localStorage.setItem("auth-user", JSON.stringify(userSession))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const loginWithGitHub = async (): Promise<void> => {
    if (!isGitHubEnabled) {
      alert("GitHub OAuth is not configured. Please use credential login.")
      return
    }

    setIsLoading(true)

    try {
      const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
      const redirectUri = `${window.location.origin}/auth/github/callback`
      const scope = "user:email"

      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${Math.random().toString(36)}`

      window.location.href = githubAuthUrl
    } catch (error) {
      console.error("GitHub login error:", error)
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("auth-user")
  }

  return (
    <AuthContext.Provider value={{ user, login, loginWithGitHub, logout, isLoading, isGitHubEnabled }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
