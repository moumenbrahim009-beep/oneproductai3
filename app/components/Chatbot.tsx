"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FadeIn from "./ui/FadeIn";
import SectionLabel from "./ui/SectionLabel";

type Message = { role: "bot" | "user"; text: string };

const intro =
  "Hey. I’m here to help you understand if One Product AI is right for you. Pick a question below — or ask anything.";

const qa: { q: string; a: string }[] = [
  {
    q: "Is this for me?",
    a: "If you have ideas you don’t ship, yes. The protocol is built specifically for people who get stuck in the loop. It removes the decisions that paralyze you and leaves only execution. You don’t need experience. You need 14 days.",
  },
  {
    q: "How is this different from a course?",
    a: "Courses teach. This executes. You won’t watch hours of video. You’ll do one task per day, check a completion box, and move forward. By Day 14, you have a product live. Most courses leave you with notes.",
  },
  {
    q: "What if I don’t have an idea yet?",
    a: "Phase 1 handles that. You start with a person, not an idea. You define who you want to serve, then you find what they actually struggle with. The “idea” emerges from real conversations in Phase 2 — not from your head.",
  },
  {
    q: "What if it doesn’t work?",
    a: "Two answers. Operationally: 14-day refund, no questions. Philosophically: the protocol guarantees a launch, not an income. If you follow the 14 days, your product will be live and buyable. What it earns depends on your market — and that’s what Phase 2 helps you choose well.",
  },
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: intro },
  ]);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleAsk = (item: { q: string; a: string }) => {
    if (typing || asked.includes(item.q)) return;
    setAsked((prev) => [...prev, item.q]);
    setMessages((prev) => [...prev, { role: "user", text: item.q }]);
    setTyping(true);
    timer.current = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: "bot", text: item.a }]);
    }, 800);
  };

  const remaining = qa.filter((item) => !asked.includes(item.q));

  return (
    <section className="relative border-t-2 border-ink bg-bone px-6 py-24 md:px-8 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn>
            <SectionLabel>Have Questions?</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Ask the engine.
            </h2>
            <p className="mt-5 text-lg text-ink-soft">
              A taste of what it feels like to work with the protocol.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.1} className="mx-auto mt-12 max-w-2xl">
          <div className="overflow-hidden rounded-xl border-2 border-ink bg-card shadow-brut-lg">
            {/* Header */}
            <div className="flex items-center gap-3 border-b-2 border-ink bg-paper px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-ink bg-flare text-sm font-black text-paper">
                AI
              </div>
              <div>
                <div className="font-display text-sm font-bold text-ink">
                  One Product AI
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                  <span className="h-2 w-2 rounded-full bg-go" />
                  online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex h-80 flex-col gap-3 overflow-y-auto px-5 py-5 [scrollbar-width:thin]"
            >
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] break-words rounded-xl border-2 border-ink px-4 py-3 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "rounded-br-sm bg-flare text-paper"
                          : "rounded-bl-sm bg-bone text-ink"
                      }`}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-1 rounded-xl rounded-bl-sm border-2 border-ink bg-bone px-4 py-4">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="typing-dot h-2 w-2 rounded-full bg-flare"
                          style={{ animationDelay: `${d * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-2 border-t-2 border-ink bg-paper px-5 py-4">
              {remaining.length > 0 ? (
                remaining.map((item) => (
                  <button
                    key={item.q}
                    onClick={() => handleAsk(item)}
                    disabled={typing}
                    className="rounded-full border-2 border-ink bg-card px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-flare hover:text-paper disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {item.q}
                  </button>
                ))
              ) : (
                <span className="font-mono text-sm uppercase tracking-wide text-ink-faint">
                  That’s the tour. The protocol covers the rest.
                </span>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
