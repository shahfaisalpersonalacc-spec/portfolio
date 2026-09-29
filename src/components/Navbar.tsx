import { useEffect, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";

type NavLink = { href: string; label: string; icon: ReactNode };

const icon = (children: ReactNode) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const links: NavLink[] = [
  {
    href: "#about",
    label: "About",
    icon: icon(
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
      </>
    ),
  },
  {
    href: "#skills",
    label: "Skills",
    icon: icon(
      <>
        <path d="M12 2 22 7.5 12 13 2 7.5 12 2Z" />
        <path d="m2 12.5 10 5.5 10-5.5" />
        <path d="m2 17 10 5.5L22 17" />
      </>
    ),
  },
  {
    href: "#experience",
    label: "Journey",
    icon: icon(
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        <path d="M3 12.5h18" />
      </>
    ),
  },
  {
    href: "#work",
    label: "Work",
    icon: icon(
      <>
        <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
        <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
        <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
        <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
      </>
    ),
  },
  {
    href: "#contact",
    label: "Contact",
    icon: icon(
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
];

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [pct, setPct] = useState(0);

  /* reading progress — vertical rail on the right edge (desktop) */
  const { scrollYProgress } = useScroll();
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setPct(Math.min(100, Math.max(0, Math.round(v * 100))))
  );

  /* scrollspy — highlights whichever section is on screen */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    for (const { href } of links) {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Desktop: vertical dock of separate circles, left side ── */}
      <aside className="dock" aria-label="Site navigation">
        <a className="dock-item dock-logo" href="#top" data-cursor="hover" aria-label="Back to top">
          <span className="dock-logo-text">
            SF<span className="nav-logo-dot">.</span>
          </span>
          <span className="dock-label">Top</span>
        </a>
        <span className="dock-sep" aria-hidden="true" />
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            data-cursor="hover"
            className={`dock-item ${active === l.href ? "is-active" : ""}`}
          >
            {l.icon}
            <span className="dock-label">{l.label}</span>
          </a>
        ))}
        <span className="dock-sep" aria-hidden="true" />
        <a className="dock-item dock-cta" href="#contact" data-cursor="hover">
          {icon(<path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7Z" />)}
          <span className="dock-label">Hire me</span>
        </a>
      </aside>

      {/* ── Scroll progress rail, right edge (desktop) ── */}
      <div className="progress-rail" aria-hidden="true">
        <div className="progress-track">
          <motion.div className="progress-fill" style={{ scaleY: fill }} />
        </div>
        <span className="progress-pct">{pct}%</span>
      </div>

      {/* ── Mobile / tablet: floating logo + bottom tab bar ── */}
      <a className="mini-logo" href="#top" aria-label="Back to top">
        <span className="nav-logo-text">
          SF<span className="nav-logo-dot">.</span>
        </span>
      </a>

      <nav className="tabbar" aria-label="Site navigation">
        {links.map((l) => (
          <a key={l.href} href={l.href} className={active === l.href ? "is-active" : ""}>
            {active === l.href && (
              <motion.span
                className="tab-pill"
                layoutId="tab-pill"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="tab-icon">{l.icon}</span>
            <span className="tab-label">{l.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
