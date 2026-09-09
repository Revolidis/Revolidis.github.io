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

function Projectile(p) {
    circle(p.x, p.y, 30);

    chart.options.scales.x.max = Math.ceil(2 * amp + Math.PI / 2);
    chart.options.scales.y.max = Math.ceil(2 * amp);

    chart.update('none');

    chart.data.datasets[0].data.push({
        x: p.x,
        y: p.y
    });

    chart.update('none');
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
