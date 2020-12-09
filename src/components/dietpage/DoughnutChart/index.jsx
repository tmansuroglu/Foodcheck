import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'chart.js';
import './index.css';
import centerTextPlugin from '../dougnutCenterTextPlugin';

const DoughnutChart = ({ graphData, totalKcal }) => {
  // plugin that puts numbers to center of doughnut chart
  Chart.pluginService.register(centerTextPlugin);
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
