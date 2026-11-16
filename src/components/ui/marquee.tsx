import type { ReactNode } from "react";

/** Endless horizontal ticker. Pauses on hover; static for reduced motion. */
export function Marquee({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] ${className}`}>
      {[0, 1].map((i) => (
        <div key={i} aria-hidden={i === 1} className="marquee-track flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
          {children}
        </div>
      ))}
    </div>
  );
}
