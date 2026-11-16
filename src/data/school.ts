import {
  FlaskConical, Monitor, Library, Utensils, Trophy, Music, PersonStanding, Bus, Wifi,
  HeartHandshake, Presentation, Users, Map, Award, ParkingCircle, Palette, type LucideIcon,
} from "lucide-react";

// Sources: CollegeNP listing, the school's own Instagram posts (@pawanprakritischool),
// and the school's 2019 admission notice. Items marked "confirm" need the school's OK.
export const school = {
  name: "Pawan Prakriti English Secondary School",
  short: "Pawan Prakriti",
  motto: "Education for Equality of Opportunity", // provided by the school owner
  mottoNe: "समान अवसरका लागि शिक्षा", // draft translation — school to confirm
  nameNe: "पवन प्रकृति इङ्लिस सेकेन्डरी स्कुल", // draft transliteration — school to confirm
  whatsapp: "9779851219375", // confirm this number is on WhatsApp
  established: "2048 B.S. (1991)",
  address: "Tikathali, Mahalaxmi Municipality-5, Lalitpur, Nepal",
  phones: [
    { label: "+977-1-5007275", href: "tel:+97715007275" },
    { label: "+977-1-5007259", href: "tel:+97715007259" },
    { label: "+977-9851219375", href: "tel:+9779851219375" },
    { label: "+977-9843201703", href: "tel:+9779843201703" },
  ],
  email: "pawanprakriti2048@gmail.com", // matches the school's own Instagram posts
  website: "pawanprakritischool.edu.np",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Pawan+Prakriti+English+Secondary+School+Tikathali+Lalitpur",
  mapsEmbed:
    "https://www.google.com/maps?q=Pawan+Prakriti+English+Secondary+School+Tikathali+Lalitpur&output=embed",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/pawanprakritischool/" },
    { label: "Facebook", href: "https://www.facebook.com/PawanPrakritiESS/" },
    { label: "TikTok", href: "https://www.tiktok.com/@pawan.prakritippe" },
  ],
};

export const images = {
  building: { src: "/images/building_hd.jpg", w: 2176, h: 1632, alt: "The Pawan Prakriti School building and courtyard" },
  students: { src: "/images/students.jpg", w: 1600, h: 1200, alt: "Students and teachers gathered in the school courtyard" },
  karate: { src: "/images/karate.jpg", w: 1280, h: 1280, alt: "Students in white uniforms practising karate in the school courtyard" },
  logo: { src: "/images/logo_hd.jpg", w: 400, h: 354 },
};

export const nav = [
  { to: "/about", label: "About", ne: "हाम्रो बारेमा" },
  { to: "/academics", label: "Academics", ne: "शैक्षिक कार्यक्रम" },
  { to: "/campus-life", label: "Campus Life", ne: "क्याम्पस जीवन" },
  { to: "/crew", label: "Our Crew", ne: "हाम्रो टोली" },
  { to: "/news", label: "News", ne: "समाचार" },
  { to: "/gallery", label: "Gallery", ne: "ग्यालरी" },
  { to: "/admissions", label: "Admissions", ne: "भर्ना" },
];

export const contactNav = { to: "/contact", label: "Contact", ne: "सम्पर्क" };

export interface Facility { name: string; blurb: string; icon: LucideIcon; ne: string; neBlurb: string }
export const facilities: Facility[] = [
  { name: "Science Lab", blurb: "A dedicated lab for hands-on practical work.", icon: FlaskConical, ne: "विज्ञान प्रयोगशाला", neBlurb: "प्रयोगात्मक कार्यका लागि समर्पित प्रयोगशाला।" },
  { name: "Computer Lab", blurb: "Computers and internet access for digital learning.", icon: Monitor, ne: "कम्प्युटर प्रयोगशाला", neBlurb: "डिजिटल सिकाइका लागि कम्प्युटर र इन्टरनेट सुविधा।" },
  { name: "Library", blurb: "A reading space for every level.", icon: Library, ne: "पुस्तकालय", neBlurb: "हरेक तहका लागि पढ्ने ठाउँ।" },
  { name: "Multimedia", blurb: "Audio-visual teaching to bring lessons to life.", icon: Presentation, ne: "मल्टिमिडिया", neBlurb: "पाठलाई जीवन्त बनाउने श्रव्यदृश्य शिक्षण।" },
  { name: "Conference Hall", blurb: "A hall for meetings, talks and gatherings.", icon: Users, ne: "सम्मेलन कक्ष", neBlurb: "बैठक, कार्यक्रम र भेलाका लागि हल।" },
  { name: "Cafeteria", blurb: "A canteen on campus.", icon: Utensils, ne: "क्यान्टिन", neBlurb: "क्याम्पसभित्रको क्यान्टिन।" },
  { name: "Sports", blurb: "Playground and sports facilities.", icon: Trophy, ne: "खेलकुद", neBlurb: "खेलमैदान र खेलकुद सुविधा।" },
  { name: "Music", blurb: "Music as part of extra-curricular life.", icon: Music, ne: "सङ्गीत", neBlurb: "पाठ्येतर जीवनको अंशका रूपमा सङ्गीत।" },
  { name: "Dance", blurb: "Dance as part of extra-curricular life.", icon: PersonStanding, ne: "नृत्य", neBlurb: "पाठ्येतर जीवनको अंशका रूपमा नृत्य।" },
  { name: "Extra-curricular Activities", blurb: "Activities beyond the classroom.", icon: Palette, ne: "पाठ्येतर गतिविधि", neBlurb: "कक्षाकोठा बाहिरका गतिविधि।" },
  { name: "Counselling", blurb: "Guidance and support for students.", icon: HeartHandshake, ne: "परामर्श", neBlurb: "विद्यार्थीका लागि मार्गदर्शन र सहयोग।" },
  { name: "Educational Tours", blurb: "Learning outside the classroom.", icon: Map, ne: "शैक्षिक भ्रमण", neBlurb: "कक्षाकोठा बाहिर सिकाइ।" },
  { name: "Transport", blurb: "School transport service.", icon: Bus, ne: "यातायात", neBlurb: "विद्यालय यातायात सेवा।" },
  { name: "Internet", blurb: "Internet access on campus.", icon: Wifi, ne: "इन्टरनेट", neBlurb: "क्याम्पसमा इन्टरनेट सुविधा।" },
  { name: "Scholarships", blurb: "Scholarships are listed as available — ask the school for details.", icon: Award, ne: "छात्रवृत्ति", neBlurb: "छात्रवृत्ति उपलब्ध भनिएको छ — विवरणका लागि विद्यालयमा सोध्नुहोस्।" },
  { name: "Parking", blurb: "On-campus parking.", icon: ParkingCircle, ne: "पार्किङ", neBlurb: "क्याम्पसभित्र पार्किङ।" },
];

// The school's own "Why choose us" list (Instagram admission post, 2026).
export const whyChoose = [
  { title: "Premium education, affordable investment", ne: "उत्कृष्ट शिक्षा, किफायती लगानी", neText: "परिवारले योजना बनाउन सक्ने गुणस्तरीय शिक्षा।", text: "Quality schooling that families can plan for." },
  { title: "Smart & digital classrooms", ne: "स्मार्ट तथा डिजिटल कक्षाकोठा", neText: "प्रविधिमैत्री शिक्षण र सिकाइ।", text: "Technology-supported teaching and learning." },
  { title: "Experienced, dedicated faculty", ne: "अनुभवी र समर्पित शिक्षक", neText: "हरेक विद्यार्थीको प्रगतिमा प्रतिबद्ध शिक्षक।", text: "Teachers committed to every student's progress." },
  { title: "Playground & sports facilities", ne: "खेलमैदान तथा खेलकुद सुविधा", neText: "खेल्न, प्रतिस्पर्धा गर्न र सक्रिय रहन ठाउँ।", text: "Space to play, compete and stay active." },
  { title: "Well-equipped infrastructure", ne: "सुसज्जित पूर्वाधार", neText: "प्रयोगशाला, पुस्तकालय र आधुनिक सिकाइ स्थल।", text: "Labs, library and modern learning spaces." },
];
