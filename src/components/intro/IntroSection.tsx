"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView } from "framer-motion";

const LEAD =
  "From mobile applications to web platforms and backend systems, I turn ideas into functional, user-focused experiences.";
const FOLLOW =
  "Turning challenges into opportunities with curiosity, adaptability, and a drive to keep improving.";

const LEAD_WORDS = LEAD.split(" ");
const LEAD_EMPH = new Set(["functional,", "user-focused", "experiences."]);

const FOLLOW_G1 = ["Turning", "challenges", "into", "opportunities", "with"] as const;
const FOLLOW_G4 = ["and", "a", "drive", "to", "keep", "improving."] as const;

function SpokenLine({
  words,
  emphasize,
}: {
  words: string[];
  emphasize: Set<string>;
}) {
  return (
    <>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={`intro-word${emphasize.has(word) ? " is-em" : ""}`}
          style={{ ["--i"]: index } as CSSProperties}
        >
          {word}
        </span>
      ))}
    </>
  );
}

function FollowLine() {
  return (
    <>
      {FOLLOW_G1.map((word, index) => (
        <span
          key={word}
          className="intro-word"
          style={{ ["--i"]: index } as CSSProperties}
        >
          {word}
        </span>
      ))}
      <span
        className="intro-word is-em intro-phrase"
        style={{ ["--d"]: "2.33s" } as CSSProperties}
      >
        curiosity,
      </span>
      <span
        className="intro-word is-em intro-phrase"
        style={{ ["--d"]: "2.55s" } as CSSProperties}
      >
        adaptability,
      </span>
      {FOLLOW_G4.map((word) => (
        <span
          key={word}
          className="intro-word is-em intro-phrase"
          style={{ ["--d"]: "2.77s" } as CSSProperties}
        >
          {word}
        </span>
      ))}
    </>
  );
}

export function IntroSection() {
  const copyRef = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(true);
  const inView = useInView(copyRef, {
    once: true,
    initial: false,
    amount: 0.35,
    margin: "0px 0px -8% 0px",
  });

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(motion.matches);
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  const animate = !reduce && inView;

  return (
    <section
      className={`intro-section${animate ? " is-in" : ""}`}
      aria-label="Introduction"
    >
      <div ref={copyRef} className="intro-section-inner">
        <p className="intro-lead">
          <span className="sr-only">{LEAD}</span>
          <span aria-hidden>
            <SpokenLine words={LEAD_WORDS} emphasize={LEAD_EMPH} />
          </span>
        </p>
        <p className="intro-follow">
          <span className="sr-only">{FOLLOW}</span>
          <span aria-hidden>
            <FollowLine />
          </span>
        </p>
      </div>
    </section>
  );
}
