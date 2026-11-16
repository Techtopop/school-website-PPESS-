# CLAUDE.md — Pawan Prakriti English Secondary School Website

## Project Overview

Build a visually impressive, modern, responsive website for **Pawan Prakriti English Secondary School**, located in Tikathali, Mahalaxmi Municipality-5, Lalitpur, Nepal.

The user will provide screenshots of websites/designs they like. Use those screenshots as **visual inspiration**, not as templates to copy exactly. Create an original design that captures the strongest ideas—such as layout, visual hierarchy, spacing, typography, color, and interactions—while giving the school its own identity.

The goal is a polished, credible school website that feels professionally designed rather than like a generic school template.

## Tech Stack

The user approved moving from vanilla HTML/CSS/JS to a modern React stack. Use:

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS** (v4, via `@tailwindcss/vite`)
- **shadcn project structure** (`components.json`, `@/` alias → `src/`, `cn()` in `src/lib/utils.ts`)
- **framer-motion** for animation, **lucide-react** for icons

Do **not** use:
- Next.js, Vue, Angular, or other frameworks
- Backend code, APIs requiring a custom server, or databases
- Other CSS frameworks (Bootstrap etc.)
- New dependencies without a clear reason

The site builds to static files (`npm run build` → `dist/`) and can be hosted on any static host. Dev server: `npm run dev`.

**Component paths:** reusable UI components go in `src/components/ui/` (the shadcn default; the CLI and `@/components/ui/...` imports depend on it). Page sections go in `src/components/`. Styles live in `src/index.css` (Tailwind entry).

## Research the School and Find Images

Before designing the site, research the school and locate relevant, real photographs.

Starting points:
- Official website: https://pawanprakritischool.edu.np/
- Official gallery: https://pawanprakritischool.edu.np/gallery
- About page: https://pawanprakritischool.edu.np/about
- Contact page: https://pawanprakritischool.edu.np/contact
- School social posts and photos: https://www.findglocal.com/NP/Lalitpur/1459653060973237/Pawan-Prakriti-E.S.S
- Additional school profile: https://www.collegenp.com/school/pawan-prakriti-english-secondary-school

### Image research instructions

1. Search the web, currently the School website is down. But you can find relevant photos posted by other websites or Facebook.
2. Find images suitable for the hero section, school campus, classroom learning, extracurricular activities, sports, events, and gallery.
3. Prefer genuine photographs of this school over generic stock photos.
4. Do not claim that a generic stock photo depicts the school or its students.
5. Use only images that can be accessed reliably. If possible, download selected images and store them in `public/images/` so the site does not depend on fragile third-party image URLs.
6. If an image cannot be downloaded or reused, use a stable source URL only when appropriate, or leave a clearly identifiable placeholder for replacement.
7. Respect copyright, website terms, and privacy—especially for photos of children. Prefer official school-published photos and confirm permission before public deployment where needed.
8. Use descriptive filenames and meaningful `alt` text. Do not use misleading alt text.
9. Optimize image sizes where practical and use `object-fit: cover`/appropriate focal positioning so the images look intentional.
10. Add graceful fallbacks for missing images. Never let a broken image ruin the page layout.

## Design Direction

The user will supply screenshots. Review them before deciding the final design.

- Extract useful design principles from the screenshots: composition, typography, whitespace, color palette, navigation, cards, image treatment, and motion.
- Do not reproduce another website pixel-for-pixel, copy its branding, or reuse its unique text and assets.
- Develop a cohesive visual identity appropriate for a respected school in Nepal.
- Make the result feel modern, distinctive, warm, confident, and welcoming to students and parents.
- Use strong typography, deliberate spacing, excellent image selection, subtle shadows/borders, and restrained motion.
- Avoid clutter, excessive gradients, generic template sections, excessive rounded cards, and unnecessary animations.
- Establish a clear visual hierarchy and make the school's identity immediately recognizable.
- Choose colors based on the supplied references and the school's own identity/logo if available. Keep the palette consistent.
- Use CSS custom properties (`:root` variables) for colors, spacing, typography, and common design tokens.
- Use suitable system fonts or a reliable web font only if it improves the design and graceful fallback is provided.

## Suggested Website Content

Research the school's real information before publishing factual claims. Treat this as a starting point, not a requirement to include every section.

Possible sections:
1. **Header/navigation** — school logo/name, clear navigation, prominent admission/contact action.
2. **Hero** — powerful school image, concise headline, short supporting message, clear call to action.
3. **About the school** — short, accurate introduction and educational values.
4. **Academic levels/programs** — only list levels and streams confirmed by reliable school sources.
5. **Why choose us / facilities** — use verified details only.
6. **Student life** — real school activities, events, clubs, sports, arts, or learning experiences where available.
7. **Photo gallery** — attractive responsive gallery using genuine school photos.
8. **Admissions** — clear inquiry/admission call to action; do not invent admission dates, fees, requirements, or availability.
9. **News and events** — include only verified and current information, or omit the section if useful content cannot be confirmed.
10. **Contact/location** — use verified contact details and address.
11. **Footer** — useful navigation, contact details, and social links only when verified.

Possible calls to action include “Explore Our School,” “Admissions & Inquiry,” and “Contact the School.” Make all links and buttons functional.

## Accuracy and Content Rules

- Verify important details against the official website or another credible source.
- Do not invent awards, student counts, examination results, facilities, faculty credentials, testimonials, admission status, or statistics.
- Do not present sample text as a real quote or testimonial.
- If information is uncertain, omit it or mark it clearly for the user to confirm.
- Preserve the school's name exactly: **Pawan Prakriti English Secondary School**.
- Keep writing clear, warm, concise, and appropriate for students and parents.
- Ensure the website works for a Nepal-based audience. Use Nepal's phone country code (+977) when displaying verified phone numbers.

## Implementation Requirements

### Markup and components
- Use semantic HTML elements (`header`, `nav`, `main`, `section`, `footer`) inside React components.
- Maintain a logical heading hierarchy (one `h1` per page).
- Keep `index.html` title, meta description, and viewport tag accurate.
- Use accessible labels and meaningful alternative text.
- Prefer small, typed, props-driven components over hard-coded content.

### Styling
- Use Tailwind utilities; define shared design tokens (colors, fonts) in `src/index.css` via `@theme`.
- Build mobile-first; support phones, tablets, laptops, and wide desktops.
- Include visible keyboard focus styles, adequate contrast, and readable text sizes.
- Respect `prefers-reduced-motion` (e.g. framer-motion `useReducedMotion`).
- Avoid horizontal overflow and layout shifts.

### Accessibility and Performance
- Use semantic controls and keyboard-accessible interactions; add ARIA only when needed.
- Images need dimensions or aspect ratios; lazy-load below-the-fold images, not the hero.
- Avoid excessive animation and large, unoptimized assets.
- Full-viewport scroll-hijacking effects (e.g. the tunnel hero) must not trap users: keep keyboard/touch access to the rest of the page.

## Site Map (multi-page, React Router)

Home `/` (scroll-driven tunnel → circle reveal intro), About `/about`, Academics `/academics`, Campus Life `/campus-life`,
Our Crew `/crew`, Gallery `/gallery`, Admissions `/admissions`, Contact `/contact`. Pages live in `src/pages/`; shared
facts and image paths live in `src/data/school.ts`; teacher/staff profiles go in `src/data/crew.ts` (never invent people).
Reusable UI (Reveal/Section, SpotlightCard, Counter, Marquee, PageHero) is in `src/components/ui/`.
Motto: "Education for Equality of Opportunity" (provided by the owner).

Also built: English/Nepali toggle (`src/lib/i18n.tsx`, `t("English", "नेपाली")`), Lite mode that switches on only when the page lags
(`src/lib/prefs.tsx`), News & Events and Crew pages driven by `src/content/*.json` (+ Decap CMS in `public/admin`), photo-consent flags,
printable `/prospectus`, journey scroll story, fluid motion helpers (`src/components/ui/fluid.tsx`). See README-EDITING.md for editing and deploying.
Rules that must keep holding: never invent facts/people/results; no letter-spacing on Devanagari; decorative motion must respect lite mode and reduced motion.

## Suggested File Structure

```text
project/
├── index.html
├── package.json
├── components.json
├── vite.config.ts
├── tsconfig*.json
├── public/
│   └── images/            # downloaded school photos
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── lib/utils.ts
│   └── components/
│       └── ui/            # shadcn-style reusable components
└── CLAUDE.md
```

## Workflow

1. **Inspect the supplied screenshots.** Identify the design traits worth adapting and the elements that should remain original.
2. **Research the school.** Review the official site, gallery, and reliable public sources. Record verified details and image sources.
3. **Plan the design.** Decide the visual direction, page sections, navigation, typography, colors, and responsive behavior before writing substantial code.
4. **Build the site.** Implement React components with Tailwind; verify with `npx tsc -b` and `npm run build`.
5. **Review the actual result.** If browser or screenshot tooling is available, open the site at desktop and mobile widths. Fix obvious layout, spacing, image, contrast, and responsive issues.
6. **Test functionality.** Check navigation, buttons, gallery interactions, links, and mobile menu. Check the browser console for errors when tooling is available.
7. **Summarize the result.** Tell the user what was built, how to run it, which images were used, which details need verification, and any known limitations.

## Working Style

- Start by examining the user's screenshots and the existing project files before making design decisions.
- If screenshots are not provided yet, prepare by researching the school and explaining what screenshots or assets would be useful; do not pretend to have seen references that have not been supplied.
- Make reasonable design decisions independently. Ask questions only when a missing decision materially affects the result.
- Do not stop at a rough mockup: aim for a complete, polished first version.
- Stick to the stack above; do not swap it for another framework.
- Do not copy another website exactly.
- Keep the code understandable for a beginner who may want to edit it later; put editable content (text, image lists) in props or small data arrays.
- After implementation, provide a concise summary and clearly identify anything that still needs the user's approval.

## Definition of Done

The website is ready for review when:
- It uses the approved stack (Vite, React, TypeScript, Tailwind) and `npm run build` succeeds.
- It has an original design informed by the user's screenshots.
- It uses relevant, accurately represented school imagery where possible.
- It is responsive on mobile and desktop.
- Its navigation and visible interactions work.
- Its text and school facts are not fabricated.
- Its files are organized and easy to edit.
- It builds to static files and runs without a backend.
