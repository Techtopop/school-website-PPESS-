import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useLite } from "@/lib/prefs";
import { FLOW } from "@/components/ui/fluid";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { lite } = useLite();
  if (lite) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  eyebrow, title, children, className = "", id, dark = false,
}: { eyebrow?: string; title?: string; children: ReactNode; className?: string; id?: string; dark?: boolean }) {
  return (
    <section id={id} className={`px-4 py-20 sm:px-6 sm:py-28 ${dark ? "bg-brand text-white" : ""} ${className}`}>
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title) && (
          <Reveal className="mb-12 max-w-2xl">
            {(eyebrow || title) && <motion.span aria-hidden className="mb-5 block h-0.5 w-12 origin-left bg-accent" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: FLOW }} />}
            {eyebrow && <p className={`mb-3 text-xs font-bold uppercase tracking-[0.3em] ${dark ? "text-[#ff8f8a]" : "text-accent"}`}>{eyebrow}</p>}
            {title && <h2 className={`font-display text-3xl font-bold leading-tight sm:text-5xl ${dark ? "text-white" : "text-brand"}`}>{title}</h2>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
