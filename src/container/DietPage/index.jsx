import React from 'react';
import EditMeal from '../../components/dietpage/EditMeal';
import DietOverview from '../../components/dietpage/DietOverview';
import { Row } from 'antd';
import DietGraphs from '../../components/dietpage/DietGraphs';
import './index.css';

const DietPage = () => {
    return (
        <Row className='dietPageRow'>
            <DietOverview />
            <EditMeal />
            <DietGraphs />
        </Row>
    );
};

export default DietPage;

// test
