// Canvas
const canvas = document.getElementById("shmCanvas");
canvas.width = 500;
canvas.height = 250;
const ctx = canvas.getContext("2d");

// SHM parameters
let amplitude = 2;
let frequency = 0.5;
let damping = 0;
let phase = 0;

let time = 0;
let dt = 0.005;         // current delta time
let savedDt = dt; 

// Data for charts
let timeData = [];
let ampData = [];
let positionData = [];
let velocityData = [];
let accelerationData = [];
let amplitudeData = [];
let maxPoints = 1000;
let x = 0;

let showPosVec = false;
let showVelVec = false;
let showAccVec = false;

// Function to draw an arrow
function drawArrow(ctx, fromX, fromY, toX, toY, color) {
  const headLength = 10; // length of arrowhead
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);

  // Line
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();

  // Arrowhead
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(
    toX - headLength * Math.cos(angle - Math.PI / 6),
    toY - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    toX - headLength * Math.cos(angle + Math.PI / 6),
    toY - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.lineTo(toX, toY);
  ctx.fill();
}
document.getElementById("togglePosVec").addEventListener("click", () => {
  showPosVec = !showPosVec;
});

document.getElementById("toggleVelVec").addEventListener("click", () => {
  showVelVec = !showVelVec;
});

document.getElementById("toggleAccVec").addEventListener("click", () => {
  showAccVec = !showAccVec;
});

// Simulation state
let running = false;

// -------- Controls sync --------
function linkInput(sliderId, numberId, variableName) {
  const slider = document.getElementById(sliderId);
  const number = document.getElementById(numberId);

  slider.addEventListener("input", () => {
    number.value = slider.value;
    updateVariable(variableName, parseFloat(slider.value));
  });

  number.addEventListener("input", () => {
    slider.value = number.value;
    updateVariable(variableName, parseFloat(number.value));
  });
}

function updateVariable(name, value) {
  if (name === "amplitude") amplitude = value;
  if (name === "frequency") frequency = value;
  if (name === "damping") damping = value;
  if (name === "phase") phase = value;
  resetData();
}

linkInput("amplitudeSlider", "amplitudeInput", "amplitude");
linkInput("frequencySlider", "frequencyInput", "frequency");
linkInput("dampingSlider", "dampingInput", "damping");
linkInput("phaseSlider", "phaseInput", "phase");

// -------- Charts --------
function createChart(ctx, label, color) {
  return new Chart(ctx, {
    type: "line",
    data: {
      datasets: [{
        label,
        data: [],
        borderColor: color,
        borderWidth: 2,
        fill: false,
        pointRadius: 0
      }]
    },
    options: {
      animation: false,
      responsive: true,
      scales: {
        x: { type: 'linear', title: { display: true, text: "Χρόνος" } },
        y: { title: { display: true, text: label } }
      },
      plugins: {
        legend: {
          labels: {
            // Hide datasets that have an empty string label
            filter: (legendItem, chart) => legendItem.text !== ""
          }
        }
      }
    }
  });
}

const positionChart = createChart(document.getElementById("positionChart"), "Απομάκρυνση", "#66FF99");
const velocityChart = createChart(document.getElementById("velocityChart"), "Ταχύτητα", "#ffcc00");
const accelerationChart = createChart(document.getElementById("accelerationChart"), "Επιτάχυνση", "#7a0eb4");

// -------- Toggle buttons --------
function setupToggle(btnId, chartId, containerId) {
  document.getElementById(btnId).addEventListener("click", () => {
    const container = document.getElementById(containerId);
    container.style.display = container.style.display === "block" ? "none" : "block";

    // Only show toggleChartMode if position chart is visible
    const modeBtn = document.getElementById("toggleChartMode");
    if (containerId === "positionChartContainer") {
      modeBtn.style.display = container.style.display === "block" ? "inline-block" : "none";
    }
  });
}

setupToggle("togglePosition", "positionChart", "positionChartContainer");
setupToggle("toggleVelocity", "velocityChart", "velocityChartContainer");
setupToggle("toggleAcceleration", "accelerationChart", "accelerationChartContainer");
let xp=0;
// -------- Start/Pause button --------
const startPauseBtn = document.getElementById("startPauseBtn");
startPauseBtn.addEventListener("click", () => {

    if (running) {
        // Pausing
        running=!running;
        xp=x;
        x=x;
    } else {
        // Resuming
    running=!running;

        startPauseBtn.textContent = "Παύση";

    }
});

// -------- Reset data --------
function resetData() {
  timeData = [];
  positionData = [];
  velocityData = [];
  accelerationData = [];
  amplitudeData = [];
  time = 0;
}

// -------- Chart mode toggle --------
let chartMode = 0; // 0=x-t, 1=A-t, 2=both
document.getElementById("toggleChartMode").addEventListener("click", () => {
  chartMode = (chartMode + 1) % 3;
  if (chartMode === 0) document.getElementById("toggleChartMode").textContent = "x-t";
  if (chartMode === 1) document.getElementById("toggleChartMode").textContent = "Συνδιαστικό.";
  if (chartMode === 2) document.getElementById("toggleChartMode").textContent ="A-t" ;
});

// -------- Draw simulation --------
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
let envelope = 0;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const padding = 30;
  const scale = (canvas.width / 2 - padding) / amplitude;

  // Equilibrium
  ctx.strokeStyle = "#444";
  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(canvas.width, centerY);
  ctx.stroke();

  ctx.fillStyle = "#fff";
  ctx.font = "16px Arial";
  ctx.fillText("0", centerX + 5, centerY - 10);

  ctx.strokeStyle = "#666";
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(centerX - amplitude * scale, 0);
  ctx.lineTo(centerX - amplitude * scale, canvas.height);
  ctx.stroke();
  ctx.fillText("-A", centerX - amplitude * scale - 20, centerY - 8);

  ctx.beginPath();
  ctx.moveTo(centerX + amplitude * scale, 0);
  ctx.lineTo(centerX + amplitude * scale, canvas.height);
  ctx.stroke();
  ctx.fillText("A", centerX + amplitude * scale + 5, centerY - 8);
  ctx.setLineDash([]);

  let B=0, v = 0, a = 0,expDecay=0;
let tPeak=0;
if (running) {
  const omega = 2 * Math.PI * frequency;
  const tPeak = (Math.PI/2 - phase) / omega;   // time of first peak

// Phase-corrected envelope
 envelope = amplitude * Math.exp(-damping * (time));
 if (envelope < 0.001) {
    running = false;          // stops the update
    startPauseBtn.textContent = "Έναρξη"; // optional: update button text
  } else {
    // Compute motion
    x = envelope * Math.sin(omega * time + phase);
    v = omega * envelope * Math.cos(omega * time + phase);
    a = -omega * omega * envelope * Math.sin(omega * time + phase);

    // Save data
    timeData.push(time);
    positionData.push(x);
    velocityData.push(v);
    accelerationData.push(a);
    ampData.push(envelope);

    time += dt;
  }
}


  // Update charts
  const T = 1 / frequency;
  const windowPeriods = 4;
  const xMin = Math.max(0, time - windowPeriods * T);
  const xMax = xMin + windowPeriods * T;
  const yPadding = amplitude * 0.1;
  const yMin = -amplitude - yPadding;
  const yMax = amplitude + yPadding;
  const uMax = amplitude * 2 * Math.PI * frequency + yPadding;
  const aMax = amplitude * (2 * Math.PI * frequency)*(2 * Math.PI * frequency) + yPadding;

  if (document.getElementById("positionChartContainer").style.display === "block") {
    positionChart.options.scales.x.min = xMin;
    positionChart.options.scales.x.max = xMax;
    positionChart.options.scales.y.min = yMin;
    positionChart.options.scales.y.max = yMax;

    if (chartMode === 0) {
      positionChart.data.datasets = [{ label: "Απομάκρυνση", data: positionData.map((y, i) => ({ x: parseFloat(timeData[i]), y })), borderColor: "#66FF99", fill: false, pointRadius: 0 }];
    }  else if (chartMode === 1) {
positionChart.data.datasets = [
  {
    label: "Απομάκρυνση",
    data: positionData.map((y, i) => ({ x: timeData[i], y })),
    borderColor: "#66FF99", fill: false, pointRadius: 0
  },
  {
    label: "Πλάτος",   // legend entry for envelopes
    data: timeData.map((t, i) => {
      const env = amplitude * Math.exp(-damping * (t - tPeak));
      return { x: t, y: env };
    }),
    borderColor: "#ff9900", borderDash: [5,5], fill: false, pointRadius: 0
  },
  {
    label: "",   // no legend for lower envelope
    data: timeData.map((t, i) => {
      const env = amplitude * Math.exp(-damping * (t - tPeak));
      return { x: t, y: -env };
    }),
    borderColor: "#ff9900", borderDash: [5,5], fill: false, pointRadius: 0
  }
];
    }else  {
      positionChart.data.datasets = [ {
    label: "Πλάτος",   // legend entry for envelopes
    data: timeData.map((t, i) => {
      const env = amplitude * Math.exp(-damping * (t - tPeak));
      return { x: t, y: env };
    }),
    borderColor: "#ff9900", borderDash: [5,5], fill: false, pointRadius: 0
  }];

    }
    positionChart.update();
  }

  if (document.getElementById("velocityChartContainer").style.display === "block") {
    velocityChart.options.scales.x.min = xMin;
    velocityChart.options.scales.x.max = xMax;
    velocityChart.options.scales.y.min = -uMax;
    velocityChart.options.scales.y.max = uMax;
    velocityChart.data.datasets[0].data = velocityData.map((y, i) => ({ x: parseFloat(timeData[i]), y }));
    velocityChart.update();
  }

  if (document.getElementById("accelerationChartContainer").style.display === "block") {
    accelerationChart.options.scales.x.min = xMin;
    accelerationChart.options.scales.x.max = xMax;
    accelerationChart.options.scales.y.min = -aMax;
    accelerationChart.options.scales.y.max = aMax;
    accelerationChart.data.datasets[0].data = accelerationData.map((y, i) => ({ x: parseFloat(timeData[i]), y }));
    accelerationChart.update();
  }

  // Update real-time values
  const omegaVal = 2 * Math.PI * frequency;
  document.getElementById("posValue").textContent = x.toFixed(1);
  document.getElementById("velValue").textContent = v.toFixed(1);
  document.getElementById("accValue").textContent = a.toFixed(1);
  document.getElementById("ampValue").textContent = envelope.toFixed(2);
  document.getElementById("omegaValue").textContent = omegaVal.toFixed(1);
  document.getElementById("periodValue").textContent = T.toFixed(1);
  document.getElementById("freqValue").textContent = frequency.toFixed(1);
    document.getElementById("timeValue").textContent = time.toFixed(1);

  // Bottom axis for canvas
  const sscale = (canvas.width - 2 * padding) / (2 * amplitude);
  ctx.strokeStyle = "#888";
  ctx.beginPath();
  ctx.moveTo(padding, canvas.height - 20);
  ctx.lineTo(canvas.width - padding, canvas.height - 20);
  ctx.stroke();

  ctx.fillStyle = "#fff";
  ctx.font = "12px Arial";
  const numTicks = 5;
  for (let i = 0; i <= numTicks; i++) {
    const pos = -amplitude + (i / numTicks) * 2 * amplitude;
    const xTick = canvas.width / 2 + pos * sscale;
    ctx.beginPath();
    ctx.moveTo(xTick, canvas.height - 20);
    ctx.lineTo(xTick, canvas.height - 15);
    ctx.stroke();
    ctx.fillText(pos.toFixed(2), xTick - 10, canvas.height - 5);
  }

  // Draw mass
  ctx.fillStyle = "#66FF99";
  ctx.beginPath();
  ctx.arc(canvas.width / 2 + x * scale, canvas.height / 2, 20, 0, Math.PI * 2);
  ctx.fill();
    
    ctx.fillStyle = "#66FF99";
ctx.beginPath();
ctx.arc(centerX + x * scale, centerY, 20, 0, Math.PI * 2);
ctx.fill();
let scaleU = 0.1;
let scaleA = 0.05;
// --- Vectors ---
if (showVelVec) {
  const startX = centerX + x * scale;
  const startY = centerY -40; // below the ball
  const endX = centerX + x * scale + v * scale * scaleU;
  const endY = centerY + -40;

  drawArrow(ctx, startX, startY, endX, endY, "#ffcc00");

  // Label above the vector
  ctx.fillStyle = "#ffcc00";
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`v = ${v.toFixed(2)}m/s`, (startX + endX) / 2, startY - 5);
}

if (showAccVec) {
  const startX = centerX + x * scale;
  const startY = centerY; // below the ball
  const endX = centerX + x * scale + a * scaleA*scale;
  const endY = centerY ;

  drawArrow(ctx, startX, startY, endX, endY, "#7a0eb4");

  // Label with superscript
  ctx.fillStyle = "#fff";
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  const labelX = (startX + endX) / 2;
  const labelY = startY - 5;

  // Base text ("a = ... m/s")
  const baseText = `a = ${a.toFixed(2)} m/s`;
  ctx.fillText(baseText, labelX, labelY);

  // Superscript "2"
  ctx.font = "10px Arial"; // smaller font
  ctx.fillText("2", labelX + ctx.measureText(baseText).width / 2 + 15, labelY - 5);
}


if (showPosVec) {
  const startX = centerX;
  const startY = centerY + 40; // below the ball
  const endX = centerX + x * scale;
  const endY = centerY + 40;

  drawArrow(ctx, startX, startY, endX, endY, "#66FF99");

  // Label above the vector
  ctx.fillStyle = "#fff";
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`x = ${x.toFixed(2)}`, (startX + endX) / 2, startY - 5);
}




  requestAnimationFrame(draw);
}

// Start
resetData();
draw();
