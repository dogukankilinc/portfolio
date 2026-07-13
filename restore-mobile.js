const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const mobileMenu = `
<!-- Mobile Nav Overlay -->
<div class="mobile-menu" id="mobileMenu">
  <ul>
    <li><a href="#about"        data-lk="navAbout">About</a></li>
    <li><a href="#skills"       data-lk="navSkills">Skills</a></li>
    <li><a href="#experience"   data-lk="navExperience">Experience</a></li>
    <li><a href="#projects"     data-lk="navProjects">Projects</a></li>
    <li><a href="#publications" data-lk="navPubs">Publications</a></li>
    <li><a href="#certifications" data-lk="navCerts">Certifications</a></li>
    <li><a href="#contact"      data-lk="navContact">Contact</a></li>
  </ul>
  <div class="mobile-lang">
    <div class="lang-toggle" style="width:100%;justify-content:center;">
      <span id="mobileLangEN" class="lang-btn lang-active">EN</span>
      <span class="lang-sep">|</span>
      <span id="mobileLangTR" class="lang-btn">TR</span>
    </div>
  </div>
</div>
`;

if (!html.includes('id="mobileMenu"')) {
    html = html.replace('</nav>', '</nav>\n' + mobileMenu);
    fs.writeFileSync('index.html', html);
    console.log('Restored mobile menu.');
}
