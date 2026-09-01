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