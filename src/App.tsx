import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import { initSpotlight } from "./components/spotlight";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { EMAIL } from "./data";

export default function App() {
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState(false);
  const toastTimer = useRef<number>(undefined);

  useEffect(() => initSpotlight(), []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // clipboard API unavailable — fall back to a hidden textarea
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setToast(true);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(false), 2200);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!ready && <Preloader onDone={() => setReady(true)} />}
      </AnimatePresence>

      <Cursor />

      <div className="orbs" aria-hidden="true">
        <div className="orb orb-a" />
        <div className="orb orb-b" />
      </div>
      <div className="grain" aria-hidden="true" />

      <Navbar />

      <main id="top">
        <Hero ready={ready} onCopyEmail={copyEmail} />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact onCopyEmail={copyEmail} />
      </main>

      <Footer />

      <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">
        Email copied ✓
      </div>
    </>
  );
}
