import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { school, nav, contactNav, images } from "@/data/school";
import { useLang } from "@/lib/i18n";
import { useLite } from "@/lib/prefs";

export default function Footer() {
  const { t } = useLang();
  const { lite, setLite } = useLite();
  return (
    <footer className="no-print bg-brand px-4 pb-8 pt-16 text-white/75 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={images.logo.src} alt="" width={56} height={50} className="mb-4 h-12 w-auto rounded" />
          <p className="font-display text-2xl font-bold text-white">{t(school.name, school.nameNe)}</p>
          <p className="mt-2 font-display italic text-white/90">“{t(school.motto, school.mottoNe)}”</p>
          <p className="mt-4 max-w-sm text-sm">{school.address}</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">{t("Explore", "अन्वेषण")}</h2>
          <ul className="space-y-2 text-sm">
            {[...nav, contactNav].map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-white">{t(l.label, l.ne)}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">{t("Reach us", "सम्पर्क")}</h2>
          <ul className="space-y-2 text-sm">
            <li><a href={school.phones[0].href} className="hover:text-white">{school.phones[0].label}</a></li>
            <li><a href={school.phones[2].href} className="hover:text-white">{school.phones[2].label}</a></li>
            <li><a href={`mailto:${school.email}`} className="break-all hover:text-white">{school.email}</a></li>
            {school.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                  {s.label} <ArrowUpRight className="h-3 w-3" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs">
        <p>© {new Date().getFullYear()} {school.name}. Established {school.established}.</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/prospectus" className="underline underline-offset-4 hover:text-white">{t("Download prospectus", "प्रोस्पेक्टस डाउनलोड")}</Link>
          <button type="button" aria-pressed={lite} onClick={() => setLite(!lite)}
            className="rounded-full border border-white/40 px-3 py-1 font-semibold hover:bg-white/15">
            {lite ? t("Lite mode: on", "लाइट मोड: खुला") : t("Lite mode: off", "लाइट मोड: बन्द")}
          </button>
        </div>
      </div>
    </footer>
  );
}
