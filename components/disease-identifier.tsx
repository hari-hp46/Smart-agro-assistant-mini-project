"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Camera } from "lucide-react"

export function DiseaseIdentifier() {
  const [cropType, setCropType] = useState("rice")
  const [uploadMethod, setUploadMethod] = useState("upload")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  // Simulated disease database
  const diseaseDatabase = {
    rice: [
      {
        name: "Rice Blast",
        symptoms: "Diamond-shaped lesions with gray centers and brown borders on leaves",
        cause: "Fungus (Magnaporthe oryzae)",
        treatment: "Apply fungicides like Tricyclazole or Isoprothiolane. Use resistant varieties.",
        prevention: "Use resistant varieties, balanced fertilization, proper spacing, and seed treatment.",
      },
      {
        name: "Bacterial Leaf Blight",
        symptoms: "Water-soaked lesions that turn yellow to white as they develop",
        cause: "Bacteria (Xanthomonas oryzae)",
        treatment: "Apply copper-based bactericides. Remove infected plants.",
        prevention: "Use resistant varieties, balanced fertilization, and clean farming tools.",
      },
    ],
    wheat: [
      {
        name: "Wheat Rust",
        symptoms: "Reddish-brown pustules on leaves and stems",
        cause: "Fungus (Puccinia species)",
        treatment: "Apply fungicides like Tebuconazole or Propiconazole.",
        prevention: "Use resistant varieties, early planting, and crop rotation.",
      },
    ],
    maize: [
      {
        name: "Northern Corn Leaf Blight",
        symptoms: "Long, elliptical, grayish-green or tan lesions on the leaves",
        cause: "Fungus (Exserohilum turcicum)",
        treatment: "Apply fungicides like Azoxystrobin or Pyraclostrobin.",
        prevention: "Use resistant hybrids, crop rotation, and residue management.",
      },
    ],
  }

  const simulateImageUpload = (e) => {
    e.preventDefault()
    setIsAnalyzing(true)

    // Simulate analysis delay
    setTimeout(() => {
      // Randomly select a disease from the database for the selected crop
      const diseases = diseaseDatabase[cropType]
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)]

      setResult({
        disease: randomDisease,
        confidence: Math.floor(Math.random() * 20) + 80, // Random confidence between 80-99%
        image: `/placeholder.svg?height=300&width=400&text=Simulated+Disease+Image`,
      })

      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="crop-type">Crop Type</Label>
        <Select value={cropType} onValueChange={setCropType}>
          <SelectTrigger id="crop-type">
            <SelectValue placeholder="Select crop type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rice">Rice</SelectItem>
            <SelectItem value="wheat">Wheat</SelectItem>
            <SelectItem value="maize">Maize</SelectItem>
            <SelectItem value="cotton">Cotton</SelectItem>
            <SelectItem value="sugarcane">Sugarcane</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={uploadMethod} onValueChange={setUploadMethod}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Image</TabsTrigger>
          <TabsTrigger value="camera">Take Photo</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-4">
          <div
            className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={simulateImageUpload}
          >
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">Drag and drop an image or click to browse</p>
            <p className="text-xs text-muted-foreground">JPG, PNG or WEBP, up to 5MB</p>
            <Button variant="outline" className="mt-4" onClick={simulateImageUpload}>
              Browse Files
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="camera" className="mt-4">
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
            <Camera className="h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium">Take a photo of the affected plant</p>
            <p className="text-xs text-muted-foreground">Make sure the affected area is clearly visible</p>
            <Button variant="outline" className="mt-4" onClick={simulateImageUpload}>
              Open Camera
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {isAnalyzing && (
        <div className="flex flex-col items-center justify-center py-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
          <p className="mt-2 text-sm text-muted-foreground">Analyzing image...</p>
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium">Disease Identification Result</h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <img src={result.image || "/placeholder.svg"} alt="Disease sample" className="rounded-md border" />
            </div>

            <div>
              <div className="rounded-md bg-green-50 p-4">
                <p className="font-medium text-green-800">{result.disease.name}</p>
                <p className="text-sm text-green-700">Confidence: {result.confidence}%</p>
              </div>

              <div className="mt-4 space-y-2">
                <div>
                  <p className="text-sm font-medium">Symptoms</p>
                  <p className="text-sm text-muted-foreground">{result.disease.symptoms}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Cause</p>
                  <p className="text-sm text-muted-foreground">{result.disease.cause}</p>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="treatment">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="treatment">Treatment</TabsTrigger>
              <TabsTrigger value="prevention">Prevention</TabsTrigger>
            </TabsList>

            <TabsContent value="treatment" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm">{result.disease.treatment}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prevention" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm">{result.disease.prevention}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
