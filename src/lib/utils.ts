export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector(".site-header");
  const offset = Math.round((header?.getBoundingClientRect().height ?? 64) + 20);
  el.style.scrollMarginTop = `${offset}px`;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
