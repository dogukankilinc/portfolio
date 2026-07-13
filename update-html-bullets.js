const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const role1List = `<div class="timeline-desc" data-lk-exp="expFiges1">
            <ul class="experience-list">
              <li>Executed design and simulation of AI-powered autonomous systems using Model-Based Design methodologies within the MATLAB & Simulink environment.</li>
              <li>Delivered advanced technical training sessions to leading engineering firms and academic institutions; provided project-based consultancy to R&D teams on MATLAB/Simulink workflows.</li>
              <li>Developed data-driven machine learning models for condition monitoring, fault detection, and Remaining Useful Life (RUL) estimation using the Predictive Maintenance Toolbox.</li>
              <li>Currently advancing R&D efforts on perception algorithms using Lidar and Image Processing Toolboxes, with a specific focus on deploying and optimizing these models for real-time performance on NVIDIA platforms via GPU Coder.</li>
            </ul>
          </div>`;

const role2List = `<div class="timeline-desc" data-lk-exp="expFiges2">
                <ul class="experience-list">
                  <li>Conducted AI and ML research projects using MATLAB & Simulink</li>
                  <li>Focused on visual perception and deep learning models</li>
                </ul>
              </div>`;

const role3List = `<div class="timeline-desc" data-lk-exp="expFiges3">
                <ul class="experience-list">
                  <li>Conducted AI and ML research projects using MATLAB</li>
                  <li>Worked on small-scale computer vision tasks</li>
                  <li>Applied deep learning techniques for object detection and recognition</li>
                </ul>
              </div>`;

html = html.replace(/<p class="timeline-desc" data-lk-exp="expFiges1"><\/p>/g, role1List);
html = html.replace(/<p class="timeline-desc" data-lk-exp="expFiges2"><\/p>/g, role2List);
html = html.replace(/<p class="timeline-desc" data-lk-exp="expFiges3"><\/p>/g, role3List);

fs.writeFileSync('index.html', html);
console.log('HTML updated with experience lists.');
