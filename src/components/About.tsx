import Reveal from "./Reveal";
import SplitTitle from "./SplitTitle";

const facts = [
  { key: "Currently", val: "Software Developer @ Blostem" },
  { key: "Focus", val: "FD investment infrastructure" },
  { key: "Stack", val: "React · TypeScript · Node.js" },
  { key: "Education", val: "MCA, Galgotias University" },
  { key: "Base", val: "Noida / Muzaffarnagar, IN" },
];

export default function About() {
  return (
    <section className="section" id="about">
      <Reveal className="section-head">
        <p className="eyebrow">About</p>
        <SplitTitle text={"Money UIs punish\nsloppiness. *Good.*"} />
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-text">
          <p>
            I'm a software engineer from Khatauli, Uttar Pradesh, currently building
            fixed-deposit infrastructure at <strong>Blostem</strong> in Noida. Over the last
            five years I've shipped production React everywhere from agency work across
            healthcare, mobility and e-commerce at Root Info Solutions, to white-labeled
            investment platforms that thousands of people trust with real money.
          </p>
          <p>
            A rounding error in an interest calculator or a race condition in a payment flow
            isn't a bug ticket — it's someone's savings. That reality shaped how I work:
            strict TypeScript, deliberate state management, tested edge cases, and
            performance treated as a feature, not an afterthought.
          </p>
          <p>
            When partners like Jio Finance or Zerodha integrate our platform, my component
            library is the thing that makes a new deployment take days instead of weeks.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <ul className="about-facts">
            {facts.map((f) => (
              <li key={f.key}>
                <span className="fact-key">{f.key}</span>
                <span className="fact-val">{f.val}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
