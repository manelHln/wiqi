"use client"

import * as React from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { LoginForm } from "./login-form"
import { useIsMobile } from "@/hooks/use-mobile"
import { CircleUserRound } from "lucide-react"

export default function LoginDrawer() {
  const [open, setOpen] = React.useState(false)
  const isMobile = useIsMobile()

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        {
          isMobile ? (<Button variant="ghost" size='icon' className="text-sm hover:bg-gray-100 hover:text-secondary cursor-pointer"><CircleUserRound className="size-5" /></Button>):(<Button variant="ghost" className="text-sm hover:bg-gray-100 hover:text-secondary cursor-pointer">Login</Button>)
        }
      </DrawerTrigger>
      <DrawerContent className="p-4 md:p-8 bg-white rounded-tl-2xl rounded-bl-2xl">
        <DrawerHeader><DrawerTitle className="text-secondary text-center">Please enter your details to login.</DrawerTitle></DrawerHeader>
        <LoginForm />
      </DrawerContent>
    </Drawer>
  )
}
