"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Star, Navigation, Search } from "lucide-react"

interface Shop {
  id: string
  name: string
  type: string
  address: string
  location: { lat: number; lng: number }
  phone?: string
  rating: number
  distance?: number
  verified: boolean
}

export function GeolocationShops() {
  const [shops, setShops] = useState<Shop[]>([])
  const [filteredShops, setFilteredShops] = useState<Shop[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedType, setSelectedType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Location error:", error)
          // Use default location (Delhi)
          setUserLocation({ lat: 28.6139, lng: 77.209 })
        },
      )
    } else {
      setUserLocation({ lat: 28.6139, lng: 77.209 })
    }
  }, [])

  useEffect(() => {
    if (userLocation) {
      fetchNearbyShops()
    }
  }, [userLocation])

  useEffect(() => {
    filterShops()
  }, [shops, selectedType, searchQuery])

  const fetchNearbyShops = async () => {
    if (!userLocation) return

    try {
      const response = await fetch(`/api/shops/nearby?lat=${userLocation.lat}&lng=${userLocation.lng}&radius=50`)
      const data = await response.json()

      if (data.shops) {
        setShops(data.shops)
      }
    } catch (error) {
      console.error("Error fetching shops:", error)
      // Use mock data as fallback
      setShops(getMockShops())
    } finally {
      setIsLoading(false)
    }
  }

  const filterShops = () => {
    let filtered = shops

    if (selectedType !== "all") {
      filtered = filtered.filter((shop) => shop.type === selectedType)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (shop) =>
          shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          shop.address.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredShops(filtered)
  }

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const getMockShops = (): Shop[] => [
    {
      id: "1",
      name: "Green Valley Seeds",
      type: "seeds",
      address: "123 Farm Road, Delhi",
      location: { lat: 28.6139, lng: 77.209 },
      phone: "+91-9876543210",
      rating: 4.5,
      verified: true,
    },
    {
      id: "2",
      name: "Fertilizer Hub",
      type: "fertilizer",
      address: "456 Agriculture Street, Gurgaon",
      location: { lat: 28.7041, lng: 77.1025 },
      phone: "+91-9876543211",
      rating: 4.2,
      verified: true,
    },
    {
      id: "3",
      name: "Farm Equipment Store",
      type: "equipment",
      address: "789 Machinery Lane, Noida",
      location: { lat: 28.5355, lng: 77.391 },
      phone: "+91-9876543212",
      rating: 4.8,
      verified: true,
    },
    {
      id: "4",
      name: "Agri Supplies",
      type: "general",
      address: "321 Market Square, Delhi",
      location: { lat: 28.65, lng: 77.23 },
      phone: "+91-9876543213",
      rating: 4.0,
      verified: false,
    },
  ]

  const getDirections = (shop: Shop) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${shop.location.lat},${shop.location.lng}`
      window.open(url, "_blank")
    }
  }

  const getShopTypeColor = (type: string) => {
    const colors = {
      seeds: "bg-green-100 text-green-800",
      fertilizer: "bg-blue-100 text-blue-800",
      equipment: "bg-orange-100 text-orange-800",
      general: "bg-purple-100 text-purple-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-600 border-t-transparent mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Finding nearby shops...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Nearby Agricultural Shops
          </CardTitle>
          <CardDescription>Find fertilizers, seeds, equipment, and supplies near you</CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search shops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="seeds">Seeds</SelectItem>
            <SelectItem value="fertilizer">Fertilizers</SelectItem>
            <SelectItem value="equipment">Equipment</SelectItem>
            <SelectItem value="general">General Supplies</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredShops.map((shop) => {
          const distance = userLocation
            ? calculateDistance(userLocation.lat, userLocation.lng, shop.location.lat, shop.location.lng)
            : 0

          return (
            <Card key={shop.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{shop.name}</h3>
                      {shop.verified && <Badge variant="default">Verified</Badge>}
                      <Badge className={getShopTypeColor(shop.type)}>{shop.type}</Badge>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {shop.address}
                      {distance > 0 && <span className="ml-2">• {distance.toFixed(1)} km away</span>}
                    </div>

                    {shop.phone && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {shop.phone}
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{shop.rating}</span>
                      <span className="text-sm text-muted-foreground">rating</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" onClick={() => getDirections(shop)}>
                      <Navigation className="h-4 w-4 mr-2" />
                      Directions
                    </Button>
                    {shop.phone && (
                      <Button size="sm" onClick={() => window.open(`tel:${shop.phone}`)}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredShops.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No shops found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or location</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
