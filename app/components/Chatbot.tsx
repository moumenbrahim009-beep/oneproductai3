"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./ui/Reveal";
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
    <section className="relative px-6 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <SectionLabel>Have Questions?</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Ask the <span className="text-gradient">engine.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-ink-muted">
              A taste of what it feels like to work with the protocol.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-2xl">
          <div className="glass border-glow overflow-hidden rounded-3xl shadow-[0_30px_80px_-40px_rgba(34,211,238,0.5)]">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet via-indigo to-cyan text-sm font-black text-white">
                AI
              </div>
              <div>
                <div className="font-display text-sm font-bold text-ink">
                  One Product AI
                </div>
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-ink-faint">
                  <span className="h-2 w-2 rounded-full bg-go shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex h-80 flex-col gap-3 overflow-y-auto px-5 py-5"
            >
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] break-words rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "rounded-br-md bg-gradient-to-br from-violet to-indigo text-white"
                          : "rounded-bl-md border border-white/10 bg-white/[0.05] text-ink-muted"
                      }`}
                    >
                      {m.text}
                    </div>
                  </motion.div>
                ))}
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.05] px-4 py-4">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="typing-dot h-2 w-2 rounded-full bg-gradient-to-r from-violet to-cyan"
                          style={{ animationDelay: `${d * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-2 border-t border-white/10 bg-white/[0.03] px-5 py-4">
              {remaining.length > 0 ? (
                remaining.map((item) => (
                  <button
                    key={item.q}
                    onClick={() => handleAsk(item)}
                    disabled={typing}
                    className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-sm text-ink-muted transition-all duration-300 hover:border-violet/60 hover:bg-violet/10 hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {item.q}
                  </button>
                ))
              ) : (
                <span className="text-sm uppercase tracking-wide text-ink-faint">
                  That’s the tour. The protocol covers the rest.
                </span>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
