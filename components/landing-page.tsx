"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Sprout,
  CloudRain,
  TrendingUp,
  Shield,
  Leaf,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Users,
  Globe,
  Zap,
  BookOpen,
  Star,
  Calendar,
} from "lucide-react"

export function LandingPage() {
  const [isHovered, setIsHovered] = useState(false)

  const features = [
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: "Crop Yield Prediction",
      description: "AI-powered predictions based on soil, weather, and farming practices to maximize your harvest.",
      benefits: ["95% accuracy", "Real-time analysis", "Multiple crop types"],
    },
    {
      icon: <Leaf className="h-8 w-8 text-blue-600" />,
      title: "Smart Fertilizer Recommendations",
      description: "Get precise fertilizer recommendations tailored to your soil conditions and crop requirements.",
      benefits: ["Soil-specific advice", "Cost optimization", "Organic alternatives"],
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Disease Identification",
      description: "Upload plant images to instantly identify diseases and receive treatment recommendations.",
      benefits: ["Instant diagnosis", "Treatment protocols", "Prevention tips"],
    },
    {
      icon: <CloudRain className="h-8 w-8 text-purple-600" />,
      title: "Weather Intelligence",
      description: "Real-time weather data and agricultural advisories to plan your farming activities.",
      benefits: ["5-day forecasts", "Agricultural alerts", "Climate insights"],
    },
  ]

  const stats = [
    { number: "10,000+", label: "Farmers Helped", icon: <Users className="h-6 w-6" /> },
    { number: "50+", label: "Countries", icon: <Globe className="h-6 w-6" /> },
    { number: "95%", label: "Accuracy Rate", icon: <BarChart3 className="h-6 w-6" /> },
    { number: "24/7", label: "Support", icon: <Zap className="h-6 w-6" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-green-800">AgroSmart</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/features" className="text-gray-600 hover:text-green-600 transition-colors">
                Features
              </Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">
                How it Works
              </Link>
              <Link href="/resources" className="text-gray-600 hover:text-green-600 transition-colors">
                Resources
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors">
                About
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                >
                  Let's Go
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/placeholder.svg?height=800&width=1200&text=Beautiful+Farm+Landscape')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-green-800/50 to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <Leaf className="h-8 w-8 text-green-300" />
          </div>
        </div>
        <div className="absolute top-40 right-20 animate-pulse">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <CloudRain className="h-8 w-8 text-blue-300" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="mb-4 bg-green-600/20 text-green-100 border-green-400">🌱 AI-Powered Agriculture</Badge>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Smart Farming for
                <span className="text-green-300 block">Better Harvests</span>
              </h1>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Harness the power of artificial intelligence to optimize your crop yields, reduce costs, and make
                data-driven farming decisions. Join thousands of farmers already using our platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    Let's Go
                    <ArrowRight className={`ml-2 h-5 w-5 transition-transform ${isHovered ? "translate-x-1" : ""}`} />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-800 px-8 py-4 text-lg"
                >
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Hero Image/Card */}
            <div className="relative">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-green-400" />
                    Live Farm Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Crop Health</span>
                    <Badge className="bg-green-500 text-white">Excellent</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Soil Moisture</span>
                    <span className="text-green-400 font-semibold">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Expected Yield</span>
                    <span className="text-green-400 font-semibold">+15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Weather Alert</span>
                    <Badge className="bg-blue-500 text-white">Rain Expected</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-green-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800">Features</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need for Smart Farming</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and insights you need to optimize your agricultural
              operations and maximize your yields.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
              >
                <CardHeader>
                  <img
                    src={`/placeholder.svg?height=150&width=300&text=${feature.title.replace(/\s+/g, "+")}&bg=16a34a&color=ffffff`}
                    alt={feature.title}
                    className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">How It Works</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Steps to Smarter Farming</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="/placeholder.svg?height=100&width=200&text=Input+Farm+Data&bg=16a34a&color=ffffff"
                alt="Input Your Data"
                className="mx-auto rounded-lg shadow-md mb-4"
              />
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Input Your Data</h3>
              <p className="text-gray-600">
                Enter your farm details, soil conditions, and crop information into our intuitive platform.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/placeholder.svg?height=100&width=200&text=AI+Analysis&bg=3b82f6&color=ffffff"
                alt="AI Analysis"
                className="mx-auto rounded-lg shadow-md mb-4"
              />
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Analysis</h3>
              <p className="text-gray-600">
                Our AI algorithms analyze your data along with weather patterns and agricultural best practices.
              </p>
            </div>
            <div className="text-center">
              <img
                src="/placeholder.svg?height=100&width=200&text=Get+Recommendations&bg=9333ea&color=ffffff"
                alt="Get Recommendations"
                className="mx-auto rounded-lg shadow-md mb-4"
              />
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Recommendations</h3>
              <p className="text-gray-600">
                Receive personalized recommendations for optimal yields, fertilizer use, and crop management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Resources Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800">Knowledge Center</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Learn from Agricultural Experts</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access comprehensive guides, practical tips, and expert insights to improve your farming practices and
              increase productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <img
                  src="/placeholder.svg?height=120&width=250&text=Expert+Guides&bg=16a34a&color=ffffff"
                  alt="Expert Guides"
                  className="w-full h-24 object-cover rounded-lg mb-4"
                />
                <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Expert Guides</CardTitle>
                <CardDescription>
                  Comprehensive guides on soil management, pest control, and sustainable farming practices.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <img
                  src="/placeholder.svg?height=120&width=250&text=Quick+Tips&bg=eab308&color=ffffff"
                  alt="Quick Tips"
                  className="w-full h-24 object-cover rounded-lg mb-4"
                />
                <Star className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle>Quick Tips</CardTitle>
                <CardDescription>
                  Practical farming tips and tricks from experienced farmers and agricultural experts.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <img
                  src="/placeholder.svg?height=120&width=250&text=Seasonal+Advice&bg=3b82f6&color=ffffff"
                  alt="Seasonal Advice"
                  className="w-full h-24 object-cover rounded-lg mb-4"
                />
                <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Seasonal Advice</CardTitle>
                <CardDescription>
                  Season-specific recommendations for planting, maintenance, and harvesting activities.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/resources">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4">
                Explore Resources
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Farming?</h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of farmers who are already using AI to increase their yields and reduce costs. Let's get
            started today and see the difference smart farming can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Let's Go
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sprout className="h-8 w-8 text-green-400" />
                <span className="text-xl font-bold">AgroSmart</span>
              </div>
              <p className="text-gray-400">
                Empowering farmers with AI-driven insights for sustainable and profitable agriculture.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AgroSmart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
