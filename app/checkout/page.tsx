import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout — One Product AI",
};

export default function Checkout() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet to-cyan" />
        Checkout
      </span>
      <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
        Almost <span className="text-gradient">there.</span>
      </h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">
        This is a placeholder. The real checkout will be connected here. One
        product. $49. Lifetime access.
      </p>
      <Link
        href="/"
        className="mt-10 text-sm uppercase tracking-wide text-ink-faint transition-colors hover:text-ink"
      >
        ← Back to home
      </Link>
    </main>
  );
}
