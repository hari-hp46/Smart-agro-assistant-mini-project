import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dashboard } from "@/components/dashboard"
import { CropYieldPredictor } from "@/components/crop-yield-predictor"
import { FertilizerRecommender } from "@/components/fertilizer-recommender"
import { DiseaseIdentifier } from "@/components/disease-identifier"
import { WeatherInfo } from "@/components/weather-info"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-green-50">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
        <div className="flex items-center gap-2">
          <img
            src="/placeholder.svg?height=40&width=40&text=🌱&bg=16a34a&color=ffffff"
            alt="AgroSmart Logo"
            className="h-8 w-8 rounded"
          />
          <h1 className="text-xl font-semibold text-green-700">Smart Agriculture Assistant</h1>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Dashboard />
        </div>
        <Tabs defaultValue="crop-yield" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="crop-yield">Crop Yield</TabsTrigger>
            <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
            <TabsTrigger value="disease">Disease</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
          </TabsList>
          <TabsContent value="crop-yield" className="mt-4">
            <Card>
              <CardHeader>
                <img
                  src="/placeholder.svg?height=100&width=400&text=Crop+Yield+Prediction&bg=16a34a&color=ffffff"
                  alt="Crop Yield Prediction"
                  className="w-full h-20 object-cover rounded-lg mb-4"
                />
                <CardTitle>Crop Yield Prediction</CardTitle>
                <CardDescription>Predict your crop yield based on various parameters.</CardDescription>
              </CardHeader>
              <CardContent>
                <CropYieldPredictor />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="fertilizer" className="mt-4">
            <Card>
              <CardHeader>
                <img
                  src="/placeholder.svg?height=100&width=400&text=Fertilizer+Recommendation&bg=3b82f6&color=ffffff"
                  alt="Fertilizer Recommendation"
                  className="w-full h-20 object-cover rounded-lg mb-4"
                />
                <CardTitle>Fertilizer Recommendation</CardTitle>
                <CardDescription>Get personalized fertilizer recommendations for your crops.</CardDescription>
              </CardHeader>
              <CardContent>
                <FertilizerRecommender />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="disease" className="mt-4">
            <Card>
              <CardHeader>
                <img
                  src="/placeholder.svg?height=100&width=400&text=Disease+Identification&bg=dc2626&color=ffffff"
                  alt="Disease Identification"
                  className="w-full h-20 object-cover rounded-lg mb-4"
                />
                <CardTitle>Disease Identification</CardTitle>
                <CardDescription>Identify crop diseases and get treatment recommendations.</CardDescription>
              </CardHeader>
              <CardContent>
                <DiseaseIdentifier />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="weather" className="mt-4">
            <Card>
              <CardHeader>
                <img
                  src="/placeholder.svg?height=100&width=400&text=Weather+Information&bg=9333ea&color=ffffff"
                  alt="Weather Information"
                  className="w-full h-20 object-cover rounded-lg mb-4"
                />
                <CardTitle>Weather Information</CardTitle>
                <CardDescription>Get weather forecasts and agricultural advisories.</CardDescription>
              </CardHeader>
              <CardContent>
                <WeatherInfo />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
