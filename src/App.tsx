import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Lenis from "lenis";
import { useLite } from "@/lib/prefs";
import Layout from "@/components/Layout";
import { CursorGlow } from "@/components/ui/fluid";
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Academics = lazy(() => import("@/pages/Academics"));
const CampusLife = lazy(() => import("@/pages/CampusLife"));
const Crew = lazy(() => import("@/pages/Crew"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const Admissions = lazy(() => import("@/pages/Admissions"));
const Contact = lazy(() => import("@/pages/Contact"));
const Prospectus = lazy(() => import("@/pages/Prospectus"));
const News = lazy(() => import("@/pages/News"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export default function App() {
  const { lite } = useLite();
  // Smooth scrolling (skipped for users who prefer reduced motion).
  useEffect(() => {
    if (lite || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis();
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, [lite]);

  // Click ripple on any element marked data-ripple.
  useEffect(() => {
    if (lite || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const down = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-ripple]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 2.2;
      const dot = document.createElement("span");
      dot.className = "ripple-dot";
      dot.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
      el.appendChild(dot);
      dot.addEventListener("animationend", () => dot.remove());
    };
    document.addEventListener("pointerdown", down);
    return () => document.removeEventListener("pointerdown", down);
  }, [lite]);

  return (
    <>
    <CursorGlow />
    <Suspense fallback={<div className="grid min-h-screen place-items-center bg-cream"><div className="h-10 w-10 animate-spin rounded-full border-2 border-brand/20 border-t-accent" role="status" aria-label="Loading" /></div>}>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="academics" element={<Academics />} />
        <Route path="campus-life" element={<CampusLife />} />
        <Route path="crew" element={<Crew />} />
        <Route path="prospectus" element={<Prospectus />} />
        <Route path="news" element={<News />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </Suspense>
    </>
  );
}
