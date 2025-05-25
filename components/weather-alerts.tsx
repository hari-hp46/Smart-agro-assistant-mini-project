"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  CloudRain,
  Zap,
  Wind,
  Thermometer,
  Snowflake,
  Sun,
  Bell,
  BellOff,
  X,
  Clock,
  MapPin,
} from "lucide-react"

interface WeatherAlert {
  id: string
  type: "severe" | "warning" | "watch" | "advisory"
  category: "temperature" | "precipitation" | "wind" | "storm" | "frost" | "drought"
  title: string
  description: string
  severity: "extreme" | "severe" | "moderate" | "minor"
  startTime: Date
  endTime: Date
  location: string
  recommendations: string[]
  isActive: boolean
  isDismissed: boolean
}

export function WeatherAlerts() {
  const [alerts, setAlerts] = useState<WeatherAlert[]>([])
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check notification permission status
    if ("Notification" in window) {
      setNotificationsEnabled(Notification.permission === "granted")
    }

    // Fetch initial alerts
    fetchWeatherAlerts()

    // Set up periodic alert checking (every 5 minutes)
    const alertInterval = setInterval(fetchWeatherAlerts, 5 * 60 * 1000)

    return () => clearInterval(alertInterval)
  }, [])

  const fetchWeatherAlerts = async () => {
    try {
      setIsLoading(true)

      // Get user location
      let lat = 28.6139
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
          console.log("Using default location for alerts")
        }
      }

      const response = await fetch(`/api/weather-alerts?lat=${lat}&lon=${lon}`)

      if (response.ok) {
        const data = await response.json()
        const newAlerts = data.alerts.map((alert: any) => ({
          ...alert,
          startTime: new Date(alert.startTime),
          endTime: new Date(alert.endTime),
        }))

        setAlerts(newAlerts)

        // Show notifications for new severe alerts
        if (notificationsEnabled) {
          newAlerts.forEach((alert: WeatherAlert) => {
            if (alert.severity === "extreme" || alert.severity === "severe") {
              showNotification(alert)
            }
          })
        }
      } else {
        // Generate sample alerts for demonstration
        setAlerts(generateSampleAlerts())
      }
    } catch (error) {
      console.error("Error fetching weather alerts:", error)
      setAlerts(generateSampleAlerts())
    } finally {
      setIsLoading(false)
    }
  }

  const generateSampleAlerts = (): WeatherAlert[] => {
    const now = new Date()
    return [
      {
        id: "1",
        type: "warning",
        category: "precipitation",
        title: "Heavy Rainfall Warning",
        description: "Heavy rainfall expected in the next 24 hours. Rainfall amounts of 50-75mm possible.",
        severity: "severe",
        startTime: now,
        endTime: new Date(now.getTime() + 24 * 60 * 60 * 1000),
        location: "Your Farm Area",
        recommendations: [
          "Ensure proper field drainage",
          "Postpone spraying operations",
          "Secure loose equipment and structures",
          "Monitor low-lying areas for flooding",
        ],
        isActive: true,
        isDismissed: false,
      },
      {
        id: "2",
        type: "watch",
        category: "temperature",
        title: "Heat Wave Watch",
        description: "Temperatures may exceed 40°C in the coming days. Monitor crop stress levels.",
        severity: "moderate",
        startTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
        location: "Regional Area",
        recommendations: [
          "Increase irrigation frequency",
          "Provide shade for sensitive crops",
          "Monitor livestock for heat stress",
          "Avoid heavy field work during peak hours",
        ],
        isActive: true,
        isDismissed: false,
      },
      {
        id: "3",
        type: "advisory",
        category: "wind",
        title: "Strong Wind Advisory",
        description: "Sustained winds of 25-35 km/h with gusts up to 50 km/h expected.",
        severity: "minor",
        startTime: new Date(now.getTime() + 6 * 60 * 60 * 1000),
        endTime: new Date(now.getTime() + 18 * 60 * 60 * 1000),
        location: "Local Area",
        recommendations: [
          "Secure greenhouse structures",
          "Avoid aerial spraying",
          "Check irrigation systems for damage",
          "Monitor young plants for wind damage",
        ],
        isActive: true,
        isDismissed: false,
      },
    ]
  }

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      setNotificationsEnabled(permission === "granted")

      if (permission === "granted") {
        // Show a test notification
        new Notification("Weather Alerts Enabled", {
          body: "You will now receive severe weather notifications for your farm.",
          icon: "/placeholder.svg?height=64&width=64",
        })
      }
    }
  }

  const showNotification = (alert: WeatherAlert) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(`${alert.title}`, {
        body: alert.description,
        icon: "/placeholder.svg?height=64&width=64",
        badge: "/placeholder.svg?height=32&width=32",
        tag: alert.id,
        requireInteraction: alert.severity === "extreme",
      })
    }
  }

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, isDismissed: true } : alert)))
  }

  const getAlertIcon = (category: string, severity: string) => {
    const iconClass =
      severity === "extreme"
        ? "h-6 w-6 text-red-600"
        : severity === "severe"
          ? "h-6 w-6 text-orange-600"
          : severity === "moderate"
            ? "h-6 w-6 text-yellow-600"
            : "h-6 w-6 text-blue-600"

    switch (category) {
      case "precipitation":
        return <CloudRain className={iconClass} />
      case "storm":
        return <Zap className={iconClass} />
      case "wind":
        return <Wind className={iconClass} />
      case "temperature":
        return <Thermometer className={iconClass} />
      case "frost":
        return <Snowflake className={iconClass} />
      case "drought":
        return <Sun className={iconClass} />
      default:
        return <AlertTriangle className={iconClass} />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "extreme":
        return (
          <Badge variant="destructive" className="bg-red-600">
            EXTREME
          </Badge>
        )
      case "severe":
        return (
          <Badge variant="destructive" className="bg-orange-600">
            SEVERE
          </Badge>
        )
      case "moderate":
        return (
          <Badge variant="secondary" className="bg-yellow-600 text-white">
            MODERATE
          </Badge>
        )
      case "minor":
        return (
          <Badge variant="outline" className="border-blue-600 text-blue-600">
            MINOR
          </Badge>
        )
      default:
        return <Badge variant="outline">UNKNOWN</Badge>
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const activeAlerts = alerts.filter((alert) => alert.isActive && !alert.isDismissed)
  const dismissedAlerts = alerts.filter((alert) => alert.isDismissed)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading weather alerts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with notification controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <h3 className="text-lg font-medium">Weather Alerts</h3>
          {activeAlerts.length > 0 && (
            <Badge variant="destructive" className="ml-2">
              {activeAlerts.length} Active
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={notificationsEnabled ? "default" : "outline"}
            size="sm"
            onClick={notificationsEnabled ? () => setNotificationsEnabled(false) : requestNotificationPermission}
            className="flex items-center gap-2"
          >
            {notificationsEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
            {notificationsEnabled ? "Notifications On" : "Enable Notifications"}
          </Button>
        </div>
      </div>

      {/* Active Alerts */}
      {activeAlerts.length > 0 ? (
        <div className="space-y-4">
          <h4 className="font-medium text-red-600">Active Alerts</h4>
          {activeAlerts.map((alert) => (
            <Card key={alert.id} className="border-l-4 border-l-red-600">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getAlertIcon(alert.category, alert.severity)}
                    <div>
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {getSeverityBadge(alert.severity)}
                        <Badge variant="outline" className="text-xs">
                          {alert.type.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => dismissAlert(alert.id)} className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{alert.description}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {formatTime(alert.startTime)} - {formatTime(alert.endTime)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{alert.location}</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-2">Recommended Actions:</h5>
                  <ul className="space-y-1">
                    {alert.recommendations.map((rec, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-green-600 mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Sun className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-green-600">No Active Weather Alerts</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Weather conditions are currently favorable for farming activities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recently Dismissed Alerts */}
      {dismissedAlerts.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-muted-foreground">Recently Dismissed</h4>
          {dismissedAlerts.slice(0, 3).map((alert) => (
            <Card key={alert.id} className="opacity-60">
              <CardContent className="py-3">
                <div className="flex items-center gap-3">
                  {getAlertIcon(alert.category, alert.severity)}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatTime(alert.startTime)} - {formatTime(alert.endTime)}
                    </p>
                  </div>
                  {getSeverityBadge(alert.severity)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
