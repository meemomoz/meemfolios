import { useEffect, useState } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Evidence", href: "#evidence" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 ${
          scrolled ? "paper-card rounded-full px-4" : ""
        }`}
        style={scrolled ? { marginLeft: "1rem", marginRight: "1rem" } : undefined}
      >
        <a href="#top" className="group flex items-center gap-3">
          <span
            className="font-display text-2xl font-extrabold leading-none tracking-tight"
            aria-hidden="true"
          >
            <span className="text-foreground">M</span>
            <span className="text-signal">M</span>
          </span>
          <span className="font-mono-ui hidden text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:inline">
            Meemansa&nbsp;·&nbsp;Malav
          </span>
        </a>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono-ui rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
