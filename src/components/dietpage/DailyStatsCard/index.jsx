import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Col } from 'antd';
import HorizontalBarChart from '../HorizontalBarChart';
import DailyStats from '../DailyStats';
import db from '../../../firebaseConfig';
import './index.css';

const DietDetails = ({ activeMeal, uid }) => {
  const [nutrientsConsumed, setNutrientsConsumed] = useState({});
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    db.collection('users')
      .doc(uid)
      .get()
      .then(userData => {
        const consumption = {};
        const userDiet = userData.data().diet;
        for (const meal of Object.values(userDiet)) {
          for (const food of meal) {
            for (const nutrient in food.nutrientsConsumed) {
              if (consumption.hasOwnProperty(nutrient)) {
                consumption[nutrient] +=
                  Math.round(food.nutrientsConsumed[nutrient] * 100) / 100;
              } else {
                consumption[nutrient] =
                  Math.round(food.nutrientsConsumed[nutrient] * 100) / 100;
              }
            }
          }
        }
        delete consumption.serving_amount;
        delete consumption.serving_size;
        delete consumption.consumption_in_grams;
        setNutrientsConsumed({ ...consumption });
      });
  }, [activeMeal, uid]);

  useEffect(() => {
    setGraphData([
      nutrientsConsumed.total_fat,
      nutrientsConsumed.total_carbohydrate,
      nutrientsConsumed.protein,
    ]);
  }, [nutrientsConsumed]);

  return (
    <Col xs={24} md={6} lg={8}>
      {activeMeal ? (
        <Card
          className='dailyStatsCard'
          title={<HorizontalBarChart graphData={graphData} />}
          bordered={false}
        >
          <DailyStats nutrientsConsumed={nutrientsConsumed} />
        </Card>
      ) : (
        <></>
      )}
    </Col>
  );
};

const mapStateToProps = state => {
  return {
    uid: state.firebase.auth.uid,
    activeMeal: state.DietReducer.activeMeal,
  };
};
export default connect(mapStateToProps)(DietDetails);
