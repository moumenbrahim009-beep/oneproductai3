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
    <section className="relative border-t-2 border-ink px-6 py-24 md:px-8 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <SectionLabel>The Path</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Day by day. No guesswork.
            </h2>
          </FadeIn>
        </div>

        {/* Desktop: horizontal */}
        <FadeIn className="mt-20 hidden lg:block" delay={0.1}>
          <div className="relative">
            <div className="absolute left-0 right-0 top-2 h-0.5 bg-ink" />
            <div className="relative flex justify-between">
              {days.map((objective, i) => (
                <div
                  key={i}
                  className="group flex flex-1 flex-col items-center"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                >
                  <span
                    className={`h-4 w-4 border-2 border-ink transition-all duration-200 ${
                      active === i
                        ? "scale-125 bg-flare"
                        : "bg-card group-hover:bg-flare"
                    }`}
                  />
                  <span className="mt-4 font-mono text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                    Day {i + 1}
                  </span>
                  <span
                    className={`mt-2 max-w-[7rem] text-center text-xs font-medium leading-snug transition-opacity duration-200 ${
                      active === i
                        ? "text-ink opacity-100"
                        : "text-ink-soft opacity-0 group-hover:opacity-100"
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
          <div className="absolute bottom-0 left-[7px] top-0 w-0.5 bg-ink" />
          <div className="space-y-6">
            {days.map((objective, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative flex items-start gap-5"
              >
                <span className="mt-1 h-4 w-4 shrink-0 border-2 border-ink bg-flare" />
                <div>
                  <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-faint">
                    Day {i + 1}
                  </div>
                  <div className="mt-1 font-medium text-ink">{objective}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <FadeIn delay={0.1}>
          <p className="mx-auto mt-16 max-w-2xl text-center font-display text-xl font-bold text-ink">
            The timeline ends. Your product begins.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
