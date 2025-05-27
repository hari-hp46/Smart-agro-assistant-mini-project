"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, BarChart3, Droplets, Bug, Cloud, MapPin, Users } from "lucide-react"
import Link from "next/link"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-700">AgroSmart</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/signin">
                <Button variant="outline" className="bg-white border-green-600 text-green-600 hover:bg-green-50">
                  Sign In
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-green-100 text-green-700 border-green-200">AI-Powered Agriculture</Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Smart Agriculture
            <span className="text-green-600"> Assistant</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Revolutionize your farming with AI-powered crop predictions, disease identification, and smart
            recommendations. Increase yields and reduce costs with data-driven insights.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline" className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Agricultural Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform provides everything you need to optimize your farming operations and maximize
              productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-gray-900">Crop Yield Prediction</CardTitle>
                <CardDescription className="text-gray-600">
                  AI-powered predictions based on soil conditions, weather patterns, and historical data.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Droplets className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-gray-900">Smart Fertilizer Recommendations</CardTitle>
                <CardDescription className="text-gray-600">
                  Personalized fertilizer suggestions based on soil analysis and crop requirements.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Bug className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle className="text-gray-900">Disease Identification</CardTitle>
                <CardDescription className="text-gray-600">
                  Instant disease detection using image recognition and AI-powered diagnosis.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Cloud className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle className="text-gray-900">Weather Monitoring</CardTitle>
                <CardDescription className="text-gray-600">
                  Real-time weather data and alerts to help you make informed farming decisions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-gray-900">Nearby Shops</CardTitle>
                <CardDescription className="text-gray-600">
                  Find agricultural suppliers, fertilizer shops, and equipment stores near you.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle className="text-gray-900">Expert Support</CardTitle>
                <CardDescription className="text-gray-600">
                  Connect with agricultural experts and get personalized advice for your farm.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
              <div className="text-gray-600">Active Farmers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">30%</div>
              <div className="text-gray-600">Yield Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using AgroSmart to increase their yields and reduce costs.
          </p>
          <Link href="/auth/signin">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-lg font-semibold text-gray-900">AgroSmart</span>
            </div>
            <div className="text-gray-600">© 2024 AgroSmart. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
