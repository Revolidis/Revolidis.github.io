var x = 0;
var t = 0;
let y = 0;
let f0=0;
let limit=0;
let amp=50;
let w=2*Math.PI;
let T = 2 * Math.PI / w;
let simSpeed = 1;   // user-controlled speed
let dt = 0; 
let x1=0.1;
let running =0;
let substeps=0;
let x2=amp+1;
let scale = 1; // pixels per unit
let tickStep=50;
let yprev=0.0;
let rotcheck = false;
let sinCheck = false;
let arel;
let p1;
let offsetX =0;
let offsetY =0;
let dragging = false;
let lastX = 0;
let lastY = 0;
document.getElementById("rotCheck").addEventListener("change", function() {
    rotcheck = this.checked;
    if (rotcheck==0){
   document.getElementById("text-input").style.display = "none";
   document.getElementById("fieldLabel").style.display = "none";
    x2=amp+1;}
else{document.getElementById("text-input").style.display = "flex";
  document.getElementById("fieldLabel").style.display = "flex";
  x2=10*x2input.value;
}
});
document.getElementById("sinCheck").addEventListener("change", function() {
    sinCheck = this.checked;
    
});
window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();

    if (e.deltaY > 0) {
      scale *= 0.9;   // zoom out
    } else {
      scale *= 1.1;   // zoom in
    }
     scale = Math.max(0.5, Math.min(200, scale));
    
  },
  { passive: false }
);
const sketchContainer = document.getElementById("sketch-container");
sketchContainer.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;

    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
});

window.addEventListener("mouseup", () => {
    dragging = false;
});

window.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    let dx = e.clientX - lastX;
    let dy = e.clientY - lastY;

    offsetX += dx;
    offsetY += dy;

    lastX = e.clientX;
    lastY = e.clientY;
});
// ---- Touch support (mobile): two-finger pinch-to-zoom ----
// This page has no drag/pan on desktop (only wheel-zoom), so touch only
// mirrors the zoom behavior — no one-finger pan is added.

let lastTouchDist = null;

function getTouchDist(touches) {
  let dx = touches[0].clientX - touches[1].clientX;
  let dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

sketchContainer.addEventListener("touchstart", (e) => {
  if (e.touches.length === 2) {
    lastTouchDist = getTouchDist(e.touches);
  }
}, { passive: false });

sketchContainer.addEventListener("touchmove", (e) => {
  if (e.touches.length === 2) {
    e.preventDefault(); // stop the browser's own pinch-zoom from also firing

    let newDist = getTouchDist(e.touches);
    if (lastTouchDist) {
      scale *= newDist / lastTouchDist;
      scale = Math.max(0.5, Math.min(200, scale));
    }
    lastTouchDist = newDist;
  }
}, { passive: false });

sketchContainer.addEventListener("touchend", () => {
  lastTouchDist = null;
});
// ---- End touch support ----

let rtext = document.getElementById("restart");
document.getElementById("restart").addEventListener("click", () => {
  if (dt == 0){
   dt = 1;
    t += 0.01;
   
  rtext.innerText='Παύση';
  }
    else{
   dt = 0;
   rtext.innerText='Εκκίνηση';
  }

});
let ampSlider = document.getElementById("amp");
let atext = document.getElementById("ampText");
ampSlider.addEventListener("input", function () {
  amp=10*ampSlider.value;
     atext.innerText = "Πλάτος: " + ampSlider.value + 'm';
});
let fSlider = document.getElementById("f");
let ft = document.getElementById("fText");
fSlider.addEventListener("input", function () {
  
     ft.innerText = "Συχνότητα: " + fSlider.value + 'hz';
     w=2*Math.PI*fSlider.value;
});
let phaseSlider = document.getElementById("phaseSlider");
let phaseText = document.getElementById("phaseText");
phaseSlider.addEventListener("input", function () {
    phtext=1*phaseSlider.value;
    let num = 1*phaseSlider.value/Math.PI;
    phaseText.innerText = "Αρχική φάση: " + formatPi(num.toFixed(2)) + " rad";
     f0=phtext;
     x1input.value = num.toFixed(1)*10;
});
let x2input =document.getElementById("x2");
x2input.addEventListener("input", function () {
  limit = Math.asin(Math.abs(x2)/amp);  
  x2 = x2input.value*10;
    
    print(limit);
     
});
let x1input =document.getElementById("x1");
x1input.addEventListener("input", function () {
    x1 = x1input.value*10;
    f0 = Math.asin(x1/amp)*1;

    phaseSlider.value=f0;
    let num1 = 1*phaseSlider.value/Math.PI;
    phaseText.innerText = "Αρχική φάση: " + formatPi(num1.toFixed(2)) + " rad";
   
});
let open = false;

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("tool-header");
  const body = document.getElementById("tool-body");
  body.style.display = "none";
  header.onclick = () => {
    open = !open;
    body.style.display = open ? "block" : "none";
  };

 const panel1 = document.getElementById("tool-window");
  const header1 = document.getElementById("tool-header");

  // start closed properly
  panel1.classList.add("closed");

header1.onclick = () => {
  panel1.classList.toggle("closed");

  const body = document.getElementById("tool-body");
  body.style.display = panel1.classList.contains("closed")
    ? "none"
    : "flex";
};
});

function getMobileCanvasHeight() {
    let banner = document.querySelector('.banner');
    let panel = document.querySelector('.control-panel');

    let bannerH = banner ? banner.offsetHeight : 0;
    let panelH = panel ? panel.offsetHeight : 0;

    let available = windowHeight - bannerH - panelH + 10;
    return max(available, 150);
}

function getMobileCanvasWidth() {
  let container = document.getElementById('sketch-container');
  return container ? container.clientWidth : windowWidth;
}
