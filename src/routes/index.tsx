import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Manifesto } from "@/components/portfolio/Manifesto";
import { ExperienceScroller } from "@/components/portfolio/ExperienceScroller";
import { PowerfulMoments } from "@/components/portfolio/PowerfulMoments";
import { PersonalAchievements } from "@/components/portfolio/PersonalAchievements";
import { EvidenceWall } from "@/components/portfolio/EvidenceWall";
import { FAQSection } from "@/components/portfolio/FAQSection";
import { MomentsLedger } from "@/components/portfolio/MomentsLedger";
import { FooterCTA } from "@/components/portfolio/FooterCTA";
import { VortexCanvas } from "@/components/portfolio/VortexCanvas";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { ScrollReveal } from "@/components/portfolio/ScrollReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meemansa Malav — The Un-Resume" },
      {
        name: "description",
        content:
          "Not a resume. A collection of problems solved, teams united, and narratives shaped — campaigns from Times Internet, The Indian Express, and Care Trust.",
      },
      { property: "og:title", content: "Meemansa Malav — The Un-Resume" },
      {
        property: "og:description",
        content: "A cinematic portfolio of campaigns, conversations, and collaborative wins.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Custom custom-cursor element */}
      <CustomCursor />

      <div
        aria-hidden
        className="fixed inset-0 -z-20"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(200,75,49,0.05), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(227,167,47,0.05), transparent 55%), #FDFBF7",
        }}
      />
      <VortexCanvas />

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-[5]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(253,251,247,0.4) 0%, rgba(253,251,247,0.1) 30%, rgba(253,251,247,0.6) 70%, rgba(253,251,247,0.95) 100%)",
        }}
      />

      {/* Global Craft Paper Grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50 opacity-20 mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.25'/></svg>\")",
        }}
      />

      <Navbar />

      <ScrollReveal animation="fade-in" duration={1000}>
        <Hero />
      </ScrollReveal>

      <ScrollReveal animation="skew-up" threshold={0.15}>
        <Manifesto />
      </ScrollReveal>

      <ExperienceScroller />

      <ScrollReveal animation="fade-up" threshold={0.15}>
        <PowerfulMoments />
      </ScrollReveal>

      <PersonalAchievements />

      <EvidenceWall />

      <ScrollReveal animation="fade-up" threshold={0.15}>
        <FAQSection />
      </ScrollReveal>

      <ScrollReveal animation="fade-up" threshold={0.15}>
        <MomentsLedger />
      </ScrollReveal>

      <ScrollReveal animation="fade-in" threshold={0.1}>
        <FooterCTA />
      </ScrollReveal>
    </main>
  );
}
