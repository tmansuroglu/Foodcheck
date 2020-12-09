import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Typography } from 'antd';
import { propTypes } from 'react-bootstrap/esm/Image';
import HorizontalBarChart from '../HorizontalBarChart';
import DoughnutChart from '../DoughnutChart';
import DailyStatsList from '../DailyStatsList';
import db from '../../../firebaseConfig';
import './index.css';

const PROTEIN_MULTIPLIER = 4;
const CARBOHYDRATE_MULTIPLIER = 4;
const FAT_MULTIPLIER = 9;

const DietDetails = ({ activeMeal, userId }) => {
  const { Title } = Typography;
  const [nutrientsConsumed, setNutrientsConsumed] = useState({});
  const [horizontalBarChartData, setHorizontalBarChartData] = useState([]);
  const [doughnutChartData, setDoughnutChartData] = useState([]);
  const [totalKcal, setTotalKcal] = useState(0);

  // whenever user or active meal changes recalculated total calories and nutrients consumed
  // and stores them inside totalKcal and nutrientsConsumed
  useEffect(() => {
    if (userId && activeMeal) {
      db.collection('users')
        .doc(userId)
        .get()
        .then(userData => {
          const consumption = {};
          let calories = 0;
          // diet is and object with meals as properties. Each meal is an array of objects(food).
          const { diet } = userData.data();
          // array of meal content for example [[...breakfastContent],[...dinnerContent]]
          const mealsContentArr = Object.values(diet);
          for (let i = 0; i < mealsContentArr.length; i += 1) {
            // example [{...breadContent},{...cheeseContent}]
            const meal = mealsContentArr[i];
            for (let k = 0; k < meal.length; k += 1) {
              const food = meal[k];
              // example [["sugar",0],["protein",50]]
              const nutrientAndConsumptionArr = Object.entries(
                food.nutrientsConsumed
              );
              for (let j = 0; j < nutrientAndConsumptionArr.length; j += 1) {
                const nutrientAndConsumption = nutrientAndConsumptionArr[j];
                const nutrientName = nutrientAndConsumption[0];
                const consumptionAmount = nutrientAndConsumption[1];
                if (
                  Object.prototype.hasOwnProperty.call(
                    consumption,
                    nutrientName
                  )
                ) {
                  consumption[nutrientName] += Math.round(consumptionAmount);
                } else if (nutrientName === 'calories') {
                  calories += consumptionAmount;
                } else {
                  consumption[nutrientName] = Math.round(consumptionAmount);
                }
              }
            }
          }
          // these are deleted because these wont be displayed on stats card
          delete consumption.serving_amount;
          delete consumption.serving_size;
          delete consumption.consumption_in_grams;
          setNutrientsConsumed({ ...consumption });
          setTotalKcal(Number((calories * 100) / 100).toFixed(2));
        });
    }
  }, [activeMeal, userId]);

  useEffect(() => {
    setHorizontalBarChartData([
      nutrientsConsumed.total_fat,
      nutrientsConsumed.total_carbohydrate,
      nutrientsConsumed.protein,
    ]);
  }, [nutrientsConsumed]);

  // multiplier is needed because dougnut chart works with calories and each nutrient has different calorie value
  // for example 1 gram of fat is 9 calories
  useEffect(() => {
    setDoughnutChartData([
      nutrientsConsumed.total_fat * FAT_MULTIPLIER,
      nutrientsConsumed.total_carbohydrate * CARBOHYDRATE_MULTIPLIER,
      nutrientsConsumed.protein * PROTEIN_MULTIPLIER,
    ]);
  }, [nutrientsConsumed]);

  const shouldShowStatsCard = Boolean(activeMeal);

  if (!shouldShowStatsCard) {
    return null;
  }
  return (
    <Card
      className='dailyStatsCard'
      title={
        <Title level={3} className='dailyStatsCardTitle'>
          Daily Consumption
        </Title>
      }
      bordered={false}
    >
      <div className='doughnutChart'>
        <DoughnutChart
          graphData={doughnutChartData}
          totalKcal={totalKcal}
          className='doughnutChart'
        />
      </div>

      <HorizontalBarChart graphData={horizontalBarChartData} />
      <Title level={3} className='dailyStatsCardTitle'>
        Total Nutrients
      </Title>
      <DailyStatsList nutrientsConsumed={nutrientsConsumed} />
    </Card>
  );
};

DietDetails.defaultProps = {
  activeMeal: {},
  userId: '',
};

DietDetails.propTypes = {
  activeMeal: propTypes.object,
  userId: propTypes.string,
};

const mapStateToProps = state => {
  return {
    userId: state.firebase.auth.uid,
    // check src/redux/reducers/DietReducer for details
    activeMeal: state.DietReducer.activeMeal,
  };
};
export default connect(mapStateToProps)(DietDetails);
