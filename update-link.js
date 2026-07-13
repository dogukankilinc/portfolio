const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const searchStr = '<div class="live-status">\n        <span class="live-dot"></span>\n        <span data-lk="liveStatus">Open to Collaboration</span>\n      </div>';
const replaceStr = '<a href="#contact" class="live-status" style="text-decoration:none; color:inherit; cursor:pointer;" title="Contact Me">\n        <span class="live-dot"></span>\n        <span data-lk="liveStatus">Open to Collaboration</span>\n      </a>';

if (html.includes(searchStr)) {
  html = html.replace(searchStr, replaceStr);
  fs.writeFileSync('index.html', html);
  console.log('Successfully replaced live-status with anchor tag in index.html');
} else {
  console.log('Search string not found in index.html');
}

let css = fs.readFileSync('css/style.css', 'utf8');
const hoverCSS = `
.live-status {
  transition: all var(--transition);
}
.live-status:hover {
  background: rgba(0, 255, 136, 0.15);
  border-color: rgba(0, 255, 136, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 255, 136, 0.1);
}
`;
if (!css.includes('.live-status:hover')) {
  css += hoverCSS;
  fs.writeFileSync('css/style.css', css);
  console.log('Added hover styles to CSS');
}
