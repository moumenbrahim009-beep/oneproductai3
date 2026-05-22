import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — One Product AI",
};

export default function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-32 md:px-8">
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-wide text-ink-faint transition-colors hover:text-flare"
      >
        ← Back to home
      </Link>
      <h1 className="mt-8 font-display text-4xl font-extrabold tracking-tight text-ink">
        Privacy Policy
      </h1>
      <p className="mt-6 leading-relaxed text-ink-soft">
        Placeholder. The privacy policy for One Product AI, operated by BM
        Digital LLC, will be published here.
      </p>
    </main>
  );
}
