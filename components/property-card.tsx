"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Square, Heart, MapPin, Star } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  image: string;
  title: string;
  cashback: string;
}

export function PropertyCard({ image, title, cashback }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden transition-all cursor-pointer p-0">
      <CardHeader className="p-0 relative overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 h-[100px]"
        />
        <img
          src="/modern-luxury-apartment-exterior.jpg"
          alt={title}
          loading="lazy"
          className="h-[75px] w-[150px] absolute left-0 right-0 -bottom-10 mx-auto"
        />
      </CardHeader>
      <CardContent className="px-2 flex flex-col items-center">
        <h3 className="mb-2 text-center text-sm font-semibold text-foreground">
          {title}
        </h3>
        <div className="mb-4 text-sm text-muted-foreground">
          <span className="text-primary font-semibold text-center">{cashback}</span>
        </div>
        <Button className="bg-secondary text-white rounded-3xl">
          Afficher le code
        </Button>
        <div className="flex justify-center my-4">
          <span className="text-muted-foreground text-xs text-center">Valide jusqu'au 10/11/2025 . Sponsorisé</span>
        </div>
      </CardContent>
    </Card>
  );
}
