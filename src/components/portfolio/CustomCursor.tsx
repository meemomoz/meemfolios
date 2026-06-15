import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [accent, setAccent] = useState("#00F0FF");
  const [cursorType, setCursorType] = useState<string | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on mobile/touch screens
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      
      // Instantly position dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorAttr = target.closest("[data-cursor]");
      if (cursorAttr) {
        const type = cursorAttr.getAttribute("data-cursor");
        setCursorType(type);
      } else {
        setCursorType(null);
      }
    };

    const onAccent = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) setAccent(detail);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("vortex:accent", onAccent as EventListener);

    // Dynamic easing loop for outer ring
    let raf = 0;
    const updateRing = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      const dx = targetX - ringPosRef.current.x;
      const dy = targetY - ringPosRef.current.y;

      // Lerp coefficient (0.15) for fluid spring effect
      ringPosRef.current.x += dx * 0.15;
      ringPosRef.current.y += dy * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0)`;
      }

      raf = requestAnimationFrame(updateRing);
    };
    updateRing();

    // Hide native cursor
    document.documentElement.style.cursor = "none";
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      a, button, select, input, [role="button"], .draggable-item {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("vortex:accent", onAccent as EventListener);
      document.documentElement.style.cursor = "";
      styleTag.remove();
    };
  }, []);

  if (!mounted) return null;

  const getCursorLabel = () => {
    switch (cursorType) {
      case "view":
        return "VIEW";
      case "drag":
        return "DRAG";
      case "play":
        return "PLAY";
      case "tap":
        return "TAP";
      case "close":
        return "CLOSE";
      default:
        return "";
    }
  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[100] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-multiply"
        style={{
          backgroundColor: accent,
          transition: "width 0.2s, height 0.2s, background-color 0.3s",
          width: cursorType === "view" ? "48px" : cursorType === "close" ? "48px" : "12px",
          height: cursorType === "view" ? "48px" : cursorType === "close" ? "48px" : "12px",
        }}
      >
        {cursorType === "view" && (
          <span className="absolute inset-0 flex items-center justify-center text-[8px] uppercase tracking-widest text-white/90 font-mono">
            View
          </span>
        )}
        {cursorType === "close" && (
          <span className="absolute inset-0 flex items-center justify-center text-[8px] uppercase tracking-widest text-white/90 font-mono">
            Close
          </span>
        )}
      </div>

      {/* Trailing outline ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-50 mix-blend-multiply"
        style={{
          borderColor: accent,
          transition: "width 0.2s, height 0.2s, border-color 0.3s, opacity 0.2s",
          width: cursorType ? "64px" : "40px",
          height: cursorType ? "64px" : "40px",
          opacity: cursorType ? 0 : 0.5,
        }}
      />
    </>
  );
}
