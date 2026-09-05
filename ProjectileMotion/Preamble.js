var x = 0;
var t = 0;
let y = 0;
let f0=0;
let scale = 3; // pixels per unit
let amp=50;
let u0=10;
let r =5;
T = Math.sqrt((amp-r)/(50));
let simSpeed = 1;   // user-controlled speed
let dt = 0; 
let checkD=false;
let running =0;
let substeps=0;
let rotcheck = true;
let sinCheck = false;
let xcheck = false;
let ucheck = false;
let ucheck1 = false;
let arel;
let p1;
let offsetX =-400;
let offsetY =-280;
let dragging = false;
let lastX;
let lastY;
let A;
document.getElementById("rotCheck").addEventListener("change", function() {
    rotcheck = this.checked;
   
});
document.getElementById("dCheck").addEventListener("change", function() {
    checkD = this.checked;
   
});
document.getElementById("xCheck").addEventListener("change", function() {
    xcheck = this.checked;
   
});
document.getElementById("uCheck").addEventListener("change", function() {
    ucheck = this.checked;
   
});
document.getElementById("uCheck1").addEventListener("change", function() {
    ucheck1 = this.checked;
   
});
document.getElementById("sinCheck").addEventListener("change", function() {
    sinCheck = this.checked;
     if (sinCheck==false){
   document.getElementById("myChart").style.display = "none";
    }
else{document.getElementById("myChart").style.display = "flex";
}
});
const container = document.getElementById("sketch-container");

container.addEventListener("mousedown", (e) => {
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

container.addEventListener(
    "wheel",
    (e) => {
        e.preventDefault();

        let rect = container.getBoundingClientRect();

        let mx = e.clientX - rect.left;
        let my = e.clientY - rect.top;

        let worldX = (mx - width / 2 - offsetX) / scale;
        let worldY = (my - height / 2 - offsetY) / scale;

        if (e.deltaY > 0) {
            scale *= 0.9;
        } else {
            scale *= 1.1;
        }

        scale = Math.max(0.2, Math.min(500, scale));

        offsetX = mx - width / 2 - worldX * scale;
        offsetY = my - height / 2 - worldY * scale;

        a = toScreen(amp, 0);
        T = Math.sqrt((amp-r)/(50));
    },
    { passive: false }
);

// ---- Touch support (mobile): one-finger pan, two-finger pinch-to-zoom ----
let lastTouchDist = null;

function getTouchDist(touches) {
  let dx = touches[0].clientX - touches[1].clientX;
  let dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

container.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    // one finger = pan, mirrors mousedown
    dragging = true;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
  } else if (e.touches.length === 2) {
    // two fingers = pinch to zoom, stop panning while pinching
    dragging = false;
    lastTouchDist = getTouchDist(e.touches);
  }
}, { passive: false });

container.addEventListener("touchmove", (e) => {
  e.preventDefault(); // stop the page itself from scrolling/zooming during interaction

  if (e.touches.length === 1 && dragging) {
    // mirrors mousemove
    let dx = e.touches[0].clientX - lastX;
    let dy = e.touches[0].clientY - lastY;
    offsetX += dx;
    offsetY += dy;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
  } else if (e.touches.length === 2) {
    // mirrors the wheel handler's zoom-toward-cursor math, centered on the pinch midpoint
    let newDist = getTouchDist(e.touches);
    if (lastTouchDist) {
      let rect = container.getBoundingClientRect();
      let midX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
      let midY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;

      let worldX = (midX - width / 2 - offsetX) / scale;
      let worldY = (midY - height / 2 - offsetY) / scale;

      scale *= newDist / lastTouchDist;
      scale = Math.max(0.2, Math.min(500, scale));

      offsetX = midX - width / 2 - worldX * scale;
      offsetY = midY - height / 2 - worldY * scale;

      a = toScreen(amp, 0);
      T = Math.sqrt((amp-r)/(50));
    }
    lastTouchDist = newDist;
  }
}, { passive: false });

container.addEventListener("touchend", () => {
  dragging = false;
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
  t=0;
  chart.data.datasets[0].data = [];
  uchart.data.datasets[0].data = [];
   T = Math.sqrt((amp-r)/(50));
     atext.innerText = "Πλάτος: " + ampSlider.value + 'm';
});
let fSlider = document.getElementById("f");
let ft = document.getElementById("fText");
fSlider.addEventListener("input", function () {
      t=0;
      uchart.data.datasets[0].data = [];
      chart.data.datasets[0].data = [];
     ft.innerText = "Αρχική ταχύτητα: " + fSlider.value + 'm/s';
     u0=10*fSlider.value;
     T = Math.sqrt((amp-r)/(50));
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
