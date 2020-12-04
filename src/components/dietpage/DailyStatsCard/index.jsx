import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Typography } from 'antd';
import HorizontalBarChart from '../HorizontalBarChart';
import DoughnutChart from '../DoughnutChart';
import DailyStatsList from '../DailyStatsList';
import db from '../../../firebaseConfig';
import './index.css';

const PROTEIN_MULTIPLIER = 4;
const CARBOHYDRATE_MULTIPLIER = 4;
const FAT_MULTIPLIER = 9;

const DietDetails = ({ activeMeal, uid }) => {
  const { Title } = Typography;
  const [nutrientsConsumed, setNutrientsConsumed] = useState({});
  const [horizontalBarChartData, setHorizontalBarChartData] = useState([]);
  const [doughnutChartData, setDoughnutChartData] = useState([]);
  const [totalKcal, setTotalKcal] = useState(0);

  useEffect(() => {
    db.collection('users')
      .doc(uid)
      .get()
      .then(userData => {
        const consumption = {};
        let calories = 0;
        const { diet } = userData.data();
        for (const meal of Object.values(diet)) {
          for (const food of meal) {
            for (const nutrient in food.nutrientsConsumed) {
              if (consumption.hasOwnProperty(nutrient)) {
                consumption[nutrient] += Math.round(
                  food.nutrientsConsumed[nutrient]
                );
              } else if (nutrient === 'calories') {
                calories += food.nutrientsConsumed[nutrient];
              } else {
                consumption[nutrient] = Math.round(
                  food.nutrientsConsumed[nutrient]
                );
              }
            }
          }
        }
        delete consumption.serving_amount;
        delete consumption.serving_size;
        delete consumption.consumption_in_grams;
        setNutrientsConsumed({ ...consumption });
        setTotalKcal(calories);
      });
  }, [activeMeal, uid]);

  useEffect(() => {
    setHorizontalBarChartData([
      nutrientsConsumed.total_fat,
      nutrientsConsumed.total_carbohydrate,
      nutrientsConsumed.protein,
    ]);
  }, [nutrientsConsumed]);

  useEffect(() => {
    setDoughnutChartData([
      nutrientsConsumed.total_fat * FAT_MULTIPLIER,
      nutrientsConsumed.total_carbohydrate * CARBOHYDRATE_MULTIPLIER,
      nutrientsConsumed.protein * PROTEIN_MULTIPLIER,
    ]);
  }, [nutrientsConsumed]);

  return (
    <>
      {activeMeal ? (
        <Card
          className='dailyStatsCard'
          title={
            <Title level={3} className='dailyStatsCardTitle'>
              Daily Consumption
            </Title>
          }
          bordered={false}
        >
          <DoughnutChart graphData={doughnutChartData} />
          <Title level={3} className='dailyStatsCardTitle kcal'>
            Total calories: {totalKcal} kcal
          </Title>
          <HorizontalBarChart graphData={horizontalBarChartData} />
          <Title level={3} className='dailyStatsCardTitle'>
            All Nutrients
          </Title>
          <DailyStatsList nutrientsConsumed={nutrientsConsumed} />
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    activeMeal: state.DietReducer.activeMeal,
  };
};
export default connect(mapStateToProps)(DietDetails);
