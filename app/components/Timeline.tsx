"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "./ui/FadeIn";
import SectionLabel from "./ui/SectionLabel";

const days = [
  "Define the audience",
  "Define the problem",
  "Direct validation",
  "Decide",
  "Build core, part 1",
  "Build core, part 2",
  "Complete the product, part 1",
  "Complete the product, part 2",
  "Make it buyable",
  "Connect and test, part 1",
  "Connect and test, part 2",
  "Soft outreach, part 1",
  "Soft outreach, part 2",
  "Launch",
];

export default function Timeline() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative bg-[#08080d] px-6 py-24 md:px-8 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <SectionLabel>The Path</SectionLabel>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
              Day by day. No guesswork.
            </h2>
          </FadeIn>
        </div>

        {/* Desktop: horizontal */}
        <FadeIn className="mt-20 hidden lg:block" delay={0.1}>
          <div className="relative">
            <div className="timeline-line absolute left-0 right-0 top-3 h-px" />
            <div className="relative flex justify-between">
              {days.map((objective, i) => (
                <div
                  key={i}
                  className="group flex flex-1 flex-col items-center"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                >
                  <span
                    className={`h-3 w-3 rounded-full ring-4 ring-[#08080d] transition-all duration-300 ${
                      active === i
                        ? "gradient-bg scale-125"
                        : "bg-border-strong group-hover:bg-accent-purple"
                    }`}
                  />
                  <span className="mt-4 text-xs font-semibold text-text-tertiary">
                    Day {i + 1}
                  </span>
                  <span
                    className={`mt-2 max-w-[7rem] text-center text-xs leading-snug transition-opacity duration-300 ${
                      active === i
                        ? "text-text-secondary opacity-100"
                        : "text-text-tertiary opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {objective}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Mobile / tablet: vertical */}
        <div className="relative mt-14 lg:hidden">
          <div className="timeline-line absolute bottom-0 left-[5px] top-0 w-px" />
          <div className="space-y-6">
            {days.map((objective, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative flex items-start gap-5 pl-1"
              >
                <span className="gradient-bg mt-1.5 h-3 w-3 shrink-0 rounded-full ring-4 ring-[#08080d]" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">
                    Day {i + 1}
                  </div>
                  <div className="mt-1 text-text-primary">{objective}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <FadeIn delay={0.1}>
          <p className="mx-auto mt-16 max-w-2xl text-center text-lg text-text-secondary">
            The timeline ends. Your product begins.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
