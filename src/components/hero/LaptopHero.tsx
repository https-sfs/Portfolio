"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/data/site";
import { LaptopScene, type LaptopApi } from "./LaptopScene";

gsap.registerPlugin(ScrollTrigger);

function TypingLine({
  text,
  className,
  delay = 0,
  reduced,
}: {
  text: string;
  className?: string;
  delay?: number;
  reduced?: boolean;
}) {
  const [count, setCount] = useState(reduced ? text.length : 0);
  const [done, setDone] = useState(!!reduced);

  useEffect(() => {
    if (reduced) return;
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      let index = 0;
      interval = window.setInterval(() => {
        index += 1;
        setCount(index);
        if (index >= text.length) {
          window.clearInterval(interval);
          setDone(true);
        }
      }, 38);
    }, delay);
    return () => {
      window.clearTimeout(timeout);
      if (interval) window.clearInterval(interval);
    };
  }, [delay, reduced, text]);

  return (
    <p className={className} aria-label={text}>
      {text.slice(0, count)}
      <span
        className={`ml-0.5 inline-block w-[0.08em] translate-y-[-0.05em] bg-current ${
          done ? "opacity-0" : "animate-pulse"
        }`}
      >
        |
      </span>
    </p>
  );
}

export function LaptopHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<LaptopApi | null>(null);
  const [reduced, setReduced] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  const onReady = useCallback((api: LaptopApi) => {
    apiRef.current = api;
  }, []);
  const onFail = useCallback(() => setWebglFailed(true), []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const overlay = overlayRef.current;
    const name = nameRef.current;
    const title = titleRef.current;
    if (!section || !pin || reduced) {
      apiRef.current?.setProgress(0.82);
      return;
    }

    const ctx = gsap.context(() => {
      const state = { progress: 0 };
      const mm = gsap.matchMedia();

      const apply = () => {
        apiRef.current?.setProgress(state.progress);
        const p = state.progress;
        if (name) name.style.opacity = String(1 - gsap.utils.clamp(0, 1, (p - 0.28) / 0.22));
        if (title) title.style.opacity = String(1 - gsap.utils.clamp(0, 1, (p - 0.28) / 0.22));
        if (overlay) {
          const enter = gsap.utils.clamp(0, 1, (p - 0.86) / 0.09);
          const handoff = gsap.utils.clamp(0, 1, (p - 0.95) / 0.05);
          overlay.style.opacity = String(enter);
          overlay.style.backgroundColor =
            handoff > 0
              ? `color-mix(in srgb, #050608 ${Math.round((1 - handoff) * 100)}%, #ebedef)`
              : "#050608";
        }
      };

      mm.add("(min-width: 768px)", () => {
        gsap.to(state, {
          progress: 1,
          ease: "none",
          onUpdate: apply,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.to(state, {
          progress: 1,
          ease: "none",
          onUpdate: apply,
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 3.1)}`,
            scrub: 0.4,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full overflow-x-hidden md:h-[720vh]"
    >
      <div
        ref={pinRef}
        className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-4 pt-24 sm:px-6"
      >
        <div
          ref={nameRef}
          className="relative z-10 mb-2 max-w-5xl text-center md:mb-4"
        >
          <TypingLine
            text={site.fullName}
            reduced={reduced}
            className="font-display text-[1.65rem] font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white"
          />
        </div>

        <div className="relative z-0 h-[42vh] w-full max-w-5xl sm:h-[48vh] md:h-[56vh]">
          {webglFailed ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-40 w-64 rounded-xl bg-neutral-950 shadow-dark-card" />
            </div>
          ) : (
            <LaptopScene
              onReady={onReady}
              onFail={onFail}
              reducedMotion={reduced}
              className="h-full w-full"
            />
          )}
        </div>

        <div ref={titleRef} className="relative z-10 mt-3 text-center md:mt-5">
          <TypingLine
            text={site.role}
            delay={980}
            reduced={reduced}
            className="font-display text-lg font-semibold tracking-tight text-neutral-600 sm:text-2xl dark:text-neutral-300"
          />
        </div>

        <div
          ref={overlayRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 opacity-0"
        />
      </div>
    </section>
  );
}
