// Dev utility: scroll through the page (so scroll reveals fire), then
// capture a full-page screenshot at several viewport widths.
// Usage: node scripts/shoot.mjs <outDir>
import { chromium } from "playwright";

const outDir = process.argv[2] ?? ".";
const sizes = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "desktop", width: 1366, height: 850 },
];

const browser = await chromium.launch();
for (const { name, width, height } of sizes) {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.goto("http://localhost:4173", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500); // let the preloader finish
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 180));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${outDir}/full-${name}.png`, fullPage: true });
  console.log("captured", name);
  await page.close();
}
await browser.close();
