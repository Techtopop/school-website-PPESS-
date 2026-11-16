import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PerspectiveTunnelHero, { type TunnelImage } from "@/components/ui/perspective-tunnel-hero";
import HeroSlideshow from "@/components/HeroSlideshow";
import { school } from "@/data/school";
import { Magnetic } from "@/components/ui/fluid";
import { useLang } from "@/lib/i18n";
import { useLite } from "@/lib/prefs";

// Different slices of the real school photos; positions pick the crop shown on each card.
const heroImages: TunnelImage[] = [
  { src: "/images/lite/building.jpg", title: "Our campus", alt: "The Pawan Prakriti School building", position: "50% 50%" },
  { src: "/images/lite/students.jpg", title: "Our students", alt: "Students gathered in the school courtyard", position: "50% 70%" },
  { src: "/images/lite/building.jpg", title: "School entrance", alt: "School entrance and flags", position: "35% 60%" },
  { src: "/images/lite/students.jpg", title: "Students & teachers", alt: "Teachers and students at the school", position: "12% 60%" },
  { src: "/images/lite/karate.jpg", title: "Karate practice", alt: "Students practising karate in the courtyard", position: "50% 60%" },
  { src: "/images/lite/building.jpg", title: "Our building", alt: "Blue-glass wing of the school building", position: "90% 30%" },
  { src: "/images/lite/students.jpg", title: "Class photo", alt: "Class group photo", position: "85% 60%" },
];

/**
 * Scroll-driven intro: the tunnel flies by, then a small circle opens at the
 * centre and grows until it fills the screen as the school's landing view.
 */
/** Lite mode: a plain, fast landing view instead of the scroll-driven animation. */
function LiteIntro() {
  const { t } = useLang();
  return (
    <section aria-label="Welcome" className="relative flex min-h-[100svh] items-center justify-center bg-brand">
      <img src="/images/lite/building.jpg" alt="The Pawan Prakriti School building" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/55 to-brand/35" />
      <div className="relative z-10 max-w-3xl px-6 pt-20 text-center text-white">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-white/80">{t("Tikathali · Lalitpur · Nepal", "टीकाथली · ललितपुर · नेपाल")}</p>
        <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl">{t(school.name, school.nameNe)}</h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-white/90 sm:text-lg">
          {t("Quality, practical education from playgroup to Grade 10 — since 2048 B.S.", "प्लेग्रुपदेखि कक्षा १० सम्म गुणस्तरीय, व्यावहारिक शिक्षा — वि.सं. २०४८ देखि")}
        </p>
        <p className="mt-5 font-display text-xl italic sm:text-2xl">“{t(school.motto, school.mottoNe)}”</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/admissions" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-semibold text-white">
            {t("Admissions & Inquiry", "भर्ना तथा जिज्ञासा")} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link to="/about" className="rounded-full border border-white/70 bg-white/10 px-7 py-3 font-semibold text-white">{t("Explore Our School", "हाम्रो विद्यालय हेर्नुहोस्")}</Link>
        </div>
      </div>
    </section>
  );
}

export default function Intro() {
  const { lite } = useLite();
  return lite ? <LiteIntro /> : <ScrollIntro />;
}

function ScrollIntro() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const tunnel = useTransform(scrollYProgress, [0, 0.62], [0, 1], { clamp: true });
  const radius = useTransform(scrollYProgress, [0.55, 0.92], [0, 80], { ease: (t) => t * t * (3 - 2 * t) });
  const clipPath = useTransform(radius, (r) => `circle(${r}vmax at 50% 50%)`);
  const ringSize = useTransform(radius, (r) => `${r * 2}vmax`);
  const ringOpacity = useTransform(scrollYProgress, [0.55, 0.6, 0.85, 0.92], [0, 1, 1, 0]);
  const photoScale = useTransform(scrollYProgress, [0.55, 1], [1.45, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.82, 0.95], [30, 0]);

  return (
    <div ref={ref} className="relative h-[520svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <PerspectiveTunnelHero
          images={heroImages}
          progress={tunnel}
          eyebrow={t("English Secondary School", "इङ्लिस सेकेन्डरी स्कुल")}
          headline={t("PAWAN|PRAKRITI", "पवन|प्रकृति").split("|")}
          description={t("Tikathali, Lalitpur · Est. 2048 B.S. Scroll to explore our school.", "टीकाथली, ललितपुर · स्थापना वि.सं. २०४८। विद्यालय हेर्न स्क्रोल गर्नुहोस्।")}
          scrollPrompt={t("Scroll to explore", "स्क्रोल गर्नुहोस्")}
        />

        {/* Growing circle edge */}
        <motion.div
          aria-hidden
          style={{ width: ringSize, height: ringSize, opacity: ringOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 shadow-[0_0_60px_rgba(200,48,47,0.35)]"
        />

        {/* Website landing view, revealed through the circle */}
        <motion.section
          aria-label="Welcome"
          style={{ clipPath, WebkitClipPath: clipPath }}
          className="absolute inset-0 z-10 flex items-center justify-center bg-brand"
        >
          <motion.div style={{ scale: photoScale }} className="absolute inset-0">
            <HeroSlideshow />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/50 to-brand/30" />
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="relative z-10 max-w-3xl px-6 text-center text-white"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-white/75">{t("Tikathali · Lalitpur · Nepal", "टीकाथली · ललितपुर · नेपाल")}</p>
            <h2 className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
              {t(school.name, school.nameNe)}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/85 sm:text-lg">
              {t("Quality, practical education from playgroup to Grade 10 — since 2048 B.S.", "प्लेग्रुपदेखि कक्षा १० सम्म गुणस्तरीय, व्यावहारिक शिक्षा — वि.सं. २०४८ देखि")}
            </p>
            <p className="mt-5 font-display text-xl italic text-white sm:text-2xl">“{t(school.motto, school.mottoNe)}”</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Magnetic><Link to="/admissions" data-ripple className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-7 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-brand">
                {t("Admissions & Inquiry", "भर्ना तथा जिज्ञासा")} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link></Magnetic>
              <Magnetic><Link to="/about" data-ripple className="relative block overflow-hidden rounded-full border border-white/60 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur transition-colors hover:bg-white/25">
                {t("Explore Our School", "हाम्रो विद्यालय हेर्नुहोस्")}
              </Link></Magnetic>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
