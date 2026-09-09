function drawArrow(x1, y1, x2, y2, col) {
  push();
  strokeWeight(2);
  stroke(col);

  line(x1, y1, x2, y2);

  let angle = atan2(y2 - y1, x2 - x1);


  translate(x2, y2);
  rotate(angle);

  line(0, 0, -10, 5);
  line(0, 0, -10, -5);

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

function drawFloorFade(x1,y1,p,invert) {
  push();
  stroke(80);
  strokeWeight(2);
  a=toScreen(x1,y1)
  b=toScreen(x1+p,y1)
  c=toScreen(x1-p,y1)
  let n=14;
  line(a.x, a.y, b.x, b.y);
  line(a.x, a.y, c.x, c.y);
  if(invert=true){
  for (let i = 0; i <= (p/n); i++) {
  a=toScreen(n*i+x1,y1)
  b=toScreen(x1+10+n*i,(y1+10))
  c=toScreen(-n*i+x1,y1)
  d=toScreen(x1+10-n*i,(y1+10))
  line(a.x, a.y, b.x, b.y);
  line(c.x, c.y, d.x, d.y);}}
  else{
      for (let i = 0; i <= (p/n); i++) {
  a=toScreen(n*i+x1,y1)
  b=toScreen(x1+p/n+n*i,(y1-(p/n)))
  c=toScreen(-n*i+x1,y1)
  d=toScreen(x1+p/n-n*i,(y1-(p/n)))
  line(a.x, a.y, b.x, b.y);
  line(c.x, c.y, d.x, d.y);}
  }
  pop();
}

function fDraw(c) {
    push();

    let graphW = 1;

    drawingContext.setLineDash([5, 10]);
    stroke(0, 114, 184);
    strokeWeight(2);
    noFill();

    beginShape();

    let f = Math.abs(fSlider.value);
    let T = 1 / f;
    if (f!=0){
    for (let tau = 0; tau <= T; tau += 0.01) {

        let p = toScreen(
            amp *10 * Math.sin(2 * Math.PI * f * tau + Math.PI / 2) * graphW,
            amp  *10* Math.cos(2 * Math.PI * f * tau + Math.PI / 2)
        );

        vertex(p.x, p.y);
    }

    endShape();
  }
    pop();
}
function drawX(p, label) {
    push();
    a = toScreen(0, 0);
    if(p.x!=a.x){


    // Horizontal x-axis arrow at the particle's height
    drawArrow(
        a.x,
        p.y-30,
        p.x,
        p.y-30,
        color(0, 114, 184)
    );
 
push();
    fill(color(0,114,184));
    textSize(20);
    text(label, (a.x + p.x) / 2, (a.y-35) );
pop();}
   } 
function drawY(p,label){
    push();
    a=toScreen(0,0);
    drawArrow(a.x-10,a.y,a.x-10,p.y+amp*scale,color(0,114,184));
  
    pop();
    push();
     drawingContext.setLineDash([5, 10]);
    line(a.x-10,p.y+amp*scale,p.x,p.y+amp*scale);
    fill(color(0,114,184));
    textSize(20);
    text(label, (a.x-30 + a.x-30) / 2, (a.y + p.y+amp*scale+10) / 2 - 10);
    pop()
}
function drawOmega(p,label){
    push();
    a=toScreen(0,0);
    fill(255);
    circle(a.x, a.y, 2 * r + 4);
       textSize(20);
                fill(color(243, 114, 44));
    if (f>0){
    text("ω", a.x+5, a.y-10);
    text("⊙", a.x-10, a.y+5.5);
           textSize(40);

    }
    else{
            text("ω", a.x+5, a.y-10);
    text("⊗", a.x-10, a.y+5.5);
           textSize(40);
    }
    pop();
    push();
}
function drawD(p,label){
    push();
    stroke(color(0,114,184));
    a=toScreen(0,0);
    line(a.x,a.y,p.x,p.y);
    fill(color(0,114,184));
    textSize(20);
    text(label, (a.x + p.x) / (2), (a.y + p.y) / (2) );
    pop();
}
function drawU(p, label) {
    A = w < 0 ? -1 : 1;

    // Arrow start
    let startX = p.x;
    let startY = p.y;

    // Arrow endpoint
    let endX = p.x + u;
    let endY = p.y;
             

    // Arrow direction
    let dx = endX - startX;
    let dy = endY - startY;

    let len = Math.sqrt(dx * dx + dy * dy);

    if (len < 1) return;

    // Unit vector along arrow
    let ex = dx / len;
    let ey = dy / len;

    // Unit vector perpendicular to arrow
    let nx = -ey;
    let ny = ex;

    // Make sure label is on the desired side
    nx *= A;
    ny *= A;

    // Fixed distance from arrow tip
    let offset = 18;

    // Label position
    let labelX = endX + nx * offset;
    let labelY = endY + ny * offset;

    // Draw arrow
    push();

    drawArrow(
        startX,
        startY,
        endX,
        endY,
        color(243, 114, 44)
    );

    pop();

    // Draw label
    push();

    fill(color(243, 114, 44));
    textSize(20);
    textAlign(CENTER, CENTER);

    text(label, labelX, labelY);

    pop();
}
function drawA(p, label) {
   A = w < 0 ? -1 : 1;

    // Arrow start
    let startX = p.x;
    let startY = p.y-50;

    // Arrow endpoint
    let endX = p.x + amp*20;
    let endY = p.y-50;
             

    // Arrow direction
    let dx = endX - startX;
    let dy = endY - startY;

    let len = Math.sqrt(dx * dx + dy * dy);

    if (len < 1) return;
print('a1');
    // Unit vector along arrow
    let ex = dx / len;
    let ey = dy / len;

    // Unit vector perpendicular to arrow
    let nx = -ey;
    let ny = ex;

    // Make sure label is on the desired side
    nx *= A;
    ny *= A;

    // Fixed distance from arrow tip
    let offset = -18;

    // Label position
    let labelX = endX + nx * offset;
    let labelY = endY + ny * offset;

    // Draw arrow
    push();

    drawArrow(
        startX,
        startY,
        endX,
        endY,
        color(243, 114, 44)
    );

    pop();

    // Draw label
    push();

    fill(color(243, 114, 44));
    textSize(20);
    textAlign(CENTER, CENTER);

    text(label, labelX, labelY);

    pop();
}
function frontView(x){
let floorY = amp * 10 + 50;
//offsetY=-150;
c = toScreen(x, floorY);

Projectile(c);

drawX(c, 'x');

drawFloorFade(
    0,
    floorY+5,
    amp * 10 + 30,
    false
);
    if (ucheck) {

        let y0 = floorY;
        let arrowLength = 50 * Math.abs(f);

        a = toScreen(0, y0);
        b = toScreen(
            0,
            y0 - Math.sign(f) * arrowLength
        );

        push();

        drawArrow(
            a.x,
            a.y,
            b.x,
            b.y,
            color(243, 114, 44)
        );

        fill(color(243, 114, 44));
        textSize(20);
        textAlign(RIGHT, CENTER);

        text(
            "ω",
            a.x - 15,
            (a.y + b.y) / 2
        );

        pop();
    }
}
    

