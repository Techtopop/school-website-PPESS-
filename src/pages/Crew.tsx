import { useState } from "react";
import { Mail } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { usePageMeta } from "@/lib/usePageMeta";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Section } from "@/components/ui/reveal";
import { FlipCard } from "@/components/ui/flip-card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { crew, departments, type CrewMember } from "@/data/crew";
import { images, school } from "@/data/school";

const groups: CrewMember["group"][] = ["Leadership", "Teaching Faculty", "Support & Care"];

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

export default function Crew() {
  const { t } = useLang();
  usePageMeta("Our Crew", "Meet the teachers and staff of Pawan Prakriti English Secondary School, Tikathali, Lalitpur.");
  const [filter, setFilter] = useState<"All" | CrewMember["group"]>("All");
  return (
    <>
      <PageHero eyebrow={t("Our crew", "हाम्रो टोली")} title={t("The people behind every lesson", "हरेक पाठ पछाडिका व्यक्तिहरू")}
        intro={t("Educators, mentors and staff who make Pawan Prakriti a place where every child can thrive.", "पवन प्रकृतिलाई हरेक बच्चा फस्टाउने ठाउँ बनाउने शिक्षक, मार्गदर्शक र कर्मचारी।")} image={images.students.src} />

      <Section eyebrow={t("Departments", "विभागहरू")} title={t("Who looks after what", "कसले के हेर्छ")}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((d, i) => (
            <Reveal key={d.title} delay={(i % 4) * 0.05}>
              <SpotlightCard className="h-full">
                <span className="mb-3 block font-display text-3xl font-bold text-accent/70">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mb-2 font-display text-lg font-bold text-brand">{t(d.title, d.ne)}</h3>
                <p className="text-sm text-ink/70">{t(d.text, d.neText)}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow={t("Meet the team", "टोलीलाई भेटौं")} title={t("Faces of Pawan Prakriti", "पवन प्रकृतिका अनुहार")} className="bg-white">
        {crew.length === 0 ? (
          <div className="grid items-center gap-10 md:grid-cols-2">
            <Reveal>
              <img src={images.students.src} width={images.students.w} height={images.students.h} alt={images.students.alt} loading="lazy"
                className="aspect-[4/3] w-full rounded-2xl object-cover object-[12%_60%] shadow-xl" />
            </Reveal>
            <Reveal delay={0.1} className="space-y-4 text-lg text-ink/80">
              <p>{t("Profiles of our principal, teachers and staff are on their way.", "हाम्रा प्रधानाध्यापक, शिक्षक र कर्मचारीका परिचय छिट्टै आउँदैछन्।")}</p>
              <p className="text-sm text-ink/70">
                Site editors: add real, approved people in <code className="rounded bg-brand/10 px-1.5 py-0.5">src/data/crew.ts</code> and
                this section fills in automatically with photo cards grouped by role.
              </p>
            </Reveal>
          </div>
        ) : (
          <>
            <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter by group">
              {(["All", ...groups] as const).map((g) => (
                <button key={g} type="button" onClick={() => setFilter(g)} aria-pressed={filter === g}
                  className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${filter === g ? "border-brand bg-brand text-white" : "border-brand/30 text-brand hover:bg-brand/10"}`}>
                  {g}
                </button>
              ))}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {crew.filter((c) => filter === "All" || c.group === filter).map((p) => (
                <FlipCard
                  key={p.name}
                  front={
                    <>
                      {p.photo ? (
                        <img src={p.photo} alt={p.name} loading="lazy" className="h-4/5 w-full object-cover" />
                      ) : (
                        <div className="grid h-4/5 w-full place-items-center bg-brand font-display text-6xl font-bold text-white/80">{initials(p.name)}</div>
                      )}
                      <div className="p-4">
                        <h4 className="font-display text-lg font-bold text-brand">{p.name}</h4>
                        <p className="text-sm font-semibold text-accent">{p.role}</p>
                      </div>
                    </>
                  }
                  back={
                    <>
                      <p className="text-xs font-bold uppercase tracking-widest text-white/75">{p.group}</p>
                      <h4 className="mt-1 font-display text-xl font-bold">{p.name}</h4>
                      <p className="text-sm font-semibold text-[#ff8f8a]">{p.role}</p>
                      {p.subjects && <p className="mt-3 text-sm text-white/80"><span className="font-semibold">Subjects:</span> {p.subjects}</p>}
                      {p.bio && <p className="mt-3 text-sm text-white/80">{p.bio}</p>}
                    </>
                  }
                />
              ))}
            </div>
          </>
        )}
      </Section>

      <Section eyebrow={t("Join our crew", "हाम्रो टोलीमा सामेल हुनुहोस्")} title={t("Teach with us", "हामीसँग पढाउनुहोस्")} dark>
        <div className="max-w-2xl space-y-6 text-lg text-white/80">
          <p>
            {t("We welcome dynamic, dedicated and qualified educators. Vacancies are announced on the school's social media channels — send your updated resume to our office.",
              "हामी सक्रिय, समर्पित र योग्य शिक्षकहरूलाई स्वागत गर्छौं। रिक्त पदहरू विद्यालयका सामाजिक सञ्जालमा घोषणा गरिन्छन् — आफ्नो अद्यावधिक बायोडाटा हाम्रो कार्यालयमा पठाउनुहोस्।")}
          </p>
          <a href={`mailto:${school.email}?subject=Teaching%20application`} className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 font-semibold text-white hover:bg-white hover:text-brand">
            <Mail className="h-4 w-4" aria-hidden /> {school.email}
          </a>
        </div>
      </Section>
    </>
  );
}
