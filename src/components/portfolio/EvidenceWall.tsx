import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import anshulAsset from "@/assets/anshul.png.asset.json";
import ankitaAsset from "@/assets/ankita.png.asset.json";
import riyaAsset from "@/assets/riya.png.asset.json";

interface Card {
  id: string;
  name: string;
  role: string;
  image: string;
  initialX: number; // percentage from left
  initialY: number; // pixels from top
  tilt: number;
  tint: string;
  linkedin: string;
  testimonial: string;
}

const initialCards: Card[] = [
  {
    id: "anshul",
    name: "Anshul Mandloi",
    role: "Director · Agnihotri Securities",
    image: anshulAsset.url,
    initialX: 12,
    initialY: 80,
    tilt: -4,
    tint: "#00F0FF",
    linkedin: "https://www.linkedin.com/in/meemansa-malav",
    testimonial:
      "Meemansa brings a rare combination of structural thinking and empathy. During our collaboration, she demonstrated outstanding leadership in mapping stakeholder journeys and aligning event pipelines. She has an natural ability to connect, lead, and execute under pressure.",
  },
  {
    id: "ankita",
    name: "Ankita Pattnaik",
    role: "HR · Brandzzy–Larapush",
    image: ankitaAsset.url,
    initialX: 42,
    initialY: 150,
    tilt: 3,
    tint: "#f5a524",
    linkedin: "https://www.linkedin.com/in/meemansa-malav",
    testimonial:
      "A absolute force in brand storytelling and growth marketing. Meemansa has a deep psychology-first approach that transforms cold prospects into loyal community advocates. Her energy is infectious, and her focus on data-backed empathy makes her an invaluable team asset.",
  },
  {
    id: "riya",
    name: "Riya Chopra",
    role: "Senior Associate · Times Internet",
    image: riyaAsset.url,
    initialX: 72,
    initialY: 90,
    tilt: -2,
    tint: "#4fd1c5",
    linkedin: "https://www.linkedin.com/in/meemansa-malav",
    testimonial:
      "Working with Meemansa at Times Internet was fantastic. She managed the student and brand outreach for TSAC & Mic Drop Madness with complete ownership. In less than 20 days, she built a thriving community footprint from scratch. Truly a self-starter who makes things happen.",
  },
];

export function EvidenceWall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1000);

  // Drag positions state for each card
  const [offsets, setOffsets] = useState<Record<string, { x: number; y: number }>>({
    anshul: { x: 0, y: 0 },
    ankita: { x: 0, y: 0 },
    riya: { x: 0, y: 0 },
  });

  // Track which card is on top
  const [activeZIndex, setActiveZIndex] = useState<Record<string, number>>({
    anshul: 10,
    ankita: 10,
    riya: 10,
  });

  // Testimonial flipped states
  const [flipped, setFlipped] = useState<Record<string, boolean>>({
    anshul: false,
    ankita: false,
    riya: false,
  });

  const [topId, setTopId] = useState<string>("ankita");
  const [pinCenter, setPinCenter] = useState({ x: 500, y: 30 });

  // Update central pin position on resize
  useEffect(() => {
    const updatePin = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setContainerWidth(w);
        setPinCenter({
          x: w / 2,
          y: 40,
        });
      }
    };
    updatePin();
    window.addEventListener("resize", updatePin);
    return () => window.removeEventListener("resize", updatePin);
  }, []);

  const bringToFront = (id: string) => {
    setTopId(id);
    setActiveZIndex((prev) => {
      const maxZ = Math.max(...Object.values(prev));
      return {
        ...prev,
        [id]: maxZ + 1,
      };
    });
  };

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    bringToFront(id);
  };

  // Draggable node math helper
  const handleDrag = (
    id: string,
    clientX: number,
    clientY: number,
    startX: number,
    startY: number,
    startOffset: { x: number; y: number },
  ) => {
    const dx = clientX - startX;
    const dy = clientY - startY;
    setOffsets((prev) => ({
      ...prev,
      [id]: {
        x: startOffset.x + dx,
        y: startOffset.y + dy,
      },
    }));
  };

  return (
    <section id="evidence" className="relative px-6 py-32 overflow-hidden grid-bg">
      <div className="absolute inset-0 halftone opacity-25 pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <header className="mb-14 grid gap-6 sm:grid-cols-[auto_1fr] sm:items-end">
          <p className="font-mono-ui text-muted-foreground text-[11px] uppercase tracking-[0.35em]">
            02 — Recommendations
          </p>
          <h2 className="font-display max-w-3xl text-4xl font-semibold leading-[0.95] tracking-tight sm:text-6xl text-white">
            Conspiracy Board.
            <span className="text-muted-foreground italic">
              {" "}
              Grab and drag cards to reorganise.
            </span>
          </h2>
        </header>

        {/* Board corkboard area */}
        <ScrollReveal animation="zoom-in">
          <div
            ref={containerRef}
            className="relative h-[650px] w-full rounded-lg border border-white/10 bg-[#0c0c0ced] p-4 overflow-hidden"
            style={{
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.8)",
            }}
          >
            {/* SVG Connections Canvas for Conspiracy Yarn Threads */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              {initialCards.map((c) => {
                // Calculate actual coordinates for lines in real-time
                const cardWidth = 240;
                const cardHeight = 280;
                const startLeft = (c.initialX / 100) * containerWidth;
                const currentX = startLeft + offsets[c.id].x + cardWidth / 2;
                const currentY = c.initialY + offsets[c.id].y + 30; // yarn attached to top-middle of card

                return (
                  <g key={c.id}>
                    {/* Glowing background path line */}
                    <path
                      d={`M ${pinCenter.x} ${pinCenter.y} Q ${(pinCenter.x + currentX) / 2} ${(pinCenter.y + currentY) / 2 - 30}, ${currentX} ${currentY}`}
                      fill="none"
                      stroke={c.tint}
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                      className="opacity-20"
                    />
                    <path
                      d={`M ${pinCenter.x} ${pinCenter.y} Q ${(pinCenter.x + currentX) / 2} ${(pinCenter.y + currentY) / 2 - 20}, ${currentX} ${currentY}`}
                      fill="none"
                      stroke="rgba(255, 0, 255, 0.6)"
                      strokeWidth="1.5"
                      className="opacity-70"
                    />
                    <circle
                      cx={currentX}
                      cy={currentY}
                      r="4"
                      fill="#00F0FF"
                      className="animate-pulse shadow-[0_0_10px_#00F0FF]"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Central Main pushpin anchor on board */}
            <div
              className="absolute z-10 w-4 h-4 rounded-full bg-slate-300 border border-white/50 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.5)] pointer-events-none flex items-center justify-center backdrop-blur-md"
              style={{
                left: `${pinCenter.x}px`,
                top: `${pinCenter.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white/60 absolute top-0.5 left-0.5" />
            </div>

            {/* Scattered Cards */}
            {initialCards.map((c) => {
              const cardOffset = offsets[c.id];
              const zIndex = activeZIndex[c.id];
              const isFlipped = flipped[c.id];

              return (
                <DraggablePolaroid
                  key={c.id}
                  card={c}
                  offset={cardOffset}
                  zIndex={zIndex}
                  isFlipped={isFlipped}
                  isTop={topId === c.id}
                  onDragStart={() => bringToFront(c.id)}
                  onDrag={(clientX, clientY, startX, startY, startOffset) =>
                    handleDrag(c.id, clientX, clientY, startX, startY, startOffset)
                  }
                  onFlip={(e) => toggleFlip(c.id, e)}
                  onFocus={() => bringToFront(c.id)}
                />
              );
            })}

            <div className="absolute right-8 bottom-8 pointer-events-none opacity-25 font-mono text-[9px] uppercase tracking-[0.25em] text-white/50 text-right">
              SYSTEM CORRELATION PROTOCOL
              <br />
              OUTREACH · BRAND · MEDIA BUILDS
            </div>

            <div className="absolute left-8 bottom-8 pointer-events-none opacity-20 border border-dashed border-white/20 p-3 rounded text-[9px] font-mono text-muted-foreground max-w-xs">
              ⓘ VERIFY ALIBIS: LinkedIn referrals collected under system audit. Double-click or
              click [Flip Card] to read transcripts.
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

interface DraggableProps {
  card: Card;
  offset: { x: number; y: number };
  zIndex: number;
  isFlipped: boolean;
  isTop: boolean;
  onDragStart: () => void;
  onDrag: (
    cX: number,
    cY: number,
    sX: number,
    sY: number,
    startOffset: { x: number; y: number },
  ) => void;
  onFlip: (e: React.MouseEvent) => void;
  onFocus: () => void;
}

function DraggablePolaroid({
  card,
  offset,
  zIndex,
  isFlipped,
  isTop,
  onDragStart,
  onDrag,
  onFlip,
  onFocus,
}: DraggableProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const startOffset = useRef({ x: 0, y: 0 });
  const [localDragging, setLocalDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    onDragStart();
    setLocalDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    startOffset.current = { ...offset };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      onDrag(
        moveEvent.clientX,
        moveEvent.clientY,
        dragStart.current.x,
        dragStart.current.y,
        startOffset.current,
      );
    };

    const handleMouseUp = () => {
      setLocalDragging(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    onDragStart();
    setLocalDragging(true);
    const touch = e.touches[0];
    dragStart.current = { x: touch.clientX, y: touch.clientY };
    startOffset.current = { ...offset };

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const moveTouch = moveEvent.touches[0];
      onDrag(
        moveTouch.clientX,
        moveTouch.clientY,
        dragStart.current.x,
        dragStart.current.y,
        startOffset.current,
      );
    };

    const handleTouchEnd = () => {
      setLocalDragging(false);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onDoubleClick={onFlip}
      onClick={onFocus}
      data-cursor={isFlipped ? "tap" : "view"}
      className="absolute select-none cursor-grab active:cursor-grabbing transition-shadow duration-300"
      style={{
        left: `calc(${card.initialX}% + ${offset.x}px)`,
        top: `${card.initialY + offset.y}px`,
        zIndex: zIndex,
        transform: `rotate(${card.tilt}deg) scale(${isTop ? 1.04 : 1})`,
        boxShadow: localDragging
          ? "0 35px 70px -15px rgba(0,0,0,0.85)"
          : "0 15px 35px -10px rgba(0,0,0,0.6)",
        perspective: "1000px",
      }}
    >
      <div
        className="w-[250px] h-[310px] relative transition-transform duration-700 ease-out preserve-3d"
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div className="absolute inset-0 backface-hidden bg-[#faf8f4] p-3 pb-8 text-[#111] flex flex-col rounded-sm border border-white/20 shadow-inner">
          <div className="relative overflow-hidden bg-black aspect-square flex-1 border border-black/10">
            <img
              src={card.image}
              alt={card.name}
              draggable="false"
              className="block w-full h-full object-cover object-top filter grayscale contrast-115"
            />
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-tr from-cyan-400 via-transparent to-purple-400" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-slate-200 border border-white/60 rounded-full shadow-[inset_0_-1px_2px_rgba(0,0,0,0.4),0_2px_4px_rgba(0,0,0,0.5)]" />
          </div>

          <div className="mt-3.5 flex flex-col">
            <p className="font-display text-base font-extrabold tracking-tight leading-tight">
              {card.name}
            </p>
            <p className="font-mono-ui text-[8px] uppercase tracking-[0.2em] text-muted-foreground opacity-80 mt-1 truncate">
              {card.role}
            </p>
          </div>

          {/* Flip trigger button helper */}
          <button
            onClick={onFlip}
            className="absolute bottom-2 right-3 font-mono-ui text-[7px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 border border-black/10 px-1.5 py-0.5 rounded transition-opacity"
          >
            Flip Card ⟲
          </button>
        </div>

        {/* Back Face: handwritten/typewritten testimonial transcript */}
        <div
          className="absolute inset-0 backface-hidden bg-[#faf8f4] p-4 text-[#111] flex flex-col justify-between rounded-sm border border-white/20"
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* Technical verification header */}
          <div className="flex justify-between items-center border-b border-black/5 pb-2">
            <span className="font-mono text-[7px] uppercase tracking-[0.25em] text-cyan-600 font-bold">
              ✓ Verified referent
            </span>
            <span className="font-mono text-[6px] text-muted-foreground">
              REF: {card.id.toUpperCase()}-2026
            </span>
          </div>

          {/* Handwriting testimonial copy */}
          <p
            className="text-[11px] leading-relaxed text-left text-neutral-800 flex-1 my-3 overflow-y-auto pr-1"
            style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", fontWeight: 300 }}
          >
            "{card.testimonial}"
          </p>

          <div className="border-t border-black/5 pt-2 flex items-center justify-between">
            <div className="text-left">
              <span className="font-display text-[9px] font-bold block">{card.name}</span>
              <span className="font-mono text-[6px] uppercase text-muted-foreground block truncate max-w-[120px]">
                {card.role.split("·")[0]}
              </span>
            </div>

            <a
              href={card.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="bg-black hover:bg-neutral-800 text-white rounded font-mono text-[6px] uppercase tracking-[0.15em] px-2 py-1 transition-colors"
            >
              Verify ↗
            </a>
          </div>

          {/* Flip back card helper button */}
          <button
            onClick={onFlip}
            className="absolute top-2 right-2 font-mono-ui text-[6px] uppercase tracking-[0.2em] opacity-50 hover:opacity-100 px-1 py-0.5 rounded transition-opacity"
          >
            ⟲ Front
          </button>
        </div>
      </div>
    </div>
  );
}
