import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CTABanner() {
  return (
    <section className="bg-foreground py-20 text-background md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Get notified about new properties
          </h2>
          <p className="mb-8 text-pretty text-lg text-background/80">
            Be the first to know when new properties matching your preferences become available. Subscribe to our
            newsletter today.
          </p>

          <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 border-background/20 bg-background/10 text-background placeholder:text-background/60"
            />
            <Button size="lg" className="h-12 bg-primary hover:bg-primary/90">
              Subscribe
            </Button>
          </div>

          <p className="mt-4 text-sm text-background/70">Join 10,000+ subscribers. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  )
}
