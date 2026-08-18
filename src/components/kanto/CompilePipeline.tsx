import { useEffect, useState } from "react";

export const STEPS = [
  "Decoding container stream...",
  "Extracting UI DOM...",
  "Segmenting motion layers...",
  "Reverse-Engineering GSAP Easing...",
  "Solving keyframe timing graph...",
  "Emitting HTML / CSS / JS...",
];

export function useCompiler(active: boolean) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active) return;
    setStep(0);
    const id = setInterval(() => {
      setStep((s) => (s >= STEPS.length ? s : s + 1));
    }, 1100);
    return () => clearInterval(id);
  }, [active]);
  return { step, done: step >= STEPS.length };
}

export function CompilePipeline({ step, done }: { step: number; done: boolean }) {
  const pct = Math.round((Math.min(step, STEPS.length) / STEPS.length) * 100);
  return (
    <div className="border-t border-border px-6 py-6">
      <div className="flex items-baseline justify-between">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Compilation
        </p>
        <p className="text-[11px] tracking-[0.2em] text-cream">{pct}%</p>
      </div>
      <div className="mt-3 h-px w-full bg-border">
        <div
          className="h-px bg-cream transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <ul className="mt-5 space-y-2">
        {STEPS.map((s, i) => {
          const state = i < step ? "done" : i === step ? "active" : "idle";
          return (
            <li key={s} className="flex items-center gap-3 text-[12.5px]">
              <span
                className={`w-4 shrink-0 text-[11px] ${
                  state === "idle" ? "text-muted-foreground" : "text-cream"
                }`}
              >
                {state === "done" ? "✓" : state === "active" ? "›" : "·"}
              </span>
              <span
                className={
                  state === "idle"
                    ? "text-muted-foreground/60"
                    : state === "active"
                      ? "text-cream"
                      : "text-muted-foreground"
                }
              >
                {s}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {done ? "Build complete — artifacts ready" : "Working"}
      </p>
    </div>
  );
}
