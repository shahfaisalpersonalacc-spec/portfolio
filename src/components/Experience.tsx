import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Reveal from "./Reveal";
import { jobs } from "../data";

export default function Experience() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section className="section" id="experience">
      <Reveal className="section-head">
        <p className="eyebrow">Experience</p>
        <h2 className="section-title">
          Five years,
          <br />
          <span className="title-accent">production only.</span>
        </h2>
      </Reveal>
      <div className="timeline" ref={railRef}>
        <div className="timeline-rail" aria-hidden="true">
          <motion.span className="timeline-progress" style={{ scaleY }} />
        </div>
        {jobs.map((job) => (
          <Reveal key={job.role} className="job">
            <div className="job-when">
              <span className="job-dates">{job.dates}</span>
            </div>
            <div className="job-body">
              <h3 className="job-role">{job.role}</h3>
              <p className="job-org">{job.org}</p>
              <ul className="job-points">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="job-tags">
                {job.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
