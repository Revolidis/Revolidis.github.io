function time_Handler(x,y) {
    
    let substeps = 1000;

    for (let i = 0; i < substeps; i++) {

        t += (deltaTime / 1000 * dt) / substeps;


        if (t >= Math.abs(T)&& xcheck == false) {

           //t = T;

            running = false;
            dt = 0;
            simSpeed = 0;
            rtext.innerText = 'Εκκίνηση';

            break;
        }
    }

}
function math_Handler(x,y) {

    //let x = 10*amp*Math.sin(2*Math.PI*fSlider.value*t+Math.PI/2);
    //let y = 10*amp*Math.cos(2*Math.PI*fSlider.value*t+Math.PI/2);

    let p = toScreen(
        x,
        y 
    );

    return p;
}

function Projectile(p) {
    circle(p.x, p.y, scale * 10);

    chart.options.scales.x.max = Math.ceil(2 * amp + Math.PI / 2);
    chart.options.scales.y.max = Math.ceil(2 * amp);

    chart.update('none');

    chart.data.datasets[0].data.push({
        x: p.x,
        y: p.y
    });

    chart.update('none');
}
function drawX(p, label) {
    push();

    a = toScreen(0, 0);

    // Horizontal x-axis arrow at the particle's height
    drawArrow(
        a.x,
        p.y,
        p.x,
        p.y,
        color(0, 114, 184)
    );

    pop();

    push();

    drawingContext.setLineDash([5, 10]);

    // Vertical projection
    line(p.x, y * scale, p.x, p.y);

    fill(color(0, 114, 184));
    textSize(20);

    text(
        label,
        (p.x + a.x) / 2,
        p.y - 20
    );

    pop();
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
    let endX = p.x + A * (-2 * w * T * Math.sin(w * t)) * scale;
    let endY = p.y
             + A * (-2 * w * T * Math.cos(w * t)) * scale;

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
    let startY = p.y;

    // Arrow endpoint
    let endX = p.x + A * (-2 * w * T * Math.cos(w * t)) * scale;
    let endY = p.y
             + A * (2 * w * T * Math.sin(w * t)) * scale;

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
