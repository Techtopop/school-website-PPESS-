import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { school, images } from "@/data/school";
import { Magnetic } from "@/components/ui/fluid";
import { useLang } from "@/lib/i18n";

export default function Cta() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden bg-brand px-4 py-24 text-center text-white sm:px-6">
      <img src={images.building.src} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="relative mx-auto max-w-2xl">
        <h2 className="font-display text-3xl font-bold sm:text-5xl">{t("Come and see where your child will grow", "आफ्नो बच्चा कहाँ हुर्कन्छ, आउनुहोस् र हेर्नुहोस्")}</h2>
        <p className="mt-4 text-white/80">{t("Talk to our office about admissions, and visit the campus in Tikathali.", "भर्नाबारे हाम्रो कार्यालयमा कुरा गर्नुहोस् र टीकाथलीस्थित क्याम्पस हेर्न आउनुहोस्।")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Magnetic><Link to="/admissions" data-ripple className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-7 py-3 font-semibold hover:bg-white hover:text-brand">
            {t("Admissions & Inquiry", "भर्ना तथा जिज्ञासा")} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link></Magnetic>
          <Magnetic><a href={school.phones[0].href} data-ripple className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/50 px-7 py-3 font-semibold hover:bg-white/15">
            <Phone className="h-4 w-4" aria-hidden /> {school.phones[0].label}
          </a></Magnetic>
        </div>
      </div>
    </section>
  );
}
