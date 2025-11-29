"use client";

import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  CircleUserRound,
  PiggyBank,
  UserRound,
  UsersRound,
  Heart,
  Award,
  Bell,
  MessageCircleQuestion,
  MessageSquare,
  Power,
  CreditCard,
  MailQuestion,
} from "lucide-react";
import { useUser } from "@/hooks/use-user";
import LoginDrawer from "./login-drawer";
import { useEarnings } from "@/hooks/use-earnings";
import Link from "next/link";

const menuItems = [
  { icon: PiggyBank, label: "My earnings", href: "/account/earnings" },
  { icon: CreditCard, label: "My payments", href: "/account/payments" },
  { icon: CircleUserRound, label: "My profile", href: "/account/profile" },
  { icon: UsersRound, label: "Sponsorship", href: "/account/sponsorship" },
  { icon: Award, label: "My badges", href: "/account/badges" },
  { icon: Heart, label: "My favorites", href: "/account/favorites" },
  {
    icon: MessageCircleQuestion,
    label: "My reviews",
    href: "/account/reviews",
  },
  { icon: Bell, label: "My notifications", href: "/account/notifications" },
  { icon: MessageSquare, label: "Customer service", href: "/account/support" },
  { icon: MailQuestion, label: "FAQ", href: "/account/faqs" },
  { icon: Power, label: "Logout", href: "/account/logout" },
];

export default function UserProfileMenu() {
  const isMobile = useIsMobile();
  const { user, loading } = useUser();

  return (
    <>
      {user ? (
        isMobile ? (
          <UserProfileMobile />
        ) : (
          <UserProfileDesktop />
        )
      ) : (
        <div className="flex items-center gap-4">
          <LoginDrawer />
          <Button className="hidden md:block text-sm rounded-3xl cursor-pointer">
            <Link href="/auth/register">Register</Link>
          </Button>
        </div>
      )}
    </>
  );
}

const UserProfileDesktop = () => {
  const { user, loading } = useUser();
  const { earnings, isLoading: earningsLoading } = useEarnings();
  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="cursor-pointer rounded-full">
            {user?.user_metadata.first_name} :{" "}
            {((earnings?.available || 0) / 100).toFixed(2)} $
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuGroup className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <DropdownMenuItem key={item.label} className="cursor-pointer">
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon className="size-5 hover:text-white" />
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Link href="/account/notifications">
        <Bell className="size-5" />
      </Link>
    </div>
  );
};

const UserProfileMobile = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-sm hover:bg-gray-100 hover:text-secondary cursor-pointer"
        >
          <CircleUserRound className="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-4 md:p-8 bg-white rounded-tl-2xl rounded-bl-2xl">
        <DrawerHeader>
          <DrawerClose />
        </DrawerHeader>
        <div className="flex flex-col gap-8">
          {menuItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="flex items-center gap-2"
              onClick={() => setOpen(false)}
            >
              <item.icon className="size-5 hover:text-white" />
              {item.label}
            </Link>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
