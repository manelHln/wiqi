import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";

export function PlatformPreview() {

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="order-1 lg:order-1">
            <img
              src="/modern-property-rental-dashboard-on-laptop-screen.jpg"
              alt="Platform Preview"
              width={512}
            />
          </div>

          <div className="order-2 lg:order-2">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Comment faire des économies avec le cashback en ligne ?
            </h2>
            <p className="mb-8 text-pretty text-lg text-muted-foreground">
              Everything you need to find, compare, and secure your perfect
              rental property in one place.
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
