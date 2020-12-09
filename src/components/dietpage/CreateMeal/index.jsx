import React from 'react';
import { Button, Dropdown, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { propTypes } from 'react-bootstrap/esm/Image';
import CreateMealOptions from '../CreateMealOptions';
import {
  createMeal as reduxCreateMeal,
  activeMeal as reduxSetActiveMeal,
} from '../../../redux/actions/DietActions';
import './index.css';

// props are passed from redux check bottom of this file
// this component is used inside src/components/dietpage/DietOverview component
const CreateMeal = ({ userData, mealCreator, setActiveMeal }) => {
  const mealCreationError = () => message.error('Meal is already created');
  const handleCreateMeal = mealName => {
    const doesMealExist = Object.prototype.hasOwnProperty.call(
      userData.diet,
      mealName
    );

    if (doesMealExist) {
      mealCreationError();
    } else {
      mealCreator(mealName);
      // [] refers to meal content
      setActiveMeal(mealName, []);
    }
  };

  return (
    <>
      <Dropdown
        overlay={<CreateMealOptions handleMealCreation={handleCreateMeal} />}
      >
        <Button className='ant-dropdown-link' onClick={e => e.preventDefault()}>
          <PlusOutlined />
          Add Meal
        </Button>
      </Dropdown>
    </>
  );
};

const mapStateToProps = state => {
  return {
    // check src/index.js to see how firebase data is stored in redux
    userData: state.firebase.profile,
  };
};

CreateMeal.defaultProps = {
  setActiveMeal: () => [],
  userData: {},
  mealCreator: () => {},
};

CreateMeal.propTypes = {
  mealCreator: propTypes.func,
  setActiveMeal: propTypes.func,
  userData: propTypes.object, // eslint-disable-line
};

const mapDispatchToProps = dispatch => {
  return {
    // check src/redux/actions too see details dispatched actions
    mealCreator: mealName => dispatch(reduxCreateMeal(mealName)),
    setActiveMeal: (mealName, foodContent) =>
      dispatch(reduxSetActiveMeal(mealName, foodContent)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateMeal);
