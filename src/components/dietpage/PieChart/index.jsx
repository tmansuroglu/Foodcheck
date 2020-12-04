import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './index.css';

const PieChart = ({ graphData }) => {
  return (
    <Doughnut
      options={{
        title: { text: 'KCAL Per Nutrient', display: true, fontSize: 15 },
        maintainAspectRatio: true,
        hover: false,
        legend: { display: false },
        tooltips: { enabled: false },
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

export default PieChart;
