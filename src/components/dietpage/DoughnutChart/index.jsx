import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './index.css';

const DoughnutChart = ({ graphData }) => {
  return (
    <Doughnut
      options={{
        plugins: { datalabels: { font: { size: 15 } } },
        title: { text: 'KCAL Per Nutrient', display: true, fontSize: 20 },
        maintainAspectRatio: true,
        tooltips: { caretPadding: 10 },
        legend: { position: 'bottom', labels: { fontSize: 15 } },
        responsive: true,
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
