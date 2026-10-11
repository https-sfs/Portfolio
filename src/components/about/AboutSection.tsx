"use client";

import { Bot, GitBranch, Layers, ShieldCheck, Target } from "lucide-react";
import { aboutApproach, aboutCopy, aboutStandards } from "@/data/about";
import { MacWindow } from "@/components/ui/MacWindow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const approachIcons = [Target, GitBranch, Layers];
const standardIcons = [ShieldCheck, Bot];

export function AboutSection() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 sm:py-32 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <Reveal>
            <SectionEyebrow>{aboutCopy.eyebrow}</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
              {aboutCopy.headline}
            </h2>
            <MacWindow
              filename={aboutCopy.manifest.filename}
              dark
              className="mt-10 shadow-dark-card bg-neutral-950 text-white"
            >
              <div className="space-y-3 p-6 font-mono text-sm">
                {aboutCopy.manifest.fields.map((field) => (
                  <p key={field.key}>
                    <span className="text-emerald-400">{field.key}</span>
                    <span className="text-neutral-500">: </span>
                    <span className="text-neutral-100">{field.value}</span>
                  </p>
                ))}
                <p className="text-emerald-400">
                  <span className="animate-pulse">▌</span>
                </p>
              </div>
            </MacWindow>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pt-10">
          <Reveal>
            <p className="text-neutral-600 dark:text-neutral-300">{aboutCopy.body}</p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {aboutApproach.map((card, index) => {
              const Icon = approachIcons[index];
              return (
                <Reveal key={card.title} delay={index * 0.05}>
                  <article className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-subtle dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-emerald-500 transition group-hover:scale-x-100" />
                    <Icon className="h-4 w-4 text-emerald-600" />
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                      {card.index} / {card.title}
                    </p>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                      {card.desc}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {aboutStandards.map((card, index) => {
              const Icon = standardIcons[index];
              return (
                <Reveal key={card.title} delay={0.1 + index * 0.05}>
                  <article className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-subtle dark:border-neutral-800 dark:bg-neutral-900">
                    <Icon className="h-4 w-4 text-emerald-600" />
                    <h3 className="mt-4 font-display font-bold text-neutral-900 dark:text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                      {card.desc}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
