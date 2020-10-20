import React, { useEffect, useState } from "react";
import { HorizontalBar } from "react-chartjs-2";
import db from "../../../firebaseConfig";
import { connect } from "react-redux";

const BarChart = ({ uid }) => {
    const [chartData, setChartData] = useState();
    const [selectedMealArr, setSelecetedMealArr] = useState([]);
    const [labels, setLabels] = useState([]);
    const [dataSet, setDataSet] = useState([]);

    useEffect(() => {
        db.collection("users")
            .doc(uid)
            .onSnapshot(function (doc) {
                const dailyStats = doc.data().dietStats.dailyStats;
                console.log(dailyStats);
                if (dailyStats) {
                    const nutrientsArrs = Object.entries(dailyStats);
                    nutrientsArrs.forEach(nutrientArr => {
                        const nutrientName = nutrientArr[0];
                        const nutrientValue = nutrientArr[1];
                        if (
                            nutrientName[0] === "protein" ||
                            nutrientName[0] === "total_fat" ||
                            nutrientName[0] === "total_carbohydrate"
                        ) {
                            if (labels.length < 3)
                                setLabels([...labels, nutrientName]);
                            if (dataSet.length < 3)
                                setDataSet([...dataSet, nutrientValue]);
                        }
                    });
                }
            });
    }, [chartData]);
    useEffect(() => {
        if (dataSet)
            setChartData({
                labels: labels,
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
                        data: dataSet,
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
    }, [dataSet]);

    return (
        <HorizontalBar
            style={{ height: "100px" }}
            hover={true}
            data={chartData}
            options={{
                cutoutPercentage: 70,
                tooltips: {
                    enabled: true,
                },
                responsive: true,
                title: { display: true, text: "Nutrient Distribution" },
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
        activeMealContent: state.DietReducer.activeMeal,
    };
};

export default connect(mapStateToProps)(BarChart);
