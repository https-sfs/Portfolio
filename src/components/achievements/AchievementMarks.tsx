import type { AchievementItem } from "@/data/achievements";

export function AchievementBrand({ item }: { item: AchievementItem }) {
  if (!item.logo) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.logo}
      alt={item.logoAlt ?? ""}
      className={`h-11 w-11 object-contain ${item.logoFilter === "invert" ? "invert" : ""} ${item.logoClass ?? ""}`}
    />
  );
}
