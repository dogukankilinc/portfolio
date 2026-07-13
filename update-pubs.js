const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Move pub7 to the top
const p7Start = html.indexOf('<!-- Publication 7 -->');
const p7End = html.indexOf('</div>', html.indexOf('pub7Desc')) + 6;
const p7Block = html.substring(p7Start, p7End);
const p1Start = html.indexOf('<!-- Publication 1 -->');

// Remove pub7 from its current location
html = html.replace(p7Block, '');

// Insert pub7 before pub1
html = html.substring(0, p1Start) + p7Block + '\n      \n      ' + html.substring(p1Start);

// 2. Replace icons
html = html.replace(/<i class="fa-solid fa-newspaper pub-icon"><\/i>\s*<span class="pub-year" data-lk="pub7Date"/g, '<i class="fa-solid fa-file-lines pub-icon"></i>\n          <span class="pub-year" data-lk="pub7Date"');
html = html.replace(/<i class="fa-solid fa-newspaper pub-icon"><\/i>\s*<span class="pub-year" data-lk="pub1Date"/g, '<i class="fa-solid fa-file-lines pub-icon"></i>\n          <span class="pub-year" data-lk="pub1Date"');
html = html.replace(/<i class="fa-solid fa-newspaper pub-icon"><\/i>\s*<span class="pub-year" data-lk="pub2Date"/g, '<i class="fa-solid fa-file-lines pub-icon"></i>\n          <span class="pub-year" data-lk="pub2Date"');
html = html.replace(/<i class="fa-solid fa-newspaper pub-icon"><\/i>\s*<span class="pub-year" data-lk="pub3Date"/g, '<i class="fa-solid fa-file-lines pub-icon"></i>\n          <span class="pub-year" data-lk="pub3Date"');

fs.writeFileSync('index.html', html);
console.log('Reordered pub7 and updated icons.');
