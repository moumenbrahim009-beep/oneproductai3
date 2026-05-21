"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import FadeIn from "./ui/FadeIn";
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
    <section
      id="faq"
      className="relative bg-[#08080d] px-6 py-24 md:px-8 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <FadeIn>
            <SectionLabel>Questions</SectionLabel>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
              Things people ask.
            </h2>
          </FadeIn>
        </div>

        <FadeIn delay={0.1} className="mt-14">
          <div className="divide-y divide-border-subtle border-y border-border-subtle">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-lg font-medium text-text-primary">
                      {faq.q}
                    </span>
                    <Plus
                      className={`h-5 w-5 shrink-0 text-text-tertiary transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
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
                        <p className="pb-5 pr-9 leading-relaxed text-text-secondary">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
