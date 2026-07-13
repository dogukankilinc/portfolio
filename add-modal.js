const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// A. Revert live-status and add the Send Message button
const searchHero = '<a href="#contact" class="live-status" style="text-decoration:none; color:inherit; cursor:pointer;" title="Contact Me">\n        <span class="live-dot"></span>\n        <span data-lk="liveStatus">Open to Collaboration</span>\n      </a>';
const replaceHero = `<div class="live-status">
        <span class="live-dot"></span>
        <span data-lk="liveStatus">Open to Collaboration</span>
      </div>
      <button class="btn btn-primary hero-msg-btn" onclick="openModal('contactModal')">
        <i class="fa-solid fa-paper-plane"></i> <span data-lk="heroSendMsg">Send Message</span>
      </button>`;

if (html.includes(searchHero)) {
  html = html.replace(searchHero, replaceHero);
} else {
  console.log("Could not find the anchor live-status to revert.");
}

// B. Add the Modal HTML just before </body>
const modalHTML = `
<!-- Contact Modal -->
<div id="contactModal" class="modal-overlay" onclick="closeModal(event, 'contactModal')">
  <div class="modal-content">
    <button class="modal-close" onclick="document.getElementById('contactModal').classList.remove('active')"><i class="fa-solid fa-xmark"></i></button>
    <h3 data-lk="modalTitle" style="margin-bottom:20px;">Send a Message</h3>
    <form id="contactModalForm" action="#" onsubmit="return false;">
      <div class="form-group">
        <label for="m-name" data-lk="formNameLabel">Your Name</label>
        <input type="text" id="m-name" name="name" placeholder="Jane Doe" required>
      </div>
      <div class="form-group">
        <label for="m-email" data-lk="formEmailLabel">Your Email</label>
        <input type="email" id="m-email" name="email" placeholder="jane@example.com" required>
      </div>
      <div class="form-group">
        <label for="m-message" data-lk="formMsgLabel">Your Message</label>
        <textarea id="m-message" name="message" placeholder="Hello Doğukan..." rows="4" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">
        <i class="fa-solid fa-paper-plane"></i>
        <span data-lk="formBtn">Send Message</span>
      </button>
    </form>
  </div>
</div>
`;
if (!html.includes('id="contactModal"')) {
  html = html.replace('</body>', modalHTML + '\n</body>');
}

fs.writeFileSync('index.html', html);


// 2. Update style.css
let css = fs.readFileSync('css/style.css', 'utf8');

const modalCSS = `
/* ===================== MODAL ===================== */
.hero-msg-btn {
  margin-top: 15px;
  margin-bottom: 20px;
  display: inline-flex;
  font-size: 0.9rem;
  padding: 10px 20px;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.8);
  backdrop-filter: blur(5px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
}
.modal-overlay.active {
  opacity: 1;
  pointer-events: auto;
}
.modal-content {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 30px;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  position: relative;
  transform: translateY(20px);
  transition: all 0.3s ease;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
}
.modal-overlay.active .modal-content {
  transform: translateY(0);
}
.modal-close {
  position: absolute;
  top: 15px; right: 15px;
  background: none; border: none;
  color: var(--text-muted);
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s;
}
.modal-close:hover {
  color: var(--accent);
}
#contactModalForm .form-group {
  margin-bottom: 15px;
}
`;
if (!css.includes('.modal-overlay')) {
  css += '\n' + modalCSS;
  fs.writeFileSync('css/style.css', css);
}

// 3. Update main.js
let js = fs.readFileSync('js/main.js', 'utf8');
const modalJS = `
// Modal Functions
window.openModal = function(id) {
  document.getElementById(id).classList.add('active');
};
window.closeModal = function(e, id) {
  if(e.target.id === id) {
    document.getElementById(id).classList.remove('active');
  }
};
`;
if (!js.includes('window.openModal')) {
  js += '\n' + modalJS;
  fs.writeFileSync('js/main.js', js);
}

console.log("Modal setup complete.");
