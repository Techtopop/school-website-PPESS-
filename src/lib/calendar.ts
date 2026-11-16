import type { NewsItem } from "@/data/news";

/** Downloads an all-day calendar event (.ics) that opens in Google/Apple/Outlook calendars. */
export function downloadIcs(n: NewsItem) {
  if (!n.eventDate) return;
  const d = n.eventDate.replace(/-/g, "");
  const next = new Date(n.eventDate + "T00:00:00Z");
  next.setUTCDate(next.getUTCDate() + 1);
  const end = next.toISOString().slice(0, 10).replace(/-/g, "");
  const esc = (s: string) => s.replace(/[\\;,]/g, (c) => "\\" + c).replace(/\n/g, "\\n");
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Pawan Prakriti School//Website//EN", "BEGIN:VEVENT",
    `UID:${d}-${encodeURIComponent(n.title)}@pawanprakriti`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART;VALUE=DATE:${d}`, `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${esc(n.title)}`, `DESCRIPTION:${esc(n.summary)}`,
    "LOCATION:Pawan Prakriti English Secondary School\\, Tikathali\\, Lalitpur", "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "event.ics";
  a.click();
  URL.revokeObjectURL(url);
}
