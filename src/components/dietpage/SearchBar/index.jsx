import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Space, AutoComplete, Select, InputNumber, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { querySearch, getDetails } from '../../../nutritionixAPI';
import foodAdder from '../searchBarAddFood';
import {
  AddFood as reduxAddFood,
  setFoodDetails as reduxSetFoodDetails,
  SetMeal as reduxSetMeal,
} from '../../../redux/actions/DietActions';
import './index.css';

const NUM_DESIRED_RESULTS = 5;

const SearchBar = ({
  setFoodDetails,
  activeMeal,
  createdFood,
  addFood,
  setMeal,
}) => {
  const [activeMealName, setActiveMealName] = useState('');
  const [activeMealContent, setActiveMealContent] = useState([]);
  useEffect(() => {
    if (activeMeal) {
      setActiveMealName(Object.keys(activeMeal)[0]);
      setActiveMealContent(Object.values(activeMeal)[0]);
    }
  }, [activeMeal]);
  const { Option } = Select;
  const [queryResults, setQueryResults] = useState([]);
  const [inputToggle, setInputToggle] = useState(true);
  const [searchBarServingOptions, setSearchBarServingOptions] = useState();
  const [searchBarServingSize, setSearchBarServingSize] = useState();
  const [searchBarFoodAmount, setSearchBarFoodAmount] = useState('1');

  //
  // AUTOCOMPLETE SEARCH HANDLING STARTS HERE
  //

  const handleSearch = input => {
    querySearch(input)
      .then(result => {
        setQueryResults([]);
        const results = [];
        const data = Object.values(result);

        for (let i = 0; i < data.length; i++) {
          if (i < NUM_DESIRED_RESULTS) {
            results.push({ value: data[i].food_name });
          }
        }
        setQueryResults(results);
      })
      .catch(err => err);
  };

  const handleSelectAutoCompleteResult = async foodName => {
    const details = await getDetails(foodName);
    setFoodDetails(details);
  };

  //
  // AUTOCOMPLETE SEARCH HANDLING ENDS HERE
  //

  //
  // SERVING SIZE HANDLING STARTS HERE
  //
  function onMeasureChange(value) {
    setSearchBarServingSize(value);
    setInputToggle(false);
  }

  useEffect(() => {
    if (createdFood && createdFood.alt_measures) {
      const searchBarServingSizes = createdFood.alt_measures.map(measureObj => {
        return (
          <Option value={measureObj.measure} key={measureObj.measure}>
            {measureObj.measure}
          </Option>
        );
      });

      setSearchBarServingOptions(searchBarServingSizes);
    }
  }, [createdFood]);

  //
  // SERVING SIZE HANDLING ENDS HERE
  //

  const handleAmount = value => {
    setSearchBarFoodAmount(value);
  };

  const handleAddFood = () => {
    if (createdFood) {
      const newFood = foodAdder(
        addFood,
        createdFood,
        activeMealName,
        searchBarServingSize,
        searchBarFoodAmount
      );
      setMeal(activeMealName, [...activeMealContent, newFood]);
    }
  };
  if (!activeMealContent) return null;
  return (
    <div align='center'>
      <Space>
        <AutoComplete
          className='autoComplete'
          options={queryResults}
          placeholder='Add food here...'
          onSearch={handleSearch}
          onSelect={foodName => handleSelectAutoCompleteResult(foodName)}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        />
        <Select
          className='servingSizeOption'
          placeholder='serving size'
          onChange={onMeasureChange}
        >
          {searchBarServingOptions ? searchBarServingOptions : ''}
        </Select>
        <InputNumber
          min={0.001}
          max={999999}
          disabled={inputToggle}
          defaultValue={1}
          onChange={handleAmount}
        />
        <Button disabled={inputToggle} onClick={handleAddFood}>
          <PlusOutlined />
        </Button>
      </Space>
      <br />
      <br />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    createdFood: state.DietReducer.foodDetails,
    activeMeal: state.DietReducer.activeMeal,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFoodDetails: details => dispatch(reduxSetFoodDetails(details)),
    addFood: (mealName, mealContent) =>
      dispatch(reduxAddFood(mealName, mealContent)),
    setMeal: (mealName, mealData) => dispatch(reduxSetMeal(mealName, mealData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
