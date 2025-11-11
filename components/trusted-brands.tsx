export function TrustedBrands() {
  const brands = ["Google", "Amazon", "Microsoft", "Apple", "Meta", "Netflix"]

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <p className="mb-6 text-center font-bold text-lg tracking-wider">
          More than 150+ partner merchants
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brands.map((brand) => (
            <div
              key={brand}
              className="text-xl font-bold text-muted-foreground/40 transition-colors hover:text-foreground"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
