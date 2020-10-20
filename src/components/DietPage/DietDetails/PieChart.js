import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";

const PieChart = props => {
    const [chartData, setChartData] = useState();
    const [selectedMealArr, setSelectedMealArr] = useState([]);
    const [calories, setCalories] = useState([]);
    const [mealNames, setMealNames] = useState([]);

    useEffect(() => {
        setChartData({
            labels: mealNames,
            datasets: [
                {
                    hoverBackgroundColor: [
                        "#FCF4DE",
                        "#E3B698",
                        "#FAB5B6",
                        "#D29AE3",
                        "#B8B8FF",
                    ],
                    label: "fat",
                    data: calories,
                    backgroundColor: [
                        "#FAEBA0",
                        "#E3A15F",
                        "#FA7B75",
                        "#C862E3",
                        "#787FFF",
                    ],
                },
            ],
        });
    }, [mealNames]);

    useEffect(() => {
        if (props.mealsChartContent) {
            setSelectedMealArr(Object.values(props.mealsChartContent).flat());

            console.log(
                "selected meal arr",
                Object.values(props.mealsChartContent).flat()
            );
        }
    }, [props.mealsChartContent]);

    useEffect(() => {
        setCalories(
            selectedMealArr.map(el =>
                el ? Math.round(el.nutrientsConsumed.calories) : ""
            )
        );
        setMealNames(selectedMealArr.map(el => (el ? el.food_name : "")));
    }, [selectedMealArr]);
    return (
        <Pie
            hover={true}
            data={chartData}
            options={{
                maintainAspectRatio: false,
                cutoutPercentage: 70,
                tooltips: {
                    enabled: true,
                },
                responsive: true,
                title: {
                    display: true,
                    text: "Calories Distribution",
                },
                legend: {
                    display: true,
                    position: "bottom",
                },
            }}
        />
    );
};

const mapStateToProps = state => {
    return {
        uid: state.firebase.auth.uid,
        selectedMeal: state.DietReducer.activeMeal,
        mealsChartContent: state.DietReducer.activeMeal,
        mealsSet: state.DietReducer,
    };
};
export default connect(mapStateToProps)(PieChart);
