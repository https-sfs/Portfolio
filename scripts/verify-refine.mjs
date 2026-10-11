import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const OUT = ".compare";

async function go(page, p) {
  await page.evaluate((progress) => {
    const hero = document.querySelector(".fold-hero");
    const pinDist = hero.offsetHeight - window.innerHeight;
    window.scrollTo(0, Math.max(0, Math.round(progress * pinDist)));
    window.dispatchEvent(new Event("scroll"));
  }, p);
  await page.waitForTimeout(900);
}

async function snapshot(page) {
  return page.evaluate(() => {
    const box = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
        opacity: Number(s.opacity),
        visibility: s.visibility,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        text: (el.textContent || "").replace(/\s+/g, " ").trim(),
      };
    };
    const overlaps = (a, b) =>
      a &&
      b &&
      a.opacity > 0.05 &&
      b.opacity > 0.05 &&
      a.visibility !== "hidden" &&
      b.visibility !== "hidden" &&
      a.x < b.x + b.w &&
      a.x + a.w > b.x &&
      a.y < b.y + b.h &&
      a.y + a.h > b.y;

    const phone = document.querySelector(".fold-call-ui") || document.querySelector(".fold-book");
    const left = box(document.querySelector(".fold-name-left"));
    const right = box(document.querySelector(".fold-name-right"));
    const finL = box(document.querySelector(".fold-finale-left"));
    const finR = box(document.querySelector(".fold-finale-right"));
    const finale = box(document.querySelector(".fold-finale"));
    const names = box(document.querySelector(".fold-names"));
    const screen = box(phone);
    const sfs = box(document.querySelector(".dev-sfs"));
    const nextN = !!document.querySelector("nextjs-portal, [data-nextjs-dev-overlay], #__next-dev-indicator");
    const nextButtons = [...document.querySelectorAll("button, a")].some(
      (el) => el.textContent?.trim() === "N" && el.getBoundingClientRect().bottom > window.innerHeight - 80,
    );

    return {
      left,
      right,
      finL,
      finR,
      finale,
      names,
      screen,
      sfs,
      nextN,
      nextButtons,
      leftHitsPhone: overlaps(left, screen),
      rightHitsPhone: overlaps(right, screen),
      finLHitsPhone: overlaps(finL, screen),
      finRHitsPhone: overlaps(finR, screen),
      namesVisible: names && names.opacity > 0.05 && names.visibility !== "hidden",
      finaleVisible: finale && finale.opacity > 0.05 && finale.visibility !== "hidden",
      sizeRatio: left && right ? Number(left.h) / Math.max(right.h, 1) : 0,
      weightLeft: left?.fontWeight,
      weightRight: right?.fontWeight,
    };
  });
}

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();

async function run(width, height, prefix) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(3200);

  await go(page, 0);
  const intro = await snapshot(page);
  await page.screenshot({ path: `${OUT}/${prefix}-intro.png` });

  await go(page, 0.28);
  await page.screenshot({ path: `${OUT}/${prefix}-open.png` });

  await go(page, 0.86);
  const closed = await snapshot(page);
  await page.screenshot({ path: `${OUT}/${prefix}-closed.png` });

  await go(page, 0.93);
  const title = await snapshot(page);
  await page.screenshot({ path: `${OUT}/${prefix}-title.png` });

  await go(page, 0);
  const reverse = await snapshot(page);
  await page.screenshot({ path: `${OUT}/${prefix}-reverse.png` });

  await page.close();
  return { intro, closed, title, reverse };
}

const desk = await run(1440, 900, "r-desk");
const mob = await run(390, 844, "r-mob");
await browser.close();

const checks = [
  ["desktop SABOOHI ~2x taller than FATIMA SHAFIA", desk.intro.sizeRatio >= 1.6],
  ["desktop SABOOHI bolder", Number(desk.intro.weightLeft) > Number(desk.intro.weightRight)],
  ["desktop intro names not over phone screen", !desk.intro.leftHitsPhone && !desk.intro.rightHitsPhone],
  ["desktop title split left/right", desk.title.finaleVisible && desk.title.finL?.text === "Mobile App" && desk.title.finR?.text === "& Web Developer"],
  ["desktop title not over phone screen", !desk.title.finLHitsPhone && !desk.title.finRHitsPhone],
  ["desktop names hidden at title", !desk.title.namesVisible],
  ["desktop reverse restores names", desk.reverse.namesVisible],
  ["SFS badge present in dev", Boolean(desk.intro.sfs?.text === "SFS")],
  ["built-in N indicator gone", !desk.intro.nextN && !desk.intro.nextButtons],
  ["mobile SABOOHI larger/bolder", mob.intro.sizeRatio >= 1.4 && Number(mob.intro.weightLeft) > Number(mob.intro.weightRight)],
  ["mobile title split and not over phone", mob.title.finaleVisible && !mob.title.finLHitsPhone && !mob.title.finRHitsPhone],
];

console.log(JSON.stringify({ desk, mob, checks }, null, 2));
console.log("\nCHECKS");
for (const [label, ok] of checks) console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
