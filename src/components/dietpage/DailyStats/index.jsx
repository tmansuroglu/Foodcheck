import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Col } from 'antd';
import HorizontalBarChart from '../HorizontalBarChart';
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
                consumption[nutrient] += food.nutrientsConsumed[nutrient];
              } else {
                consumption[nutrient] = food.nutrientsConsumed[nutrient];
              }
            }
          }
        }
        delete consumption.serving_amount;
        delete consumption.serving_size;
        delete consumption.consumption_in_grams;
        console.log(consumption);
        setNutrientsConsumed({ ...consumption });
      });
  }, [activeMeal, uid]);

  useEffect(() => {
    setGraphData([
      Math.round(nutrientsConsumed.total_fat * 100) / 100,
      Math.round(nutrientsConsumed.total_carbohydrate * 100) / 100,
      Math.round(nutrientsConsumed.protein * 100) / 100,
    ]);
  }, [nutrientsConsumed]);

  return (
    <Col xs={24} md={6} lg={8}>
      {activeMeal ? (
        <Card
          className='dailyStatsCard'
          title={<HorizontalBarChart graphData={graphData} />}
          bordered={false}
        />
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
