import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy — One Product AI",
};

export default function Refund() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-32 md:px-8">
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-wide text-ink-faint transition-colors hover:text-flare"
      >
        ← Back to home
      </Link>
      <h1 className="mt-8 font-display text-4xl font-extrabold tracking-tight text-ink">
        Refund Policy
      </h1>
      <p className="mt-6 leading-relaxed text-ink-soft">
        If you follow the protocol and don’t have a product live by Day 14,
        request a full refund within 30 days of purchase. No forms. No
        interrogation. Email hello@oneproductai.com and the $49 is returned.
      </p>
    </main>
  );
}
