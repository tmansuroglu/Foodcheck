import React, { useState, useEffect } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { Typography, Modal } from 'antd';
import { connect } from 'react-redux';
import {
  activeMeal as reduxSetActiveMeal,
  SetDiet,
} from '../../../redux/actions/DietActions';
import './index.css';

// used inside DietOverview
const DeleteMeal = ({ setActiveMeal, activeMeal, setDiet, meals }) => {
  const { Text } = Typography;
  const [modalVisibility, setModalVisibility] = useState(false);
  const [activeMealName, setActiveMealName] = useState('');
  const [activeMealContent, setActiveMealContent] = useState([]);

  useEffect(() => {
    // activeMeal example: {"breakfast":[{...food},{...food}]}
    if (activeMeal) {
      setActiveMealName(Object.keys(activeMeal)[0]);
      setActiveMealContent(Object.values(activeMeal)[0]);
    }
  }, [activeMeal]);

  const handleDelete = () => {
    setModalVisibility(true);
  };

  const deleteMeal = () => {
    const reducer = (acc, curr) => {
      const mealName = Object.keys(curr)[0];
      if (mealName !== activeMealName) {
        acc.push(curr);
      }
      return acc;
    };
    // example: [{brekfast:[...]},{dinner:[...]}]
    const processedMeals = meals.reduce(reducer, []);
    const newDiet = {};
    processedMeals.forEach(meal => {
      const mealName = Object.keys(meal)[0];
      const mealContent = Object.values(meal)[0];

      newDiet[mealName] = mealContent;
    });
    // newDiet example: {breakfast:[...],dinner:[...]}
    setDiet(newDiet);
    setModalVisibility(false);
    setActiveMeal({});
  };

  return (
    <>
      <Modal
        title='Are you sure?'
        className='modalDeleteMeal'
        visible={modalVisibility}
        onOk={deleteMeal}
        onCancel={() => setModalVisibility(false)}
      >
        <p>Deleted meals cant be recovered!</p>
      </Modal>
      <Text
        className='modalDeleteMealText'
        type='danger'
        onClick={() => handleDelete(activeMealName, activeMealContent)}
      >
        Delete
      </Text>
    </>
  );
};

// DeleteMeal.propTypes = {
//   setDiet: propTypes.func,
//   meals: propTypes.array, // eslint-disable-line
//   activeMeal: propTypes.object, // eslint-disable-line
//   setActiveMeal: propTypes.func,
// };
// DeleteMeal.defaultProps = {
//   setDiet: x => x,
//   meals: [],
//   activeMeal: {},
//   setActiveMeal: x => x,
// };

const mapStateToProps = state => {
  const doesActiveMealExist = Boolean(state.DietReducer.activeMeal);
  if (!doesActiveMealExist) {
    return {};
  }
  return {
    activeMeal: state.DietReducer.activeMeal,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveMeal: (mealName, foodContent) =>
      dispatch(reduxSetActiveMeal(mealName, foodContent)),
    setDiet: dietData => dispatch(SetDiet(dietData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteMeal);
