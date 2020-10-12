import React from "react";
import { Col, Collapse, Menu, Dropdown, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { CreateMeal, AddFood } from "../redux/actions/DietActions";
import db from "../firebaseConfig";
import { Redirect } from "react-router-dom";

const { Panel } = Collapse;
const { Search } = Input;

const ManageDiet = props => {
    //meal dropdown menu on left
    const menu = (
        <Menu>
            <Menu.Item onClick={() => handleMealSelection("Breakfast", 0)}>
                Breakfast
            </Menu.Item>
            <Menu.Item onClick={() => handleMealSelection("Lunch", 1)}>
                Lunch
            </Menu.Item>
            <Menu.Item onClick={() => handleMealSelection("Dinner", 2)}>
                Dinner
            </Menu.Item>
            <Menu.Item onClick={() => handleMealSelection("Snack", 3)}>
                Snack
            </Menu.Item>
        </Menu>
    );

    // this state is created only to trigger useeffect.
    const [effectTrigger, setEffectTrigger] = React.useState([]);

    // Allows user to create meals,
    const handleMealSelection = (mealNameInDropDown, mealOrder) => {
        console.log(
            "handleMealSelection=>",
            mealNameInDropDown,
            "was added with order of",
            mealOrder
        );
        props.newMeal(mealNameInDropDown, mealOrder);
        setEffectTrigger(mealNameInDropDown);
        console.log("propsdiet is", props.diet);
    };

    //stores meals locally and reflects on screen
    const [meals, setMeals] = React.useState([]);

    //this shouldn't be called if props.uid is false
    React.useEffect(() => {
        if (props.uid) {
            db.collection("users")
                .doc(props.uid)
                .onSnapshot(function (doc) {
                    const reFormattedMeals = Object.entries(doc.data().diet);
                    // for ease of use meals obj turned into arr
                    // each meal is an array made of 2 element,
                    //First one is meal id,
                    //second is array of food list
                    setMeals(reFormattedMeals);
                });
        } else {
            console.log("To acces diet section, you need to log in first");
        }
    }, [effectTrigger]);

    // checks whether user is logged in
    if (props.uid) {
        const handleAddFood = (mealName, food, mealOrder) => {
            console.log(
                "handleAddFood=>",
                food,
                "was added to",
                mealName,
                "with order of",
                mealOrder
            );
            props.addFood(mealName, food, mealOrder);
            setEffectTrigger(food);
            console.log("propsdiet is", props.diet);
        };
        return (
            <Col xs={24} sm={24} md={6} lg={6} xl={4}>
                <Dropdown overlay={menu}>
                    <a
                        className="ant-dropdown-link"
                        onClick={e => e.preventDefault()}
                    >
                        <PlusOutlined /> Add Meal
                    </a>
                </Dropdown>

                <Collapse>
                    {meals.map(meal => {
                        // console.log("meal", meal);
                        // console.log("meals", meals);
                        // console.log("meal is", meal);
                        const mealNames = {
                            0: "Breakfast",
                            1: "Lunch",
                            2: "Dinner",
                            3: "Snack",
                        };
                        const mealId = meal[0];
                        const foodList = meal[1];
                        // console.log("foodlist is : ", foodList);
                        const mealName = mealNames[mealId];

                        return (
                            <Panel header={mealName} key={mealId}>
                                <Search
                                    reset
                                    placeholder="add food"
                                    enterButton={<PlusOutlined />}
                                    onSearch={food =>
                                        handleAddFood(mealName, food, mealId)
                                    }
                                />
                                {
                                    <ul>
                                        {foodList.map((food, id) => (
                                            <li key={id}>{food}</li>
                                        ))}
                                    </ul>
                                }
                            </Panel>
                        );
                    })}
                </Collapse>
            </Col>
        );
    } else {
        return <Redirect to="/login" />;
    }
};

const mapStateToProps = state => {
    return {
        uid: state.firebase.auth.uid,
        diet: state.DietReducer,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        newMeal: (mealName, mealOrder) =>
            dispatch(CreateMeal(mealName, mealOrder)),
        addFood: (mealName, food, mealOrder) =>
            dispatch(AddFood(mealName, food, mealOrder)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDiet);
