import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { school, images, nav, contactNav } from "@/data/school";
import { useLang } from "@/lib/i18n";
import { useLite } from "@/lib/prefs";

function LangToggle({ lang, setLang }: { lang: "en" | "ne"; setLang: (l: "en" | "ne") => void }) {
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "ne" : "en")}
      aria-label={lang === "en" ? "Switch to Nepali" : "Switch to English"}
      className="rounded-full border border-brand/25 px-3 py-1 text-xs font-bold text-brand hover:bg-brand hover:text-white"
    >
      {lang === "en" ? "नेपाली" : "EN"}
    </button>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const { lang, setLang, t } = useLang();
  const { lite } = useLite();
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [introDone, setIntroDone] = useState(!isHome || lite);
  const { scrollY } = useScroll();

  // On the home page the bar appears once the intro circle has finished expanding
  // (Intro is 520svh tall; the circle completes at ~92% of its scroll range).
  useMotionValueEvent(scrollY, "change", (y) => {
    if (isHome && !lite) setIntroDone(y > window.innerHeight * 4.2 * 0.9);
  });
  useEffect(() => {
    setIntroDone(!isHome || lite || window.scrollY > window.innerHeight * 4.2 * 0.9);
    setOpen(false);
  }, [isHome, lite, pathname]);

  const shown = introDone;
  const link = ({ isActive }: { isActive: boolean }) =>
    `relative isolate whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:text-brand ${isActive ? "text-brand" : "text-ink/70"}`;
  const pillAt = hover ?? (nav.some((n) => n.to === pathname) ? pathname : null);

  return (
    <motion.header
      initial={false}
      animate={shown ? { y: 0, opacity: 1, filter: "blur(0px)", visibility: "visible" } : { y: -40, opacity: 0, filter: "blur(8px)", visibility: "hidden" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 z-50 px-3 sm:px-6"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border border-white/60 bg-white/45 px-4 shadow-[0_8px_32px_rgba(20,39,90,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-2xl backdrop-saturate-[1.8] sm:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label={`${school.name} — home`}>
          <img src={images.logo.src} alt="" width={40} height={36} className="h-9 w-auto rounded" />
          <span className="font-display text-sm font-bold leading-tight text-brand sm:text-base">
            {school.short}
            <span className="hidden whitespace-nowrap text-[9px] sm:block font-medium uppercase tracking-wider text-ink/70 sm:text-[10px]">
              {t(school.motto, school.mottoNe)}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" onMouseLeave={() => setHover(null)} className="hidden items-center gap-1 xl:flex">
          {nav.map((l) => (
            <NavLink key={l.to} to={l.to} className={link} onMouseEnter={() => setHover(l.to)}>
              {pillAt === l.to && !lite && (
                <motion.span layoutId="navpill" aria-hidden className="absolute inset-0 -z-10 rounded-full bg-brand/10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              {t(l.label, l.ne)}
            </NavLink>
          ))}
          <Link to="/contact" data-ripple className="relative ml-2 overflow-hidden whitespace-nowrap rounded-full bg-accent/90 px-4 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-brand">
            {t(contactNav.label, contactNav.ne)}
          </Link>
          <LangToggle lang={lang} setLang={setLang} />
        </nav>

        <div className="flex items-center gap-1 xl:hidden">
        <LangToggle lang={lang} setLang={setLang} />
        <button
          type="button"
          className="rounded p-2 text-brand"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="mx-auto mt-2 max-w-6xl rounded-3xl border border-white/60 bg-white/97 px-5 py-2 shadow-[0_8px_32px_rgba(20,39,90,0.12)] backdrop-blur-2xl backdrop-saturate-[1.8] xl:hidden">
          <ul className="flex flex-col">
            {[...nav, contactNav].map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={({ isActive }) => `block py-3 font-medium ${isActive ? "text-accent" : "text-ink/80"}`}>{t(l.label, l.ne)}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </motion.header>
  );
}
