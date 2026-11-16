import { useLang } from "@/lib/i18n";

// Well-documented quotations only. Nepali lines are draft translations.
const quotes = [
  { en: "Education is the most powerful weapon which you can use to change the world.", ne: "शिक्षा संसार बदल्न प्रयोग गर्न सकिने सबैभन्दा शक्तिशाली हतियार हो।", by: "Nelson Mandela" },
  { en: "One child, one teacher, one book, one pen can change the world.", ne: "एक बच्चा, एक शिक्षक, एक किताब र एउटा कलमले संसार बदल्न सक्छ।", by: "Malala Yousafzai" },
  { en: "Knowledge is the chief of all wealth.", ne: "विद्या सर्वधनं प्रधानम् — ज्ञान सबै धनमध्ये प्रधान हो।", by: "Sanskrit proverb · संस्कृत सुभाषित" },
  { en: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", ne: "शिक्षा भविष्यको राहदानी हो, किनकि भोलि आज तयारी गर्नेहरूकै हुन्छ।", by: "Malcolm X" },
];

export default function QuoteOfTheDay() {
  const { t } = useLang();
  const day = Math.floor(Date.now() / 86_400_000);
  const q = quotes[day % quotes.length];
  return (
    <figure className="mx-auto max-w-3xl px-6 py-16 text-center">
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-accent">{t("Thought for the day", "आजको विचार")}</p>
      <blockquote className="font-display text-2xl italic leading-snug text-brand sm:text-3xl">“{t(q.en, q.ne)}”</blockquote>
      <figcaption className="mt-4 text-sm text-ink/70">— {q.by}</figcaption>
    </figure>
  );
}
