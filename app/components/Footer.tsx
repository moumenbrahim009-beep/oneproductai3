import Link from "next/link";

const legal = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Refund Policy", href: "/refund" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle px-6 py-14 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <div className="text-lg font-semibold tracking-tight text-text-primary">
              One Product AI
            </div>
            <p className="mt-2 text-sm text-text-tertiary">
              Built by BM Digital LLC. United States.
            </p>
          </div>

          <div className="md:text-right">
            <a
              href="mailto:hello@oneproductai.com"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              hello@oneproductai.com
            </a>
            <div className="mt-3 flex gap-4 md:justify-end">
              {legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-text-tertiary transition-colors hover:text-text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border-subtle pt-8 text-xs text-text-tertiary">
          © 2026 BM Digital LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
