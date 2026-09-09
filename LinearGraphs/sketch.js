/* eslint-disable no-unused-vars */

function setup() {
  let w, h;
  if (windowWidth <= 700) {
    w =  getMobileCanvasWidth();
    h = getMobileCanvasHeight();
  } else {
    w = 0.75 * windowWidth;
    h = windowHeight;
  }
  let canvas = createCanvas(w, h);
  canvas.parent("sketch-container")
     
     
myChart = new Chart(document.getElementById("myChart"), {
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
                        size: 22
                    }
                }
            }
        },

        scales: {

            x: {
                type: "linear",

                grid: {
                    display: true,
                    lineWidth: 2,
                    color: "rgba(0, 0, 0, 0.25)"
                },

                ticks: {
                    font: {
                        size: 22
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
                max: T
            },

            y: {
                type: "linear",

                grid: {
                    display: true,
                    lineWidth: 2,
                    color: "rgba(0, 0, 0, 0.25)"
                },

                ticks: {
                    font: {
                        size: 22
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
            }
        }
    }
});


uChart = new Chart(document.getElementById("uChart"), {
    type: "line",

    data: {
        datasets: [{
            label: "u-t",
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
                        size: 22
                    }
                }
            }
        },

        scales: {

            x: {
                type: "linear",

                grid: {
                    display: true,
                    lineWidth: 2,
                    color: "rgba(0, 0, 0, 0.25)"
                },

                ticks: {
                    font: {
                        size: 22
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
                max: T
            },

            y: {
                type: "linear",

                grid: {
                    display: true,
                    lineWidth: 2,
                    color: "rgba(0, 0, 0, 0.25)"
                },

                ticks: {
                    font: {
                        size: 22
                    }
                },

                title: {
                    display: true,
                    text: "u (m/s)",
                    font: {
                        size: 22
                    }
                },

                min: 0,
                max: f + amp * T
            }
        }
    }
});


xChart = new Chart(document.getElementById("xChart"), {
    type: "line",

    data: {
        datasets: [{
            label: "x-t",
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
                        size: 22
                    }
                }
            }
        },

        scales: {

            x: {
                type: "linear",

                grid: {
                    display: true,
                    lineWidth: 2,
                    color: "rgba(0, 0, 0, 0.25)"
                },

                ticks: {
                    stepSize: 2,

                    font: {
                        size: 22
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
                max: T
            },

            y: {
                type: "linear",

                grid: {
                    display: true,
                    lineWidth: 2,
                    color: "rgba(0, 0, 0, 0.25)"
                },

                ticks: {
                    stepSize: 10/T,

                    font: {
                        size: 22
                    }
                },

                title: {
                    display: true,
                    text: "x (m)",
                    font: {
                        size: 22
                    }
                },

                min: 0,
                max: 10 * f * T + 5 * amp * T ** 2
            }
        }
    }
});
document.getElementById("myChart").style.display = "none";
document.getElementById("uChart").style.display = "none";
document.getElementById("xChart").style.display = "none";
}
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    windowResized();
  });
}
function draw() {
  background(144, 190, 109);

   let x1 = f*t*10+1/2*amp*(t)**2*10;
   u = 10*f+10*amp*t; 
    let y = 0;
    time_Handler();
  p= math_Handler(x1,y);
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

if(xcheck1){

drawU(p,'u');}


if(dCheck){

drawA(p,'α');}


if(rotcheck){
drawX(p,'x');}
}


function windowResized(){
  if (windowWidth <= 700) {
    let w =  getMobileCanvasWidth();
    let h = getMobileCanvasHeight();
    resizeCanvas(w, h);
  } else {
    resizeCanvas(0.75*windowWidth, windowHeight);
  }
}
