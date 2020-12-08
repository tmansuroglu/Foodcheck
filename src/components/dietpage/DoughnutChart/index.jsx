import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './index.css';

const DoughnutChart = ({ graphData, totalKcal }) => {
  // plugin that puts numbers inside doughnut chart
  Chart.pluginService.register({
    beforeDraw: function (chart) {
      if (chart.config.options.elements.center) {
        // Get ctx from string
        const { ctx } = chart.chart;

        // Get options from the center object in options
        const centerConfig = chart.config.options.elements.center;
        const fontStyle = centerConfig.fontStyle || 'Arial';
        const txt = centerConfig.text;
        const color = centerConfig.color || '#000';
        const maxFontSize = centerConfig.maxFontSize || 75;
        const sidePadding = centerConfig.sidePadding || 20;
        const sidePaddingCalculated =
          (sidePadding / 100) * (chart.innerRadius * 2);
        // Start with a base font of 30px
        ctx.font = '30px ' + fontStyle;

        // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        const stringWidth = ctx.measureText(txt).width;
        const elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        const widthRatio = elementWidth / stringWidth;
        const newFontSize = Math.floor(30 * widthRatio);
        const elementHeight = chart.innerRadius * 2;

        // Pick a new font size so it will not be larger than the height of label.
        let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
        const minFontSize = centerConfig.minFontSize;
        const lineHeight = centerConfig.lineHeight || 25;
        let wrapText = false;

        if (minFontSize === undefined) {
          minFontSize = 20;
        }

        if (minFontSize && fontSizeToUse < minFontSize) {
          fontSizeToUse = minFontSize;
          wrapText = true;
        }

        // Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        let centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        ctx.font = fontSizeToUse + 'px ' + fontStyle;
        ctx.fillStyle = color;

        if (!wrapText) {
          ctx.fillText(txt, centerX, centerY);
          return;
        }

        const words = txt.split(' ');
        let line = '';
        const lines = [];

        // Break words up into multiple lines if necessary
        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > elementWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }

        // Move the center up depending on line height and number of lines
        centerY -= (lines.length / 2) * lineHeight;

        for (let n = 0; n < lines.length; n++) {
          ctx.fillText(lines[n], centerX, centerY);
          centerY += lineHeight;
        }
        //Draw text in center
        ctx.fillText(line, centerX, centerY);
      }
    },
  });
  return (
    <Doughnut
      options={{
        cutoutPercentage: 60,
        elements: {
          center: {
            text: `${totalKcal}kcal`,
            color: 'black', // Default is #000000
            fontStyle: 'Arial', // Default is Arial
            sidePadding: 20, // Default is 20 (as a percentage)
            minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
            lineHeight: 25, // Default is 25 (in px), used for when text wraps
          },
        },
        plugins: {
          datalabels: {
            font: { size: 15 },
            formatter: value => {
              const percentage = (value * 100) / totalKcal;
              return `${Math.round(percentage * 100) / 100}%`;
            },
          },
        },
        title: {
          text: 'Calorie Distribution (%)',
          display: true,
          fontSize: 20,
        },
        maintainAspectRatio: false,
        tooltips: {
          enabled: true,

          callbacks: {
            label: (tooltipItem, data) => {
              const nutrientName = data.labels[tooltipItem.index];
              const nutrientAmount =
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
              return `${nutrientName}: ${nutrientAmount}kcal`;
            },
          },
        },
        legend: { position: 'bottom', labels: { fontSize: 15 } },
      }}
      data={{
        labels: ['Fat', 'Carboydrate', 'Protein'],
        datasets: [
          {
            data: graphData,
            backgroundColor: [
              'rgba(255, 206, 86, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
              'rgba(255, 206, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};

export default DoughnutChart;
