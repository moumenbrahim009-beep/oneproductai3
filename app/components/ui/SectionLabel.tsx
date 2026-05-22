export default function SectionLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border-2 border-ink bg-card px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink shadow-brut">
      <span className="h-2 w-2 bg-flare" />
      {children}
    </span>
  );
}
