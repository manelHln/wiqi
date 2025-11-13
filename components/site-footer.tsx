"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"
import Image from "next/image"

export function SiteFooter() {
  const [email, setEmail] = useState("")

  return (
    <footer className="pt-12 px-6">
      <div className="container bg-white mx-auto px-10 py-12 md:py-16 shadow-sm rounded-2xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          <div>
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
            <p className="my-6 text-sm text-muted-foreground">
              Earn money while shopping online.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="flex size-9 items-center justify-center rounded-full bg-card text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="size-4" />
              </Link>
              <Link
                href="#"
                className="flex size-9 items-center justify-center rounded-full bg-card text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Twitter className="size-4" />
              </Link>
              <Link
                href="#"
                className="flex size-9 items-center justify-center rounded-full bg-card text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="size-4" />
              </Link>
              <Link
                href="#"
                className="flex size-9 items-center justify-center rounded-full bg-card text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Linkedin className="size-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-secondary">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-secondary transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-secondary transition-colors hover:text-foreground">
                  Properties for Rent
                </Link>
              </li>
              <li>
                <Link href="#" className="text-secondary transition-colors hover:text-foreground">
                  Properties for Sale
                </Link>
              </li>
              <li>
                <Link href="#" className="text-secondary transition-colors hover:text-foreground">
                  Find an Agent
                </Link>
              </li>
              <li>
                <Link href="#" className="text-secondary transition-colors hover:text-foreground">
                  List Your Property
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-secondary">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-secondary transition-colors hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-secondary transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-secondary transition-colors hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-secondary transition-colors hover:text-foreground">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-secondary transition-colors hover:text-foreground">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-secondary">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-secondary">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>
                  123 Main Street, Suite 100
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-2 text-secondary">
                <Phone className="size-4 shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-secondary">
                <Mail className="size-4 shrink-0" />
                <span>support@homenest.com</span>
              </li>
            </ul>
            {/* <div className="mt-6">
              <p className="mb-3 text-sm font-medium text-foreground">Stay Updated</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-9 text-sm"
                />
                <Button size="sm" className="shrink-0">
                  Join
                </Button>
              </div>
            </div> */}
          </div>
        </div>

      </div>
    </footer>
  )
}
