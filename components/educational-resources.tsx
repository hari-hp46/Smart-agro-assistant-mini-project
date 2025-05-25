"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Video,
  Clock,
  User,
  Search,
  Sprout,
  Droplets,
  Bug,
  Sun,
  Leaf,
  TrendingUp,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react"

interface Article {
  id: string
  title: string
  description: string
  category: string
  readTime: number
  author: string
  date: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  rating: number
  image: string
  content: string[]
  tags: string[]
  type: "article" | "video" | "guide" | "tip"
}

export function EducationalResources() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  const articles: Article[] = [
    {
      id: "1",
      title: "Complete Guide to Soil Health Management",
      description: "Learn how to assess, improve, and maintain soil health for optimal crop production.",
      category: "soil",
      readTime: 12,
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      difficulty: "Intermediate",
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300&text=Soil+Health",
      content: [
        "Soil health is the foundation of successful agriculture. Healthy soil provides essential nutrients, supports beneficial microorganisms, and maintains proper water retention.",
        "Key indicators of soil health include organic matter content, pH levels, nutrient availability, soil structure, and biological activity.",
        "To improve soil health, focus on: 1) Adding organic matter through compost and cover crops, 2) Minimizing soil disturbance, 3) Maintaining soil cover, 4) Diversifying crop rotations.",
        "Regular soil testing is crucial. Test your soil at least once a year to monitor pH, nutrient levels, and organic matter content.",
        "Beneficial practices include: Using cover crops, implementing no-till farming, adding compost, practicing crop rotation, and avoiding overuse of chemical fertilizers.",
      ],
      tags: ["soil health", "organic matter", "pH", "nutrients", "testing"],
      type: "guide",
    },
    {
      id: "2",
      title: "Integrated Pest Management Strategies",
      description: "Effective pest control methods that minimize environmental impact while protecting crops.",
      category: "pest",
      readTime: 8,
      author: "Prof. Michael Chen",
      date: "2024-01-10",
      difficulty: "Advanced",
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300&text=Pest+Management",
      content: [
        "Integrated Pest Management (IPM) combines biological, cultural, physical, and chemical tools to manage pests effectively.",
        "The IPM approach follows these steps: 1) Monitor and identify pests, 2) Set action thresholds, 3) Prevent pest problems, 4) Control pests when necessary.",
        "Biological control uses natural enemies like beneficial insects, parasites, and pathogens to control pest populations.",
        "Cultural practices include crop rotation, resistant varieties, proper timing of planting and harvesting, and field sanitation.",
        "Chemical control should be used as a last resort, selecting pesticides that are specific to the target pest and least harmful to beneficial organisms.",
      ],
      tags: ["IPM", "biological control", "pesticides", "beneficial insects", "crop rotation"],
      type: "guide",
    },
    {
      id: "3",
      title: "Water-Efficient Irrigation Techniques",
      description: "Modern irrigation methods to conserve water while maintaining optimal crop yields.",
      category: "irrigation",
      readTime: 10,
      author: "Dr. Maria Rodriguez",
      date: "2024-01-08",
      difficulty: "Intermediate",
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=300&text=Irrigation+Systems",
      content: [
        "Water-efficient irrigation is crucial for sustainable agriculture, especially in water-scarce regions.",
        "Drip irrigation delivers water directly to plant roots, reducing water waste by 30-50% compared to traditional methods.",
        "Sprinkler systems can be highly efficient when properly designed and managed, with uniform water distribution.",
        "Smart irrigation controllers use weather data and soil moisture sensors to optimize watering schedules automatically.",
        "Mulching around plants helps retain soil moisture and reduces the need for frequent irrigation.",
      ],
      tags: ["drip irrigation", "water conservation", "smart controllers", "mulching", "efficiency"],
      type: "article",
    },
    {
      id: "4",
      title: "Seasonal Crop Planning Calendar",
      description: "Plan your planting and harvesting schedule for maximum productivity throughout the year.",
      category: "planning",
      readTime: 15,
      author: "Agricultural Extension Team",
      date: "2024-01-05",
      difficulty: "Beginner",
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=300&text=Crop+Calendar",
      content: [
        "Proper timing is essential for successful crop production. Understanding your local climate and growing seasons is crucial.",
        "Spring crops (March-May): Plant cool-season vegetables like lettuce, peas, and radishes. Prepare soil for summer crops.",
        "Summer crops (June-August): Plant warm-season crops like tomatoes, corn, and beans. Maintain irrigation and pest control.",
        "Fall crops (September-November): Plant cool-season crops again. Harvest summer crops and prepare for winter.",
        "Winter planning (December-February): Plan next year's crops, order seeds, maintain equipment, and prepare soil amendments.",
      ],
      tags: ["crop calendar", "seasonal planning", "planting schedule", "harvest timing", "climate"],
      type: "guide",
    },
    {
      id: "5",
      title: "Organic Fertilizer vs Chemical Fertilizer",
      description: "Compare the benefits and drawbacks of organic and chemical fertilizers for your crops.",
      category: "fertilizer",
      readTime: 6,
      author: "Dr. James Wilson",
      date: "2024-01-03",
      difficulty: "Beginner",
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=300&text=Fertilizer+Types",
      content: [
        "Understanding the differences between organic and chemical fertilizers helps you make informed decisions for your crops.",
        "Organic fertilizers release nutrients slowly, improve soil structure, and support beneficial microorganisms.",
        "Chemical fertilizers provide immediate nutrient availability but may not improve long-term soil health.",
        "Organic options include compost, manure, bone meal, and fish emulsion. They're environmentally friendly but more expensive.",
        "Chemical fertilizers are cost-effective and provide precise nutrient ratios but require careful application to avoid environmental damage.",
      ],
      tags: ["organic fertilizer", "chemical fertilizer", "nutrients", "soil health", "environment"],
      type: "article",
    },
    {
      id: "6",
      title: "Climate Change Adaptation for Farmers",
      description: "Strategies to adapt your farming practices to changing climate conditions.",
      category: "climate",
      readTime: 14,
      author: "Climate Research Institute",
      date: "2024-01-01",
      difficulty: "Advanced",
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=300&text=Climate+Adaptation",
      content: [
        "Climate change presents new challenges for agriculture, including changing precipitation patterns, extreme weather events, and shifting growing seasons.",
        "Adaptation strategies include: selecting climate-resilient crop varieties, diversifying crops, improving water management, and adjusting planting dates.",
        "Drought-resistant crops and water-efficient irrigation systems become increasingly important in water-stressed regions.",
        "Building soil health through organic matter addition helps crops withstand extreme weather conditions.",
        "Stay informed about local climate projections and adjust your farming practices accordingly.",
      ],
      tags: ["climate change", "adaptation", "resilient crops", "extreme weather", "sustainability"],
      type: "guide",
    },
  ]

  const farmingTips = [
    {
      icon: <Sprout className="h-6 w-6 text-green-600" />,
      title: "Seed Starting Success",
      tip: "Start seeds indoors 6-8 weeks before the last frost date. Use seed starting mix and maintain consistent moisture and temperature.",
      category: "planting",
    },
    {
      icon: <Droplets className="h-6 w-6 text-blue-600" />,
      title: "Water Early Morning",
      tip: "Water plants early in the morning to reduce evaporation and prevent fungal diseases that thrive in moist, warm conditions.",
      category: "irrigation",
    },
    {
      icon: <Bug className="h-6 w-6 text-red-600" />,
      title: "Companion Planting",
      tip: "Plant marigolds near tomatoes to repel harmful insects naturally. Basil also improves tomato flavor and growth.",
      category: "pest",
    },
    {
      icon: <Sun className="h-6 w-6 text-yellow-600" />,
      title: "Crop Rotation Benefits",
      tip: "Rotate crops annually to prevent soil depletion and reduce pest buildup. Never plant the same family in the same spot two years in a row.",
      category: "planning",
    },
    {
      icon: <Leaf className="h-6 w-6 text-green-600" />,
      title: "Mulching Magic",
      tip: "Apply 2-3 inches of organic mulch around plants to retain moisture, suppress weeds, and regulate soil temperature.",
      category: "soil",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-purple-600" />,
      title: "Soil Testing Schedule",
      tip: "Test your soil pH and nutrients every 2-3 years. Fall is the best time for testing and amending soil for next season.",
      category: "soil",
    },
  ]

  const categories = [
    { value: "all", label: "All Categories", icon: <BookOpen className="h-4 w-4" /> },
    { value: "soil", label: "Soil Management", icon: <Leaf className="h-4 w-4" /> },
    { value: "pest", label: "Pest Control", icon: <Bug className="h-4 w-4" /> },
    { value: "irrigation", label: "Water Management", icon: <Droplets className="h-4 w-4" /> },
    { value: "fertilizer", label: "Fertilizers", icon: <Sprout className="h-4 w-4" /> },
    { value: "planning", label: "Crop Planning", icon: <Calendar className="h-4 w-4" /> },
    { value: "climate", label: "Climate & Weather", icon: <Sun className="h-4 w-4" /> },
  ]

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || article.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "guide":
        return <BookOpen className="h-4 w-4" />
      case "tip":
        return <Star className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-green-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Button variant="outline" onClick={() => setSelectedArticle(null)} className="mb-6">
            ← Back to Resources
          </Button>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={selectedArticle.image || "/placeholder.svg"}
              alt={selectedArticle.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <Badge className={getDifficultyColor(selectedArticle.difficulty)}>{selectedArticle.difficulty}</Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  {getTypeIcon(selectedArticle.type)}
                  {selectedArticle.type}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {selectedArticle.readTime} min read
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedArticle.title}</h1>

              <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {selectedArticle.author}
                </div>
                <div>{selectedArticle.date}</div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  {selectedArticle.rating}
                </div>
              </div>

              <div className="prose max-w-none">
                {selectedArticle.content.map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold mb-3">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6">
              <img
                src="/placeholder.svg?height=150&width=600&text=Agricultural+Knowledge+Center&bg=ffffff&color=16a34a"
                alt="Agricultural Knowledge Center"
                className="mx-auto rounded-lg shadow-lg"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4">Agricultural Knowledge Center</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Discover expert insights, practical guides, and proven farming techniques to improve your agricultural
              practices and increase productivity.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Articles & Guides
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Quick Tips
            </TabsTrigger>
            <TabsTrigger value="seasonal" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Seasonal Advice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search articles, guides, and tips..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center gap-2">
                            {category.icon}
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=200&width=300&text=${article.title.replace(/\s+/g, "+")}&bg=16a34a&color=ffffff`}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getDifficultyColor(article.difficulty)}>{article.difficulty}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {getTypeIcon(article.type)}
                        {article.type}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-green-600 transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">{article.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {article.readTime} min
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          {article.rating}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {article.author.split(" ")[0]}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-green-600 group-hover:text-white transition-colors"
                      onClick={() => setSelectedArticle(article)}
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmingTips.map((tip, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {tip.icon}
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{tip.tip}</p>
                    <Badge variant="outline">{tip.category}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="seasonal" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <img
                    src="/placeholder.svg?height=120&width=300&text=Spring+Farming+Tasks&bg=22c55e&color=ffffff"
                    alt="Spring Farming"
                    className="w-full h-24 object-cover rounded-lg mb-4"
                  />
                  <CardTitle className="flex items-center gap-2">
                    <Sprout className="h-6 w-6 text-green-600" />
                    Spring Farming Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Prepare seedbeds and start cool-season crops</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Test and amend soil based on test results</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Service and calibrate farm equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Plan irrigation system maintenance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <img
                    src="/placeholder.svg?height=120&width=300&text=Summer+Farming+Tasks&bg=eab308&color=ffffff"
                    alt="Summer Farming"
                    className="w-full h-24 object-cover rounded-lg mb-4"
                  />
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="h-6 w-6 text-yellow-600" />
                    Summer Farming Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Monitor crops for pests and diseases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Maintain consistent irrigation schedules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Apply mulch to conserve soil moisture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Harvest early summer crops</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <img
                    src="/placeholder.svg?height=120&width=300&text=Fall+Farming+Tasks&bg=ea580c&color=ffffff"
                    alt="Fall Farming"
                    className="w-full h-24 object-cover rounded-lg mb-4"
                  />
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-6 w-6 text-orange-600" />
                    Fall Farming Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Harvest main season crops</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Plant cover crops for soil protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Collect and store seeds for next season</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Prepare equipment for winter storage</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <img
                    src="/placeholder.svg?height=120&width=300&text=Winter+Farming+Tasks&bg=3b82f6&color=ffffff"
                    alt="Winter Farming"
                    className="w-full h-24 object-cover rounded-lg mb-4"
                  />
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6 text-blue-600" />
                    Winter Farming Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Plan next year's crop rotation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Order seeds and supplies for spring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Maintain and repair farm equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>Attend agricultural workshops and training</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
