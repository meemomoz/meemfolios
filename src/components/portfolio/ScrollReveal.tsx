import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-in" | "zoom-in" | "skew-up" | "slide-left" | "slide-right";
  duration?: number; // milliseconds
  delay?: number; // milliseconds
  threshold?: number; // 0 to 1
  cascadeIndex?: number; // for staggered lists
  className?: string;
}

export function ScrollReveal({
  children,
  animation = "fade-up",
  duration = 800,
  delay = 0,
  threshold = 0.1,
  cascadeIndex = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, stop observing
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // triggers slightly before entering
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getAnimationStyles = () => {
    if (isVisible) {
      return {
        opacity: 1,
        transform: "none",
        filter: "blur(0px)",
      };
    }

    const initialStyles: Record<string, string> = {
      opacity: "0",
      filter: "blur(4px)",
    };

    switch (animation) {
      case "fade-up":
        initialStyles.transform = "translate3d(0, 45px, 0)";
        break;
      case "fade-in":
        initialStyles.transform = "none";
        break;
      case "zoom-in":
        initialStyles.transform = "scale3d(0.94, 0.94, 1)";
        break;
      case "skew-up":
        initialStyles.transform = "translate3d(0, 60px, 0) skewY(2deg)";
        break;
      case "slide-left":
        initialStyles.transform = "translate3d(60px, 0, 0)";
        break;
      case "slide-right":
        initialStyles.transform = "translate3d(-60px, 0, 0)";
        break;
    }

    return initialStyles;
  };

  const finalDelay = delay + cascadeIndex * 120; // Stagger factor

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...getAnimationStyles(),
        transitionProperty: "opacity, transform, filter",
        transitionDuration: `${duration}ms`,
        transitionDelay: `${finalDelay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
    </div>
  );
}

// Sub-component specifically for cinematic splitting of text/headers
interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  highlightText?: string;
  highlightClass?: string;
}

export function RevealText({
  text,
  className = "",
  delay = 0,
  highlightText,
  highlightClass = "text-signal italic",
}: RevealTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, wordIdx) => {
        const isHighlighted = highlightText && word.toLowerCase().includes(highlightText.toLowerCase());
        
        return (
          <span
            key={wordIdx}
            className="inline-block overflow-hidden mr-[0.25em] pb-[0.05em] vertical-align-bottom"
          >
            <span
              className={`inline-block transition-transform duration-1000 ${
                isHighlighted ? highlightClass : ""
              }`}
              style={{
                transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 105%, 0)",
                transitionDelay: `${delay + wordIdx * 45}ms`,
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {word}
            </span>
          </span>
        );
      })}
    </span>
  );
}
