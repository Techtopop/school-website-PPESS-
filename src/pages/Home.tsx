import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { usePageMeta } from "@/lib/usePageMeta";
import Intro from "@/components/Intro";
import Cta from "@/components/Cta";
import QuoteOfTheDay from "@/components/QuoteOfTheDay";
import { Reveal, Section } from "@/components/ui/reveal";
import { ImageReveal, Tilt } from "@/components/ui/fluid";
import { Counter } from "@/components/ui/counter";
import { Marquee } from "@/components/ui/marquee";
import { facilities, images, school, whyChoose } from "@/data/school";

const stats = [
  { to: 1991, label: "Established (2048 B.S.)", ne: "स्थापना (वि.सं. २०४८)", suffix: "" },
  { to: 16, label: "Campus facilities", ne: "क्याम्पस सुविधा", suffix: "" },
  { to: 10, label: "Playgroup to Grade 10, plus Plus Two", ne: "प्लेग्रुपदेखि कक्षा १० र प्लस टु", suffix: "+2" },
  { to: 4, label: "Plus Two streams*", ne: "प्लस टु संकाय*", suffix: "" },
];

const explore = [
  { to: "/academics", title: "Academics", ne: "शैक्षिक कार्यक्रम", neText: "प्लेग्रुपदेखि कक्षा १० र प्लस टु।", text: "Playgroup to Grade 10, and Plus Two.", img: images.building.src, pos: "20% 40%", span: "md:col-span-2" },
  { to: "/campus-life", title: "Campus Life", ne: "क्याम्पस जीवन", neText: "खेलकुद, सङ्गीत, नृत्य र थप।", text: "Sports, music, dance and more.", img: images.karate.src, pos: "50% 85%", span: "" },
  { to: "/crew", title: "Our Crew", ne: "हाम्रो टोली", neText: "हरेक पाठ पछाडिका व्यक्तिहरू।", text: "The people behind every lesson.", img: images.students.src, pos: "50% 65%", span: "" },
  { to: "/admissions", title: "Admissions", ne: "भर्ना", neText: "विद्यालयमा कसरी भर्ना हुने।", text: "How to join the school.", img: images.building.src, pos: "90% 30%", span: "md:col-span-2" },
];

export default function Home() {
  const { t } = useLang();
  usePageMeta("", "Pawan Prakriti English Secondary School in Tikathali, Lalitpur — education for equality of opportunity, from playgroup to Grade 10 and Plus Two.");
  return (
    <>
      <Intro />

      <Section eyebrow={t("Welcome", "स्वागत छ")} title={t("Education for equality of opportunity", "समान अवसरका लागि शिक्षा")}>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal className="space-y-5 text-lg leading-relaxed text-ink/80">
            <p>
              {t(`${school.name} has served families in Tikathali, Lalitpur since ${school.established}. Our belief is simple: every child deserves the same chance to learn, grow and succeed.`,
                `${school.nameNe} वि.सं. २०४८ देखि ललितपुरको टीकाथलीका परिवारहरूको सेवामा छ। हाम्रो विश्वास सरल छ: हरेक बच्चाले सिक्न, बढ्न र सफल हुन समान अवसर पाउनुपर्छ।`)}
            </p>
            <p>
              {t("Classes run from playgroup to Grade 10, with Plus Two for older students — taught through projects, activities and audio-visual lessons that keep young minds curious.",
                "प्लेग्रुपदेखि कक्षा १० सम्म र ठूला विद्यार्थीका लागि प्लस टु सञ्चालित छ — परियोजना, गतिविधि र श्रव्यदृश्य पाठमार्फत बालमनलाई जिज्ञासु राख्दै पढाइन्छ।")}
            </p>
            <Link to="/about" className="inline-flex items-center gap-1 font-semibold text-accent hover:text-brand">
              {t("Our story", "हाम्रो कथा")} <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <ImageReveal src={images.students.src} width={images.students.w} height={images.students.h} alt={images.students.alt}
              className="aspect-[4/3] w-full rounded-2xl shadow-2xl" imgClassName="object-cover" />
          </Reveal>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-6 border-t border-brand/15 pt-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="order-2 mt-1 text-sm text-ink/70">{t(s.label, s.ne)}</dt>
              <dd className="font-display text-4xl font-bold text-brand sm:text-5xl">
                <Counter to={s.to} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs text-ink/65">{t("*Plus Two streams per CollegeNP — please confirm current streams with the school.", "*प्लस टु संकाय CollegeNP अनुसार — हालको संकाय विद्यालयसँग पुष्टि गर्नुहोस्।")}</p>
      </Section>

      <div className="border-y border-brand/10 bg-white py-6" aria-label="Campus facilities">
        <Marquee>
          {facilities.map((f) => (
            <span key={f.name} className="flex items-center gap-3 whitespace-nowrap font-display text-2xl font-bold text-brand/80">
              <f.icon className="h-6 w-6 text-accent" aria-hidden /> {t(f.name, f.ne)}
            </span>
          ))}
        </Marquee>
      </div>

      <Section eyebrow={t("Explore", "अन्वेषण")} title={t("Everything about our school", "हाम्रो विद्यालयबारे सबै कुरा")}>
        <div className="grid gap-5 md:grid-cols-3">
          {explore.map((e, i) => (
            <Reveal key={e.to} delay={i * 0.06} className={e.span}>
              <Tilt className="h-72"><Link to={e.to} className="group relative block h-72 overflow-hidden rounded-2xl">
                <img src={e.img} alt="" loading="lazy" style={{ objectPosition: e.pos }} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                  <div>
                    <h3 className="font-display text-2xl font-bold">{t(e.title, e.ne)}</h3>
                    <p className="text-sm text-white/80">{t(e.text, e.neText)}</p>
                  </div>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20 backdrop-blur transition-colors group-hover:bg-accent">
                    <ArrowUpRight className="h-5 w-5" aria-hidden />
                  </span>
                </div>
              </Link></Tilt>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow={t("Why families choose us", "परिवारले हामीलाई किन रोज्छन्")} title={t("What we offer", "हामीले के दिन्छौं")} dark>
        <ol className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {whyChoose.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.05}>
              <li className="flex gap-5 border-t border-white/20 pt-5">
                <span className="font-display text-3xl font-bold text-accent">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-bold">{t(w.title, w.ne)}</h3>
                  <p className="text-white/70">{t(w.text, w.neText)}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="mt-10 text-xs text-white/70">{t("As described in the school's own admission announcement.", "विद्यालयकै भर्ना सूचनामा वर्णन गरिए अनुसार।")}</p>
      </Section>

      <Section eyebrow={t("Visit us", "हामीलाई भेट्न आउनुहोस्")} title={t("Find us in Tikathali", "टीकाथलीमा हामीलाई भेट्टाउनुहोस्")}>
        <Reveal className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-white p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <MapPin className="mt-1 h-6 w-6 shrink-0 text-accent" aria-hidden />
            <p className="max-w-md text-lg text-ink/80">{t(school.address, "टीकाथली, महालक्ष्मी नगरपालिका-५, ललितपुर, नेपाल")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={school.mapsUrl} target="_blank" rel="noopener noreferrer" data-ripple className="relative overflow-hidden rounded-full bg-brand px-6 py-2.5 font-semibold text-white hover:bg-accent">{t("Get directions", "बाटो हेर्नुहोस्")}</a>
            <Link to="/contact" className="rounded-full border border-brand px-6 py-2.5 font-semibold text-brand hover:bg-brand hover:text-white">{t("All contact details", "सबै सम्पर्क विवरण")}</Link>
          </div>
        </Reveal>
      </Section>

      <div aria-hidden className="dhaka" />
      <QuoteOfTheDay />
      <Cta />
    </>
  );
}
