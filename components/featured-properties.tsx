"use client";

import { PropertyCard } from "./property-card";
import { Button } from "./ui/button";

const properties = [
  {
    image: "/placeholder.svg?key=feat3",
    title: "Jusqu'à 100€ reversés en cash* sur votre 1er pari",
    cashback: "+ 60€ de cashback",
  },
  {
    image: "/placeholder.svg?key=feat4",
    title: "-15% sur une sélection de moniteurs Gaming Odyssey",
    cashback: "+ 3,5% de cashback",
  },
  {
    image: "/placeholder.svg?key=feat5",
    title: "-22% pour plus de 200€ d'achat",
    cashback: "+ 10% de cashback ",
  },
];

export function FeaturedProperties() {
  return (
    <section className="bg-white pb-8">
      <div className="max-w-7xl bg-primary/20 mx-auto px-6 sm:px-24 py-6 md:py-20 sm:rounded-2xl">
        <h2 className="mb-8 text-center text-lg font-bold text-secondary md:text-xl">
          Be smart, save more by combining discounts with cashback and promo codes!
        </h2>

        <div
          className="scrollbar-hide grid gap-6 md:grid-cols-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {properties.map((property, index) => (
            <div key={index} className="shrink-0">
              <PropertyCard {...property} />
            </div>
          ))}
        </div>
        <h3 className="text-secondary text-center text-xl my-12 font-bold">
          Want more discounts with promo codes from your favorite retailers?
        </h3>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5 ">
          <ul className="flex flex-col gap-1">
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Aliexpress"
                href="#"
              >
                Aliexpress
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Allopneus"
                href="#"
              >
                Allopneus
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Amazon"
                href="#"
              >
                Amazon
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Asos"
                href="#"
              >
                Asos
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Autodoc"
                href="#"
              >
                Autodoc
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Blancheporte"
                href="#"
              >
                Blancheporte
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Boticinal"
                href="#"
              >
                Boticinal
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Boulanger"
                href="#"
              >
                Boulanger
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Boursobank"
                href="#"
              >
                Boursobank
              </a>
            </li>
            
          </ul>

          <ul className="flex flex-col gap-1">
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Aliexpress"
                href="#"
              >
                Aliexpress
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Allopneus"
                href="#"
              >
                Allopneus
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Amazon"
                href="#"
              >
                Amazon
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Asos"
                href="#"
              >
                Asos
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Autodoc"
                href="#"
              >
                Autodoc
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Blancheporte"
                href="#"
              >
                Blancheporte
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Boticinal"
                href="#"
              >
                Boticinal
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Boulanger"
                href="#"
              >
                Boulanger
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Boursobank"
                href="#"
              >
                Boursobank
              </a>
            </li>
            
          </ul>

          <ul className="flex flex-col gap-1">
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Aliexpress"
                href="#"
              >
                Aliexpress
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Allopneus"
                href="#"
              >
                Allopneus
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Amazon"
                href="#"
              >
                Amazon
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Asos"
                href="#"
              >
                Asos
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Autodoc"
                href="#"
              >
                Autodoc
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Blancheporte"
                href="#"
              >
                Blancheporte
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Boticinal"
                href="#"
              >
                Boticinal
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Boulanger"
                href="#"
              >
                Boulanger
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Boursobank"
                href="#"
              >
                Boursobank
              </a>
            </li>
            
          </ul>

          <ul className="flex flex-col gap-1">
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Aliexpress"
                href="#"
              >
                Aliexpress
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Allopneus"
                href="#"
              >
                Allopneus
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Amazon"
                href="#"
              >
                Amazon
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Asos"
                href="#"
              >
                Asos
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Autodoc"
                href="#"
              >
                Autodoc
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Blancheporte"
                href="#"
              >
                Blancheporte
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Boticinal"
                href="#"
              >
                Boticinal
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Boulanger"
                href="#"
              >
                Boulanger
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Boursobank"
                href="#"
              >
                Boursobank
              </a>
            </li>
            
          </ul>

          <ul className="flex flex-col gap-1">
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Aliexpress"
                href="#"
              >
                Aliexpress
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Allopneus"
                href="#"
              >
                Allopneus
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Amazon"
                href="#"
              >
                Amazon
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Asos"
                href="#"
              >
                Asos
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Autodoc"
                href="#"
              >
                Autodoc
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Blancheporte"
                href="#"
              >
                Blancheporte
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Boticinal"
                href="#"
              >
                Boticinal
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Boulanger"
                href="#"
              >
                Boulanger
              </a>
            </li>
            <li className="text-secondary font-medium">
              <a
                title="Cashback et code promo Boursobank"
                href="#"
              >
                Boursobank
              </a>
            </li>
            
          </ul>
        </div>
        <div className="flex w-full justify-center mt-6">
          <Button className="bg-primary rounded-3xl text-white font-semibold text-lg tracking-widest cursor-pointer">
            Tous les codes promo
          </Button>
        </div>
      </div>
    </section>
  );
}
