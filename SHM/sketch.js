/* eslint-disable no-unused-vars */

function setup() {
  let canvas = createCanvas(0.75*windowWidth,windowHeight)
  canvas.parent("sketch-container")
  
}


function draw() {
  background(144, 190, 109);
  p= math_Handler();
    drawAxes()
  drawXTicks()
  drawYTicks()
  drawGrid()
  Body_Spring(p);
  
  if(rotcheck==true){
    
  Rotating_Vector(p);}
   if(sinCheck==true){
  trigDraw(p);}



}
function windowResized(){
  resizeCanvas(0.75*windowWidth,windowHeight);
}

