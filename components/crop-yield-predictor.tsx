"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts"
import { AlertTriangle, CheckCircle, Lightbulb } from "lucide-react"

interface PredictionResult {
  predictedYield: {
    total: number
    perHectare: number
  }
  confidence: number
  factors: {
    soil: number
    environment: number
    nutrients: number
    overall: number
  }
  recommendations: string[]
  chartData: Array<{ name: string; yield: number }>
  riskFactors: Array<{ factor: string; risk: string; impact: number }>
  optimizationTips: Array<{ category: string; tip: string; impact: string }>
}

export function CropYieldPredictor() {
  // Form state
  const [cropType, setCropType] = useState("rice")
  const [soilType, setSoilType] = useState("loamy")
  const [area, setArea] = useState(10)
  const [nitrogen, setNitrogen] = useState(50)
  const [phosphorus, setPhosphorus] = useState(40)
  const [potassium, setPotassium] = useState(30)
  const [rainfall, setRainfall] = useState(200)
  const [temperature, setTemperature] = useState(25)
  const [humidity, setHumidity] = useState(60)
  const [irrigationType, setIrrigationType] = useState("drip")
  const [seedVariety, setSeedVariety] = useState("hybrid")
  const [farmingMethod, setFarmingMethod] = useState("conventional")

  // UI state
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Crop information database
  const cropInfo = {
    rice: {
      optimalTemp: [20, 30],
      optimalRainfall: [150, 300],
      optimalHumidity: [70, 85],
      baseYield: 4.5,
      description: "Rice thrives in warm, humid conditions with adequate water supply",
    },
    wheat: {
      optimalTemp: [15, 25],
      optimalRainfall: [50, 150],
      optimalHumidity: [60, 75],
      baseYield: 3.8,
      description: "Wheat prefers cooler temperatures and moderate rainfall",
    },
    maize: {
      optimalTemp: [18, 27],
      optimalRainfall: [100, 200],
      optimalHumidity: [65, 80],
      baseYield: 5.2,
      description: "Maize requires warm weather and consistent moisture",
    },
    cotton: {
      optimalTemp: [21, 30],
      optimalRainfall: [75, 150],
      optimalHumidity: [55, 70],
      baseYield: 2.1,
      description: "Cotton needs hot weather and moderate water requirements",
    },
    sugarcane: {
      optimalTemp: [20, 30],
      optimalRainfall: [150, 250],
      optimalHumidity: [75, 85],
      baseYield: 70,
      description: "Sugarcane requires high temperatures and abundant water",
    },
  }

  const validateInputs = () => {
    const newErrors: Record<string, string> = {}

    if (area <= 0) newErrors.area = "Area must be greater than 0"
    if (area > 10000) newErrors.area = "Area seems too large (max 10,000 hectares)"
    if (nitrogen < 0 || nitrogen > 300) newErrors.nitrogen = "Nitrogen should be between 0-300 kg/ha"
    if (phosphorus < 0 || phosphorus > 200) newErrors.phosphorus = "Phosphorus should be between 0-200 kg/ha"
    if (potassium < 0 || potassium > 200) newErrors.potassium = "Potassium should be between 0-200 kg/ha"
    if (temperature < 5 || temperature > 50) newErrors.temperature = "Temperature should be between 5-50°C"
    if (rainfall < 0 || rainfall > 1000) newErrors.rainfall = "Rainfall should be between 0-1000mm"
    if (humidity < 20 || humidity > 100) newErrors.humidity = "Humidity should be between 20-100%"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const getParameterStatus = (value: number, optimal: [number, number]) => {
    const [min, max] = optimal
    if (value >= min && value <= max) return { status: "optimal", color: "text-green-600" }
    if (value < min * 0.8 || value > max * 1.2) return { status: "poor", color: "text-red-600" }
    return { status: "fair", color: "text-yellow-600" }
  }

  const predictYield = async () => {
    if (!validateInputs()) return

    setIsLoading(true)
    setPrediction(null)

    try {
      const response = await fetch("/api/predict-yield", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cropType,
          soilType,
          area,
          nitrogen,
          phosphorus,
          potassium,
          rainfall,
          temperature,
          humidity,
          irrigationType,
          seedVariety,
          farmingMethod,
        }),
      })

      if (!response.ok) throw new Error("Failed to predict yield")

      const data = await response.json()

      // Enhanced prediction result with additional analysis
      const enhancedResult: PredictionResult = {
        ...data,
        factors: {
          ...data.factors,
          overall: (data.factors.soil + data.factors.environment + data.factors.nutrients) / 3,
        },
        riskFactors: generateRiskFactors(),
        optimizationTips: generateOptimizationTips(),
      }

      setPrediction(enhancedResult)
    } catch (error) {
      console.error("Error predicting yield:", error)
      // Enhanced fallback with more detailed simulation
      setPrediction(generateFallbackPrediction())
    } finally {
      setIsLoading(false)
    }
  }

  const generateRiskFactors = () => {
    const risks = []
    const crop = cropInfo[cropType]

    if (temperature < crop.optimalTemp[0] || temperature > crop.optimalTemp[1]) {
      risks.push({
        factor: "Temperature",
        risk: temperature < crop.optimalTemp[0] ? "Too Cold" : "Too Hot",
        impact: Math.abs(temperature - (crop.optimalTemp[0] + crop.optimalTemp[1]) / 2) * 2,
      })
    }

    if (rainfall < crop.optimalRainfall[0] || rainfall > crop.optimalRainfall[1]) {
      risks.push({
        factor: "Rainfall",
        risk: rainfall < crop.optimalRainfall[0] ? "Insufficient" : "Excessive",
        impact: Math.abs(rainfall - (crop.optimalRainfall[0] + crop.optimalRainfall[1]) / 2) / 10,
      })
    }

    if (nitrogen < 80) {
      risks.push({ factor: "Nitrogen", risk: "Deficient", impact: (80 - nitrogen) / 2 })
    }

    return risks
  }

  const generateOptimizationTips = () => {
    const tips = []
    const crop = cropInfo[cropType]

    if (nitrogen < 100) {
      tips.push({
        category: "Nutrition",
        tip: "Increase nitrogen application for better vegetative growth",
        impact: "High",
      })
    }

    if (temperature > crop.optimalTemp[1]) {
      tips.push({
        category: "Climate",
        tip: "Consider shade nets or mulching to reduce temperature stress",
        impact: "Medium",
      })
    }

    if (irrigationType === "flood" && cropType !== "rice") {
      tips.push({
        category: "Water Management",
        tip: "Switch to drip irrigation for better water efficiency",
        impact: "High",
      })
    }

    if (seedVariety === "traditional") {
      tips.push({
        category: "Genetics",
        tip: "Consider high-yielding hybrid varieties",
        impact: "Very High",
      })
    }

    return tips
  }

  const generateFallbackPrediction = (): PredictionResult => {
    const crop = cropInfo[cropType]
    const baseYield = crop.baseYield
    const simulatedYield = baseYield * (area / 10) * 0.85

    return {
      predictedYield: {
        total: simulatedYield,
        perHectare: simulatedYield / area,
      },
      confidence: 75,
      factors: { soil: 0.8, environment: 0.7, nutrients: 0.6, overall: 0.7 },
      chartData: [
        { name: "Predicted", yield: simulatedYield / area },
        { name: "Optimal", yield: (simulatedYield / area) * 1.3 },
        { name: "Previous", yield: (simulatedYield / area) * 0.9 },
        { name: "Regional Avg", yield: (simulatedYield / area) * 0.95 },
      ],
      recommendations: ["API temporarily unavailable - showing estimated values"],
      riskFactors: generateRiskFactors(),
      optimizationTips: generateOptimizationTips(),
    }
  }

  const currentCrop = cropInfo[cropType]
  const tempStatus = getParameterStatus(temperature, currentCrop.optimalTemp)
  const rainfallStatus = getParameterStatus(rainfall, currentCrop.optimalRainfall)
  const humidityStatus = getParameterStatus(humidity, currentCrop.optimalHumidity)

  return (
    <div className="space-y-6">
      {/* Crop Information Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="capitalize">{cropType}</span> Yield Prediction
            <Badge variant="outline">{currentCrop.description}</Badge>
          </CardTitle>
          <CardDescription>
            Optimal conditions: {currentCrop.optimalTemp[0]}-{currentCrop.optimalTemp[1]}°C,{" "}
            {currentCrop.optimalRainfall[0]}-{currentCrop.optimalRainfall[1]}mm rainfall
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Parameters</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          <TabsTrigger value="environmental">Environmental Factors</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="crop-type">Crop Type</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger id="crop-type">
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="maize">Maize</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="soil-type">Soil Type</Label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger id="soil-type">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="loamy">Loamy</SelectItem>
                  <SelectItem value="clayey">Clayey</SelectItem>
                  <SelectItem value="silt">Silt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Area (hectares)</Label>
              <Input
                id="area"
                type="number"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className={errors.area ? "border-red-500" : ""}
              />
              {errors.area && <p className="text-sm text-red-500">{errors.area}</p>}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="irrigation-type">Irrigation Type</Label>
              <Select value={irrigationType} onValueChange={setIrrigationType}>
                <SelectTrigger id="irrigation-type">
                  <SelectValue placeholder="Select irrigation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drip">Drip Irrigation</SelectItem>
                  <SelectItem value="sprinkler">Sprinkler</SelectItem>
                  <SelectItem value="flood">Flood Irrigation</SelectItem>
                  <SelectItem value="rainfed">Rain-fed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seed-variety">Seed Variety</Label>
              <Select value={seedVariety} onValueChange={setSeedVariety}>
                <SelectTrigger id="seed-variety">
                  <SelectValue placeholder="Select seed variety" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="traditional">Traditional</SelectItem>
                  <SelectItem value="gmo">GMO</SelectItem>
                  <SelectItem value="organic">Organic Certified</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="farming-method">Farming Method</Label>
              <Select value={farmingMethod} onValueChange={setFarmingMethod}>
                <SelectTrigger id="farming-method">
                  <SelectValue placeholder="Select farming method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conventional">Conventional</SelectItem>
                  <SelectItem value="organic">Organic</SelectItem>
                  <SelectItem value="precision">Precision Agriculture</SelectItem>
                  <SelectItem value="sustainable">Sustainable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-6">
          {/* Nutrient Levels */}
          <Card>
            <CardHeader>
              <CardTitle>Nutrient Levels (kg/ha)</CardTitle>
              <CardDescription>Adjust the nutrient levels in your soil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="nitrogen">Nitrogen: {nitrogen} kg/ha</Label>
                  <Badge variant={nitrogen >= 80 ? "default" : "destructive"}>
                    {nitrogen >= 80 ? "Adequate" : "Low"}
                  </Badge>
                </div>
                <Slider
                  id="nitrogen"
                  min={0}
                  max={200}
                  step={5}
                  value={[nitrogen]}
                  onValueChange={(value) => setNitrogen(value[0])}
                />
                {errors.nitrogen && <p className="text-sm text-red-500">{errors.nitrogen}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="phosphorus">Phosphorus: {phosphorus} kg/ha</Label>
                  <Badge variant={phosphorus >= 40 ? "default" : "destructive"}>
                    {phosphorus >= 40 ? "Adequate" : "Low"}
                  </Badge>
                </div>
                <Slider
                  id="phosphorus"
                  min={0}
                  max={150}
                  step={5}
                  value={[phosphorus]}
                  onValueChange={(value) => setPhosphorus(value[0])}
                />
                {errors.phosphorus && <p className="text-sm text-red-500">{errors.phosphorus}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="potassium">Potassium: {potassium} kg/ha</Label>
                  <Badge variant={potassium >= 30 ? "default" : "destructive"}>
                    {potassium >= 30 ? "Adequate" : "Low"}
                  </Badge>
                </div>
                <Slider
                  id="potassium"
                  min={0}
                  max={150}
                  step={5}
                  value={[potassium]}
                  onValueChange={(value) => setPotassium(value[0])}
                />
                {errors.potassium && <p className="text-sm text-red-500">{errors.potassium}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Climate Conditions */}
          <Card>
            <CardHeader>
              <CardTitle>Climate Conditions</CardTitle>
              <CardDescription>Current environmental parameters for your location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="temperature">Temperature: {temperature}°C</Label>
                  <Badge
                    variant={
                      tempStatus.status === "optimal"
                        ? "default"
                        : tempStatus.status === "fair"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {tempStatus.status}
                  </Badge>
                </div>
                <Slider
                  id="temperature"
                  min={10}
                  max={45}
                  step={1}
                  value={[temperature]}
                  onValueChange={(value) => setTemperature(value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Optimal range for {cropType}: {currentCrop.optimalTemp[0]}-{currentCrop.optimalTemp[1]}°C
                </p>
                {errors.temperature && <p className="text-sm text-red-500">{errors.temperature}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="rainfall">Rainfall: {rainfall}mm</Label>
                  <Badge
                    variant={
                      rainfallStatus.status === "optimal"
                        ? "default"
                        : rainfallStatus.status === "fair"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {rainfallStatus.status}
                  </Badge>
                </div>
                <Slider
                  id="rainfall"
                  min={0}
                  max={500}
                  step={10}
                  value={[rainfall]}
                  onValueChange={(value) => setRainfall(value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Optimal range for {cropType}: {currentCrop.optimalRainfall[0]}-{currentCrop.optimalRainfall[1]}mm
                </p>
                {errors.rainfall && <p className="text-sm text-red-500">{errors.rainfall}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="humidity">Humidity: {humidity}%</Label>
                  <Badge
                    variant={
                      humidityStatus.status === "optimal"
                        ? "default"
                        : humidityStatus.status === "fair"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {humidityStatus.status}
                  </Badge>
                </div>
                <Slider
                  id="humidity"
                  min={30}
                  max={95}
                  step={5}
                  value={[humidity]}
                  onValueChange={(value) => setHumidity(value[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Optimal range for {cropType}: {currentCrop.optimalHumidity[0]}-{currentCrop.optimalHumidity[1]}%
                </p>
                {errors.humidity && <p className="text-sm text-red-500">{errors.humidity}</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={predictYield} className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
        {isLoading ? "Analyzing..." : "Predict Yield"}
      </Button>

      {prediction && (
        <div className="space-y-6">
          {/* Main Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Yield</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {prediction.predictedYield.total.toFixed(1)} tons
                </div>
                <p className="text-sm text-muted-foreground">For {area} hectares</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Yield per Hectare</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  {prediction.predictedYield.perHectare.toFixed(2)} tons/ha
                </div>
                <p className="text-sm text-muted-foreground">Average productivity</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">{prediction.confidence}%</div>
                <Progress value={prediction.confidence} className="mt-2" />
                <p className="text-sm text-muted-foreground mt-1">Prediction accuracy</p>
              </CardContent>
            </Card>
          </div>

          {/* Factor Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Factor Analysis</CardTitle>
              <CardDescription>How different factors affect your yield potential</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">{(prediction.factors.soil * 100).toFixed(0)}%</div>
                  <p className="text-sm text-muted-foreground">Soil Quality</p>
                  <Progress value={prediction.factors.soil * 100} className="mt-1" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {(prediction.factors.environment * 100).toFixed(0)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Environment</p>
                  <Progress value={prediction.factors.environment * 100} className="mt-1" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {(prediction.factors.nutrients * 100).toFixed(0)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Nutrients</p>
                  <Progress value={prediction.factors.nutrients * 100} className="mt-1" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {(prediction.factors.overall * 100).toFixed(0)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Overall</p>
                  <Progress value={prediction.factors.overall * 100} className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Yield Comparison</CardTitle>
                <CardDescription>Compare your predicted yield with benchmarks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={prediction.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: "Yield (tons/ha)", angle: -90, position: "insideLeft" }} />
                      <Tooltip />
                      <Bar dataKey="yield" fill="#16a34a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Factor Contribution</CardTitle>
                <CardDescription>Breakdown of factors affecting yield</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Soil", value: prediction.factors.soil * 100, fill: "#f59e0b" },
                          { name: "Environment", value: prediction.factors.environment * 100, fill: "#3b82f6" },
                          { name: "Nutrients", value: prediction.factors.nutrients * 100, fill: "#10b981" },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value.toFixed(0)}%`}
                      />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Factors */}
          {prediction.riskFactors.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Risk Factors
                </CardTitle>
                <CardDescription>Potential issues that could affect your yield</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {prediction.riskFactors.map((risk, index) => (
                    <Alert key={index}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>{risk.factor}:</strong> {risk.risk} (Impact: {risk.impact.toFixed(1)}%)
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Optimization Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                Optimization Tips
              </CardTitle>
              <CardDescription>Recommendations to improve your yield</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {prediction.optimizationTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Badge variant="outline">{tip.category}</Badge>
                    <div className="flex-1">
                      <p className="text-sm">{tip.tip}</p>
                      <Badge
                        variant={
                          tip.impact === "Very High" ? "default" : tip.impact === "High" ? "secondary" : "outline"
                        }
                        className="mt-1"
                      >
                        {tip.impact} Impact
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          {prediction.recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Detailed Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {prediction.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
