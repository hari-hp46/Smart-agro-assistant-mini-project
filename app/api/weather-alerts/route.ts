import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const lat = searchParams.get("lat") || "28.6139"
    const lon = searchParams.get("lon") || "77.2090"

    const apiKey = process.env.OPENWEATHERMAP_API_KEY

    if (!apiKey) {
      console.log("Weather API key not configured, using mock alerts")
      return NextResponse.json(generateMockAlerts())
    }

    // Get current weather data to analyze for alerts
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(10000),
      },
    )

    // Get forecast data for extended alerts
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(10000),
      },
    )

    if (!weatherResponse.ok || !forecastResponse.ok) {
      console.log("Weather API error, using mock alerts")
      return NextResponse.json(generateMockAlerts())
    }

    const currentWeather = await weatherResponse.json()
    const forecast = await forecastResponse.json()

    // Generate alerts based on weather conditions
    const alerts = generateWeatherAlerts(currentWeather, forecast)

    return NextResponse.json({
      alerts,
      location: currentWeather.name,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Weather alerts API error:", error)
    return NextResponse.json(generateMockAlerts())
  }
}

function generateWeatherAlerts(current: any, forecast: any) {
  const alerts = []
  const now = new Date()

  // Temperature alerts
  if (current.main.temp > 40) {
    alerts.push({
      id: `temp-extreme-${Date.now()}`,
      type: "warning",
      category: "temperature",
      title: "Extreme Heat Warning",
      description: `Dangerous heat conditions with temperatures reaching ${Math.round(current.main.temp)}°C. Immediate action required to protect crops and livestock.`,
      severity: "extreme",
      startTime: now.toISOString(),
      endTime: new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString(),
      location: current.name,
      recommendations: [
        "Increase irrigation immediately",
        "Provide emergency shade for crops",
        "Monitor livestock closely for heat stress",
        "Avoid all non-essential field work",
        "Ensure adequate water supply",
      ],
      isActive: true,
      isDismissed: false,
    })
  } else if (current.main.temp > 35) {
    alerts.push({
      id: `temp-high-${Date.now()}`,
      type: "warning",
      category: "temperature",
      title: "High Temperature Alert",
      description: `High temperatures of ${Math.round(current.main.temp)}°C detected. Take precautions to protect crops.`,
      severity: "severe",
      startTime: now.toISOString(),
      endTime: new Date(now.getTime() + 8 * 60 * 60 * 1000).toISOString(),
      location: current.name,
      recommendations: [
        "Increase irrigation frequency",
        "Provide shade for sensitive crops",
        "Monitor crop stress levels",
        "Avoid spraying during peak heat",
      ],
      isActive: true,
      isDismissed: false,
    })
  }

  if (current.main.temp < 2) {
    alerts.push({
      id: `frost-warning-${Date.now()}`,
      type: "warning",
      category: "frost",
      title: "Frost Warning",
      description: `Freezing temperatures of ${Math.round(current.main.temp)}°C. Frost damage likely for sensitive crops.`,
      severity: "severe",
      startTime: now.toISOString(),
      endTime: new Date(now.getTime() + 6 * 60 * 60 * 1000).toISOString(),
      location: current.name,
      recommendations: [
        "Cover sensitive plants immediately",
        "Use frost protection methods",
        "Harvest ready crops if possible",
        "Check irrigation systems for freezing",
      ],
      isActive: true,
      isDismissed: false,
    })
  }

  // Wind alerts
  if (current.wind.speed > 15) {
    alerts.push({
      id: `wind-strong-${Date.now()}`,
      type: "warning",
      category: "wind",
      title: "Strong Wind Warning",
      description: `Strong winds of ${Math.round(current.wind.speed * 3.6)} km/h detected. Structural damage possible.`,
      severity: current.wind.speed > 20 ? "severe" : "moderate",
      startTime: now.toISOString(),
      endTime: new Date(now.getTime() + 6 * 60 * 60 * 1000).toISOString(),
      location: current.name,
      recommendations: [
        "Secure all loose structures",
        "Avoid aerial spraying operations",
        "Check greenhouse anchoring",
        "Monitor young plants for damage",
      ],
      isActive: true,
      isDismissed: false,
    })
  }

  // Precipitation alerts from forecast
  const heavyRainPeriods = forecast.list.filter((item: any) => item.rain && item.rain["3h"] > 10)

  if (heavyRainPeriods.length > 0) {
    const totalRain = heavyRainPeriods.reduce((sum: number, item: any) => sum + (item.rain["3h"] || 0), 0)

    alerts.push({
      id: `rain-heavy-${Date.now()}`,
      type: "warning",
      category: "precipitation",
      title: "Heavy Rainfall Warning",
      description: `Heavy rainfall expected with total amounts of ${Math.round(totalRain)}mm over the next 24 hours.`,
      severity: totalRain > 50 ? "severe" : "moderate",
      startTime: now.toISOString(),
      endTime: new Date(heavyRainPeriods[heavyRainPeriods.length - 1].dt * 1000).toISOString(),
      location: current.name,
      recommendations: [
        "Ensure proper field drainage",
        "Postpone spraying operations",
        "Secure equipment and materials",
        "Monitor for flooding in low areas",
      ],
      isActive: true,
      isDismissed: false,
    })
  }

  // Storm alerts
  const stormPeriods = forecast.list.filter((item: any) => item.weather[0].main === "Thunderstorm")

  if (stormPeriods.length > 0) {
    alerts.push({
      id: `storm-warning-${Date.now()}`,
      type: "warning",
      category: "storm",
      title: "Thunderstorm Warning",
      description: "Thunderstorms expected in your area. Lightning and hail possible.",
      severity: "severe",
      startTime: new Date(stormPeriods[0].dt * 1000).toISOString(),
      endTime: new Date(stormPeriods[stormPeriods.length - 1].dt * 1000).toISOString(),
      location: current.name,
      recommendations: [
        "Seek shelter immediately when storms approach",
        "Secure all outdoor equipment",
        "Avoid working in open fields",
        "Protect crops from potential hail damage",
      ],
      isActive: true,
      isDismissed: false,
    })
  }

  return alerts
}

function generateMockAlerts() {
  const now = new Date()

  return {
    alerts: [
      {
        id: "mock-1",
        type: "warning",
        category: "precipitation",
        title: "Heavy Rainfall Warning",
        description: "Heavy rainfall expected in the next 24 hours. Rainfall amounts of 50-75mm possible.",
        severity: "severe",
        startTime: now.toISOString(),
        endTime: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
        location: "Sample Location",
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
        id: "mock-2",
        type: "watch",
        category: "temperature",
        title: "Heat Wave Watch",
        description: "Temperatures may exceed 40°C in the coming days. Monitor crop stress levels.",
        severity: "moderate",
        startTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        endTime: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
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
    ],
    location: "Sample Location",
    lastUpdated: now.toISOString(),
  }
}
