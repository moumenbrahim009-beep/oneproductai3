export default function Aurora() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base">
      {/* Aurora blobs */}
      <div
        className="aurora-blob aurora-a -left-40 -top-40 h-[40rem] w-[40rem]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(139,92,246,0.55), transparent 70%)",
        }}
      />
      <div
        className="aurora-blob aurora-b -right-40 top-1/4 h-[38rem] w-[38rem]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(34,211,238,0.4), transparent 70%)",
        }}
      />
      <div
        className="aurora-blob aurora-c bottom-0 left-1/3 h-[36rem] w-[36rem]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(232,121,249,0.32), transparent 70%)",
        }}
      />

      {/* Grid */}
      <div className="grid-fade absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Grain */}
      <div className="grain absolute inset-0" />

      {/* Vignette to deepen edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(7,6,15,0.85))]" />
    </div>
  );
}
