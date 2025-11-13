"use client"

import { X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-primary px-6 py-2.5 text-center text-sm text-primary-foreground">
      <p className="font-medium">
        Special Offer: Get 50% off on your first month's rent! Use code: <span className="font-bold">FIRST50</span>
      </p>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 size-7 -translate-y-1/2 hover:bg-primary-foreground/10"
        onClick={() => setIsVisible(false)}
      >
        <X className="size-4" />
      </Button>
    </div>
  )
}
