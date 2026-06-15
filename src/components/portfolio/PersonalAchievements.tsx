import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import meema1 from "@/assets/meema.mp4.asset.json";
import meema2 from "@/assets/meema-2.mp4.asset.json";
import meema3 from "@/assets/meema-3.mp4.asset.json";
import meema4 from "@/assets/meema-4.mp4.asset.json";
import meema5 from "@/assets/meema-5.mp4.asset.json";

const reels = [
  {
    src: meema1.url,
    title: "Home, Re-defined",
    body: "Moving to an unknown city and quietly making it mine — one street, one chai stall, one neighbour at a time.",
  },
  {
    src: meema2.url,
    title: "Solo to Landour",
    body: "A trip I planned for myself, by myself. Pine trees, paperbacks, and the kind of silence that re-introduces you to you.",
  },
  {
    src: meema3.url,
    title: "Mic in Hand",
    body: "Anchoring a large-scale college event in front of a packed auditorium — nerves, cue cards, and a steady voice on stage.",
  },
  {
    src: meema4.url,
    title: "First Flight, Alone",
    body: "Boarding pass, backpack, no chaperone. A small rite of passage that taught me I can handle the in-between just fine.",
  },
  {
    src: meema5.url,
    title: "Bangalore at 22",
    body: "New city, new job, new everything — choosing the unfamiliar on purpose because comfort was never the plan.",
  },
];

export function PersonalAchievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Infinite scroll offset
  const [scrollPos, setScrollPos] = useState(0);
  const [targetScrollPos, setTargetScrollPos] = useState(0);
  
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const velocity = useRef(0);
  const lastTime = useRef(0);
  const lastX = useRef(0);

  // Smooth easing loop
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      if (!isDragging.current) {
        // Apply friction
        velocity.current *= 0.94;
        setTargetScrollPos((prev) => prev - velocity.current);

        // Smoothly lerp actual scroll position to target scroll position
        setScrollPos((prev) => {
          const diff = targetScrollPos - prev;
          // Easing factor: 0.12
          return prev + diff * 0.12;
        });
      } else {
        // When dragging, follow target immediately
        setScrollPos((prev) => prev + (targetScrollPos - prev) * 0.25);
      }
      
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [targetScrollPos]);

  // Touch and Mouse handlers
  const handleDragStart = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
    startScroll.current = targetScrollPos;
    velocity.current = 0;
    lastTime.current = performance.now();
    lastX.current = clientX;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging.current) return;
    const deltaX = clientX - startX.current;
    
    // Scale drag delta for visual mapping
    setTargetScrollPos(startScroll.current - deltaX * 1.2);

    // Track instant velocity for flick gesture
    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      const dx = clientX - lastX.current;
      velocity.current = dx / dt * 15; // drag velocity factor
    }
    lastTime.current = now;
    lastX.current = clientX;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  // Trackpad / wheel scroll support
  const handleWheel = (e: React.WheelEvent) => {
    setTargetScrollPos((prev) => prev + e.deltaY * 0.5);
  };

  // Dimensions for cylindrical math
  const cardWidth = 240;
  const cardSpacing = 300;
  const totalWidth = reels.length * cardSpacing;

  return (
    <section className="relative py-32 overflow-hidden grid-bg">
      <div className="absolute inset-0 halftone opacity-20 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <header className="mb-16 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-end">
          <p className="font-mono-ui text-muted-foreground text-[11px] uppercase tracking-[0.35em]">
            03 — Personal Achievements
          </p>
          <h2 className="font-display max-w-3xl text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl">
            The small leaps that
            <span className="text-muted-foreground italic"> shaped me.</span>
          </h2>
        </header>
      </div>

      {/* 3D Panorama Track Area */}
      <ScrollReveal animation="zoom-in">
        <div
          ref={containerRef}
          onWheel={handleWheel}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
          data-cursor="drag"
          className="relative flex h-[480px] w-full items-center justify-center perspective-1000 select-none cursor-grab active:cursor-grabbing overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          }}
        >
          <div className="absolute flex w-full justify-center preserve-3d pointer-events-none">
            {reels.map((r, i) => {
              // Mathematical layout along infinite circular cylinder
              let relativeX = (i * cardSpacing - scrollPos) % totalWidth;
              
              // Wrap coordinates back/forth
              if (relativeX > totalWidth / 2) relativeX -= totalWidth;
              if (relativeX < -totalWidth / 2) relativeX += totalWidth;

              // Normalized value representing horizontal position relative to track center (-1 to 1)
              const containerWidth = containerRef.current?.offsetWidth || 1000;
              const normX = relativeX / (containerWidth / 2.5);

              // 3D cylindrical mapping variables
              const rotateY = normX * 28; // curve angle
              const translateZ = -Math.abs(normX) * 110; // offset depth
              const scale = 1 - Math.abs(normX) * 0.12; // size squeeze in perspective
              const opacity = Math.max(0.2, 1 - Math.abs(normX) * 0.85); // fading away on boundary

              return (
                <div
                  key={i}
                  className="absolute pointer-events-auto"
                  style={{
                    width: `${cardWidth}px`,
                    transform: `translateX(${relativeX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity: opacity,
                    zIndex: Math.round(100 - Math.abs(normX) * 100),
                    transition: isDragging.current ? "none" : "transform 0.1s ease-out, opacity 0.1s ease-out",
                    willChange: "transform, opacity",
                  }}
                >
                  <CarouselCard reel={r} index={i} />
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Decorative slider cue */}
      <div className="text-center font-mono-ui text-[9px] uppercase tracking-[0.3em] text-muted-foreground mt-8 flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-white/10" />
        Swipe or scroll to navigate reels
        <span className="h-px w-8 bg-white/10" />
      </div>
    </section>
  );
}

// Inner card component that handles autoplay and cursor states
function CarouselCard({ reel, index }: { reel: typeof reels[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <figure
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="play"
      className="paper-card grain group relative w-full h-[380px] rounded-lg overflow-hidden border border-white/10 bg-[#0f0f0fbf] shadow-2xl transition-all duration-300"
    >
      <div className="relative h-[250px] w-full overflow-hidden border-b border-white/5">
        <video
          ref={videoRef}
          src={reel.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            background: isPlaying
              ? "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.1) 40%, transparent 100%)"
              : "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 60%, rgba(10,10,10,0.5) 100%)",
          }}
        />

        {/* Dynamic scanning overlays */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 halftone" />

        <span className="font-mono-ui bg-black/5 border border-black/10 absolute right-3 top-3 px-2 py-1 text-[8px] uppercase tracking-[0.25em] text-foreground rounded backdrop-blur-sm">
          REEL 0{index + 1}
        </span>

        {/* Video state visual cue indicator */}
        <div className="absolute left-4 bottom-4 flex items-center gap-2">
          <span className={`inline-block h-2 w-2 rounded-full ${isPlaying ? "bg-signal animate-pulse" : "bg-white/30"}`} />
          <span className="font-mono-ui text-[8px] uppercase tracking-[0.2em] text-foreground/80">
            {isPlaying ? "Playing preview" : "Hover to play"}
          </span>
        </div>
      </div>

      <figcaption className="p-4 text-left">
        <h4 className="font-display text-base font-bold text-foreground transition-colors group-hover:text-signal">
          {reel.title}
        </h4>
        <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed line-clamp-3">
          {reel.body}
        </p>
      </figcaption>
    </figure>
  );
}
