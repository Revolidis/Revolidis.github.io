/* eslint-disable no-unused-vars */

function setup() {
  let canvas = createCanvas(0.75*windowWidth,windowHeight)
  canvas.parent("sketch-container")
    if (windowWidth <= 700) {
    createCanvas(windowWidth, windowWidth * 0.75);
  } else {
    createCanvas(0.75 * windowWidth, windowHeight);
  }
     
chart = new Chart(document.getElementById("myChart"), {
  type: "line",
    data: {
        datasets: [{
            label: "y-t",
                data: [],
                pointRadius: 0
        }]
    },
    options: {
        animation: false,
        parsing: false,
         plugins: {
        legend: {
            labels: {
                font: {
                    size: 18
                }
            },
            labels: {
                font: {
                    size: 18
                }
            }
        }
    },
        scales: {
            x: {
                 type: "linear",
            ticks: {
                font: {
                    size: 18
                }
            },
            title: {
                display: true,
                text: "t (s)",
                font: {
                    size: 22
                }
            
        },

                
                min: 0,
                max: 10*u0*T+10
            },
            y: { 
                 type: "linear",
            ticks: {
                font: {
                    size: 18
                }
            },
            title: {
                display: true,
                text: "y (m)",
                font: {
                    size: 22
                }
            
        },
                min: 0,
                max: amp
      }}}
});

uchart = new Chart(document.getElementById("uChart"), {
    type: "line",
    data: {
        datasets: [{
            label: "y-x",
                data: [],
                pointRadius: 0
        }]
    },
    options: {
        animation: false,
        parsing: false,
         plugins: {
        legend: {
            labels: {
                font: {
                    size: 18
                }
            },
            labels: {
                font: {
                    size: 18
                }
            }
        }
    },
        scales: {
            x: {
                 type: "linear",
            ticks: {
                 stepSize: 2,
                font: {
                    size: 18
                }
            },
            title: {
                display: true,
                text: "t (s)",
                font: {
                    size: 22
                }
            
        },

                
                min: 0,
                max: 10*u0*T+10
            },
            y: { 
                 type: "linear",
            ticks: {
                 stepSize: 10,
                font: {
                    size: 18
                }
            },
            title: {
                display: true,
                text: "t (s)",
                font: {
                    size: 22
                }
            
        },
                min: 0,
                max: 100
      }
    
    
    }
      
    }
});
document.getElementById("myChart").style.display = "none";
document.getElementById("uChart").style.display = "none";
}
function draw() {
  background(144, 190, 109);

   let x = 10*amp*Math.sin(2*Math.PI*f*t+Math.PI/2);
    let y = 10*amp*Math.cos(2*Math.PI*f*t+Math.PI/2);
    time_Handler();
  p= math_Handler(x,y);
    drawAxes()
  drawXTicks()
  drawYTicks()
  drawGrid()
  Projectile(p);

//if(xcheck){
  
  //  if(t>0&&u0!=0){
//drawX(p,'x');}

//if(t>0){
//drawY(p,'y');}
//}
if (rotcheck){
    fDraw(p);}
if(ucheck){

    if(t>0){
drawOmega(p,'ω');}
}
//αₖ
if(ucheck1){

    if(t>=0){
drawU(p,'u');}
}
if(checkD){
drawD(p,'R');}
if (sinCheck) {
frontView(x);
}

if (aCheck) {
drawA(p,'αₖ');
}

}



function windowResized() {
  if (windowWidth <= 700) {
    // Mobile: canvas fills the width, height scaled to fit nicely
    let w = windowWidth;
    let h = windowWidth * 0.75; // pick a ratio that looks good for your sim
    resizeCanvas(w, h);
  } else {
    // Desktop: original behavior
    resizeCanvas(0.75 * windowWidth, windowHeight);
  }
}

