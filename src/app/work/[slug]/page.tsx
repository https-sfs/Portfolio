import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { DesktopMockup } from "@/components/work/Mockups";
import {
  getNextProject,
  getProject,
  projects,
  stackCore,
} from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug);

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="px-4 pb-20 pt-32 sm:px-6 md:px-12">
        <article className="mx-auto max-w-5xl">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Selected Work
          </Link>

          <p className="mt-8 font-mono text-xs uppercase tracking-widest text-neutral-500">
            {project.category} · {project.highlightTag}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
            {project.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-neutral-600 dark:text-neutral-300">
            {project.shortDescription}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 border-y border-neutral-200/80 py-6 md:grid-cols-4 dark:border-neutral-800">
            {[
              ["Role", project.role],
              ["Domain", project.category],
              ["Stack Core", stackCore(project)],
              ["Architecture", project.technologies.join(" · ")],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                  {label}
                </p>
                <p className="mt-2 text-sm font-medium text-neutral-900 dark:text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <DesktopMockup project={project} />
          </div>

          {project.systemOverview ? (
            <section className="mt-14">
              <h2 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">
                System Overview
              </h2>
              <p className="mt-4 text-neutral-600 dark:text-neutral-300">
                {project.systemOverview}
              </p>
            </section>
          ) : null}

          {project.challenge || project.solution ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {project.challenge ? (
                <section className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6 dark:border-amber-900/50 dark:bg-amber-950/20">
                  <h3 className="font-display font-bold text-neutral-900 dark:text-white">
                    The Engineering Challenge
                  </h3>
                  <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">
                    {project.challenge}
                  </p>
                </section>
              ) : null}
              {project.solution ? (
                <section className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/20">
                  <h3 className="font-display font-bold text-neutral-900 dark:text-white">
                    Architectural Solution
                  </h3>
                  <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">
                    {project.solution}
                  </p>
                </section>
              ) : null}
            </div>
          ) : null}

          <section className="mt-8 rounded-2xl bg-neutral-900 p-6 text-white">
            <h3 className="font-display font-bold">Key Technical Achievements</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-neutral-200">
              {project.achievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h3 className="font-display text-xl font-bold text-neutral-900 dark:text-white">
              Technologies &amp; Repositories
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-[11px] text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.backend ? (
                <a
                  href={project.links.backend}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-neutral-900"
                >
                  Backend Repository
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}
              {project.links.frontend ? (
                <a
                  href={project.links.frontend}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm dark:border-neutral-700"
                >
                  Frontend Repository
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}
              {project.links.github && !project.links.backend ? (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-neutral-900"
                >
                  View Code on GitHub
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </section>

          <div className="mt-16 flex items-center justify-between border-t border-neutral-200/80 pt-8 dark:border-neutral-800">
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              Next Project
            </p>
            <Link
              href={`/work/${next.slug}`}
              className="inline-flex items-center gap-2 font-display text-xl font-bold text-neutral-900 dark:text-white"
            >
              {next.title}
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
