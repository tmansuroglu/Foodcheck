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
    //meal dropdown
    const menu = (
        <Menu>
            <Menu.Item
                onClick={() => handleMealSelection("Breakfast", 0)}
                id="0"
            >
                Breakfast
            </Menu.Item>
            <Menu.Item onClick={() => handleMealSelection("Lunch", 1)} id="1">
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

    const [effectTrigger, setEffectTrigger] = React.useState([]);
    // Allows user to create meals,
    const handleMealSelection = (mealNameInDropDown, mealOrder) => {
        props.newMeal(mealNameInDropDown, mealOrder);
        setEffectTrigger(mealNameInDropDown);
    };
    const [meals, setMeals] = React.useState([]);
    React.useEffect(() => {
        db.collection("users")
            .doc(props.uid)
            .onSnapshot(function (doc) {
                console.log(Object.entries(doc.data().diet));
                setMeals(Object.entries(doc.data().diet)); //data is not ordered
                //console.log("meals are", meals);
            });
    }, [effectTrigger]);
    const handleAddFood = (mealName, food, mealOrder) => {
        console.log(food, "was added to", mealName);
        props.addFood(mealName, food, mealOrder);
        setEffectTrigger(food);
    };
    if (props.uid) {
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
                    {meals.map((meal, id) => {
                        const mealName = Object.keys(meal[1])[0];
                        const foodArr = Object.values(meal[1])[0];
                        const mealOrder = meal[0]; //necessary for displaying meals in same order
                        console.log(foodArr);

                        return (
                            <Panel header={mealName} key={id}>
                                <Search
                                    reset
                                    placeholder="add food"
                                    enterButton={<PlusOutlined />}
                                    onSearch={food =>
                                        handleAddFood(mealName, food, mealOrder)
                                    }
                                />
                                <ul>
                                    {foodArr.map(food => (
                                        <li>{food}</li>
                                    ))}
                                </ul>
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
