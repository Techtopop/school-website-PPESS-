import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { usePageMeta } from "@/lib/usePageMeta";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Section } from "@/components/ui/reveal";
import { images, school } from "@/data/school";

const photos = [
  { ...images.building, caption: "Our school", captionNe: "हाम्रो विद्यालय" },
  { ...images.students, caption: "Students & teachers", captionNe: "विद्यार्थी तथा शिक्षक" },
  { ...images.karate, caption: "Karate practice", captionNe: "कराते अभ्यास" },
];

export default function Gallery() {
  const { t } = useLang();
  usePageMeta("Gallery", "Photos of the Pawan Prakriti English Secondary School campus, students and activities.");
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (active !== null && !d.open) d.showModal();
    if (active === null && d.open) d.close();
  }, [active]);

  return (
    <>
      <PageHero eyebrow={t("Gallery", "ग्यालरी")} title={t("A look around our school", "हाम्रो विद्यालयको झलक")} intro={t("Moments from our campus and classrooms.", "हाम्रो क्याम्पस र कक्षाकोठाका क्षणहरू।")} image={images.building.src} />
      <Section>
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {photos.map((p, i) => (
            <Reveal key={p.src} delay={i * 0.06}>
              <button type="button" onClick={() => setActive(i)} className="group relative block w-full overflow-hidden rounded-2xl">
                <img src={p.src} width={p.w} height={p.h} alt={p.alt} loading="lazy"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand/85 to-transparent p-4 text-left text-sm font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {t(p.caption, p.captionNe)}
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-lg text-ink/80">{t("More photos and videos are shared on the school's social media.", "थप फोटो र भिडियो विद्यालयको सामाजिक सञ्जालमा साझा गरिन्छ।")}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {school.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-brand px-5 py-2 text-sm font-semibold text-brand hover:bg-brand hover:text-white">
                {s.label} <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </Section>

      <dialog ref={dialogRef} onClose={() => setActive(null)} onClick={(e) => e.target === e.currentTarget && setActive(null)}
        className="m-auto max-h-[90vh] max-w-[92vw] bg-transparent p-0 backdrop:bg-black/85">
        {active !== null && (
          <figure>
            <img src={photos[active].src} alt={photos[active].alt} className="max-h-[82vh] max-w-full rounded-lg object-contain" />
            <figcaption className="mt-3 flex items-center justify-between text-white">
              <span>{t(photos[active].caption, photos[active].captionNe)}</span>
              <button type="button" onClick={() => setActive(null)} className="rounded bg-white px-4 py-2 text-sm font-semibold text-brand">{t("Close", "बन्द गर्नुहोस्")}</button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
