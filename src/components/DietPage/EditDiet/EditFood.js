import React, { useState, useEffect } from "react";
import { Select, Button, InputNumber, Space } from "antd";
import { connect } from "react-redux";

import { SetMeal } from "../../../redux/actions/DietActions";

import applyChanges from "./EditFoodApplyChanges";

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
    const [isEditInputDisabled, setIsEditInputDisabled] = useState(true);
    const [amount, setAmount] = useState();
    const [newServingSizeObj, setNewServingSizeObj] = useState({});

    //
    // SERVING SIZE CREATION STARTS HERE
    //

    useEffect(() => {
        setNewServingOptionsArr(servingOptions(food));
    }, [editTarget]);

    const servingOptions = food => {
        const newOptions = food.alt_measures.map((type, index) => {
            return (
                <Option value={type.measure} data={type} key={index}>
                    {type.measure}
                </Option>
            );
        });
        return newOptions;
    };

    const handleServingSize = servingSize => {
        setIsEditInputDisabled(false);
        const newServingSizeObj = editTarget.alt_measures.find(
            type => type.measure === servingSize
        );
        setNewServingSizeObj(newServingSizeObj);
    };

    //
    // SERVING SIZE CREATION ENDS HERE
    //

    const handleAmount = e => {
        setAmount(e);
    };

    const handleApplyButton = () => {
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
            alert("You need to make an input!");
        }
    };
    return (
        <>
            <Space>
                {food.food_name}

                <Select
                    style={{
                        display: `${
                            editTarget.id === food.id ? "inline-block" : "none"
                        }`,
                        width: "10vw",
                    }}
                    placeholder="serving size"
                    onChange={handleServingSize}
                >
                    {newServingOptionsArr ? newServingOptionsArr : ""}
                </Select>
                <InputNumber
                    min={0.001}
                    max={999999}
                    disabled={isEditInputDisabled}
                    onChange={handleAmount}
                    style={{
                        display: `${
                            editTarget.id === food.id ? "inline-block" : "none"
                        }`,
                        width: "4vw",
                    }}
                />
                <Button
                    style={{
                        display: `${
                            editTarget.id === food.id ? "inline-block" : "none"
                        }`,
                        width: "5vw",
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
