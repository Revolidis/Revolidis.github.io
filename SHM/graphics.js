function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
function drawSpring(x1, y1, x2, y2, coils, amplitude) {
  push();
  noFill();
  stroke(0);
  strokeWeight(2);
  a=toScreen(x1,y1);
  b=toScreen(x2,y2);
  // Direction vector
  let dx = b.x - a.x;
  let dy = a.y - b.y;
  
  // Length of spring
  let len = sqrt(dx * dx + dy * dy);
  // Unit direction vector
  let ux = dx / len;
  let uy = dy / len;
  // Perpendicular vector
  let px = -uy;
  let py = ux;
  beginShape();
  for (let i = 0; i <= 200; i++) {
    let t = i / 200;
    // Point along main axis
    let bx = lerp(a.x, b.x, t);
    let by = lerp(a.y, y2, t);
    // Sinusoidal offset
    let offset = sin(t * TWO_PI * coils) * amplitude;
    // Apply perpendicular displacement
    let x = bx + px * offset;
    let y = by + py * offset;
    vertex(x, y);
  }
  endShape();
  pop();
}
function drawFloorFade(x1,y1,p) {
  push();
  stroke(80);
  strokeWeight(2);
  a=toScreen(x1,y1)
  b=toScreen(x1+p,y1)
  c=toScreen(x1-p,y1)
  let n=6;
  line(a.x, a.y, b.x, b.y);
  line(a.x, a.y, c.x, c.y);
  for (let i = 0; i <= (p/n); i++) {
  a=toScreen(n*i+x1,y1)
  b=toScreen(x1+p/n+n*i,y1-(p/n))
  c=toScreen(-n*i+x1,y1)
  d=toScreen(x1+p/n-n*i,y1-(p/n))
  line(a.x, a.y, b.x, b.y);
  line(c.x, c.y, d.x, d.y);
}
  
  pop();
}


function drawAxes() {
 push()
    stroke(1);
  strokeWeight(2);
  let left  = toScreen(-40*width / (80 * scale), 0);
  let right = toScreen(40*width / (80 * scale), 0);
  line(left.x, left.y, right.x, right.y);
  let top    = toScreen(0, 40*height / (80 * scale));
  let bottom = toScreen(0, -40*height / (80 * scale));
  line(top.x, top.y, bottom.x, bottom.y);
pop()
}
let offsetX = 0; // pan in screen pixels
let offsetY = 0;
function toScreen(x, y) {
  return {
    x: width / 2 + offsetX + x * scale,
    y: height / 2 + offsetY + y * scale
  };
}
function drawGrid() {
  push();
  strokeWeight(1);
  stroke(150);
  let left   = Math.floor(-width / ( scale));
  let right  = Math.ceil(width / ( scale));
  let bottom = Math.floor(-height / ( scale));
  let top    = Math.ceil(height / ( scale));
  for (let x = left; x <= right; x++) {
    let a = toScreen(x*50, bottom);
    let b = toScreen(x*50, top);
    line(a.x, a.y, b.x, b.y);
  }
  for (let y = bottom; y <= top; y++) {
    let a = toScreen(left, y*50);
    let b = toScreen(right, y*50);
    line(a.x, a.y, b.x, b.y);
  }
  pop();
}
function getTickStep() {
    const targetPixels = 80;
    let raw = targetPixels / scale;
    let power = Math.pow(10, Math.floor(Math.log10(raw)));
    let normalized = raw / power;
    if (normalized < 1.5) return power;
    if (normalized < 3)   return 2 * power;
    if (normalized < 7)   return 5 * power;
    return 10 * power;
}
function drawXTicks() {
  push();
  stroke(0);
  fill(0);
  textSize(12);
  textAlign(CENTER, TOP);
  let tickStep = getTickStep();
  let left  = Math.floor(-width / (2 * scale));
  let right = Math.ceil(width / (2 * scale));
  for (
    let x = Math.ceil(left / tickStep) * tickStep;
    x <= right;
    x += tickStep
  ) {
    if (x !== 0) drawXTick(x);
  }
  pop();
}
function drawXTick(x) {
  let p = toScreen(x, 0);
  stroke(0);
  line(p.x, p.y , p.x, p.y );
  noStroke();
  text(x/10, p.x, p.y );
}
function drawYTicks() {
  push();
  stroke(0);
  fill(0);
  textSize(12);
  textAlign(LEFT, CENTER);
  let tickStep = getTickStep();
  let bottom = Math.floor(-height / (2 * scale));
  let top    = Math.ceil(height / (2 * scale));
  for (
    let y = Math.ceil(bottom / tickStep) * tickStep;
    y <= top;
    y += tickStep
  ) {
    if (y !== 0) drawYTick(y);
  }
  pop();
}
function drawYTick(y) {
  let p = toScreen(0, y);
  stroke(0);
  line(p.x , p.y, p.x , p.y);
  noStroke();
  text(-y/10, p.x , p.y);
}


function math_Handler(){
substeps =1000;
 for (i = 0; i < substeps; i++) {
    t += (deltaTime / 1000 * dt) / substeps;
    let theta = w * t;
    let x = amp * Math.sin(theta + f0 + Math.PI/2);
    let y = amp * Math.cos(theta + f0 + Math.PI/2);
    
    if (
        (Math.abs(x2 + y) <= 0.005) &&
        (Math.abs(x2 + yprev) <= 0.005)
    ) {
        running = false;
        dt = 0;
        simSpeed = 0;
        rtext.innerText='Εκκίνηση';
        break;
        
    }
    yprev = y;
}
 let p = toScreen(
    amp * Math.sin(w * t + f0 + Math.PI/2),
    amp * Math.cos(w * t + f0 + Math.PI/2)
 );
 return p;
}
function Rotating_Vector(p){
push()
fill( '#0072B8');
arc(width/2, height/2, amp-20, amp-20, -(w*t+f0),-(Math.asin(x1/amp)));
pop()
circle(p.x, p.y, 20);
 let origin = toScreen(0, 0);
  line(width/2, height/2, p.x,p.y);
  let xt = amp*Math.sin(f0+Math.PI/2);
let yt = amp*Math.cos(f0+Math.PI/2);
arel = toScreen(xt, yt);
  if (arel != null && sinCheck==false) {
    // myVar is not null and not undefined
   circle(arel.x, arel.y, 20);
 
  line(origin.x,origin.y, arel.x,arel.y);}
      //let v0 = createVector(width/2-130, windowHeight/2);
      //  let v00 = createVector(width/2, windowHeight/2+130);
  //let v1 = createVector(260, 0);
    //let v2 = createVector(0, -260);
  //drawArrow(v0, v1, '#0072B8');
  //drawArrow(v00, v2, '#0072B8');
}
function Body_Spring (p){
   ellipse(width/2+scale*200, p.y, 20);
   drawFloorFade(200,-150,55);
  drawingContext.setLineDash([5, 15]);
  if(rotcheck==true){
  line(p.x, p.y, width/2+scale*200, p.y);}
    if(sinCheck==true&& p1!=null&&rotcheck==false){
  line(p1.x, p.y, width/2+scale*200, p.y);}
  drawingContext.setLineDash([0, 0]);
  drawSpring(200,-150, 200, p.y, 5, 12);
}
function formatPi(num) {
  if (num === 0) return "0";
  // convert to fraction of π
  let n = num;
  // simplify common cases
  if (n === 1) return "π";
  if (n === 0.5) return "π/2";
  if (n === 1.5) return "3π/2";
  if (n === 2) return "2π";
  return `${n}π`;
}
function trigDraw() {
  push();
  let T = 2 * Math.PI / w;
  let phaseTime = t % 2*T;
  let graphW = 60;
  let cycleTime = t % (2 * T);
for (let tau = 0; tau < cycleTime; tau += 0.01) {
     p1 = toScreen(
        (tau / T) * graphW,
        -amp * Math.sin(w * tau + f0)
    );
    let p2 = toScreen(
        ((tau + 0.01) / T) * graphW,
        -amp * Math.sin(w * (tau + 0.01) + f0)
    );
    line(p1.x, p1.y, p2.x, p2.y);
}
  pop();
}
