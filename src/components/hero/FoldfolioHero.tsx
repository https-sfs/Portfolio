"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronDown, Code2, Github, Leaf, Linkedin } from "lucide-react";
import { site } from "@/data/site";
import { scrollToId } from "@/lib/utils";
import { IntroSection } from "@/components/intro/IntroSection";
import { WorkSection } from "@/components/work/WorkSection";
import { FOLD_DO_REVEAL, InnerAfterWork } from "@/components/fold/InnerAfterWork";

gsap.registerPlugin(ScrollTrigger);

const NOTICES = [
  {
    title: "Gee Cee Supplements",
    subtitle: "Website live",
    time: "now",
    kind: "live" as const,
  },
  {
    title: "IIT Bombay CodeDecode",
    subtitle: "2nd Runner-Up",
    time: "2h ago",
    kind: "award" as const,
  },
];

const INNER_NAV: Array<{ id: string; label: string; sel?: string; outer?: string }> = [
  { id: "home", label: "Home", sel: ".fold-inner-home" },
  { id: "work", label: "Work", sel: ".work-section" },
  { id: "about", label: "About", sel: ".fold-close" },
  { id: "contact", label: "Contact", outer: "contact" },
];

const UNFOLD_START = 0.012;
const UNFOLD_SPAN = 0.12;
const TRAVEL_START = 0.14;
const TRAVEL_SPAN = 0.5;
const CLOSE_START = 0.655;
const CLOSE_SPAN = 0.155;
const TITLE_START = 0.8;
const TITLE_SPAN = 0.14;

function innerProgress(sel: string) {
  const inner = document.querySelector<HTMLElement>("[data-fold-inner]");
  const frame = inner?.parentElement;
  const target = inner?.querySelector<HTMLElement>(sel);
  if (!inner || !frame || !target) return TRAVEL_START;
  const max = Math.max(1, inner.scrollHeight - frame.clientHeight);
  return TRAVEL_START + TRAVEL_SPAN * gsap.utils.clamp(0, 1, target.offsetTop / max);
}

const SERIF_LINES = [
  ["that", "are", "meant", "to", "be", "used", "—"],
  ["not", "just", "presented."],
] as const;

function useLockTime() {
  const [time, setTime] = useState("09:41");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    setTime(fmt());
    const id = window.setInterval(() => setTime(fmt()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

function scrollHeroTo(section: HTMLElement, at: number) {
  const top = section.offsetTop + at * (section.offsetHeight - window.innerHeight);
  window.scrollTo({ top, behavior: "smooth" });
}

function IncomingCall() {
  return (
    <div className="fold-call-ui">
      <div className="fold-call-wallpaper" aria-hidden>
        <Image
          src="/fold/incoming-call-wallpaper.jpg"
          alt=""
          fill
          sizes="(max-width: 767px) 70vw, 340px"
          unoptimized
        />
      </div>
      <div className="fold-call-head">
        <p className="fold-call-name">SABOOHI</p>
        <p className="fold-call-last">FATIMA SHAFIA</p>
        <p className="fold-call-sub">Incoming call · about your next project</p>
      </div>
      <div className="fold-call-avatar" aria-hidden>
        SFS
      </div>
      <div className="fold-call-foot">
        <div className="fold-call-slider">
          <span className="fold-call-handle" aria-hidden />
          <span>slide to talk</span>
        </div>
        <p className="fold-call-mail">AVAILABLE FOR NEW OPPORTUNITIES</p>
      </div>
    </div>
  );
}

function LockScreen({ time }: { time: string }) {
  return (
    <div className="fold-lock-ui">
      <div className="fold-lock-wallpaper" aria-hidden>
        <Image
          src="/fold/ribbon-wallpaper-final.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 70vw, 340px"
        />
      </div>
      <div className="fold-lock-hero">
        <p className="fold-clock">{time}</p>
        <p className="fold-lock-role">Mobile App &amp; Web Developer</p>
        <p className="fold-lock-place">Hyderabad · India</p>
      </div>
      <div className="fold-lock-mid" aria-hidden />
      <div className="fold-notices">
        {NOTICES.map((item) => (
          <article key={item.title} className={`fold-notice is-${item.kind}`}>
            <span className="fold-notice-icon" aria-hidden>
              {item.kind === "live" ? <Leaf size={14} strokeWidth={2.25} /> : <Code2 size={14} strokeWidth={2.25} />}
            </span>
            <div>
              <p>{item.title}</p>
              <p>{item.subtitle}</p>
            </div>
            <div className="fold-notice-meta">
              <i />
              <span>{item.time}</span>
            </div>
          </article>
        ))}
      </div>
      <div className="fold-dock">
        {site.github ? (
          <a className="fold-dock-btn" href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={17} strokeWidth={2} />
          </a>
        ) : (
          <span className="fold-dock-btn" aria-hidden>
            <Github size={17} strokeWidth={2} />
          </span>
        )}
        <span className="fold-unfold-pill">Scroll to unfold</span>
        <span className="fold-dock-btn" aria-hidden>
          <Linkedin size={17} strokeWidth={2} />
        </span>
      </div>
    </div>
  );
}

function InnerSite({ anchors = false, time }: { anchors?: boolean; time: string }) {
  return (
    <div className="fold-inner" data-fold-inner>
      <section className="fold-inner-home">
        <div className="fold-home-art" aria-hidden>
          <Image
            src="/fold/home-ribbon.jpg"
            alt=""
            fill
            sizes="(max-width: 767px) 94vw, 1200px"
            priority
          />
        </div>
        <div className="fold-inner-copy">
          <p className="fold-status-mini fold-reveal fold-reveal-a">
            <span>{time}</span>
            <span>Mobile App &amp; Web Developer</span>
          </p>
          <div className="fold-home-message">
            <h2 className="fold-home-title">
              <span className="sr-only">
                Building digital products that are meant to be used — not just presented.
              </span>
              <span className="fold-home-kicker-line" aria-hidden>
                <span className="fold-home-kicker fold-reveal fold-reveal-b">Building</span>
                <span className="fold-home-kicker fold-reveal fold-reveal-c">digital</span>
              </span>
              <span className="fold-home-kicker fold-reveal fold-reveal-d" aria-hidden>
                products
              </span>
            </h2>
            <p className="fold-home-serif">
              <span className="sr-only">that are meant to be used — not just presented.</span>
              {SERIF_LINES.map((line, lineIndex) => (
                <span className="fold-home-serif-line" aria-hidden key={line.join("-")}>
                  {line.map((word, wordIndex) => {
                    const index = (lineIndex === 0 ? 0 : SERIF_LINES[0].length) + wordIndex;
                    return (
                      <span
                        className="fold-word"
                        key={`${lineIndex}-${word}`}
                        style={{ ["--i"]: index } as CSSProperties}
                      >
                        {word}
                      </span>
                    );
                  })}
                </span>
              ))}
            </p>
            <div className="fold-cta-row fold-reveal fold-reveal-g">
              <button type="button" data-fold-jump="work">
                Explore my work <ArrowUpRight size={14} />
              </button>
              <button type="button" className="ghost" data-fold-jump="contact">
                Let&apos;s talk <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
          <p className="fold-home-place fold-reveal fold-reveal-g">Hyderabad · India</p>
        </div>
        <div className="fold-inner-portrait" aria-hidden />
      </section>

      <IntroSection />

      <WorkSection />
      <InnerAfterWork />
    </div>
  );
}

export function FoldfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const introDoneRef = useRef(false);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState("home");
  const time = useLockTime();

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(motion.matches);
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const book = bookRef.current;
    const names = namesRef.current;
    const finale = finaleRef.current;
    const cue = cueRef.current;
    if (!section || !pin || !book) return;

    const inners = book.querySelectorAll<HTMLElement>("[data-fold-inner]");
    const line = pin.querySelector<HTMLElement>(".fold-intro-line");
    const chrome = pin.querySelector<HTMLElement>(".fold-chrome");
    const device = pin.querySelector<HTMLElement>(".fold-intro-device");
    const ground = pin.querySelector<HTMLElement>(".fold-ground");
    let navId = "home";

    const size = () => {
      const mobile = window.innerWidth < 768;
      const closedW = Math.min(mobile ? 292 : 338, window.innerWidth * (mobile ? 0.7 : 0.235));
      return {
        closedW,
        closedH: Math.min(mobile ? 640 : 760, window.innerHeight * (mobile ? 0.74 : 0.84)),
        openW: Math.min(mobile ? window.innerWidth * 0.94 : 1200, window.innerWidth * 0.9),
        openH: Math.min(mobile ? window.innerHeight * 0.72 : 740, window.innerHeight * 0.8),
      };
    };

    const apply = (progress: number) => {
      const unfoldIn = gsap.utils.clamp(0, 1, (progress - UNFOLD_START) / UNFOLD_SPAN);
      const closeIn = gsap.utils.clamp(0, 1, (progress - CLOSE_START) / CLOSE_SPAN);
      const titleIn = gsap.utils.clamp(0, 1, (progress - TITLE_START) / TITLE_SPAN);
      const openU = unfoldIn * unfoldIn * (3 - 2 * unfoldIn);
      const closeU = closeIn * closeIn * (3 - 2 * closeIn);
      const u = openU * (1 - closeU);
      const travel = gsap.utils.clamp(0, 1, (progress - TRAVEL_START) / TRAVEL_SPAN);
      const dim = size();
      book.style.width = `${dim.closedW * 2 + (dim.openW - dim.closedW * 2) * u}px`;
      book.style.height = `${dim.closedH + (dim.openH - dim.closedH) * u}px`;
      book.style.setProperty("--u", u.toFixed(4));
      book.style.setProperty("--fold", `${(179.2 * (1 - u)).toFixed(3)}deg`);
      book.style.setProperty("--spine", gsap.utils.clamp(0, 1, (u - 0.04) / 0.12).toFixed(3));
      book.classList.toggle("is-open", u > 0.42);
      if (u > 0.74 && closeU < 0.06) book.classList.add("is-home-in");
      if (u < 0.36 || closeU > 0.22) book.classList.remove("is-home-in");
      book.style.setProperty("--call", closeU.toFixed(3));
      pin.style.setProperty("--phone-col", `${Math.round(dim.closedW + (window.innerWidth < 768 ? 12 : 64))}px`);
      if (line && (introDoneRef.current || progress > 0.008)) {
        line.style.opacity = "0";
        line.style.visibility = "hidden";
      }
      if (introDoneRef.current && names) {
        const hideOpen = gsap.utils.clamp(0, 1, (openU - 0.35) / 0.28);
        const showNames = closeU < 0.02 && titleIn < 0.01;
        const nameOp = showNames ? 1 - hideOpen : 0;
        names.style.opacity = String(nameOp);
        names.style.visibility = nameOp < 0.02 ? "hidden" : "visible";
      }
      const titleOp = closeU > 0.97 ? titleIn : 0;
      if (finale) {
        finale.style.opacity = String(titleOp);
        finale.style.visibility = titleOp < 0.02 ? "hidden" : "visible";
      }
      if (cue) {
        const hold = gsap.utils.clamp(0, 1, (titleOp - 0.88) / 0.12);
        const leave = gsap.utils.clamp(0, 1, (0.988 - progress) / 0.025);
        const cueOp = hold * leave;
        cue.style.opacity = String(cueOp);
        cue.style.visibility = cueOp < 0.02 ? "hidden" : "visible";
      }
      inners.forEach((node) => {
        const frame = node.parentElement;
        if (!frame) return;
        const max = Math.max(0, node.scrollHeight - frame.clientHeight);
        node.style.transform = `translateY(${(-travel * max).toFixed(1)}px)`;
        const close = node.querySelector<HTMLElement>(".fold-close");
        const heading = close?.querySelector<HTMLElement>(".fold-do-heading");
        const list = close?.querySelector<HTMLElement>(".fold-do-list");
        if (close && heading && list && close.dataset.foldRevealed !== "1") {
          const y = travel * max;
          const view = frame.clientHeight;
          const top = close.offsetTop;
          const frameRect = frame.getBoundingClientRect();
          const headRect = heading.getBoundingClientRect();
          const listRect = list.getBoundingClientRect();
          const headingVisible =
            headRect.bottom > frameRect.top + 12 && headRect.top < frameRect.bottom - 36;
          const stripsWatchable = listRect.top < frameRect.bottom - 56;
          const reachedByTravel = y + view * 0.52 >= top;
          const scrolledPast = y + 64 >= top || listRect.top < frameRect.top + 48;
          if ((headingVisible && stripsWatchable) || reachedByTravel || scrolledPast) {
            close.dataset.foldRevealed = "1";
            close.dispatchEvent(new Event(FOLD_DO_REVEAL));
          }
        }
      });
      const lead = inners[0];
      const leadFrame = lead?.parentElement;
      const maxY = lead && leadFrame ? Math.max(1, lead.scrollHeight - leadFrame.clientHeight) : 1;
      const y = travel * maxY;
      const viewY = leadFrame?.clientHeight ?? 0;
      const current =
        [...INNER_NAV]
          .filter((item) => item.sel)
          .reverse()
          .find((item) => {
            const node = lead?.querySelector<HTMLElement>(item.sel ?? "");
            return (node?.offsetTop ?? 0) <= y + viewY * 0.48;
          })?.id ?? "home";
      if (current !== navId) {
        navId = current;
        setActive(current);
      }
    };

    const onJump = (event: Event) => {
      const target = (event.target as HTMLElement).closest("[data-fold-jump]");
      if (!target) return;
      const key = (target as HTMLElement).dataset.foldJump ?? "";
      const numeric = Number(key);
      if (key !== "" && !Number.isNaN(numeric) && Number.isFinite(numeric)) {
        scrollHeroTo(section, numeric);
        return;
      }
      const item = INNER_NAV.find((entry) => entry.id === key);
      if (item?.outer) {
        scrollToId(item.outer);
        return;
      }
      scrollHeroTo(section, innerProgress(item?.sel ?? ".fold-inner-home"));
    };
    book.addEventListener("click", onJump);

    if (reduced) {
      introDoneRef.current = true;
      section.classList.add("is-ready");
      apply(0.3);
      return () => book.removeEventListener("click", onJump);
    }

    apply(0);

    const intro = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        introDoneRef.current = true;
        section.classList.add("is-ready");
      },
    });
    gsap.set(line, { scaleX: 0, opacity: 1 });
    gsap.set([names, device, chrome, ground], { opacity: 0 });
    gsap.set(device, { scale: 0.9, y: 32 });
    gsap.set(names, { scale: 0.97 });
    intro
      .to(line, { scaleX: 1, duration: 0.75, ease: "power2.out" })
      .to(line, { opacity: 0, duration: 0.32, ease: "power2.out" })
      .add(() => {
        if (line) line.style.visibility = "hidden";
      })
      .to(names, { opacity: 1, scale: 1, duration: 0.7 })
      .to(device, { opacity: 1, scale: 1, y: 0, duration: 0.95 }, "-=0.12")
      .to([chrome, ground], { opacity: 1, duration: 0.4 }, "-=0.45");

    const ctx = gsap.context(() => {
      const state = { progress: 0 };
      gsap.to(state, {
        progress: 1,
        ease: "none",
        onUpdate: () => apply(state.progress),
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.52,
          pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      book.removeEventListener("click", onJump);
      intro.kill();
      ctx.revert();
    };
  }, [reduced]);

  return (
    <section ref={sectionRef} id="home" className="fold-hero">
      <div ref={pinRef} className="fold-pin">
        <header className="fold-chrome">
          <p>{site.fullName}®</p>
        </header>

        <h1 className="sr-only">
          {site.fullName}, {site.role}
        </h1>

        <div className="fold-intro-line" aria-hidden />

        <div ref={namesRef} className="fold-names" aria-hidden>
          <p className="fold-name-left">
            <span>{site.firstName.toUpperCase()}</span>
          </p>
          <span className="fold-name-gap" />
          <p className="fold-name-right">FATIMA SHAFIA</p>
        </div>

        <div ref={finaleRef} className="fold-finale" aria-hidden>
          <p className="fold-finale-left">Mobile App &amp;</p>
          <span className="fold-name-gap" />
          <p className="fold-finale-right">Web Developer</p>
        </div>

        <div ref={cueRef} className="fold-explore" aria-hidden>
          <span>SCROLL TO EXPLORE</span>
          <i className="fold-explore-line" />
          <ChevronDown size={14} strokeWidth={1.75} />
        </div>

        <div className="fold-stage">
          <div className="fold-intro-device">
          <div ref={bookRef} className="fold-book">
            <div className="fold-cover">
              <div className="fold-face fold-face-inner">
                <div className="fold-site-window">
                  <InnerSite time={time} anchors />
                </div>
              </div>
              <div className="fold-face fold-face-lock">
                <LockScreen time={time} />
                <IncomingCall />
              </div>
              <div className="fold-rib" aria-hidden />
            </div>
            <div className="fold-spine">
              <div className="fold-face fold-face-inner is-right">
                <div className="fold-site-window">
                  <InnerSite time={time} />
                </div>
              </div>
            </div>
            <nav className="fold-in-nav" aria-label="On-device">
              {INNER_NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={active === item.id ? "is-on" : undefined}
                  onClick={() => {
                    if (item.outer) {
                      scrollToId(item.outer);
                      return;
                    }
                    if (sectionRef.current && item.sel) {
                      scrollHeroTo(sectionRef.current, innerProgress(item.sel));
                    }
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="fold-crease" aria-hidden />
          </div>
          </div>
          <div className="fold-ground" aria-hidden />
        </div>
      </div>
    </section>
  );
}
