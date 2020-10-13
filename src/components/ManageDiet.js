import React from "react";
import "./ManageDiet.css";
import { Col, Menu, Dropdown, Typography, Modal, Collapse } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
    CreateMeal,
    AddFood,
    ActiveMeal,
    SetDiet,
} from "../redux/actions/DietActions";
import db from "../firebaseConfig";
import { Redirect } from "react-router-dom";

const { Text } = Typography;
const { Panel } = Collapse;

const ManageDiet = props => {
    //meal dropdown menu on left
    const menu = (
        <Menu>
            <Menu.Item
                onClick={() => handleMealCreation("Pre-Breakfast Snack")}
            >
                Pre-Breakfast Snack
            </Menu.Item>
            <Menu.Item onClick={() => handleMealCreation("Breakfast")}>
                Breakfast
            </Menu.Item>
            <Menu.Item onClick={() => handleMealCreation("Pre-Lunch Snack")}>
                Pre-Lunch Snack
            </Menu.Item>
            <Menu.Item onClick={() => handleMealCreation("Lunch")}>
                Lunch
            </Menu.Item>
            <Menu.Item onClick={() => handleMealCreation("Pre-Dinner Snack")}>
                Pre-Dinner Snack
            </Menu.Item>
            <Menu.Item onClick={() => handleMealCreation("Dinner")}>
                Dinner
            </Menu.Item>
            <Menu.Item onClick={() => handleMealCreation("Pre-Sleep Snack")}>
                Pre-Sleep Snack
            </Menu.Item>
        </Menu>
    );
    const order = {
        "Pre-Breakfast Snack": 0,
        Breakfast: 1,
        "Pre-Lunch Snack": 2,
        Lunch: 3,
        "Pre-Dinner Snack": 4,
        Dinner: 5,
        "Pre-Sleep Snack": 6,
    };

    // this state is created only to trigger useeffect.
    const [effectTrigger, setEffectTrigger] = React.useState([]);

    // Allows user to create meals,
    const handleMealCreation = mealName => {
        props.newMeal(mealName);
        setEffectTrigger(mealName);
    };

    //stores meals locally and reflects on screen
    const [meals, setMeals] = React.useState([]);

    React.useEffect(() => {
        if (props.uid) {
            db.collection("users")
                .doc(props.uid)
                .onSnapshot(function (doc) {
                    const dietData = doc.data().diet;
                    const orderedDietData = [];
                    for (const meal in dietData) {
                        if (meal) {
                        }
                        //console.log(meal);
                        const index = order[meal];

                        //console.log("meal is", meal, "at index", index);
                        orderedDietData[index] = {
                            [meal]: dietData[meal],
                        };
                    }
                    //console.log(orderedDietData);
                    setMeals(orderedDietData);
                });
        } else {
            console.log("To acces diet section, you need to log in first");
        }
    }, [effectTrigger]);

    const [modalVisibility, setModalVisibility] = React.useState(false);
    const [deleteTarget, setDeleteTarget] = React.useState([]);
    const handleDelete = (mealName, mealContent) => {
        console.log("meal to be deleted =>", mealName, mealContent);
        setModalVisibility(true);
        setDeleteTarget({ [mealName]: mealContent });
    };

    const handleMealDeletion = () => {
        const targetMeal = meals.find(meal => {
            if (meal) {
                const dbKey = Object.keys(meal)[0];
                //console.log(dbKey);
                const targetKey = Object.keys(deleteTarget)[0];
                //console.log(targetKey);
                return dbKey === targetKey;
            }
        });
        //console.log(targetMeal);

        const reducer = (acc, curr) => {
            if (curr !== targetMeal) {
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
        //console.log("oldState is", meals);
        //console.log("newState is", newState);
        props.setDiet(newState);
        setModalVisibility(false);
    };
    function handleMouseOver(mealName, mealContent) {
        console.log("active meal has changed");
        props.activeMeal(mealName, mealContent);
        console.log(props.findActiveMeal);
    }
    // checks whether user is logged in
    if (props.uid) {
        return (
            <Col xs={24} sm={24} md={6} lg={6} xl={4}>
                <Modal
                    title="Are you sure?"
                    style={{ top: 20 }}
                    visible={modalVisibility}
                    onOk={handleMealDeletion}
                    onCancel={() => setModalVisibility(false)}
                >
                    <p>Deleted meals can't be recovered!</p>
                </Modal>
                <Dropdown overlay={menu}>
                    <a
                        className="ant-dropdown-link"
                        onClick={e => e.preventDefault()}
                    >
                        <PlusOutlined /> Add Meal
                    </a>
                </Dropdown>
                {
                    <Collapse>
                        {meals.map((meal, id) => {
                            const mealName = Object.keys(meal)[0];
                            const mealContent = Object.values(meal)[0];
                            //console.log(mealName, mealContent);
                            return (
                                <Panel
                                    onClick={e => console.log(e)}
                                    key={id}
                                    header={
                                        <>
                                            <div
                                                onMouseOver={e =>
                                                    handleMouseOver(
                                                        mealName,
                                                        mealContent
                                                    )
                                                }
                                                style={{ float: "left" }}
                                            >
                                                {mealName}
                                            </div>
                                            <Text
                                                style={{
                                                    float: "right",
                                                    fontSize: "0.8rem",
                                                }}
                                                type="danger"
                                                onClick={e =>
                                                    handleDelete(
                                                        mealName,
                                                        mealContent
                                                    )
                                                }
                                            >
                                                Delete
                                            </Text>
                                        </>
                                    }
                                ></Panel>
                            );
                        })}
                    </Collapse>
                }
            </Col>
        );
    } else {
        // route guard is in wrong place. this is a component, not container
        return <Redirect to="/login" />;
    }
};

const mapStateToProps = state => {
    return {
        uid: state.firebase.auth.uid,
        findActiveMeal: state.DietReducer.activeMeal,
        dietData: state.DietReducer.diet,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        newMeal: mealName => dispatch(CreateMeal(mealName)),
        activeMeal: (mealName, foodContent) =>
            dispatch(ActiveMeal(mealName, foodContent)),
        setDiet: dietData => dispatch(SetDiet(dietData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDiet);
