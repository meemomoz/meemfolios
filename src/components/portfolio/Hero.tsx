import meemaVideo from "@/assets/meema.mp4.asset.json";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center px-6 pt-32 pb-24"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-mono-ui mb-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            <span className="bg-signal inline-block h-px w-8" />
            The Un-Resume · MMXXVI
          </p>
          <h1 className="font-display text-foreground text-[clamp(3rem,10vw,9.5rem)] font-extrabold leading-[0.88] tracking-tight">
            Hi, I'm
            <br />
            <span className="italic font-normal">
              Meem<span className="text-signal">a</span>nsa.
            </span>
          </h1>
          <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="text-foreground/80 max-w-2xl text-lg leading-relaxed sm:text-xl">
              Not the resume version. The actual one. The best way to understand
              someone isn't through bullet points — it's through who they are
              when nobody is watching.
            </p>
            <div
              className="font-mono-ui text-muted-foreground hidden items-center gap-2 text-[10px] uppercase tracking-[0.3em] sm:flex"
              style={{ animation: "scroll-cue 2.2s ease-in-out infinite" }}
            >
              Scroll
              <span className="bg-foreground/40 h-8 w-px" />
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Frame accents */}
          <div
            aria-hidden
            className="bg-signal/70 absolute -top-3 -left-3 h-10 w-px"
          />
          <div
            aria-hidden
            className="bg-signal/70 absolute -top-3 -left-3 h-px w-10"
          />
          <div
            aria-hidden
            className="bg-foreground/30 absolute -right-3 -bottom-3 h-10 w-px"
          />
          <div
            aria-hidden
            className="bg-foreground/30 absolute -right-3 -bottom-3 h-px w-10"
          />

          <div className="paper-card grain relative overflow-hidden rounded-sm">
            <div className="relative aspect-[3/4] w-full">
              <video
                src={meemaVideo.url}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Tonal overlay to lock into neo-noir palette */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.05) 40%, rgba(10,10,10,0.75) 100%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-overlay"
                style={{
                  background:
                    "radial-gradient(120% 80% at 80% 10%, rgba(255,62,62,0.18), transparent 55%)",
                }}
              />

              {/* Caption strip */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 px-4 py-3">
                <span className="font-mono-ui text-foreground/85 text-[10px] uppercase tracking-[0.3em]">
                  REC · Off-Script
                </span>
                <span className="font-mono-ui text-foreground/60 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]">
                  <span className="bg-signal inline-block h-1.5 w-1.5 animate-pulse rounded-full" />
                  Live take
                </span>
              </div>
            </div>
          </div>

          <p className="font-mono-ui text-muted-foreground mt-4 text-[10px] uppercase tracking-[0.3em]">
            Reel 01 — the unfiltered version
          </p>
        </div>
      </div>
    </section>
  );
}
