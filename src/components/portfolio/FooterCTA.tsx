import { useEffect, useState } from "react";

export function FooterCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <section id="contact" className="relative px-6 pt-32 pb-48">
        <div className="mx-auto max-w-5xl text-center">
          <p className="font-mono-ui text-muted-foreground mb-8 text-[11px] uppercase tracking-[0.35em]">
            04 — Let's connect
          </p>
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.95] tracking-tight">
            Thanks for making it
            <br />
            <span className="text-signal italic">this far.</span>
          </h2>
          <p className="text-foreground/70 mx-auto mt-8 max-w-xl text-lg">
            If my experiences, or my way of thinking align with what you're looking for, I'd love to
            connect.
          </p>
          <a
            href="mailto:meemansamalav@gmail.com"
            className="bg-signal hover:bg-signal/90 mt-12 inline-flex items-center gap-3 rounded-full px-8 py-4 text-base font-medium text-white transition-transform hover:scale-[1.02]"
          >
            meemansamalav@gmail.com
            <span aria-hidden>→</span>
          </a>

          <ul className="font-mono-ui text-muted-foreground mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.25em]">
            <li>
              <a href="tel:+919911512052" className="hover:text-foreground transition-colors">
                +91 99115 12052
              </a>
            </li>
            <li aria-hidden className="bg-foreground/20 hidden h-1 w-1 rounded-full sm:block" />
            <li>
              <a
                href="https://www.linkedin.com/in/meemansa-malav"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-foreground transition-colors"
              >
                LinkedIn ↗
              </a>
            </li>
          </ul>
        </div>

        <footer className="font-mono-ui text-muted-foreground mx-auto mt-32 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-[10px] uppercase tracking-[0.3em]">
          <span>© MMXXVI · Meemansa Malav</span>
          <span>The Un-Resume</span>
        </footer>
      </section>

      <div
        className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 px-4 pb-4 transition-all duration-500 sm:px-6 sm:pb-6 ${
          show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="paper-card pointer-events-auto mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-full px-5 py-3 sm:px-6">
          <p className="text-foreground/90 min-w-0 truncate text-sm sm:text-base">
            Looking for someone worth hiring?{" "}
            <span className="text-muted-foreground hidden sm:inline">Let's talk.</span>
          </p>
          <a
            href="mailto:meemansamalav@gmail.com"
            className="bg-signal hover:bg-signal/90 font-mono-ui shrink-0 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white transition-colors"
          >
            Email →
          </a>
        </div>
      </div>
    </>
  );
}
