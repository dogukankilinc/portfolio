const fs = require('fs');
let js = fs.readFileSync('js/main.js', 'utf8');

const enPub7 = `
    pub7Title:'A NEW HYBRID GAIN-SCHEDULED ADAPTIVE NEURO FUZZY INFERENCE CONTROLLER DESIGN FOR IMPROVING THE OUTPUT STABILITY OF A FUEL CELL STACK',
    pub7Authors:'International Hydrogen Technologies Congress (IHTEC-2026)',
    pub7Date:'May 12, 2026',
    pub7Desc:'The non-linear stochastic voltage drops in the \\\'activation\\\', \\\'ohmic\\\', and \\\'concentration\\\' regions, which occur in response to sudden changes in load current, render obtaining a stable and regulated DC bus voltage a mandatory control engineering problem. In this investigation, a DC-DC Boost converter has been developed to accurately control the output voltage of a PEMFC-based power system at the 96 Volt level. The study considered conventional Proportional-Integral (PI) controllers, Fuzzy Logic controllers, and a novel Gain-Scheduled Adaptive Neuro-Fuzzy Inference System (GS-ANFIS) controllers. Extensive simulations performed in MATLAB/Simulink showed that the PI controller produced an average voltage of 96.22V and the Fuzzy Logic controller produced 95.71V in a 0-1 second period. On the other hand, the GS-ANFIS controller showed the transient response closest to the reference with 95.94 V. Once the system stabilized at 0.3 seconds, the Gain-Scheduled ANFIS controller recorded an average voltage of 96.03 V, with the absolute error being kept at a very low level of 0.03 V (0.03%). These findings, through the experiments, confirm that the proposed Gain-Scheduled ANFIS framework has a significantly more robust structure than the traditional methods under dynamic conditions involving sudden load changes.',
`;

const trPub7 = `
    pub7Title:'YAKIT HÜCRESİ YIĞINININ ÇIKIŞ KARARLILIĞINI ARTIRMAK İÇİN YENİ BİR HİBRİT KAZANÇ ÇİZELGELİ ADAPTİF NÖRO BULANIK ÇIKARIM KONTROLÖRÜ TASARIMI',
    pub7Authors:'Uluslararası Hidrojen Teknolojileri Kongresi (IHTEC-2026)',
    pub7Date:'12 Mayıs 2026',
    pub7Desc:'Yük akımındaki ani değişimlere yanıt olarak ortaya çıkan \\\'aktivasyon\\\', \\\'ohmik\\\' ve \\\'konsantrasyon\\\' bölgelerindeki doğrusal olmayan stokastik voltaj düşüşleri, kararlı ve regüle edilmiş bir DC barası voltajı elde etmeyi zorunlu bir kontrol mühendisliği problemi haline getirmektedir. Bu araştırmada, PEMFC tabanlı bir güç sisteminin çıkış voltajını 96 Volt seviyesinde hassas bir şekilde kontrol etmek için bir DC-DC Boost dönüştürücü geliştirilmiştir. Çalışmada geleneksel Oransal-İntegral (PI) kontrolörler, Bulanık Mantık (Fuzzy Logic) kontrolörler ve özgün bir Kazanç Çizelgeli Adaptif Nöro-Bulanık Çıkarım Sistemi (GS-ANFIS) kontrolörü ele alınmıştır. MATLAB/Simulink\\\'te gerçekleştirilen kapsamlı simülasyonlar, 0-1 saniyelik periyotta PI kontrolörünün ortalama 96.22V ve Bulanık Mantık kontrolörünün 95.71V ürettiğini göstermiştir. Öte yandan, GS-ANFIS kontrolörü 95.94V ile referansa en yakın geçici (transient) yanıtı sergilemiştir. Sistem 0.3 saniyede kararlılığa ulaştıktan sonra, Kazanç Çizelgeli ANFIS kontrolörü mutlak hatayı 0.03V (%0.03) gibi çok düşük bir seviyede tutarak ortalama 96.03V voltaj kaydetmiştir. Deneyler aracılığıyla elde edilen bu bulgular, önerilen Kazanç Çizelgeli ANFIS yapısının, ani yük değişimlerini içeren dinamik koşullar altında geleneksel yöntemlerden çok daha gürbüz (robust) bir yapıya sahip olduğunu doğrulamaktadır.',
`;

let parts = js.split('tr: {');

if (parts.length === 2) {
    // English replacements: insert after pub6Desc
    parts[0] = parts[0].replace(/pub6Desc:\s*'.*?',/s, match => match + enPub7);
    
    // Turkish replacements: insert after pub6Desc
    parts[1] = parts[1].replace(/pub6Desc:\s*'.*?',/s, match => match + trPub7);
    
    js = parts[0] + 'tr: {' + parts[1];
    fs.writeFileSync('js/main.js', js);
    console.log('main.js updated with pub7 translations.');
} else {
    console.log('Could not split main.js properly.');
}
