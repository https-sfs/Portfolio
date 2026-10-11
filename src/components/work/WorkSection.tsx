"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { featuredProjects, workFilters } from "@/data/projects";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { ProjectMedia } from "./Mockups";

export function WorkSection() {
  const [filter, setFilter] = useState("All");
  const items = useMemo(
    () =>
      filter === "All"
        ? featuredProjects
        : featuredProjects.filter((project) => project.category === filter),
    [filter],
  );

  return (
    <section id="work" className="px-4 py-20 sm:px-6 sm:py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionEyebrow>/SELECTED WORK</SectionEyebrow>
              <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                Architected &amp; Built Systems
              </h2>
            </div>
            {site.github ? (
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300"
              >
                View GitHub Ecosystem
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </Reveal>

        <div className="mb-4 flex flex-wrap gap-2">
          {workFilters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full px-3 py-1.5 text-sm ${
                filter === item
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "bg-white/80 text-neutral-600 hover:bg-white dark:bg-neutral-900 dark:text-neutral-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div>
          {items.map((project, index) => {
            const reversed = project.mockup === "desktop";
            return (
              <Reveal key={project.slug} y={48}>
                <article
                  className={`group flex flex-col gap-8 border-t border-neutral-200/80 py-10 sm:py-14 lg:items-center lg:gap-14 dark:border-neutral-800 ${
                    reversed ? "lg:flex-row-reverse" : "lg:flex-row"
                  }`}
                >
                  <div className="lg:w-[38%]">
                    <ProjectMedia project={project} />
                  </div>
                  <div className="lg:w-[62%]">
                    <p className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-500">
                      {String(index + 1).padStart(2, "0")} / {project.category}{" "}
                      <span className="text-neutral-400">{project.highlightTag}</span>
                    </p>
                    <h3
                      data-cursor="view"
                      className="font-display text-3xl font-bold tracking-tight text-neutral-900 transition hover:text-emerald-700 sm:text-4xl dark:text-white dark:hover:text-emerald-400"
                    >
                      <Link href={`/work/${project.slug}`}>{project.title}</Link>
                    </h3>
                    <p className="mt-4 max-w-xl text-neutral-600 dark:text-neutral-300">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-neutral-100/80 px-2 py-1 font-mono text-[11px] text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <p className="text-sm text-neutral-500">{project.role}</p>
                      <div className="flex items-center gap-3">
                        {project.links.frontend ? (
                          <a
                            href={project.links.frontend}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-300"
                          >
                            Live
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        ) : null}
                        <Link
                          href={`/work/${project.slug}`}
                          className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                        >
                          Case Study
                          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        {project.links.github || project.links.backend ? (
                          <a
                            href={project.links.backend ?? project.links.github}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.title} repository`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
