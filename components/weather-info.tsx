"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CloudRain, Sun, Wind, Droplets, CloudSnow, CloudLightning } from "lucide-react"

export function WeatherInfo() {
  const [location, setLocation] = useState("Sample Location")
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [advisories, setAdvisories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real application, this would be an API call to a weather service
    // This is a simplified simulation for demonstration purposes

    // Simulate API call delay
    setTimeout(() => {
      // Sample current weather data
      setCurrentWeather({
        temperature: 28,
        humidity: 65,
        windSpeed: 12,
        rainfall: 0,
        condition: "Partly Cloudy",
      })

      // Sample forecast data
      setForecast([
        { day: "Today", temp: 28, condition: "Partly Cloudy", icon: <Sun className="h-6 w-6" /> },
        { day: "Tomorrow", temp: 30, condition: "Sunny", icon: <Sun className="h-6 w-6" /> },
        { day: "Wed", temp: 27, condition: "Rain", icon: <CloudRain className="h-6 w-6" /> },
        { day: "Thu", temp: 26, condition: "Rain", icon: <CloudRain className="h-6 w-6" /> },
        { day: "Fri", temp: 29, condition: "Partly Cloudy", icon: <Sun className="h-6 w-6" /> },
      ])

      // Sample agricultural advisories
      setAdvisories([
        {
          title: "Rainfall Alert",
          description:
            "Moderate rainfall expected on Wednesday and Thursday. Consider postponing any planned spraying operations.",
          icon: <CloudRain className="h-6 w-6 text-blue-500" />,
        },
        {
          title: "Temperature Advisory",
          description:
            "Temperatures expected to rise to 30°C tomorrow. Ensure adequate irrigation for sensitive crops.",
          icon: <Sun className="h-6 w-6 text-orange-500" />,
        },
        {
          title: "Wind Advisory",
          description: "Strong winds expected on Thursday. Secure any structures and avoid aerial spraying.",
          icon: <Wind className="h-6 w-6 text-gray-500" />,
        },
      ])

      setIsLoading(false)
    }, 1500)
  }, [])

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-10 w-10 text-yellow-500" />
      case "partly cloudy":
        return <Sun className="h-10 w-10 text-yellow-500" />
      case "rain":
        return <CloudRain className="h-10 w-10 text-blue-500" />
      case "snow":
        return <CloudSnow className="h-10 w-10 text-blue-200" />
      case "thunderstorm":
        return <CloudLightning className="h-10 w-10 text-purple-500" />
      default:
        return <Sun className="h-10 w-10 text-yellow-500" />
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{location}</h3>
        <p className="text-sm text-muted-foreground">Updated: {new Date().toLocaleTimeString()}</p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Current Weather</CardTitle>
          <CardDescription>Weather conditions for your farm</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getWeatherIcon(currentWeather.condition)}
              <div>
                <p className="text-3xl font-bold">{currentWeather.temperature}°C</p>
                <p className="text-sm text-muted-foreground">{currentWeather.condition}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-sm">{currentWeather.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Wind</p>
                  <p className="text-sm">{currentWeather.windSpeed} km/h</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CloudRain className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Rainfall</p>
                  <p className="text-sm">{currentWeather.rainfall} mm</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="forecast">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="forecast">5-Day Forecast</TabsTrigger>
          <TabsTrigger value="advisories">Agricultural Advisories</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="mt-4">
          <div className="grid grid-cols-5 gap-2">
            {forecast.map((day, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="p-3 text-center">
                  <CardTitle className="text-sm">{day.day}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 text-center">
                  <div className="flex justify-center">{day.icon}</div>
                  <p className="mt-1 text-xl font-bold">{day.temp}°C</p>
                  <p className="text-xs text-muted-foreground">{day.condition}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="advisories" className="mt-4">
          <div className="space-y-4">
            {advisories.map((advisory, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{advisory.icon}</div>
                    <div>
                      <h4 className="font-medium">{advisory.title}</h4>
                      <p className="text-sm text-muted-foreground">{advisory.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
