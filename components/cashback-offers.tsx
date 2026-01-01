"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import CashbackCard from "./cashback-card";
import { Button } from "./ui/button";

export default function CashbackOffers() {
  const [activeTab, setActiveTab] = useState("Et aussi");

  const tabs = ["Voyage", "Maison & High-Tech", "Mode", "Beauté", "Et aussi"];

  const offers = {
    "Et aussi": [
      {
        id: 1,
        logo: "Amazon",
        cashback: { value: "33", suffix: "%" },
        extraInfo: "instead of 10€",
        sponsored: true,
      },
      {
        id: 2,
        logo: "Costco",
        cashback: { value: "8,3", suffix: "%" },
        sponsored: true,
      },
      {
        id: 4,
        logo: "Temu",
        cashback: { value: "1,8", suffix: "%" },
        sponsored: true,
      },
      {
        id: 5,
        logo: "Zulilly",
        cashback: { value: "7", suffix: "€" },
        extraInfo: "instead of 5€",
        sponsored: true,
        hasIcon: true,
      },
      {
        id: 6,
        logo: "Newegg",
        cashback: { value: "4,5", suffix: "%" },
        extraInfo: "instead of 3,25%",
        sponsored: true,
        hasIcon: true,
      },
    ],
  };

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="max-w-7xl bg-primary/20 mx-auto px-6 sm:px-24 py-6 md:py-20 sm:rounded-2xl">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold">
          1,526 offers from partner merchants with discounts
        </h2>
        <p className="text-center font-semibold text-xl md:text-2xl lg:text-3xl py-4">
          Order after order, earn an average of €120/year**
        </p>
        <div className="flex justify-center text-center mb-8">
          <Button
            variant="ghost"
            className="text-secondary hover:bg-gray-100 hover:text-secondary cursor-pointer rounded-3xl text-lg flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3a7 7 0 100 14 7 7 0 000-14zM9 9h2v5H9V9zm0-3h2v2H9V6z" />
            </svg>
            Classement des offres
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full font-medium transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {offers[activeTab]?.map((offer, index) => (
              <CashbackCard
                key={offer.id}
                logo={offer.logo}
                cashback={offer.cashback}
                sponsored={offer.sponsored}
                extraInfo={offer.extraInfo}
                delay={index * 0.1}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
