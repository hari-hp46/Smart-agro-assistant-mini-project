import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, cropType, soilType, area, sensorData, location, inputMethod, ...otherData } = body

    // Enhanced prediction algorithm
    const prediction = calculateEnhancedYieldPrediction({
      cropType,
      soilType,
      area,
      sensorData,
      inputMethod,
      ...otherData,
    })

    // Store prediction in database
    const { data: savedPrediction, error } = await supabase
      .from("crop_predictions")
      .insert({
        user_id: userId,
        crop_type: cropType,
        soil_type: soilType,
        area,
        input_data: {
          ...otherData,
          sensorData,
          inputMethod,
        },
        prediction_result: prediction,
        confidence_score: prediction.confidence,
        location,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json(savedPrediction)
  } catch (error: any) {
    console.error("Yield prediction error:", error)
    return NextResponse.json({ error: error.message || "Failed to predict yield" }, { status: 500 })
  }
}

function calculateEnhancedYieldPrediction(params: any) {
  const { cropType, soilType, area, nitrogen, phosphorus, potassium, sensorData, inputMethod } = params

  // Base yield potential for different crops (tons/hectare)
  const baseYields = {
    rice: 4.5,
    wheat: 3.8,
    maize: 5.2,
    cotton: 2.1,
    sugarcane: 70,
  }

  // Soil type factors
  const soilFactors = {
    sandy: 0.85,
    loamy: 1.2,
    clayey: 1.0,
    silt: 1.1,
  }

  const baseYield = baseYields[cropType] || 3.0
  const soilFactor = soilFactors[soilType] || 1.0

  // Enhanced factors based on input method
  let environmentalFactor = 0.8
  let nutrientFactor = 0.8
  let confidence = 70

  if (inputMethod === "sensor" && sensorData) {
    // Use sensor data for more accurate predictions
    const optimalMoisture = 60
    const optimalPH = 6.5
    const moistureFactor = 1 - Math.abs(sensorData.soilMoisture - optimalMoisture) / 100
    const phFactor = 1 - Math.abs(sensorData.soilPH - optimalPH) / 5

    environmentalFactor = (moistureFactor + phFactor) / 2
    confidence = 85
  } else if (inputMethod === "environmental") {
    // Use environmental data
    environmentalFactor = 0.9
    confidence = 80
  }

  // Calculate nutrient factor
  const optimalN = 120
  const optimalP = 60
  const optimalK = 60

  const nFactor = Math.min(1, nitrogen / optimalN)
  const pFactor = Math.min(1, phosphorus / optimalP)
  const kFactor = Math.min(1, potassium / optimalK)

  nutrientFactor = (nFactor + pFactor + kFactor) / 3

  // Calculate final yield
  const yieldPerHectare = baseYield * soilFactor * environmentalFactor * nutrientFactor
  const totalYield = yieldPerHectare * area

  return {
    predictedYield: {
      total: Math.round(totalYield * 100) / 100,
      perHectare: Math.round(yieldPerHectare * 100) / 100,
    },
    confidence: Math.round(confidence),
    factors: {
      soil: soilFactor,
      environment: environmentalFactor,
      nutrients: nutrientFactor,
    },
    inputMethod,
    recommendations: generateRecommendations(params),
  }
}

function generateRecommendations(params: any) {
  const recommendations = []

  if (params.nitrogen < 80) {
    recommendations.push("Increase nitrogen application for better vegetative growth")
  }
  if (params.phosphorus < 40) {
    recommendations.push("Apply phosphorus fertilizer to improve root development")
  }
  if (params.potassium < 30) {
    recommendations.push("Add potassium fertilizer to enhance disease resistance")
  }

  return recommendations
}
