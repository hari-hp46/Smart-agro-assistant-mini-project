"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wifi, WifiOff, MapPin, History } from "lucide-react"

interface SensorData {
  soilMoisture: number
  soilPH: number
  temperature: number
  humidity: number
  lightIntensity: number
}

export function EnhancedCropYieldPredictor() {
  const { data: session } = useSession()
  const [inputMethod, setInputMethod] = useState("manual")
  const [sensorConnected, setSensorConnected] = useState(false)
  const [sensorData, setSensorData] = useState<SensorData | null>(null)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [predictions, setPredictions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    cropType: "rice",
    soilType: "loamy",
    area: 10,
    nitrogen: 50,
    phosphorus: 40,
    potassium: 30,
    rainfall: 200,
    temperature: 25,
    humidity: 60,
    irrigationType: "drip",
    seedVariety: "hybrid",
    farmingMethod: "conventional",
  })

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Location error:", error)
        },
      )
    }

    // Load previous predictions
    loadPredictionHistory()

    // Simulate sensor connection
    const sensorInterval = setInterval(() => {
      if (inputMethod === "sensor") {
        setSensorConnected(Math.random() > 0.3) // 70% connection rate
        if (sensorConnected) {
          setSensorData({
            soilMoisture: 45 + Math.random() * 20,
            soilPH: 6.0 + Math.random() * 2,
            temperature: 20 + Math.random() * 15,
            humidity: 50 + Math.random() * 30,
            lightIntensity: 300 + Math.random() * 500,
          })
        }
      }
    }, 3000)

    return () => clearInterval(sensorInterval)
  }, [inputMethod, sensorConnected])

  const loadPredictionHistory = async () => {
    if (!session?.user?.id) return

    try {
      const response = await fetch(`/api/predictions/history?userId=${session.user.id}`)
      if (response.ok) {
        const data = await response.json()
        setPredictions(data.predictions || [])
      }
    } catch (error) {
      console.error("Error loading prediction history:", error)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const predictYield = async () => {
    if (!session?.user?.id) {
      alert("Please sign in to make predictions")
      return
    }

    setIsLoading(true)

    try {
      const inputData = {
        ...formData,
        sensorData: inputMethod === "sensor" ? sensorData : null,
        location,
        inputMethod,
      }

      const response = await fetch("/api/predictions/yield", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          ...inputData,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to predict yield")
      }

      const result = await response.json()

      // Add to predictions list
      setPredictions((prev) => [result, ...prev.slice(0, 9)]) // Keep last 10 predictions
    } catch (error) {
      console.error("Error predicting yield:", error)
      alert("Failed to predict yield. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getEnvironmentalData = async () => {
    if (!location) {
      alert("Location not available")
      return
    }

    try {
      const response = await fetch(`/api/environmental-data?lat=${location.lat}&lng=${location.lng}`)
      const data = await response.json()

      if (data.weather) {
        setFormData((prev) => ({
          ...prev,
          temperature: data.weather.temperature,
          humidity: data.weather.humidity,
          rainfall: data.weather.rainfall || prev.rainfall,
        }))
      }
    } catch (error) {
      console.error("Error fetching environmental data:", error)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Enhanced Crop Yield Prediction
          </CardTitle>
          <CardDescription>
            Use manual input, sensor data, or environmental data for accurate predictions
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={inputMethod} onValueChange={setInputMethod}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="manual">Manual Input</TabsTrigger>
          <TabsTrigger value="sensor">Sensor Data</TabsTrigger>
          <TabsTrigger value="environmental">Environmental</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manual Data Entry</CardTitle>
              <CardDescription>Enter your farm parameters manually</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Crop Type</Label>
                  <Select value={formData.cropType} onValueChange={(value) => handleInputChange("cropType", value)}>
                    <SelectTrigger>
                      <SelectValue />
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
                  <Label>Soil Type</Label>
                  <Select value={formData.soilType} onValueChange={(value) => handleInputChange("soilType", value)}>
                    <SelectTrigger>
                      <SelectValue />
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
                  <Label>Area (hectares)</Label>
                  <Input
                    type="number"
                    value={formData.area}
                    onChange={(e) => handleInputChange("area", Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nitrogen Level: {formData.nitrogen} kg/ha</Label>
                  <Slider
                    value={[formData.nitrogen]}
                    onValueChange={(value) => handleInputChange("nitrogen", value[0])}
                    max={200}
                    step={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Phosphorus Level: {formData.phosphorus} kg/ha</Label>
                  <Slider
                    value={[formData.phosphorus]}
                    onValueChange={(value) => handleInputChange("phosphorus", value[0])}
                    max={150}
                    step={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Potassium Level: {formData.potassium} kg/ha</Label>
                  <Slider
                    value={[formData.potassium]}
                    onValueChange={(value) => handleInputChange("potassium", value[0])}
                    max={150}
                    step={5}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sensor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {sensorConnected ? (
                  <Wifi className="h-5 w-5 text-green-500" />
                ) : (
                  <WifiOff className="h-5 w-5 text-red-500" />
                )}
                Sensor Data
                <Badge variant={sensorConnected ? "default" : "destructive"}>
                  {sensorConnected ? "Connected" : "Disconnected"}
                </Badge>
              </CardTitle>
              <CardDescription>Real-time data from IoT sensors</CardDescription>
            </CardHeader>
            <CardContent>
              {sensorConnected && sensorData ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600">Soil Moisture</p>
                    <p className="text-2xl font-bold text-blue-800">{sensorData.soilMoisture.toFixed(1)}%</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600">Soil pH</p>
                    <p className="text-2xl font-bold text-green-800">{sensorData.soilPH.toFixed(1)}</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-600">Temperature</p>
                    <p className="text-2xl font-bold text-orange-800">{sensorData.temperature.toFixed(1)}°C</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-600">Humidity</p>
                    <p className="text-2xl font-bold text-purple-800">{sensorData.humidity.toFixed(1)}%</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-600">Light Intensity</p>
                    <p className="text-2xl font-bold text-yellow-800">{sensorData.lightIntensity.toFixed(0)} lux</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <WifiOff className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Waiting for sensor connection...</p>
                  <p className="text-sm text-gray-400">Make sure your IoT sensors are powered on and connected</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Data</CardTitle>
              <CardDescription>Fetch real-time environmental data for your location</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Button onClick={getEnvironmentalData} disabled={!location}>
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Environmental Data
                </Button>
                {location && (
                  <Badge variant="outline">
                    Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Temperature: {formData.temperature}°C</Label>
                  <Progress value={(formData.temperature / 50) * 100} />
                </div>
                <div className="space-y-2">
                  <Label>Humidity: {formData.humidity}%</Label>
                  <Progress value={formData.humidity} />
                </div>
                <div className="space-y-2">
                  <Label>Rainfall: {formData.rainfall}mm</Label>
                  <Progress value={(formData.rainfall / 500) * 100} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button onClick={predictYield} className="flex-1" disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Predict Yield"}
        </Button>
        <Button variant="outline" onClick={loadPredictionHistory}>
          <History className="h-4 w-4 mr-2" />
          History
        </Button>
      </div>

      {predictions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Predictions</CardTitle>
            <CardDescription>Your latest yield predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictions.slice(0, 3).map((prediction: any, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{prediction.crop_type}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(prediction.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      {prediction.prediction_result?.predictedYield?.total || "N/A"} tons
                    </p>
                    <p className="text-sm text-muted-foreground">{prediction.confidence_score || "N/A"}% confidence</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
