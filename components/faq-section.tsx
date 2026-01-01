"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What is cashback?",
    answer:
      "Cashback is a rewards program that lets you get back a portion of the money spent on your online purchases. It is a delayed discount that is returned to you after your purchase is confirmed.",
  },
  {
    question: "How does cashback work between Wiqi and merchant sites?",
    answer:
      "Wiqi negotiates commissions with partner merchants. When you make a purchase through Wiqi, we receive a commission which we share with you as cashback.",
  },
  {
    question: "How does Wiqi's cashback service work?",
    answer:
      "Sign up for free, enable cashback for the merchant of your choice via our website or browser extension, and then shop as usual. Cashback is automatically credited to your account after the purchase is validated.",
  },
  {
    question: "Are Wiqi's negotiated cashback offers free?",
    answer:
      "Yes — signing up and using Wiqi is completely free. You never pay fees to receive cashback on your purchases.",
  },
  {
    question: "How do I sign up and take advantage of Wiqi promotions?",
    answer:
      "Signing up is quick: create an account with your email, install the Chrome extension to enable cashback automatically, and start shopping with over 1,500 partner merchants.",
  },
  {
    question: "How do I activate cashback when shopping online?",
    answer:
      "With the Wiqi extension installed, cashback activates automatically when you visit a partner site. You can also activate cashback manually on our website before checking out.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <h2 className="text-xl sm:text-4xl lg:text-5xl font-bold mb-12 sm:text-balance">
          Everything you need to know about our cashback offers
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center cursor-pointer justify-between p-6 text-left transition-colors hover:bg-gray-50"
              >
                <span className="font-semibold text-lg md:text-xl lg:text-2xl pr-8 text-balance">
                  {faq.question}
                </span>
                <Plus
                  className={`shrink-0 w-6 h-6 text-gray-400 transition-transform ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 font-normal text-xs leading-5">
          *Note: Cashback amounts are credited after the merchant confirms the
          purchase. Processing times vary by merchant and may take several days.
          Some purchases (for example, gift cards or certain promotional
          categories) may be excluded from cashback.
        </div>
        <div className="mt-6 text-xs leading-5">
          **Important: Cashback eligibility and merchant terms apply. Wiqi
          reserves the right to modify or remove offers. For full details,
          please consult our Terms of Use.
        </div>
      </div>
    </section>
  );
}
