"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { TreesIcon as Plant, Droplets, CloudRain, BarChart3, Beaker, Camera, Cloud, MapPin, Bell } from "lucide-react"
import { CropYieldPredictor } from "./crop-yield-predictor"
import { FertilizerRecommender } from "./fertilizer-recommender"
import { DiseaseIdentifier } from "./disease-identifier"
import { WeatherInfo } from "./weather-info"
import { EducationalResources } from "./educational-resources"
import { GeolocationShops } from "./geolocation-shops"
import { WeatherAlerts } from "./weather-alerts"

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Plant className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">Smart Agriculture Assistant</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Alerts
              </Button>
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-2" />
                Location
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="yield" className="flex items-center space-x-2">
              <Plant className="h-4 w-4" />
              <span>Yield Prediction</span>
            </TabsTrigger>
            <TabsTrigger value="fertilizer" className="flex items-center space-x-2">
              <Beaker className="h-4 w-4" />
              <span>Fertilizer</span>
            </TabsTrigger>
            <TabsTrigger value="disease" className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Disease ID</span>
            </TabsTrigger>
            <TabsTrigger value="weather" className="flex items-center space-x-2">
              <Cloud className="h-4 w-4" />
              <span>Weather</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center space-x-2">
              <span>Resources</span>
            </TabsTrigger>
            <TabsTrigger value="shops" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Shops</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Crop Health</CardTitle>
                  <Plant className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Excellent</div>
                  <p className="text-xs text-muted-foreground">95% healthy crops detected</p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
                  <Droplets className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">68%</div>
                  <p className="text-xs text-muted-foreground">Optimal range: 60-70%</p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weather</CardTitle>
                  <CloudRain className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">25°C</div>
                  <p className="text-xs text-muted-foreground">Partly cloudy, 15mm rain expected</p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Yield Forecast</CardTitle>
                  <BarChart3 className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+12%</div>
                  <p className="text-xs text-muted-foreground">Above average this season</p>
                </CardContent>
              </Card>
            </div>

            {/* Weather Alerts */}
            <WeatherAlerts />

            {/* Quick Actions */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => setActiveTab("yield")}
                  >
                    <Plant className="h-6 w-6" />
                    <span className="text-sm">Predict Yield</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => setActiveTab("fertilizer")}
                  >
                    <Beaker className="h-6 w-6" />
                    <span className="text-sm">Get Fertilizer</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => setActiveTab("disease")}
                  >
                    <Camera className="h-6 w-6" />
                    <span className="text-sm">Check Disease</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => setActiveTab("weather")}
                  >
                    <Cloud className="h-6 w-6" />
                    <span className="text-sm">Weather Info</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="yield">
            <CropYieldPredictor />
          </TabsContent>

          <TabsContent value="fertilizer">
            <FertilizerRecommender />
          </TabsContent>

          <TabsContent value="disease">
            <DiseaseIdentifier />
          </TabsContent>

          <TabsContent value="weather">
            <WeatherInfo />
          </TabsContent>

          <TabsContent value="resources">
            <EducationalResources />
          </TabsContent>

          <TabsContent value="shops">
            <GeolocationShops />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
