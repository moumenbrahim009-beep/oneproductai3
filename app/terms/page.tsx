import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms — One Product AI",
};

export default function Terms() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-32 md:px-8">
      <Link
        href="/"
        className="text-sm text-text-tertiary transition-colors hover:text-text-primary"
      >
        ← Back to home
      </Link>
      <h1 className="mt-8 text-4xl font-bold tracking-tight text-text-primary">
        Terms of Service
      </h1>
      <p className="mt-6 leading-relaxed text-text-secondary">
        Placeholder. The terms of service for One Product AI, operated by BM
        Digital LLC, will be published here.
      </p>
    </main>
  );
}
