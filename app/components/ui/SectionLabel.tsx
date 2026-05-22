export default function SectionLabel({ children }: { children: string }) {
  return (
    <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet to-cyan" />
      </span>
      {children}
    </span>
  );
}
