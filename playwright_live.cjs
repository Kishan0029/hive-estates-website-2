const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log(`[CONSOLE] ${msg.type()}: ${msg.text()}`));
  page.on('pageerror', exception => console.log(`[PAGE ERROR] ${exception}`));

  await page.goto('https://hiveestates2.gonextverse.in/');
  await page.waitForTimeout(5000);
  
  const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML);
  console.log("Root length:", rootHtml?.length);
  
  await browser.close();
})();
