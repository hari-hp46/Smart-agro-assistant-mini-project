"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface AnimatedBackgroundProps {
  children: React.ReactNode
  variant?: "wheat" | "corn" | "rice" | "mixed"
}

export function AnimatedBackground({ children, variant = "mixed" }: AnimatedBackgroundProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-green-50">{children}</div>
  }

  const getBackgroundPattern = () => {
    switch (variant) {
      case "wheat":
        return "🌾"
      case "corn":
        return "🌽"
      case "rice":
        return "🌾"
      default:
        return "🌾🌽🌱"
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50">
        {/* Floating crop elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
                fontSize: `${1 + Math.random() * 2}rem`,
              }}
            >
              {getBackgroundPattern().split("")[Math.floor(Math.random() * getBackgroundPattern().split("").length)]}
            </div>
          ))}
        </div>

        {/* Moving wave effect */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-100/30 to-transparent">
          <div className="absolute bottom-0 left-0 w-full h-16 bg-green-200/20 animate-wave"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes wave {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-wave {
          animation: wave 20s linear infinite;
        }
      `}</style>
    </div>
  )
}
