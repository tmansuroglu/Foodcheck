import React from "react";
import { Button, Dropdown } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import menu from "./Menu";
import {
    CreateMeal,
    ActiveMeal,
    SetDiet,
} from "../../../redux/actions/DietActions";

const MealCreator = ({ userData, createMeal, setActiveMeal }) => {
    const handleCreateMeal = mealName => {
        if (userData.diet[mealName]) {
            alert(`You already created ${mealName}`);
        } else {
            createMeal(mealName);
            setActiveMeal(mealName, []);
        }
    };

    return (
        <>
            <Dropdown overlay={menu(handleCreateMeal)}>
                <Button
                    className="ant-dropdown-link"
                    onClick={e => e.preventDefault()}
                >
                    <PlusOutlined /> Add Meal
                </Button>
            </Dropdown>
        </>
    );
};

const mapStateToProps = state => {
    return {
        userData: state.firebase.profile,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createMeal: mealName => dispatch(CreateMeal(mealName)),
        setActiveMeal: (mealName, foodContent) =>
            dispatch(ActiveMeal(mealName, foodContent)),
        setDiet: dietData => dispatch(SetDiet(dietData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MealCreator);
