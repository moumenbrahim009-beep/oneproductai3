"use client";

import { BookOpen, Bot, FileText, CheckCircle } from "lucide-react";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import SectionLabel from "./ui/SectionLabel";

const cards = [
  {
    Icon: BookOpen,
    title: "The Complete Protocol",
    body: "17 pages covering every day of the 14-day launch. Each page tells you exactly what to do and what “done” looks like.",
  },
  {
    Icon: Bot,
    title: "Your AI Coach Prompt",
    body: "A pre-built prompt you load into free Claude or ChatGPT. It knows the protocol and guides you through each phase like a senior operator.",
  },
  {
    Icon: FileText,
    title: "Templates for Each Phase",
    body: "Audience profile, validation scripts, launch outreach, refund handling. No blank pages. Start from a structure that works.",
  },
  {
    Icon: CheckCircle,
    title: "Done/Not-Done Criteria",
    body: "Every day has a binary completion check. No “I think I’m done.” Either you meet the criteria or you don’t.",
  },
];

export default function WhatYouGet() {
  return (
    <section
      id="what-you-get"
      className="relative scroll-mt-24 px-6 py-28 md:px-8 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel>Included</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Everything you need.{" "}
              <span className="text-gradient">Nothing you don’t.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <TiltCard className="glass border-glow flex h-full flex-col rounded-3xl p-7">
                <div className="flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet via-indigo to-cyan shadow-[0_8px_24px_-8px_rgba(139,92,246,0.9)]">
                    <Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                  </div>
                  <span className="font-display text-sm font-bold text-ink-faint">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-extrabold text-ink">
                  {title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{body}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 text-center text-sm uppercase tracking-wide text-ink-faint">
            Delivered as a Notion portal. Lifetime access. One-time payment.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
