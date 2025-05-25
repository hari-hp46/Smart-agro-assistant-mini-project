import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET(request: NextRequest) {
  try {
    // Get total users
    const { count: totalUsers } = await supabase.from("users").select("*", { count: "exact", head: true })

    // Get total predictions
    const { count: totalPredictions } = await supabase
      .from("crop_predictions")
      .select("*", { count: "exact", head: true })

    // Get total disease detections
    const { count: totalDiseaseDetections } = await supabase
      .from("disease_detections")
      .select("*", { count: "exact", head: true })

    // Get active users (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { count: activeUsers } = await supabase
      .from("crop_predictions")
      .select("user_id", { count: "exact", head: true })
      .gte("created_at", thirtyDaysAgo.toISOString())

    // Get recent activity
    const { data: recentActivity } = await supabase
      .from("admin_logs")
      .select("*, users(name)")
      .order("created_at", { ascending: false })
      .limit(10)

    const stats = {
      totalUsers: totalUsers || 0,
      totalPredictions: totalPredictions || 0,
      totalDiseaseDetections: totalDiseaseDetections || 0,
      activeUsers: activeUsers || 0,
    }

    return NextResponse.json({ stats, recentActivity })
  } catch (error: any) {
    console.error("Admin dashboard error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
