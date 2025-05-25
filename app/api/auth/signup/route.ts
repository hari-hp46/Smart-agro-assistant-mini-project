import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone, farmSize, farmAddress } = await request.json()

    // Check if user already exists
    const { data: existingUser } = await supabase.from("users").select("email").eq("email", email).single()

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Get coordinates for farm address (mock implementation)
    const farmLocation = farmAddress
      ? {
          lat: 28.6139 + Math.random() * 0.1,
          lng: 77.209 + Math.random() * 0.1,
          address: farmAddress,
        }
      : null

    // Create new user
    const { data: newUser, error } = await supabase
      .from("users")
      .insert({
        name,
        email,
        password, // In production, hash this password
        phone,
        farm_size: farmSize,
        farm_location: farmLocation,
        role: "farmer",
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ message: "User created successfully", userId: newUser.id })
  } catch (error: any) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: error.message || "Failed to create user" }, { status: 500 })
  }
}
