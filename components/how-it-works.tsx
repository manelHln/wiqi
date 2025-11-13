import { Search, FileText, Key } from "lucide-react"

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Search Properties",
    description:
      "Browse through our extensive collection of properties using advanced filters to find exactly what you need.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Schedule a Visit",
    description: "Book a viewing at your convenience and explore the property with our experienced agents.",
  },
  {
    icon: Key,
    step: "03",
    title: "Move In",
    description: "Complete the paperwork, sign the agreement, and get the keys to your new home hassle-free.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">How It Works</h2>
          <p className="text-pretty text-muted-foreground">
            Finding your dream property is easy with our simple 3-step process
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="group text-center">
              <div className="relative mb-6 inline-block">
                <div className="flex size-20 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <step.icon className="size-10" />
                </div>
                <div className="absolute -right-4 -top-2 flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {step.step}
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="text-pretty text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
