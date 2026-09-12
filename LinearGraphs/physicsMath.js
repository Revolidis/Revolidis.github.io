function time_Handler(x,y) {
    
    let substeps = 1000;

    for (let i = 0; i < substeps; i++) {

        t += (deltaTime / 1000 * dt) / substeps;


        if (t >= Math.abs( float(T))) {

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
function getXBounds() {
    let candidates = [0, f * T + 0.5 * amp * T ** 2]; // x(0) and x(T)
    let tStar = (amp !== 0) ? -f / amp : null; // time of the vertex (turning point)
    if (tStar !== null && tStar >= 0 && tStar <= T) {
        candidates.push(-0.5 * f ** 2 / amp); // x at the vertex, if it falls within [0, T]
    }
    return {
        min: Math.min(...candidates),
        max: Math.max(...candidates)
    };
}
function getUBounds() {
    if (amp!=0){
    candidates = [f, f + amp * T];}
    else{ candidates = [f+3, f-3];} // u(0) and u(T) — linear in t, no interior turning point
    return {
        min: Math.min(...candidates),
        max: Math.max(...candidates)
    };
}
function Projectile(p) {
    circle(p.x, p.y, 30);

    myChart.options.scales.x.max = Math.ceil(T);
    myChart.options.scales.y.max = Math.ceil(6);
     myChart.options.scales.y.min = Math.ceil(-6);

    myChart.data.datasets[0].data.push({
        x: t,
        y: amp
    });

    myChart.update('none');

      uChart.options.scales.x.max = Math.ceil(T);
    let uBounds = getUBounds();
    uChart.options.scales.y.max = Math.ceil(uBounds.max);
    uChart.options.scales.y.min = Math.floor(uBounds.min);

    uChart.data.datasets[0].data.push({
        x: t,
        y: f0+amp*t 
    });

    uChart.update('none');


    xChart.options.scales.x.max = Math.ceil(T);
    let xBounds = getXBounds();
    xChart.options.scales.y.max = Math.ceil(xBounds.max);
    xChart.options.scales.y.min = Math.floor(xBounds.min);

    xChart.data.datasets[0].data.push({
        x: t,
        y: f*t + 1/2*amp*t**2
    });

    xChart.update('none');
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
