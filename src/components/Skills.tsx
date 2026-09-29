import { motion, useReducedMotion } from "motion/react";
import Reveal from "./Reveal";
import SplitTitle from "./SplitTitle";
import { skillGroups } from "../data";

function Meter({ level }: { level: number }) {
  const reduced = useReducedMotion();
  const pct = `${(level / 5) * 100}%`;
  return (
    <span className="skill-meter">
      <motion.span
        className="skill-fill"
        initial={reduced ? { width: pct } : { width: 0 }}
        whileInView={{ width: pct }}
        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 1] }}
      />
    </span>
  );
}

export default function Skills() {
  return (
    <section className="section" id="skills">
      <Reveal className="section-head">
        <p className="eyebrow">Skills</p>
        <SplitTitle text={"Depth, *measured honestly.*"} />
        <p className="section-sub">
          Self-assessed on a five-point scale — what I'd stake a production incident on.
        </p>
      </Reveal>
      <div className="skills-grid">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.title} className="skill-group spot" delay={gi * 0.08}>
            <h3 className="skill-group-title">{group.title}</h3>
            <ul>
              {group.skills.map((s) => (
                <li key={s.name} className="skill">
                  <span className="skill-name">{s.name}</span>
                  <Meter level={s.level} />
                  <span className="skill-score">{s.level.toFixed(1)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
