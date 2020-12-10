import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AutoComplete, Select, InputNumber, Button, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { querySearch, getDetails } from '../../../nutritionixAPI';
import foodAdder from '../searchBarAddFood';
import {
  AddFood as reduxAddFood,
  setFoodDetails as redusmetFoodDetails,
  SetMeal as redusmetMeal,
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
  const [searchBarServingOptions, setSearchBarServingOptions] = useState([]);
  const [searchBarServingSize, setSearchBarServingSize] = useState();
  const [searchBarFoodAmount, setSearchBarFoodAmount] = useState('1');

  const handleSearch = input => {
    querySearch(input)
      .then(result => {
        setQueryResults([]);
        const results = [];
        const data = Object.values(result);

        for (let i = 0; i < data.length; i += 1) {
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

  const [selectValue, setSelectValue] = useState('');

  function onMeasureChange(value) {
    setSearchBarServingSize(value);
    setInputToggle(false);
    setSelectValue(value);
  }

  useEffect(() => {
    if (createdFood && createdFood.alt_measures) {
      const searchBarServingSizes = createdFood.alt_measures.map(measureObj => {
        return (
          <Option value={measureObj.measure} key={measureObj.seq}>
            {measureObj.measure}
          </Option>
        );
      });

      setSearchBarServingOptions(searchBarServingSizes);
    }
  }, [createdFood]);

  const [inputValue, setInputvalue] = useState(1);

  const handleAmount = value => {
    setInputvalue(value);
  };

  useEffect(() => {
    setSearchBarFoodAmount(inputValue);
  }, [inputValue]);

  const [autoSearchValue, setAutoSearchValue] = useState('');

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
    setAutoSearchValue('');
    setSelectValue('');
    setInputvalue(1);
  };

  if (!activeMealContent) return null;
  return (
    <Row align='center' className='searchBar' gutter={16}>
      <Col>
        <AutoComplete
          value={autoSearchValue}
          className='autoComplete'
          options={queryResults}
          placeholder='Add food here...'
          onSearch={handleSearch}
          onSelect={foodName => handleSelectAutoCompleteResult(foodName)}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          onChange={e => setAutoSearchValue(e)}
        />
      </Col>
      <Col>
        <Select
          className='searchBarServingSizeOpt'
          placeholder='serving size'
          onChange={onMeasureChange}
          value={selectValue}
        >
          {searchBarServingOptions ? searchBarServingOptions : ''}
        </Select>
      </Col>
      <Col>
        <InputNumber
          min={0.001}
          max={999999}
          disabled={inputToggle}
          defaultValue={1}
          onChange={handleAmount}
          className='searchBarInput'
          value={inputValue}
        />
      </Col>
      <Col>
        <Button
          disabled={inputToggle}
          onClick={handleAddFood}
          className='searchBarButton'
        >
          <PlusOutlined />
        </Button>
      </Col>
    </Row>
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
    setFoodDetails: details => dispatch(redusmetFoodDetails(details)),
    addFood: (mealName, mealContent) =>
      dispatch(reduxAddFood(mealName, mealContent)),
    setMeal: (mealName, mealData) => dispatch(redusmetMeal(mealName, mealData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
