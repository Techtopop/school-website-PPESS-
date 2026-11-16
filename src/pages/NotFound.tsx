import { Link } from "react-router-dom";
import { usePageMeta } from "@/lib/usePageMeta";
import { useLang } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useLang();
  usePageMeta("Page not found", "This page could not be found.");
  return (
    <section className="grid min-h-[80svh] place-items-center bg-brand px-6 text-center text-white">
      <div>
        <p className="font-display text-8xl font-bold text-white/30">404</p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-5xl">{t("This classroom is empty", "यो कक्षाकोठा खाली छ")}</h1>
        <p className="mt-3 text-white/75">{t("The page you're looking for doesn't exist or has moved.", "तपाईंले खोज्नुभएको पृष्ठ छैन वा सारिएको छ।")}</p>
        <Link to="/" className="mt-8 inline-block rounded-full bg-accent px-7 py-3 font-semibold hover:bg-white hover:text-brand">{t("Back to home", "गृहपृष्ठमा फर्कनुहोस्")}</Link>
      </div>
    </section>
  );
}
