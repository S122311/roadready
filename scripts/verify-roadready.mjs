import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

await page.goto("http://localhost:3002/", { waitUntil: "networkidle" });
await page.screenshot({ path: "/tmp/roadready-desktop.png", fullPage: true });

const canvasPixels = await page.locator("#truckCanvas canvas").evaluate((canvas) => {
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  const width = canvas.width;
  const height = canvas.height;
  const data = new Uint8Array(width * height * 4);

  gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);

  let nonBlank = 0;
  for (let index = 0; index < data.length; index += 4) {
    const isBackground = data[index] > 238 && data[index + 1] > 240 && data[index + 2] > 243;
    if (!isBackground) {
      nonBlank += 1;
    }
  }

  return { width, height, nonBlank };
});

await page.locator("button[data-result='pass']").first().click();
await page.locator("#truckCanvas canvas").click({ position: { x: 480, y: 300 } });
await page.screenshot({ path: "/tmp/roadready-after-click.png", fullPage: true });

await page.setViewportSize({ width: 390, height: 900 });
await page.screenshot({ path: "/tmp/roadready-mobile.png", fullPage: true });

console.log(JSON.stringify(canvasPixels));
await browser.close();
