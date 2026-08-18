export function PreviewCanvas({ ready }: { ready: boolean }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col border-b border-border">
      <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-2.5">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Live Preview Canvas
        </p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {ready ? "1440 × 900" : "Awaiting build"}
        </p>
      </div>
      <div className="grid min-h-[220px] flex-1 place-items-center bg-surface p-8">
        {ready ? (
          <div className="w-full max-w-md text-center">
            <p className="brand text-5xl leading-none text-cream">Kanto</p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
              Motion · Compiler · Output
            </p>
            <div className="mt-8 grid grid-cols-6 gap-px bg-border">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-6 bg-surface" />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
            Render target idle
          </p>
        )}
      </div>
    </div>
  );
}
