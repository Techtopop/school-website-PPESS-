import { useLang } from "@/lib/i18n";
import { usePageMeta } from "@/lib/usePageMeta";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Section } from "@/components/ui/reveal";
import { ImageReveal } from "@/components/ui/fluid";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import Cta from "@/components/Cta";
import { facilities, images } from "@/data/school";

export default function CampusLife() {
  const { t } = useLang();
  usePageMeta("Campus Life", "Sports, music, dance, karate and 16 facilities at Pawan Prakriti English Secondary School.");
  return (
    <>
      <PageHero eyebrow={t("Campus life", "क्याम्पस जीवन")} title={t("Learning happens everywhere on our campus", "हाम्रो क्याम्पसमा सिकाइ सबैतिर हुन्छ")}
        intro={t("Labs, a library, playground and a full programme of extra-curricular activities.", "प्रयोगशाला, पुस्तकालय, खेलमैदान र पूर्ण पाठ्येतर गतिविधि कार्यक्रम।")} image={images.karate.src} />

      <Section eyebrow={t("Beyond the classroom", "कक्षाकोठा बाहिर")} title={t("Sports, music, dance and martial arts", "खेलकुद, सङ्गीत, नृत्य र मार्शल आर्ट")}>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <ImageReveal src={images.karate.src} width={images.karate.w} height={images.karate.h} alt={images.karate.alt}
              className="aspect-square w-full rounded-2xl shadow-2xl" imgClassName="object-cover" />
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-ink/80">
            <p>
              {t("The school lists sports, music, dance and extra-curricular activities among its facilities — and students regularly train together in the courtyard, including karate practice.",
                "विद्यालयले खेलकुद, सङ्गीत, नृत्य र पाठ्येतर गतिविधिलाई आफ्ना सुविधामा गनेको छ — र विद्यार्थीहरू आँगनमा कराते सहित सँगै अभ्यास गर्छन्।")}
            </p>
            <p>{t("Educational tours and counselling support round out student life, so learning and wellbeing go together.", "शैक्षिक भ्रमण र परामर्शले विद्यार्थी जीवनलाई पूर्ण बनाउँछ, ताकि सिकाइ र हेरचाह सँगै जाऊन्।")}</p>
          </Reveal>
        </div>
      </Section>

      <Section eyebrow={t("Facilities", "सुविधाहरू")} title={t("Everything on campus", "क्याम्पसका सबै सुविधा")} className="bg-white">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((f, i) => (
            <Reveal key={f.name} delay={(i % 4) * 0.05}>
              <SpotlightCard className="h-full">
                <f.icon className="mb-4 h-7 w-7 text-accent" aria-hidden />
                <h3 className="mb-1 font-display text-lg font-bold text-brand">{t(f.name, f.ne)}</h3>
                <p className="text-sm text-ink/70">{t(f.blurb, f.neBlurb)}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>
      <Cta />
    </>
  );
}
