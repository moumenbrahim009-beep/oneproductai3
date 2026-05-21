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
        className="text-sm text-text-tertiary transition-colors hover:text-text-primary"
      >
        ← Back to home
      </Link>
      <h1 className="mt-8 text-4xl font-bold tracking-tight text-text-primary">
        Refund Policy
      </h1>
      <p className="mt-6 leading-relaxed text-text-secondary">
        If you follow the protocol and don’t have a product live by Day 14,
        request a full refund within 30 days of purchase. No forms. No
        interrogation. Email hello@oneproductai.com and the $49 is returned.
      </p>
    </main>
  );
}
