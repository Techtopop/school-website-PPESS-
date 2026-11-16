import { useEffect } from "react";

const SITE = "Pawan Prakriti English Secondary School";

/** Sets the browser tab title and meta description for the current page. */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} — Tikathali, Lalitpur`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}
