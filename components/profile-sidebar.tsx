'use client';

import {
  CircleUserRound,
  PiggyBank,
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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

export default function ProfileSidebar() {
  const pathname = usePathname();
  return (
    <ul className="hidden md:flex flex-col gap-3">
      {menuItems.map((item) => (
        <li key={item.label} className={cn("px-2 py-2 rounded-md cursor-pointer hover:bg-primary hover:text-white transition-all", pathname === item.href && "bg-primary text-white")}>
          <Link
            href={item.href}
            className="flex items-center gap-2"
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
