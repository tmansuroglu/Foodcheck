import React from 'react';
import { Row, Col } from 'antd';
import EditMeal from '../../components/dietpage/EditMeal';
import DietOverview from '../../components/dietpage/DietOverview';
import DailyStatsCard from '../../components/dietpage/DailyStatsCard';
import './index.css';

const DietPage = () => {
  return (
    <div>
      <Row className='dietPage' gutter={8}>
        <Col xs={24} xl={4}>
          <DietOverview />
        </Col>
        <Col xs={24} xl={10}>
          <EditMeal />
        </Col>
        <Col xs={24} xl={10}>
          <DailyStatsCard />
        </Col>
      </Row>
    </div>
  );
};

export default DietPage;

// test
