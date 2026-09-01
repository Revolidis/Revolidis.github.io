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