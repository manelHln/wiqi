"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PropertyCardProps {
  image: string;
  title: string;
  cashback: string;
}

export function PropertyCard({ image, title, cashback }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden transition-all cursor-pointer p-0">
      <CardHeader className="p-0 relative">
        <img
          src={"/image.png"}
          alt={title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 max-h-[150px]"
        />
        <div className="h-[75px] w-[150px] absolute bg-white left-0 right-0 -bottom-10 border border-gray-300 rounded-lg z-10 mx-auto flex justify-center items-center">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="max-w-full max-h-full"
        />
        </div>
      </CardHeader>
      <CardContent className="px-6 pt-10 flex flex-col items-center">
        <h3 className="mb-2 text-center text-sm font-semibold text-foreground">
          {title}
        </h3>
        <div className="mb-4 text-sm text-muted-foreground">
          <span className="text-primary font-semibold text-center">{cashback}</span>
        </div>
        <Button className="bg-secondary text-white rounded-3xl">
          Show code
        </Button>
        <div className="flex justify-center my-4">
          <span className="text-muted-foreground text-xs text-center">Valid until 10/11/2025 . Sponsorisé</span>
        </div>
      </CardContent>
    </Card>
  );
}
