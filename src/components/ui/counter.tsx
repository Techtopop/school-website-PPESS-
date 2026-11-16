import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useLite } from "@/lib/prefs";

export function Counter({ to, suffix = "", format = false }: { to: number; suffix?: string; format?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reducePref = useReducedMotion();
  const { lite } = useLite();
  const reduce = reducePref || lite;
  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    if (reduce) { el.textContent = to + suffix; return; }
    const c = animate(0, to, {
      duration: 1.8, ease: "easeOut",
      onUpdate: (v) => { el.textContent = (format ? Math.round(v).toLocaleString() : Math.round(v)) + suffix; },
    });
    return () => c.stop();
  }, [inView, to, suffix, format, reduce]);
  return <span ref={ref}>0{suffix}</span>;
}
