import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import gradient from 'chartjs-plugin-gradient';

@Component({
  selector: 'app-article-relevance',
  templateUrl: './article-relevance.component.html',
  styleUrls: ['./article-relevance.component.css']
})
export class ArticleRelevanceComponent implements OnInit {

  ngOnInit(): void {

    const plugin = {

      id: 'verticalLiner',
      afterInit: (chart, args, opts) => {
        chart.verticalLiner = {}
      },
      afterEvent: (chart, args, options) => {
        const {inChartArea} = args
        chart.verticalLiner = {draw: inChartArea}
      },
      beforeTooltipDraw: (chart, args, options) => {
        const {draw} = chart.verticalLiner
        if (!draw) return

        const {ctx} = chart
        const {top, bottom} = chart.chartArea
        const {tooltip} = args
        const x = tooltip?.caretX
        if (!x) return

        ctx.save()
        
        ctx.beginPath()
        ctx.moveTo(x, top)
        ctx.lineTo(x, bottom)
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(95,110,235)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(95,110,235)';
        ctx.shadowOffsetX = 6;

        ctx.stroke()
        
        ctx.restore()
      }
    }

    new Chart('line-chart', {
      
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          gradient: {
            backgroundColor: {
              axis: 'y',
              colors: {
                70: '#7f408e',
                0: '#ffffff30',
              }
            },
          },
          data: [10, 35, 25, 40, 28, 50, 55, 38, 60, 63, 55, 70],
          borderWidth: 4,
          borderColor: '#7f408e',
          pointBorderColor: 'transparent',
          pointBackgroundColor: 'transparent',
          fill: true,
          
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          title: {
            display: true,
            text: 'PROGRESS',
            align: 'start',
            padding: {
              top: 10,
              bottom: 30
            }
          },
          legend: {
            display: false
          },
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            min: 0,
            max: 120,
            ticks: {
              stepSize: 20,
            },
            grid: {
              display: false
            },
            beginAtZero: true 
          }
        },
      },
      plugins: [plugin, gradient]
    });

    var valueDesign = 48;
    new Chart('doughnut-chart-design', {
      type: 'doughnut',
      data: { 
        datasets: [{
          data: [valueDesign, 100-valueDesign],
          backgroundColor: [
            "#f35762",
            "#e5f3fe"
          ],
          hoverBackgroundColor: [
            "#f35762",
            "#e5f3fe"
          ],
          
        }],
      },
      options: {
        aspectRatio: 0.9,
        radius: 70,
        cutout: 60,
  	    responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'DESIGN',
            align: 'center',
            padding: {
              top: 20,
            }
          },
          legend: {
            display: false
          },
          tooltip: { enabled: false },
        },
      },
      plugins: [{

        beforeDraw: function(chart, a, b) {
          var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
          ctx.fillStyle = "#e5f3fe";
          ctx.beginPath();
          ctx.arc(88, 115, 49, 0, 2 * Math.PI);
          ctx.fill();
        },

        id: 'text',
        afterDraw: function(chart, a, b) {
          var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
    
          ctx.restore();
          var fontSize = (height / 130).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillStyle = '#f35762';

    
          var text = valueDesign.toString() + '%',
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2 + 20;
    
          ctx.fillText(text, textX, textY);
          ctx.save();
  
        }
      }],  
    });

    var valueLikes = 48;
    new Chart('doughnut-chart-likes', {
      type: 'doughnut',
      data: { 
        datasets: [{
          data: [valueLikes, 100-valueLikes],
          backgroundColor: [
            "#5767f2",
            "#e5f3fe"
          ],
          hoverBackgroundColor: [
            "#5767f2",
            "#e5f3fe"
          ],
        }],
      },
      options: {
        aspectRatio: 0.9,
        radius: 70,
        cutout: 60,
  	    responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'LIKES',
            align: 'center',
            padding: {
              top: 20,
            }
          },
          legend: {
            display: false
          },
          tooltip: { enabled: false },
        },
      },
      plugins: [{

        beforeDraw: function(chart, a, b) {
          var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
          ctx.fillStyle = "#e5f3fe";
          ctx.beginPath();
          ctx.arc(88, 115, 49, 0, 2 * Math.PI);
          ctx.fill();
        },

        id: 'text',
        afterDraw: function(chart, a, b) {
          var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
    
          ctx.restore();
          var fontSize = (height / 130).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillStyle = '#5767f2';
    
          var text = valueLikes.toString() + '%',
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2 + 20;
    
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }],  
    });

    var valueRelevant = 72;
    new Chart('doughnut-chart-relevant', {
      type: 'doughnut',
      data: { 
        datasets: [{
          data: [valueRelevant, 100-valueRelevant],
          backgroundColor: [
            "#1aa4a6",
            "#e8f6f6"
          ],
          hoverBackgroundColor: [
            "#1aa4a6",
            "#e8f6f6"
          ],
        }],
      },
      options: {
        aspectRatio: 0.9,
        radius: 70,
        cutout: 60,
  	    responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'RELEVANT',
            align: 'center',
            padding: {
              top: 20,
            }
          },
          legend: {
            display: false
          },
          tooltip: { enabled: false },
        },
      },
      plugins: [{

        beforeDraw: function(chart, a, b) {
          var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
          ctx.fillStyle = "#e8f6f6";
          ctx.beginPath();
          ctx.arc(88, 115, 49, 0, 2 * Math.PI);
          ctx.fill();
        },

        id: 'text',
        afterDraw: function(chart, a, b) {
          var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
    
          ctx.restore();
          var fontSize = (height / 130).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillStyle = '#1aa4a6';
    
          var text = valueRelevant.toString() + '%',
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2 + 20;
    
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }],  
    });

    var valueProduction = 25;
    new Chart('doughnut-chart-production', {
      type: 'doughnut',
      data: { 
        datasets: [{
          data: [valueProduction, 100-valueProduction],
          backgroundColor: [
            "#445074",
            "#f1f1f1"
          ],
          hoverBackgroundColor: [
            "#445074",
            "#f1f1f1"
          ],
        }],
      },
      options: {
        aspectRatio: 0.9,
        radius: 70,
        cutout: 60,
  	    responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'PRODUCTION',
            align: 'center',
            padding: {
              top: 20,
            }
          },
          legend: {
            display: false
          },
          tooltip: { enabled: false },
        },
      },
      plugins: [{

        beforeDraw: function(chart, a, b) {
          var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
          ctx.fillStyle = "#f1f1f1";
          ctx.beginPath();
          ctx.arc(88, 115, 49, 0, 2 * Math.PI);
          ctx.fill();
        },

        id: 'text',
        afterDraw: function(chart, a, b) {
          var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
    
          ctx.restore();
          var fontSize = (height / 130).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillStyle = '#445074';
    
          var text = valueProduction.toString() + '%',
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2 + 20;
    
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }],  
    });

    var valueProduction2 = 25;
    new Chart('doughnut-chart-production2', {
      type: 'doughnut',
      data: { 
        datasets: [{
          data: [valueProduction2, 100-valueProduction2],
          backgroundColor: [
            "#477546",
            "#f1f1f1"
          ],
          hoverBackgroundColor: [
            "#477546",
            "#f1f1f1"
          ],
        }],
      },
      options: {
        aspectRatio: 0.9,
        radius: 70,
        cutout: 60,
  	    responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'PRODUCTION',
            align: 'center',
            padding: {
              top: 20,
            }
          },
          legend: {
            display: false
          },
          tooltip: { enabled: false },
        },
      },
      plugins: [{

        beforeDraw: function(chart, a, b) {
          var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
          ctx.fillStyle = "#f1f1f1";
          ctx.beginPath();
          ctx.arc(88, 115, 49, 0, 2 * Math.PI);
          ctx.fill();
        },

        id: 'text',
        afterDraw: function(chart, a, b) {
          var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
    
          ctx.restore();
          var fontSize = (height / 130).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillStyle = '#477546';
    
          var text = valueProduction2.toString() + '%',
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2 + 20;
    
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }],  
    });
  }
}