// Turns `vite build --mode offline` output into a folder that works by double-clicking index.html.
import fs from "node:fs";
import path from "node:path";

const dir = "dist-offline";
const file = path.join(dir, "index.html");
let html = fs.readFileSync(file, "utf8");

// public images are referenced as "/images/..." in the code; make them relative so file:// can find them
html = html.replace(/(?<![A-Za-z0-9.])\/images\//g, "./images/");
// no web manifest / search indexing in the offline review copy
html = html.replace(/\s*<link rel="manifest"[^>]*>/, "");
html = html.replace("<meta charset=\"UTF-8\" />", '<meta charset="UTF-8" />\n    <meta name="robots" content="noindex, nofollow" />');
fs.writeFileSync(file, html);

for (const f of ["_redirects", "robots.txt", "sitemap.xml", "manifest.webmanifest"]) fs.rmSync(path.join(dir, f), { force: true });
fs.rmSync(path.join(dir, "admin"), { recursive: true, force: true });
console.log("Offline build ready in", dir);
