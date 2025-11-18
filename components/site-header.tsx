"use client";

import { useState, Activity } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Search, User, X } from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input";
import Image from "next/image";
import LoginDrawer from "./login-drawer";

export function SiteHeader() {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          {/* Mobile Layout */}
          <div className="flex w-full items-center justify-between md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="size-5" />
            </Button>

            {isMobileSearchOpen ? (
              <div className="border-t border-border bg-background px-6 py-3 md:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-10 rounded-3xl"
                    autoFocus
                  />
                  <Button variant="ghost" className="bg-gray-200 h-8 w-8 p-2 flex justify-center items-center absolute right-3 top-1/2 size-5 -translate-y-1/2 rounded-full" onClick={() => setIsMobileSearchOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <Link href="/" className="flex items-center">
                <Image
                  src="/shopping-bag.png"
                  alt="Wiqi Logo"
                  width={26}
                  height={26}
                />
                <span className="ml-1 font-bold text-2xl text-secondary">
                  Wi
                </span>
                <span className="font-bold text-2xl text-primary">qi</span>
              </Link>
            )}

            <div className="flex items-center gap-2">
              <Activity mode={isMobileSearchOpen ? "hidden" : "visible"}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                >
                  <Search className="size-5" />
                </Button>
              </Activity>
              <LoginDrawer />
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center gap-8">
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

          <div className="hidden md:flex items-center gap-4">
            <LoginDrawer />
            <Button className="text-sm rounded-3xl cursor-pointer">
              <Link href='/auth/register'>Register</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Desktop Navigation */}
      <div className="hidden md:block border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <nav className="flex items-center gap-6">
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
              Gift vouchers
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Today's selections
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Printable coupons
            </Link>
            <Button className="text-sm rounded-3xl">
              <Link href="#">Black November</Link>
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed left-0 top-0 z-50 h-full w-64 bg-background shadow-lg md:hidden">
            <div className="flex items-center justify-between border-b border-border p-4">
              <Link href="/" className="flex items-center">
                <Image
                  src="/shopping-bag.png"
                  alt="Wiqi Logo"
                  width={26}
                  height={26}
                />
                <span className="ml-1 font-bold text-2xl text-secondary">
                  Wi
                </span>
                <span className="font-bold text-2xl text-primary">qi</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>

            <nav className="flex flex-col gap-1 p-4">
              <Link
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                Cashback
              </Link>
              <Link
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                Top codes promo
              </Link>
              <Link
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                Bons d'achat
              </Link>
              <Link
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                Sélections du jour
              </Link>
              <Link
                href="#"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                Coupons á imprimer
              </Link>
              <Button className="mt-4 text-sm rounded-3xl">
                <Link href="#">Black November</Link>
              </Button>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
