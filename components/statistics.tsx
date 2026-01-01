"use client";

import { Button } from "./ui/button";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "motion/react";
import { useEffect, useRef } from "react";
import EarlyAccess from "./early-access";

function Counter({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    Math.round(latest).toLocaleString("fr-FR")
  );
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: "easeOut",
      });

      return controls.stop;
    }
  }, [motionValue, value, duration, isInView]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function Statistics() {
  return (
    <section className="py-16 md:py-24 flex flex-col items-center bg-white">
      <h2 className="text-xl md:text-2xl lg:text-3xl text-secondary font-semibold mb-6 text-center px-6">
        What are you waiting for? Try Wiqi cashback and earn money on all your
        purchases!
      </h2>
      <div className="container mx-auto px-6 mb-6">
        <div className="grid gap-8 md:grid-cols-3">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="mb-2 text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
              <Counter value={1000} duration={2.5} />
            </p>
            <p className="text-secondary text-xs md:text-sm lg:text-base">
              people are already using it!
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="mb-2 text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
              <span className="text-sm md:text-base">+DE</span>{" "}
              <Counter value={20} duration={2} />
              K$
            </p>
            <p className="text-secondary text-xs md:text-sm lg:text-base">
              in cashback paid out to our members
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="mb-2 text-3xl font-bold text-primary md:text-4xl lg:text-5xl">
              <Counter value={1500} duration={2} />
            </p>
            <p className="text-secondary text-xs md:text-sm lg:text-base">
              partner merchants
            </p>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="pt-6 px-6"
      >
        <EarlyAccess />
      </motion.div>
    </section>
  );
}
