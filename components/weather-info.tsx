"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CloudRain, Sun, Wind, Droplets, CloudSnow, CloudLightning, AlertCircle } from "lucide-react"
import { WeatherAlerts } from "./weather-alerts"

export function WeatherInfo() {
  const [location, setLocation] = useState("Loading...")
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [advisories, setAdvisories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Get user's location or use default coordinates
        let lat = 28.6139 // Default to New Delhi
        let lon = 77.209

        if (navigator.geolocation) {
          try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 5000,
                enableHighAccuracy: false,
              })
            })
            lat = position.coords.latitude
            lon = position.coords.longitude
          } catch (error) {
            console.log("Using default location due to geolocation error:", error)
          }
        }

        const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        setCurrentWeather(data.current)
        setLocation(data.current.location)

        // Format forecast data for display
        const formattedForecast = data.forecast.map((day: any, index: number) => {
          const date = new Date(day.date * 1000)
          const dayName =
            index === 0 ? "Today" : index === 1 ? "Tomorrow" : date.toLocaleDateString("en", { weekday: "short" })

          return {
            day: dayName,
            temp: day.temp,
            condition: day.condition,
            icon: getWeatherIcon(day.condition),
          }
        })

        setForecast(formattedForecast)
        setAdvisories(
          data.advisories.map((advisory: any) => ({
            ...advisory,
            icon: getAdvisoryIcon(advisory.icon),
          })),
        )
      } catch (error) {
        console.error("Error fetching weather data:", error)
        setError(error.message)

        // Set fallback data
        setCurrentWeather({
          temperature: 28,
          humidity: 65,
          windSpeed: 12,
          condition: "Partly Cloudy",
          location: "Sample Location",
        })
        setLocation("Sample Location")
        setForecast([
          { day: "Today", temp: 28, condition: "Partly Cloudy", icon: <Sun className="h-6 w-6" /> },
          { day: "Tomorrow", temp: 30, condition: "Sunny", icon: <Sun className="h-6 w-6" /> },
          { day: "Wed", temp: 27, condition: "Rain", icon: <CloudRain className="h-6 w-6" /> },
          { day: "Thu", temp: 26, condition: "Rain", icon: <CloudRain className="h-6 w-6" /> },
          { day: "Fri", temp: 29, condition: "Partly Cloudy", icon: <Sun className="h-6 w-6" /> },
        ])
        setAdvisories([
          {
            title: "Weather Data Unavailable",
            description: "Unable to fetch real weather data. Showing sample data for demonstration.",
            icon: <AlertCircle className="h-6 w-6 text-orange-500" />,
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeatherData()
  }, [])

  const getAdvisoryIcon = (iconType: string) => {
    switch (iconType) {
      case "sun":
        return <Sun className="h-6 w-6 text-orange-500" />
      case "cloud-rain":
        return <CloudRain className="h-6 w-6 text-blue-500" />
      case "wind":
        return <Wind className="h-6 w-6 text-gray-500" />
      case "droplets":
        return <Droplets className="h-6 w-6 text-blue-500" />
      case "snowflake":
        return <CloudSnow className="h-6 w-6 text-blue-200" />
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />
    }
  }

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return <Sun className="h-10 w-10 text-yellow-500" />
      case "partly cloudy":
      case "few clouds":
      case "scattered clouds":
        return <Sun className="h-10 w-10 text-yellow-500" />
      case "rain":
      case "light rain":
      case "moderate rain":
      case "heavy rain":
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
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading weather data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{location}</h3>
        <div className="flex items-center gap-2">
          {error && <AlertCircle className="h-4 w-4 text-orange-500" title="Using sample data" />}
          <p className="text-sm text-muted-foreground">Updated: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      <Tabs defaultValue="current">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current Weather</TabsTrigger>
          <TabsTrigger value="forecast">5-Day Forecast</TabsTrigger>
          <TabsTrigger value="alerts">Weather Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Current Weather</CardTitle>
              <CardDescription>
                {error ? "Sample weather data (API unavailable)" : "Weather conditions for your farm"}
              </CardDescription>
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
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agricultural Advisories */}
          <div className="mt-6 space-y-4">
            <h4 className="font-medium">Agricultural Advisories</h4>
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

        <TabsContent value="alerts" className="mt-4">
          <WeatherAlerts />
        </TabsContent>
      </Tabs>
    </div>
  )
}
