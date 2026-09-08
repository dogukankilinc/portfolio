const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let lines = html.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('id="about"')) {
    console.log(lines.slice(i, i+30).join('\n'));
    break;
  }
}
