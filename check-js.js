const fs = require('fs');

let js = fs.readFileSync('js/main.js', 'utf8');
const p1En = js.indexOf('aboutP1:');
const p4En = js.indexOf('aboutP4:');
console.log("EN aboutP1 exists:", p1En !== -1);
console.log("EN aboutP4 exists:", p4En !== -1);

const trSection = js.indexOf('tr: {');
const p1Tr = js.indexOf('aboutP1:', trSection);
const p4Tr = js.indexOf('aboutP4:', trSection);
console.log("TR aboutP1 exists:", p1Tr !== -1);
console.log("TR aboutP4 exists:", p4Tr !== -1);

// Let's also check if there is a syntax error in main.js
try {
  // Try evaluating the JS object (by doing a very dirty eval just for syntax check)
  // We can't eval easily, but we can check if there are missing commas before aboutP1
  const snippet = js.substring(p1En - 100, p1En + 20);
  console.log("Snippet EN:\n", snippet);
  
  const snippetTR = js.substring(p1Tr - 100, p1Tr + 20);
  console.log("Snippet TR:\n", snippetTR);
} catch (e) {}
