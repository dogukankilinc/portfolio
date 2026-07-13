const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const p6Index = html.indexOf('<!-- Publication 6 -->');
const sectionEndIndex = html.indexOf('<!-- ===================== SKILLS ===================== -->');

const fixedHtml = `<!-- Publication 6 -->
      <div class="pub-card scroll-reveal sr-d6">
        <div class="pub-header">
          <i class="fa-solid fa-newspaper pub-icon"></i>
          <span class="pub-year" data-lk="pub6Date">Feb 2025</span>
        </div>
        <h3 class="pub-title" data-lk="pub6Title">MATLAB ve Python Birlikte Nasıl Kullanılır?</h3>
        <div class="pub-authors" data-lk="pub6Authors">FİGES Blog</div>
        <div class="pub-abstract-box">
          <div class="llm-cursor" id="llmCursor6"></div>
          <p class="pub-abstract llm-stream" data-stream-id="pub6Desc"></p>
        </div>
      </div>
      
      <!-- Publication 7 -->
      <div class="pub-card scroll-reveal sr-d7">
        <div class="pub-header">
          <i class="fa-solid fa-newspaper pub-icon"></i>
          <span class="pub-year" data-lk="pub7Date">May 2026</span>
        </div>
        <h3 class="pub-title" data-lk="pub7Title">A NEW HYBRID GAIN-SCHEDULED ADAPTIVE NEURO FUZZY INFERENCE CONTROLLER DESIGN FOR IMPROVING THE OUTPUT STABILITY OF A FUEL CELL STACK</h3>
        <div class="pub-authors" data-lk="pub7Authors">International Hydrogen Technologies Congress (IHTEC-2026)</div>
        <div class="pub-abstract-box">
          <div class="llm-cursor" id="llmCursor7"></div>
          <p class="pub-abstract llm-stream" data-stream-id="pub7Desc"></p>
        </div>
      </div>
      
    </div>
  </div>
</section>

`;

html = html.substring(0, p6Index) + fixedHtml + html.substring(sectionEndIndex);
fs.writeFileSync('index.html', html);
console.log('Fixed HTML duplicates for pub7.');
