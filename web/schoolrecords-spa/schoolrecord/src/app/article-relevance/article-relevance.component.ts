import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import gradient from 'chartjs-plugin-gradient';
import { ComingSoonComponent } from '../core/coming-soon/coming-soon.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-article-relevance',
  templateUrl: './article-relevance.component.html',
  styleUrls: ['./article-relevance.component.css'],
})
export class ArticleRelevanceComponent implements OnInit {
  ngOnInit(): void {
    const plugin = {
      id: 'verticalLiner',
      afterInit: (chart, args, opts) => {
        chart.verticalLiner = {};
      },
      afterEvent: (chart, args, options) => {
        const { inChartArea } = args;
        chart.verticalLiner = { draw: inChartArea };
      },
      beforeTooltipDraw: (chart, args, options) => {
        const { draw } = chart.verticalLiner;
        if (!draw) return;

        const { ctx } = chart;
        const { top, bottom } = chart.chartArea;
        const { tooltip } = args;
        const x = tooltip?.caretX;
        if (!x) return;

        ctx.save();

        ctx.beginPath();
        ctx.moveTo(x, top);
        ctx.lineTo(x, bottom);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(95,110,235)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(95,110,235)';
        ctx.shadowOffsetX = 6;

        ctx.stroke();

        ctx.restore();
      },
    };

    const daysArray = [5, 3, 7, 22, 12, 8, 15, 9, 1, 25, 20, 10];
    const hoursArray = [1.30, 8.0, 5.3, 3.3, 9.0, 3.1, 1.8, 3.6, 2.9, 5.0, 9.0, 4.9];

    new Chart('line-chart', {
      type: 'line',
      data: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            gradient: {
              backgroundColor: {
                axis: 'y',
                colors: {
                  70: '#7f408e',
                  0: '#ffffff30',
                },
              },
            },
            data: [10, 35, 25, 40, 28, 50, 55, 38, 60, 63, 55, 70],
            borderWidth: 4,
            borderColor: '#7f408e',
            pointBorderColor: 'transparent',
            pointBackgroundColor: 'transparent',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                return ''
              },
              title: function(context) {
                console.log(context);
                return `Days:          ${daysArray[context[0].dataIndex]}`;
              },
              afterTitle: function(context) {
                console.log(context);
                return `Hours:        ${hoursArray[context[0].dataIndex]}`;
              }
            },
          },
          title: {
            display: true,
            text: 'PROGRESS',
            align: 'start',
            padding: {
              top: 10,
              bottom: 30,
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            min: 0,
            max: 120,
            ticks: {
              stepSize: 20,
            },
            grid: {
              display: false,
            },
            beginAtZero: true,
          },
        },
      },
      plugins: [plugin, gradient],
    });

    var valueViews = 48;
    new Chart('doughnut-chart-views', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [valueViews, 100 - valueViews],
            backgroundColor: ['#f35762', '#e5f3fe'],
            hoverBackgroundColor: ['#f35762', '#e5f3fe'],
            hoverBorderColor: ['#f35762', '#e5f3fe'],
          },
        ],
      },
      options: {
        aspectRatio: 0.9,
        radius: 70,
        cutout: 60,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'VIEWS',
            align: 'center',
            padding: {
              top: 20,
            },
          },
          legend: {
            display: false,
          },
          tooltip: { enabled: false },
        },
      },
      plugins: [
        {
          beforeDraw: function (chart, a, b) {
            var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;
            ctx.fillStyle = '#e5f3fe';
            ctx.beginPath();
            ctx.arc(88, 115, 49, 0, 2 * Math.PI);
            ctx.fill();
          },

          id: 'text',
          afterDraw: function (chart, a, b) {
            var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;

            ctx.restore();
            var fontSize = (height / 130).toFixed(2);
            ctx.font = fontSize + 'em Roboto-Regular, Arial, Helvetica, sans-serif';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#f35762';

            var text = valueViews.toString() + '%',
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2 + 20;

            ctx.fillText(text, textX, textY);
            ctx.save();
          },
        },
      ],
    });

    var valueLikes = 48;
    new Chart('doughnut-chart-likes', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [valueLikes, 100 - valueLikes],
            backgroundColor: ['#5767f2', '#e5f3fe'],
            hoverBackgroundColor: ['#5767f2', '#e5f3fe'],
            hoverBorderColor: ['#5767f2', '#e5f3fe'],
          },
        ],
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
            },
          },
          legend: {
            display: false,
          },
          tooltip: { enabled: false },
        },
      },
      plugins: [
        {
          beforeDraw: function (chart, a, b) {
            var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;
            ctx.fillStyle = '#e5f3fe';
            ctx.beginPath();
            ctx.arc(88, 115, 49, 0, 2 * Math.PI);
            ctx.fill();
          },

          id: 'text',
          afterDraw: function (chart, a, b) {
            var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;

            ctx.restore();
            var fontSize = (height / 130).toFixed(2);
            ctx.font = fontSize + 'em Roboto-Regular, Arial, Helvetica, sans-serif';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#5767f2';

            var text = valueLikes.toString() + '%',
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2 + 20;

            ctx.fillText(text, textX, textY);
            ctx.save();
          },
        },
      ],
    });

    var valueRelevant = 72;
    new Chart('doughnut-chart-relevant', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [valueRelevant, 100 - valueRelevant],
            backgroundColor: ['#1aa4a6', '#e8f6f6'],
            hoverBackgroundColor: ['#1aa4a6', '#e8f6f6'],
            hoverBorderColor: ['#1aa4a6', '#e8f6f6'],
          },
        ],
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
            },
          },
          legend: {
            display: false,
          },
          tooltip: { enabled: false },
        },
      },
      plugins: [
        {
          beforeDraw: function (chart, a, b) {
            var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;
            ctx.fillStyle = '#e8f6f6';
            ctx.beginPath();
            ctx.arc(88, 115, 49, 0, 2 * Math.PI);
            ctx.fill();
          },

          id: 'text',
          afterDraw: function (chart, a, b) {
            var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;

            ctx.restore();
            var fontSize = (height / 130).toFixed(2);
            ctx.font = fontSize + 'em Roboto-Regular, Arial, Helvetica, sans-serif';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#1aa4a6';

            var text = valueRelevant.toString() + '%',
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2 + 20;

            ctx.fillText(text, textX, textY);
            ctx.save();
          },
        },
      ],
    });

    var valueProduction = 25;
    new Chart('doughnut-chart-production', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [valueProduction, 100 - valueProduction],
            backgroundColor: ['#445074', '#f1f1f1'],
            hoverBackgroundColor: ['#445074', '#f1f1f1'],
            hoverBorderColor: ['#445074', '#f1f1f1'],
          },
        ],
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
            },
          },
          legend: {
            display: false,
          },
          tooltip: { enabled: false },
        },
      },
      plugins: [
        {
          beforeDraw: function (chart, a, b) {
            var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;
            ctx.fillStyle = '#f1f1f1';
            ctx.beginPath();
            ctx.arc(88, 115, 49, 0, 2 * Math.PI);
            ctx.fill();
          },

          id: 'text',
          afterDraw: function (chart, a, b) {
            var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;

            ctx.restore();
            var fontSize = (height / 130).toFixed(2);
            ctx.font = fontSize + 'em Roboto-Regular, Arial, Helvetica, sans-serif';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#445074';

            var text = valueProduction.toString() + '%',
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2 + 20;

            ctx.fillText(text, textX, textY);
            ctx.save();
          },
        },
      ],
    });

    var valueDownloads = 25;
    new Chart('doughnut-chart-downloads', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [valueDownloads, 100 - valueDownloads],
            backgroundColor: ['#477546', '#f1f1f1'],
            hoverBackgroundColor: ['#477546', '#f1f1f1'],
            hoverBorderColor: ['#477546', '#f1f1f1'],
          },
        ],
      },
      options: {
        aspectRatio: 0.9,
        radius: 70,
        cutout: 60,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'DOWNLOADS',
            align: 'center',
            padding: {
              top: 20,
            },
          },
          legend: {
            display: false,
          },
          tooltip: { enabled: false },
        },
      },
      plugins: [
        {
          beforeDraw: function (chart, a, b) {
            var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;
            ctx.fillStyle = '#f1f1f1';
            ctx.beginPath();
            ctx.arc(88, 115, 49, 0, 2 * Math.PI);
            ctx.fill();
          },

          id: 'text',
          afterDraw: function (chart, a, b) {
            var width = chart.width,
            height = chart.height,
            ctx = chart.ctx;

            ctx.restore();
            var fontSize = (height / 130).toFixed(2);
            ctx.font = fontSize + 'em Roboto-Regular, Arial, Helvetica, sans-serif';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#477546';

            var text = valueDownloads.toString() + '%',
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2 + 20;

            ctx.fillText(text, textX, textY);
            ctx.save();
          },
        },
      ],
    });
  }

  constructor(
    public dialog: MatDialog
    ) {}

  comingSoon() {
    let dialogRef = this.dialog.open(ComingSoonComponent, {
      height: '300px',
      width: '300px',
      data: {
        user: {
          id: 1,
          name: 'Jonas',
        },
      },
    });
  }
}
