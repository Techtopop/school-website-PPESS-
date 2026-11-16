# Editing the site

## Add news or staff without code
1. Push this project to a GitHub repo and deploy it (Netlify or Vercel — both work; `public/_redirects` and `vercel.json` handle page routing).
2. Edit `public/admin/config.yml` and set `repo: your-user/your-repo`. Enable GitHub login for the CMS
   (Netlify: Site settings → Identity → Git Gateway; or a GitHub OAuth app).
3. Open `https://your-site/admin`, log in, and edit **News & Events** or **Our Crew**. Saving commits to GitHub and the site redeploys.

Without the CMS you can still edit `src/content/news.json` and `src/content/crew.json` directly.
Only add real people, photos and news the school has approved (children's photos need parental consent).

## Deploy
- `npm install` then `npm run build` → upload the `dist/` folder, or connect the repo to Netlify/Vercel/Cloudflare Pages
  (build command `npm run build`, output `dist`).
- Point the domain (e.g. pawanprakritischool.edu.np) at the host and update the URL in `public/sitemap.xml`, `public/robots.txt` and `index.html`.

## Things the school must confirm
Motto and Nepali translations, the WhatsApp number (`whatsapp` in `src/data/school.ts`), phone numbers, Plus Two streams.

## Photo consent
Crew photos and news images are **hidden unless the "consent given" box is ticked** (`photoConsent` / `imageConsent`).
Records missing required fields are skipped (a warning appears in the browser console). The static photos in `public/images`
(group photo, karate practice) also show children — get the school's approval before publishing.

## Lite mode
Visitors on slow or data-saver connections get Lite mode automatically (no heavy animations, smaller photos); anyone can toggle it in the footer.
