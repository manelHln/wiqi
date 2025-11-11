"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { useState } from "react"

export function NewsletterCTA() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && email.includes("@")) {
      setMessage("Thank you for subscribing!")
      setEmail("")
    } else {
      setMessage("Please enter a valid email address")
    }

    setIsLoading(false)
  }

  return (
    <section className="bg-gradient-to-r from-primary to-primary/80 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <Mail className="mx-auto mb-4 size-12 text-primary-foreground" />
          <h2 className="mb-4 text-balance text-3xl font-bold text-primary-foreground md:text-4xl">
            Stay Updated with Latest Listings
          </h2>
          <p className="mb-8 text-pretty text-lg text-primary-foreground/90">
            Subscribe to our newsletter and get notified about new properties and exclusive deals
          </p>
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 flex-1 border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60"
              required
            />
            <Button type="submit" size="lg" variant="secondary" className="h-12 px-8" disabled={isLoading}>
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          {message && <p className="mt-4 text-sm text-primary-foreground">{message}</p>}
        </div>
      </div>
    </section>
  )
}
