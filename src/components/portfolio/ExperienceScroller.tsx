import { useEffect, useRef, useState } from "react";
import { setVortexAccent } from "./vortexAccent";
import { ScrollReveal } from "./ScrollReveal";
import miskavedaLogo from "@/assets/miskaveda.png.asset.json";
import skilledSapiensLogo from "@/assets/skilled-sapiens.png.asset.json";
import careTrustLogo from "@/assets/care-trust.png.asset.json";
import indianExpressLogo from "@/assets/indian-express.jpg.asset.json";

interface Chapter {
  id: string;
  org: string;
  role: string;
  title: string;
  accent: string;
  logo?: string;
  logoBg: string;
  tags: string[];
  summary: string;
  challenge: string;
  shift: string;
  outcome: string;
  metrics: { value: string; label: string }[];
}

const chapters: Chapter[] = [
  {
    id: "times-internet",
    org: "Times Internet",
    role: "Marketing · Events & Community",
    title: "Marketing as an Ecosystem",
    accent: "#E000FF",
    logoBg: "#050814",
    tags: ["Events", "Community", "Paid Media"],
    summary:
      "Built a multi-stakeholder go-to-market for TSAC & NBT Mic Drop Madness — paid, partnerships, and people.",
    challenge:
      "Events are one of the hardest products to market. People don't buy an event for what it is — they buy what they believe it could become for them. At Times Internet, working on TSAC and NBT Mic Drop Madness, a student looked for opportunities, a parent looked for security, and a university looked for visibility. All in the same room, all expecting different things.",
    shift:
      "My role sat at the intersection of marketing, partnerships, and audience strategy — Meta ad campaigns, competitor analysis, segmentation, influencer collaborations, and barter partnerships. Beyond campaigns, I reached out to 100+ stakeholders across institutions and collaborators. Some days were dashboards; others were sponsorship conversations across print, digital, and social.",
    outcome:
      "400+ registrations across integrated channels. A digital community built from 0 to 250+ followers in 15–20 days. More importantly, marketing stopped feeling like separate functions and started feeling like an ecosystem — data tells you what people do, empathy tells you why.",
    metrics: [
      { value: "400+", label: "Registrations" },
      { value: "0→250+", label: "Community / 20 days" },
      { value: "100+", label: "Stakeholders engaged" },
    ],
  },
  {
    id: "indian-express",
    org: "The Indian Express",
    role: "B2B Events · Lead Strategy",
    title: "Data, Then Conversation",
    accent: "#f5a524",
    logo: indianExpressLogo.url,
    logoBg: "#ffffff",
    tags: ["B2B", "CXO Outreach", "Lead Gen"],
    summary:
      "Five Oracle / IBM / SAS-backed CXO summits in two months. Built the pipeline from scratch.",
    challenge:
      "Five high-profile B2B events in two months, in collaboration with Oracle, IBM, and SAS — designed exclusively for industry leaders. Thousands of potential prospects existed across industries, but there was no structured pipeline for who actually mattered, how to reach them, or how to make them say yes.",
    shift:
      "I started with data — mapping and filtering 1,000+ prospects through Apollo and EasyLeadz into a clean, targeted database. Then came the real work: 50+ personalised CXO invites and 100+ outreach calls. Every interaction was different. I also stayed on-ground through execution, making sure every moving piece came together on event day.",
    outcome:
      "Qualified-lead identification improved by 30%. 100+ industry leaders and decision-makers in the room after weeks of outreach. The tools get you the name; the conversation gets them to show up. On a call with a CXO you have 30 seconds — that pressure teaches you to communicate with a lot more intention.",
    metrics: [
      { value: "+30%", label: "Qualified leads" },
      { value: "1,000+", label: "Prospects mapped" },
      { value: "100+", label: "CXOs in the room" },
    ],
  },
  {
    id: "care-trust",
    org: "Care Trust",
    role: "Social Impact · CSR Research",
    title: "Empathy Meets Systems Thinking",
    accent: "#4fd1c5",
    logo: careTrustLogo.url,
    logoBg: "#ffffff",
    tags: ["CSR", "Field Ops", "Research"],
    summary:
      "Menstrual hygiene awareness + sustainable product strategy across schools and villages.",
    challenge:
      "Menstrual hygiene is often framed as a health issue, but it's much larger — awareness, access, stigma, and the environmental footprint of non-biodegradable pads. The challenge wasn't distributing products; it was building awareness alongside sustainable solutions that could scale.",
    shift:
      "I collaborated with 5+ government schools, helped organise 5+ awareness events, coordinated volunteers and village outreach. Alongside fieldwork, I worked on CSR research — identifying companies with turnovers above ₹100 Cr across Noida pin codes and studying their existing initiatives. Care Trust also manufactured menstrual cups, so I ran competitor analysis to explore how the product could scale.",
    outcome:
      "200+ sanitary pads distributed; outreach efforts impacting 500+ individuals. Conversations sparked in places where silence had been the default. Solving social problems takes empathy and systems thinking — lasting impact happens when good intentions are backed by data, execution, and sustainability.",
    metrics: [
      { value: "500+", label: "People impacted" },
      { value: "200+", label: "Pads distributed" },
      { value: "5+", label: "Schools partnered" },
    ],
  },
  {
    id: "miskaveda",
    org: "Miskaveda",
    role: "Brand · Ayurveda D2C",
    title: "Heritage, Reframed for Today",
    accent: "#7fb069",
    logo: miskavedaLogo.url,
    logoBg: "#f6f2e7",
    tags: ["D2C", "Brand", "Content"],
    summary:
      "Helping an Ayurveda label translate ancient ritual into a modern, scrollable brand voice.",
    challenge:
      "Ayurveda is centuries old, but the audience scrolling Instagram in 2026 isn't. The brand needed to feel rooted without feeling dated — and to compete with louder D2C beauty labels without losing its quietness.",
    shift:
      "Worked across content strategy, product storytelling, and visual direction — translating ingredient lists into rituals, and rituals into shareable formats. Focused on tone, cadence, and the small craft details that make a heritage brand feel intentional rather than nostalgic.",
    outcome:
      "A clearer brand voice, a more consistent visual system, and content that finally sounded like the product it was selling.",
    metrics: [
      { value: "100%", label: "Voice rewrite" },
      { value: "Multi-SKU", label: "Storytelling system" },
      { value: "Modern", label: "Heritage repositioning" },
    ],
  },
  {
    id: "skilled-sapiens",
    org: "Skilled Sapiens",
    role: "EdTech · Growth & Outreach",
    title: "Turning Skills Into a Story",
    accent: "#ffd23f",
    logo: skilledSapiensLogo.url,
    logoBg: "#ffd23f",
    tags: ["EdTech", "Outreach", "Growth"],
    summary: "Positioning an upskilling platform for learners who've heard every promise before.",
    challenge:
      "EdTech is a noisy category — every player promises transformation. The real challenge was earning attention from learners who'd been burned by hype and parents who wanted proof, not pitch decks.",
    shift:
      "Built outreach narratives that led with outcomes over features, designed conversion-friendly content for cold audiences, and supported community-led growth experiments to make the brand feel like a peer, not a pitch.",
    outcome:
      "Higher-quality enquiries, sharper messaging across funnels, and a brand that started getting remembered for substance rather than slogans.",
    metrics: [
      { value: "Sharper", label: "Funnel messaging" },
      { value: "Warmer", label: "Outreach response" },
      { value: "Community", label: "First growth motion" },
    ],
  },
];

export function ExperienceScroller() {
  const [open, setOpen] = useState<Chapter | null>(null);

  useEffect(() => {
    if (!open) return;
    setVortexAccent(open.accent);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section id="work" className="relative grid-bg px-6 py-32">
      <div className="absolute inset-0 halftone opacity-30 pointer-events-none" />
      <div className="mx-auto max-w-7xl relative z-10">
        <header className="mb-20 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-end">
          <p className="font-mono-ui text-muted-foreground text-[11px] uppercase tracking-[0.35em]">
            01 — The Work
          </p>
          <h2 className="font-display max-w-3xl text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
            Rooms entered. Problems solved.
            <span className="text-muted-foreground italic"> Tap any project.</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((c, i) => (
            <ScrollReveal key={c.id} animation="skew-up" cascadeIndex={i}>
              <ExperienceCard chapter={c} index={i} onClick={() => setOpen(c)} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Cinematic Full-screen Detailed Presentation Overlay */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(null)}
          data-cursor="close"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#050814e0] p-0 backdrop-blur-xl transition-opacity duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            data-cursor="none"
            className="grid-bg relative h-full w-full overflow-y-auto p-6 md:p-16 text-foreground flex flex-col justify-between"
          >
            {/* Tech details corner brackets */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/20 pointer-events-none" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/20 pointer-events-none" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/20 pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/20 pointer-events-none" />

            <div className="flex justify-between items-center border-b border-white/10 pb-6">
              <span className="font-mono-ui text-[10px] tracking-[0.35em] text-muted-foreground uppercase">
                Case study file // 0{chapters.indexOf(open) + 1}
              </span>
              <button
                onClick={() => setOpen(null)}
                data-cursor="close"
                className="font-mono-ui border border-white/15 px-4 py-2 text-[10px] tracking-[0.2em] uppercase rounded-full hover:bg-white hover:text-black transition-colors duration-300"
              >
                Exit [ESC]
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20 my-auto py-12">
              {/* Left Column: Visual branding and Key metrics */}
              <div className="flex flex-col justify-center">
                <div
                  className="w-24 h-24 rounded-lg flex items-center justify-center overflow-hidden mb-8 shadow-2xl"
                  style={{ background: open.logoBg, border: `1px solid ${open.accent}33` }}
                >
                  {open.logo ? (
                    <img
                      src={open.logo}
                      alt={open.org}
                      className="max-h-[60%] max-w-[70%] object-contain"
                    />
                  ) : (
                    <span
                      className="font-display text-4xl font-black"
                      style={{ color: open.accent }}
                    >
                      {open.org[0]}
                    </span>
                  )}
                </div>

                <p
                  className="font-mono-ui text-[11px] uppercase tracking-[0.3em]"
                  style={{ color: open.accent }}
                >
                  {open.role}
                </p>
                <h3 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight mt-4 leading-[0.95]">
                  {open.org}
                </h3>
                <p className="font-display text-muted-foreground text-xl mt-3 italic">
                  "{open.title}"
                </p>

                {/* Big numbers scoreboard */}
                <div className="grid grid-cols-3 gap-6 border-t border-b border-white/10 py-8 mt-10">
                  {open.metrics.map((m, idx) => (
                    <div key={m.label} className="text-left">
                      <p
                        className="font-display text-4xl sm:text-5xl font-black leading-none tracking-tight animate-glitch"
                        style={{ color: open.accent }}
                      >
                        {m.value}
                      </p>
                      <p className="font-mono-ui text-[9px] uppercase tracking-[0.25em] text-muted-foreground mt-2.5">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Detailed copy */}
              <div className="flex flex-col justify-center space-y-10 border-l border-white/15 pl-6 lg:pl-16">
                <Block label="The Challenge" body={open.challenge} accent={open.accent} />
                <Block label="The Collaborative Shift" body={open.shift} accent={open.accent} />
                <Block label="The Outcome" body={open.outcome} accent={open.accent} />
              </div>
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono-ui text-muted-foreground/60 border-t border-white/10 pt-6">
              <span>UN-RESUME SYSTEM PROTOCOL v4.2</span>
              <span className="text-right">
                ACCENT ENCODING: <span style={{ color: open.accent }}>{open.accent}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// Experience Card component for 3D tilt tracking
function ExperienceCard({
  chapter,
  index,
  onClick,
}: {
  chapter: Chapter;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates (-0.5 to 0.5)
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    setTilt({
      x: -normY * 12, // Max rotation 12deg X
      y: normX * 12, // Max rotation 12deg Y
    });

    setGlow({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setHovered(true);
        setVortexAccent(chapter.accent);
      }}
      onMouseLeave={handleMouseLeave}
      data-cursor="view"
      className="group paper-card grain relative flex w-full flex-col overflow-hidden rounded-md text-left transition-all duration-300 ease-out"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.03 : 1})`,
        boxShadow: hovered ? `0 25px 50px -15px ${chapter.accent}40` : "none",
        borderColor: hovered ? chapter.accent : "rgba(255, 255, 255, 0.08)",
        willChange: "transform",
      }}
    >
      {/* 3D spotlight overlay */}
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 130px at ${glow.x}% ${glow.y}%, ${chapter.accent}22, transparent 80%)`,
          }}
        />
      )}

      {/* Chapter image block */}
      <div
        className="relative flex aspect-[16/9] items-center justify-center overflow-hidden border-b border-white/10"
        style={{ background: chapter.logoBg }}
      >
        {chapter.logo ? (
          <img
            src={chapter.logo}
            alt={chapter.org}
            loading="lazy"
            className="max-h-[65%] max-w-[75%] object-contain transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <span
            className="font-display text-4xl font-extrabold tracking-tighter"
            style={{ color: chapter.accent }}
          >
            {chapter.org
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </span>
        )}

        {/* Diagonal halftone strip element */}
        <div className="absolute right-0 top-0 w-24 h-24 bg-white/5 halftone rotate-45 translate-x-12 -translate-y-12 pointer-events-none" />

        <span className="font-mono-ui absolute left-3 top-3 rounded-md bg-black/5 border border-black/10 px-2 py-1 text-[9px] uppercase tracking-[0.3em] text-foreground backdrop-blur">
          PROJECT 0{index + 1}
        </span>
      </div>

      {/* Chapter detail body */}
      <div className="flex flex-1 flex-col gap-4 p-6 relative">
        <div className="flex flex-wrap gap-2">
          {chapter.tags.map((t) => (
            <span
              key={t}
              className="font-mono-ui rounded-full border border-white/15 px-2.5 py-0.5 text-[8px] uppercase tracking-[0.25em] text-foreground/75"
            >
              {t}
            </span>
          ))}
        </div>

        <div>
          <p
            className="font-mono-ui text-[9px] uppercase tracking-[0.3em]"
            style={{ color: chapter.accent }}
          >
            {chapter.role}
          </p>
          <h3 className="font-display mt-2 text-2xl font-bold leading-tight tracking-tight text-foreground group-hover:ink-hover">
            {chapter.org}
          </h3>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{chapter.summary}</p>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
          <span className="font-mono-ui text-muted-foreground group-hover:text-foreground transition-colors text-[9px] uppercase tracking-[0.3em]">
            Deconstruct Case
          </span>
          <span
            className="font-mono-ui text-[12px] transition-transform duration-300 group-hover:translate-x-1.5"
            style={{ color: chapter.accent }}
          >
            →
          </span>
        </div>
      </div>
    </button>
  );
}

function Block({ label, body, accent }: { label: string; body: string; accent: string }) {
  return (
    <div className="border-l border-white/10 pl-6 relative">
      {/* Decorative technical node dot */}
      <div
        className="absolute -left-[4.5px] top-1.5 w-2 h-2 rounded-full border"
        style={{ backgroundColor: accent, borderColor: "#050814", boxShadow: `0 0 10px ${accent}` }}
      />
      <p
        className="font-mono-ui mb-3 text-[9px] uppercase tracking-[0.35em]"
        style={{ color: accent }}
      >
        {label}
      </p>
      <p className="text-foreground/80 text-base leading-relaxed sm:text-lg">{body}</p>
    </div>
  );
}
