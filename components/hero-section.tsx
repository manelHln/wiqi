"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Search, Home, DollarSign } from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary/40 py-12 md:py-20 px-12">
      <div className="absolute inset-0 opacity-10" />

      <div className="container relative mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Left side - Hero content and search */}
          <div>
            <h1 className="mb-4 text-balance text-4xl font-medium text-foreground md:text-5xl lg:text-6xl">
              Save effortlessly on every online purchase
            </h1>
            <Button className="bg-primary rounded-3xl py-6 px-9 text-xl">
              Register - 10$ gifted*
            </Button>
          </div>

          <div className="flex justify-center items-center overflow-hidden rounded-2xl">
            <picture>
              <source
                srcSet="/modern-luxury-apartment-exterior.jpg"
                height={316}
                width={442}
              />
              <Image
                src="/modern-luxury-apartment-exterior.jpg"
                className="rounded-xl"
                alt=""
                height={316}
                width={442}
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
