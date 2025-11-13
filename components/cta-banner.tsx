import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CTABanner() {
  return (
    <section className="py-12">
      <div className="container bg-primary/20 mx-auto px-10 py-6 md:py-10 rounded-2xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Get notified about new properties
          </h2>
          <p className="mb-8 text-pretty text-lg">
            Be the first to know when new properties matching your preferences become available. Subscribe to our
            newsletter today.
          </p>

          <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="johndoe@mail.com"
              className="h-12 border-secondary/40 bg-transparent placeholder:text-secondary"
            />
            <Button size="lg" className="h-12 bg-primary hover:bg-primary/90 cursor-pointer">
              Subscribe
            </Button>
          </div>

          <p className="mt-4 text-sm">Join 10,000+ subscribers. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  )
}
