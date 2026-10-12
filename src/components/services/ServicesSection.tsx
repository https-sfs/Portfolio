"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { MacWindow } from "@/components/ui/MacWindow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

export function ServicesSection({
  id,
  compact = false,
}: {
  id?: string;
  compact?: boolean;
}) {
  const [openId, setOpenId] = useState(services[0].id);

  return (
    <section
      id={id}
      className={`services-section${compact ? " is-compact" : ""} px-4 py-20 sm:px-6 sm:py-32 md:px-12`}
    >
      <div className="mx-auto max-w-7xl">
        {compact ? (
          <div>
            <SectionEyebrow>/SERVICES &amp; CAPABILITIES</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
              Core Engineering Practice
            </h2>
          </div>
        ) : (
          <Reveal>
            <SectionEyebrow>/SERVICES &amp; CAPABILITIES</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
              Core Engineering Practice
            </h2>
          </Reveal>
        )}

        <div className="mt-10 divide-y divide-neutral-200/80 dark:divide-neutral-800">
          {services.map((service) => {
            const open = openId === service.id;
            return (
              <div key={service.id}>
                <button
                  type="button"
                  data-cursor="open"
                  onClick={() => setOpenId(open ? "" : service.id)}
                  className={`flex w-full items-center justify-between gap-4 py-6 text-left transition ${
                    open ? "" : "hover:bg-white/50 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-4 sm:gap-6">
                    <span className="shrink-0 font-mono text-sm text-neutral-400">
                      {service.index}
                    </span>
                    <h3 className="min-w-0 font-display text-lg font-bold tracking-tight text-neutral-900 sm:text-2xl dark:text-white">
                      {service.title}
                    </h3>
                  </div>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 transition dark:border-neutral-700 ${
                      open ? "rotate-45 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : ""
                    }`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>

                {open ? (
                  <div className="pb-8">
                    <div className="rounded-[28px] border border-neutral-200/80 bg-white p-3 shadow-card dark:border-neutral-800 dark:bg-neutral-950">
                      <MacWindow
                        filename={service.filename}
                        dark
                        className="shadow-dark-card bg-neutral-900 text-white"
                      >
                        <div className="grid gap-8 p-6 lg:grid-cols-12">
                          <div className="lg:col-span-7">
                            <span className="inline-flex rounded-full bg-emerald-500/15 px-3 py-1 font-mono text-[11px] text-emerald-400">
                              Service Architecture
                            </span>
                            <p className="mt-4 text-neutral-200">{service.description}</p>
                            <div className="mt-8 rounded-2xl bg-black/30 p-5">
                              <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                                Deliverables &amp; Core Logic
                              </h4>
                              <p className="mt-3 text-neutral-300">{service.whatIBuild}</p>
                            </div>
                          </div>
                          <div className="lg:col-span-5">
                            <h4 className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                              Primary Stack
                            </h4>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {service.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-md bg-white/10 px-2 py-1 font-mono text-[11px] text-neutral-200"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <h4 className="mt-8 font-mono text-xs uppercase tracking-widest text-neutral-400">
                              Use Case Profile
                            </h4>
                            <p className="mt-3 text-neutral-300">{service.useCases}</p>
                          </div>
                        </div>
                      </MacWindow>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
