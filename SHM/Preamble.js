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
  limit = Math.asin((Math.absx2)/amp);  
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


