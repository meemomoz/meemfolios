const moments = [
  {
    title: "The Collective Victory",
    body: "Won a college-wide event amongst 150+ participants — a win shared with every teammate who helped brainstorm and execute.",
  },
  {
    title: "Synchronized Success",
    body: "Won a group dance competition — because creative coordination is the best training for campaign management.",
  },
];

const landmarks = [
  "Moving to an unknown city and making it home.",
  "Taking a solo trip to Landour.",
  "Anchoring a large-scale college event.",
  "Boarding a flight all alone.",
  "Moving to Bangalore at the age of 22.",
];

export function MomentsLedger() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <header className="mb-20 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-end">
          <p className="font-mono-ui text-muted-foreground text-[11px] uppercase tracking-[0.35em]">
            03 — Off the Record
          </p>
          <h2 className="font-display max-w-3xl text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
            Moments that don't fit
            <span className="text-muted-foreground italic"> on a CV.</span>
          </h2>
        </header>

        <div className="grid gap-16 md:grid-cols-2 md:gap-24">
          <div>
            <p className="font-mono-ui text-signal mb-8 text-[10px] uppercase tracking-[0.35em]">
              Powerful Moments
            </p>
            <ul className="space-y-8">
              {moments.map((m) => (
                <li key={m.title} className="border-t border-white/10 pt-6">
                  <p className="font-display text-xl font-semibold tracking-tight">{m.title}</p>
                  <p className="text-foreground/75 mt-2 leading-relaxed">{m.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="font-mono-ui mb-8 text-[10px] uppercase tracking-[0.35em]"
              style={{ color: "#4fd1c5" }}
            >
              Personal Achievements
            </p>
            <ul className="space-y-6">
              {landmarks.map((l, i) => (
                <li
                  key={l}
                  className="font-display flex items-baseline gap-6 border-t border-white/10 pt-5 text-xl italic leading-snug"
                >
                  <span className="font-mono-ui text-muted-foreground shrink-0 not-italic text-[10px] tracking-[0.25em]">
                    0{i + 1}
                  </span>
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
