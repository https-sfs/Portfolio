"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects, type Project } from "@/data/projects";
import { site } from "@/data/site";

const SHOWCASE = featuredProjects;
const GITHUB = site.github || "https://github.com/https-sfs";

function WorkVisual({ project }: { project: Project }) {
  if (!project.image) {
    return (
      <div className="work-visual work-visual-pending" aria-hidden>
        <span>Image pending</span>
      </div>
    );
  }

  return (
    <div
      className={`work-visual has-shot${project.imageFit === "contain" ? " is-contain" : ""}`}
    >
      <Image
        src={project.image}
        alt=""
        fill
        quality={95}
        sizes="(max-width: 767px) 92vw, min(920px, 52vw)"
        unoptimized
        className="work-shot"
      />
    </div>
  );
}

export function WorkSection({ id }: { id?: string }) {
  return (
    <section id={id} className="work-section">
      <div className="work-section-inner">
        <header className="work-head">
          <h2 className="work-heading">Selected Work</h2>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="work-all"
            aria-label="View GitHub profile"
          >
            View GitHub Profile
            <ArrowUpRight size={14} />
          </a>
        </header>

        <div className="work-list">
          {SHOWCASE.map((project, index) => {
            const number = String(index + 1).padStart(2, "0");
            const live = project.links.frontend;
            const imageLeft = index % 2 === 0;
            const title = project.cardTitle ?? project.title;
            const category = project.cardCategory ?? project.category;
            const description = project.cardDescription ?? project.description;
            const technologies = project.cardTechnologies ?? project.technologies;

            return (
              <article
                key={project.slug}
                className={`work-item${imageLeft ? "" : " is-flipped"}`}
                style={{ ["--i" as string]: index }}
              >
                <WorkVisual project={project} />
                <div className="work-copy">
                  <p className="work-index">
                    <span className="work-num">{number}</span>
                    <span className="work-cat">{category}</span>
                  </p>
                  <h3 className="work-title">{title}</h3>
                  <p className="work-desc">{description}</p>
                  {technologies.length ? (
                    <ul className="work-stack">
                      {technologies.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  ) : null}
                  {live ? (
                    <div className="work-actions">
                      <a
                        href={live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-action"
                        aria-label={`Open live ${project.title} site`}
                      >
                        View project
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
