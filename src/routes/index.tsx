import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { UploadZone } from "@/components/kanto/UploadZone";
import { CompilePipeline, useCompiler } from "@/components/kanto/CompilePipeline";
import { PreviewCanvas } from "@/components/kanto/PreviewCanvas";
import { CodeEditor, SAMPLE_CODE, type CodeTab } from "@/components/kanto/CodeEditor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kanto Motion Compiler — Video to Code" },
      {
        name: "description",
        content:
          "Kanto Motion Compiler reverse-engineers MP4 video into production HTML, CSS and GSAP code with a live preview canvas.",
      },
      { property: "og:title", content: "Kanto Motion Compiler — Video to Code" },
      {
        property: "og:description",
        content:
          "Deploy a video and compile it into structured DOM, styles and reverse-engineered GSAP timelines.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [tab, setTab] = useState<CodeTab>("JS/GSAP");
  const { step, done } = useCompiler(!!file);

  useEffect(() => {
    if (!file) return;
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="grid shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border px-6 py-4">
        <div className="flex min-w-0 items-baseline gap-3">
          <h1 className="brand truncate text-xl text-cream">Kanto Motion</h1>
          <span className="hidden text-[11px] uppercase tracking-[0.25em] text-muted-foreground sm:inline">
            Compiler
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Server connected
          </span>
        </div>
      </header>

      {!file ? (
        <main className="flex flex-1 flex-col">
          <UploadZone onFile={setFile} />
        </main>
      ) : (
        <main className="grid flex-1 grid-cols-1 lg:grid-cols-2">
          <section className="flex flex-col border-b border-border lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between border-b border-border px-6 py-2.5">
              <p className="truncate text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Source · {file.name}
              </p>
              <button
                onClick={() => setFile(null)}
                className="shrink-0 rounded-lg border border-border px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-secondary"
              >
                Reset
              </button>
            </div>
            <div className="p-6">
              {url && (
                <video
                  src={url}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="aspect-video w-full rounded-lg border border-border bg-surface"
                />
              )}
            </div>
            <CompilePipeline step={step} done={done} />
          </section>

          <section className="flex min-h-[70vh] flex-col lg:min-h-0">
            <PreviewCanvas ready={done} />
            <CodeEditor tab={tab} onTabChange={setTab} code={SAMPLE_CODE} />
          </section>
        </main>
      )}

      <footer className="shrink-0 border-t border-border px-6 py-3">
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Kanto Motion Compiler · Build 0.4.1
        </p>
      </footer>
    </div>
  );
}
