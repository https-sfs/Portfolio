"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

export const FOLD_DO_REVEAL = "fold-do-reveal";

const WHAT_I_DO = [
  {
    index: "01",
    title: "App Development",
    copy: "Mobile applications built around useful functionality, intuitive experiences, and reliable performance.",
  },
  {
    index: "02",
    title: "Web Development",
    copy: "Responsive websites and web platforms designed for clarity, speed, and usability.",
  },
  {
    index: "03",
    title: "Backend Systems",
    copy: "Structured APIs, application logic, and database-backed systems that connect products together.",
  },
  {
    index: "04",
    title: "IoT & Embedded Systems",
    copy: "Practical projects involving connected devices, sensors, and embedded systems.",
  },
] as const;

const TRUSTED_BY = [
  "GenZrix Digital Solutions",
  "Pentagon Space",
  "Dhee Coding Labs",
  "Qveto Technologies",
  "Might IT Solutions",
  "HackPrix Community",
] as const;

export function InnerAfterWork() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const playedRef = useRef(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const heading = headingRef.current;
    const rows = listRef.current
      ? Array.from(listRef.current.querySelectorAll<HTMLElement>(".fold-do-row"))
      : [];
    if (!root || !heading || rows.length === 0) return;

    const items = [heading, ...rows];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timeline: gsap.core.Timeline | null = null;

    const show = () => {
      gsap.set(items, { opacity: 1, y: 0, filter: "none" });
    };

    if (reduced) {
      playedRef.current = true;
      show();
      return;
    }

    gsap.set(items, { opacity: 0, y: 14, filter: "blur(3px)" });

    const play = () => {
      if (playedRef.current) return;
      playedRef.current = true;
      timeline = gsap.timeline({
        defaults: { duration: 0.45, ease: "power2.out", overwrite: "auto" },
      });
      timeline.to(heading, { opacity: 1, y: 0, filter: "blur(0px)" });
      timeline.to(rows, { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.2 }, 0.22);
    };

    root.addEventListener(FOLD_DO_REVEAL, play);
    return () => {
      root.removeEventListener(FOLD_DO_REVEAL, play);
      timeline?.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="fold-close">
      <section className="fold-do" aria-labelledby="fold-do-heading">
        <h2 id="fold-do-heading" ref={headingRef} className="fold-do-heading">
          What I Do
        </h2>
        <ul ref={listRef} className="fold-do-list">
          {WHAT_I_DO.map((item) => (
            <li key={item.index} className="fold-do-row">
              <div className="fold-do-left">
                <span>{item.index}</span>
                <h3>{item.title}</h3>
              </div>
              <p>{item.copy}</p>
              <ArrowUpRight className="fold-do-arrow" size={14} aria-hidden />
            </li>
          ))}
        </ul>
      </section>

      <section className="fold-trusted" aria-labelledby="fold-trusted-heading">
        <h2 id="fold-trusted-heading" className="fold-trusted-heading">
          Trusted By
        </h2>
        <ul className="fold-trusted-list">
          {TRUSTED_BY.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>

      <section className="fold-brief" aria-labelledby="fold-brief-title">
        <div className="fold-brief-copy">
          <p className="fold-close-label">Have a project in mind?</p>
          <h2 id="fold-brief-title">Let&apos;s build something useful.</h2>
          <p className="fold-brief-support">
            From mobile apps to web platforms and backend systems, I&apos;m open
            to building thoughtful digital products with people who care about
            getting the details right.
          </p>
        </div>
        <button type="button" data-fold-jump="contact">
          Let&apos;s talk
          <ArrowUpRight size={14} />
        </button>
      </section>
    </div>
  );
}
