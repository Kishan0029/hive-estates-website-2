const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

(async () => {
  const htmlPath = path.resolve(__dirname, 'dist', 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

  // We need to load the JS files mentioned in index.html manually or let JSDOM do it.
  const dom = new JSDOM(htmlContent, {
    url: "http://localhost/",
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true
  });

  dom.window.console.error = (msg) => {
    console.log("[REACT ERROR]", msg);
  };
  
  dom.window.console.log = (msg) => {
    console.log("[LOG]", msg);
  };

  dom.window.addEventListener("error", (event) => {
    console.log("[GLOBAL ERROR]", event.error || event.message);
  });

  dom.window.addEventListener("unhandledrejection", (event) => {
    console.log("[UNHANDLED PROMISE]", event.reason);
  });

  setTimeout(() => {
    const rootHtml = dom.window.document.getElementById('root').innerHTML;
    console.log("Root HTML length after 3s:", rootHtml.length);
    if (rootHtml.length < 50) {
       console.log("Root HTML:", rootHtml);
    }
    process.exit(0);
  }, 3000);
})();
