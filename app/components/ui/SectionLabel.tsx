export default function SectionLabel({ children }: { children: string }) {
  return (
    <span className="gradient-text text-sm font-semibold uppercase tracking-widest opacity-80">
      {children}
    </span>
  );
}
