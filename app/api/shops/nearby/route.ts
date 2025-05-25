import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = Number.parseFloat(searchParams.get("lat") || "0")
    const lng = Number.parseFloat(searchParams.get("lng") || "0")
    const radius = Number.parseFloat(searchParams.get("radius") || "50") // km

    if (!lat || !lng) {
      return NextResponse.json({ error: "Coordinates required" }, { status: 400 })
    }

    // Fetch shops from database
    const { data: shops, error } = await supabase.from("shops").select("*").eq("verified", true)

    if (error) {
      throw error
    }

    // Calculate distances and filter by radius
    const shopsWithDistance = shops
      .map((shop) => {
        const shopLat = shop.location.lat
        const shopLng = shop.location.lng
        const distance = calculateDistance(lat, lng, shopLat, shopLng)

        return {
          ...shop,
          distance,
        }
      })
      .filter((shop) => shop.distance <= radius)
      .sort((a, b) => a.distance - b.distance)

    return NextResponse.json({ shops: shopsWithDistance })
  } catch (error: any) {
    console.error("Error fetching nearby shops:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
