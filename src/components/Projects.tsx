import Reveal from "./Reveal";
import SplitTitle from "./SplitTitle";
import { projects } from "../data";

export default function Projects() {
  return (
    <section className="section" id="work">
      <Reveal className="section-head">
        <p className="eyebrow">Selected work</p>
        <SplitTitle text={"Things I've *shipped.*"} />
      </Reveal>
      <div className="projects">
        {projects.map((p, i) => (
          <Reveal key={p.mark} delay={i * 0.05}>
            <article className="project spot" data-cursor="view">
              <div className={`project-visual project-visual-${p.variant}`}>
                <span className="project-mark">{p.mark}</span>
                <span className="project-metric">{p.metric}</span>
              </div>
              <div className="project-info">
                <h3 className="project-name">{p.name}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
