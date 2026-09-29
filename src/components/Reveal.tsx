import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/* Scroll-triggered fade-up used across all sections. */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.65, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
