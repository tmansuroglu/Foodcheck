import React from 'react';
import { Row } from 'antd';
import EditMeal from '../../components/dietpage/EditMeal';
import DietOverview from '../../components/dietpage/DietOverview';
import DailyStatsCard from '../../components/dietpage/DailyStatsCard';
import './index.css';

const DietPage = () => {
  return (
    <Row className='dietPageRow'>
      <DietOverview />
      <EditMeal />
      <DailyStatsCard />
    </Row>
  );
};

export default DietPage;

// test
