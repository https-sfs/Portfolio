"use client";

import { contactCopy } from "@/data/experience";
import { site } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";

export function ContactSection() {
  return (
    <section id="contact" className="px-4 py-24 sm:px-6 sm:py-36 md:px-12">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-neutral-900 px-6 py-16 text-center text-white shadow-dark-card sm:rounded-[40px] sm:px-12 sm:py-24">
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                {contactCopy.chip}
              </span>
              <h2 className="mx-auto mt-8 max-w-5xl font-display text-4xl font-black tracking-tight sm:text-6xl lg:text-8xl">
                {contactCopy.headline}
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-neutral-300">{contactCopy.body}</p>
              <p className="mx-auto mt-8 font-display text-xl font-semibold">
                {site.fullName}
              </p>
              <p className="mt-2 text-sm text-neutral-400">{site.role}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
