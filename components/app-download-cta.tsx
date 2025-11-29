"use client";

import { Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "motion/react";
import EarlyAccess from "./early-access";

export function AppDownloadCTA() {
  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left Section - Extension Preview */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative shrink-0">
                <div className="w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px]">
                  <img
                    src="/extension.svg"
                    alt="wiqi extension"
                    className="w-full h-auto"
                  />
                </div>
                <motion.div
                  className="absolute -bottom-2 -right-2 sm:-bottom-2 sm:-right-3"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.5,
                  }}
                >
                  <Image
                    src="/chrome.png"
                    alt="chrome"
                    width={40}
                    height={40}
                    className="drop-shadow-lg sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px]"
                  />
                </motion.div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <p className="text-base sm:text-lg md:text-xl font-semibold leading-snug sm:leading-normal text-secondary mb-3 sm:mb-4">
                  With the wiqi extension, earn cashback in just one click.
                </p>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 sm:px-6 py-4 sm:py-5 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all w-full sm:w-auto">
                  Add to Chrome
                </Button>
              </div>
            </motion.div>

            {/* Right Section - Early Access */}
            <motion.div
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <EarlyAccess showTitle={true} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
