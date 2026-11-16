import { ArrowUpRight, CalendarDays, CalendarPlus } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Section } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { news } from "@/data/news";
import { images, school } from "@/data/school";
import { downloadIcs } from "@/lib/calendar";
import { useLang } from "@/lib/i18n";
import { usePageMeta } from "@/lib/usePageMeta";

export default function News() {
  const { t, lang } = useLang();
  usePageMeta("News & Events", "News, events and notices from Pawan Prakriti English Secondary School, Tikathali, Lalitpur.");
  const fmt = (d: string) => new Date(d).toLocaleDateString(lang === "ne" ? "ne-NP" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <>
      <PageHero eyebrow={t("News & events", "समाचार तथा कार्यक्रम")} title={t("What's happening at school", "विद्यालयमा के हुँदैछ")}
        intro={t("Announcements, events and notices for students and parents.", "विद्यार्थी र अभिभावकका लागि सूचना, कार्यक्रम र जानकारी।")} image={images.students.src} />
      <Section>
        {news.length === 0 ? (
          <Reveal className="mx-auto max-w-xl rounded-2xl bg-white p-10 text-center shadow-sm">
            <CalendarDays className="mx-auto mb-4 h-10 w-10 text-accent" aria-hidden />
            <h2 className="font-display text-2xl font-bold text-brand">{t("No posts here yet", "यहाँ अहिलेसम्म कुनै पोस्ट छैन")}</h2>
            <p className="mt-3 text-ink/70">
              {t("The latest news, admission notices and events are shared on the school's social media.", "ताजा समाचार, भर्ना सूचना र कार्यक्रमहरू विद्यालयको सामाजिक सञ्जालमा साझा गरिन्छ।")}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {school.social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-brand px-5 py-2 text-sm font-semibold text-brand hover:bg-brand hover:text-white">
                  {s.label} <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </Reveal>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {news.map((n, i) => (
              <Reveal key={n.title + n.date} delay={(i % 3) * 0.06}>
                <SpotlightCard className="h-full p-0">
                  {n.image && <img src={n.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />}
                  <div className="p-6">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent">{n.kind} · {fmt(n.date)}</p>
                    <h2 className="mb-2 font-display text-xl font-bold text-brand">{n.title}</h2>
                    <p className="text-sm text-ink/70">{n.summary}</p>
                    {n.eventDate && (
                      <button type="button" onClick={() => downloadIcs(n)} className="mt-3 mr-4 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-accent">
                        <CalendarPlus className="h-4 w-4" aria-hidden /> {t("Add to calendar", "क्यालेन्डरमा थप्नुहोस्")}
                      </button>
                    )}
                    {n.link && <a href={n.link} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">{t("Read more", "थप पढ्नुहोस्")} <ArrowUpRight className="h-4 w-4" aria-hidden /></a>}
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
