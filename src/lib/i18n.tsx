import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ne";
interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (en: string, ne?: string) => string }

const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (en) => en });

function initial(): Lang {
  try { return localStorage.getItem("lang") === "ne" ? "ne" : "en"; } catch { return "en"; }
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initial);
  useEffect(() => { document.documentElement.lang = lang === "ne" ? "ne" : "en"; }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("lang", l); } catch { /* storage unavailable */ }
  };
  // t("English", "नेपाली") — falls back to English when no Nepali text is given.
  const t = (en: string, ne?: string) => (lang === "ne" && ne ? ne : en);
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
