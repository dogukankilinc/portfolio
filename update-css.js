const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

const accordionCss = `
/* Accordion for Previous Roles */
.previous-roles {
  margin-top: 20px;
  background: rgba(255,255,255,0.02);
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.05);
  overflow: hidden;
  transition: all 0.3s ease;
}
.previous-roles-summary {
  padding: 15px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-size: 0.95rem;
  color: var(--text-secondary);
  list-style: none; /* Hide default arrow */
  transition: all 0.3s ease;
}
.previous-roles-summary::-webkit-details-marker {
  display: none; /* Hide default arrow in webkit */
}
.previous-roles-summary:hover {
  background: rgba(0, 255, 136, 0.05);
  color: var(--accent);
}
.previous-roles[open] .previous-roles-summary {
  border-bottom: 1px solid rgba(255,255,255,0.05);
  color: var(--accent);
}
.previous-roles[open] .previous-roles-summary i {
  transform: rotate(180deg);
}
.previous-roles-summary i {
  transition: transform 0.3s ease;
}
.previous-role-item {
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.previous-role-item:last-child {
  border-bottom: none;
}
`;

if (!css.includes('.previous-roles {')) {
  css += '\n' + accordionCss;
  fs.writeFileSync('css/style.css', css);
  console.log('Accordion CSS appended.');
}
