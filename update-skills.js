const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// Title Replacements
html = html.replace('<div class="hex-name">Artificial Intelligence</div>', '<div class="hex-name" data-lk="skillAI">Artificial Intelligence</div>');
html = html.replace('<div class="hex-name">Model-Based Design</div>', '<div class="hex-name" data-lk="skillMBD">Model-Based Design</div>');
html = html.replace('<div class="hex-name">Computer Vision</div>', '<div class="hex-name" data-lk="skillCV">Computer Vision</div>');
html = html.replace('<div class="hex-name">Python &amp; Data Analysis</div>', '<div class="hex-name" data-lk="skillPython">Python &amp; Data Analysis</div>');
html = html.replace('<div class="hex-name">Edge AI &amp; Hardware</div>', '<div class="hex-name" data-lk="skillEdge">Edge AI &amp; Hardware</div>');

// Tag Replacements (only targeting spans inside hex-tags to avoid affecting other sections)
const hexTagsRegex = /<div class="hex-tags">([\s\S]*?)<\/div>/g;
html = html.replace(hexTagsRegex, (match) => {
  return match
    .replace('<span>Machine Learning</span>', '<span data-lk="tagML2">Machine Learning</span>')
    .replace('<span>Deep Learning</span>', '<span data-lk="tagDL2">Deep Learning</span>')
    .replace('<span>Neural Networks</span>', '<span data-lk="tagNN">Neural Networks</span>')
    .replace('<span>Object Detection</span>', '<span data-lk="tagOD">Object Detection</span>')
    .replace('<span>Image Segmentation</span>', '<span data-lk="tagIS">Image Segmentation</span>')
    .replace('<span>Image Processing</span>', '<span data-lk="tagIP2">Image Processing</span>')
    .replace('<span>Object Tracking</span>', '<span data-lk="tagOT">Object Tracking</span>')
    .replace('<span>Data Visualization</span>', '<span data-lk="tagDV">Data Visualization</span>')
    .replace('<span>Embedded Systems</span>', '<span data-lk="tagES">Embedded Systems</span>')
    .replace('<span>Real-Time Systems</span>', '<span data-lk="tagRTS">Real-Time Systems</span>')
    .replace('<span>Hardware Deployment</span>', '<span data-lk="tagHD">Hardware Deployment</span>')
    .replace('<span>Code Generation</span>', '<span data-lk="tagCG">Code Generation</span>')
    .replace('<span>Signal Processing</span>', '<span data-lk="tagSP">Signal Processing</span>');
});

fs.writeFileSync('index.html', html);

// 2. Update main.js
let js = fs.readFileSync('js/main.js', 'utf8');

const enKeys = `
    skillAI:'Artificial Intelligence', skillMBD:'Model-Based Design', skillCV:'Computer Vision', skillPython:'Python & Data Analysis', skillEdge:'Edge AI & Hardware',
    tagML2:'Machine Learning', tagDL2:'Deep Learning', tagNN:'Neural Networks', tagOD:'Object Detection', tagIS:'Image Segmentation', tagIP2:'Image Processing', tagOT:'Object Tracking', tagDV:'Data Visualization', tagES:'Embedded Systems', tagRTS:'Real-Time Systems', tagHD:'Hardware Deployment', tagCG:'Code Generation', tagSP:'Signal Processing',
`;

const trKeys = `
    skillAI:'Yapay Zeka', skillMBD:'Model Tabanlı Tasarım', skillCV:'Bilgisayarlı Görü', skillPython:'Python & Veri Analizi', skillEdge:'Edge AI & Donanım',
    tagML2:'Makine Öğrenmesi', tagDL2:'Derin Öğrenme', tagNN:'Sinir Ağları', tagOD:'Nesne Tespiti', tagIS:'Görüntü Bölütleme', tagIP2:'Görüntü İşleme', tagOT:'Nesne Takibi', tagDV:'Veri Görselleştirme', tagES:'Gömülü Sistemler', tagRTS:'Gerçek Zamanlı Sistemler', tagHD:'Donanım Dağıtımı', tagCG:'Kod Üretimi', tagSP:'Sinyal İşleme',
`;

let parts = js.split('tr: {');
if (parts.length === 2) {
    // Insert into EN just before skillsTag
    parts[0] = parts[0].replace(/skillsTag:'EXPERTISE',/, match => enKeys + '    ' + match);
    // Insert into TR just before skillsTag
    parts[1] = parts[1].replace(/skillsTag:'UZMANLIK',/, match => trKeys + '    ' + match);
    
    js = parts[0] + 'tr: {' + parts[1];
    fs.writeFileSync('js/main.js', js);
    console.log('Skills translations added to JS.');
} else {
    console.log('Could not split main.js properly.');
}
