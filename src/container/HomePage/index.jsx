import React from 'react';
import { Row, Col, Divider, Space } from 'antd';
import Header from '../../components/homepage/Header';
import KnowWhatYouAreEating from '../../components/homepage/KnowWhatYouAreEating';
import CompareFood from '../../components/homepage/CompareFood';
import KeepTrack from '../../components/homepage/KeepTrack';
import AllToolsYouNeed from '../../components/homepage/AllToolsYouNeed';
import './index.css';

const HomePage = () => {
  return (
    <>
      <Header />
      <Row className='homePageRow'>
        <Col span={24}>
          <div className='homePageCol'>
            <Space direction='vertical' align='center'>
              <KnowWhatYouAreEating />
              <Divider />
              <CompareFood />
              <Divider />
              <KeepTrack />
              <Divider />
              <AllToolsYouNeed />
            </Space>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default HomePage;
