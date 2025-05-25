"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function FertilizerRecommender() {
  const [cropType, setCropType] = useState("rice")
  const [soilType, setSoilType] = useState("loamy")
  const [soilpH, setSoilpH] = useState(6.5)
  const [nitrogenLevel, setNitrogenLevel] = useState(30)
  const [phosphorusLevel, setPhosphorusLevel] = useState(20)
  const [potassiumLevel, setPotassiumLevel] = useState(25)
  const [organicMatter, setOrganicMatter] = useState(2)
  const [recommendation, setRecommendation] = useState(null)

  const getFertilizerRecommendation = async () => {
    try {
      setRecommendation(null)

      const response = await fetch("/api/fertilizer-recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cropType,
          soilType,
          soilpH,
          nitrogenLevel,
          phosphorusLevel,
          potassiumLevel,
          organicMatter,
          area: 1, // Default to 1 hectare for calculations
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get fertilizer recommendation")
      }

      const data = await response.json()
      setRecommendation(data)
    } catch (error) {
      console.error("Error getting fertilizer recommendation:", error)
      // Fallback to simulated recommendation
      const optimalLevels = {
        rice: { n: 120, p: 60, k: 60, ph: 6.0 },
        wheat: { n: 100, p: 50, k: 50, ph: 6.5 },
        maize: { n: 150, p: 70, k: 70, ph: 6.0 },
        cotton: { n: 80, p: 40, k: 40, ph: 6.5 },
        sugarcane: { n: 200, p: 100, k: 100, ph: 6.5 },
      }[cropType] || { n: 120, p: 60, k: 60, ph: 6.5 }

      const nDeficiency = Math.max(0, optimalLevels.n - nitrogenLevel)
      const pDeficiency = Math.max(0, optimalLevels.p - phosphorusLevel)
      const kDeficiency = Math.max(0, optimalLevels.k - potassiumLevel)

      setRecommendation({
        analysis: {
          deficiencies: { nitrogen: nDeficiency, phosphorus: pDeficiency, potassium: kDeficiency },
        },
        recommendations: {
          chemical: {
            urea: (nDeficiency * 2.17).toFixed(2),
            dap: (pDeficiency * 2.17).toFixed(2),
            mop: (kDeficiency * 1.67).toFixed(2),
            lime: soilpH < optimalLevels.ph - 0.5 ? "500" : "0",
            gypsum: soilpH > optimalLevels.ph + 0.5 ? "400" : "0",
          },
          organic: {
            compost: ((nDeficiency + pDeficiency + kDeficiency) * 0.5).toFixed(2),
            vermicompost: ((nDeficiency + pDeficiency + kDeficiency) * 0.3).toFixed(2),
            farmyardManure: ((nDeficiency + pDeficiency + kDeficiency) * 0.8).toFixed(2),
            greenManure: organicMatter < 2 ? "Recommended" : "Optional",
            biofertilizers: "Azospirillum and Phosphobacteria",
          },
          schedule: [
            { stage: "Pre-planting", application: "50% of P and K, 20% of N" },
            { stage: "Vegetative growth", application: "40% of N" },
            { stage: "Reproductive stage", application: "40% of N, 50% of P and K" },
          ],
          costEstimation: { chemical: 150, organic: 200 },
        },
        tips: ["API temporarily unavailable - showing estimated values"],
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

        <div className="space-y-2">
          <Label htmlFor="soil-type">Soil Type</Label>
          <Select value={soilType} onValueChange={setSoilType}>
            <SelectTrigger id="soil-type">
              <SelectValue placeholder="Select soil type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sandy">Sandy</SelectItem>
              <SelectItem value="loamy">Loamy</SelectItem>
              <SelectItem value="clayey">Clayey</SelectItem>
              <SelectItem value="silt">Silt</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="soil-ph">Soil pH: {soilpH}</Label>
          </div>
          <Slider
            id="soil-ph"
            min={4}
            max={9}
            step={0.1}
            value={[soilpH]}
            onValueChange={(value) => setSoilpH(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="nitrogen">Nitrogen Level (kg/ha): {nitrogenLevel}</Label>
          </div>
          <Slider
            id="nitrogen"
            min={0}
            max={150}
            step={1}
            value={[nitrogenLevel]}
            onValueChange={(value) => setNitrogenLevel(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="phosphorus">Phosphorus Level (kg/ha): {phosphorusLevel}</Label>
          </div>
          <Slider
            id="phosphorus"
            min={0}
            max={100}
            step={1}
            value={[phosphorusLevel]}
            onValueChange={(value) => setPhosphorusLevel(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="potassium">Potassium Level (kg/ha): {potassiumLevel}</Label>
          </div>
          <Slider
            id="potassium"
            min={0}
            max={100}
            step={1}
            value={[potassiumLevel]}
            onValueChange={(value) => setPotassiumLevel(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="organic-matter">Organic Matter (%): {organicMatter}</Label>
          </div>
          <Slider
            id="organic-matter"
            min={0}
            max={5}
            step={0.1}
            value={[organicMatter]}
            onValueChange={(value) => setOrganicMatter(value[0])}
          />
        </div>
      </div>

      <Button onClick={getFertilizerRecommendation} className="w-full bg-green-600 hover:bg-green-700">
        Get Recommendations
      </Button>

      {recommendation && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium">Fertilizer Recommendations</h3>

          {recommendation.analysis && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-red-50 p-4 rounded-md">
                <p className="text-sm text-red-700">Nitrogen Deficiency</p>
                <p className="text-xl font-bold text-red-800">{recommendation.analysis.deficiencies.nitrogen} kg/ha</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-md">
                <p className="text-sm text-orange-700">Phosphorus Deficiency</p>
                <p className="text-xl font-bold text-orange-800">
                  {recommendation.analysis.deficiencies.phosphorus} kg/ha
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-md">
                <p className="text-sm text-yellow-700">Potassium Deficiency</p>
                <p className="text-xl font-bold text-yellow-800">
                  {recommendation.analysis.deficiencies.potassium} kg/ha
                </p>
              </div>
            </div>
          )}

          <Tabs defaultValue="chemical">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="chemical">Chemical</TabsTrigger>
              <TabsTrigger value="organic">Organic</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="cost">Cost</TabsTrigger>
            </TabsList>

            <TabsContent value="chemical" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Urea</p>
                        <p className="text-2xl font-bold">{recommendation.recommendations.chemical.urea} kg/ha</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">DAP</p>
                        <p className="text-2xl font-bold">{recommendation.recommendations.chemical.dap} kg/ha</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">MOP</p>
                        <p className="text-2xl font-bold">{recommendation.recommendations.chemical.mop} kg/ha</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Lime</p>
                        <p className="text-2xl font-bold">{recommendation.recommendations.chemical.lime} kg/ha</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="organic" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Compost</p>
                        <p className="text-2xl font-bold">{recommendation.recommendations.organic.compost} tons/ha</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Vermicompost</p>
                        <p className="text-2xl font-bold">
                          {recommendation.recommendations.organic.vermicompost} tons/ha
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">FYM</p>
                        <p className="text-2xl font-bold">
                          {recommendation.recommendations.organic.farmyardManure} tons/ha
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Biofertilizers</p>
                        <p className="text-lg font-bold">{recommendation.recommendations.organic.biofertilizers}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {recommendation.recommendations.schedule.map((item, index) => (
                      <div key={index} className="border-b pb-2 last:border-0">
                        <p className="font-medium">{item.stage}</p>
                        <p className="text-sm text-muted-foreground">{item.application}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cost" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-md">
                      <p className="text-sm text-blue-700">Chemical Fertilizers</p>
                      <p className="text-2xl font-bold text-blue-800">
                        ${recommendation.recommendations.costEstimation?.chemical || "N/A"}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-md">
                      <p className="text-sm text-green-700">Organic Fertilizers</p>
                      <p className="text-2xl font-bold text-green-800">
                        ${recommendation.recommendations.costEstimation?.organic || "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {recommendation.tips && (
            <div className="rounded-md bg-green-50 p-4">
              <h4 className="font-medium text-green-800 mb-2">Tips:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                {recommendation.tips.map((tip, index) => (
                  <li key={index}>• {tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
