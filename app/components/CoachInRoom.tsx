"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import FadeIn from "./ui/FadeIn";
import GradientText from "./ui/GradientText";
import SectionLabel from "./ui/SectionLabel";

type Message = { role: "user" | "coach"; text: string };

type Conversation = {
  initial: string;
  name: string;
  status: string;
  messages: Message[];
  footer: string;
};

const conversations: Conversation[] = [
  {
    initial: "S",
    name: "Sarah · 34 · USA",
    status: "Day 0 · No idea",
    messages: [
      {
        role: "user",
        text: "I want to launch something but I have no idea what. Every time I try to pick, I freeze.",
      },
      {
        role: "coach",
        text: "Good. You're not stuck on the idea — you're stuck on the person. Forget the product for now. Tell me one type of human you understand better than most. A group you've been part of, or watched closely.",
      },
      {
        role: "user",
        text: "Working moms who feel guilty about screen time.",
      },
      {
        role: "coach",
        text: "That's a person. Now we have something. The product will come from their actual problem, not your guesses. Open Day 1 in your portal. We're going to define this audience properly — in 45 minutes, you'll have a profile sharper than most founders have after a year.",
      },
    ],
    footer: "From idea-less to idea-locked in 4 minutes.",
  },
  {
    initial: "M",
    name: "Mike · 28 · USA",
    status: "Day 0 · Has idea, no confidence",
    messages: [
      {
        role: "user",
        text: "I have an idea — a Notion template for freelance designers to track invoices. But what if no one wants it? I don't want to waste two weeks.",
      },
      {
        role: "coach",
        text: "You won't waste two weeks. You'll waste four days — maximum. That's the whole point of Phase 2.",
      },
      {
        role: "user",
        text: "What do I do in Phase 2?",
      },
      {
        role: "coach",
        text: 'You don\'t build. You ask. Five real conversations with freelance designers. We have a script for it. If three out of five say "I\'d pay for that today," you build. If they don\'t, you pivot — with their words guiding you. Either way, you\'re ahead. Open Day 3.',
      },
    ],
    footer: "From doubt to direction in one exchange.",
  },
  {
    initial: "A",
    name: "Alex · 31 · USA",
    status: "Day 3 · Stuck",
    messages: [
      {
        role: "user",
        text: "I'm supposed to do five validation calls today and I can't find anyone. I've posted in two groups and gotten nothing. I'm losing the day.",
      },
      {
        role: "coach",
        text: 'Stop posting. Posting is passive. We need active outreach. Open the validation outreach template in your portal — the second one, "Direct message script v2."',
      },
      {
        role: "user",
        text: "Ok, I have it open.",
      },
      {
        role: "coach",
        text: 'Send it to ten people in the next thirty minutes. Pick from anyone who\'s posted in your target community in the last week — even a small comment counts. Don\'t aim for five "yes" calls. Aim for ten messages sent. The calls will come from the messages. Report back when ten are out.',
      },
    ],
    footer: "Unstuck without losing the day.",
  },
];

export default function CoachInRoom() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [scrolledPast, setScrolledPast] = useState(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const progress = max > 0 ? el.scrollLeft / max : 0;
    setActive(Math.round(progress * (conversations.length - 1)));
    setScrolledPast(el.scrollLeft > 40);
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({
      left: card.offsetLeft - (el.clientWidth - card.clientWidth) / 2,
      behavior: "smooth",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToIndex(Math.min(active + 1, conversations.length - 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToIndex(Math.max(active - 1, 0));
    }
  };

  return (
    <section className="relative px-6 pb-24 pt-32 md:px-8 md:pb-32 md:pt-40 lg:pb-40 lg:pt-48">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <SectionLabel>The Coach</SectionLabel>
            <h2 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
              You&apos;re not alone with the protocol.
              <br />
              The Coach is <GradientText>in the room</GradientText>.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-xl font-medium text-text-secondary md:text-2xl">
              Three real moments. Three real people. Watch what happens when the
              protocol meets the human.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1} className="mt-16">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Coach conversations, scroll horizontally to read more"
            className="mx-auto flex max-w-5xl snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 py-4 [-webkit-overflow-scrolling:touch] [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [scrollbar-width:none] focus:outline-none motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
          >
            {conversations.map((c) => (
              <article
                key={c.initial}
                role="article"
                aria-label={`Conversation with ${c.name}, ${c.status}`}
                className="group min-w-[85%] shrink-0 snap-center rounded-3xl bg-gradient-to-br from-purple-500/40 to-blue-500/40 p-[1px] transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:min-w-[70%] lg:min-w-[65%]"
              >
                <div className="flex min-h-[480px] flex-col rounded-3xl bg-bg-secondary p-8 md:p-10">

                {/* Persona header */}
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <div className="gradient-bg flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white">
                      {c.initial}
                    </div>
                    <div>
                      <div className="text-base font-medium text-text-primary">
                        {c.name}
                      </div>
                      <div className="mt-0.5 text-sm uppercase tracking-wide text-text-tertiary">
                        {c.status}
                      </div>
                    </div>
                  </div>
                  <div className="gradient-bg mt-5 h-px w-full opacity-40" />
                </div>

                {/* Conversation */}
                <div className="relative mt-6 flex flex-col space-y-3">
                  {c.messages.map((m, i) =>
                    m.role === "user" ? (
                      <div key={i} className="flex justify-start">
                        <div className="max-w-[75%] rounded-2xl bg-bg-tertiary px-4 py-3 text-sm leading-relaxed text-text-primary">
                          {m.text}
                        </div>
                      </div>
                    ) : (
                      <div key={i} className="flex w-full flex-col items-end">
                        <span className="mb-1 mr-1 text-xs font-medium text-text-secondary">
                          OPA
                        </span>
                        <div className="max-w-[75%] break-words rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-blue-500/10 px-4 py-3 text-sm leading-relaxed text-text-primary">
                          {m.text}
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Footer line */}
                <p className="mt-auto w-full break-words pt-6 text-center text-sm italic text-text-tertiary">
                  &ldquo;{c.footer}&rdquo;
                </p>
                </div>
              </article>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="mt-6 flex justify-center gap-2.5">
            {conversations.map((c, i) => (
              <button
                key={c.initial}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to conversation ${i + 1}`}
                aria-current={active === i}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  active === i
                    ? "gradient-bg scale-110"
                    : "border border-border-strong"
                }`}
              />
            ))}
          </div>

          {/* Scroll affordance */}
          <div
            className={`mt-5 flex items-center justify-center gap-1.5 text-sm text-text-tertiary transition-opacity duration-300 ${
              scrolledPast ? "opacity-0" : "opacity-100"
            }`}
          >
            <span className="md:hidden">Swipe to read more conversations</span>
            <span className="hidden md:inline">
              Scroll horizontally to read more
            </span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mx-auto mt-20 max-w-3xl text-center text-2xl font-medium text-text-primary">
            This is what you get for $49. A protocol, plus a Coach who knows it.
          </p>
          <p className="mt-4 text-center text-base text-text-tertiary">
            Free Claude or ChatGPT. The Master Prompt. The 14 days. Done.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
