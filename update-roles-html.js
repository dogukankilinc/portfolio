const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const oldPreviousRolesStart = html.indexOf('<details class="previous-roles">');
const oldPreviousRolesEnd = html.indexOf('</details>', oldPreviousRolesStart) + 10;
const oldPreviousRoles = html.substring(oldPreviousRolesStart, oldPreviousRolesEnd);

const newPreviousRoles = `<details class="previous-roles">
            <summary class="previous-roles-summary"><span data-lk="prevRoles">Previous Roles</span> <i class="fa-solid fa-chevron-down"></i></summary>
            
            <div class="previous-role-item">
              <div class="timeline-role" style="font-size: 1rem; margin-top: 15px;">Candidate R&amp;D Engineer</div>
              <div class="timeline-date" style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-bottom: 10px;">Oct 2023 — Feb 2025 <span class="dim-text" style="opacity:0.6;font-size:0.9em;">· 1 yr 4 mos</span></div>
              <p class="timeline-desc" data-lk-exp="expFiges2"></p>
              <div class="timeline-tags">
                <span class="tag">MATLAB &amp; Simulink</span><span class="tag" data-lk="tagCV">Computer Vision</span>
                <span class="tag" data-lk="tagIP">Image Processing</span><span class="tag" data-lk="tagDL">Deep Learning</span>
                <span class="tag">Statistics and ML</span>
              </div>
            </div>

            <div class="previous-role-item" style="border-bottom: none; margin-bottom:0; padding-bottom:0;">
              <div class="timeline-role" style="font-size: 1rem; margin-top: 15px;">AI and ML Engineer Intern</div>
              <div class="timeline-date" style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-bottom: 10px;">Sep 2023 — Oct 2023 <span class="dim-text" style="opacity:0.6;font-size:0.9em;">· 2 mos</span></div>
              <p class="timeline-desc" data-lk-exp="expFiges3"></p>
              <div class="timeline-tags">
                <span class="tag">MATLAB</span><span class="tag" data-lk="tagCV">Computer Vision</span>
                <span class="tag" data-lk="tagIP">Image Processing</span><span class="tag" data-lk="tagDL">Deep Learning</span>
              </div>
            </div>
            
          </details>`;

html = html.replace(oldPreviousRoles, newPreviousRoles);
fs.writeFileSync('index.html', html);
console.log('FİGES sub-roles updated to 2 roles in HTML.');
