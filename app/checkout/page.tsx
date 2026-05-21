import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout — One Product AI",
};

export default function Checkout() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="gradient-text text-sm font-semibold uppercase tracking-widest opacity-80">
        Checkout
      </span>
      <h1 className="mt-5 text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
        Almost there.
      </h1>
      <p className="mt-6 max-w-md text-lg text-text-secondary">
        This is a placeholder. The real checkout will be connected here. One
        product. $49. Lifetime access.
      </p>
      <Link
        href="/"
        className="mt-10 text-sm text-text-tertiary transition-colors hover:text-text-primary"
      >
        ← Back to home
      </Link>
    </main>
  );
}
