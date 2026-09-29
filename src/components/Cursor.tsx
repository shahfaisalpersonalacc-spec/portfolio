import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type Mode = "default" | "hover" | "view";

export default function Cursor() {
  const enabled = useMemo(
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    []
  );
  const [mode, setMode] = useState<Mode>("default");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("has-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => {
      const target = (e.target as Element).closest?.("[data-cursor]");
      setMode((target?.getAttribute("data-cursor") as Mode) ?? "default");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div className="cursor-dot" aria-hidden="true" style={{ x, y }} />
      <motion.div
        className={`cursor-ring ${mode === "hover" ? "is-hover" : ""} ${
          mode === "view" ? "is-view" : ""
        }`}
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
      >
        <span className="cursor-label">VIEW</span>
      </motion.div>
    </>
  );
}
