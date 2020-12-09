import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { SetMeal as reduxSetMeal } from '../../../redux/actions/DietActions';

// used inside src/components/dietpage/EditMeal
const DeleteFood = ({ setMeal, activeMealContent, activeMealName, food }) => {
  const handleDeleteButton = () => {
    // all requests from API have different id. Even same food same amount don't have same id
    const reducer = (acc, cur) => {
      if (cur.id !== food.id) {
        acc.push(cur);
      }
      return acc;
    };
    const newMealContent = activeMealContent.reduce(reducer, []);
    setMeal(activeMealName, newMealContent);
  };

  return <Button onClick={() => handleDeleteButton(food)}>delete</Button>;
};

DeleteFood.propTypes = {
  activeMealContent: propTypes.array, // eslint-disable-line
  activeMealName: propTypes.string,
  setMeal: propTypes.func,
  food: propTypes.object, // eslint-disable-line
};

DeleteFood.defaultProps = {
  activeMealContent: [],
  activeMealName: '',
  setMeal: x => x,
  food: {},
};

const mapStateToProps = state => {
  const doesActiveMealExist = Boolean(state.DietReducer.activeMeal);
  if (!doesActiveMealExist) {
    return {};
  }
  return {
    // activeMeal example {breakfast: [{...food},{...food}]}
    activeMealContent: Object.values(state.DietReducer.activeMeal)[0],
    activeMealName: Object.keys(state.DietReducer.activeMeal)[0],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMeal: (mealName, mealData) => dispatch(reduxSetMeal(mealName, mealData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DeleteFood);
