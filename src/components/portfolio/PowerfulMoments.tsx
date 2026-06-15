import bazaarAsset from "@/assets/powerful-bazaar.jpg.asset.json";
import danceAsset from "@/assets/powerful-dance.jpg.asset.json";
import eventAsset from "@/assets/powerful-event.jpg.asset.json";
import paperAsset from "@/assets/powerful-paper.png.asset.json";
import volunteerAsset from "@/assets/powerful-volunteer.jpg.asset.json";

const moments = [
  {
    src: bazaarAsset.url,
    title: "Bazaar Victory",
    caption: "Won a college-wide business stall competition against 150+ participants.",
  },
  {
    src: danceAsset.url,
    title: "Group Dance Win",
    caption: "Won a college-wide group dance competition.",
  },
  {
    src: eventAsset.url,
    title: "Campus Qualifier",
    caption:
      "Organized a campus-level qualifier for a business simulation competition at IIT Kharagpur.",
  },
  {
    src: paperAsset.url,
    title: "Journal Publication",
    caption: "Published my work in a reputed academic journal.",
  },
  {
    src: volunteerAsset.url,
    title: "Community Outreach",
    caption: "Volunteered in menstrual hygiene outreach programs for underserved communities.",
  },
];

export function PowerfulMoments() {
  return (
    <section id="powerful-moments" className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <header className="mb-14 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-end">
          <p className="font-mono-ui text-muted-foreground text-[11px] uppercase tracking-[0.35em]">
            03 — Powerful Moments
          </p>
          <h2 className="font-display max-w-4xl text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
            Milestones that shaped
            <span className="text-muted-foreground italic"> who I am becoming.</span>
          </h2>
        </header>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {moments.map((moment, i) => (
            <article
              key={moment.title}
              data-cursor="view"
              className={`paper-card group relative overflow-hidden rounded-md border border-white/10 transition-all duration-300 hover:border-signal/50 ${
                i === 0 ? "xl:col-span-2" : i === 3 ? "md:col-span-2 xl:col-span-1" : ""
              }`}
              style={{
                animation: `pm-float 7s ease-in-out ${i * 0.35}s infinite`,
              }}
            >
              {/* Halftone grid texture on hover */}
              <div className="absolute inset-0 halftone opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={moment.src}
                  alt={moment.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale contrast-110 group-hover:grayscale-0"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,10,10,0.92) 8%, rgba(10,10,10,0.15) 60%, transparent 90%)",
                  }}
                />

                {/* Visual label marker */}
                <div className="absolute left-4 top-4 flex items-center gap-1.5">
                  <span className="font-mono-ui bg-signal/85 text-primary-foreground px-2 py-0.5 text-[8px] uppercase tracking-[0.2em] rounded">
                    MOMENT 0{i + 1}
                  </span>
                </div>
              </div>

              <div className="relative p-5">
                <p className="font-display text-xl font-bold leading-tight tracking-tight text-white group-hover:text-signal transition-colors duration-300 chromatic-hover">
                  {moment.title}
                </p>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {moment.caption}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pm-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
