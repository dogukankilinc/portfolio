const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

const cursorCss = `
/* ==================== CUSTOM CURSOR ==================== */
body, html {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="8" fill="rgba(0,255,136,0.15)" stroke="%2300ff88" stroke-width="1.5"/><circle cx="16" cy="16" r="2" fill="%2300ff88"/></svg>') 16 16, auto;
}
a, button, .lang-btn, .cert-filter-btn, summary, .hamburger {
  cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="12" fill="rgba(0,255,136,0.25)" stroke="%2300ff88" stroke-width="1.5"/><circle cx="16" cy="16" r="2" fill="%2300ff88"/></svg>') 16 16, pointer !important;
}
`;

if (!css.includes('CUSTOM CURSOR')) {
  css = css + '\n' + cursorCss;
  fs.writeFileSync('css/style.css', css);
  console.log('Added custom cursor to CSS.');
}
