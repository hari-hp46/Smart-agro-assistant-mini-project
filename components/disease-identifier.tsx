"use client"

import type React from "react"

import { useState, useRef } from "react"
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

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  // Simulated disease database
  const diseaseDatabase = {
    rice: [
      {
        name: "Rice Blast",
        symptoms: "Diamond-shaped lesions with gray centers and brown borders on leaves",
        cause: "Fungus (Magnaporthe oryzae)",
        treatment: ["Apply fungicides like Tricyclazole or Isoprothiolane. Use resistant varieties."],
        prevention: ["Use resistant varieties, balanced fertilization, proper spacing, and seed treatment."],
        scientificName: "Magnaporthe oryzae",
        severity: "High",
        organicTreatment: ["Neem oil spray", "Baking soda solution"],
      },
      {
        name: "Bacterial Leaf Blight",
        symptoms: "Water-soaked lesions that turn yellow to white as they develop",
        cause: "Bacteria (Xanthomonas oryzae)",
        treatment: ["Apply copper-based bactericides. Remove infected plants."],
        prevention: ["Use resistant varieties, balanced fertilization, and clean farming tools."],
        scientificName: "Xanthomonas oryzae pv. oryzae",
        severity: "Medium",
        organicTreatment: ["Garlic spray", "Chili pepper solution"],
      },
    ],
    wheat: [
      {
        name: "Wheat Rust",
        symptoms: "Reddish-brown pustules on leaves and stems",
        cause: "Fungus (Puccinia species)",
        treatment: ["Apply fungicides like Tebuconazole or Propiconazole."],
        prevention: ["Use resistant varieties, early planting, and crop rotation."],
        scientificName: "Puccinia triticina",
        severity: "High",
        organicTreatment: ["Sulfur spray", "Compost tea"],
      },
    ],
    maize: [
      {
        name: "Northern Corn Leaf Blight",
        symptoms: "Long, elliptical, grayish-green or tan lesions on the leaves",
        cause: "Fungus (Exserohilum turcicum)",
        treatment: ["Apply fungicides like Azoxystrobin or Pyraclostrobin."],
        prevention: ["Use resistant hybrids, crop rotation, and residue management."],
        scientificName: "Exserohilum turcicum",
        severity: "Medium",
        organicTreatment: ["Bacillus subtilis spray", "Seaweed extract"],
      },
    ],
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBrowseFiles = () => {
    fileInputRef.current?.click()
  }

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera on mobile
      })

      // Create a video element to show camera feed
      const video = document.createElement("video")
      video.srcObject = stream
      video.autoplay = true
      video.playsInline = true

      // Create a modal-like overlay for camera
      const overlay = document.createElement("div")
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      `

      video.style.cssText = `
        max-width: 90%;
        max-height: 70%;
        border-radius: 8px;
      `

      const captureBtn = document.createElement("button")
      captureBtn.textContent = "Capture Photo"
      captureBtn.style.cssText = `
        margin-top: 20px;
        padding: 12px 24px;
        background: #16a34a;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
      `

      const closeBtn = document.createElement("button")
      closeBtn.textContent = "Close"
      closeBtn.style.cssText = `
        margin-top: 10px;
        padding: 8px 16px;
        background: #dc2626;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
      `

      overlay.appendChild(video)
      overlay.appendChild(captureBtn)
      overlay.appendChild(closeBtn)
      document.body.appendChild(overlay)

      const cleanup = () => {
        stream.getTracks().forEach((track) => track.stop())
        document.body.removeChild(overlay)
      }

      captureBtn.onclick = () => {
        const canvas = document.createElement("canvas")
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(video, 0, 0)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" })
              setImageFile(file)
              setSelectedImage(canvas.toDataURL())
            }
          },
          "image/jpeg",
          0.8,
        )

        cleanup()
      }

      closeBtn.onclick = cleanup
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Unable to access camera. Please check permissions or use file upload instead.")
    }
  }

  const analyzeImage = async () => {
    if (!imageFile) {
      alert("Please select an image first")
      return
    }

    setIsAnalyzing(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append("cropType", cropType)
      formData.append("image", imageFile)

      const response = await fetch("/api/identify-disease", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to identify disease")
      }

      const data = await response.json()

      setResult({
        disease: data.disease,
        confidence: data.confidence,
        image: selectedImage || `/placeholder.svg?height=300&width=400&text=Disease+Sample`,
        additionalRecommendations: data.additionalRecommendations,
        nextSteps: data.nextSteps,
      })
    } catch (error) {
      console.error("Error identifying disease:", error)

      // Fallback to simulated data
      const diseases = diseaseDatabase[cropType] || diseaseDatabase.rice
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)]

      setResult({
        disease: randomDisease,
        confidence: Math.floor(Math.random() * 20) + 70,
        image: selectedImage || `/placeholder.svg?height=300&width=400&text=Simulated+Disease+Image`,
        additionalRecommendations: ["API temporarily unavailable - showing sample data"],
        nextSteps: ["Consult local agricultural expert", "Monitor plant condition"],
      })
    } finally {
      setIsAnalyzing(false)
    }
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
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

          {selectedImage ? (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Selected crop image"
                  className="w-full max-h-64 object-cover rounded-md border"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null)
                    setImageFile(null)
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
              <Button onClick={analyzeImage} className="w-full">
                Analyze Image
              </Button>
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                const files = e.dataTransfer.files
                if (files.length > 0) {
                  const file = files[0]
                  if (file.type.startsWith("image/")) {
                    setImageFile(file)
                    const reader = new FileReader()
                    reader.onload = (e) => {
                      setSelectedImage(e.target?.result as string)
                    }
                    reader.readAsDataURL(file)
                  }
                }
              }}
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">Drag and drop an image or click to browse</p>
              <p className="text-xs text-muted-foreground">JPG, PNG or WEBP, up to 5MB</p>
              <Button variant="outline" className="mt-4" onClick={handleBrowseFiles}>
                Browse Files
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="camera" className="mt-4">
          {selectedImage ? (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Captured crop image"
                  className="w-full max-h-64 object-cover rounded-md border"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null)
                    setImageFile(null)
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
              <div className="flex gap-2">
                <Button onClick={analyzeImage} className="flex-1">
                  Analyze Image
                </Button>
                <Button variant="outline" onClick={handleOpenCamera}>
                  Take Another
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
              <Camera className="h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm font-medium">Take a photo of the affected plant</p>
              <p className="text-xs text-muted-foreground">Make sure the affected area is clearly visible</p>
              <Button variant="outline" className="mt-4" onClick={handleOpenCamera}>
                Open Camera
              </Button>
            </div>
          )}
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
              <img src={result.image || "/placeholder.svg"} alt="Disease sample" className="rounded-md border w-full" />
            </div>

            <div className="space-y-4">
              <div className="rounded-md bg-green-50 p-4">
                <p className="font-medium text-green-800">{result.disease.name}</p>
                {result.disease.scientificName && (
                  <p className="text-sm text-green-700 italic">{result.disease.scientificName}</p>
                )}
                <p className="text-sm text-green-700">Confidence: {result.confidence}%</p>
                {result.disease.severity && (
                  <p className="text-sm text-green-700">Severity: {result.disease.severity}</p>
                )}
              </div>

              <div className="space-y-2">
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="treatment">Treatment</TabsTrigger>
              <TabsTrigger value="prevention">Prevention</TabsTrigger>
              <TabsTrigger value="organic">Organic Treatment</TabsTrigger>
            </TabsList>

            <TabsContent value="treatment" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  {result.disease.treatment ? (
                    <ul className="space-y-2">
                      {result.disease.treatment.map((treatment, index) => (
                        <li key={index} className="text-sm">
                          • {treatment}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm">Treatment information not available</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prevention" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  {result.disease.prevention ? (
                    <ul className="space-y-2">
                      {result.disease.prevention.map((prevention, index) => (
                        <li key={index} className="text-sm">
                          • {prevention}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm">Prevention information not available</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="organic" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  {result.disease.organicTreatment ? (
                    <ul className="space-y-2">
                      {result.disease.organicTreatment.map((treatment, index) => (
                        <li key={index} className="text-sm">
                          • {treatment}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm">Organic treatment information not available</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {result.additionalRecommendations && result.additionalRecommendations.length > 0 && (
            <div className="rounded-md bg-blue-50 p-4">
              <h4 className="font-medium text-blue-800 mb-2">Additional Recommendations:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                {result.additionalRecommendations.map((rec, index) => (
                  <li key={index}>• {rec}</li>
                ))}
              </ul>
            </div>
          )}

          {result.nextSteps && result.nextSteps.length > 0 && (
            <div className="rounded-md bg-yellow-50 p-4">
              <h4 className="font-medium text-yellow-800 mb-2">Next Steps:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                {result.nextSteps.map((step, index) => (
                  <li key={index}>• {step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
