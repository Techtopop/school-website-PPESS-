import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";
import FloatingActions from "./FloatingActions";
import LiteNotice from "./LiteNotice";

export default function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true }); // move keyboard/screen-reader focus to the new page
  }, [pathname]);
  return (
    <>
      <a href="#main" onClick={(e) => { e.preventDefault(); mainRef.current?.focus(); }} className="skip-link no-print">Skip to main content</a>
      <div className="no-print"><Header /></div>
      <div className="no-print"><FloatingActions /></div>
      <motion.main id="main" tabIndex={-1} ref={mainRef} className="outline-none" key={pathname} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
        <Outlet />
      </motion.main>
      <Footer />
      <LiteNotice />
    </>
  );
}
