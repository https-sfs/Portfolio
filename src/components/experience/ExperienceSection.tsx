"use client";

import { Building2, Calendar, Check, MapPin } from "lucide-react";
import { experience, experienceCopy } from "@/data/experience";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function ExperienceSection() {
  return (
    <section id="experience" className="px-4 py-20 sm:px-6 sm:py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 px-6 py-10 text-white shadow-dark-card sm:rounded-[36px] sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute right-0 top-8 select-none font-display text-7xl font-black tracking-tight text-white/5 sm:text-[8rem]">
              EXPERIENCE
            </div>
            <div className="relative">
              <SectionEyebrow light>{experienceCopy.eyebrow}</SectionEyebrow>
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
                  {experienceCopy.headline}
                </h2>
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  {experienceCopy.badge}
                </p>
              </div>

              <div className="mt-12 space-y-8">
                {experience.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-3xl bg-white/[0.03] p-6 sm:p-8"
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-display text-2xl font-bold sm:text-3xl">
                            {item.role}
                          </h3>
                          {item.badge ? (
                            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 font-mono text-[11px] text-emerald-400">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                              {item.badge}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-300">
                          <span className="inline-flex items-center gap-1.5">
                            <Building2 className="h-3.5 w-3.5" />
                            {item.organization}
                          </span>
                          {item.location ? (
                            <>
                              <span>•</span>
                              <span className="inline-flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5" />
                                {item.location}
                              </span>
                            </>
                          ) : null}
                        </p>
                      </div>
                      <p className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.duration}
                      </p>
                    </div>
                    <p className="mt-5 max-w-3xl text-neutral-300">{item.description}</p>
                    <ul
                      className={`mt-6 grid gap-3 ${
                        item.highlights.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2"
                      }`}
                    >
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-2 rounded-2xl bg-black/25 p-4 text-sm text-neutral-200"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
