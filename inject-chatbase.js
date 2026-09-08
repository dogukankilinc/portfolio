const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const script = `<!-- Chatbase AI Widget -->
<script>
(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="Rphvk1h_sxNKtORKYYcnU";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
</script>
</body>`;
if (!html.includes('chatbase.co/embed.min.js')) {
  html = html.replace('</body>', script);
  fs.writeFileSync('index.html', html);
  console.log('Chatbase script injected.');
} else {
  console.log('Script already present.');
}
