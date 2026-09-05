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
