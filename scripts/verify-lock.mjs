import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir(".compare", { recursive: true });

async function shot(browser, width, height, prefix) {
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(3200);

  const intro = await page.evaluate(() => ({
    wallpaper: Boolean(document.querySelector(".fold-lock-wallpaper img")),
    src: document.querySelector(".fold-lock-wallpaper img")?.getAttribute("src"),
    role: document.querySelector(".fold-lock-role")?.textContent,
    place: document.querySelector(".fold-lock-place")?.textContent,
    notices: [...document.querySelectorAll(".fold-notice")].map((node) =>
      node.textContent.replace(/\s+/g, " ").trim(),
    ),
    names: {
      l: document.querySelector(".fold-name-left")?.textContent.trim(),
      r: document.querySelector(".fold-name-right")?.textContent.trim(),
    },
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

const browser = await chromium.launch();
const desk = await shot(browser, 1440, 900, "lock-desk");
const mob = await shot(browser, 390, 844, "lock-mob");
await browser.close();
console.log(JSON.stringify({ desk, mob }, null, 2));
