const fs = require('fs');
let js = fs.readFileSync('js/main.js', 'utf8');

// Replace the English FİGES roles
js = js.replace(/expFiges2: '.*?',/s, `expFiges2: 'Conducted advanced AI and machine learning research projects leveraging the MATLAB & Simulink ecosystem. Focused heavily on developing visual perception and deep learning models, transitioning theoretical research into applied industrial solutions to meet complex engineering challenges.',`);
js = js.replace(/expFiges3: '.*?',/s, `expFiges3: 'Initiated my journey into the AI field by conducting research projects focused on machine learning workflows using MATLAB. Gained practical experience working on small-scale computer vision tasks and actively applied deep learning techniques specifically targeted at object detection and recognition.',`);
js = js.replace(/expFiges4: '.*?',/s, ``); // Remove expFiges4 entirely from EN

// Replace the Turkish FİGES roles
// Because of global replacement issues, let's use a function that replaces the Nth occurrence, or split the file.
let parts = js.split('navPubs:\\\'Yayınlar\\\','); // Split between EN and TR
if (parts.length === 1) parts = js.split(/navPubs:\s*'Yayınlar',/); // Regex fallback

if (parts.length === 2) {
    parts[1] = parts[1].replace(/expFiges2: '.*?',/s, `expFiges2: 'MATLAB ve Simulink ekosisteminden yararlanarak ileri düzey yapay zeka ve makine öğrenmesi araştırma projeleri yürüttüm. Karmaşık mühendislik sorunlarını çözmek amacıyla görsel algı (visual perception) ve derin öğrenme modelleri geliştirmeye yoğunlaştım, teorik araştırmaları uygulamalı endüstriyel çözümlere dönüştürdüm.',`);
    parts[1] = parts[1].replace(/expFiges3: '.*?',/s, `expFiges3: 'Yapay zeka alanındaki kariyerime MATLAB kullanarak makine öğrenmesi iş akışları üzerine araştırma projeleri yürüterek başladım. Küçük ölçekli bilgisayarlı görü görevlerinde pratik tecrübe kazandım ve özellikle nesne tespiti ve tanıma (object detection and recognition) süreçlerinde derin öğrenme tekniklerini aktif olarak uyguladım.',`);
    parts[1] = parts[1].replace(/expFiges4: '.*?',/s, ``); // Remove expFiges4 from TR
    js = parts[0] + "navPubs:'Yayınlar'," + parts[1];
}

fs.writeFileSync('js/main.js', js);
console.log('FİGES JS translations updated to 3 roles.');
