import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Baby, BookOpen, GraduationCap, Sparkles, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useLite } from "@/lib/prefs";

interface Step { icon: LucideIcon; stage: string; stageNe: string; title: string; titleNe: string; text: string; textNe: string }

// Only verified facts: levels (CollegeNP), teaching approach (school's 2019 notice), Plus Two streams (CollegeNP — confirm).
const steps: Step[] = [
  { icon: Baby, stage: "Playgroup · Nursery", stageNe: "प्लेग्रुप · नर्सरी", title: "Learning begins with play", titleNe: "सिकाइ खेलबाट सुरु हुन्छ",
    text: "Gentle first years where teaching follows how young children think and grow — through activity, curiosity and care.",
    textNe: "बालमनोविज्ञान अनुसार गतिविधि, जिज्ञासा र माया मार्फत सिकाउने कोमल सुरुवाती वर्षहरू।" },
  { icon: BookOpen, stage: "Primary · Lower Secondary", stageNe: "प्राथमिक · निम्न माध्यमिक", title: "Learning by doing", titleNe: "गरेर सिक्ने",
    text: "Project-based and activity-based lessons, supported by audio-visual teaching, build strong foundations and confident learners.",
    textNe: "परियोजना र गतिविधिमा आधारित पाठ, श्रव्यदृश्य शिक्षणसहित, बलियो जग र आत्मविश्वासी विद्यार्थी बनाउँछ।" },
  { icon: GraduationCap, stage: "Secondary · Grade 10", stageNe: "माध्यमिक · कक्षा १०", title: "Ready for the SEE", titleNe: "SEE का लागि तयार",
    text: "Focused preparation for the Secondary Education Examination, with labs, library and teachers who know every student.",
    textNe: "प्रयोगशाला, पुस्तकालय र हरेक विद्यार्थीलाई चिन्ने शिक्षकसहित माध्यमिक शिक्षा परीक्षाको केन्द्रित तयारी।" },
  { icon: Sparkles, stage: "Plus Two", stageNe: "प्लस टु", title: "Choose your path", titleNe: "आफ्नो बाटो रोज्नुहोस्",
    text: "Science, Management, Humanities and Law streams for the next step (please confirm current streams with the school).",
    textNe: "अर्को चरणका लागि विज्ञान, व्यवस्थापन, मानविकी र कानून संकाय (हालको संकाय विद्यालयसँग पुष्टि गर्नुहोस्)।" },
];

function Card({ s, big = false }: { s: Step; big?: boolean }) {
  const { t } = useLang();
  return (
    <>
      <s.icon className={big ? "h-12 w-12 text-[#ff8f8a]" : "h-8 w-8 text-accent"} aria-hidden />
      <p className={`mt-4 text-xs font-bold uppercase tracking-[0.3em] ${big ? "text-white/75" : "text-ink/70"}`}>{t(s.stage, s.stageNe)}</p>
      <h3 className={`mt-2 font-display font-bold ${big ? "text-4xl sm:text-6xl" : "text-2xl text-brand"}`}>{t(s.title, s.titleNe)}</h3>
      <p className={`mt-4 max-w-xl ${big ? "text-lg text-white/85" : "text-ink/75"}`}>{t(s.text, s.textNe)}</p>
    </>
  );
}

/** Pinned scroll story: a child's path from Playgroup to Plus Two. */
export default function Journey() {
  const { lite } = useLite();
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.min(steps.length - 1, Math.floor(p * steps.length))));
  const line = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (lite) {
    return (
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 font-display text-3xl font-bold text-brand">{t("A child's journey with us", "हामीसँग बच्चाको यात्रा")}</h2>
          <ol className="space-y-8 border-l-2 border-accent pl-6">
            {steps.map((s) => <li key={s.stage}><Card s={s} /></li>)}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <div ref={ref} className="relative h-[320svh] bg-brand text-white" aria-label={t("A child's journey with us", "हामीसँग बच्चाको यात्रा")}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-4 sm:px-6">
        <div aria-hidden className="dhaka absolute inset-x-0 top-0 opacity-80" />
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#ff8f8a]">{t("A child's journey with us", "हामीसँग बच्चाको यात्रा")}</p>

          <div className="relative mt-6 mb-10 h-1 rounded bg-white/20" aria-hidden>
            <motion.div style={{ width: line }} className="h-full rounded bg-accent" />
            <div className="absolute inset-x-0 -top-2.5 flex justify-between">
              {steps.map((_, i) => (
                <span key={i} className={`h-6 w-6 rounded-full border-2 transition-colors duration-500 ${i <= active ? "border-accent bg-accent" : "border-white/40 bg-brand"}`} />
              ))}
            </div>
          </div>

          <div className="relative min-h-[24rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45 }}>
                <span aria-hidden className="absolute -top-8 right-0 select-none font-display text-[10rem] font-bold leading-none text-white/10 sm:text-[16rem]">{active + 1}</span>
                <div className="relative"><Card s={steps[active]} big /></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
