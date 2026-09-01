/* eslint-disable no-unused-vars */

function setup() {
  let canvas = createCanvas(0.75*windowWidth,windowHeight)
  canvas.parent("sketch-container")
     
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
  p= math_Handler();
    drawAxes()
  drawXTicks()
  drawYTicks()
  drawGrid()
  Projectile(p);
  if (rotcheck){
fDraw();}
if(xcheck){
  
    if(t>0&&u0!=0){
drawX(p,'x');}

if(t>0){
drawY(p,'y');}
}
if(ucheck){

    if(t>0){
drawuY(p,'uᵧ');}
}
if(ucheck){

    if(t>=0){
drawuX(p,'uₓ');}
}
if(ucheck1){

    if(t>=0){
drawU(p,'u');}
}
if(checkD){
drawD(p,'d');}
}


function windowResized(){
  resizeCanvas(0.75*windowWidth,windowHeight);
}

