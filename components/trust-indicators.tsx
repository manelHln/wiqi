import { Shield, Award, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function TrustIndicators() {
  const indicators = [
    {
      icon: Shield,
      title: "100% Verified",
      stat: "All Properties",
      description: "Every listing is verified by our expert team for authenticity and quality",
    },
    {
      icon: Award,
      title: "4.9/5 Rating",
      stat: "Customer Satisfaction",
      description: "Trusted by thousands with exceptional reviews across all platforms",
    },
    {
      icon: Users,
      title: "50,000+",
      stat: "Active Users",
      description: "Join our growing community of satisfied renters and property owners",
    },
  ]

  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">Why Choose Us</h2>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            We're committed to providing the best rental experience with verified listings and exceptional service
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {indicators.map((item, index) => (
            <Card key={index} className="text-center transition-shadow hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="size-8 text-primary" />
                </div>
                <div className="mb-2 text-3xl font-bold text-foreground">{item.stat}</div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
