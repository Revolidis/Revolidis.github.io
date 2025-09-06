// projectile simulation script.js
// requires Chart.js included in HTML

// Canvas
const canvas = document.getElementById('projCanvas');
const ctx = canvas.getContext('2d');

// Controls & inputs
const v0Slider = document.getElementById('v0Slider');
const v0Input = document.getElementById('v0Input');
const angleSlider = document.getElementById('angleSlider');
const angleInput = document.getElementById('angleInput');
const gSlider = document.getElementById('gSlider');
const gInput = document.getElementById('gInput');
const y0Slider = document.getElementById('y0Slider');
const y0Input = document.getElementById('y0Input');

const startPauseBtn = document.getElementById('startPauseBtn');

const toggleXT = document.getElementById('toggleXT');
const toggleYT = document.getElementById('toggleYT');
const toggleYX = document.getElementById('toggleYX');

const posContainer = document.getElementById('positionChartContainer');
const heightContainer = document.getElementById('heightChartContainer');
const trajContainer = document.getElementById('trajectoryChartContainer');

// Realtime display
const xValue = document.getElementById('xValue');
const yValue = document.getElementById('yValue');
const vxValue = document.getElementById('vxValue');
const vyValue = document.getElementById('vyValue');
const tValue = document.getElementById('tValue');

// Parameters (defaults)
let v0 = parseFloat(v0Input.value);
let angleDeg = parseFloat(angleInput.value);
let g = parseFloat(gInput.value);
let y0 = parseFloat(y0Input.value);

// Simulation state
let time = 0;
let dt = 0;
let savedDt = dt;
let running = false;
let maxPoints = 5000;

// Data arrays for charts
let timeData = [];
let xData = [];
let yData = [];
let vxData = [];
let vyData = [];

// Canvas simulation state
let x = 0, y = 0, vx = 0, vy = 0;

// helpers - link sliders + number inputs
function linkInput(slider, input, onChange) {
  slider.addEventListener('input', () => {
    input.value = slider.value;
    onChange(parseFloat(slider.value));
  });
  input.addEventListener('input', () => {
    slider.value = input.value;
    onChange(parseFloat(input.value));
  });
}

function updateV0(v){ v0 = v; resetSim(); }
function updateAngle(a){ angleDeg = a; resetSim(); }
function updateG(val){ g = val; resetSim(); }
function updateY0(val){ y0 = val; resetSim(); }

linkInput(v0Slider, v0Input, updateV0);
linkInput(angleSlider, angleInput, updateAngle);
linkInput(gSlider, gInput, updateG);
linkInput(y0Slider, y0Input, updateY0);

// charts (Chart.js)
function createChart(ctxEl, xLabel, yLabel, color){
  return new Chart(ctxEl, {
    type: 'line',
    data: { datasets: [{ label: yLabel, data: [], borderColor: color, borderWidth: 2, pointRadius: 0, fill:false }]},
    options: {
      animation:false,
      parsing: false,
      normalized: true,
      scales: {
        x: { type:'linear', title: { display:true, text: xLabel } },
        y: { title: { display:true, text: yLabel } }
      },
      plugins:{legend:{display:false}}
    }
  });
}

const xChart = createChart(document.getElementById('xChart'), 'Time (s)', 'x (m)', '#00ffcc');
const yChart = createChart(document.getElementById('yChart'), 'Time (s)', 'y (m)', '#ffcc00');
const yxChart = createChart(document.getElementById('yxChart'), 'x (m)', 'y (m)', '#ff0066');

// Start/pause toggling by setting dt
startPauseBtn.addEventListener('click', () => {
  if (dt !== 0) {
    savedDt = dt;
    dt = 0;
    startPauseBtn.textContent = 'Έναρξη';
    running = false;
  } else {
    dt = savedDt;
    startPauseBtn.textContent = 'Παύση';
    running = true;
    dt=0.02;
  }
});

// Chart toggles (fade in/out)
function toggleContainer(btn, container) {
  btn.addEventListener('click', () => {
    if (container.style.display === 'block') {
      container.style.opacity = 0;
      setTimeout(()=>{ container.style.display='none'; container.setAttribute('aria-hidden','true'); }, 320);
    } else {
      container.style.display = 'block';
      container.setAttribute('aria-hidden','false');
      container.style.opacity = 0;
      setTimeout(()=> container.style.opacity = 1, 10);
    }
  });
}
toggleContainer(toggleXT, posContainer);
toggleContainer(toggleYT, heightContainer);
//toggleContainer(toggleYX, trajContainer);

// compute flight time (solve for y(t) = 0)
// returns >0 flight time or a fallback
function computeFlightTime(v0, angleRad, y0, g) {
  const vy0 = v0 * Math.sin(angleRad);
  // 0 = y0 + vy0*t - 0.5*g*t^2  -> 0.5*g*t^2 - vy0*t - y0 = 0
  const a = 0.5 * g;
  const b = -vy0;
  const c = -y0;
  const disc = b*b - 4*a*c;
  if (disc < 0) return (vy0>0)? (2*vy0/g) : 5; // fallback
  const t1 = (-b + Math.sqrt(disc)) / (2*a);
  const t2 = (-b - Math.sqrt(disc)) / (2*a);
  const tmax = Math.max(t1, t2);
  if (tmax <= 0) return (vy0>0)? (2*vy0/g) : 5;
  return tmax;
}

// reset everything
function resetSim(){
  time = 0;
  timeData = [];
  xData = [];
  yData = [];
  vxData = [];
  vyData = [];
  // compute initial velocities
  const ang = angleDeg * Math.PI/180;
  vx = v0 * Math.cos(ang);
  vy = v0 * Math.sin(ang);
  x = 0;
  y = y0;
  // reset charts
  xChart.data.datasets[0].data = [];
  yChart.data.datasets[0].data = [];
  yxChart.data.datasets[0].data = [];
  xChart.update();
  yChart.update();
  yxChart.update();
}

// initialize
resetSim();

// main draw loop
function draw(){
  // clear
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // draw ground line
  ctx.fillStyle = '#ffffff';
 // ctx.fillRect(0, 300, canvas.width, 1);

  // compute scale to fit expected range/time
  const ang = angleDeg * Math.PI/180;
  const tFlight = computeFlightTime(v0, ang, y0, g);
  const predictedXmax = (v0*Math.cos(ang)) * tFlight;
  const pad = Math.max(2, predictedXmax*0.12);
  const worldMaxX = Math.max(predictedXmax + pad, 10);
  const worldMaxY = Math.max(y0 + (Math.sin(ang))**2/(2*g) + 50, 5);

  // map world coords to canvas
  const margin = 24;
  const simW = canvas.width - margin*2+5;
  const simH = canvas.height - margin*2 - 24; // keep space for ground
  const xToCanvas = xVal => margin + (xVal / worldMaxX) * simW;
  const yToCanvas = yVal => canvas.height - 24 - (yVal / worldMaxY) * simH;

  // advance simulation only if dt > 0
if (dt > 0) {
    const steps = Math.max(1, Math.round(dt / 0.01));
    const stepDt = dt / steps;
    for (let s = 0; s < steps; s++) {
        const ay = -g;
        // integrate velocities and positions
        vy += ay * stepDt;
        x += vx * stepDt;
        y += vy * stepDt;
        time += stepDt;

        xValue.textContent = x.toFixed(2);
yValue.textContent = y.toFixed(2);
vxValue.textContent = vx.toFixed(2);
vyValue.textContent = vy.toFixed(2);
tValue.textContent = time.toFixed(2);
        // store data
        timeData.push(time);
        xData.push(x);
        yData.push(y);
        vxData.push(vx);
        vyData.push(vy);

        if (timeData.length > maxPoints) {
            timeData.shift();
            xData.shift();
            yData.shift();
            vxData.shift();
            vyData.shift();
        }
    }
            // auto-pause on floor
        if (y <= 0){
            y = 0;
            vy = 0;
            dt = 0;             // pause
            running = false;
            startPauseBtn.textContent = 'Έναρξη';
        }

}
    xValue.textContent = x.toFixed(2);
yValue.textContent = y.toFixed(2);
vxValue.textContent = vx.toFixed(2);
vyValue.textContent = vy.toFixed(2);
tValue.textContent = time.toFixed(2);

  // If paused, still show last known state (x,y,vx,vy, time) — no pushing new points

  // draw trajectory so far
  ctx.strokeStyle = '#7a0eb4';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i=0;i<xData.length;i++){
    const cx = xToCanvas(xData[i]);
    const cy = yToCanvas(yData[i]);
    if (i===0) ctx.moveTo(cx,cy); else ctx.lineTo(cx,cy);
  }
  ctx.stroke();

  // draw projectile
  const ballX = xToCanvas(x);
  const ballY = yToCanvas(y);
  ctx.fillStyle = '#00ffcc';
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI*2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.2)';
  ctx.stroke();

  // update realtime values (use latest state values)
  xValue.textContent = x.toFixed(2);
  yValue.textContent = y.toFixed(2);
  vxValue.textContent = vx.toFixed(2);
  vyValue.textContent = vy.toFixed(2);
  tValue.textContent = time.toFixed(2);

  // update charts if visible
  // x(t)
  if (posContainer.style.display === 'block') {
    xChart.data.datasets[0].data = timeData.map((t,i)=>({x: t, y: xData[i]}));
    // x-axis bounds: show last few seconds (2x flight or whole)
    xChart.options.scales.x.min = Math.max(0, time - Math.max(2, tFlight));
    xChart.options.scales.x.max = time;
    xChart.options.scales.y.min = 0;
    xChart.options.scales.y.max = worldMaxY;
    xChart.update();
  }
  // y(t)
  if (heightContainer.style.display === 'block') {
    yChart.data.datasets[0].data = timeData.map((t,i)=>({x: t, y: yData[i]}));
    yChart.options.scales.x.min = Math.max(0, time - Math.max(2, tFlight));
    yChart.options.scales.x.max = time;
    yChart.options.scales.y.min = 0;
    yChart.options.scales.y.max = worldMaxY;
    yChart.update();
  }

    // inside draw loop, after updating positions
if (y <= 0) {
  y = 0;
  vy = 0;
  dt = 0; // auto-pause
  startPauseBtn.textContent = 'Έναρξη';
  running = false;
}

// Draw axes
ctx.strokeStyle = '#444';
ctx.lineWidth = 2;

// x-axis
ctx.beginPath();
ctx.moveTo(0, yToCanvas(y0));
ctx.lineTo(canvas.width, yToCanvas(y0));
ctx.stroke();

// y-axis
ctx.beginPath();
ctx.moveTo(24, 0);
ctx.lineTo(24, canvas.height);
ctx.stroke();

// optional: add ticks every N units
const xTicks = 10;
const yTicks = 5;
// Draw Y-axis ticks with accurate labels
for (let i = 0; i <= yTicks; i++) {
    // world coordinate for this tick
    const yVal = (i / yTicks) * worldMaxY;
    // map to canvas using the same function as ball
    const cy = yToCanvas(yVal);

    // draw tick
    ctx.beginPath();
    ctx.moveTo(24, cy);
    ctx.lineTo(28, cy);
    ctx.stroke();

}

for (let i = 0; i <= yTicks; i++) {
    const yVal = (i / yTicks) * worldMaxY;
    const cy = yToCanvas(yVal);

    ctx.beginPath();
    ctx.moveTo(24, cy);
    ctx.lineTo(28, cy); // tick length
    ctx.stroke();

}
// Draw floor
ctx.fillStyle = '#222';
ctx.fillRect(0, canvas.height-24, canvas.width, 24);


  requestAnimationFrame(draw);
}

// start drawing
draw();

// reset on parameter change
function fullResetAndStop(){
  dt = 0;
  savedDt = 0.02;
  startPauseBtn.textContent = 'Έναρξη';
  running = false;
  // reinitialize state
  const ang = angleDeg * Math.PI/180;
  vx = v0 * Math.cos(ang);
  vy = v0 * Math.sin(ang);
  x = 0;
  y = y0;
  time = 0;
  timeData = []; xData = []; yData = []; vxData = []; vyData = [];
  xChart.data.datasets[0].data = [];
  yChart.data.datasets[0].data = [];
  yxChart.data.datasets[0].data = [];
  xChart.update(); yChart.update(); yxChart.update();
}

// wire change handlers to reset but preserve paused state
v0Slider.addEventListener('change', ()=>{ v0 = parseFloat(v0Input.value); fullResetAndStop(); });
angleSlider.addEventListener('change', ()=>{ angleDeg = parseFloat(angleInput.value); fullResetAndStop(); });
gSlider.addEventListener('change', ()=>{ g = parseFloat(gInput.value); fullResetAndStop(); });
y0Slider.addEventListener('change', ()=>{ y0 = parseFloat(y0Input.value); fullResetAndStop(); });

// also sync numeric inputs
v0Input.addEventListener('change', ()=>{ v0 = parseFloat(v0Input.value); v0Slider.value = v0; fullResetAndStop(); });
angleInput.addEventListener('change', ()=>{ angleDeg = parseFloat(angleInput.value); angleSlider.value = angleDeg; fullResetAndStop(); });
gInput.addEventListener('change', ()=>{ g = parseFloat(gInput.value); gSlider.value = g; fullResetAndStop(); });
y0Input.addEventListener('change', ()=>{ y0 = parseFloat(y0Input.value); y0Slider.value = y0; fullResetAndStop(); });

// initialize display state (charts hidden)
posContainer.style.display = 'none';
heightContainer.style.display = 'none';
trajContainer.style.display = 'none';
