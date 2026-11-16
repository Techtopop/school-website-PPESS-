import crewJson from "@/content/crew.json";

// OUR CREW — people live in src/content/crew.json (editable from /admin once the CMS is connected).
// Only add real names, roles and photos that the school has approved for publication.
export interface CrewMember {
  name: string;
  role: string;
  group: "Leadership" | "Teaching Faculty" | "Support & Care";
  photo?: string; // e.g. "/images/crew/name.jpg"
  /** The photo is only shown when consent is true (children/staff privacy). */
  photoConsent?: boolean;
  subjects?: string;
  bio?: string;
}

const GROUPS = ["Leadership", "Teaching Faculty", "Support & Care"];

// Content safety: skip incomplete records and never show a photo without recorded consent.
export const crew: CrewMember[] = ((crewJson as { members: CrewMember[] }).members ?? [])
  .filter((m) => {
    const ok = !!m?.name?.trim() && !!m?.role?.trim() && GROUPS.includes(m.group);
    if (!ok) console.warn("[crew.json] Skipped incomplete record:", m);
    return ok;
  })
  .map((m) => (m.photo && !m.photoConsent ? { ...m, photo: undefined } : m));

// Departments derived from the school's verified levels and facilities (not named individuals).
export const departments = [
  { title: "Early Years", ne: "प्रारम्भिक बाल्यकाल", neText: "प्लेग्रुप, नर्सरी र सुरुका कक्षाहरू — खेल, गतिविधि र मायाबाट सिकाइ।", text: "Playgroup, Nursery and the first classes — learning through play, activity and care." },
  { title: "Primary & Lower Secondary", ne: "प्राथमिक तथा निम्न माध्यमिक", neText: "बलियो जग निर्माण गर्ने परियोजना र गतिविधिमा आधारित शिक्षण।", text: "Project-based and activity-based teaching that builds strong foundations." },
  { title: "Secondary (SEE)", ne: "माध्यमिक (SEE)", neText: "कक्षा १० मा माध्यमिक शिक्षा परीक्षा (SEE) को केन्द्रित तयारी।", text: "Focused preparation for the Secondary Education Examination at Grade 10." },
  { title: "Plus Two", ne: "प्लस टु", neText: "विज्ञान, व्यवस्थापन, मानविकी र कानून संकाय (हालको संकाय विद्यालयसँग पुष्टि गर्नुहोस्)।", text: "Science, Management, Humanities and Law streams (confirm current streams with the school)." },
  { title: "Labs & Library", ne: "प्रयोगशाला तथा पुस्तकालय", neText: "व्यावहारिक सिकाइका लागि विज्ञान प्रयोगशाला, कम्प्युटर प्रयोगशाला र पुस्तकालय।", text: "Science lab, computer lab and library support for practical learning." },
  { title: "Arts, Sports & ECA", ne: "कला, खेलकुद तथा ECA", neText: "सङ्गीत, नृत्य, खेलकुद र कराते सहित पाठ्येतर गतिविधि।", text: "Music, dance, sports and extra-curricular activities, including karate." },
  { title: "Counselling & Care", ne: "परामर्श तथा हेरचाह", neText: "हरेक विद्यार्थी फस्टाउन सकून् भनेर मार्गदर्शन र सहयोग।", text: "Guidance and support so every student can thrive." },
  { title: "Administration & Transport", ne: "प्रशासन तथा यातायात", neText: "विद्यालय सञ्चालन गर्ने कार्यालय, यातायात र क्याम्पस टोली।", text: "The office, transport and campus teams who keep the school running." },
];
