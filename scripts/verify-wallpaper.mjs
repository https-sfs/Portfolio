import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir(".compare", { recursive: true });
const browser = await chromium.launch();

async function run(width, height, prefix) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(2800);
  const intro = await page.evaluate(() => ({
    src: document.querySelector(".fold-lock-wallpaper img")?.getAttribute("src"),
    role: document.querySelector(".fold-lock-role")?.textContent,
    place: document.querySelector(".fold-lock-place")?.textContent,
  }));
  await page.screenshot({ path: `.compare/${prefix}-intro.png` });
  await page.evaluate(() => {
    const hero = document.querySelector(".fold-hero");
    window.scrollTo(0, Math.round(0.28 * (hero.offsetHeight - window.innerHeight)));
    window.dispatchEvent(new Event("scroll"));
  });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `.compare/${prefix}-open.png` });
  await page.evaluate(() => {
    const hero = document.querySelector(".fold-hero");
    window.scrollTo(0, Math.round(0.93 * (hero.offsetHeight - window.innerHeight)));
    window.dispatchEvent(new Event("scroll"));
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `.compare/${prefix}-closed.png` });
  await page.close();
  return intro;
}

const desk = await run(1440, 900, "wp-desk");
const mob = await run(390, 844, "wp-mob");
await browser.close();
console.log(JSON.stringify({ desk, mob }, null, 2));
