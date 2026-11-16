import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FLOW, WordReveal, useCalm } from "@/components/ui/fluid";

export function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro: string; image?: string }) {
  const ref = useRef<HTMLElement>(null);
  const calm = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);

  return (
    <header ref={ref} className="relative overflow-hidden bg-brand px-4 pb-20 pt-36 text-white sm:px-6 sm:pb-28 sm:pt-44">
      {image && (
        <motion.img src={image} alt="" style={calm ? undefined : { y: imgY, scale: imgScale }} className="absolute inset-0 h-full w-full object-cover opacity-25" />
      )}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(200,48,47,0.35),transparent_55%)]" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.p
          className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-white/80"
          initial={calm ? false : { opacity: 0, letterSpacing: "0.7em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1.2, ease: FLOW }}
        >
          {eyebrow}
        </motion.p>
        <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] sm:text-6xl">
          <WordReveal text={title} delay={0.15} />
        </h1>
        <motion.p
          className="mt-6 max-w-2xl text-lg text-white/85"
          initial={calm ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease: FLOW }}
        >
          {intro}
        </motion.p>
      </div>
      <div aria-hidden className="dhaka absolute inset-x-0 bottom-0" />
    </header>
  );
}
