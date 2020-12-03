import React from 'react';
import { connect } from 'react-redux';
import { Card, Col } from 'antd';
import BarChart from '../BarChart';
import PieChart from '../PieChart';

const DietDetails = ({ activeMeal }) => {
    if (activeMeal)
        return (
            <Col xs={24} md={6} lg={8}>
                <div>
                    <Card
                        className='graphCard'
                        title={<PieChart />}
                        bordered={false}
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
