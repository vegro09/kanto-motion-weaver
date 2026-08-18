const TABS = ["HTML", "CSS", "JS/GSAP"] as const;
export type CodeTab = (typeof TABS)[number];

type Token = { t: string; c: string };

const RULES: Record<CodeTab, [RegExp, string][]> = {
  HTML: [
    [/&lt;!--[\s\S]*?--&gt;/g, "text-muted-foreground"],
    [/(&lt;\/?[a-zA-Z0-9-]+)/g, "text-cream"],
    [/([a-zA-Z-]+)=/g, "text-muted-foreground"],
    [/("[^"]*")/g, "text-white"],
  ],
  CSS: [
    [/(\/\*[\s\S]*?\*\/)/g, "text-muted-foreground"],
    [/^([.#][\w-]+[^{]*)\{/gm, "text-white"],
    [/([\w-]+):/g, "text-cream"],
  ],
  "JS/GSAP": [
    [/(\/\/[^\n]*)/g, "text-muted-foreground"],
    [/\b(const|let|function|return|from|import|new)\b/g, "text-white"],
    [/\b(gsap|ScrollTrigger|timeline|to|from|fromTo)\b/g, "text-cream"],
    [/("[^"]*"|'[^']*')/g, "text-muted-foreground"],
  ],
};

function highlight(code: string, tab: CodeTab) {
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  let html = escaped;
  for (const [re, cls] of RULES[tab]) {
    html = html.replace(re, (m) => `<span class="${cls}">${m}</span>`);
  }
  return html;
}

export function CodeEditor({
  tab,
  onTabChange,
  code,
}: {
  tab: CodeTab;
  onTabChange: (t: CodeTab) => void;
  code: Record<CodeTab, string>;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center border-b border-border">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => onTabChange(t)}
            className={`border-r border-border px-4 py-2.5 text-[11px] uppercase tracking-[0.18em] transition-colors ${
              t === tab
                ? "bg-secondary text-cream"
                : "text-muted-foreground hover:text-cream"
            }`}
          >
            {t}
          </button>
        ))}
        <span className="ml-auto px-4 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Generated
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-auto bg-surface p-5">
        <pre className="text-[12.5px] leading-[1.7] text-muted-foreground">
          <code dangerouslySetInnerHTML={{ __html: highlight(code[tab], tab) }} />
        </pre>
      </div>
    </div>
  );
}

export const SAMPLE_CODE: Record<CodeTab, string> = {
  HTML: `<!-- extracted DOM skeleton -->
<section class="stage">
  <h1 class="headline" data-split="chars">Kanto</h1>
  <div class="marquee">
    <span class="marquee__item">Motion</span>
    <span class="marquee__item">Compiler</span>
  </div>
  <div class="grid" data-stagger="0.06"></div>
</section>`,
  CSS: `/* reconstructed layout tokens */
.stage {
  display: grid;
  place-items: center;
  min-height: 100vh;
  background: #000000;
}
.headline {
  font-size: clamp(3rem, 12vw, 11rem);
  letter-spacing: -0.04em;
  color: #f5f5dc;
}
.marquee__item {
  will-change: transform;
}`,
  "JS/GSAP": `// reverse-engineered timeline
import gsap from "gsap";

const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

tl.from(".headline", { yPercent: 120, duration: 1.1 })
  .from(".marquee__item", { opacity: 0, stagger: 0.06 }, "-=0.6")
  .to(".grid", { scale: 1, duration: 0.9 }, "<");`,
};
