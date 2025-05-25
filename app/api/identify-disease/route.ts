import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const cropType = formData.get("cropType") as string
    const image = formData.get("image") as File

    if (!cropType) {
      return NextResponse.json({ error: "Crop type is required" }, { status: 400 })
    }

    // In a real application, this would process the image using a machine learning model
    // For now, we'll simulate disease identification based on crop type
    const diseaseIdentification = simulateDiseaseIdentification(cropType, image)

    return NextResponse.json(diseaseIdentification)
  } catch (error) {
    console.error("Disease identification error:", error)
    return NextResponse.json({ error: "Failed to identify disease" }, { status: 500 })
  }
}

function simulateDiseaseIdentification(cropType: string, image?: File) {
  // Comprehensive disease database
  const diseaseDatabase = {
    rice: [
      {
        name: "Rice Blast",
        scientificName: "Magnaporthe oryzae",
        symptoms:
          "Diamond-shaped lesions with gray centers and brown borders on leaves. Lesions may also appear on stems and panicles.",
        cause: "Fungal infection caused by Magnaporthe oryzae",
        severity: "High",
        treatment: [
          "Apply fungicides like Tricyclazole (0.6 g/L) or Isoprothiolane (1.5 ml/L)",
          "Use resistant varieties like Pusa Basmati 1121",
          "Remove and destroy infected plant debris",
          "Ensure proper field drainage",
        ],
        prevention: [
          "Use certified disease-free seeds",
          "Maintain balanced fertilization (avoid excess nitrogen)",
          "Ensure proper plant spacing for air circulation",
          "Practice crop rotation with non-host crops",
        ],
        organicTreatment: [
          "Apply neem oil (3-5 ml/L) spray",
          "Use Trichoderma viride as biological control",
          "Apply wood ash around plants",
        ],
      },
      {
        name: "Bacterial Leaf Blight",
        scientificName: "Xanthomonas oryzae pv. oryzae",
        symptoms:
          "Water-soaked lesions that turn yellow to white. Lesions have wavy margins and may extend to leaf tips.",
        cause: "Bacterial infection spread through water and wind",
        severity: "Medium",
        treatment: [
          "Apply copper-based bactericides like Copper oxychloride (3 g/L)",
          "Use antibiotics like Streptomycin (0.5 g/L) if permitted",
          "Remove infected plants immediately",
        ],
        prevention: [
          "Use resistant varieties",
          "Avoid overhead irrigation",
          "Maintain field hygiene",
          "Use balanced fertilization",
        ],
        organicTreatment: [
          "Apply copper sulfate solution (2 g/L)",
          "Use garlic extract spray",
          "Apply compost tea regularly",
        ],
      },
    ],
    wheat: [
      {
        name: "Wheat Rust (Yellow Rust)",
        scientificName: "Puccinia striiformis",
        symptoms: "Yellow to orange pustules arranged in stripes on leaves. Severely infected leaves may dry up.",
        cause: "Fungal infection favored by cool, moist conditions",
        severity: "High",
        treatment: [
          "Apply fungicides like Tebuconazole (1 ml/L) or Propiconazole (1 ml/L)",
          "Use systemic fungicides for better control",
          "Apply at first sign of infection",
        ],
        prevention: [
          "Use resistant wheat varieties",
          "Practice early planting",
          "Ensure proper crop rotation",
          "Remove volunteer wheat plants",
        ],
        organicTreatment: [
          "Apply sulfur dust (20-25 kg/ha)",
          "Use baking soda spray (5 g/L)",
          "Apply neem oil regularly",
        ],
      },
    ],
    maize: [
      {
        name: "Northern Corn Leaf Blight",
        scientificName: "Exserohilum turcicum",
        symptoms: "Long, elliptical, grayish-green or tan lesions on leaves. Lesions may have dark borders.",
        cause: "Fungal infection favored by warm, humid conditions",
        severity: "Medium",
        treatment: [
          "Apply fungicides like Azoxystrobin (1 ml/L) or Pyraclostrobin (1.5 ml/L)",
          "Use preventive sprays during favorable weather",
          "Ensure good field drainage",
        ],
        prevention: [
          "Use resistant maize hybrids",
          "Practice crop rotation with non-host crops",
          "Manage crop residue properly",
          "Maintain proper plant spacing",
        ],
        organicTreatment: [
          "Apply compost tea spray",
          "Use Trichoderma-based biocontrol agents",
          "Apply neem cake to soil",
        ],
      },
    ],
    cotton: [
      {
        name: "Cotton Bollworm",
        scientificName: "Helicoverpa armigera",
        symptoms: "Holes in bolls, damaged flowers and buds. Presence of caterpillars and their excreta.",
        cause: "Insect pest that feeds on cotton bolls and flowers",
        severity: "High",
        treatment: [
          "Apply insecticides like Chlorpyrifos (2 ml/L) or Cypermethrin (1 ml/L)",
          "Use pheromone traps for monitoring",
          "Apply at economic threshold levels",
        ],
        prevention: [
          "Use Bt cotton varieties",
          "Practice intercropping with trap crops",
          "Maintain field hygiene",
          "Monitor regularly with pheromone traps",
        ],
        organicTreatment: [
          "Apply neem-based insecticides (5 ml/L)",
          "Use Bacillus thuringiensis spray",
          "Release natural enemies like Trichogramma",
        ],
      },
    ],
  }

  // Randomly select a disease for simulation
  const diseases = diseaseDatabase[cropType] || diseaseDatabase.rice
  const selectedDisease = diseases[Math.floor(Math.random() * diseases.length)]

  // Simulate confidence based on image quality (if image provided)
  const confidence = image ? Math.floor(Math.random() * 20) + 80 : Math.floor(Math.random() * 15) + 70

  // Generate additional recommendations
  const additionalRecommendations = generateDiseaseRecommendations(selectedDisease, cropType)

  return {
    disease: selectedDisease,
    confidence,
    additionalRecommendations,
    imageAnalysis: image
      ? {
          size: image.size,
          type: image.type,
          quality: confidence > 85 ? "Good" : confidence > 70 ? "Fair" : "Poor",
        }
      : null,
    nextSteps: [
      "Monitor the affected area daily",
      "Take preventive measures in surrounding healthy plants",
      "Consult with local agricultural extension officer if symptoms persist",
      "Keep records of treatment applications and their effectiveness",
    ],
  }
}

function generateDiseaseRecommendations(disease: any, cropType: string) {
  const recommendations = []

  if (disease.severity === "High") {
    recommendations.push("Immediate action required - disease can cause significant yield loss")
    recommendations.push("Consider emergency treatment measures")
  }

  recommendations.push("Monitor weather conditions as they affect disease development")
  recommendations.push("Maintain detailed records of disease occurrence and treatment")
  recommendations.push("Consider soil health improvement for better plant resistance")

  if (cropType === "rice" && disease.name.includes("Blast")) {
    recommendations.push("Reduce nitrogen fertilizer application temporarily")
    recommendations.push("Improve field drainage to reduce humidity")
  }

  return recommendations
}
