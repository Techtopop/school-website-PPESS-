import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface Slide {
  src: string;
  alt: string;
  caption: string;
  /** CSS object-position, so each slide frames a different part of its photo. */
  position: string;
  /** Starting zoom, to vary the framing of repeated photos. */
  zoom: number;
}

// Full, uncropped-looking frames of the school's real photos (no zoomed-in variants).
const slides: Slide[] = [
  { src: "/images/building_hd.jpg", alt: "The Pawan Prakriti School building and courtyard", caption: "Our school", position: "50% 55%", zoom: 1 },
  { src: "/images/students.jpg", alt: "Students and teachers gathered in the school courtyard", caption: "Our students", position: "50% 65%", zoom: 1 },
  { src: "/images/karate.jpg", alt: "Students in white uniforms practising karate in the school courtyard", caption: "Karate practice", position: "50% 88%", zoom: 1 },
];

const INTERVAL = 5500;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [reduce]);

  const slide = slides[index];

  return (
    <div className="absolute inset-0">
      <AnimatePresence initial={false}>
        <motion.img
          key={index}
          src={slide.src}
          srcSet={`${slide.src.replace("/images/", "/images/lite/").replace("building_hd", "building")} 900w, ${slide.src} 2000w`}
          sizes="100vw"
          alt={slide.alt}
          initial={{ opacity: 0, scale: slide.zoom }}
          animate={{ opacity: 1, scale: reduce ? slide.zoom : slide.zoom * 1.05 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.6 }, scale: { duration: (INTERVAL + 1600) / 1000, ease: "linear" } }}
          style={{ objectPosition: slide.position, transformOrigin: slide.position }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute bottom-6 left-6 z-20 hidden items-center gap-3 sm:flex" role="group" aria-label="Photo slideshow">
        {slides.map((s, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show photo ${i + 1}: ${s.caption}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? "w-10 bg-white" : "w-4 bg-white/45 hover:bg-white/70"}`}
          />
        ))}
        <span className="ml-2 text-xs font-semibold uppercase tracking-widest text-white/80" aria-live="polite">
          {slide.caption}
        </span>
      </div>
    </div>
  );
}
