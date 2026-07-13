const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const pub7Html = `      <!-- Publication 7 -->
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
      
    </div>`;

html = html.replace(/<\/div>\s*<\/div>\s*<\/section>\s*<!-- ===================== SKILLS ===================== -->/, `    </div>\n${pub7Html}\n  </div>\n</section>\n\n<!-- ===================== SKILLS ===================== -->`);
// actually it's safer to replace `</div>\n    </div>\n  </div>\n</section>`
// Let's do it safely
const searchString = `      </div>\n      \n    </div>\n  </div>\n</section>`;
if (html.includes(searchString)) {
  html = html.replace(searchString, pub7Html + `\n  </div>\n</section>`);
  fs.writeFileSync('index.html', html);
  console.log('Successfully injected pub7 into HTML.');
} else {
  console.log('Could not find the injection point in HTML.');
}
