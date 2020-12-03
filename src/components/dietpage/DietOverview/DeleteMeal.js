import React, { useState, useEffect } from "react";
import { Typography, Modal } from "antd";

import { ActiveMeal, SetDiet } from "../../../redux/actions/DietActions";
import { connect } from "react-redux";

const DeleteMeal = ({ setActiveMeal, activeMeal, setDiet, meals }) => {
    const { Text } = Typography;

    const [modalVisibility, setModalVisibility] = useState(false);
    const [activeMealName, setActiveMealName] = useState();
    const [activeMealContent, setActiveMealContent] = useState();

    useEffect(() => {
        if (activeMeal) {
            setActiveMealName(Object.keys(activeMeal)[0]);
            setActiveMealContent(Object.values(activeMeal)[0]);
        }
    }, [activeMeal]);

    const handleDelete = () => {
        setModalVisibility(true);
    };

    const deleteMeal = () => {
        const reducer = (acc, curr) => {
            if (Object.keys(curr)[0] !== activeMealName) {
                acc.push(curr);
            }
            return acc;
        };
        const fixedMeals = meals.reduce(reducer, []);

        const newState = {};
        fixedMeals.forEach(meal => {
            const key = Object.keys(meal)[0];
            const value = Object.values(meal)[0];

            newState[key] = value;
        });
        setDiet(newState);
        setModalVisibility(false);
        setActiveMeal("");
    };

    return (
        <>
            <Modal
                title="Are you sure?"
                style={{ top: 20 }}
                visible={modalVisibility}
                onOk={deleteMeal}
                onCancel={() => setModalVisibility(false)}
            >
                <p>Deleted meals can't be recovered!</p>
            </Modal>
            <Text
                style={{
                    float: "right",
                    fontSize: "0.8rem",
                }}
                type="danger"
                onClick={e => handleDelete(activeMealName, activeMealContent)}
            >
                Delete
            </Text>
        </>
    );
};

const mapStateToProps = state => {
    if (state.DietReducer.activeMeal)
        return {
            activeMeal: state.DietReducer.activeMeal,
        };
    else {
        return {};
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setActiveMeal: (mealName, foodContent) =>
            dispatch(ActiveMeal(mealName, foodContent)),
        setDiet: dietData => dispatch(SetDiet(dietData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteMeal);
