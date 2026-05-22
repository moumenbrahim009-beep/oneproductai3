import Link from "next/link";

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 py-14 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <div className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet via-indigo to-cyan text-sm font-black text-white">
                1
              </span>
              One Product AI
            </div>
            <p className="mt-3 text-sm text-ink-faint">
              Built by BM Digital LLC. United States.
            </p>
          </div>

          <div className="md:text-right">
            <a
              href="mailto:hello@oneproductai.com"
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              hello@oneproductai.com
            </a>
            <div className="mt-3 flex gap-5 md:justify-end">
              {legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-ink-faint transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-xs uppercase tracking-wide text-ink-faint">
          © 2026 BM Digital LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
