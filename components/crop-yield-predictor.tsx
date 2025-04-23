"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function CropYieldPredictor() {
  const [cropType, setCropType] = useState("rice")
  const [soilType, setSoilType] = useState("loamy")
  const [area, setArea] = useState(10)
  const [nitrogen, setNitrogen] = useState(50)
  const [phosphorus, setPhosphorus] = useState(40)
  const [potassium, setPotassium] = useState(30)
  const [rainfall, setRainfall] = useState(200)
  const [temperature, setTemperature] = useState(25)
  const [humidity, setHumidity] = useState(60)
  const [prediction, setPrediction] = useState(null)

  const predictYield = () => {
    // In a real application, this would be an API call to a machine learning model
    // This is a simplified simulation for demonstration purposes
    const baseYield = {
      rice: 4.5,
      wheat: 3.8,
      maize: 5.2,
      cotton: 2.1,
      sugarcane: 70,
    }[cropType]

    const soilFactor = {
      sandy: 0.8,
      loamy: 1.2,
      clayey: 1.0,
      silt: 1.1,
    }[soilType]

    // Simple formula to simulate yield prediction
    const simulatedYield =
      baseYield *
      soilFactor *
      (area / 10) *
      (1 + (nitrogen - 50) / 100) *
      (1 + (phosphorus - 40) / 100) *
      (1 + (potassium - 30) / 100) *
      (1 + (rainfall - 200) / 500) *
      (1 - Math.abs(temperature - 25) / 50) *
      (1 - Math.abs(humidity - 60) / 100)

    const data = [
      { name: "Current", yield: simulatedYield.toFixed(2) },
      { name: "Optimal", yield: (simulatedYield * 1.2).toFixed(2) },
      { name: "Previous", yield: (simulatedYield * 0.9).toFixed(2) },
    ]

    setPrediction(data)
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

        <div className="space-y-2">
          <Label htmlFor="area">Area (hectares)</Label>
          <Input id="area" type="number" value={area} onChange={(e) => setArea(Number(e.target.value))} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="nitrogen">Nitrogen (kg/ha): {nitrogen}</Label>
          </div>
          <Slider
            id="nitrogen"
            min={0}
            max={100}
            step={1}
            value={[nitrogen]}
            onValueChange={(value) => setNitrogen(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="phosphorus">Phosphorus (kg/ha): {phosphorus}</Label>
          </div>
          <Slider
            id="phosphorus"
            min={0}
            max={100}
            step={1}
            value={[phosphorus]}
            onValueChange={(value) => setPhosphorus(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="potassium">Potassium (kg/ha): {potassium}</Label>
          </div>
          <Slider
            id="potassium"
            min={0}
            max={100}
            step={1}
            value={[potassium]}
            onValueChange={(value) => setPotassium(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="rainfall">Rainfall (mm): {rainfall}</Label>
          </div>
          <Slider
            id="rainfall"
            min={0}
            max={500}
            step={10}
            value={[rainfall]}
            onValueChange={(value) => setRainfall(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="temperature">Temperature (°C): {temperature}</Label>
          </div>
          <Slider
            id="temperature"
            min={15}
            max={40}
            step={1}
            value={[temperature]}
            onValueChange={(value) => setTemperature(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="humidity">Humidity (%): {humidity}</Label>
          </div>
          <Slider
            id="humidity"
            min={30}
            max={90}
            step={1}
            value={[humidity]}
            onValueChange={(value) => setHumidity(value[0])}
          />
        </div>
      </div>

      <Button onClick={predictYield} className="w-full bg-green-600 hover:bg-green-700">
        Predict Yield
      </Button>

      {prediction && (
        <div className="mt-6 space-y-2">
          <h3 className="text-lg font-medium">Predicted Yield</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prediction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Yield (tons/ha)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Bar dataKey="yield" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-md bg-green-50 p-4">
            <p className="text-sm text-green-800">
              Based on your inputs, the predicted yield for {cropType} is approximately{" "}
              <strong>{prediction[0].yield} tons/hectare</strong>. With optimal conditions, you could achieve up to{" "}
              <strong>{prediction[1].yield} tons/hectare</strong>.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
