/* ================================================================
   DOĞUKAN M. KILINÇ — Portfolio JS v4.1
   Clean rewrite: fixed lang toggle, section observers,
   + Deep Learning layer ghost animation on scroll
================================================================ */

// ==================== PRELOADER ====================
window.addEventListener('load', () => {
  const pl = document.getElementById('preloader');
  if (!pl) return;
  setTimeout(() => {
    pl.classList.add('hide');
    setTimeout(() => pl.remove(), 700);
  }, 1300);
});



// ==================== SECTION THEME OBSERVER ====================
const sectionThemes = {};
let target = {};
const allSections = document.querySelectorAll('section[id]');
const themeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && sectionThemes[e.target.id]) {
      target = { ...sectionThemes[e.target.id] };
    }
  });
}, { threshold: 0.3 });
allSections.forEach(s => themeObs.observe(s));

// ==================== NAVBAR SCROLL ====================
const navbar    = document.getElementById('navbar');
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 70);
  scrollBtn.classList.toggle('show', window.scrollY > 400);
});
scrollBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ==================== HAMBURGER MENU ====================
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobOverlay = document.getElementById('mobileOverlay');
function toggleMenu(open) {
  hamburger.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  mobOverlay.classList.toggle('show', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
hamburger?.addEventListener('click', () => toggleMenu(!mobileMenu.classList.contains('open')));
mobOverlay?.addEventListener('click', () => toggleMenu(false));
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

// ==================== 3D SCROLL REVEAL ====================
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('revealed');
  });
}, { threshold: 0.07 });

function initReveal() {
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    // Assign animation subclass based on context
    const already = ['sr-zoom','sr-flip','sr-left','sr-right'].some(c => el.classList.contains(c));
    if (!already) {
      if (el.closest('#home'))                       el.classList.add('sr-zoom');
      else if (el.classList.contains('about-text'))  el.classList.add('sr-left');
      else if (el.classList.contains('about-stats')) el.classList.add('sr-right');
      else if (el.classList.contains('timeline-item')) el.classList.add('sr-left');
      else if (el.classList.contains('contact-form-wrap')) el.classList.add('sr-left');
      else if (el.classList.contains('contact-info'))      el.classList.add('sr-right');
      else if (el.classList.contains('cert-card'))         el.classList.add('sr-zoom');
      else if (el.classList.contains('project-card')) {
        const cards = [...document.querySelectorAll('.project-card')];
        el.classList.add(cards.indexOf(el) % 2 === 0 ? 'sr-left' : 'sr-right');
      }
      else el.classList.add('sr-flip');
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.98 && rect.bottom > 0) {
      el.classList.add('revealed');
    } else {
      revealObs.observe(el);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveal);
} else {
  initReveal();
}
window.addEventListener('load', () => {
  document.querySelectorAll('.scroll-reveal:not(.revealed)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) el.classList.add('revealed');
  });
  initReveal();
});

// ==================== COUNTER ANIMATION ====================
function animateCounter(el, target, suffix = '') {
  const dur = 1800;
  const start = performance.now();
  const tick  = now => {
    const p = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(e * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    counterObs.unobserve(e.target);
    animateCounter(e.target, parseInt(e.target.dataset.count), e.target.dataset.suffix || '');
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

// ==================== HEX SKILL LEVEL BAR ANIMATION ====================
const hexLevelObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    hexLevelObs.unobserve(e.target);
    // Trigger CSS animation by adding class
    e.target.classList.add('level-animated');
    // Animate the fill bar manually via JS for precise control
    const fills = e.target.querySelectorAll('.hex-level-fill');
    fills.forEach(fill => {
      const targetW = fill.style.width; // e.g. "90%"
      fill.style.width = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          fill.style.transition = 'width 1.4s cubic-bezier(0.23,1,0.32,1)';
          fill.style.width = targetW;
        });
      });
    });
  });
}, { threshold: 0.3 });
document.querySelectorAll('.hex-skill-card').forEach(el => hexLevelObs.observe(el));

// ==================== HERO PARALLAX SCROLL ====================
const heroPhotoWrap = document.querySelector('.hero-photo-wrap');
const heroContent   = document.querySelector('.hero-content');
const heroSection   = document.getElementById('home');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroH   = heroSection ? heroSection.offsetHeight : window.innerHeight;

  // Only apply parallax while hero is in view
  if (scrollY < heroH) {
    // NEGATIVE translateY = element moves UP slower than page = parallax depth
    if (heroPhotoWrap) heroPhotoWrap.style.transform = `translateY(${-scrollY * 0.22}px)`;
    if (heroContent)   heroContent.style.transform   = `translateY(${-scrollY * 0.10}px)`;
  } else {
    // Reset once hero leaves viewport
    if (heroPhotoWrap) heroPhotoWrap.style.transform = '';
    if (heroContent)   heroContent.style.transform   = '';
  }
}, { passive: true });

// ==================== 3-PHASE TYPEWRITER ANIMATION ====================
const eyebrowEl = document.getElementById('heroEyebrowTyped');
const nameEl    = document.getElementById('heroNameTyped');
const taglineEl = document.getElementById('tagline');

const EYEBROW_TEXTS = {
  en: '> Hello, World! I am',
  tr: '> Merhaba! Ben',
};
const TAGLINE_TEXTS = {
  en: 'AI & ML Engineer — Building Intelligent Systems at the Edge',
  tr: 'YZ & ML Mühendisi — Kenarda Akıllı Sistemler İnşa Ediyorum',
};

// Name is always the same but split into two lines
const NAME_LINE1 = 'Doğukan M.';
const NAME_LINE2 = 'KILINÇ';

let typingState = { timer: null, lang: 'en' };

// Phase 1: Type eyebrow text
function typeEyebrow(lang, onDone) {
  if (!eyebrowEl) { onDone(); return; }
  const text = EYEBROW_TEXTS[lang];
  let i = 0;
  eyebrowEl.textContent = '';

  // Show eyebrow cursor during this phase
  const eyebrowCursor = eyebrowEl.nextElementSibling;
  if (eyebrowCursor) eyebrowCursor.style.display = 'inline';

  function tick() {
    if (i <= text.length) {
      eyebrowEl.textContent = text.slice(0, i);
      i++;
      typingState.timer = setTimeout(tick, 42);
    } else {
      // Hide eyebrow cursor, move to name phase
      if (eyebrowCursor) eyebrowCursor.style.display = 'none';
      setTimeout(onDone, 180);
    }
  }
  tick();
}

// Phase 2: Type name with line break
function typeName(onDone) {
  if (!nameEl) { onDone(); return; }
  nameEl.innerHTML = '';
  const fullText = NAME_LINE1 + '\n' + NAME_LINE2;
  let i = 0;

  function tick() {
    if (i <= fullText.length) {
      const current = fullText.slice(0, i);
      // Replace the \n with a visible <br> at the right moment
      const parts = current.split('\n');
      if (parts.length === 1) {
        nameEl.innerHTML = parts[0] + '<span class="name-cursor">_</span>';
      } else {
        nameEl.innerHTML = parts[0] + '<br>' + parts[1] + '<span class="name-cursor">_</span>';
      }
      i++;
      const delay = fullText[i - 1] === '\n' ? 220 : 68; // pause on line break
      typingState.timer = setTimeout(tick, delay);
    } else {
      // Remove name cursor
      nameEl.innerHTML = NAME_LINE1 + '<br>' + NAME_LINE2;
      setTimeout(onDone, 280);
    }
  }
  tick();
}

// Phase 3: Looping tagline
function typeTaglineLoop(lang) {
  if (!taglineEl) return;
  const text = TAGLINE_TEXTS[lang];
  let idx = 0, deleting = false;

  function tick() {
    taglineEl.textContent = deleting ? text.slice(0, idx - 1) : text.slice(0, idx + 1);
    idx = deleting ? idx - 1 : idx + 1;
    let delay = deleting ? 36 : 62;
    if (!deleting && idx === text.length) { delay = 3200; deleting = true; }
    if (idx === 0 && deleting) { deleting = false; delay = 400; }

    // Store timer so lang change can cancel it
    typingState.taglineTimer = setTimeout(tick, delay);
  }
  tick();
}

// Master sequence — call this on load and on lang change
function startTypewriterSequence(lang) {
  clearTimeout(typingState.timer);
  clearTimeout(typingState.taglineTimer);
  typingState.lang = lang;

  // Reset all
  if (eyebrowEl) eyebrowEl.textContent = '';
  if (nameEl)    nameEl.innerHTML = '';
  if (taglineEl) taglineEl.textContent = '';

  const eyebrowCursor = eyebrowEl?.nextElementSibling;
  if (eyebrowCursor) eyebrowCursor.style.display = 'inline';

  typeEyebrow(lang, () => {
    typeName(() => {
      typeTaglineLoop(lang);
    });
  });
}

function initTypewriter() {
  if (typeof startTypewriterSequence === 'function') {
    startTypewriterSequence('en');
  }
}
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initTypewriter, 200);
} else {
  window.addEventListener('DOMContentLoaded', () => setTimeout(initTypewriter, 200));
}

// ==================== TRANSLATIONS ====================
const T = {
  en: {
    navAbout:'About', navExperience:'Experience', navEducation:'Education',
    navProjects:'Projects', navSkills:'Skills', navCerts:'Certifications', navContact:'Contact',
    heroEyebrow:'> Hello, World! I am',
    heroSendMsg: 'Send Message',
    modalTitle: 'Send a Message',
    heroSub:'AI & ML Engineer at FİGES A.Ş. · MSc EEE · Computer Vision · Deep Learning · Edge AI',
    heroBtnProjects:'View Projects', heroBtnCV:'Download CV', heroBtnAcademic:'Academic CV',
    liveStatus:'Open to Collaboration',
    aboutTag:'GET TO KNOW ME', aboutTitle:'About Me',
    aboutP1:"I am an Electrical and Electronics Engineer and a passionate AI & Machine Learning Engineer, dedicated to bridging the gap between cutting-edge AI research and real-world industrial applications. For approximately 2.5 years, I have been driving R&D initiatives at FİGES A.Ş. Building upon a strong foundation from Pamukkale University and valuable international experience in Denmark, I am currently advancing my academic and technical expertise through an ongoing Master’s degree in Electrical and Electronics Engineering at Bursa Technical University.",
    aboutP2:"My core expertise lies in Edge AI, Embedded Vision, and Model-Based Design (MBD). I specialize in the real-time deployment and optimization of deep learning and object detection models (including YOLOv4, YOLO8, YOLO9, and YOLO11) on NVIDIA Jetson platforms such as the AGX Orin and TX2. Furthermore, I have extensive proficiency in the MathWorks ecosystem (MATLAB & Simulink), leveraging V-Model processes, GPU Coder, and TensorRT for efficient code generation and seamless system integration.",
    aboutP3:"I actively develop AI solutions across a wide spectrum of computational scales. On one end, I implement TinyML and Tiny Deep Learning applications (such as 1D CNN-based moisture detection) on low-power microcontrollers like the Raspberry Pi Pico (RP2040) and Arduino. On the other end, I design local Large Language Model (LLM) integrations using Ollama, Streamlit, and the Model Context Protocol (MCP), exemplified by projects like the \"FIGES MathWorks CV Analyzer.\"",
    aboutP4:"In my academic research, I explore the intersection of artificial intelligence, power electronics, and renewable energy. My focus areas include developing control strategies (Type-2 Fuzzy Logic, ANFIS) for Proton Exchange Membrane Fuel Cells (PEMFC) and DC-DC converters, as well as investigating hybrid AI architectures—combining Spiking Neural Networks (SNN) and Vision Transformers (ViT)—for energy-efficient power quality disturbance classification.",
    aboutP5:"<strong>Core Competencies:</strong><br><br><strong>AI & Deep Learning:</strong> Edge AI, Computer Vision, YOLO Architectures, TinyML, Local LLM Integration (Ollama, Qwen, Phi).<br><strong>Software & Tools:</strong> MATLAB, Simulink, GPU Coder, TensorRT, Python, Streamlit.<br><strong>Hardware & Embedded:</strong> NVIDIA Jetson Series (AGX Orin, TX2), Raspberry Pi Pico, Arduino.<br><strong>System Engineering:</strong> Model-Based Design (MBD), V-Model, Automatic Code Generation.<br><strong>Power & Energy Systems:</strong> PEMFC, DC-DC Converters, Power Quality Analysis.",
    statYears:'Years of Experience', statCerts:'Certifications', statProjects:'GitHub Projects', statDegrees:'Academic Degrees',
    expTag:'CAREER JOURNEY', expTitle:'Experience', prevRoles:'Previous Roles', askAI:'Ask AI',
    expFiges1: '<ul class="experience-list"><li>Executed design and simulation of AI-powered autonomous systems using Model-Based Design methodologies within the MATLAB & Simulink environment.</li><li>Delivered advanced technical training sessions to leading engineering firms and academic institutions; provided project-based consultancy to R&D teams on MATLAB/Simulink workflows.</li><li>Developed data-driven machine learning models for condition monitoring, fault detection, and Remaining Useful Life (RUL) estimation using the Predictive Maintenance Toolbox.</li><li>Currently advancing R&D efforts on perception algorithms using Lidar and Image Processing Toolboxes, with a specific focus on deploying and optimizing these models for real-time performance on NVIDIA platforms via GPU Coder.</li></ul>',
    expFiges2: '<ul class="experience-list"><li>Conducted AI and ML research projects using MATLAB & Simulink</li><li>Focused on visual perception and deep learning models</li></ul>',
    expFiges3: '<ul class="experience-list"><li>Conducted AI and ML research projects using MATLAB</li><li>Worked on small-scale computer vision tasks</li><li>Applied deep learning techniques for object detection and recognition</li></ul>',
    exp4Desc:'Participated in a deep-tech and AI-focused training program with leading industry professionals and academics. Gained perspective on AI\'s transformative role across sectors.',
    exp5Desc:'Involved in wood processing machine development — assembling electrical/electronic components, wiring control panels, testing and commissioning. Observed hardware-software integration.',
    exp6Desc:'Relocated to Denmark (Sep 2020, COVID-19 closures). Operated as sole proprietor, fulfilled tax obligations — developing adaptability and international work experience.',
    eduTag:'ACADEMIC BACKGROUND', eduTitle:'Education',
    edu1Deg:'Master of Science', edu1Sch:'Bursa Technical University', edu1Fld:'Electrical and Electronics Engineering', edu1Date:'Aug 2024 — Ongoing',
    edu2Deg:'AI & Data Analysis Program', edu2Sch:'Marmara University', edu2Fld:'Institute of Population and Social Research · Artificial Intelligence | Data Analysis School', edu2Date:'Oct 2025 — May 2026',
    edu3Deg:'Bachelor of Science', edu3Sch:'Pamukkale University', edu3Fld:'Electrical and Electronics Engineering', edu3Date:'Sep 2018 — Dec 2023',
    edu4Deg:'High School — Science', edu4Sch:'Gürsu Borsa İstanbul Anatolian High School', edu4Fld:'Science Track', edu4Date:'Sep 2014 — Jun 2018',
    projTag:"WHAT I'VE BUILT", projTitle:'Projects',
    proj1Title:'Deploy Real-Time YOLOv9 Object Detection on NVIDIA Jetson AGX Orin using Simulink',
    proj1Date:'Jan 2026 – May 2026',
    proj1Desc:'This example shows how to deploy a Simulink® model on the NVIDIA® Jetson AGX Orin™ board for real-time object detection using an IP camera stream. This example detects and tracks objects in real-time by using the advanced YOLOv9 deep learning network. The Simulink model uses the network stream input and display blocks from the MATLAB® Coder™ Support Package for NVIDIA Jetson and NVIDIA DRIVE™ Platforms to capture the live video stream from an IP camera, process it using TensorRT™ optimized CUDA® code, and display the bounding boxes and prediction results on a monitor connected to the Jetson platform.',
    proj2Title:'TinyDL Moisture Detection on Raspberry Pi Pico',
    proj2Date:'May 2026 – Jul 2026',
    proj2Desc:'This project demonstrates a complete TinyDL pipeline — from raw sensor data collection to on-device inference — built entirely within the MATLAB & Simulink ecosystem. A capacitive moisture sensor feeds analog readings into a trained 1D CNN running on the RP2040 microcontroller, and the prediction is shown on a 7-segment LED display that counts from 0 to 9 on startup before switching to live classification output.',
    projBtn:'View on GitHub',
    navPubs:'Publications',

    tagCV:'Computer Vision', tagDL:'Deep Learning', tagPM:'Predictive Maintenance', tagIP:'Image Processing', tagAIR:'AI Research', tagRD:'R&D', tagAuto:'Automation', tagEE:'Electrical Engineering', tagCS:'Control Systems', tagHI:'Hardware Integration', tagSE:'Self-Employment', tagDen:'Denmark', tagIE:'International Experience',
    heroPill1:'Image Processing', heroPill2:'Computer Vision', heroPill3:'Machine Learning', heroPill4:'Deep Learning', heroPill5:'Edge AI',

    pubTag:'RESEARCH & PAPERS', pubTitle:'Publications',
    pub1Title:'Design and Performance Analysis of a Type-2 FLC Controller for a Fuel Cell Electric Vehicle Powertrain',
    pub1Authors:'Scilight Press',
    pub1Date:'Apr 20, 2026',
    pub1Desc:'The energy industry is targeting zero carbon emissions due to rising global demand and fossil fuel depletion. Proton Exchange Membrane Fuel Cells (PEMFC) are a strategic clean energy option thanks to their low operating temperature, flexible design, and high energy density. However, PEMFCs exhibit non-linear output characteristics due to activation, ohmic, and concentration losses. Their sensitivity to load changes also complicates achieving reliable voltage regulation meeting industry standards. This study compares two control architectures—Classic Proportional-Integral (PI) and Type-2 Fuzzy Logic (T2FLC)—developed to regulate a PEMFC stack\'s output to a 96V reference via a DC-DC Boost Converter in MATLAB/Simulink. Unlike previous research, this paper proposes a Gain Scheduling approach to enhance transient reaction speed while eliminating steady-state oscillations that degrade power quality.',
    pub2Title:'CWT-CNN-BASED INTELLIGENT HYBRID PQD CLASSIFICATION METHOD FOR A PV POWER PLANT',
    pub2Authors:'World Energy Storage Conference (WESC-2025)',
    pub2Date:'Dec 10, 2025',
    pub2Desc:'Power quality disturbances (PQDs) have become a major concern in contemporary power systems due to the integration of many generation or consumption sources to fulfill rising power demand. The objective of this research is to reliably and precisely classify PQDs that occur in contemporary energy systems. Conventional methods that rely on human classification, feature extraction, and signal analysis are laborious and susceptible to noise. To get over these restrictions, this study uses deep learning-based Convolutional Neural Network (CNN) models to analyze a real dataset taken from an actual photovoltaic (PV) power plant.',
    pub3Title:'MODELING ENERGY MANAGEMENT SYSTEM OF A SMALL POWERED FCEV CONSIDERING LOAD DEMAND',
    pub3Authors:'World Energy Storage Conference (WESC-2025)',
    pub3Date:'Dec 10, 2025',
    pub3Desc:'In the future, as fuel cell system (FCS) costs decrease, it will be necessary to develop an efficient energy management system (EMS) that reduces vehicle weight and transfers power from batteries to the load more efficiently. In parallel with this situation, fuel cell EV (FCEV) vehicles have also started to become widespread. In this study, an EMS that takes into account the load demand for a small, powerful FCEV consisting of a fuel cell and a battery is modeled.',
    pub4Title:'Large Language Models with MATLAB: GPT-4, Llama 3, and Mixtral',
    pub4Authors:'FİGES Blog',
    pub4Date:'Oct 20, 2025',
    pub4Desc:'In this article, we will examine how engineering workflows are transformed through LLM integration with MATLAB.',
    pub5Title:'Converting Deep Learning Models between PyTorch, TensorFlow, and MATLAB',
    pub5Authors:'FİGES Blog',
    pub5Date:'Sep 22, 2025',
    pub5Desc:'In this article, we will discuss how deep learning models can be converted between PyTorch, TensorFlow, and MATLAB platforms, and the advantages of this conversion. Especially PyTorch model conversion and TensorFlow model transfer processes are critically important for researchers working across different platforms.',
    pub6Title:'How to Use MATLAB and Python Together?',
    pub6Authors:'FİGES Blog',
    pub6Date:'Feb 10, 2025',
    pub6Desc:'In this blog post, we will be discussing some important tips regarding the interoperability and capabilities of MATLAB and Python used together.',
    pub7Title:'A NEW HYBRID GAIN-SCHEDULED ADAPTIVE NEURO FUZZY INFERENCE CONTROLLER DESIGN FOR IMPROVING THE OUTPUT STABILITY OF A FUEL CELL STACK',
    pub7Authors:'International Hydrogen Technologies Congress (IHTEC-2026)',
    pub7Date:'May 12, 2026',
    pub7Desc:'The non-linear stochastic voltage drops in the \'activation\', \'ohmic\', and \'concentration\' regions, which occur in response to sudden changes in load current, render obtaining a stable and regulated DC bus voltage a mandatory control engineering problem. In this investigation, a DC-DC Boost converter has been developed to accurately control the output voltage of a PEMFC-based power system at the 96 Volt level. The study considered conventional Proportional-Integral (PI) controllers, Fuzzy Logic controllers, and a novel Gain-Scheduled Adaptive Neuro-Fuzzy Inference System (GS-ANFIS) controllers. Extensive simulations performed in MATLAB/Simulink showed that the PI controller produced an average voltage of 96.22V and the Fuzzy Logic controller produced 95.71V in a 0-1 second period. On the other hand, the GS-ANFIS controller showed the transient response closest to the reference with 95.94 V. Once the system stabilized at 0.3 seconds, the Gain-Scheduled ANFIS controller recorded an average voltage of 96.03 V, with the absolute error being kept at a very low level of 0.03 V (0.03%). These findings, through the experiments, confirm that the proposed Gain-Scheduled ANFIS framework has a significantly more robust structure than the traditional methods under dynamic conditions involving sudden load changes.',

    
    skillAI:'Artificial Intelligence', skillMBD:'Model-Based Design', skillCV:'Computer Vision', skillPython:'Python & Data Analysis', skillEdge:'Edge AI & Hardware',
    tagML2:'Machine Learning', tagDL2:'Deep Learning', tagNN:'Neural Networks', tagOD:'Object Detection', tagIS:'Image Segmentation', tagIP2:'Image Processing', tagOT:'Object Tracking', tagDV:'Data Visualization', tagES:'Embedded Systems', tagRTS:'Real-Time Systems', tagHD:'Hardware Deployment', tagCG:'Code Generation', tagSP:'Signal Processing',
    skillsTag:'EXPERTISE', skillsTitle:'Skills & Technologies',
    certsTag:'CONTINUOUS LEARNING', certsTitle:'Certifications',
    certAll:'All', certNvidia:'NVIDIA', certMath:'MathWorks', certAiml:'AI / ML', certOther:'Other',
    contactTag:'GET IN TOUCH', contactTitle:"Let's Connect",
    contactDesc:'Whether you have a project idea, collaboration opportunity, or just want to say hello — my inbox is always open.',
    formNameLabel:'Your Name', formEmailLabel:'Your Email', formMsgLabel:'Your Message',
    formNamePh:'Jane Doe', formEmailPh:'jane@example.com', formMsgPh:'Hello Doğukan, I would like to...',
    formBtn:'Send Message',
    formSuccess:"Message sent! I'll get back to you as soon as possible.",
    contactInfoTitle:'Contact Information',
    contactLinkEmail:'Email', contactLinkEmailSub:'dmkilinc@outlook.com',
    contactLinkLI:'LinkedIn', contactLinkLISub:'linkedin.com/in/dgkilinc',
    contactLinkGH:'GitHub', contactLinkGHSub:'github.com/dogukankilinc',
    footerMade:'Designed & built with', footerBy:'by Doğukan M. KILINÇ',
  },
  tr: {
    navAbout:'Hakkımda', navExperience:'Deneyim', navEducation:'Eğitim',
    navProjects:'Projeler', navSkills:'Yetenekler', navCerts:'Sertifikalar', navContact:'İletişim',
    heroEyebrow:'> Merhaba! Ben',
    heroSendMsg: 'Mesaj Gönder',
    modalTitle: 'Mesaj Gönder',
    heroSub:"FİGES A.Ş.'de YZ & ML Mühendisi · EEE Yüksek Lisans · Bilgisayarlı Görü · Derin Öğrenme · Edge AI",
    heroBtnProjects:'Projelere Git', heroBtnCV:"CV'yi İndir", heroBtnAcademic:'Akademik CV',
    liveStatus:'İş Birliğine Açık',
    aboutTag:'HAKKIMDA', aboutTitle:'Hakkımda',
    aboutP1:"Yenilikçi teknolojileri endüstriyel çözümlere dönüştürme tutkusuyla hareket eden bir Elektrik ve Elektronik Mühendisiyim. Yaklaşık 2.5 yıldır FİGES A.Ş. bünyesinde Yapay Zeka ve Makine Öğrenmesi Mühendisi olarak Ar-Ge inisiyatiflerine yön veriyorum. Pamukkale Üniversitesi'nden aldığım güçlü mühendislik temelini ve Danimarka'daki uluslararası deneyimimi, şu anda Bursa Teknik Üniversitesi'nde aktif olarak devam ettiğim yüksek lisans eğitimim ile bir ileri seviyeye taşıyorum.",
    aboutP2:"Uzmanlığımın merkezinde Edge AI, Gömülü Görüntü İşleme (Embedded Vision) ve Model Tabanlı Tasarım (MBD) yer almaktadır. NVIDIA Jetson platformlarında (AGX Orin, TX2) derin öğrenme ve nesne tespiti modellerinin (YOLOv4, YOLO8, YOLO9, YOLO11) gerçek zamanlı dağıtımı ve optimizasyonu konusunda kapsamlı tecrübeye sahibim. Aynı zamanda MathWorks ekosistemine (MATLAB & Simulink) derin bir hakimiyetim bulunuyor; V-Model süreçlerini takip ederek otomatik kod üretimi (GPU Coder, TensorRT) ve sistem entegrasyonu projeleri yürütüyorum.",
    aboutP3:"Yapay zekanın farklı ölçeklerdeki uygulamalarıyla aktif olarak ilgileniyorum. Bir yanda Raspberry Pi Pico (RP2040) ve Arduino gibi düşük güçlü mikrodenetleyiciler üzerinde TinyML/TinyDL (örn. 1D CNN ile nem tespiti) projeleri geliştirirken, diğer yanda Ollama, Streamlit ve Model Context Protocol (MCP) kullanarak yerel Büyük Dil Modeli (LLM) entegrasyonları (örn. FIGES MathWorks CV Analyzer) tasarlıyorum.",
    aboutP4:"Akademik araştırmalarımda yapay zeka ile güç elektroniği ve yenilenebilir enerjinin kesişim noktalarına odaklanıyorum. Özellikle Proton Değişim Membranlı Yakıt Pili (PEMFC) sistemleri için Tip-2 Bulanık Mantık ve ANFIS kontrolör tasarımları ile güç kalitesi bozulmalarının sınıflandırılmasında Spiking Neural Networks (SNN) ve Vision Transformers (ViT) gibi hibrit mimariler üzerine çalışmalar yürütmekteyim.",
    aboutP5:"<strong>Temel Yetkinlikler:</strong><br><br><strong>Yapay Zeka & Derin Öğrenme:</strong> Edge AI, Bilgisayarlı Görme, YOLO Mimari Ailesi, TinyML, Yerel LLM Entegrasyonları (Ollama, Qwen, Phi).<br><strong>Yazılım & Araçlar:</strong> MATLAB, Simulink, GPU Coder, TensorRT, Python, Streamlit.<br><strong>Donanım & Gömülü Sistemler:</strong> NVIDIA Jetson (AGX Orin, TX2), Raspberry Pi Pico, Arduino.<br><strong>Sistem Mühendisliği:</strong> Model Tabanlı Tasarım (MBD), V-Model, Otomatik Kod Üretimi.<br><strong>Güç & Enerji Sistemleri:</strong> PEMFC, DC-DC Dönüştürücüler, Güç Kalitesi Analizi.",
    statYears:'Yıl Deneyim', statCerts:'Sertifika', statProjects:'GitHub Projesi', statDegrees:'Akademik Derece',
    expTag:'KARİYER YOLCULUĞU', expTitle:'Deneyim', prevRoles:'Önceki Görevler', askAI:'Yapay Zekaya Sor',
    expFiges1: '<ul class="experience-list"><li>MATLAB & Simulink ortamında Model Tabanlı Tasarım (MBD) metodolojilerini kullanarak yapay zeka destekli otonom sistemlerin tasarım ve simülasyonunu gerçekleştirdim.</li><li>Önde gelen mühendislik firmalarına ve akademik kurumlara ileri düzey teknik eğitimler verdim; Ar-Ge ekiplerine MATLAB/Simulink iş akışları üzerine proje bazlı danışmanlık sağladım.</li><li>Predictive Maintenance Toolbox kullanarak durum izleme, hata tespiti ve Kalan Faydalı Ömür (RUL) tahmini için veri odaklı makine öğrenmesi modelleri geliştirdim.</li><li>Şu anda, Lidar ve Görüntü İşleme Araç Kutularını kullanarak algı (perception) algoritmaları üzerindeki Ar-Ge çalışmalarını ilerletiyor; bu modellerin GPU Coder aracılığıyla NVIDIA platformlarında gerçek zamanlı performansta dağıtılmasına ve optimize edilmesine odaklanıyorum.</li></ul>',
    expFiges2: '<ul class="experience-list"><li>MATLAB & Simulink kullanarak YZ ve Makine Öğrenmesi araştırma projeleri yürüttüm.</li><li>Görsel algı (visual perception) ve derin öğrenme modellerine odaklandım.</li></ul>',
    expFiges3: '<ul class="experience-list"><li>MATLAB kullanarak YZ ve Makine Öğrenmesi araştırma projeleri yürüttüm.</li><li>Küçük ölçekli bilgisayarlı görü görevleri üzerinde çalıştım.</li><li>Nesne tespiti ve tanıma için derin öğrenme tekniklerini uyguladım.</li></ul>',
    exp4Desc:'Sektör profesyonelleri ve akademisyenlerle derin teknoloji & yapay zeka eğitim programına katılım. Sektörler genelinde YZ\'nin dönüştürücü rolüne geniş perspektif kazanıldı.',
    exp5Desc:'Ahşap işleme makinesi geliştirme; elektrik/elektronik bileşen montajı, kontrol panosu kablolama, test ve devreye alma. Yazılım ekibiyle iş birliği yapıldı.',
    exp6Desc:'Eylül 2020\'de COVID-19 üniversite kapanmaları nedeniyle Danimarka\'ya taşınıldı. Şahıs şirketi kurulup vergi yükümlülükleri yerine getirildi; uyum kabiliyeti ve uluslararası iş deneyimi kazanıldı.',
    eduTag:'AKADEMİK GEÇMİŞ', eduTitle:'Eğitim',
    edu1Deg:'Yüksek Lisans (M.Sc.)', edu1Sch:'Bursa Teknik Üniversitesi', edu1Fld:'Elektrik-Elektronik Mühendisliği', edu1Date:'Ağu 2024 — Devam Ediyor',
    edu2Deg:'Yapay Zeka ve Veri Analizi Uzmanlık Eğitimi', edu2Sch:'Marmara Üniversitesi', edu2Fld:'Nüfus ve Sosyal Araştırmalar Enstitüsü · Yapay Zeka | Veri Analizi Okulu', edu2Date:'Ekim 2025 — Mayıs 2026',
    edu3Deg:'Lisans (B.Sc.)', edu3Sch:'Pamukkale Üniversitesi', edu3Fld:'Elektrik-Elektronik Mühendisliği', edu3Date:'Eylül 2018 — Aralık 2023',
    edu4Deg:'Lise — Fen Bilimleri', edu4Sch:'Gürsu Borsa İstanbul Anadolu Lisesi', edu4Fld:'Sayısal Bölüm', edu4Date:'Eylül 2014 — Haziran 2018',
    projTag:'GELİŞTİRDİKLERİM', projTitle:'Projeler',
    proj1Title:'Simulink Kullanarak NVIDIA Jetson AGX Orin Üzerinde Gerçek Zamanlı YOLOv9 Nesne Tespiti',
    proj1Date:'Ocak 2026 – Mayıs 2026',
    proj1Desc:"Bu örnek, IP kamera akışı kullanılarak gerçek zamanlı nesne tespiti için NVIDIA® Jetson AGX Orin™ üzerinde bir Simulink® modelinin nasıl dağıtılacağını gösterir. Gelişmiş YOLOv9 derin öğrenme ağını kullanarak nesneleri gerçek zamanlı tespit eder ve takip eder. Simulink modeli, IP kameradan gelen canlı videoyu yakalamak, TensorRT™ ile optimize edilmiş CUDA® kodu aracılığıyla işlemek ve tahmin sonuçlarını monitörde göstermek için NVIDIA Jetson platformuna özel MATLAB® Coder™ destek paketi bloklarını kullanır.",
    proj2Title:'Raspberry Pi Pico Üzerinde TinyDL Nem Tespiti',
    proj2Date:'Mayıs 2026 – Temmuz 2026',
    proj2Desc:"Bu proje, ham sensör verisinden cihaz üzerinde (on-device) çıkarım (inference) aşamasına kadar tamamen MATLAB & Simulink ekosisteminde kurulmuş bir TinyDL iş akışını (pipeline) göstermektedir. Kapasitif bir nem sensöründen gelen analog veriler, RP2040 mikrodenetleyicisi üzerinde koşan eğitilmiş bir 1D CNN modeline beslenir. Başlangıçta 0'dan 9'a sayan 7 segmentli bir LED ekran, sonrasında canlı sınıflandırma (Islak/Kuru) sonucunu gösterir.",
    projBtn:"GitHub'da Görüntüle",
    navPubs:'Yayınlar',

    tagCV:'Bilgisayarlı Görü', tagDL:'Derin Öğrenme', tagPM:'Kestirimci Bakım', tagIP:'Görüntü İşleme', tagAIR:'YZ Araştırması', tagRD:'Ar-Ge', tagAuto:'Otomasyon', tagEE:'Elektrik Mühendisliği', tagCS:'Kontrol Sistemleri', tagHI:'Donanım Entegrasyonu', tagSE:'Şahıs Şirketi', tagDen:'Danimarka', tagIE:'Uluslararası Deneyim',
    heroPill1:'Görüntü İşleme', heroPill2:'Bilgisayarlı Görü', heroPill3:'Makine Öğrenmesi', heroPill4:'Derin Öğrenme', heroPill5:'Edge AI',

    pubTag:'ARAŞTIRMA & MAKALELER', pubTitle:'Yayınlar',
    pub1Title:'Yakıt Hücreli Elektrikli Araç Güç Aktarma Organı için Tip-2 FLC Kontrolörünün Tasarımı ve Performans Analizi',
    pub1Authors:'Scilight Press',
    pub1Date:'20 Nis 2026',
    pub1Desc:'Enerji endüstrisi, artan küresel talep ve fosil yakıtların tükenmesi nedeniyle sıfır karbon emisyonunu hedefliyor. Proton Değişim Membranlı Yakıt Pilleri (PEMFC), düşük çalışma sıcaklığı, esnek tasarımı ve yüksek enerji yoğunluğu sayesinde stratejik bir temiz enerji seçeneğidir. Ancak PEMFC\'ler, aktivasyon, ohmik ve konsantrasyon kayıpları nedeniyle doğrusal olmayan çıkış özellikleri sergiler. Yük değişimlerine olan duyarlılıkları da endüstri standartlarını karşılayan güvenilir voltaj regülasyonunun sağlanmasını zorlaştırır. Bu çalışma, MATLAB/Simulink\'te bir DC-DC Boost Dönüştürücü aracılığıyla bir PEMFC yığınının çıkışını 96V referansına düzenlemek için geliştirilen Klasik Oransal-İntegral (PI) ve Tip-2 Bulanık Mantık (T2FLC) olmak üzere iki kontrol mimarisini karşılaştırmaktadır.',
    pub2Title:'PV GÜÇ SANTRALİ İÇİN CWT-CNN TABANLI AKILLI HİBRİT PQD SINIFLANDIRMA YÖNTEMİ',
    pub2Authors:'World Energy Storage Conference (WESC-2025)',
    pub2Date:'10 Ara 2025',
    pub2Desc:'Artan güç talebini karşılamak için birçok üretim veya tüketim kaynağının entegrasyonu nedeniyle güç kalitesi bozulmaları (PQD\'ler) günümüz güç sistemlerinde önemli bir endişe kaynağı haline gelmiştir. Bu araştırmanın amacı, güncel enerji sistemlerinde meydana gelen PQD\'leri güvenilir ve kesin bir şekilde sınıflandırmaktır. Bu kısıtlamaları aşmak için, bu çalışmada gerçek bir fotovoltaik (PV) santralden alınan gerçek bir veri setini analiz etmek üzere derin öğrenme tabanlı Evrişimli Sinir Ağı (CNN) modelleri kullanılmıştır.',
    pub3Title:'YÜK TALEBİ DİKKATE ALINARAK KÜÇÜK GÜÇLÜ BİR FCEV\'İN ENERJİ YÖNETİM SİSTEMİNİN MODELLENMESİ',
    pub3Authors:'World Energy Storage Conference (WESC-2025)',
    pub3Date:'10 Ara 2025',
    pub3Desc:'Gelecekte, yakıt hücresi sistemi (FCS) maliyetleri azaldıkça, araç ağırlığını azaltan ve pillerden yüke daha verimli güç aktaran verimli bir enerji yönetim sistemi (EMS) geliştirmek gerekli olacaktır. Bu duruma paralel olarak, yakıt hücreli elektrikli araç (FCEV) otomobilleri de yaygınlaşmaya başlamıştır. Bu çalışmada, bir yakıt hücresi ve bir pilden oluşan küçük, güçlü bir FCEV için yük talebini dikkate alan bir EMS modellenmiştir.',
    pub4Title:'MATLAB ile Büyük Dil Modelleri: GPT-4, Llama 3 ve Mixtral',
    pub4Authors:'FİGES Blog',
    pub4Date:'20 Eki 2025',
    pub4Desc:'Bu yazımızda MATLAB ile LLM entegrasyonu sayesinde mühendislik iş akışlarının nasıl dönüştüğünü inceleyeceğiz.',
    pub5Title:'Derin Öğrenme Modellerini PyTorch, TensorFlow ve MATLAB ile Dönüştürme',
    pub5Authors:'FİGES Blog',
    pub5Date:'22 Eyl 2025',
    pub5Desc:'Bu yazıda, derin öğrenme modellerinin PyTorch, TensorFlow ve MATLAB platformları arasında nasıl dönüştürülebileceğine ve bu dönüşümün sağladığı avantajlara değineceğiz. Özellikle PyTorch model dönüştürme ve TensorFlow model aktarımı süreçleri, farklı platformlarda çalışan araştırmacılar için kritik öneme sahiptir.',
    pub6Title:'MATLAB ve Python Birlikte Nasıl Kullanılır?',
    pub6Authors:'FİGES Blog',
    pub6Date:'10 Şub 2025',
    pub6Desc:'Bu blog yazısı içerisinde de MATLAB ile Python’un birlikte çalışabilirliği, yetenekleri konusunda bazı önemli ipuçlarından bahsediyor olacağız.',
    pub7Title:'YAKIT HÜCRESİ YIĞINININ ÇIKIŞ KARARLILIĞINI ARTIRMAK İÇİN YENİ BİR HİBRİT KAZANÇ ÇİZELGELİ ADAPTİF NÖRO BULANIK ÇIKARIM KONTROLÖRÜ TASARIMI',
    pub7Authors:'Uluslararası Hidrojen Teknolojileri Kongresi (IHTEC-2026)',
    pub7Date:'12 Mayıs 2026',
    pub7Desc:'Yük akımındaki ani değişimlere yanıt olarak ortaya çıkan \'aktivasyon\', \'ohmik\' ve \'konsantrasyon\' bölgelerindeki doğrusal olmayan stokastik voltaj düşüşleri, kararlı ve regüle edilmiş bir DC barası voltajı elde etmeyi zorunlu bir kontrol mühendisliği problemi haline getirmektedir. Bu araştırmada, PEMFC tabanlı bir güç sisteminin çıkış voltajını 96 Volt seviyesinde hassas bir şekilde kontrol etmek için bir DC-DC Boost dönüştürücü geliştirilmiştir. Çalışmada geleneksel Oransal-İntegral (PI) kontrolörler, Bulanık Mantık (Fuzzy Logic) kontrolörler ve özgün bir Kazanç Çizelgeli Adaptif Nöro-Bulanık Çıkarım Sistemi (GS-ANFIS) kontrolörü ele alınmıştır. MATLAB/Simulink\'te gerçekleştirilen kapsamlı simülasyonlar, 0-1 saniyelik periyotta PI kontrolörünün ortalama 96.22V ve Bulanık Mantık kontrolörünün 95.71V ürettiğini göstermiştir. Öte yandan, GS-ANFIS kontrolörü 95.94V ile referansa en yakın geçici (transient) yanıtı sergilemiştir. Sistem 0.3 saniyede kararlılığa ulaştıktan sonra, Kazanç Çizelgeli ANFIS kontrolörü mutlak hatayı 0.03V (%0.03) gibi çok düşük bir seviyede tutarak ortalama 96.03V voltaj kaydetmiştir. Deneyler aracılığıyla elde edilen bu bulgular, önerilen Kazanç Çizelgeli ANFIS yapısının, ani yük değişimlerini içeren dinamik koşullar altında geleneksel yöntemlerden çok daha gürbüz (robust) bir yapıya sahip olduğunu doğrulamaktadır.',

    
    skillAI:'Yapay Zeka', skillMBD:'Model Tabanlı Tasarım', skillCV:'Bilgisayarlı Görü', skillPython:'Python & Veri Analizi', skillEdge:'Edge AI & Donanım',
    tagML2:'Makine Öğrenmesi', tagDL2:'Derin Öğrenme', tagNN:'Sinir Ağları', tagOD:'Nesne Tespiti', tagIS:'Görüntü Bölütleme', tagIP2:'Görüntü İşleme', tagOT:'Nesne Takibi', tagDV:'Veri Görselleştirme', tagES:'Gömülü Sistemler', tagRTS:'Gerçek Zamanlı Sistemler', tagHD:'Donanım Dağıtımı', tagCG:'Kod Üretimi', tagSP:'Sinyal İşleme',
    skillsTag:'UZMANLIK', skillsTitle:'Yetenekler & Teknolojiler',
    certsTag:'SÜREKLİ ÖĞRENME', certsTitle:'Sertifikalar',
    certAll:'Tümü', certNvidia:'NVIDIA', certMath:'MathWorks', certAiml:'YZ / ML', certOther:'Diğer',
    contactTag:'İLETİŞİME GEÇ', contactTitle:'Bağlantı Kuralım',
    contactDesc:'Bir proje fikriniz, iş birliği fırsatınız veya sadece merhaba demek istiyorsanız — mesajınızı bekliyorum.',
    formNameLabel:'Adınız', formEmailLabel:'E-posta Adresiniz', formMsgLabel:'Mesajınız',
    formNamePh:'Ad Soyad', formEmailPh:'ornek@mail.com', formMsgPh:'Merhaba Doğukan, ...',
    formBtn:'Mesaj Gönder',
    formSuccess:'Mesajınız iletildi! En kısa sürede geri döneceğim.',
    contactInfoTitle:'İletişim Bilgileri',
    contactLinkEmail:'E-posta', contactLinkEmailSub:'dmkilinc@outlook.com',
    contactLinkLI:'LinkedIn', contactLinkLISub:'linkedin.com/in/dgkilinc',
    contactLinkGH:'GitHub', contactLinkGHSub:'github.com/dogukankilinc',
    footerMade:'Tasarım & Geliştirme:', footerBy:'Doğukan M. KILINÇ',
  }
};

let lang = localStorage.getItem('dmk-lang') || 'en';

function applyLang(l) {
  lang = l;
  localStorage.setItem('dmk-lang', l);
  document.documentElement.lang = l;
  const tx = T[l];

  // Update all [data-lk] elements
  document.querySelectorAll('[data-lk]').forEach(el => {
    const key = el.dataset.lk;
    const val = tx[key];
    if (val == null) return;
    const tag = el.tagName;

    if (tag === 'INPUT' || tag === 'TEXTAREA') { el.placeholder = val; return; }
    if (el.hasAttribute('data-lk-html')) { el.innerHTML = val; return; }

    // Labels: update first text node
    if (tag === 'LABEL') {
      for (const node of el.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          node.textContent = val; return;
        }
      }
      el.textContent = val; return;
    }

    // Leaf elements (no child elements) — safe to set textContent
    if (el.children.length === 0) el.textContent = val;
  });

  // Update timeline descriptions
  document.querySelectorAll('[data-lk-exp]').forEach(el => {
    const val = tx[el.dataset.lkExp];
    if (val) el.innerHTML = val;
  });

  // Update lang button highlight
  document.getElementById('langEN')?.classList.toggle('lang-active', l === 'en');
  document.getElementById('langTR')?.classList.toggle('lang-active', l === 'tr');
  document.getElementById('mobileLangEN')?.classList.toggle('lang-active', l === 'en');
  document.getElementById('mobileLangTR')?.classList.toggle('lang-active', l === 'tr');

  // Restart full typewriter sequence in new language
  startTypewriterSequence(l);

  // Re-stream publications in new language (if already streamed)
  if (typeof window._relangPublications === 'function') {
    window._relangPublications(l);
  }
}

// Language toggle buttons — direct targets
function setLang(targetLang) {
  try {
    if (lang !== targetLang) applyLang(targetLang);
  } catch(err) {
    console.error('[Lang Set Error]', err);
  }
}

document.getElementById('langEN')?.addEventListener('click', () => setLang('en'));
document.getElementById('langTR')?.addEventListener('click', () => setLang('tr'));
document.getElementById('mobileLangEN')?.addEventListener('click', () => setLang('en'));
document.getElementById('mobileLangTR')?.addEventListener('click', () => setLang('tr'));

// Apply saved language on load
if (lang !== 'en') {
  try { applyLang(lang); } catch(e) { console.error('[Lang Init Error]', e); }
}

// ==================== CERTIFICATIONS FILTER ====================
document.querySelectorAll('.cert-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cert-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.cert-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.provider !== filter);
    });
  });
});

// ==================== CONTACT FORM — mailto approach ====================
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const name    = form.querySelector('#name')?.value    || '';
  const email   = form.querySelector('#email')?.value   || '';
  const message = form.querySelector('#message')?.value || '';
  
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  
  // Open user's mail client with pre-filled content
  window.location.href = `mailto:dmkilinc@outlook.com?subject=${subject}&body=${body}`;
  
  // Show success after a short delay
  setTimeout(() => {
    form.reset();
    if (formSuccess) {
      formSuccess.textContent = T[lang].formSuccess;
      formSuccess.style.display = 'block';
      formSuccess.style.color   = 'var(--accent)';
      formSuccess.style.marginTop = '12px';
      formSuccess.style.fontSize  = '0.9rem';
      setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
    }
  }, 500);
});

// ==================== COPY EMAIL ====================
document.querySelectorAll('[data-copy-email]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    navigator.clipboard?.writeText('dmkilinc@outlook.com').then(() => {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i>';
      btn.style.color = 'var(--accent)';
      setTimeout(() => { btn.innerHTML = orig; btn.style.color = ''; }, 2000);
    });
  });
});

// ==================== ACTIVE NAV HIGHLIGHT ====================
const navAnchors = document.querySelectorAll('.nav-links a');
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a =>
        a.classList.toggle('active-nav', a.getAttribute('href') === `#${e.target.id}`)
      );
    }
  });
}, { rootMargin: '-38% 0px -55% 0px' });
allSections.forEach(s => navObs.observe(s));

// Corporate CV Download
const cvDownloadBtn = document.getElementById('cvDownloadBtn');
if (cvDownloadBtn) {
  cvDownloadBtn.addEventListener('click', () => {
    console.log('Downloading CV...');
  });
}

// ==================== LLM STREAMING ANIMATION ====================
// Typewriter effect for publication abstracts — re-streams on lang change
const streamElsAll = document.querySelectorAll('.llm-stream');

function streamText(el, text) {
  const cursor = el.previousElementSibling;
  el.textContent = '';
  if (cursor) cursor.style.display = 'inline-block';
  
  // Create a unique ID for this streaming session
  const typeId = Date.now().toString() + Math.random();
  el.dataset.typeId = typeId;
  
  let i = 0;
  function typeChar() {
    // If the element's typeId has changed, it means a new stream started. Stop this one.
    if (el.dataset.typeId !== typeId) return;
    
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, Math.random() * 28 + 8);
    } else {
      if (cursor) cursor.style.display = 'none';
    }
  }
  setTimeout(typeChar, 300);
}

const streamObs = new IntersectionObserver((entries, observer) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      const key = el.getAttribute('data-stream-id');
      const text = T[lang][key];
      if (text) streamText(el, text);
      el.dataset.streamed = '1';
      observer.unobserve(el);
    }
  });
}, { threshold: 0.2 });

streamElsAll.forEach(el => streamObs.observe(el));

// Re-stream on language change (patch applyLang to also refresh publications)
const _origApplyLang = applyLang;
window._relangPublications = function(l) {
  streamElsAll.forEach(el => {
    if (el.dataset.streamed) {
      const key = el.getAttribute('data-stream-id');
      const text = T[l][key];
      if (text) streamText(el, text);
    }
  });
};


// ===================== NEURAL NETWORK BACKGROUND =====================
(function() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const isMobile = window.innerWidth < 768;
  const numParticles = isMobile ? 40 : 100;
  const connectionDistance = 150;
  
  for(let i=0; i<numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      radius: Math.random() * 2 + 1
    });
  }
  
  let scrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    let delta = window.scrollY - scrollY;
    scrollY = window.scrollY;
    particles.forEach(p => {
      p.y -= delta * 0.5; // Parallax effect
      if (p.y > height) p.y -= height;
      if (p.y < 0) p.y += height;
    });
  });
  
  let mouse = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    ctx.fillStyle = 'rgba(0, 255, 136, 0.8)';
    for(let i=0; i<particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      
      let dx = mouse.x - p.x;
      let dy = mouse.y - p.y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      
      // Push particles away slightly
      if (dist < 150) {
        p.x -= dx * 0.02;
        p.y -= dy * 0.02;
      }
      
      // Draw connection to mouse
      if (dist < 180) {
        ctx.beginPath();
        let opacity = 0.6 * (1 - dist/180);
        ctx.strokeStyle = 'rgba(0, 255, 136, ' + opacity + ')';
        ctx.lineWidth = 1.5;
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    for(let i=0; i<particles.length; i++) {
      for(let j=i+1; j<particles.length; j++) {
        let p1 = particles[i];
        let p2 = particles[j];
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < connectionDistance) {
          ctx.beginPath();
          let opacity = 0.4 * (1 - dist/connectionDistance);
          ctx.strokeStyle = 'rgba(0, 255, 136, ' + opacity + ')';
          ctx.lineWidth = 1;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
})();


// Modal Functions
window.openModal = function(id) {
  document.getElementById(id).classList.add('active');
};
window.closeModal = function(e, id) {
  if(e.target.id === id) {
    document.getElementById(id).classList.remove('active');
  }
};

// Custom AI Drawer Toggle
window.toggleAIDrawer = function() {
  const drawer = document.getElementById('ai-chat-drawer');
  drawer.classList.toggle('open');
};
