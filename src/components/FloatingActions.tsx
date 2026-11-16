import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { school } from "@/data/school";
import { useLang } from "@/lib/i18n";
import { useLite } from "@/lib/prefs";
import { useLocation } from "react-router-dom";

/** Scroll progress bar, back-to-top and a WhatsApp chat button. */
export default function FloatingActions() {
  const { t } = useLang();
  const { lite } = useLite();
  const isHome = useLocation().pathname === "/";
  const { scrollY, scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [showTop, setShowTop] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShowTop(y > window.innerHeight * (isHome && !lite ? 5 : 0.8)));

  return (
    <>
      <motion.div aria-hidden style={{ scaleX: bar }} className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent" />
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        {showTop && (
          <button type="button" aria-label={t("Back to top", "माथि जानुहोस्")} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/60 bg-white/60 text-brand shadow-lg backdrop-blur-xl hover:bg-white">
            <ArrowUp className="h-5 w-5" aria-hidden />
          </button>
        )}
        <a href={`https://wa.me/${school.whatsapp}?text=${encodeURIComponent("Hello, I would like to know more about admissions.")}`}
          target="_blank" rel="noopener noreferrer" aria-label={t("Chat on WhatsApp", "WhatsApp मा च्याट गर्नुहोस्")}
          className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lg hover:brightness-95">
          <MessageCircle className="h-5 w-5" aria-hidden /> <span className="hidden sm:inline">{t("Chat with us", "च्याट गर्नुहोस्")}</span>
        </a>
      </div>
    </>
  );
}
