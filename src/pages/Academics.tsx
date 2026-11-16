import { Baby, BookOpen, GraduationCap, FlaskConical, Briefcase, Landmark, Scale } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { usePageMeta } from "@/lib/usePageMeta";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Section } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import Cta from "@/components/Cta";
import Journey from "@/components/Journey";
import { images } from "@/data/school";

const levels = [
  { icon: Baby, title: "Early Years", ne: "प्रारम्भिक बाल्यकाल", range: "Playgroup – Nursery", neRange: "प्लेग्रुप – नर्सरी", text: "Gentle, play-based beginnings with caring teachers.", neText: "मायालु शिक्षकसँग खेलमा आधारित कोमल सुरुवात।" },
  { icon: BookOpen, title: "Primary & Lower Secondary", ne: "प्राथमिक तथा निम्न माध्यमिक", range: "Foundation years", neRange: "आधार वर्षहरू", text: "Project- and activity-based learning that builds strong basics.", neText: "बलियो जग बनाउने परियोजना र गतिविधिमा आधारित सिकाइ।" },
  { icon: GraduationCap, title: "Secondary", ne: "माध्यमिक", range: "Up to Grade 10 (SEE)", neRange: "कक्षा १० (SEE) सम्म", text: "Focused preparation for the Secondary Education Examination.", neText: "माध्यमिक शिक्षा परीक्षाको केन्द्रित तयारी।" },
];
const streams = [
  { icon: FlaskConical, name: "Science", ne: "विज्ञान" }, { icon: Briefcase, name: "Management", ne: "व्यवस्थापन" },
  { icon: Landmark, name: "Humanities", ne: "मानविकी" }, { icon: Scale, name: "Law", ne: "कानून" },
];
const methods = [
  { t: "Project-based learning", tNe: "परियोजनामा आधारित सिकाइ", d: "Students learn by building, investigating and presenting.", dNe: "विद्यार्थीले बनाएर, अनुसन्धान गरेर र प्रस्तुत गरेर सिक्छन्।" },
  { t: "Activity-based learning", tNe: "गतिविधिमा आधारित सिकाइ", d: "Hands-on activities make concepts stick.", dNe: "प्रत्यक्ष गतिविधिले अवधारणा मनमा बस्छ।" },
  { t: "Audio-visual teaching", tNe: "श्रव्यदृश्य शिक्षण", d: "Multimedia and projectors bring lessons to life.", dNe: "मल्टिमिडिया र प्रोजेक्टरले पाठलाई जीवन्त बनाउँछ।" },
  { t: "Smart & digital classrooms", tNe: "स्मार्ट तथा डिजिटल कक्षाकोठा", d: "Technology-supported classrooms (per the school's 2026 admission post).", dNe: "प्रविधिमैत्री कक्षाकोठा (विद्यालयको २०२६ को भर्ना पोस्ट अनुसार)।" },
];

export default function Academics() {
  const { t } = useLang();
  usePageMeta("Academics", "Playgroup to Grade 10 and Plus Two at Pawan Prakriti English Secondary School — project-based, activity-based learning.");
  return (
    <>
      <PageHero eyebrow={t("Academics", "शैक्षिक कार्यक्रम")} title={t("From playgroup to Grade 10 — and Plus Two", "प्लेग्रुपदेखि कक्षा १० सम्म — र प्लस टु")}
        intro={t("A clear path through every stage of school, with teaching that is practical, engaging and child-centred.", "विद्यालयका हरेक चरणमा स्पष्ट बाटो — व्यावहारिक, रोचक र बालकेन्द्रित शिक्षण।")} image={images.building.src} />

      <Journey />

      <Section eyebrow={t("Levels", "तहहरू")} title={t("Learning at every stage", "हरेक चरणमा सिकाइ")}>
        <div className="grid gap-5 md:grid-cols-3">
          {levels.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.07}>
              <SpotlightCard className="h-full p-8">
                <l.icon className="mb-5 h-9 w-9 text-accent" aria-hidden />
                <p className="text-xs font-bold uppercase tracking-widest text-ink/65">{t(l.range, l.neRange)}</p>
                <h3 className="mt-1 mb-3 font-display text-2xl font-bold text-brand">{t(l.title, l.ne)}</h3>
                <p className="text-ink/70">{t(l.text, l.neText)}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow={t("Plus Two", "प्लस टु")} title={t("Four streams after Grade 10", "कक्षा १० पछि चार संकाय")} dark>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {streams.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06}>
              <div className="rounded-2xl border border-white/15 p-6 text-center transition-colors hover:bg-white/10">
                <s.icon className="mx-auto mb-3 h-8 w-8 text-white/80" aria-hidden />
                <p className="font-display text-xl font-bold">{t(s.name, s.ne)}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-sm text-white/75">{t("Streams as listed by CollegeNP. Please confirm current offerings with the school office.", "संकाय CollegeNP मा उल्लेख भए अनुसार। हालको प्रस्ताव विद्यालय कार्यालयसँग पुष्टि गर्नुहोस्।")}</p>
      </Section>

      <Section eyebrow={t("How we teach", "हामी कसरी पढाउँछौं")} title={t("Learning by doing", "गरेर सिक्ने")}>
        <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
          {methods.map((m, i) => (
            <Reveal key={m.t} delay={i * 0.05}>
              <div className="border-t border-brand/20 pt-5">
                <h3 className="font-display text-xl font-bold text-brand">{t(m.t, m.tNe)}</h3>
                <p className="mt-1 text-ink/70">{t(m.d, m.dNe)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Cta />
    </>
  );
}
