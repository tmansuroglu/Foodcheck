import React, { useEffect, useState } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { connect } from 'react-redux';

const HorizontalBarChart = ({ graphData }) => {
  return (
    <div className='horizontalBar'>
      <HorizontalBar
        width={100}
        height={200}
        options={{
          title: 'Nutrients',
          maintainAspectRatio: false,
          hover: false,
          legend: { display: false },
          tooltips: { enabled: false },
        }}
        data={{
          labels: ['Fat', 'Carboydrate', 'Protein'],
          datasets: [
            {
              label: 'gram(s)',
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
    </div>
  );
};

const mapStateToProps = state => {
  return {
    // uid: state.firebase.auth.uid,
    // selectedMeal: state.DietReducer.activeMeal,
    // mealsChartContent: state.DietReducer.activeMeal,
  };
};
export default connect(mapStateToProps)(HorizontalBarChart);
