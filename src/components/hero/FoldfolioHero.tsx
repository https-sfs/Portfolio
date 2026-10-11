"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { featuredProjects } from "@/data/projects";
import { services } from "@/data/services";
import { aboutCopy } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { n: "4", l: "Shipped products" },
  { n: "2027", l: "Graduation year" },
  { n: "2nd", l: "App Fusion 2.0" },
  { n: "3", l: "Platforms in play" },
];

const NOTICES = [
  { title: "Gee Cee is live", meta: "Corporate site · now", swatch: "#10b981" },
  { title: "FoodLink — 2nd place", meta: "App Fusion 2.0 · 2h ago", swatch: "#f59e0b" },
];

const INNER_NAV = [
  { id: "home", label: "Home", at: 0.14 },
  { id: "work", label: "Work", at: 0.29 },
  { id: "services", label: "Services", at: 0.44 },
  { id: "about", label: "About", at: 0.52 },
  { id: "contact", label: "Contact", at: 0.58 },
];

function useLockTime() {
  const [time, setTime] = useState("09:41");
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
      <div className="fold-call-head">
        <p className="fold-call-name">{site.firstName}</p>
        <p className="fold-call-last">{site.lastName}</p>
        <p className="fold-call-sub">Incoming call · about your next project</p>
      </div>
      <div className="fold-call-avatar" aria-hidden>
        SF
      </div>
      <div className="fold-call-foot">
        <div className="fold-call-slider">
          <span className="fold-call-handle" aria-hidden />
          <span>slide to talk</span>
        </div>
        <p className="fold-call-mail">{site.email || site.availability}</p>
      </div>
    </div>
  );
}

function LockScreen({ time }: { time: string }) {
  return (
    <div className="fold-lock-ui">
      <div className="fold-lock-hero">
        <p className="fold-clock">{time}</p>
        <p className="fold-lock-role">{site.role}</p>
      </div>
      <div className="fold-lock-portrait" aria-hidden>
        <span>SF</span>
      </div>
      <div className="fold-notices">
        {NOTICES.map((item) => (
          <article key={item.title} className="fold-notice">
            <i style={{ background: item.swatch }} />
            <div>
              <p>{item.title}</p>
              <p>{item.meta}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="fold-dock">
        <span className="fold-dock-btn" aria-hidden />
        <span className="fold-unfold-pill">Scroll to unfold</span>
        <span className="fold-dock-btn is-x" aria-hidden />
      </div>
    </div>
  );
}

function InnerSite({ anchors = false }: { anchors?: boolean }) {
  return (
    <div className="fold-inner" data-fold-inner>
      <section className="fold-inner-home">
        <div className="fold-inner-copy">
          <p className="fold-status-mini">
            <span>09:41</span>
            <span>{site.role}</span>
          </p>
          <h2>
            {site.firstName} {site.lastName}
          </h2>
          <p className="fold-lead">
            I build web, mobile, and backend products that are meant to be used — not just
            presented.
          </p>
          <div className="fold-cta-row">
            <button type="button" data-fold-jump="0.29">
              See the work
            </button>
            <button type="button" className="ghost" data-fold-jump="0.58">
              Say hello
            </button>
          </div>
        </div>
        <div className="fold-inner-portrait" aria-hidden>
          <span>SF</span>
        </div>
      </section>

      <section className="fold-inner-stats" aria-label="Numbers">
        <p>A few numbers</p>
        <div>
          {STATS.map((item) => (
            <div key={item.l}>
              <strong>{item.n}</strong>
              <span>{item.l}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="fold-inner-work" id={anchors ? "work" : undefined}>
        <div className="fold-inner-work-head">
          <h2>Selected work</h2>
          <span>All projects</span>
        </div>
        {featuredProjects.map((project, index) => {
          const href = project.links.frontend ?? `/work/${project.slug}`;
          const external = Boolean(project.links.frontend);
          const body = (
            <>
              <div className="fold-case-visual" style={{ background: project.accentColor }}>
                <b>0{index + 1}</b>
              </div>
              <div className="fold-case-copy">
                <span>
                  0{index + 1} {project.category}
                </span>
                <strong>{project.title}</strong>
                <em>{project.shortDescription}</em>
                <b>
                  View project <ArrowUpRight size={14} />
                </b>
              </div>
            </>
          );
          return external ? (
            <a key={project.slug} href={href} target="_blank" rel="noreferrer" className="fold-case">
              {body}
            </a>
          ) : (
            <Link key={project.slug} href={href} className="fold-case">
              {body}
            </Link>
          );
        })}
      </section>

      <section className="fold-inner-services" id={anchors ? "services" : undefined}>
        <p>What I do</p>
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              <span>{service.index}</span>
              <div>
                <strong>{service.title}</strong>
                <p>{service.whatIBuild}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="fold-inner-about" id={anchors ? "about" : undefined}>
        <p>{aboutCopy.eyebrow}</p>
        <h2>{aboutCopy.headline}</h2>
        <p>{aboutCopy.body}</p>
      </section>

      <section className="fold-inner-contact" id={anchors ? "contact" : undefined}>
        <p>Have a brief that needs a build?</p>
        <h2>Start a project</h2>
        <p>
          {site.availability}. {site.degree} at {site.college}.
        </p>
      </section>
    </div>
  );
}

export function FoldfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const namesRef = useRef<HTMLDivElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);
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
      const unfoldIn = gsap.utils.clamp(0, 1, (progress - 0.012) / 0.11);
      const closeIn = gsap.utils.clamp(0, 1, (progress - 0.64) / 0.16);
      const titleIn = gsap.utils.clamp(0, 1, (progress - 0.81) / 0.08);
      const openU = unfoldIn * unfoldIn * (3 - 2 * unfoldIn);
      const closeU = closeIn * closeIn * (3 - 2 * closeIn);
      const u = openU * (1 - closeU);
      const travel = gsap.utils.clamp(0, 1, (progress - 0.14) / 0.46);
      const dim = size();
      book.style.width = `${dim.closedW * 2 + (dim.openW - dim.closedW * 2) * u}px`;
      book.style.height = `${dim.closedH + (dim.openH - dim.closedH) * u}px`;
      book.style.setProperty("--u", u.toFixed(4));
      book.style.setProperty("--fold", `${(179.2 * (1 - u)).toFixed(3)}deg`);
      book.style.setProperty("--spine", gsap.utils.clamp(0, 1, (u - 0.04) / 0.12).toFixed(3));
      book.classList.toggle("is-open", u > 0.42);
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
      if (finale) {
        const titleOp = closeU > 0.97 ? titleIn : 0;
        finale.style.opacity = String(titleOp);
        finale.style.visibility = titleOp < 0.02 ? "hidden" : "visible";
      }
      inners.forEach((node) => {
        const frame = node.parentElement;
        if (!frame) return;
        const max = Math.max(0, node.scrollHeight - frame.clientHeight);
        node.style.transform = `translateY(${(-travel * max).toFixed(1)}px)`;
      });
      const current =
        [...INNER_NAV].reverse().find((item) => progress >= item.at - 0.08)?.id ?? "home";
      if (current !== navId) {
        navId = current;
        setActive(current);
      }
    };

    const onJump = (event: Event) => {
      const target = (event.target as HTMLElement).closest("[data-fold-jump]");
      if (!target) return;
      scrollHeroTo(section, Number((target as HTMLElement).dataset.foldJump));
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
          scrub: 0.45,
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

        <div className="fold-stage">
          <div className="fold-intro-device">
          <div ref={bookRef} className="fold-book">
            <div className="fold-cover">
              <div className="fold-face fold-face-inner">
                <div className="fold-site-window">
                  <InnerSite />
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
                  <InnerSite />
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
                    if (sectionRef.current) scrollHeroTo(sectionRef.current, item.at);
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
