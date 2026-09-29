import Reveal from "./Reveal";
import { education } from "../data";

export default function Education() {
  return (
    <section className="section section-tight" id="education">
      <Reveal className="section-head">
        <p className="eyebrow">Education</p>
      </Reveal>
      <div className="edu-grid">
        {education.map((e, i) => (
          <Reveal key={e.degree} delay={i * 0.1}>
            <div className="edu-card spot">
              <span className="edu-years">{e.years}</span>
              <h3 className="edu-degree">{e.degree}</h3>
              <p className="edu-school">{e.school}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
