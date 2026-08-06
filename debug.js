const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`[${msg.type()}] ${msg.text()}`);
    }
  });

  page.on('pageerror', error => {
    console.log(`[pageerror] ${error.message}`);
  });

  try {
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0', timeout: 10000 });
    const bodyContent = await page.evaluate(() => document.body.innerHTML);
    if (!bodyContent || bodyContent.trim() === '' || bodyContent.includes('id="root"')) {
      const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML);
      console.log("Root HTML length:", rootHtml?.length);
      if (!rootHtml || rootHtml.trim() === '') {
        console.log("Root is empty! White screen confirmed.");
      }
    }
  } catch (e) {
    console.log("Puppeteer Error:", e);
  }
  
  await browser.close();
})();
