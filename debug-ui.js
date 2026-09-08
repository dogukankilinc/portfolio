const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  await page.goto('file://C:/Users/Dogukan.kilinc/OneDrive - figes.com.tr/Documents/Antigravity_Try/webSite/index.html', { waitUntil: 'domcontentloaded' });
  await new Promise(r => setTimeout(r, 2000));
  
  try {
      const text = await page.evaluate(() => {
         const el = document.querySelector('[data-lk="aboutP1"]');
         return el ? el.innerText : 'NOT FOUND';
      });
      console.log('aboutP1 text:', text);
      
      const drawer = await page.evaluate(() => {
         const el = document.getElementById('aiDrawerToggle');
         if (!el) return 'NOT FOUND';
         const rect = el.getBoundingClientRect();
         return { left: rect.left, right: rect.right, top: rect.top, width: rect.width, visible: el.offsetParent !== null };
      });
      console.log('Drawer Toggle Bounds:', drawer);
  } catch (e) {
      console.log('ERROR evaluating:', e);
  }
  
  await browser.close();
})();
