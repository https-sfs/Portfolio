"use client";

import { skillGroups, skillMeta } from "@/data/stack";
import { MacWindow } from "@/components/ui/MacWindow";
import { Reveal } from "@/components/ui/Reveal";

const tint: Record<string, string> = {
  emerald: "group-hover:border-emerald-300/70 dark:group-hover:border-emerald-700",
  sky: "group-hover:border-sky-300/70 dark:group-hover:border-sky-700",
  purple: "group-hover:border-purple-300/70 dark:group-hover:border-purple-700",
  amber: "group-hover:border-amber-300/70 dark:group-hover:border-amber-700",
  neutral: "group-hover:border-neutral-300 dark:group-hover:border-neutral-600",
};

export function TechStackSection() {
  return (
    <section className="px-4 py-16 sm:px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <MacWindow
            filename={skillMeta.filename}
            className="border border-neutral-200/80 bg-white/80 shadow-card dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="p-6 sm:p-8">
              <div className="mb-8 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <h2 className="font-display text-2xl font-bold text-neutral-900 dark:text-white">
                  {skillMeta.title}
                </h2>
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                  {skillMeta.count}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {skillGroups.map((group) => (
                  <article
                    key={group.category}
                    className={`group rounded-2xl border border-neutral-200/80 bg-white p-5 transition dark:border-neutral-800 dark:bg-neutral-950 ${tint[group.tint]}`}
                  >
                    <h3 className="font-display font-bold text-neutral-900 dark:text-white">
                      {group.category}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-[11px] text-neutral-600 transition hover:bg-neutral-900 hover:text-white dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-white dark:hover:text-neutral-900"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </MacWindow>
        </Reveal>
      </div>
    </section>
  );
}
