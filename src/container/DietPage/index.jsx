import React from 'react';
import { Row } from 'antd';
import EditMeal from '../../components/dietpage/EditMeal';
import DietOverview from '../../components/dietpage/DietOverview';
import DietGraphs from '../../components/dietpage/DailyStats';
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
