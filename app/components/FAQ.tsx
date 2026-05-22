"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionLabel from "./ui/SectionLabel";

const faqs = [
  {
    q: "How much time does this take per day?",
    a: "1 to 2 hours, depending on the day. Some days are intense (validation calls). Some are short (decision days). The total time investment over 14 days is roughly 20 hours.",
  },
  {
    q: "Do I need a product idea before I start?",
    a: "No. Phase 1 helps you define the audience and problem first. The idea emerges from that work.",
  },
  {
    q: "What if I miss a day?",
    a: "The protocol is flexible. You can take a 14-day calendar period or stretch it to 21. What matters is following the sequence, not the calendar.",
  },
  {
    q: "Do I need a website or technical skills?",
    a: "No. The protocol uses simple no-code tools (Gumroad, Payhip, Notion). If you can type and click, you can ship.",
  },
  {
    q: "What kind of product will I launch?",
    a: "One of three formats: a PDF guide, a template pack, or a prompt pack. The protocol helps you choose the right format for your audience in Phase 1.",
  },
  {
    q: "Will this work outside the US?",
    a: "The protocol works anywhere. Most examples use US audiences because of market size, but the structure applies to any English-speaking market.",
  },
  {
    q: "What if I already have a product I’m trying to launch?",
    a: "The protocol is designed for first products. If you already have one in progress, you can use Phases 2 and 3 to validate and launch it — but you’ll get most value from running the full 14 days on a new product.",
  },
  {
    q: "Is there a community?",
    a: "Not yet. This is a self-contained protocol. The AI Coach is your guide. We may add a community later, but the product is designed to work without one.",
  },
  {
    q: "Can I share my access with someone else?",
    a: "The portal is for personal use. If a partner or co-founder wants to use it, please purchase a second copy.",
  },
  {
    q: "How do I get the product after I pay?",
    a: "Immediately after payment, you receive an email with access to the Notion portal. You’re in within 60 seconds.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 px-6 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <Reveal>
            <SectionLabel>Questions</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Things people ask.
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-14">
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen
                      ? "glass border-violet/30"
                      : "border-white/8 bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-display font-bold text-ink">
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 bg-gradient-to-br from-violet to-cyan"
                          : "bg-white/5"
                      }`}
                    >
                      <Plus
                        className={`h-4 w-4 ${isOpen ? "text-white" : "text-ink-muted"}`}
                        strokeWidth={3}
                      />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 leading-relaxed text-ink-muted">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
