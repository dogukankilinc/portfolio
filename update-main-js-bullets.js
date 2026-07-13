const fs = require('fs');
let js = fs.readFileSync('js/main.js', 'utf8');

const enFiges1 = `'<ul class="experience-list"><li>Executed design and simulation of AI-powered autonomous systems using Model-Based Design methodologies within the MATLAB & Simulink environment.</li><li>Delivered advanced technical training sessions to leading engineering firms and academic institutions; provided project-based consultancy to R&D teams on MATLAB/Simulink workflows.</li><li>Developed data-driven machine learning models for condition monitoring, fault detection, and Remaining Useful Life (RUL) estimation using the Predictive Maintenance Toolbox.</li><li>Currently advancing R&D efforts on perception algorithms using Lidar and Image Processing Toolboxes, with a specific focus on deploying and optimizing these models for real-time performance on NVIDIA platforms via GPU Coder.</li></ul>'`;

const enFiges2 = `'<ul class="experience-list"><li>Conducted AI and ML research projects using MATLAB & Simulink</li><li>Focused on visual perception and deep learning models</li></ul>'`;

const enFiges3 = `'<ul class="experience-list"><li>Conducted AI and ML research projects using MATLAB</li><li>Worked on small-scale computer vision tasks</li><li>Applied deep learning techniques for object detection and recognition</li></ul>'`;

const trFiges1 = `'<ul class="experience-list"><li>MATLAB & Simulink ortamında Model Tabanlı Tasarım (MBD) metodolojilerini kullanarak yapay zeka destekli otonom sistemlerin tasarım ve simülasyonunu gerçekleştirdim.</li><li>Önde gelen mühendislik firmalarına ve akademik kurumlara ileri düzey teknik eğitimler verdim; Ar-Ge ekiplerine MATLAB/Simulink iş akışları üzerine proje bazlı danışmanlık sağladım.</li><li>Predictive Maintenance Toolbox kullanarak durum izleme, hata tespiti ve Kalan Faydalı Ömür (RUL) tahmini için veri odaklı makine öğrenmesi modelleri geliştirdim.</li><li>Şu anda, Lidar ve Görüntü İşleme Araç Kutularını kullanarak algı (perception) algoritmaları üzerindeki Ar-Ge çalışmalarını ilerletiyor; bu modellerin GPU Coder aracılığıyla NVIDIA platformlarında gerçek zamanlı performansta dağıtılmasına ve optimize edilmesine odaklanıyorum.</li></ul>'`;

const trFiges2 = `'<ul class="experience-list"><li>MATLAB & Simulink kullanarak YZ ve Makine Öğrenmesi araştırma projeleri yürüttüm.</li><li>Görsel algı (visual perception) ve derin öğrenme modellerine odaklandım.</li></ul>'`;

const trFiges3 = `'<ul class="experience-list"><li>MATLAB kullanarak YZ ve Makine Öğrenmesi araştırma projeleri yürüttüm.</li><li>Küçük ölçekli bilgisayarlı görü görevleri üzerinde çalıştım.</li><li>Nesne tespiti ve tanıma için derin öğrenme tekniklerini uyguladım.</li></ul>'`;

let parts = js.split(/navPubs:\s*'Yayınlar',/);

if (parts.length === 2) {
    // English replacements
    parts[0] = parts[0].replace(/expFiges1:\s*'.*?',/s, `expFiges1: ${enFiges1},`);
    parts[0] = parts[0].replace(/expFiges2:\s*'.*?',/s, `expFiges2: ${enFiges2},`);
    parts[0] = parts[0].replace(/expFiges3:\s*'.*?',/s, `expFiges3: ${enFiges3},`);
    
    // Turkish replacements
    parts[1] = parts[1].replace(/expFiges1:\s*'.*?',/s, `expFiges1: ${trFiges1},`);
    parts[1] = parts[1].replace(/expFiges2:\s*'.*?',/s, `expFiges2: ${trFiges2},`);
    parts[1] = parts[1].replace(/expFiges3:\s*'.*?',/s, `expFiges3: ${trFiges3},`);
    
    js = parts[0] + "navPubs:'Yayınlar'," + parts[1];
    fs.writeFileSync('js/main.js', js);
    console.log('main.js updated with bullet lists.');
} else {
    console.log('Could not split main.js properly.');
}
