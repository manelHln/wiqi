"use client";

import Image from "next/image";
import { motion } from "motion/react";

// Array of brand logos - replace with your actual logo paths
const brandLogos = [
  { name: "Abritel", logo: "/Abritel.jpeg" },
  { name: "Accorhotels", logo: "/Accorhotels-com.jpeg" },
  { name: "Asambeauty", logo: "/asambeauty.jpg" },
  { name: "Apple", logo: "/apple-icon.png" },
  { name: "Bazarchic", logo: "/BazarChic-com.jpeg" },
  { name: "Body et Fit", logo: "/body-et-fit.jpeg" },
  { name: "Busuu", logo: "/busuu.jpeg" },
  { name: "Cdiscount", logo: "/Cdiscount.jpeg" },
  { name: "Crocs", logo: "/Crocs.jpeg" },
  { name: "Electrolux", logo: "/electrolux.jpeg" },
  { name: "Fortuneo", logo: "/Fortuneo.jpeg" },
  { name: "Hotels.com", logo: "/hotels-com.jpeg" },
  { name: "Huawei", logo: "/huawei.jpeg" },
  { name: "Lastminute", logo: "/lastminute-com.jpeg" },
  { name: "LG", logo: "/lg.jpeg" },
  { name: "Marionnaud", logo: "/Marionnaud.jpeg" },
  { name: "Manomano", logo: "/manomano.jpeg" },
  { name: "Meta", logo: "/meta.jpeg" },
  { name: "Momcozy", logo: "/momcozy.jpeg" },
  { name: "NordVPN", logo: "/nordvpn.jpeg" },
  { name: "Parfumdreams", logo: "/parfumdreams.jpeg" },
  { name: "Protonmail", logo: "/proton-mail.jpeg" },
  { name: "Quitoque", logo: "/quitoque.jpeg" },
  { name: "SFR", logo: "/sfr-red-fai.jpeg" },
  { name: "Shein", logo: "/shein.jpeg" },
  { name: "Showroomprive", logo: "/showroomprive.jpeg" },
  { name: "Sixt", logo: "/Sixt.jpeg" },
  { name: "Smartbox", logo: "/Smartbox.jpeg" },
  { name: "Sephora", logo: "/Sephora.jpeg" },
  { name: "Aliexpress", logo: "/aliexpress.jpeg" },
  { name: "Agoda", logo: "/Agoda.jpeg" },
  { name: "iHerb", logo: "/iherb.jpeg" },
  { name: "Adidas", logo: "/adidas.jpeg" },
];

export function TrustedBrands() {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="px-6">
        <p className="mb-6 text-center font-bold text-2xl tracking-wider">
          More than 150 partner merchants
        </p>

        <div className="relative">
          {/* Slider with Framer Motion */}
          <motion.div
            className="flex"
            animate={{
              x: [0, -100 + "%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: Number(brandLogos.length * 1.5),
                ease: "linear",
              },
            }}
          >
            {/* First set of logos */}
            {brandLogos.map((brand, index) => (
              <motion.div
                key={`first-${index}`}
                className="shrink-0 mx-8"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain transition-all duration-300"
                />
              </motion.div>
            ))}
            {/* Duplicate set for seamless loop */}
            {brandLogos.map((brand, index) => (
              <motion.div
                key={`second-${index}`}
                className="shrink-0 mx-8"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}