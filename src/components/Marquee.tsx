import { Fragment, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { marqueeItems } from "../data";

const wrap = (min: number, max: number, v: number) =>
  min + ((((v - min) % (max - min)) + (max - min)) % (max - min));

/* Scroll-velocity marquee: drifts on its own, accelerates with scroll,
   reverses direction when you scroll back up, and skews with momentum. */
export default function Marquee() {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef(1);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-1500, 1500], [-2.5, 2.5]);

  /* the track holds 4 identical groups; wrapping over one group width loops seamlessly */
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    let moveBy = direction.current * -1.6 * (delta / 1000);
    moveBy += moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <motion.div className="marquee" aria-hidden="true" style={reduced ? undefined : { skewX }}>
      <motion.div className="marquee-track" style={{ x }}>
        {[0, 1, 2, 3].map((copy) => (
          <Fragment key={copy}>
            {marqueeItems.map((item) => (
              <Fragment key={`${copy}-${item}`}>
                <span>{item}</span>
                <i>✦</i>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </motion.div>
    </motion.div>
  );
}
