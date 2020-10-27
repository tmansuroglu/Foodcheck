import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    Typography,
    Space,
    AutoComplete,
    Select,
    InputNumber,
    Button,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { querySearch, getDetails } from '../../../nutritionixAPI';
import foodAdder from './SearchBarAddFood';
import { AddFood, setFoodDetails } from '../../../redux/actions/DietActions';

import { SetMeal } from '../../../redux/actions/DietActions';

const SearchBar = ({
    setFoodDetails,
    activeMealName,
    createdFood,
    addFood,
    activeMealContent,
    setMeal,
}) => {
    const { Title } = Typography;
    const { Option } = Select;

    const NUM_DESIRED_RESULTS = 5;

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
        console.log('meas');
    }

    useEffect(() => {
        if (createdFood && createdFood.alt_measures) {
            const searchBarServingSizes = createdFood.alt_measures.map(
                (measureObj, index) => {
                    return (
                        <Option value={measureObj.measure} key={index}>
                            {measureObj.measure}
                        </Option>
                    );
                }
            );

            setSearchBarServingOptions(searchBarServingSizes);
        }
    }, [createdFood]);

    //
    // SERVING SIZE HANDLING ENDS HERE
    //

    const handleAmount = value => {
        console.log(value);
        setSearchBarFoodAmount(value);
    };

    const handleAddFood = () => {
        if (createdFood) {
            console.log(createdFood);
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

    return (
        <div align='center'>
            <Title style={{ textAlign: 'center' }} level={3}>
                {activeMealName}
            </Title>
            <Space>
                <AutoComplete
                    style={{ width: 190 }}
                    options={queryResults}
                    placeholder='Add food here...'
                    onSearch={handleSearch}
                    onSelect={foodName =>
                        handleSelectAutoCompleteResult(foodName)
                    }
                    filterOption={(inputValue, option) =>
                        option.value
                            .toUpperCase()
                            .indexOf(inputValue.toUpperCase()) !== -1
                    }
                />
                <Select
                    style={{ width: 140 }}
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
        activeMealContent: Object.values(state.DietReducer.activeMeal)[0],
        activeMealName: Object.keys(state.DietReducer.activeMeal)[0],
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setFoodDetails: details => dispatch(setFoodDetails(details)),
        addFood: (mealName, mealContent) =>
            dispatch(AddFood(mealName, mealContent)),
        setMeal: (mealName, mealData) => dispatch(SetMeal(mealName, mealData)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
