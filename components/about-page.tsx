"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedBackground } from "@/components/animated-background"
import {
  Sprout,
  Users,
  Globe,
  Heart,
  Target,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Star,
  MapPin,
  Calendar,
  TrendingUp,
} from "lucide-react"

export function AboutPage() {
  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Agricultural Scientist",
      image: "/placeholder.svg?height=300&width=300&text=Dr.+Sarah+Johnson",
      bio: "PhD in Agricultural Science with 15+ years in precision farming and AI applications in agriculture.",
    },
    {
      name: "Michael Chen",
      role: "Lead AI Engineer",
      image: "/placeholder.svg?height=300&width=300&text=Michael+Chen",
      bio: "Former Google AI researcher specializing in machine learning for agricultural applications.",
    },
    {
      name: "Maria Rodriguez",
      role: "Head of Product",
      image: "/placeholder.svg?height=300&width=300&text=Maria+Rodriguez",
      bio: "Product strategist with deep understanding of farmer needs and agricultural technology adoption.",
    },
    {
      name: "James Wilson",
      role: "Sustainability Director",
      image: "/placeholder.svg?height=300&width=300&text=James+Wilson",
      bio: "Environmental scientist focused on sustainable farming practices and climate-smart agriculture.",
    },
  ]

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Farmer-First Approach",
      description: "Every decision we make is guided by what's best for farmers and their communities.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
      title: "Innovation",
      description: "We continuously push the boundaries of agricultural technology to solve real-world problems.",
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: "Sustainability",
      description: "We're committed to promoting environmentally responsible farming practices worldwide.",
    },
    {
      icon: <Users className="h-8 w-8 text-green-500" />,
      title: "Community",
      description: "We believe in building strong farming communities through knowledge sharing and collaboration.",
    },
  ]

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started with a vision to democratize AI for agriculture",
    },
    {
      year: "2021",
      title: "First AI Model",
      description: "Launched our crop yield prediction algorithm",
    },
    {
      year: "2022",
      title: "1,000 Farmers",
      description: "Reached our first thousand active users",
    },
    {
      year: "2023",
      title: "Global Expansion",
      description: "Expanded to 25 countries across 4 continents",
    },
    {
      year: "2024",
      title: "10,000+ Farmers",
      description: "Now serving over 10,000 farmers worldwide",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Farmers Served", icon: <Users className="h-6 w-6" /> },
    { number: "50+", label: "Countries", icon: <Globe className="h-6 w-6" /> },
    { number: "1M+", label: "Acres Optimized", icon: <MapPin className="h-6 w-6" /> },
    { number: "25%", label: "Avg. Yield Increase", icon: <TrendingUp className="h-6 w-6" /> },
  ]

  return (
    <AnimatedBackground variant="rice">
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
              <Link href="/how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">
                How it Works
              </Link>
              <Link href="/resources" className="text-gray-600 hover:text-green-600 transition-colors">
                Resources
              </Link>
              <Link href="/about" className="text-green-600 font-medium">
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
                src="/placeholder.svg?height=200&width=800&text=Our+Agricultural+Mission&bg=16a34a&color=ffffff"
                alt="Our Agricultural Mission"
                className="mx-auto rounded-lg shadow-lg"
              />
            </div>
            <Badge className="mb-4 bg-green-100 text-green-800">🌱 Our Story</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Empowering Farmers
              <span className="text-green-600 block">Through Technology</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're on a mission to revolutionize agriculture by making advanced AI technology accessible to farmers
              worldwide, helping them increase yields while promoting sustainable farming practices.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <img
                  src="/placeholder.svg?height=150&width=400&text=Our+Mission+in+Agriculture&bg=16a34a&color=ffffff"
                  alt="Our Mission"
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <Target className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle className="text-2xl mb-4">Our Mission</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  To democratize access to advanced agricultural technology, empowering farmers of all sizes to make
                  data-driven decisions that increase productivity, profitability, and sustainability.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Make AI accessible to farmers worldwide</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Increase global food security</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Promote sustainable farming practices</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <img
                  src="/placeholder.svg?height=150&width=400&text=Future+of+Smart+Farming&bg=2563eb&color=ffffff"
                  alt="Our Vision"
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <Star className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-2xl mb-4">Our Vision</CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  A world where every farmer has access to intelligent, data-driven insights that help them grow more
                  food with fewer resources, creating a sustainable future for agriculture.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Global adoption of smart farming</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Reduced environmental impact</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Improved farmer livelihoods</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600">Making a difference in agriculture worldwide</p>
          </div>
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

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <img
                    src={`/placeholder.svg?height=120&width=250&text=${value.title.replace(/\s+/g, "+")}&bg=6b7280&color=ffffff`}
                    alt={value.title}
                    className="w-full h-24 object-cover rounded-lg mb-4"
                  />
                  <div className="mx-auto mb-4 bg-gray-100 p-4 rounded-full w-fit">{value.icon}</div>
                  <CardTitle className="text-lg mb-2">{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our mission to transform agriculture</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-5 w-5 text-green-600" />
                          <Badge className="bg-green-600 text-white">{milestone.year}</Badge>
                        </div>
                        <CardTitle className="text-lg">{milestone.title}</CardTitle>
                        <CardDescription>{milestone.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                  <div className="relative z-10 w-8 h-8 bg-green-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The experts behind AgroSmart</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <img
                    src={`/placeholder.svg?height=200&width=200&text=${member.name.replace(/\s+/g, "+")}&bg=374151&color=ffffff`}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                  />
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="outline" className="mb-4">
                    {member.role}
                  </Badge>
                  <CardDescription className="text-sm">{member.bio}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 text-green-100">
            Be part of the agricultural revolution. Start using AgroSmart today and help us build a more sustainable
            future for farming.
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
