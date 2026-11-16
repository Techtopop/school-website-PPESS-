import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { FileText, Phone, Send } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { usePageMeta } from "@/lib/usePageMeta";
import { Disclosure } from "@/components/ui/fluid";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Section } from "@/components/ui/reveal";
import { images, school, whyChoose } from "@/data/school";

const faqs = [
  { q: "Which classes can my child join?", qNe: "मेरो बच्चा कुन कक्षामा भर्ना हुन सक्छ?", a: "The school runs from playgroup to Grade 10, plus Plus Two. Availability changes each year, so please ask the office about the class you need.", aNe: "विद्यालय प्लेग्रुपदेखि कक्षा १० र प्लस टु सम्म सञ्चालित छ। उपलब्धता वर्षैपिच्छे फरक हुन्छ, त्यसैले चाहिएको कक्षाबारे कार्यालयमा सोध्नुहोस्।" },
  { q: "What are the admission dates, fees and requirements?", qNe: "भर्नाको मिति, शुल्क र आवश्यकता के के हुन्?", a: "These vary by year and class. We don't publish them here so you always get the current details — call the office or send an inquiry.", aNe: "यी वर्ष र कक्षा अनुसार फरक पर्छन्। तपाईंले सधैं हालको जानकारी पाउनुहोस् भनेर यहाँ प्रकाशित गरिएको छैन — कार्यालयमा फोन गर्नुहोस् वा जिज्ञासा पठाउनुहोस्।" },
  { q: "Can I visit the campus?", qNe: "के म क्याम्पस घुम्न आउन सक्छु?", a: "Yes. Call the office to arrange a visit to the campus in Tikathali.", aNe: "सक्नुहुन्छ। टीकाथलीस्थित क्याम्पस भ्रमणको व्यवस्थाका लागि कार्यालयमा फोन गर्नुहोस्।" },
  { q: "Are scholarships available?", qNe: "छात्रवृत्ति उपलब्ध छ?", a: "Scholarships are listed among the school's facilities. Please ask the office about eligibility.", aNe: "छात्रवृत्ति विद्यालयका सुविधाहरूमा उल्लेख छ। योग्यताबारे कार्यालयमा सोध्नुहोस्।" },
];

export default function Admissions() {
  const { t } = useLang();
  usePageMeta("Admissions", "Inquire about admissions at Pawan Prakriti English Secondary School, Tikathali, Lalitpur.");
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Parent/guardian: ${f.get("name")}\nPhone: ${f.get("phone")}\nClass applying for: ${f.get("level")}\n\n${f.get("message") ?? ""}`;
    window.location.href = `mailto:${school.email}?subject=${encodeURIComponent("Admission inquiry")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const field = "w-full rounded-xl border border-brand/20 bg-white px-4 py-3 outline-none focus:border-accent";

  return (
    <>
      <PageHero eyebrow={t("Admissions", "भर्ना")} title={t("Join the Pawan Prakriti family", "पवन प्रकृति परिवारमा सामेल हुनुहोस्")}
        intro={t("Tell us about your child and we'll get back to you with current admission details.", "आफ्नो बच्चाबारे बताउनुहोस्, हामी हालको भर्ना विवरणसहित सम्पर्क गर्छौं।")} image={images.students.src} />

      <Section eyebrow={t("Inquiry", "जिज्ञासा")} title={t("Start with a conversation", "कुराकानीबाट सुरु गरौं")}>
        <div className="grid gap-12 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <form onSubmit={submit} className="space-y-4 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold">{t("Parent / guardian name", "अभिभावकको नाम")}
                  <input name="name" required className={`${field} mt-1 font-normal`} autoComplete="name" /></label>
                <label className="block text-sm font-semibold">{t("Phone", "फोन")}
                  <input name="phone" type="tel" required className={`${field} mt-1 font-normal`} autoComplete="tel" /></label>
              </div>
              <label className="block text-sm font-semibold">{t("Class applying for", "भर्ना हुन चाहेको कक्षा")}
                <input name="level" required placeholder={t("e.g. Nursery, Class 5, Plus Two", "जस्तै: नर्सरी, कक्षा ५, प्लस टु")} className={`${field} mt-1 font-normal`} /></label>
              <label className="block text-sm font-semibold">{t("Message (optional)", "सन्देश (ऐच्छिक)")}
                <textarea name="message" rows={4} className={`${field} mt-1 font-normal`} /></label>
              <button type="submit" data-ripple className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-7 py-3 font-semibold text-white hover:bg-brand">
                <Send className="h-4 w-4" aria-hidden /> {t("Send inquiry", "जिज्ञासा पठाउनुहोस्")}
              </button>
              <p className="text-xs text-ink/70" role="status">
                {sent ? t("Your email app should open with the message ready to send. If it didn't, email us directly at ", "तपाईंको इमेल एप सन्देशसहित खुल्नुपर्छ। नखुले, सिधै इमेल गर्नुहोस्: ") + school.email + "." :
                  t("This opens your email app with the message ready to send — no data is stored on this site.", "यसले तपाईंको इमेल एप सन्देशसहित खोल्छ — यस साइटमा कुनै डाटा सुरक्षित गरिँदैन।")}
              </p>
            </form>
          </Reveal>
          <Reveal delay={0.1} className="space-y-4 lg:col-span-2">
            <h3 className="font-display text-2xl font-bold text-brand">{t("Prefer to talk?", "फोनमै कुरा गर्न चाहनुहुन्छ?")}</h3>
            {school.phones.map((p) => (
              <a key={p.href} href={p.href} className="flex items-center gap-3 rounded-xl border border-brand/15 bg-white px-4 py-3 font-semibold text-brand hover:border-accent">
                <Phone className="h-4 w-4 text-accent" aria-hidden /> {p.label}
              </a>
            ))}
            <Link to="/prospectus" className="flex items-center gap-3 rounded-xl bg-brand px-4 py-3 font-semibold text-white hover:bg-accent">
              <FileText className="h-4 w-4" aria-hidden /> {t("Download prospectus (PDF)", "प्रोस्पेक्टस डाउनलोड (PDF)")}
            </Link>
          </Reveal>
        </div>
      </Section>

      <Section eyebrow={t("Why Pawan Prakriti", "किन पवन प्रकृति")} title={t("What families can expect", "परिवारले के अपेक्षा गर्न सक्छन्")} dark>
        <ul className="grid gap-6 md:grid-cols-2">
          {whyChoose.map((w) => (
            <li key={w.title} className="border-t border-white/20 pt-4">
              <h3 className="font-bold">{t(w.title, w.ne)}</h3><p className="text-white/70">{t(w.text, w.neText)}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow={t("FAQ", "बारम्बार सोधिने प्रश्न")} title={t("Common questions", "सामान्य प्रश्नहरू")}>
        <div className="max-w-3xl divide-y divide-brand/15 border-y border-brand/15">
          {faqs.map((f) => <Disclosure key={f.q} question={t(f.q, f.qNe)}>{t(f.a, f.aNe)}</Disclosure>)}
        </div>
      </Section>
    </>
  );
}
