export function Partners() {
  const partners = [
    { name: "Zillow", logo: "Zillow" },
    { name: "Redfin", logo: "Redfin" },
    { name: "Realtor", logo: "Realtor" },
    { name: "Trulia", logo: "Trulia" },
    { name: "Compass", logo: "Compass" },
    { name: "Coldwell", logo: "Coldwell" },
    { name: "Century 21", logo: "Century 21" },
    { name: "RE/MAX", logo: "RE/MAX" },
  ]

  return (
    <section className="border-y border-border bg-muted py-12">
      <div className="container mx-auto px-4">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-wide text-muted-foreground">
          More than 150+ partner merchants
        </p>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center grayscale transition-all hover:grayscale-0"
            >
              <div className="text-center text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
                {partner.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
