import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import Magnetic from "./Magnetic";
import { EMAIL } from "../data";
import stageBg from "../assets/stage-bg.jpg";
import cutout from "../assets/cutout.png";

const lineVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const charVariants: Variants = {
  hidden: { y: "112%", rotate: 5 },
  show: {
    y: 0,
    rotate: 0,
    transition: { duration: 0.85, ease: [0.2, 0.65, 0.3, 1] },
  },
};

function TitleLine({ text, accent }: { text: string; accent?: boolean }) {
  return (
    <motion.span
      className={`hero-line ${accent ? "hero-line-accent" : ""}`}
      variants={lineVariants}
    >
      {text.split("").map((ch, i) => (
        <motion.span key={i} className="char" variants={charVariants}>
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

function Stat({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduced = useReducedMotion();
  const [val, setVal] = useState(reduced ? to : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, to, {
      duration: 1.4,
      delay: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, to]);

  return (
    <li ref={ref}>
      <span className="stat-num">
        {val}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </li>
  );
}

/* ── The 3D portrait ──────────────────────────────────────────
   Registered layers (bg photo, outlined name, cutout head, chips,
   eyes) sit at different translateZ depths inside one preserve-3d
   scene. The scene rotates toward the cursor from anywhere on the
   page, and the head layer counter-translates, so the face reads
   as a 3D model turning to look at the pointer.                 */
function PortraitStage() {
  const reduced = useReducedMotion();

  const rotateX = useSpring(0, { stiffness: 60, damping: 16, mass: 0.9 });
  const rotateY = useSpring(0, { stiffness: 60, damping: 16, mass: 0.9 });
  const headX = useSpring(0, { stiffness: 70, damping: 18 });
  const headY = useSpring(0, { stiffness: 70, damping: 18 });
  const bgX = useSpring(0, { stiffness: 70, damping: 18 });
  const glowX = useSpring(50, { stiffness: 80, damping: 20 });
  const glowY = useSpring(35, { stiffness: 80, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(232,164,92,.34), transparent 62%)`;

  useEffect(() => {
    if (reduced) return;
    let sawMouse = false;
    let t = 0;
    let raf = 0;

    const apply = (nx: number, ny: number) => {
      rotateY.set(nx * 16);
      rotateX.set(-ny * 11);
      headX.set(nx * 22);
      headY.set(ny * 12);
      bgX.set(-nx * 14);
      glowX.set(50 + nx * 60);
      glowY.set(35 + ny * 50);
    };

    const onMove = (e: MouseEvent) => {
      sawMouse = true;
      apply(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5);
    };

    // touch devices never fire mousemove — sway gently instead
    const idle = () => {
      if (!sawMouse) {
        t += 0.016;
        apply(Math.sin(t * 0.6) * 0.24, Math.cos(t * 0.45) * 0.14);
      }
      raf = requestAnimationFrame(idle);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(idle);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced, rotateX, rotateY, headX, headY, bgX, glowX, glowY]);

  return (
    <div className="stage" data-cursor="hover">
      <motion.div className="stage-3d" style={{ rotateX, rotateY }}>
        <div className="stage-frame">
          <motion.img
            src={stageBg}
            alt=""
            aria-hidden="true"
            className="layer-bg"
            style={{ x: bgX }}
            draggable={false}
          />
          <motion.div className="layer-glow" style={{ background: glow }} />
          <div className="layer-name" aria-hidden="true">
            <span>SHAH</span>
            <span>FAISAL</span>
          </div>
        </div>
        <motion.img
          src={cutout}
          alt="Shahfaisal Ansari looking at your cursor"
          className="layer-head"
          style={{ x: headX, y: headY, z: 46, scale: 1.04 }}
          draggable={false}
        />
        <div className="layer-rim" aria-hidden="true" />
        <span className="photo-chip photo-chip-a floaty">React</span>
        <span className="photo-chip photo-chip-b floaty">TypeScript</span>
        <span className="photo-chip photo-chip-c floaty">Noida, IN</span>
      </motion.div>
    </div>
  );
}

export default function Hero({
  ready,
  onCopyEmail,
}: {
  ready: boolean;
  onCopyEmail: () => void;
}) {
  const reduced = useReducedMotion();

  /* scroll parallax — hero recedes as you scroll away */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: ready ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.7, delay, ease: [0.2, 0.65, 0.3, 1] as const },
        };

  return (
    <section className="hero" ref={heroRef}>
      <motion.div
        className="hero-copy"
        style={reduced ? undefined : { y: copyY, opacity: heroOpacity }}
      >
        <motion.p className="eyebrow hero-eyebrow" {...fadeUp(0.55)}>
          <span className="pulse-dot" />
          Open to new opportunities
        </motion.p>

        <motion.h1
          className="hero-title"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
          initial={reduced ? false : "hidden"}
          animate={ready ? "show" : "hidden"}
        >
          <TitleLine text="SHAH" />
          <TitleLine text="FAISAL" accent />
        </motion.h1>

        <motion.p className="hero-role" {...fadeUp(0.65)}>
          Frontend Engineer · React &amp; TypeScript · <em>Fintech</em>
        </motion.p>

        <motion.p className="hero-sub" {...fadeUp(0.75)}>
          I build the interfaces India invests through — fast, type-safe investment
          platforms shipped with <strong>Jio&nbsp;Finance</strong>, <strong>Jupiter</strong>,{" "}
          <strong>MobiKwik</strong> and <strong>Zerodha</strong>.
        </motion.p>

        <motion.div className="hero-actions" {...fadeUp(0.85)}>
          <Magnetic>
            <a className="btn btn-solid" href="#work" data-cursor="hover">
              See my work<span className="btn-arrow">↓</span>
            </a>
          </Magnetic>
          <Magnetic>
            <button className="btn btn-ghost" type="button" data-cursor="hover" onClick={onCopyEmail}>
              <span>{EMAIL}</span>
              <span className="copy-email-icon">⧉</span>
            </button>
          </Magnetic>
        </motion.div>

        <motion.ul className="hero-stats" {...fadeUp(0.95)}>
          <Stat to={5} suffix="+" label="Years shipping" />
          <Stat to={4} label="Fintech brands" />
          <Stat to={30} suffix="%" label="Faster launches" />
        </motion.ul>
      </motion.div>

      <motion.div
        className="hero-visual"
        style={reduced ? undefined : { y: stageY }}
        {...(reduced
          ? {}
          : {
              initial: { opacity: 0, scale: 0.9 },
              animate: ready ? { opacity: 1, scale: 1 } : {},
              transition: { duration: 0.9, delay: 0.35, ease: [0.2, 0.65, 0.3, 1] as const },
            })}
      >
        <PortraitStage />
      </motion.div>

      <a className="scroll-hint" href="#about" data-cursor="hover" aria-label="Scroll to about">
        <span className="scroll-hint-track">
          <span className="scroll-hint-thumb" />
        </span>
      </a>
    </section>
  );
}
