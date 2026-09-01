function math_Handler() {

    let substeps = 1000;

    for (let i = 0; i < substeps; i++) {

        t += (deltaTime / 1000 * dt) / substeps;

        let x = 10 * u0 * t;
        let y = 50 * Math.pow(t, 2);

        if (t >= T) {

            t = T;

            running = false;
            dt = 0;
            simSpeed = 0;
            rtext.innerText = 'Εκκίνηση';

            break;
        }
    }

    let x = 10 * u0 * t;
    let y = 50 * Math.pow(t, 2);

    let p = toScreen(
        x,
        y - amp
    );

    return p;
}

function Projectile (p){
   circle(p.x, p.y+scale*amp, scale*10);
  chart.options.scales.x.max = Math.ceil((u0*T/10));
chart.options.scales.y.max =Math.ceil((amp/10));


chart.update('none');
   drawFloorFade((5*u0*T+20),amp,(5*u0*T+20),false)
    chart.data.datasets[0].data.push({
        x: 0.1 * u0 * t,
        y: 5*Math.pow(t,2)
    });

    chart.update('none');


}
function drawX(p,label){
    push();
    a=toScreen(0,0);
    drawArrow(a.x,a.y-10,p.x,a.y-10,color(0,114,184));
     
    pop();
    push();
     drawingContext.setLineDash([5, 10]);
    line(p.x,a.y-10,p.x,p.y+amp*scale);
    fill(color(0,114,184));
    textSize(20);
    text(label, (a.x + p.x) / 2, (a.y-50 + a.y) / 2 );
 
    pop()
   
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

function drawuY(p,label){
    push();
    a=toScreen(0,0);
    drawArrow(p.x,p.y+amp*scale,p.x,p.y+(amp+20*t)*scale,color(243, 114, 44));
    a=toScreen(5,amp+20*t)
    pop();
    push();
      
    fill(color(243, 114, 44));
    textSize(20);
    text(label, (p.x -(30)), (p.y+(amp+20*t+5)*scale));
    pop()
}

function drawuX(p,label){
    push();
    a=toScreen(0,0);
    drawArrow(p.x,p.y+amp*scale,p.x+(2*u0)*scale,p.y+amp*scale,color(243, 114, 44));
  
    pop();
    push();
      
    fill(color(243, 114, 44));
    textSize(20);
    text(label, (p.x+(2*u0)*scale), (p.y+(amp-2.5)*scale));
    pop()
}
function drawD(p,label){
    push();
    stroke(color(0,114,184));
    a=toScreen(0,0);
    line(a.x,a.y,p.x,p.y+amp*scale);
    fill(color(0,114,184));
    textSize(20);
    text(label, (a.x + p.x) / 2, (a.y + p.y+amp*scale) / 2 - 10);
    pop();
}
function drawU(p,label){
    push();
    a=toScreen(0,0);
    drawArrow(p.x,p.y+amp*scale,p.x+(2*u0)*scale,p.y+(amp+20*t)*scale,color(243, 114, 44));
  
    pop();
    push();
      
    fill(color(243, 114, 44));
    textSize(20);
    text(label, (p.x+2*u0*scale+5), (p.y+(amp+20*t-2.5)*scale+5));
    pop()
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
