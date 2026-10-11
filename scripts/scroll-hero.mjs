import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
await page.screenshot({ path: ".compare/seq-0-closed.png" });
await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 2.2)));
await page.waitForTimeout(700);
await page.screenshot({ path: ".compare/seq-1-open.png" });
await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 4.4)));
await page.waitForTimeout(700);
await page.screenshot({ path: ".compare/seq-2-load.png" });
await page.evaluate(() => window.scrollTo(0, Math.round(window.innerHeight * 7.2)));
await page.waitForTimeout(700);
await page.screenshot({ path: ".compare/seq-3-enter.png" });
await browser.close();
