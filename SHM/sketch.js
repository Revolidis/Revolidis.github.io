/* eslint-disable no-unused-vars */

function setup() {
  let w, h;
  if (windowWidth <= 700) {
    w = getMobileCanvasWidth();
    h = getMobileCanvasHeight();
  } else {
    w = 0.75 * windowWidth;
    h = windowHeight;
  }
  let canvas = createCanvas(w, h);
  canvas.parent("sketch-container")
  x0=toScreen(200,0);
}

if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    windowResized();
  });
  
}

function draw() {
  background(144, 190, 109);
  p= math_Handler();
    drawAxes()
  drawXTicks()
  drawYTicks()
  drawGrid()
  Body_Spring(x0.x,p);
  
  if(rotcheck==true){
    
  Rotating_Vector(p);}
   if(sinCheck==true){
  trigDraw(p);}



}
function windowResized(){
  if (windowWidth <= 700) {
    let w = getMobileCanvasWidth();
    let h = getMobileCanvasHeight();
    resizeCanvas(w, h);
  } else {
    resizeCanvas(0.75*windowWidth, windowHeight);
  }
}
