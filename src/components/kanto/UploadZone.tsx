import { useRef, useState } from "react";

export function UploadZone({ onFile }: { onFile: (file: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="w-full max-w-3xl">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            const f = e.dataTransfer.files?.[0];
            if (f) onFile(f);
          }}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          className={`flex min-h-[380px] cursor-pointer flex-col items-center justify-center gap-6 rounded-lg border border-dashed px-8 text-center transition-colors ${
            over ? "border-cream bg-secondary" : "border-border bg-background"
          }`}
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-cream"
            aria-hidden="true"
          >
            <path d="M12 17V4" />
            <path d="M6 10l6-6 6 6" />
            <path d="M4 20h16" />
          </svg>
          <div className="space-y-3">
            <p className="text-[15px] tracking-tight text-cream">
              Deploy Video for Motion Compilation
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              MP4 · Drag and drop or click to select
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="video/mp4,video/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
            }}
          />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
          {[
            ["01", "DOM extraction"],
            ["02", "Easing inference"],
            ["03", "Code emission"],
          ].map(([n, label]) => (
            <div key={n} className="bg-background px-5 py-4">
              <p className="text-[11px] tracking-[0.2em] text-muted-foreground">{n}</p>
              <p className="mt-1 text-[13px] text-cream">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
