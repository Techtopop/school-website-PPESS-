import newsJson from "@/content/news.json";

// NEWS & EVENTS — items live in src/content/news.json (editable from /admin once the CMS is connected).
export interface NewsItem {
  title: string;
  date: string; // YYYY-MM-DD
  kind: "News" | "Event" | "Notice";
  summary: string;
  image?: string;
  /** The image is only shown when consent is true. */
  imageConsent?: boolean;
  /** For Events: YYYY-MM-DD, enables "Add to calendar". */
  eventDate?: string;
  link?: string;
}

const KINDS = ["News", "Event", "Notice"];

// Content safety: skip incomplete records and never show an image without recorded consent.
export const news: NewsItem[] = ((newsJson as { items: NewsItem[] }).items ?? [])
  .filter((n) => {
    const ok = !!n?.title?.trim() && /^\d{4}-\d{2}-\d{2}$/.test(n.date ?? "") && KINDS.includes(n.kind) && !!n.summary?.trim();
    if (!ok) console.warn("[news.json] Skipped incomplete record:", n);
    return ok;
  })
  .map((n) => (n.image && !n.imageConsent ? { ...n, image: undefined } : n))
  .sort((a, b) => b.date.localeCompare(a.date));
