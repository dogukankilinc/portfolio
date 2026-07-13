const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const navEndIndex = html.indexOf('</nav>');
const heroContentIndex = html.indexOf('<!-- Hero Content -->');

const fixedHtml = `</nav>

<!-- ===================== HERO ===================== -->
<section id="home">
  <div class="hero-grid">

    <!-- Profile Photo -->
    <div class="hero-photo-wrap scroll-reveal">
      <div class="hero-photo-inner">
        <div class="hero-ring"></div>
        <div class="hero-ring-2"></div>
        <img
          src="https://avatars.githubusercontent.com/u/180156605?v=4"
          alt="Doğukan M. KILINÇ"
          loading="eager"
        >
        <!-- Glassmorphism hover overlay -->
        <div class="photo-overlay">
          <div class="photo-overlay-inner">
            <div class="photo-overlay-name">Doğukan M. KILINÇ</div>
            <div class="photo-overlay-title">AI &amp; ML Engineer</div>
            <div class="photo-overlay-org">R&amp;D @ FİGES A.Ş.</div>
            <div class="photo-overlay-tags">
              <span>Computer Vision</span>
              <span>Deep Learning</span>
              <span>Edge AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    `;

html = html.substring(0, navEndIndex) + fixedHtml + html.substring(heroContentIndex);
fs.writeFileSync('index.html', html);
console.log('Fixed HTML hero structure.');
