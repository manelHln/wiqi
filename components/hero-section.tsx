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
import EarlyAccess from "./early-access";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-primary/40 py-12 md:py-20 px-6">
      <div className="absolute inset-0 opacity-10" />

      <div className="container relative mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* Left side - Hero content and search */}
          <div>
            <h1 className="mb-4 text-balance text-2xl font-medium text-secondary md:text-4xl lg:text-5xl">
              Shop online, earn money. It's that simple to put cashback in your
              pocket.
            </h1>
            {/* <Button className="bg-primary rounded-3xl py-6 px-9 text-xl">
              Register - 10$ gifted*
            </Button> */}
            <EarlyAccess />
          </div>

          <div className="flex justify-center items-center overflow-hidden rounded-2xl">
            <picture>
              <source srcSet="/hero2.png" height={316} width={442} />
              <Image
                src="/hero.png"
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
