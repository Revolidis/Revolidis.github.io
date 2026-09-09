
function drawAxes() {
 push()
    stroke(1);
  strokeWeight(2);

  let left  = toScreen(-40*width +offsetX*scale/ (80 * scale), 0);
  let right = toScreen(40*width +offsetX*scale/ (80 * scale), 0);
  line(left.x, left.y, right.x, right.y);

  let top    = toScreen(0, 40*height+offsetY*scale / (80 * scale));
  let bottom = toScreen(0, -40*height+offsetY*scale / (80 * scale));
  line(top.x, top.y, bottom.x, bottom.y);
pop()
}





function toScreen(x, y) {
  return {
    x: width / 2 + x * scale+offsetX,
    y: height / 2 + y * scale+offsetY
  };
}
function drawGrid() {
  push();
  strokeWeight(1);
  stroke(150);
  let gridStep = getTickStep();
let left   = Math.floor((-width/2  - offsetX) / scale / gridStep);
let right  = Math.ceil( (width/2   - offsetX) / scale / gridStep);

let bottom = Math.floor((-height/2 - offsetY) / scale / gridStep);
let top    = Math.ceil( (height/2  - offsetY) / scale / gridStep);

for (let x = left; x <= right; x++) {
    let a = toScreen(x * gridStep, bottom * gridStep);
    let b = toScreen(x * gridStep, top * gridStep);
    line(a.x, a.y, b.x, b.y);
}

for (let y = bottom; y <= top; y++) {
    let a = toScreen(left * gridStep, y * gridStep);
    let b = toScreen(right * gridStep, y * gridStep);
    line(a.x, a.y, b.x, b.y);
}
  pop();
}
function getTickStep() {
    const targetPixels = 60;

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

    let left  = (-width / 2 - offsetX) / scale;
    let right = ( width / 2 - offsetX) / scale;

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
    line(p.x, p.y - 4, p.x, p.y + 4);

    noStroke();
    text(x / 10, p.x, p.y + 6);
}

function drawYTicks() {
    push();

    stroke(0);
    fill(0);
    textSize(12);
    textAlign(LEFT, CENTER);

    let tickStep = getTickStep();

    let bottom = (-height / 2 - offsetY) / scale;
    let top    = ( height / 2 - offsetY) / scale;

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
    //line(-p.x - 4, p.y, p.x + 4, p.y);

    noStroke();
    text(y / 10, p.x + 6, p.y);
}