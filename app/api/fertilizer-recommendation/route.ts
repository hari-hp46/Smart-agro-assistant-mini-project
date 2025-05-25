import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cropType, soilType, soilpH, nitrogenLevel, phosphorusLevel, potassiumLevel, organicMatter, area = 1 } = body

    // Validate required fields
    if (!cropType || !soilType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const recommendation = calculateFertilizerRecommendation({
      cropType,
      soilType,
      soilpH,
      nitrogenLevel,
      phosphorusLevel,
      potassiumLevel,
      organicMatter,
      area,
    })

    return NextResponse.json(recommendation)
  } catch (error) {
    console.error("Fertilizer recommendation error:", error)
    return NextResponse.json({ error: "Failed to generate fertilizer recommendation" }, { status: 500 })
  }
}

function calculateFertilizerRecommendation(params: any) {
  const { cropType, soilType, soilpH, nitrogenLevel, phosphorusLevel, potassiumLevel, organicMatter, area } = params

  // Optimal nutrient levels for different crops (kg/ha)
  const optimalLevels = {
    rice: { n: 120, p: 60, k: 60, ph: 6.0 },
    wheat: { n: 100, p: 50, k: 50, ph: 6.5 },
    maize: { n: 150, p: 70, k: 70, ph: 6.0 },
    cotton: { n: 80, p: 40, k: 40, ph: 6.5 },
    sugarcane: { n: 200, p: 100, k: 100, ph: 6.5 },
    soybean: { n: 40, p: 60, k: 50, ph: 6.2 },
    potato: { n: 180, p: 80, k: 120, ph: 5.8 },
  }

  const optimal = optimalLevels[cropType] || { n: 120, p: 60, k: 60, ph: 6.5 }

  // Calculate deficiencies
  const nDeficiency = Math.max(0, optimal.n - nitrogenLevel)
  const pDeficiency = Math.max(0, optimal.p - phosphorusLevel)
  const kDeficiency = Math.max(0, optimal.k - potassiumLevel)
  const phAdjustment = optimal.ph - soilpH

  // Soil type adjustment factors
  const soilAdjustments = {
    sandy: { n: 1.2, p: 1.0, k: 1.3 }, // Sandy soils need more due to leaching
    loamy: { n: 1.0, p: 1.0, k: 1.0 }, // Ideal soil
    clayey: { n: 0.9, p: 1.2, k: 0.8 }, // Clay holds nutrients well but P availability is low
    silt: { n: 1.0, p: 1.1, k: 1.0 },
  }

  const adjustment = soilAdjustments[soilType] || { n: 1.0, p: 1.0, k: 1.0 }

  // Calculate fertilizer requirements
  const chemicalFertilizers = {
    urea: Math.round(nDeficiency * adjustment.n * 2.17 * area), // Urea is 46% N
    dap: Math.round(pDeficiency * adjustment.p * 2.17 * area), // DAP is 46% P2O5
    mop: Math.round(kDeficiency * adjustment.k * 1.67 * area), // MOP is 60% K2O
    lime: phAdjustment > 0.5 ? Math.round(500 * area) : 0,
    gypsum: phAdjustment < -0.5 ? Math.round(400 * area) : 0,
  }

  // Organic alternatives
  const organicFertilizers = {
    compost: Math.round((nDeficiency + pDeficiency + kDeficiency) * 0.5 * area),
    vermicompost: Math.round((nDeficiency + pDeficiency + kDeficiency) * 0.3 * area),
    farmyardManure: Math.round((nDeficiency + pDeficiency + kDeficiency) * 0.8 * area),
    greenManure: organicMatter < 2 ? "Recommended" : "Optional",
    biofertilizers: getBiofertilizerRecommendation(cropType),
  }

  // Application schedule
  const schedule = getApplicationSchedule(cropType, chemicalFertilizers)

  // Cost estimation (in USD, approximate)
  const costEstimation = {
    chemical:
      Math.round(
        (chemicalFertilizers.urea * 0.3 +
          chemicalFertilizers.dap * 0.4 +
          chemicalFertilizers.mop * 0.35 +
          chemicalFertilizers.lime * 0.1 +
          chemicalFertilizers.gypsum * 0.12) *
          100,
      ) / 100,
    organic:
      Math.round(
        (organicFertilizers.compost * 25 +
          organicFertilizers.vermicompost * 40 +
          organicFertilizers.farmyardManure * 15) *
          100,
      ) / 100,
  }

  return {
    analysis: {
      deficiencies: {
        nitrogen: nDeficiency,
        phosphorus: pDeficiency,
        potassium: kDeficiency,
      },
      soilpH: {
        current: soilpH,
        optimal: optimal.ph,
        adjustment: phAdjustment,
      },
      organicMatter: {
        current: organicMatter,
        status: organicMatter < 1.5 ? "Low" : organicMatter > 3 ? "Good" : "Moderate",
      },
    },
    recommendations: {
      chemical: chemicalFertilizers,
      organic: organicFertilizers,
      schedule,
      costEstimation,
    },
    tips: generateFertilizerTips(cropType, soilType, organicMatter),
  }
}

function getBiofertilizerRecommendation(cropType: string) {
  const biofertilizers = {
    rice: "Azospirillum, Phosphobacteria, and Blue-green algae",
    wheat: "Azotobacter and Phosphobacteria",
    maize: "Azospirillum and Phosphobacteria",
    cotton: "Azotobacter and Phosphobacteria",
    sugarcane: "Azospirillum and Phosphobacteria",
    soybean: "Rhizobium and Phosphobacteria",
    potato: "Azotobacter and Phosphobacteria",
  }

  return biofertilizers[cropType] || "Azospirillum and Phosphobacteria"
}

function getApplicationSchedule(cropType: string, fertilizers: any) {
  const schedules = {
    rice: [
      { stage: "Pre-planting", application: `${fertilizers.dap} kg DAP, ${Math.round(fertilizers.mop * 0.5)} kg MOP` },
      { stage: "Tillering (21 days)", application: `${Math.round(fertilizers.urea * 0.5)} kg Urea` },
      {
        stage: "Panicle initiation (45 days)",
        application: `${Math.round(fertilizers.urea * 0.5)} kg Urea, ${Math.round(fertilizers.mop * 0.5)} kg MOP`,
      },
    ],
    wheat: [
      { stage: "Sowing", application: `${fertilizers.dap} kg DAP, ${fertilizers.mop} kg MOP` },
      { stage: "Crown root initiation (21 days)", application: `${Math.round(fertilizers.urea * 0.5)} kg Urea` },
      { stage: "Jointing stage (45 days)", application: `${Math.round(fertilizers.urea * 0.5)} kg Urea` },
    ],
    maize: [
      { stage: "Sowing", application: `${Math.round(fertilizers.dap * 0.5)} kg DAP, ${fertilizers.mop} kg MOP` },
      {
        stage: "Knee-high stage (30 days)",
        application: `${Math.round(fertilizers.urea * 0.5)} kg Urea, ${Math.round(fertilizers.dap * 0.5)} kg DAP`,
      },
      { stage: "Tasseling (60 days)", application: `${Math.round(fertilizers.urea * 0.5)} kg Urea` },
    ],
  }

  return (
    schedules[cropType] || [
      { stage: "Pre-planting", application: "50% of P and K, 20% of N" },
      { stage: "Vegetative growth", application: "40% of N" },
      { stage: "Reproductive stage", application: "40% of N, 50% of P and K" },
    ]
  )
}

function generateFertilizerTips(cropType: string, soilType: string, organicMatter: number) {
  const tips = []

  if (organicMatter < 2) {
    tips.push("Increase organic matter by adding compost or farmyard manure regularly")
  }

  if (soilType === "sandy") {
    tips.push("Apply fertilizers in split doses to reduce leaching losses")
    tips.push("Consider slow-release fertilizers for better nutrient efficiency")
  }

  if (soilType === "clayey") {
    tips.push("Improve soil drainage and add organic matter to enhance nutrient availability")
  }

  tips.push("Always conduct soil testing before fertilizer application")
  tips.push("Follow integrated nutrient management combining organic and inorganic sources")
  tips.push("Apply fertilizers during cool hours to minimize volatilization losses")

  return tips
}
