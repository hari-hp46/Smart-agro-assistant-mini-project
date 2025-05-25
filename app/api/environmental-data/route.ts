import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")

    if (!lat || !lng) {
      return NextResponse.json({ error: "Coordinates required" }, { status: 400 })
    }

    // Mock environmental data - in production, integrate with weather APIs
    const environmentalData = {
      weather: {
        temperature: 25 + Math.random() * 10,
        humidity: 60 + Math.random() * 20,
        rainfall: 100 + Math.random() * 200,
        windSpeed: 5 + Math.random() * 10,
      },
      soil: {
        moisture: 40 + Math.random() * 30,
        ph: 6.0 + Math.random() * 2,
        organicMatter: 2 + Math.random() * 3,
      },
      location: {
        lat: Number.parseFloat(lat),
        lng: Number.parseFloat(lng),
      },
    }

    return NextResponse.json(environmentalData)
  } catch (error: any) {
    console.error("Environmental data error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
