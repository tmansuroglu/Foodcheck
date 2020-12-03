import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { SetMeal } from '../../../redux/actions/DietActions';
import sorter from '../sortConditions';
import SortOptions from '../SortFoodOptions';
import './index.css';

const Sort = ({ activeMealContent, activeMealName, setMeal }) => {
    const [sortType, setSortType] = useState();

    useEffect(() => {
        const sortedContent = sorter(activeMealContent, sortType);
        if (sortedContent) {
            setMeal(activeMealName, sortedContent);
        }
    }, [sortType, activeMealContent, activeMealName, setMeal]);

    return (
        <Select
            className='sortSelector'
            onChange={e => setSortType(e)}
            defaultValue='Sort By'
        >
            {SortOptions()}
        </Select>
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
export default connect(mapStateToProps, mapDispatchToProps)(Sort);
