import React, { useState, useEffect } from "react";
import { Col } from "antd";
import { connect } from "react-redux";
import { setStats } from "../redux/actions/DietActions";
import db from "../firebaseConfig";
import { Pie } from "react-chartjs-2";
const DietDetails = ({ uid, selectedMeal, setAllStats }) => {
    const [mealsMacros, setMealsMacros] = useState();
    const [dailyMacros, setDailyMacros] = useState();
    useEffect(() => {
        db.collection("users")
            .doc(uid)
            .onSnapshot(function (doc) {
                const dietData = doc.data().diet;
                //console.log("dietData", dietData);
                const allMeals = Object.entries(dietData);
                const mealsStats = {
                    Breakfast: {},
                    Lunch: {},
                    Dinner: {},
                    "Pre-Breakfast Snack": {},
                    "Pre-Lunch Snack": {},
                    "Pre-Dinner Snack": {},
                    "Pre-Sleep Snack": {},
                };
                allMeals.forEach(meal => {
                    const mealMacros = {};
                    const mealName = meal[0];
                    const mealContent = meal[1];
                    //console.log("mealContent", mealContent);

                    mealContent.forEach(food => {
                        const nutrients = Object.entries(
                            food.nutrientsConsumed
                        );
                        nutrients.forEach(nutrient => {
                            const nutrientName = nutrient[0];
                            const nutrientValue = nutrient[1];
                            if (nutrientName !== "serving_size") {
                                mealsStats[mealName][nutrientName] = mealsStats[
                                    mealName
                                ][nutrientName]
                                    ? Math.round(
                                          (mealsStats[mealName][nutrientName] +
                                              nutrientValue) *
                                              100
                                      ) / 100
                                    : Math.round(nutrientValue * 100) / 100;
                            }
                        });
                    });
                    setMealsMacros(mealsStats);
                });
                console.log("meal stats are", mealsStats);
                const totalStats = {};
                //console.log(Object.values(mealsStats));
                const allNutrients = Object.values(mealsStats);
                allNutrients.forEach(nutrientsPerMealObj => {
                    const nutrientsPerMealArr = Object.entries(
                        nutrientsPerMealObj
                    );
                    nutrientsPerMealArr.forEach(nutrient => {
                        const nutrientName = nutrient[0];
                        const nutrientValue = nutrient[1];
                        totalStats[nutrientName] = totalStats[nutrientName]
                            ? Math.round(
                                  (totalStats[nutrientName] + nutrientValue) *
                                      100
                              ) / 100
                            : Math.round(nutrientValue * 100) / 100;
                    });
                });
                console.log("totalStats", totalStats);
                setDailyMacros(totalStats);
            });
        setAllStats(dailyMacros, mealsMacros);
    }, [selectedMeal]);
    const data = {
        labels: ["a", "b", "c"],
        datasets: [
            {
                hoverBackgroundColor: ["yellow", "black", "purple"],
                weight: ["1", "5", "35"],
                label: "fat",
                data: [1, 2, 3],
                backgroundColor: ["red", "green", "pink"],
            },
        ],
    };
    return (
        <Col xs={24} sm={24} md={6} lg={8} xl={6} xxl={6}>
            <Pie
                //hover={true}
                data={data}
                options={{
                    maintainAspectRatio: false,
                    tooltips: {
                        enabled: true,
                    },
                    responsive: true,
                    title: { display: true, text: "hello" },
                    legend: {
                        display: true,
                        position: "bottom",
                    },
                }}
            />
        </Col>
    );
};

const mapStateToProps = state => {
    return {
        selectedMeal: state.DietReducer.activeMeal,
        uid: state.firebase.auth.uid,
    };
};

const dispatchStateToProps = dispatch => {
    return {
        setAllStats: (dailyMacros, mealMacros) =>
            dispatch(setStats(dailyMacros, mealMacros)),
    };
};
export default connect(mapStateToProps, dispatchStateToProps)(DietDetails);
