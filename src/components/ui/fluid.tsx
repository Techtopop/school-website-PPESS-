import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useLite } from "@/lib/prefs";

/** Shared "water" easing and spring: smooth start, long soft landing. */
export const FLOW = [0.22, 1, 0.36, 1] as const;
export const SOFT_SPRING = { stiffness: 140, damping: 18, mass: 0.6 };

/** True when we should skip decorative motion (lite mode or reduced-motion preference). */
export function useCalm() {
  const { lite } = useLite();
  const reduce = useReducedMotion();
  return lite || !!reduce;
}

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => { setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches); }, []);
  return fine;
}

/** Headline that rises into place word by word, with a soft blur-in. */
export function WordReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const calm = useCalm();
  if (calm) return <span className={className}>{text}</span>;
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "105%", opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: delay + i * 0.07, ease: FLOW }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Button/link that leans gently toward the cursor. */
export function Magnetic({ children, strength = 0.3, className = "inline-block" }: { children: ReactNode; strength?: number; className?: string }) {
  const calm = useCalm();
  const fine = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), SOFT_SPRING);
  const y = useSpring(useMotionValue(0), SOFT_SPRING);
  if (calm || !fine) return <div className={className}>{children}</div>;
  const move = (e: PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => { x.set(0); y.set(0); };
  return <motion.div ref={ref} style={{ x, y }} onPointerMove={move} onPointerLeave={leave} className={className}>{children}</motion.div>;
}

/** Image that unveils from a soft rounded window while settling from a slight zoom. */
export function ImageReveal({ src, alt, width, height, className = "", imgClassName = "", style }: {
  src: string; alt: string; width?: number; height?: number; className?: string; imgClassName?: string; style?: React.CSSProperties;
}) {
  const calm = useCalm();
  if (calm) return <img src={src} alt={alt} width={width} height={height} loading="lazy" className={`${className} ${imgClassName}`} style={style} />;
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{ clipPath: "inset(14% 14% 14% 14% round 32px)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 16px)", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.3, ease: FLOW }}
    >
      <motion.img
        src={src} alt={alt} width={width} height={height} loading="lazy" style={style}
        className={`h-full w-full ${imgClassName}`}
        initial={{ scale: 1.3 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.8, ease: FLOW }}
      />
    </motion.div>
  );
}

/** Soft 3D tilt that follows the cursor. */
export function Tilt({ children, className = "", max = 5 }: { children: ReactNode; className?: string; max?: number }) {
  const calm = useCalm();
  const fine = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), SOFT_SPRING);
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), SOFT_SPRING);
  if (calm || !fine) return <div className={className}>{children}</div>;
  const move = (e: PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => { px.set(0); py.set(0); };
  return (
    <div className={className} style={{ perspective: 900 }}>
      <motion.div ref={ref} onPointerMove={move} onPointerLeave={leave} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="h-full">
        {children}
      </motion.div>
    </div>
  );
}

/** A large soft light that trails the cursor with a springy lag (desktop only). */
export function CursorGlow() {
  const calm = useCalm();
  const fine = useFinePointer();
  const x = useSpring(useMotionValue(-400), { stiffness: 45, damping: 18, mass: 0.8 });
  const y = useSpring(useMotionValue(-400), { stiffness: 45, damping: 18, mass: 0.8 });
  useEffect(() => {
    if (calm || !fine) return;
    const move = (e: globalThis.PointerEvent) => { x.set(e.clientX - 240); y.set(e.clientY - 240); };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [calm, fine, x, y]);
  if (calm || !fine) return null;
  return (
    <motion.div
      aria-hidden
      style={{ x, y, background: "radial-gradient(circle, rgba(200,48,47,0.22) 0%, rgba(61,88,168,0.16) 40%, transparent 70%)" }}
      className="no-print pointer-events-none fixed left-0 top-0 z-[5] h-[480px] w-[480px] rounded-full mix-blend-soft-light blur-2xl"
    />
  );
}

/** Smoothly expanding disclosure (FAQ). */
export function Disclosure({ question, children }: { question: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const calm = useCalm();
  return (
    <div className="py-5">
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-left font-display text-xl font-bold text-brand">
        {question}
        <motion.span aria-hidden animate={{ rotate: open ? 45 : 0 }} transition={{ duration: calm ? 0 : 0.5, ease: FLOW }} className="ml-4 text-2xl text-accent">+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: calm ? 0 : 0.6, ease: FLOW }} className="overflow-hidden"
          >
            <p className="pt-3 text-ink/75">{children}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
