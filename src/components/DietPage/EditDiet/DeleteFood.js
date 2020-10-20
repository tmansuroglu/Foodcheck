import React from "react";
import { connect } from "react-redux";
import { SetMeal } from "../../../redux/actions/DietActions";
import { Button } from "antd";

const DeleteFood = ({ setMeal, activeMealContent, activeMealName, food }) => {
    const handleDeleteButton = async targetFood => {
        const targetFoodObj = activeMealContent.find(
            food => food.id === targetFood.id
        );
        const reducer = (acc, cur) => {
            if (cur.food_name !== targetFoodObj.food_name) {
                acc.push(cur);
            }
            return acc;
        };
        const newMealContent = activeMealContent.reduce(reducer, []);
        setMeal(activeMealName, newMealContent);
    };

    return <Button onClick={e => handleDeleteButton(food)}>delete</Button>;
};

const mapStateToProps = state => {
    if (state.DietReducer.activeMeal) {
        return {
            activeMealContent: Object.values(state.DietReducer.activeMeal)[0],
            activeMealName: Object.keys(state.DietReducer.activeMeal)[0],
        };
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setMeal: (mealName, mealData) => dispatch(SetMeal(mealName, mealData)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DeleteFood);
