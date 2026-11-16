import { Printer } from "lucide-react";
import { facilities, images, school, whyChoose } from "@/data/school";
import { useLang } from "@/lib/i18n";
import { usePageMeta } from "@/lib/usePageMeta";

/** Print-friendly prospectus: use "Print / Save as PDF" in the browser. Content comes from verified site data. */
export default function Prospectus() {
  const { t } = useLang();
  usePageMeta("Prospectus", "Printable prospectus for Pawan Prakriti English Secondary School.");
  return (
    <article className="mx-auto max-w-4xl px-6 pb-20 pt-32 print:pt-0">
      <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-ink/75">{t("Print this page or choose “Save as PDF” in the print window.", "यो पृष्ठ प्रिन्ट गर्नुहोस् वा प्रिन्ट विन्डोमा “Save as PDF” रोज्नुहोस्।")}</p>
        <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 font-semibold text-white hover:bg-brand">
          <Printer className="h-4 w-4" aria-hidden /> {t("Print / Save as PDF", "प्रिन्ट / PDF")}
        </button>
      </div>

      <header className="print-page border-b-4 border-accent pb-6">
        <div className="flex items-center gap-4">
          <img src={images.logo.src} alt="" className="h-16 w-auto" />
          <div>
            <h1 className="font-display text-3xl font-bold text-brand sm:text-4xl">{t(school.name, school.nameNe)}</h1>
            <p className="font-display italic text-ink/80">“{t(school.motto, school.mottoNe)}”</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-ink/75">{school.address} · {t("Established", "स्थापना")} {school.established}</p>
      </header>

      <img src={images.building.src} alt={images.building.alt} className="print-page mt-6 aspect-[16/9] w-full rounded-lg object-cover" />

      <section className="print-page mt-8">
        <h2 className="font-display text-2xl font-bold text-brand">{t("About the school", "विद्यालयको बारेमा")}</h2>
        <p className="mt-2 text-ink/80">
          {t(`${school.name} is a private school in Tikathali, Lalitpur, dedicated to quality, pragmatic education. Classes run from playgroup to Grade 10 (SEE), with Plus Two for older students (Science, Management, Humanities and Law — please confirm current streams with the school). Teaching is project-based and activity-based, supported by audio-visual lessons and an understanding of child psychology.`,
            `${school.nameNe} ललितपुरको टीकाथलीमा रहेको निजी विद्यालय हो, जुन गुणस्तरीय, व्यावहारिक शिक्षामा समर्पित छ। प्लेग्रुपदेखि कक्षा १० (SEE) सम्म र ठूला विद्यार्थीका लागि प्लस टु (विज्ञान, व्यवस्थापन, मानविकी र कानून — हालको संकाय विद्यालयसँग पुष्टि गर्नुहोस्) सञ्चालित छ। शिक्षण परियोजना र गतिविधिमा आधारित छ, जसलाई श्रव्यदृश्य पाठ र बालमनोविज्ञानको बुझाइले सघाउँछ।`)}
        </p>
      </section>

      <section className="print-page mt-8">
        <h2 className="font-display text-2xl font-bold text-brand">{t("Why families choose us", "परिवारले हामीलाई किन रोज्छन्")}</h2>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {whyChoose.map((w) => <li key={w.title} className="text-ink/80"><strong>{t(w.title, w.ne)}</strong> — {t(w.text, w.neText)}</li>)}
        </ul>
      </section>

      <section className="print-page mt-8">
        <h2 className="font-display text-2xl font-bold text-brand">{t("Facilities", "सुविधाहरू")}</h2>
        <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 text-ink/80">
          {facilities.map((f) => <li key={f.name}>• {f.name}</li>)}
        </ul>
      </section>

      <section className="print-page mt-8 rounded-lg border-2 border-brand p-5">
        <h2 className="font-display text-2xl font-bold text-brand">{t("Contact & admissions", "सम्पर्क तथा भर्ना")}</h2>
        <p className="mt-2 text-ink/80">{t("For current admission availability, requirements and fees, please contact the school office.", "हालको भर्ना उपलब्धता, आवश्यकता र शुल्कका लागि विद्यालय कार्यालयमा सम्पर्क गर्नुहोस्।")}</p>
        <p className="mt-2 text-ink">{school.phones.map((p) => p.label).join(" · ")}</p>
        <p className="text-ink">{school.email} · {school.website}</p>
        <p className="text-ink">{school.address}</p>
      </section>
    </article>
  );
}
