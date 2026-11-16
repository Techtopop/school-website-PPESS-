import { useLang } from "@/lib/i18n";
import { usePageMeta } from "@/lib/usePageMeta";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Section } from "@/components/ui/reveal";
import { ImageReveal } from "@/components/ui/fluid";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import Cta from "@/components/Cta";
import { images, school } from "@/data/school";
import { Lightbulb, Scale, Users, ShieldCheck } from "lucide-react";

const pillars = [
  { icon: Scale, title: "Equal opportunity", ne: "समान अवसर", text: "Our motto guides everything: every child deserves the same chance to learn and succeed.", neText: "हाम्रो ध्येयवाक्यले सबै कुरा डोर्‍याउँछ: हरेक बच्चाले सिक्न र सफल हुन समान अवसर पाउनुपर्छ।" },
  { icon: Lightbulb, title: "Practical learning", ne: "व्यावहारिक सिकाइ", text: "Project-based and activity-based teaching, supported by audio-visual lessons.", neText: "श्रव्यदृश्य पाठले सघाएको परियोजना र गतिविधिमा आधारित शिक्षण।" },
  { icon: Users, title: "Child-centred", ne: "बालकेन्द्रित", text: "Teaching shaped by an understanding of child psychology and individual needs.", neText: "बालमनोविज्ञान र व्यक्तिगत आवश्यकताको बुझाइले आकार दिएको शिक्षण।" },
  { icon: ShieldCheck, title: "Safe campus", ne: "सुरक्षित क्याम्पस", text: "A building designed to be earthquake-resistant, with well-ventilated classrooms.", neText: "भूकम्प-प्रतिरोधी हुने गरी बनाइएको भवन र राम्ररी हावा खेल्ने कक्षाकोठा।" },
];

export default function About() {
  const { t } = useLang();
  usePageMeta("About", "The story, values and teaching approach of Pawan Prakriti English Secondary School, Tikathali, Lalitpur.");
  return (
    <>
      <PageHero eyebrow={t("About us", "हाम्रो बारेमा")} title={t("A school built on practical learning and equal opportunity", "व्यावहारिक सिकाइ र समान अवसरमा आधारित विद्यालय")}
        intro={t(`${school.name} was established in ${school.established} in Tikathali, Lalitpur.`, `${school.nameNe} वि.सं. २०४८ (सन् १९९१) मा ललितपुरको टीकाथलीमा स्थापना भएको हो।`)} image={images.building.src} />

      <Section eyebrow={t("Our story", "हाम्रो कथा")} title={t("Rooted in the community since 2048 B.S.", "वि.सं. २०४८ देखि समुदायमा जोडिएको")}>
        <div className="grid items-start gap-12 md:grid-cols-2">
          <Reveal className="space-y-5 text-lg leading-relaxed text-ink/80">
            <p>
              {t(`${school.name} is a private, co-educational school in Mahalaxmi Municipality-5, Tikathali, Lalitpur. It was founded in ${school.established} and is dedicated to quality, pragmatic education.`,
                `${school.nameNe} ललितपुर, महालक्ष्मी नगरपालिका-५, टीकाथलीमा रहेको निजी, सह-शिक्षा विद्यालय हो। यो वि.सं. २०४८ (सन् १९९१) मा स्थापना भएको हो र गुणस्तरीय, व्यावहारिक शिक्षामा समर्पित छ।`)}
            </p>
            <p>
              {t("From playgroup through Grade 10 (SEE) — and Plus Two for older students — we aim for all-round development and self-reliance, while keeping education within reach of local families.",
                "प्लेग्रुपदेखि कक्षा १० (SEE) सम्म — र ठूला विद्यार्थीका लागि प्लस टु — हामी सर्वाङ्गीण विकास र आत्मनिर्भरता लक्ष्य राख्छौं, र शिक्षालाई स्थानीय परिवारको पहुँचमै राख्छौं।")}
            </p>
            <p className="font-display text-2xl italic text-brand">“{t(school.motto, school.mottoNe)}”</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ImageReveal src={images.building.src} width={images.building.w} height={images.building.h} alt={images.building.alt}
              className="aspect-[4/3] w-full rounded-2xl shadow-2xl" imgClassName="object-cover" />
          </Reveal>
        </div>
      </Section>

      <Section eyebrow={t("What guides us", "हामीलाई डोर्याउने कुरा")} title={t("Four pillars", "चार आधारस्तम्भ")} className="bg-white">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <SpotlightCard className="h-full">
                <p.icon className="mb-4 h-8 w-8 text-accent" aria-hidden />
                <h3 className="mb-2 font-display text-xl font-bold text-brand">{t(p.title, p.ne)}</h3>
                <p className="text-sm text-ink/70">{t(p.text, p.neText)}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow={t("Our people", "हाम्रा मानिसहरू")} title={t("Teachers and students together", "शिक्षक र विद्यार्थी सँगै")}>
        <Reveal>
          <ImageReveal src={images.students.src} width={images.students.w} height={images.students.h} alt={images.students.alt}
            className="aspect-[16/9] w-full rounded-2xl shadow-2xl" imgClassName="object-cover object-[50%_65%]" />
        </Reveal>
      </Section>
      <Cta />
    </>
  );
}
