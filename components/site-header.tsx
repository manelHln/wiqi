"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import Image from "next/image";

export function SiteHeader() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/shopping-bag.png"
                alt="Wiqi Logo"
                width={26}
                height={26}
              />
              <span className="ml-1 font-bold text-2xl text-secondary">Wi</span>
              <span className="font-bold text-2xl text-primary">qi</span>
            </Link>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-10 min-w-lg rounded-3xl"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden text-sm md:inline-flex">
              Login
            </Button>
            <Button className="text-sm rounded-3xl">Register</Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="size-5" />
            </Button>
          </div>
        </div>
      </header>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Cashback
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Top codes promo
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Bons d'achat
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Sélections du jour
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Coupons á imprimer
          </Link>
          <Button className="text-sm rounded-3xl">
            <Link href="#">Black November</Link>
          </Button>

          <Link href="#"></Link>
        </nav>
      </div>
    </>
  );
}
