"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedBackground } from "@/components/animated-background"
import {
  Sprout,
  Upload,
  Brain,
  Target,
  CheckCircle,
  ArrowRight,
  ArrowDown,
  Smartphone,
  Cloud,
  BarChart3,
  Globe,
} from "lucide-react"

export function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Input Your Farm Data",
      description: "Start by entering your farm details, crop information, and current conditions into our platform.",
      details: [
        "Farm location and size",
        "Crop types and varieties",
        "Soil conditions and test results",
        "Current farming practices",
        "Historical yield data (optional)",
      ],
      icon: <Upload className="h-12 w-12 text-green-600" />,
      color: "green",
    },
    {
      number: "02",
      title: "AI Analysis & Processing",
      description:
        "Our advanced AI algorithms analyze your data along with weather patterns and agricultural databases.",
      details: [
        "Machine learning model processing",
        "Weather data integration",
        "Soil analysis and nutrient mapping",
        "Historical pattern recognition",
        "Risk factor assessment",
      ],
      icon: <Brain className="h-12 w-12 text-blue-600" />,
      color: "blue",
    },
    {
      number: "03",
      title: "Get Personalized Recommendations",
      description: "Receive detailed, actionable recommendations tailored specifically to your farm and crops.",
      details: [
        "Yield predictions with confidence scores",
        "Fertilizer recommendations and timing",
        "Disease prevention strategies",
        "Irrigation scheduling",
        "Optimization suggestions",
      ],
      icon: <Target className="h-12 w-12 text-purple-600" />,
      color: "purple",
    },
    {
      number: "04",
      title: "Implement & Monitor",
      description: "Apply the recommendations and track your progress with continuous monitoring and updates.",
      details: [
        "Real-time monitoring dashboard",
        "Progress tracking and alerts",
        "Seasonal updates and adjustments",
        "Performance analytics",
        "Continuous learning and improvement",
      ],
      icon: <BarChart3 className="h-12 w-12 text-orange-600" />,
      color: "orange",
    },
  ]

  const technologies = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "Machine Learning",
      description: "Advanced AI models trained on millions of agricultural data points",
    },
    {
      icon: <Cloud className="h-8 w-8 text-green-600" />,
      title: "Cloud Computing",
      description: "Scalable cloud infrastructure for real-time data processing",
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: "Global Weather APIs",
      description: "Integration with leading weather services for accurate forecasts",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-orange-600" />,
      title: "Mobile-First Design",
      description: "Optimized for use in the field on any device",
    },
  ]

  const workflow = [
    {
      title: "Data Collection",
      description: "Gather farm data through our intuitive interface",
      time: "5-10 minutes",
    },
    {
      title: "AI Processing",
      description: "Advanced algorithms analyze your data",
      time: "30-60 seconds",
    },
    {
      title: "Results Generation",
      description: "Personalized recommendations are created",
      time: "Instant",
    },
    {
      title: "Implementation",
      description: "Apply recommendations to your farming practices",
      time: "Ongoing",
    },
  ]

  return (
    <AnimatedBackground variant="corn">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-green-800">AgroSmart</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/features" className="text-gray-600 hover:text-green-600 transition-colors">
                Features
              </Link>
              <Link href="/how-it-works" className="text-green-600 font-medium">
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
                src="/placeholder.svg?height=200&width=800&text=Smart+Farming+Process&bg=2563eb&color=ffffff"
                alt="Smart Farming Process"
                className="mx-auto rounded-lg shadow-lg"
              />
            </div>
            <Badge className="mb-4 bg-blue-100 text-blue-800">🔄 Simple Process</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              How AgroSmart
              <span className="text-blue-600 block">Works for You</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Our AI-powered platform transforms complex agricultural data into simple, actionable insights. Here's how
              we help you make smarter farming decisions in just a few easy steps.
            </p>
          </div>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                >
                  <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`bg-${step.color}-100 p-3 rounded-full`}>{step.icon}</div>
                          <Badge className={`bg-${step.color}-600 text-white text-lg px-4 py-2`}>
                            Step {step.number}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl mb-4">{step.title}</CardTitle>
                        <CardDescription className="text-lg text-gray-600">{step.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                    <div className="relative">
                      <img
                        src={`/placeholder.svg?height=400&width=600&text=Step+${step.number}+${step.title.replace(/\s+/g, "+")}&bg=${step.color === "green" ? "16a34a" : step.color === "blue" ? "2563eb" : step.color === "purple" ? "9333ea" : "ea580c"}&color=ffffff`}
                        alt={step.title}
                        className="rounded-lg shadow-2xl"
                      />
                      <div className={`absolute -top-4 -right-4 bg-${step.color}-600 text-white p-4 rounded-full`}>
                        <span className="text-2xl font-bold">{step.number}</span>
                      </div>
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex justify-center mt-12">
                    <ArrowDown className="h-8 w-8 text-gray-400 animate-bounce" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Timeline */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Workflow Overview</h2>
            <p className="text-xl text-gray-600">From data input to actionable insights in minutes</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {workflow.map((item, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <img
                    src={`/placeholder.svg?height=120&width=200&text=${item.title.replace(/\s+/g, "+")}&bg=16a34a&color=ffffff`}
                    alt={item.title}
                    className="mx-auto rounded-lg shadow-md"
                  />
                </div>
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {item.time}
                </Badge>
                {index < workflow.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-gray-400 mx-auto mt-4 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powered by Advanced Technology</h2>
            <p className="text-xl text-gray-600">The cutting-edge tech stack behind our platform</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <img
                    src={`/placeholder.svg?height=120&width=250&text=${tech.title.replace(/\s+/g, "+")}&bg=374151&color=ffffff`}
                    alt={tech.title}
                    className="w-full h-24 object-cover rounded-lg mb-4"
                  />
                  <div className="mx-auto mb-4 bg-gray-100 p-4 rounded-full w-fit">{tech.icon}</div>
                  <CardTitle className="text-lg mb-2">{tech.title}</CardTitle>
                  <CardDescription>{tech.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Proven Results</h2>
            <p className="text-xl text-green-100">See what farmers achieve with our platform</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-green-100">Prediction Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">25%</div>
              <div className="text-green-100">Average Yield Increase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">30%</div>
              <div className="text-green-100">Input Cost Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div className="text-green-100">Farmers Helped</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of farmers who are already using our platform to optimize their farming operations.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
              Let's Go
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </AnimatedBackground>
  )
}
