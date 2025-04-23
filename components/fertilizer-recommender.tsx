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

  const getFertilizerRecommendation = () => {
    // In a real application, this would be an API call to a recommendation system
    // This is a simplified simulation for demonstration purposes

    // Optimal levels for the selected crop
    const optimalLevels = {
      rice: { n: 120, p: 60, k: 60, ph: 6.0 },
      wheat: { n: 100, p: 50, k: 50, ph: 6.5 },
      maize: { n: 150, p: 70, k: 70, ph: 6.0 },
      cotton: { n: 80, p: 40, k: 40, ph: 6.5 },
      sugarcane: { n: 200, p: 100, k: 100, ph: 6.5 },
    }[cropType]

    // Calculate deficiencies
    const nDeficiency = Math.max(0, optimalLevels.n - nitrogenLevel)
    const pDeficiency = Math.max(0, optimalLevels.p - phosphorusLevel)
    const kDeficiency = Math.max(0, optimalLevels.k - potassiumLevel)
    const phAdjustment = optimalLevels.ph - soilpH

    // Generate recommendations
    const recommendations = {
      chemical: {
        urea: (nDeficiency * 2.17).toFixed(2),
        dap: (pDeficiency * 2.17).toFixed(2),
        mop: (kDeficiency * 1.67).toFixed(2),
        lime: phAdjustment > 0.5 ? "500 kg/ha" : "Not needed",
        gypsum: phAdjustment < -0.5 ? "400 kg/ha" : "Not needed",
      },
      organic: {
        compost: ((nDeficiency + pDeficiency + kDeficiency) * 0.5).toFixed(2),
        vermicompost: ((nDeficiency + pDeficiency + kDeficiency) * 0.3).toFixed(2),
        greenManure: organicMatter < 2 ? "Recommended" : "Optional",
        biofertilizers: "Azospirillum and Phosphobacteria",
      },
      schedule: [
        { stage: "Pre-planting", application: "50% of P and K, 20% of N" },
        { stage: "Vegetative growth", application: "40% of N" },
        { stage: "Reproductive stage", application: "40% of N, 50% of P and K" },
      ],
    }

    setRecommendation(recommendations)
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

          <Tabs defaultValue="chemical">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chemical">Chemical</TabsTrigger>
              <TabsTrigger value="organic">Organic</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="chemical" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Urea</p>
                        <p className="text-2xl font-bold">{recommendation.chemical.urea} kg/ha</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">DAP</p>
                        <p className="text-2xl font-bold">{recommendation.chemical.dap} kg/ha</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">MOP</p>
                        <p className="text-2xl font-bold">{recommendation.chemical.mop} kg/ha</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Lime</p>
                        <p className="text-2xl font-bold">{recommendation.chemical.lime}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Gypsum</p>
                        <p className="text-2xl font-bold">{recommendation.chemical.gypsum}</p>
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
                        <p className="text-2xl font-bold">{recommendation.organic.compost} tons/ha</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Vermicompost</p>
                        <p className="text-2xl font-bold">{recommendation.organic.vermicompost} tons/ha</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Green Manure</p>
                        <p className="text-2xl font-bold">{recommendation.organic.greenManure}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Biofertilizers</p>
                        <p className="text-lg font-bold">{recommendation.organic.biofertilizers}</p>
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
                    {recommendation.schedule.map((item, index) => (
                      <div key={index} className="border-b pb-2 last:border-0">
                        <p className="font-medium">{item.stage}</p>
                        <p className="text-sm text-muted-foreground">{item.application}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="rounded-md bg-green-50 p-4">
            <p className="text-sm text-green-800">
              These recommendations are based on your soil analysis and crop requirements. For best results, follow the
              application schedule and consider using a combination of chemical and organic fertilizers for sustainable
              farming.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
