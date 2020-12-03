import React from "react";
import { connect } from "react-redux";
import { Card, Col } from "antd";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

const DietDetails = ({ activeMeal }) => {
    if (activeMeal)
        return (
            <Col xs={24} sm={24} md={6} lg={8} xl={8} xxl={8}>
                <div style={{ width: "100%", marginTop: "3.3vh" }}>
                    <Card
                        title={<PieChart />}
                        bordered={false}
                        style={{ width: "100%" }}
                    >
                        <BarChart />
                    </Card>
                </div>
            </Col>
        );
    else {
        return <div></div>;
    }
};

const mapStateToProps = state => {
    return {
        uid: state.firebase.auth.uid,
        selectedMeal: state.DietReducer.activeMeal,
        activeMeal: state.DietReducer.activeMeal,
        mealsSet: state.DietReducer,
    };
};
export default connect(mapStateToProps)(DietDetails);
