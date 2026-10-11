import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const OUT = ".compare";

async function scrollToProgress(page, progress) {
  await page.evaluate((p) => {
    const hero = document.querySelector(".fold-hero");
    const pinDist = hero.offsetHeight - window.innerHeight;
    window.scrollTo(0, Math.max(0, Math.round(p * pinDist)));
    window.dispatchEvent(new Event("scroll"));
  }, progress);
  await page.waitForTimeout(950);
}

async function measure(page) {
  return page.evaluate(() => {
    const names = document.querySelector(".fold-names");
    const left = document.querySelector(".fold-name-left");
    const right = document.querySelector(".fold-name-right");
    const finale = document.querySelector(".fold-finale");
    const line = document.querySelector(".fold-intro-line");
    const book = document.querySelector(".fold-book");
    const header = document.querySelector(".site-header");
    const call = document.querySelector(".fold-call-ui");
    const hero = document.querySelector(".fold-hero");
    const work = document.getElementById("work");

    const box = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
        opacity: Number(getComputedStyle(el).opacity),
        visibility: getComputedStyle(el).visibility,
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

    const pinDist = hero.offsetHeight - window.innerHeight;
    const progress = pinDist > 0 ? window.scrollY / pinDist : 0;

    return {
      progress: Number(progress.toFixed(3)),
      u: book ? getComputedStyle(book).getPropertyValue("--u").trim() : "",
      fold: book ? getComputedStyle(book).getPropertyValue("--fold").trim() : "",
      call: book ? getComputedStyle(book).getPropertyValue("--call").trim() : "",
      names: box(names),
      left: box(left),
      right: box(right),
      finale: box(finale),
      line: box(line),
      book: box(book),
      header: box(header),
      callUi: box(call),
      workTop: work ? Math.round(work.getBoundingClientRect().top) : null,
      leftOverlapsPhone: overlaps(box(left), box(book)),
      rightOverlapsPhone: overlaps(box(right), box(book)),
      namesVisible: box(names)?.opacity > 0.05 && box(names)?.visibility !== "hidden",
      finaleVisible: box(finale)?.opacity > 0.05 && box(finale)?.visibility !== "hidden",
      headerVisible: box(header)?.opacity > 0.05 && box(header)?.visibility !== "hidden",
      lineVisible: box(line)?.opacity > 0.05 && box(line)?.visibility !== "hidden",
      viewport: { w: window.innerWidth, h: window.innerHeight },
    };
  });
}

async function runViewport(browser, width, height, prefix) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(3200);

  const frames = [
    { name: "00-intro", p: 0 },
    { name: "01-unfold", p: 0.08 },
    { name: "02-open", p: 0.28 },
    { name: "03-inner", p: 0.5 },
    { name: "04-closing", p: 0.72 },
    { name: "05-closed-call", p: 0.86 },
    { name: "06-title", p: 0.93 },
    { name: "07-release", p: 1.02 },
  ];

  const report = [];
  for (const frame of frames) {
    await scrollToProgress(page, Math.min(frame.p, 1));
    if (frame.p > 1) {
      await page.evaluate(() => {
        const hero = document.querySelector(".fold-hero");
        window.scrollTo(0, hero.offsetHeight + 40);
        window.dispatchEvent(new Event("scroll"));
      });
      await page.waitForTimeout(800);
    }
    const data = await measure(page);
    await page.screenshot({ path: `${OUT}/${prefix}-${frame.name}.png`, fullPage: false });
    report.push({ frame: frame.name, ...data });
  }

  await scrollToProgress(page, 0);
  const reversed = await measure(page);
  await page.screenshot({ path: `${OUT}/${prefix}-08-reverse.png` });
  report.push({ frame: "08-reverse", ...reversed });

  await scrollToProgress(page, 0.93);
  const downAgain = await measure(page);
  await page.screenshot({ path: `${OUT}/${prefix}-09-down-again.png` });
  report.push({ frame: "09-down-again", ...downAgain });

  await page.close();
  return report;
}

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const desktop = await runViewport(browser, 1440, 900, "desk");
const mobile = await runViewport(browser, 390, 844, "mob");
await browser.close();

const checks = [];
const intro = desktop.find((d) => d.frame === "00-intro");
const closed = desktop.find((d) => d.frame === "05-closed-call");
const title = desktop.find((d) => d.frame === "06-title");
const release = desktop.find((d) => d.frame === "07-release");
const reverse = desktop.find((d) => d.frame === "08-reverse");
const again = desktop.find((d) => d.frame === "09-down-again");
const mobIntro = mobile.find((d) => d.frame === "00-intro");

checks.push(["desktop names both visible on intro", intro.namesVisible && intro.left.text.includes("SABOOHI") && intro.right.text.includes("FATIMA SHAFIA")]);
checks.push(["desktop names do not overlap phone", !intro.leftOverlapsPhone && !intro.rightOverlapsPhone]);
checks.push(["line gone on settled intro", !intro.lineVisible]);
checks.push(["navbar hidden on intro", !intro.headerVisible]);
checks.push(["right name one line", intro.right && intro.right.h < 90]);
checks.push(["closed phone not landscape-wide", closed.book && closed.book.w < 520]);
checks.push(["incoming call visible when closed", Number(closed.call) > 0.85]);
checks.push(["names hidden after close", !closed.namesVisible && !title.namesVisible]);
checks.push(["title visible after close", title.finaleVisible && title.finale.text.includes("Mobile App")]);
checks.push(["names and title not both visible", !(title.namesVisible && title.finaleVisible)]);
checks.push(["names stay gone on second pass", !again.namesVisible && again.finaleVisible]);
checks.push(["names can return on reverse to start", reverse.namesVisible]);
checks.push(["portfolio reachable after pin", release.workTop !== null && release.workTop < 900]);
checks.push(["mobile names do not overlap phone", !mobIntro.leftOverlapsPhone && !mobIntro.rightOverlapsPhone]);
checks.push(["mobile names readable", mobIntro.left && mobIntro.left.h >= 16]);

console.log(JSON.stringify({ desktop, mobile, checks }, null, 2));
console.log("\nCHECKS");
for (const [label, ok] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
}
