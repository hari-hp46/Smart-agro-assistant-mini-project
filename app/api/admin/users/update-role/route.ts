import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { userId, role } = await request.json()

    if (!userId || !role) {
      return NextResponse.json({ error: "User ID and role required" }, { status: 400 })
    }

    const { error } = await supabase.from("users").update({ role }).eq("id", userId)

    if (error) {
      throw error
    }

    // Log the admin action
    await supabase.from("admin_logs").insert({
      admin_id: userId, // In a real app, get this from session
      action: `Updated user role to ${role}`,
      target_table: "users",
      target_id: userId,
      details: { newRole: role },
    })

    return NextResponse.json({ message: "Role updated successfully" })
  } catch (error: any) {
    console.error("Error updating user role:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
