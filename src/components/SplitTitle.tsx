import { motion, useReducedMotion, type Variants } from "motion/react";

const wordVariants: Variants = {
  hidden: { y: "115%", rotate: 3 },
  show: {
    y: 0,
    rotate: 0,
    transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 1] },
  },
};

/* Per-word clip reveal for headings.
   "\n" breaks lines; *asterisks* mark the accent span:
   <SplitTitle text={"Five years,\n*production only.*"} /> */
export default function SplitTitle({
  text,
  className = "section-title",
}: {
  text: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  let inAccent = false;

  return (
    <motion.h2
      className={className}
      initial={reduced ? undefined : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055 } } }}
    >
      {text.split("\n").map((line, li) => (
        <span className="split-line" key={li}>
          {line.split(" ").map((raw, wi) => {
            let word = raw;
            if (word.startsWith("*")) {
              inAccent = true;
              word = word.slice(1);
            }
            let closes = false;
            if (word.endsWith("*")) {
              closes = true;
              word = word.slice(0, -1);
            }
            const accent = inAccent;
            if (closes) inAccent = false;
            return (
              <span key={wi}>
                {wi > 0 && " "}
                <span className="split-word">
                  <motion.span
                    className={`split-word-inner ${accent ? "title-accent" : ""}`}
                    variants={wordVariants}
                  >
                    {word}
                  </motion.span>
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </motion.h2>
  );
}
