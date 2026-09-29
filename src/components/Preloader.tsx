import { useEffect, useState } from "react";
import { animate, motion, useReducedMotion } from "motion/react";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: reduced ? 0.2 : 1.4,
      ease: "easeInOut",
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(onDone, 150),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="preloader"
      aria-hidden="true"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.7, ease: [0.65, 0.05, 0.36, 1] }}
    >
      <div className="preloader-inner">
        <span className="preloader-name">SHAHFAISAL ANSARI</span>
        <span className="preloader-count">{String(count).padStart(2, "0")}%</span>
      </div>
    </motion.div>
  );
}
