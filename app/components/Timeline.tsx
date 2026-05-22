"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Reveal from "./ui/Reveal";
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
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: dProg } = useScroll({
    target: desktopRef,
    offset: ["start 0.75", "end 0.5"],
  });
  const { scrollYProgress: mProg } = useScroll({
    target: mobileRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const fillX = useTransform(dProg, [0, 1], [0, 1]);
  const fillY = useTransform(mProg, [0, 1], [0, 1]);

  const [dCount, setDCount] = useState(0);
  const [mCount, setMCount] = useState(0);
  useMotionValueEvent(dProg, "change", (v) =>
    setDCount(Math.round(v * days.length)),
  );
  useMotionValueEvent(mProg, "change", (v) =>
    setMCount(Math.round(v * days.length)),
  );

  return (
    <section className="relative px-6 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel>The Path</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Day by day. <span className="text-gradient">No guesswork.</span>
            </h2>
          </Reveal>
        </div>

        {/* Desktop: horizontal */}
        <div ref={desktopRef} className="mt-24 hidden lg:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-2 h-0.5 bg-white/10" />
            <motion.div
              style={{ scaleX: fillX }}
              className="absolute left-0 right-0 top-2 h-0.5 origin-left bg-gradient-to-r from-violet via-indigo to-cyan"
            />
            <div className="relative flex justify-between">
              {days.map((objective, i) => {
                const lit = i < dCount;
                return (
                  <div
                    key={i}
                    className="group flex flex-1 flex-col items-center"
                  >
                    <span
                      className={`h-4 w-4 rounded-full border transition-all duration-300 ${
                        lit
                          ? "scale-110 border-transparent bg-gradient-to-br from-violet to-cyan shadow-[0_0_14px_rgba(139,92,246,0.9)]"
                          : "border-white/20 bg-base"
                      }`}
                    />
                    <span
                      className={`mt-4 text-[11px] font-semibold uppercase tracking-wide transition-colors duration-300 ${
                        lit ? "text-ink-muted" : "text-ink-faint"
                      }`}
                    >
                      Day {i + 1}
                    </span>
                    <span
                      className={`mt-2 max-w-[7rem] text-center text-xs leading-snug transition-all duration-300 ${
                        lit
                          ? "text-ink opacity-100"
                          : "text-ink-faint opacity-50 group-hover:opacity-100"
                      }`}
                    >
                      {objective}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile / tablet: vertical */}
        <div ref={mobileRef} className="relative mt-14 lg:hidden">
          <div className="absolute bottom-0 left-[7px] top-0 w-0.5 bg-white/10" />
          <motion.div
            style={{ scaleY: fillY }}
            className="absolute bottom-0 left-[7px] top-0 w-0.5 origin-top bg-gradient-to-b from-violet via-indigo to-cyan"
          />
          <div className="space-y-6">
            {days.map((objective, i) => {
              const lit = i < mCount;
              return (
                <div key={i} className="relative flex items-start gap-5">
                  <span
                    className={`mt-1 h-4 w-4 shrink-0 rounded-full border transition-all duration-300 ${
                      lit
                        ? "border-transparent bg-gradient-to-br from-violet to-cyan shadow-[0_0_12px_rgba(139,92,246,0.9)]"
                        : "border-white/20 bg-base"
                    }`}
                  />
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-ink-faint">
                      Day {i + 1}
                    </div>
                    <div
                      className={`mt-1 transition-colors duration-300 ${
                        lit ? "text-ink" : "text-ink-muted"
                      }`}
                    >
                      {objective}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-16 max-w-2xl text-center font-display text-xl font-bold text-ink">
            The timeline ends. Your product begins.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
