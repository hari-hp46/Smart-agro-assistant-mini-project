import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cropType, soilType, area, nitrogen, phosphorus, potassium, rainfall, temperature, humidity } = body

    // Validate required fields
    if (!cropType || !soilType || !area) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real application, this would call a machine learning model
    // For now, we'll use an enhanced simulation based on agricultural science
    const prediction = calculateYieldPrediction({
      cropType,
      soilType,
      area,
      nitrogen,
      phosphorus,
      potassium,
      rainfall,
      temperature,
      humidity,
    })

    return NextResponse.json(prediction)
  } catch (error) {
    console.error("Yield prediction error:", error)
    return NextResponse.json({ error: "Failed to predict yield" }, { status: 500 })
  }
}

function calculateYieldPrediction(params: any) {
  const { cropType, soilType, area, nitrogen, phosphorus, potassium, rainfall, temperature, humidity } = params

  // Base yield potential for different crops (tons/hectare)
  const baseYields = {
    rice: 4.5,
    wheat: 3.8,
    maize: 5.2,
    cotton: 2.1,
    sugarcane: 70,
    soybean: 2.8,
    potato: 25,
  }

  // Soil type factors
  const soilFactors = {
    sandy: 0.85,
    loamy: 1.2,
    clayey: 1.0,
    silt: 1.1,
    "black-soil": 1.15,
    "red-soil": 0.95,
  }

  // Optimal ranges for different crops
  const optimalRanges = {
    rice: { temp: [20, 30], rainfall: [150, 300], humidity: [70, 85] },
    wheat: { temp: [15, 25], rainfall: [50, 150], humidity: [60, 75] },
    maize: { temp: [18, 27], rainfall: [100, 200], humidity: [65, 80] },
    cotton: { temp: [21, 30], rainfall: [75, 150], humidity: [55, 70] },
    sugarcane: { temp: [20, 30], rainfall: [150, 250], humidity: [75, 85] },
  }

  const baseYield = baseYields[cropType] || 3.0
  const soilFactor = soilFactors[soilType] || 1.0
  const optimal = optimalRanges[cropType] || { temp: [20, 30], rainfall: [100, 200], humidity: [60, 80] }

  // Calculate environmental factors
  const tempFactor = calculateOptimalityFactor(temperature, optimal.temp)
  const rainfallFactor = calculateOptimalityFactor(rainfall, optimal.rainfall)
  const humidityFactor = calculateOptimalityFactor(humidity, optimal.humidity)

  // Calculate nutrient factors (optimal levels: N=120, P=60, K=60 for most crops)
  const nutrientFactor = Math.min(1 + (nitrogen - 50) / 200, 1 + (phosphorus - 40) / 160, 1 + (potassium - 30) / 120)

  // Calculate predicted yield
  const environmentalFactor = (tempFactor + rainfallFactor + humidityFactor) / 3
  const totalYieldPerHectare = baseYield * soilFactor * environmentalFactor * Math.max(0.5, nutrientFactor)
  const totalYield = totalYieldPerHectare * area

  // Calculate confidence based on how close parameters are to optimal
  const confidence = Math.min(95, Math.max(60, 70 + (environmentalFactor - 0.7) * 50 + (nutrientFactor - 0.8) * 25))

  // Generate recommendations
  const recommendations = generateYieldRecommendations({
    cropType,
    nitrogen,
    phosphorus,
    potassium,
    temperature,
    rainfall,
    humidity,
    optimal,
  })

  return {
    predictedYield: {
      total: Math.round(totalYield * 100) / 100,
      perHectare: Math.round(totalYieldPerHectare * 100) / 100,
    },
    confidence: Math.round(confidence),
    factors: {
      soil: Math.round(soilFactor * 100) / 100,
      environment: Math.round(environmentalFactor * 100) / 100,
      nutrients: Math.round(nutrientFactor * 100) / 100,
    },
    recommendations,
    chartData: [
      { name: "Predicted", yield: Math.round(totalYieldPerHectare * 100) / 100 },
      { name: "Optimal", yield: Math.round(totalYieldPerHectare * 1.2 * 100) / 100 },
      { name: "Previous Season", yield: Math.round(totalYieldPerHectare * 0.9 * 100) / 100 },
    ],
  }
}

function calculateOptimalityFactor(value: number, optimalRange: number[]) {
  const [min, max] = optimalRange
  const mid = (min + max) / 2

  if (value >= min && value <= max) {
    return 1.0 // Optimal
  } else if (value < min) {
    return Math.max(0.3, 1 - (min - value) / min)
  } else {
    return Math.max(0.3, 1 - (value - max) / max)
  }
}

function generateYieldRecommendations(params: any) {
  const recommendations = []
  const { nitrogen, phosphorus, potassium, temperature, rainfall, humidity, optimal } = params

  // Nutrient recommendations
  if (nitrogen < 80) {
    recommendations.push("Increase nitrogen application for better vegetative growth")
  }
  if (phosphorus < 40) {
    recommendations.push("Apply phosphorus fertilizer to improve root development")
  }
  if (potassium < 30) {
    recommendations.push("Add potassium fertilizer to enhance disease resistance")
  }

  // Environmental recommendations
  if (temperature < optimal.temp[0]) {
    recommendations.push("Consider using row covers or greenhouse protection during cold periods")
  } else if (temperature > optimal.temp[1]) {
    recommendations.push("Implement shade nets or increase irrigation frequency during hot weather")
  }

  if (rainfall < optimal.rainfall[0]) {
    recommendations.push("Increase irrigation to compensate for low rainfall")
  } else if (rainfall > optimal.rainfall[1]) {
    recommendations.push("Ensure proper drainage to prevent waterlogging")
  }

  if (humidity > 85) {
    recommendations.push("Improve air circulation to reduce fungal disease risk")
  }

  return recommendations
}
