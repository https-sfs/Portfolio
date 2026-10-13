"use client";

import { Medal, Star, Trophy } from "lucide-react";
import { achievements, achievementsCopy, type AchievementAccent, type AchievementItem } from "@/data/achievements";
import { AchievementBrand } from "@/components/achievements/AchievementMarks";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";

const badgeTone: Record<AchievementAccent, string> = {
  gold: "bg-[#FFF3D6] text-[#9A6B12]",
  blue: "bg-[#E8F0FF] text-[#2F5FBF]",
  violet: "bg-[#EEE8FF] text-[#5B4BC9]",
  coral: "bg-[#FFE4E1] text-[#C24A42]",
  ink: "bg-[#EEF1F4] text-[#3A4450]",
  orange: "bg-[#FFE8CC] text-[#B86A12]",
  emerald: "bg-[#E5F6EE] text-[#1F7A4D]",
};

const badgeIcons = {
  trophy: Trophy,
  medal: Medal,
  star: Star,
};

function AchievementCard({ item }: { item: AchievementItem }) {
  const BadgeIcon = badgeIcons[item.badgeIcon];

  return (
    <article className="flex h-full flex-col rounded-2xl border border-neutral-200/80 bg-white px-5 py-4 shadow-subtle">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] text-neutral-400">{item.index}</span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] ${badgeTone[item.accent]}`}
        >
          <BadgeIcon className="h-2.5 w-2.5" strokeWidth={2.25} />
          {item.recognition}
        </span>
      </div>

      <div className="mt-3 flex min-h-0 flex-1 items-start gap-3.5">
        <div className="flex w-12 shrink-0 flex-col">
          <div
            className={`flex h-11 w-11 items-center justify-center ${
              item.logoPanel === "dark" ? "overflow-hidden rounded-xl bg-neutral-950" : ""
            }`}
          >
            <AchievementBrand item={item} />
          </div>
          <p className="mt-1.5 min-h-[1.5rem] font-mono text-[8px] uppercase leading-3 tracking-[0.14em] text-neutral-400">
            {item.caption.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-[15px] font-bold leading-snug tracking-tight text-neutral-900 sm:text-base">
            {item.title}
          </h3>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-neutral-500">{item.description}</p>
        </div>
      </div>
    </article>
  );
}

export function AchievementsSection() {
  return (
    <section id="achievements" className="relative px-4 py-16 sm:px-6 sm:py-20 md:px-12">
      <div className="relative mx-auto max-w-7xl overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-8 select-none font-display text-4xl font-black tracking-tight text-neutral-900/5 sm:text-6xl lg:text-7xl"
        >
          ACHIEVEMENTS
        </div>
        <Reveal>
          <div className="relative max-w-xl">
            <SectionEyebrow>{achievementsCopy.eyebrow}</SectionEyebrow>
            <h2 className="font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              {achievementsCopy.headlineLead}{" "}
              <span
                className="italic font-normal text-[#146B4A]"
                style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
              >
                {achievementsCopy.headlineAccent}
              </span>
            </h2>
            <p className="mt-4 max-w-[26rem] text-[15px] leading-relaxed text-neutral-500">
              {achievementsCopy.body}
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-4 sm:mt-10 sm:grid-cols-2 sm:auto-rows-[1fr] lg:grid-cols-3">
          {achievements.map((item, index) => (
            <Reveal key={item.id} className="h-full" delay={index * 0.03} y={16}>
              <AchievementCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
