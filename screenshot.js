const { chromium } = require('playwright');
const fs = require('fs');

const projects = [
    { id: "group1-6", url: "http://localhost:3031/projects/group1-6/index.html" },
    { id: "group7-12", url: "http://localhost:3031/projects/group7-12/index.html" },
    { id: "group13-18", url: "http://localhost:3031/projects/group13-18/index.html" },
    { id: "group19-24", url: "http://localhost:3031/projects/group19-24/dist/index.html" },
    { id: "group25-30", url: "http://localhost:3031/projects/group25-30/index.html" },
    { id: "group31-36", url: "http://localhost:3031/projects/group31-36/index.html" },
    { id: "group37-42", url: "http://localhost:3031/projects/group37-42/index.html" },
    { id: "group37-42-b", url: "http://localhost:3031/projects/group37-42-b/index.html" },
    { id: "group43-49", url: "http://localhost:3031/projects/group43-49/index.html" },
    { id: "group50-55", url: "http://localhost:3031/projects/group50-55/dist/index.html" },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
  
  if (!fs.existsSync('thumbnails')) {
    fs.mkdirSync('thumbnails');
  }

  for (const p of projects) {
    try {
        console.log(`Taking screenshot for ${p.id}...`);
        await page.goto(p.url, { waitUntil: 'networkidle', timeout: 5000 });
        // wait a bit for any animations
        await page.waitForTimeout(1000);
        await page.screenshot({ path: `thumbnails/${p.id}.jpg`, type: 'jpeg', quality: 80 });
    } catch (e) {
        console.error(`Failed to screenshot ${p.id}: ${e.message}`);
    }
  }

  await browser.close();
})();
