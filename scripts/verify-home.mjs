import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir(".compare", { recursive: true });
const browser = await chromium.launch();

async function go(page, p) {
  await page.evaluate((progress) => {
    const hero = document.querySelector(".fold-hero");
    window.scrollTo(0, Math.round(progress * (hero.offsetHeight - window.innerHeight)));
    window.dispatchEvent(new Event("scroll"));
  }, p);
  await page.waitForTimeout(1100);
}

async function run(width, height, prefix) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(3000);
  await go(page, 0);
  const closed = await page.evaluate(() => ({
    lock: Boolean(document.querySelector(".fold-lock-wallpaper img")),
    lockSrc: document.querySelector(".fold-lock-wallpaper img")?.getAttribute("src") || "",
  }));
  await page.screenshot({ path: `.compare/${prefix}-closed.png` });

  await go(page, 0.125);
  await page.waitForTimeout(1400);
  const home = await page.evaluate(() => ({
    art: document.querySelector(".fold-home-art img")?.getAttribute("src") || "",
    sfsHtml: Boolean(document.querySelector(".fold-sfs-mark")),
    kickers: [...document.querySelectorAll(".fold-home-kicker")].map((n) => n.textContent.trim()),
    homeIn: document.querySelector(".fold-book")?.classList.contains("is-home-in"),
    ctas: [...document.querySelectorAll("[data-fold-jump]")].slice(0, 2).map((b) => b.textContent.trim()),
  }));
  await page.screenshot({ path: `.compare/${prefix}-home.png` });

  await go(page, 0.32);
  await page.screenshot({ path: `.compare/${prefix}-work.png` });
  await go(page, 0);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `.compare/${prefix}-reverse.png` });
  await go(page, 0.93);
  await page.screenshot({ path: `.compare/${prefix}-end.png` });
  await page.close();
  return { closed, home };
}

const desk = await run(1440, 900, "home-desk");
const mob = await run(390, 844, "home-mob");
await browser.close();
console.log(JSON.stringify({ desk, mob }, null, 2));
