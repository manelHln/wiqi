import { Building2, Home, Hotel, TreePine } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    icon: Home,
    title: "Houses",
    description: "Explore spacious family homes with yards and modern amenities",
  },
  {
    icon: Building2,
    title: "Apartments",
    description: "Find urban living spaces perfect for city lifestyle",
  },
  {
    icon: Hotel,
    title: "Villas",
    description: "Discover luxury properties with premium features",
  },
  {
    icon: TreePine,
    title: "Land",
    description: "Browse available plots for your dream project",
  },
]

export function PropertyCategories() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">Browse by Property Type</h2>
          <p className="text-pretty text-muted-foreground">Choose from our diverse range of property categories</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Card key={category.title} className="group cursor-pointer transition-all hover:shadow-lg">
              <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <category.icon className="size-8" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
