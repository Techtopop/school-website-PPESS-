import { AnimatePresence, motion } from "framer-motion";
import { Gauge } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useLite } from "@/lib/prefs";

/** Shown once, right after lag detection switches on Lite mode. */
export default function LiteNotice() {
  const { t } = useLang();
  const { autoSwitched, undoAuto, dismissNotice } = useLite();
  return (
    <AnimatePresence>
      {autoSwitched && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="no-print fixed bottom-5 left-5 right-24 z-[70] max-w-sm rounded-2xl border border-white/60 bg-white/90 p-4 text-sm shadow-xl backdrop-blur-xl"
        >
          <p className="flex items-start gap-2 text-ink">
            <Gauge className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
            {t("The site was running slowly, so we switched to Lite mode for smoother browsing.", "साइट ढिलो चलिरहेकाले सहज ब्राउजिङका लागि हामीले लाइट मोडमा सार्‍यौं।")}
          </p>
          <div className="mt-3 flex gap-3">
            <button type="button" onClick={dismissNotice} className="rounded-full bg-brand px-4 py-1.5 font-semibold text-white">{t("OK", "ठीक छ")}</button>
            <button type="button" onClick={undoAuto} className="rounded-full border border-brand/30 px-4 py-1.5 font-semibold text-brand">{t("Undo", "फर्काउनुहोस्")}</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
