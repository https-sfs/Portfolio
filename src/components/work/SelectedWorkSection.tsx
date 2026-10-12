"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { site } from "@/data/site";
import { MacDots } from "@/components/ui/MacWindow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ShowcaseVideo, type ShowcaseClip } from "@/components/work/ShowcaseVideo";

const SHOWCASE_VIDEOS: Record<string, { src: string; poster?: string; clip?: ShowcaseClip }> = {
  "gee-cee-supplements": {
    src: "/videos/gee-cee-supplements.mp4",
    // Screen recording includes Chrome chrome + the Windows taskbar.
    clip: { top: 140 / 1078, bottom: 58 / 1078 },
  },
  "hackprix-organizer": {
    src: "/videos/hackprix.mp4",
    poster: "/work/hackprix-poster.jpg",
  },
  rixo: {
    src: "/videos/rixo.mp4",
    // Screen recording includes Chrome chrome + the Windows taskbar.
    clip: { top: 108 / 1078, bottom: 58 / 1078 },
  },
  foodlink: {
    src: "/videos/foodlink.mp4",
    poster: "/work/foodlink-poster.jpg",
  },
};

const SHOWCASE_SLUGS = [
  "gee-cee-supplements",
  "hackprix-organizer",
  "rixo",
  "foodlink",
] as const;

const SHOWCASE_TITLES: Record<string, string> = {
  "hackprix-organizer": "HackPrix",
  rixo: "RIXO",
};

const SHOWCASE_COPY: Record<
  string,
  { description: string; role: string; action: string }
> = {
  "gee-cee-supplements": {
    description:
      "Built an immersive 3D-style website for Gee Cee Supplements, combining expressive visual storytelling, smooth GSAP animations, and a responsive interface to bring the brand experience to life.",
    role: "Web Developer",
    action: "Explore Website",
  },
  "hackprix-organizer": {
    description:
      "Built a Flutter application for HackPrix that brings event schedules, seat allocation, participant information, announcements, and organizer operations into one streamlined experience.",
    role: "App Developer",
    action: "View App",
  },
  rixo: {
    description:
      "Engineered a risk-intelligence platform that combines transaction anomaly analysis, machine-learning-assisted evidence, and structured investigation workflows, with an auditable approval process and controlled Razorpay test-mode simulations.",
    role: "Backend Architect & Web Developer",
    action: "View Live Demo",
  },
  foodlink: {
    description:
      "Built a community-focused food redistribution app connecting donors, NGOs, and communities through food-sharing workflows, location-based discovery, and coordinated pickup experiences.",
    role: "App Developer",
    action: "Explore App",
  },
};

function showcaseProjects() {
  return SHOWCASE_SLUGS.map((slug) => projects.find((project) => project.slug === slug)).filter(
    (project): project is Project => Boolean(project),
  );
}

function projectCopy(project: Project) {
  const override = SHOWCASE_COPY[project.slug];
  return {
    title: SHOWCASE_TITLES[project.slug] ?? project.title,
    category: project.category,
    description: override?.description ?? project.cardDescription ?? project.shortDescription,
    role: override?.role ?? project.role,
    action: override?.action ?? "Case Study",
    technologies:
      project.cardTechnologies?.length ? project.cardTechnologies : project.technologies,
  };
}

function BrowserFrame({ project }: { project: Project }) {
  const url = project.links.frontend?.replace(/^https?:\/\//, "") ?? project.title;
  const video = SHOWCASE_VIDEOS[project.slug];

  return (
    <div className="mac-window border border-neutral-200/80 bg-white shadow-card transition-transform duration-500 group-hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mac-window-bar">
        <MacDots />
        <span className="ml-2 truncate font-mono text-[11px] tracking-wide text-neutral-500">
          {url}
        </span>
      </div>
      <div className="relative h-64 overflow-hidden bg-neutral-100 sm:h-80 lg:h-[420px] dark:bg-neutral-900">
        {video && project.image ? (
          <ShowcaseVideo
            src={video.src}
            poster={video.poster ?? project.image}
            title={project.title}
            clip={video.clip}
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt=""
            fill
            unoptimized
            sizes="(max-width: 1023px) 92vw, 58vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full items-end p-6">
            <strong className="font-display text-2xl text-neutral-900 dark:text-white">
              {project.title}
            </strong>
          </div>
        )}
      </div>
    </div>
  );
}

function PhoneFrame({ project }: { project: Project }) {
  const video = SHOWCASE_VIDEOS[project.slug];

  return (
    <div className="mx-auto w-[min(100%,22.5rem)] transition-transform duration-500 group-hover:-translate-y-1">
      <div className="rounded-[2.15rem] bg-neutral-950 p-[9px] shadow-[0_28px_48px_-26px_rgba(0,0,0,0.55)] ring-1 ring-black/10">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[1.65rem] bg-white">
          <span className="absolute left-1/2 top-[7px] z-10 h-[11px] w-[32%] -translate-x-1/2 rounded-full bg-black/90" />
          {video && (video.poster || project.image) ? (
            <ShowcaseVideo
              src={video.src}
              poster={video.poster ?? project.image!}
              title={project.title}
              clip={video.clip}
              sizes="360px"
            />
          ) : project.image ? (
            <Image
              src={project.image}
              alt=""
              fill
              unoptimized
              sizes="360px"
              className="object-cover object-left object-top"
            />
          ) : (
            <div className="flex h-full items-end p-4 text-neutral-900">
              <strong className="font-display text-sm">{project.title}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectMedia({ project, website }: { project: Project; website: boolean }) {
  return website ? <BrowserFrame project={project} /> : <PhoneFrame project={project} />;
}

export function SelectedWorkSection() {
  const items = useMemo(() => showcaseProjects(), []);
  const filters = useMemo(
    () => ["All", ...new Set(items.map((project) => project.category))],
    [items],
  );
  const [active, setActive] = useState("All");
  const visible = active === "All" ? items : items.filter((project) => project.category === active);
  const github = site.github || "https://github.com/https-sfs";

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 md:px-12">
      <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 md:flex-row md:items-end">
        <Reveal>
          <SectionEyebrow>/SELECTED WORK</SectionEyebrow>
          <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
            Architected &amp; Built Systems
          </h2>
        </Reveal>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start rounded-full border border-neutral-200/80 bg-white/80 px-5 py-3 text-sm text-neutral-800 shadow-subtle transition hover:bg-white dark:border-neutral-700/60 dark:bg-neutral-900/80 dark:text-neutral-200 dark:hover:bg-neutral-900 md:self-auto"
        >
          View GitHub Ecosystem
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mb-2 flex flex-wrap items-center gap-2 sm:mb-4">
        {filters.map((filter) => {
          const on = active === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={`rounded-full px-4 py-2 font-mono text-xs font-medium transition-all ${
                on
                  ? "bg-neutral-900 text-white shadow-subtle dark:bg-white dark:text-neutral-900"
                  : "border border-neutral-200/60 bg-white/80 text-neutral-600 shadow-subtle hover:bg-white dark:border-neutral-700/60 dark:bg-neutral-900/80 dark:text-neutral-400 dark:hover:bg-neutral-900"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => {
            const index = items.indexOf(project);
            const number = String(index + 1).padStart(2, "0");
            const desktop = project.mockup === "desktop";
            const copy = projectCopy(project);
            const live = project.links.frontend;

            return (
              <motion.article
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group relative border-t border-neutral-200/80 py-10 first:border-t-0 first:pt-0 sm:py-14 dark:border-neutral-800"
              >
                <div
                  className={`flex flex-col items-center gap-8 lg:gap-12 ${
                    desktop ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-full shrink-0 ${desktop ? "lg:w-[58%]" : "lg:w-[60%]"}`}
                  >
                    {live ? (
                      <a
                        href={live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open live ${copy.title} project`}
                        className="block cursor-pointer"
                      >
                        <ProjectMedia project={project} website={desktop} />
                      </a>
                    ) : (
                      <ProjectMedia project={project} website={desktop} />
                    )}
                  </div>

                  <div className={`flex w-full flex-col ${desktop ? "lg:w-[42%]" : "lg:w-[40%]"}`}>
                    <div className="mb-5 flex items-start justify-between gap-5">
                      <p className="font-mono text-[11px] tracking-[0.16em] text-neutral-400">
                        {number} / {copy.category}
                      </p>
                      <p className="max-w-[14rem] text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-neutral-400">
                        {project.highlightTag}
                      </p>
                    </div>

                    <Link href={`/work/${project.slug}`}>
                      <h3 className="mb-4 cursor-pointer font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.035em] text-neutral-900 transition-colors duration-300 group-hover:text-emerald-700 sm:text-[2.55rem] dark:text-white dark:group-hover:text-emerald-400">
                        {copy.title}
                      </h3>
                    </Link>

                    <p className="mb-6 max-w-[40ch] text-[0.95rem] leading-[1.7] tracking-[-0.011em] text-neutral-500 dark:text-neutral-400">
                      {copy.description}
                    </p>

                    {copy.technologies.length ? (
                      <div className="mb-6 flex flex-wrap gap-2">
                        {copy.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-neutral-200/80 bg-white px-3 py-1 font-mono text-[10px] tracking-[0.04em] text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-auto flex flex-wrap items-end justify-between gap-x-5 gap-y-2 border-t border-neutral-200/70 pt-5 dark:border-neutral-800">
                      <p className="min-w-0 max-w-[18rem] font-mono text-[11px] leading-relaxed tracking-[0.02em] text-neutral-500 dark:text-neutral-400">
                        {copy.role}
                      </p>
                      {live ? (
                        <a
                          href={live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex shrink-0 items-center gap-1 font-mono text-[11px] font-medium tracking-[0.04em] text-neutral-900 transition-colors duration-300 hover:text-emerald-700 dark:text-white dark:hover:text-emerald-400"
                        >
                          {copy.action}
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </a>
                      ) : (
                        <Link
                          href={`/work/${project.slug}`}
                          className="group/link inline-flex shrink-0 items-center gap-1 font-mono text-[11px] font-medium tracking-[0.04em] text-neutral-900 transition-colors duration-300 hover:text-emerald-700 dark:text-white dark:hover:text-emerald-400"
                        >
                          {copy.action}
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
