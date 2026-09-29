import { Fragment } from "react";
import { marqueeItems } from "../data";

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <Fragment key={copy}>
            {marqueeItems.map((item) => (
              <Fragment key={`${copy}-${item}`}>
                <span>{item}</span>
                <i>✦</i>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
