"use client"

import { PropertyCard } from "./property-card"
import { Button } from "./ui/button"
import { useState } from "react"

const allListings = [
  {
    image: "/placeholder.svg?key=prop1",
    price: "1,500",
    title: "Cozy Studio Apartment",
    location: "Brooklyn, NY",
    beds: 1,
    baths: 1,
    area: 650,
    type: "apartment",
    isNew: true,
    rating: 4.3,
  },
  {
    image: "/placeholder.svg?key=prop2",
    price: "2,800",
    title: "Suburban Family Home",
    location: "Austin, TX",
    beds: 3,
    baths: 2,
    area: 1800,
    type: "house",
    rating: 4.7,
  },
  {
    image: "/placeholder.svg?key=prop3",
    price: "4,500",
    title: "Luxury Penthouse",
    location: "Los Angeles, CA",
    beds: 3,
    baths: 3,
    area: 2200,
    type: "apartment",
    featured: true,
    rating: 4.9,
  },
  {
    image: "/placeholder.svg?key=prop4",
    price: "2,200",
    title: "Modern Townhouse",
    location: "Seattle, WA",
    beds: 2,
    baths: 2,
    area: 1500,
    type: "condo",
    rating: 4.5,
  },
  {
    image: "/placeholder.svg?key=prop5",
    price: "1,900",
    title: "Charming Cottage",
    location: "Portland, OR",
    beds: 2,
    baths: 1,
    area: 1100,
    type: "house",
    isNew: true,
    rating: 4.4,
  },
  {
    image: "/placeholder.svg?key=prop6",
    price: "3,200",
    title: "Waterfront Apartment",
    location: "Miami, FL",
    beds: 2,
    baths: 2,
    area: 1600,
    type: "apartment",
    rating: 4.8,
  },
  {
    image: "/placeholder.svg?key=prop7",
    price: "2,600",
    title: "Urban Loft",
    location: "Chicago, IL",
    beds: 2,
    baths: 2,
    area: 1400,
    type: "condo",
    featured: true,
    rating: 4.6,
  },
  {
    image: "/placeholder.svg?key=prop8",
    price: "3,800",
    title: "Spacious Villa",
    location: "San Diego, CA",
    beds: 4,
    baths: 3,
    area: 2500,
    type: "house",
    rating: 4.9,
  },
]

const filterOptions = [
  { label: "All Properties", value: "all" },
  { label: "Apartments", value: "apartment" },
  { label: "Houses", value: "house" },
  { label: "Condos", value: "condo" },
]

export function RecentListings() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredListings =
    activeFilter === "all" ? allListings : allListings.filter((listing) => listing.type === activeFilter)

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">Recent Listings</h2>
          <p className="text-pretty text-muted-foreground">Discover the latest properties added to our marketplace</p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={activeFilter === option.value ? "default" : "outline"}
              onClick={() => setActiveFilter(option.value)}
              className="transition-all"
            >
              {option.label}
            </Button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredListings.slice(0, 8).map((listing, index) => (
            <PropertyCard key={index} {...listing} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg">View More Properties</Button>
        </div>
      </div>
    </section>
  )
}
