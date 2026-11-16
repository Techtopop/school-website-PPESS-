import { MapPin, Phone, Mail } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { usePageMeta } from "@/lib/usePageMeta";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal, Section } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { images, school } from "@/data/school";

export default function Contact() {
  const { t } = useLang();
  usePageMeta("Contact", "Address, phone numbers, email and map for Pawan Prakriti English Secondary School, Tikathali, Lalitpur.");
  return (
    <>
      <PageHero eyebrow={t("Contact", "सम्पर्क")} title={t("Visit or get in touch", "भेट्न आउनुहोस् वा सम्पर्क गर्नुहोस्")} intro={t("We'd love to hear from you.", "हामी तपाईंको कुरा सुन्न चाहन्छौं।")} image={images.building.src} />
      <Section>
        <address className="grid gap-5 not-italic md:grid-cols-3">
          <Reveal><SpotlightCard className="h-full">
            <MapPin className="mb-3 text-accent" aria-hidden />
            <h2 className="mb-1 font-display text-xl font-bold text-brand">{t("Address", "ठेगाना")}</h2>
            <p className="text-ink/75">{t(school.address, "टीकाथली, महालक्ष्मी नगरपालिका-५, ललितपुर, नेपाल")}</p>
            <a href={school.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block font-semibold text-accent underline underline-offset-4">{t("Get directions", "बाटो हेर्नुहोस्")}</a>
          </SpotlightCard></Reveal>
          <Reveal delay={0.06}><SpotlightCard className="h-full">
            <Phone className="mb-3 text-accent" aria-hidden />
            <h2 className="mb-1 font-display text-xl font-bold text-brand">{t("Phone", "फोन")}</h2>
            {school.phones.map((p) => <a key={p.href} href={p.href} className="block text-ink/75 hover:text-accent">{p.label}</a>)}
          </SpotlightCard></Reveal>
          <Reveal delay={0.12}><SpotlightCard className="h-full">
            <Mail className="mb-3 text-accent" aria-hidden />
            <h2 className="mb-1 font-display text-xl font-bold text-brand">{t("Email & social", "इमेल तथा सामाजिक सञ्जाल")}</h2>
            <a href={`mailto:${school.email}`} className="block break-all text-ink/75 hover:text-accent">{school.email}</a>
            {school.social.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="block text-ink/75 hover:text-accent">{s.label}</a>)}
          </SpotlightCard></Reveal>
        </address>
        <Reveal className="mt-8">
          <iframe title="Map showing Pawan Prakriti English Secondary School" src={school.mapsEmbed} loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" className="h-96 w-full rounded-2xl border-0 shadow-lg" />
        </Reveal>
      </Section>
    </>
  );
}
