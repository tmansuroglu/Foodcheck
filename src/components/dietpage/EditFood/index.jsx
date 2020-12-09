import React, { useState, useEffect } from 'react';
import { Select, Button, InputNumber, Space, message } from 'antd';
import { connect } from 'react-redux';
import { SetMeal } from '../../../redux/actions/DietActions';
import applyChanges from '../editFoodApplyChanges';

const EditFood = ({
  setMeal,
  activeMealContent,
  activeMealName,
  food,
  setIsEditing,
  editTarget,
}) => {
  const { Option } = Select;
  const [newServingOptionsArr, setNewServingOptionsArr] = useState();
  // prevents user to make quantity input before selecting serving size
  const [isEditInputDisabled, setIsEditInputDisabled] = useState(true);
  const [amount, setAmount] = useState();
  const [newServingSizeObj, setNewServingSizeObj] = useState({});

  const servingOptions = foodObj => {
    const newOptions = foodObj.alt_measures.map(type => {
      return (
        <Option value={type.measure} data={type} key={type.measure}>
          {type.measure}
        </Option>
      );
    });
    return newOptions;
  };

  useEffect(() => {
    setNewServingOptionsArr(servingOptions(food));
  }, [editTarget, food]);

  const handleServingSize = selectedServingSize => {
    setIsEditInputDisabled(false);
    // a food obj contains alt_measures property that holds all possible serving size options(obj)
    const targetServingSizeObj = editTarget.alt_measures.find(
      servingObj => servingObj.measure === selectedServingSize
    );
    setNewServingSizeObj(targetServingSizeObj);
  };

  const handleAmount = e => {
    setAmount(e);
  };

  const inputError = () => message.error('You need to make an input!');

  const handleApplyButton = () => {
    // amount is the last input
    if (amount) {
      const modifiedMealContent = applyChanges(
        amount,
        activeMealContent,
        newServingSizeObj,
        editTarget
      );
      setMeal(activeMealName, modifiedMealContent);
      setIsEditing(false);
      setIsEditInputDisabled(true);
    } else {
      inputError();
    }
  };

  const isFoodEditable = editTarget.id === food.id;
  const editSectionDisplayStatus = isFoodEditable ? 'inline-block' : 'none';

  return (
    <>
      <Space>
        {food.food_name}

        <Select
          style={{
            display: editSectionDisplayStatus,
            width: '10vw',
          }}
          placeholder='serving size'
          onChange={handleServingSize}
        >
          {newServingOptionsArr ? newServingOptionsArr : ''}
        </Select>
        <InputNumber
          min={0.001}
          max={999999}
          disabled={isEditInputDisabled}
          onChange={handleAmount}
          style={{
            display: editSectionDisplayStatus,
            width: '4vw',
          }}
        />
        <Button
          style={{
            display: editSectionDisplayStatus,
            width: '5vw',
          }}
          disabled={isEditInputDisabled}
          onClick={handleApplyButton}
        >
          Apply
        </Button>
      </Space>
    </>
  );
};

const mapStateToProps = state => {
  return {
    activeMealContent: Object.values(state.DietReducer.activeMeal)[0],
    activeMealName: Object.keys(state.DietReducer.activeMeal)[0],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMeal: (mealName, mealData) => dispatch(SetMeal(mealName, mealData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditFood);
