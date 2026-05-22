import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout — One Product AI",
};

export default function Checkout() {
  return (
    <main className="grid-paper flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="inline-flex items-center gap-2 rounded-md border-2 border-ink bg-card px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-ink shadow-brut">
        <span className="h-2 w-2 bg-flare" />
        Checkout
      </span>
      <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
        Almost there.
      </h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
        This is a placeholder. The real checkout will be connected here. One
        product. $49. Lifetime access.
      </p>
      <Link
        href="/"
        className="mt-10 font-mono text-xs uppercase tracking-wide text-ink-faint transition-colors hover:text-flare"
      >
        ← Back to home
      </Link>
    </main>
  );
}
