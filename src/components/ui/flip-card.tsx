import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Card that flips on hover, focus or tap to reveal the back side. */
export function FlipCard({ front, back, className }: { front: ReactNode; back: ReactNode; className?: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={flipped}
      onClick={() => setFlipped((f) => !f)}
      className={cn("group block w-full text-left [perspective:1000px]", className)}
    >
      <div
        className={cn(
          "relative aspect-[4/5] w-full transition-transform duration-700 [transform-style:preserve-3d] motion-reduce:transition-none",
          "group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        <div className="absolute inset-0 overflow-hidden rounded-2xl bg-white shadow-md [backface-visibility:hidden]">{front}</div>
        <div className="absolute inset-0 overflow-auto rounded-2xl bg-brand p-6 text-white shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)]">{back}</div>
      </div>
    </button>
  );
}
