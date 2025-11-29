"use client";

import { useState } from "react";
import {
  Search,
  HelpCircle,
  ShoppingCart,
  Plug,
  Wallet,
  CreditCard,
  Store,
  Settings,
  Users,
  Ticket,
  Smartphone,
  ShoppingBag,
  User,
  Gift,
  Lock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const iconMap: Record<string, any> = {
  HelpCircle,
  ShoppingCart,
  Plug,
  Wallet,
  CreditCard,
  Store,
  Settings,
  Users,
  Ticket,
  Smartphone,
  ShoppingBag,
  User,
  Gift,
  Lock,
};

const faqCategories = [
  {
    id: "general-questions",
    title: "GENERAL QUESTIONS",
    count: 74,
    icon: "HelpCircle",
    questions: [
      "Why doesn't my earning appear on my account?",
      "Why did my earning disappear from my account?",
      "Why was my earning confirmed and then rejected?",
      "Why was my earning confirmed and then modified? (lower amount, quantity...)",
      "Why is my order not at the net price purchased from the merchant?",
      "Why is my earning not calculated on the total amount of my order?",
    ],
  },
  {
    id: "purchase-process",
    title: "PURCHASE PROCESS",
    count: 8,
    icon: "ShoppingCart",
    questions: [
      "How to buy on the Wiqi website?",
      "What amounts can I earn on my purchases?",
      "When will I receive my earning?",
    ],
  },
  {
    id: "wiqi-extension",
    title: "THE WIQI EXTENSION",
    count: 10,
    icon: "Plug",
    questions: [
      "How to install the Wiqi extension on Chrome, Firefox, Edge or Safari?",
      "How to use the Wiqi extension in my browser?",
    ],
  },
  {
    id: "cashback-earnings",
    title: "CASHBACK EARNINGS",
    count: 9,
    icon: "Wallet",
    questions: [
      "How to see the exact amount of earnings on a merchant?",
      "How is the amount of cashback available on each merchant defined?",
    ],
  },
  {
    id: "payment-earnings",
    title: "PAYMENT OF MY EARNINGS",
    count: 5,
    icon: "CreditCard",
    questions: [
      "How to request a payment of my earnings on the Wiqi website?",
      "When will the payment I requested on the Wiqi website be paid?",
    ],
  },
  {
    id: "brands",
    title: "BRANDS",
    count: 6,
    icon: "Store",
    questions: [
      "How to write a review on a merchant and how much can I earn?",
      "How to share promo codes on Wiqi?",
    ],
  },
  {
    id: "technical-problems",
    title: "TECHNICAL PROBLEMS",
    count: 10,
    icon: "Settings",
    questions: [
      "What are cookies and how do I enable them on my browser?",
      "What are the recommended browsers and configurations for Wiqi?",
    ],
  },
  {
    id: "referral",
    title: "REFERRAL",
    count: 4,
    icon: "Users",
    questions: [
      "What is referral on Wiqi?",
      "What are the conditions for a Wiqi referral to be validated?",
    ],
  },
  {
    id: "printable-coupons",
    title: "PRINTABLE COUPONS",
    count: 17,
    icon: "Ticket",
    questions: [
      "What is the Wiqi printable coupon system?",
      "How many times can I print each coupon?",
    ],
  },
  {
    id: "mobile-applications",
    title: "MOBILE APPLICATIONS",
    count: 8,
    icon: "Smartphone",
    questions: [
      "How to download the Wiqi application?",
      "Can I earn from merchants on the application?",
    ],
  },
  {
    id: "wiqi-market",
    title: "WIQI MARKET APPLICATION",
    count: 10,
    icon: "ShoppingBag",
    questions: ["What is Wiqi Market?", "Can we buy on Wiqi Market?"],
  },
  {
    id: "my-account",
    title: "MY ACCOUNT",
    count: 13,
    icon: "User",
    questions: [
      "How to log in to the Wiqi website, how to create a personal account?",
      "How to recover my password?",
    ],
  },
  {
    id: "cashback-gift-cards",
    title: "CASHBACK ON GIFT CARDS",
    count: 14,
    icon: "Gift",
    questions: [
      "What are gift cards?",
      "How long is the amount valid?",
      "I bought a gift card on the Wiqi website, when will I receive it?",
    ],
  },
  {
    id: "privacy",
    title: "PRIVACY",
    count: 5,
    icon: "Lock",
    questions: [
      "Is Wiqi a reliable website?",
      "What does Wiqi do with my personal data?",
    ],
  },
];

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8" data-testid="text-page-title">
          Your questions, our answers
        </h1>

        <div className="mb-8 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary/70" />
            <Input
              placeholder="Search"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-faq"
            />
          </div>
          <Button
            className="bg-accent hover:bg-accent/90 text-white"
            data-testid="button-search-faq"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-lg mb-1">
                Wiqi is expanding...
              </h2>
              <p className="text-sm opacity-90">
                to merchants outside France with Wiqi Cashback.
              </p>
            </div>
            <Button
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-white/90"
              data-testid="button-learn-more"
            >
              Follow us
            </Button>
          </CardContent>
        </Card>

        <h2 className="text-xl font-semibold mb-6">
          The 5 most frequently asked questions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {faqCategories.slice(0, 14).map((category, idx) => {
            const IconComponent = iconMap[category.icon];
            return (
              <Card
                key={category.id}
                className="hover-elevate"
                data-testid={`card-category-${category.id}`}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    {IconComponent && (
                      <IconComponent className="h-5 w-5 text-primary" />
                    )}
                    {category.title} ({category.count})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {category.questions.slice(0, 3).map((question, qIdx) => (
                    <p key={qIdx} className="text-sm text-secondary/70">
                      • {question}
                    </p>
                  ))}
                  <Button
                    className="mt-4 bg-accent hover:bg-accent/90 text-white w-full"
                    size="sm"
                    data-testid={`button-voir-plus-${category.id}`}
                  >
                    See more
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Didn't find an answer to your question?
          </h2>
          <p className="text-secondary/70 mb-4">
            Contact our Customer Service via our contact form
          </p>
        </div>
      </div>
    </div>
  );
}
