const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldFigesHtml = html.substring(
  html.indexOf('<!-- FİGES R&D -->'),
  html.indexOf('<!-- ArVis Technology -->')
);

const newFigesHtml = `<!-- FİGES R&D (Grouped) -->
      <div class="timeline-item scroll-reveal">
        <div class="timeline-dot"></div>
        <div class="timeline-card">
          <!-- Main Header for Company -->
          <div class="timeline-top">
            <div class="timeline-company">FİGES A.Ş.</div>
            <span class="timeline-date">Sep 2023 — Present <span class="dim-text" style="opacity:0.6;font-size:0.9em;">· 2 yrs 11 mos</span></span>
          </div>
          <div class="timeline-location" style="margin-bottom: 12px;"><i class="fa-solid fa-location-dot"></i> Bursa, Turkey</div>
          
          <!-- Current Role -->
          <div class="timeline-role" style="font-size: 1.1rem; margin-top: 10px;">Artificial Intelligence and Machine Learning Engineer</div>
          <div class="timeline-date" style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-bottom: 10px;">Feb 2025 — Present <span class="dim-text" style="opacity:0.6;font-size:0.9em;">· 1 yr 6 mos</span></div>
          <p class="timeline-desc" data-lk-exp="expFiges1"></p>
          <div class="timeline-tags">
            <span class="tag">MATLAB &amp; Simulink</span><span class="tag" data-lk="tagCV">Computer Vision</span>
            <span class="tag" data-lk="tagIP">Image Processing</span><span class="tag" data-lk="tagDL">Deep Learning</span>
            <span class="tag">Statistics and ML</span><span class="tag" data-lk="tagPM">Predictive Maintenance</span>
            <span class="tag">Reinforcement Learning</span><span class="tag">LiDAR</span><span class="tag">GPU Coder</span>
          </div>

          <!-- Accordion for Previous Roles -->
          <details class="previous-roles">
            <summary class="previous-roles-summary"><span data-lk="prevRoles">Previous Roles</span> <i class="fa-solid fa-chevron-down"></i></summary>
            
            <div class="previous-role-item">
              <div class="timeline-role" style="font-size: 1rem; margin-top: 15px;">Candidate R&amp;D Engineer</div>
              <div class="timeline-date" style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-bottom: 10px;">Feb 2024 — Jan 2025 <span class="dim-text" style="opacity:0.6;font-size:0.9em;">· 1 yr</span></div>
              <p class="timeline-desc" data-lk-exp="expFiges2"></p>
              <div class="timeline-tags">
                <span class="tag">MATLAB &amp; Simulink</span><span class="tag" data-lk="tagCV">Computer Vision</span>
                <span class="tag" data-lk="tagIP">Image Processing</span><span class="tag" data-lk="tagDL">Deep Learning</span>
                <span class="tag">Statistics and ML</span>
              </div>
            </div>

            <div class="previous-role-item">
              <div class="timeline-role" style="font-size: 1rem; margin-top: 15px;">Long-Term AI Engineer Intern</div>
              <div class="timeline-date" style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-bottom: 10px;">Oct 2023 — Jan 2024 <span class="dim-text" style="opacity:0.6;font-size:0.9em;">· 4 mos</span></div>
              <p class="timeline-desc" data-lk-exp="expFiges3"></p>
              <div class="timeline-tags">
                <span class="tag">MATLAB</span><span class="tag" data-lk="tagCV">Computer Vision</span>
                <span class="tag" data-lk="tagIP">Image Processing</span><span class="tag" data-lk="tagDL">Deep Learning</span>
                <span class="tag">Statistics and ML</span>
              </div>
            </div>

            <div class="previous-role-item" style="border-bottom: none; margin-bottom:0; padding-bottom:0;">
              <div class="timeline-role" style="font-size: 1rem; margin-top: 15px;">AI and ML Engineer Intern</div>
              <div class="timeline-date" style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-bottom: 10px;">Sep 2023 — Oct 2023 <span class="dim-text" style="opacity:0.6;font-size:0.9em;">· 2 mos</span></div>
              <p class="timeline-desc" data-lk-exp="expFiges4"></p>
              <div class="timeline-tags">
                <span class="tag">MATLAB</span><span class="tag" data-lk="tagCV">Computer Vision</span>
                <span class="tag" data-lk="tagIP">Image Processing</span><span class="tag" data-lk="tagDL">Deep Learning</span>
              </div>
            </div>
            
          </details>
        </div>
      </div>

      `;

html = html.replace(oldFigesHtml, newFigesHtml);
fs.writeFileSync('index.html', html);
console.log('FİGES structure updated.');
