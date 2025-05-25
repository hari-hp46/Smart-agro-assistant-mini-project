"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedBackground } from "@/components/animated-background"
import {
  Sprout,
  TrendingUp,
  Leaf,
  Shield,
  CloudRain,
  BarChart3,
  Zap,
  Brain,
  Smartphone,
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Target,
  Clock,
  DollarSign,
} from "lucide-react"

export function FeaturesPage() {
  const mainFeatures = [
    {
      icon: <TrendingUp className="h-12 w-12 text-green-600" />,
      title: "AI-Powered Crop Yield Prediction",
      description:
        "Advanced machine learning algorithms analyze multiple data points to predict your crop yields with 95% accuracy.",
      features: [
        "Multi-factor analysis including soil, weather, and nutrients",
        "Real-time predictions with confidence scoring",
        "Historical data comparison and trends",
        "Optimization recommendations for maximum yield",
      ],
      benefits: ["Increase yields by up to 25%", "Reduce crop losses", "Better planning and resource allocation"],
    },
    {
      icon: <Leaf className="h-12 w-12 text-blue-600" />,
      title: "Smart Fertilizer Recommendations",
      description:
        "Get precise, soil-specific fertilizer recommendations that optimize nutrition while minimizing costs.",
      features: [
        "Soil analysis and nutrient deficiency detection",
        "Crop-specific fertilizer formulations",
        "Organic and chemical fertilizer options",
        "Application timing and scheduling",
      ],
      benefits: ["Reduce fertilizer costs by 30%", "Improve soil health", "Increase nutrient efficiency"],
    },
    {
      icon: <Shield className="h-12 w-12 text-red-600" />,
      title: "Disease & Pest Identification",
      description:
        "Upload plant images for instant disease identification and receive comprehensive treatment protocols.",
      features: [
        "AI-powered image recognition technology",
        "Comprehensive disease and pest database",
        "Treatment and prevention recommendations",
        "Organic and chemical control options",
      ],
      benefits: ["Early disease detection", "Reduce crop damage by 40%", "Lower pesticide usage"],
    },
    {
      icon: <CloudRain className="h-12 w-12 text-purple-600" />,
      title: "Weather Intelligence & Alerts",
      description: "Real-time weather data and agricultural advisories help you make informed farming decisions.",
      features: [
        "5-day detailed weather forecasts",
        "Agricultural-specific weather alerts",
        "Irrigation scheduling recommendations",
        "Climate trend analysis",
      ],
      benefits: ["Optimize irrigation timing", "Prevent weather-related losses", "Plan activities efficiently"],
    },
  ]

  const additionalFeatures = [
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      title: "Farm Analytics Dashboard",
      description: "Comprehensive analytics and insights about your farm performance.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-blue-600" />,
      title: "Mobile-First Design",
      description: "Access all features on any device, anywhere in your fields.",
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: "Global Weather Data",
      description: "Accurate weather information from reliable global sources.",
    },
    {
      icon: <Brain className="h-8 w-8 text-orange-600" />,
      title: "Machine Learning",
      description: "Continuously improving predictions based on your farm data.",
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-600" />,
      title: "Real-Time Processing",
      description: "Instant analysis and recommendations when you need them.",
    },
    {
      icon: <Target className="h-8 w-8 text-red-600" />,
      title: "Precision Agriculture",
      description: "Targeted recommendations for specific areas of your farm.",
    },
  ]

  const benefits = [
    {
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      title: "Increase Profitability",
      description: "Optimize inputs and maximize yields to boost your farm's profitability.",
      stat: "25% average yield increase",
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      title: "Save Time",
      description: "Automate decision-making and reduce time spent on manual analysis.",
      stat: "10+ hours saved per week",
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "Sustainable Farming",
      description: "Reduce chemical usage and promote environmentally friendly practices.",
      stat: "30% reduction in inputs",
    },
  ]

  return (
    <AnimatedBackground variant="mixed">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-green-800">AgroSmart</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/#features" className="text-green-600 font-medium">
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
                <Button className="bg-green-600 hover:bg-green-700 text-white">Let's Go</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="mb-6">
              <img
                src="/placeholder.svg?height=200&width=800&text=Advanced+Agricultural+Technology&bg=16a34a&color=ffffff"
                alt="Advanced Agricultural Technology"
                className="mx-auto rounded-lg shadow-lg"
              />
            </div>
            <Badge className="mb-4 bg-green-100 text-green-800">🚀 Advanced Features</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Powerful Tools for
              <span className="text-green-600 block">Modern Farmers</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover how our AI-powered platform transforms traditional farming with cutting-edge technology,
              data-driven insights, and intelligent automation.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4">
                Explore Features
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {mainFeatures.map((feature, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardHeader>
                      <div className="mb-4">{feature.icon}</div>
                      <CardTitle className="text-2xl mb-4">{feature.title}</CardTitle>
                      <CardDescription className="text-lg text-gray-600">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-semibold mb-3">Key Features:</h4>
                          <ul className="space-y-2">
                            {feature.features.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-3">Benefits:</h4>
                          <div className="flex flex-wrap gap-2">
                            {feature.benefits.map((benefit, idx) => (
                              <Badge key={idx} variant="secondary" className="bg-green-100 text-green-800">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <div className="relative">
                    <img
                      src={`/placeholder.svg?height=400&width=600&text=${feature.title.replace(/\s+/g, "+")}&bg=22c55e&color=ffffff`}
                      alt={feature.title}
                      className="rounded-lg shadow-2xl"
                    />
                    <div className="absolute -top-4 -right-4 bg-green-600 text-white p-3 rounded-full">
                      <Star className="h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Capabilities</h2>
            <p className="text-xl text-gray-600">More features to enhance your farming experience</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose AgroSmart?</h2>
            <p className="text-xl text-gray-600">Proven results that make a difference</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm text-center hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <img
                    src={`/placeholder.svg?height=150&width=300&text=${benefit.title.replace(/\s+/g, "+")}&bg=059669&color=ffffff`}
                    alt={benefit.title}
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <div className="mx-auto mb-4 bg-green-100 p-4 rounded-full w-fit">{benefit.icon}</div>
                  <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                  <CardDescription className="mb-4">{benefit.description}</CardDescription>
                  <div className="text-2xl font-bold text-green-600">{benefit.stat}</div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience These Features?</h2>
          <p className="text-xl mb-8 text-green-100">
            Start using our powerful farming tools today and see the difference AI can make for your crops.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
              Let's Go
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </AnimatedBackground>
  )
}
