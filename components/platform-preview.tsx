import EarlyAccess from "./early-access";

export function PlatformPreview() {

  return (
    <section className="py-12 md:py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="order-1 lg:order-1">
            <img
              src="/laptop.svg"
              alt="Platform Preview"
              width={350}
            />
          </div>

          <div className="order-2 lg:order-2">
            <p className="mb-4 text-xl sm:text-3xl font-bold text-secondary text-pretty">
              Everything you need to find, compare, and secure your perfect
              rental property in one place.
            </p>
            <EarlyAccess />
          </div>
          
        </div>
      </div>
    </section>
  );
}
