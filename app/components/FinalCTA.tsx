"use client";

import Button from "./ui/Button";
import GradientText from "./ui/GradientText";
import FadeIn from "./ui/FadeIn";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-8 md:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-indigo/25 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <FadeIn>
          <h2 className="text-5xl font-extrabold leading-tight tracking-tight text-text-primary md:text-6xl">
            The next 14 days happen anyway.
            <br />
            Spend them <GradientText>shipping</GradientText>.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary">
            In 14 days, your situation will either be the same — or you’ll have
            a product live, validated, and earning its first dollars. The cost
            of finding out is $49.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10 flex flex-col items-center">
            <Button href="/checkout" size="lg">
              Get Started — $49
            </Button>
            <p className="mt-4 text-sm text-text-tertiary">
              One-time · 14-day guarantee · Instant access
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="mt-12 text-sm text-text-tertiary">
            Launch guaranteed. Income is not. We promise the system, not the
            outcome.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
