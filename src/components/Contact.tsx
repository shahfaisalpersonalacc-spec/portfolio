import Reveal from "./Reveal";
import { EMAIL, LINKEDIN, PHONE } from "../data";

export default function Contact({ onCopyEmail }: { onCopyEmail: () => void }) {
  return (
    <section className="section contact" id="contact">
      <Reveal>
        <p className="eyebrow">Contact</p>
        <h2 className="contact-title">
          Let's build something
          <br />
          people <span className="title-accent">trust.</span>
        </h2>
        <button className="contact-email" type="button" data-cursor="hover" onClick={onCopyEmail}>
          <span>{EMAIL}</span>
          <span className="contact-email-hint">click to copy</span>
        </button>
        <ul className="contact-links">
          <li>
            <span className="contact-key">Phone</span>
            <span className="contact-val">{PHONE}</span>
          </li>
          <li>
            <span className="contact-key">LinkedIn</span>
            <a
              className="contact-val"
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
            >
              /shahfaisal-ansari ↗
            </a>
          </li>
          <li>
            <span className="contact-key">Location</span>
            <span className="contact-val">Noida · Muzaffarnagar, UP, India</span>
          </li>
        </ul>
      </Reveal>
    </section>
  );
}
