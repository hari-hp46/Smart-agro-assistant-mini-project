import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const lat = searchParams.get("lat") || "28.6139" // Default to New Delhi
    const lon = searchParams.get("lon") || "77.2090"

    const apiKey = process.env.OPENWEATHERMAP_API_KEY

    if (!apiKey) {
      console.log("Weather API key not configured, using mock data")
      return NextResponse.json(getMockWeatherData())
    }

    // Get current weather with timeout and better error handling
    const currentWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      },
    )

    if (!currentWeatherResponse.ok) {
      console.log(`Weather API responded with status: ${currentWeatherResponse.status}`)
      return NextResponse.json(getMockWeatherData())
    }

    const currentWeather = await currentWeatherResponse.json()

    // Get 5-day forecast with timeout
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      },
    )

    if (!forecastResponse.ok) {
      console.log(`Forecast API responded with status: ${forecastResponse.status}`)
      // Return current weather with mock forecast if forecast fails
      return NextResponse.json({
        current: {
          temperature: Math.round(currentWeather.main.temp),
          humidity: currentWeather.main.humidity,
          windSpeed: Math.round(currentWeather.wind.speed * 3.6),
          condition: currentWeather.weather[0].main,
          description: currentWeather.weather[0].description,
          location: currentWeather.name,
          icon: currentWeather.weather[0].icon,
        },
        forecast: getMockForecast(),
        advisories: generateAdvisories(currentWeather, getMockForecast()),
      })
    }

    const forecast = await forecastResponse.json()

    // Process forecast data to get daily forecasts
    const dailyForecasts = []
    const processedDates = new Set()

    forecast.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toDateString()
      if (!processedDates.has(date) && dailyForecasts.length < 5) {
        processedDates.add(date)
        dailyForecasts.push({
          date: item.dt,
          temp: Math.round(item.main.temp),
          condition: item.weather[0].main,
          description: item.weather[0].description,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
          icon: item.weather[0].icon,
        })
      }
    })

    // Generate agricultural advisories based on weather data
    const advisories = generateAdvisories(currentWeather, dailyForecasts)

    return NextResponse.json({
      current: {
        temperature: Math.round(currentWeather.main.temp),
        humidity: currentWeather.main.humidity,
        windSpeed: Math.round(currentWeather.wind.speed * 3.6),
        condition: currentWeather.weather[0].main,
        description: currentWeather.weather[0].description,
        location: currentWeather.name,
        icon: currentWeather.weather[0].icon,
      },
      forecast: dailyForecasts,
      advisories,
    })
  } catch (error) {
    console.error("Weather API error:", error)
    // Always return mock data as fallback
    return NextResponse.json(getMockWeatherData())
  }
}

function getMockWeatherData() {
  return {
    current: {
      temperature: 28,
      humidity: 65,
      windSpeed: 12,
      condition: "Partly Cloudy",
      description: "partly cloudy",
      location: "Sample Location",
      icon: "02d",
    },
    forecast: getMockForecast(),
    advisories: [
      {
        title: "Sample Advisory",
        description: "This is sample weather data. Configure OPENWEATHERMAP_API_KEY for real data.",
        type: "info",
        icon: "sun",
      },
    ],
  }
}

function getMockForecast() {
  return [
    {
      date: Math.floor(Date.now() / 1000),
      temp: 28,
      condition: "Partly Cloudy",
      description: "partly cloudy",
      humidity: 65,
      windSpeed: 3.3,
      icon: "02d",
    },
    {
      date: Math.floor(Date.now() / 1000) + 86400,
      temp: 30,
      condition: "Sunny",
      description: "clear sky",
      humidity: 60,
      windSpeed: 2.5,
      icon: "01d",
    },
    {
      date: Math.floor(Date.now() / 1000) + 172800,
      temp: 27,
      condition: "Rain",
      description: "light rain",
      humidity: 80,
      windSpeed: 4.2,
      icon: "10d",
    },
    {
      date: Math.floor(Date.now() / 1000) + 259200,
      temp: 26,
      condition: "Rain",
      description: "moderate rain",
      humidity: 85,
      windSpeed: 5.1,
      icon: "10d",
    },
    {
      date: Math.floor(Date.now() / 1000) + 345600,
      temp: 29,
      condition: "Partly Cloudy",
      description: "few clouds",
      humidity: 70,
      windSpeed: 3.8,
      icon: "02d",
    },
  ]
}

function generateAdvisories(current: any, forecast: any[]) {
  const advisories = []

  // Temperature advisory
  if (current.main?.temp > 35 || current.temperature > 35) {
    advisories.push({
      title: "High Temperature Alert",
      description:
        "Extremely high temperatures detected. Ensure adequate irrigation and consider shade protection for sensitive crops.",
      type: "warning",
      icon: "sun",
    })
  } else if (current.main?.temp < 5 || current.temperature < 5) {
    advisories.push({
      title: "Frost Warning",
      description: "Low temperatures may cause frost. Protect sensitive crops and consider covering plants.",
      type: "warning",
      icon: "snowflake",
    })
  }

  // Rainfall advisory
  const rainDays = forecast.filter(
    (day) => day.condition.toLowerCase().includes("rain") || day.condition.toLowerCase().includes("storm"),
  )

  if (rainDays.length >= 2) {
    advisories.push({
      title: "Rainfall Alert",
      description: `Rain expected for ${rainDays.length} days. Consider postponing spraying operations and ensure proper drainage.`,
      type: "info",
      icon: "cloud-rain",
    })
  }

  // Wind advisory
  const windSpeed = current.wind?.speed || current.windSpeed / 3.6 || 0
  if (windSpeed > 10) {
    advisories.push({
      title: "Strong Wind Advisory",
      description: "Strong winds detected. Secure structures and avoid aerial spraying operations.",
      type: "warning",
      icon: "wind",
    })
  }

  // Humidity advisory
  const humidity = current.main?.humidity || current.humidity || 0
  if (humidity > 80) {
    advisories.push({
      title: "High Humidity Alert",
      description:
        "High humidity levels may promote fungal diseases. Monitor crops closely and ensure good air circulation.",
      type: "info",
      icon: "droplets",
    })
  }

  // Add a general farming tip if no specific advisories
  if (advisories.length === 0) {
    advisories.push({
      title: "Optimal Conditions",
      description:
        "Weather conditions are favorable for most farming activities. Good time for field work and crop monitoring.",
      type: "info",
      icon: "sun",
    })
  }

  return advisories
}
