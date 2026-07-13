const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

const listCss = `
.experience-list {
  list-style: none;
  padding-left: 0;
  margin-top: 10px;
}
.experience-list li {
  position: relative;
  padding-left: 15px;
  margin-bottom: 8px;
}
.experience-list li::before {
  content: '•';
  color: var(--accent);
  position: absolute;
  left: 0;
  top: 0;
}
`;

if (!css.includes('.experience-list')) {
  css += '\n' + listCss;
  fs.writeFileSync('css/style.css', css);
  console.log('Experience list CSS appended.');
}
