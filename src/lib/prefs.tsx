import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

interface Ctx {
  lite: boolean;
  /** Manual choice from the footer toggle (remembered across visits). */
  setLite: (v: boolean) => void;
  /** True right after lag detection switched lite mode on automatically. */
  autoSwitched: boolean;
  /** "Undo" on the notice: back to full mode and stop watching for lag this session. */
  undoAuto: () => void;
  dismissNotice: () => void;
}
const LiteContext = createContext<Ctx>({ lite: false, setLite: () => {}, autoSwitched: false, undoAuto: () => {}, dismissNotice: () => {} });

const LOW_FPS = 22;       // below this, animations are visibly stuttering (30fps power-saver modes are still fine)
const WINDOW_MS = 2000;   // measure frame rate in 2-second windows
const BAD_WINDOWS = 2;    // two bad windows in a row (~4s of sustained lag) before switching
const WARMUP_MS = 2500;   // ignore initial load jank

function read(storage: Storage | undefined, key: string): string | null {
  try { return storage?.getItem(key) ?? null; } catch { return null; }
}
function write(storage: Storage | undefined, key: string, value: string) {
  try { storage?.setItem(key, value); } catch { /* storage unavailable */ }
}

/**
 * Lite mode is OFF by default. It turns on when the visitor flips the footer toggle, or automatically
 * when the page is measurably lagging (low frame rate for several seconds). Automatic switching lasts
 * for the browser session only, so a one-off stutter doesn't permanently downgrade the site.
 */
export function LiteProvider({ children }: { children: ReactNode }) {
  const [lite, setLiteState] = useState(() => read(localStorage, "lite") === "1" || read(sessionStorage, "lite-auto") === "1");
  const [autoSwitched, setAutoSwitched] = useState(false);
  const watching = useRef(!lite && read(localStorage, "lite") !== "0" && read(sessionStorage, "lite-declined") !== "1");

  useEffect(() => {
    if (lite) document.documentElement.dataset.lite = "1";
    else delete document.documentElement.dataset.lite;
  }, [lite]);

  const setLite = useCallback((v: boolean) => {
    setLiteState(v);
    write(localStorage, "lite", v ? "1" : "0");
    watching.current = false;
  }, []);

  const undoAuto = useCallback(() => {
    setLiteState(false);
    setAutoSwitched(false);
    write(sessionStorage, "lite-auto", "0");
    write(sessionStorage, "lite-declined", "1");
    watching.current = false;
  }, []);

  // Frame-rate watchdog.
  useEffect(() => {
    if (!watching.current || lite) return;
    let raf = 0;
    let windowStart = 0;
    let frames = 0;
    let bad = 0;
    const started = performance.now();

    const tick = (now: number) => {
      if (!watching.current) return;
      if (document.hidden) { windowStart = 0; frames = 0; bad = 0; raf = requestAnimationFrame(tick); return; }
      if (now - started < WARMUP_MS) { raf = requestAnimationFrame(tick); return; }
      if (!windowStart) windowStart = now;
      frames++;
      const elapsed = now - windowStart;
      if (elapsed >= WINDOW_MS) {
        const fps = (frames * 1000) / elapsed;
        bad = fps < LOW_FPS ? bad + 1 : 0;
        windowStart = now;
        frames = 0;
        if (bad >= BAD_WINDOWS) {
          watching.current = false;
          write(sessionStorage, "lite-auto", "1");
          setLiteState(true);
          setAutoSwitched(true);
          if (window.scrollY > 0 && (window.location.pathname === "/" || window.location.hash === "" || window.location.hash === "#/")) window.scrollTo(0, 0); // intro layout changes height
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [lite]);

  return (
    <LiteContext.Provider value={{ lite, setLite, autoSwitched, undoAuto, dismissNotice: () => setAutoSwitched(false) }}>
      {children}
    </LiteContext.Provider>
  );
}

export const useLite = () => useContext(LiteContext);
