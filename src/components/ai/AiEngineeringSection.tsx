"use client";

import {
  aiEngineeringCopy,
  aiWorkflowTiles,
  appliedToolkit,
  workflowCapabilities,
} from "@/data/about";
import { MacWindow } from "@/components/ui/MacWindow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function AiEngineeringSection() {
  return (
    <section id="ai-engineering" className="px-4 py-20 sm:px-6 sm:py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionEyebrow>{aiEngineeringCopy.eyebrow}</SectionEyebrow>
          <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            {aiEngineeringCopy.headline}
          </h2>
          <p className="mt-6 max-w-3xl text-neutral-600 dark:text-neutral-300">
            {aiEngineeringCopy.intro}
          </p>
          <p className="mt-6 max-w-3xl rounded-2xl border border-emerald-200/70 bg-emerald-50/70 p-5 text-sm text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100">
            {aiEngineeringCopy.distinction}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {aiWorkflowTiles.map((tile, index) => (
            <Reveal key={tile.stage} delay={index * 0.04}>
              <article className="h-full rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-subtle dark:border-neutral-800 dark:bg-neutral-900">
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                    tile.lead === "AI-Assisted"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                      : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                  }`}
                >
                  {tile.lead}
                </span>
                <h3 className="mt-3 font-display font-bold text-neutral-900 dark:text-white">
                  {tile.stage}
                </h3>
                <p className="mt-2 text-xs leading-5 text-neutral-500 dark:text-neutral-400">
                  {tile.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <MacWindow
            filename="ai_workflow.config.ts"
            dark
            className="shadow-dark-card bg-neutral-900 text-white"
          >
            <div className="grid gap-8 p-6 lg:grid-cols-2">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  Workflow Capabilities
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {workflowCapabilities.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-white/10 px-2 py-1 font-mono text-[11px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  Applied Toolkit
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {appliedToolkit.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-white/10 px-2 py-1 font-mono text-[11px]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </MacWindow>
          <p className="mt-6 max-w-3xl text-neutral-600 dark:text-neutral-300">
            {aiEngineeringCopy.philosophy}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
