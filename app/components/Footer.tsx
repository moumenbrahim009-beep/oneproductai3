import Link from "next/link";

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-ink px-6 py-14 text-paper md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-paper">
              <span className="flex h-7 w-7 items-center justify-center rounded-md border-2 border-paper bg-flare text-sm font-black text-paper">
                1
              </span>
              One Product AI
            </div>
            <p className="mt-3 font-mono text-xs uppercase tracking-wide text-paper/60">
              Built by BM Digital LLC. United States.
            </p>
          </div>

          <div className="md:text-right">
            <a
              href="mailto:hello@oneproductai.com"
              className="text-sm text-paper/90 transition-colors hover:text-flare"
            >
              hello@oneproductai.com
            </a>
            <div className="mt-3 flex gap-4 md:justify-end">
              {legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-mono text-xs uppercase tracking-wide text-paper/60 transition-colors hover:text-flare"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t-2 border-paper/20 pt-8 font-mono text-xs uppercase tracking-wide text-paper/50">
          © 2026 BM Digital LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
