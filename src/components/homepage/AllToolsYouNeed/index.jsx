import React from 'react';
import { Row, Col, Typography, Image } from 'antd';
import text from '../../../placeholderText';
import dailyStats from '../../../images/dailyStats.png';
import './index.css';

const AllToolsYouNeed = () => {
  const { Title } = Typography;
  return (
    <Row align='middle' className='allToolsYouNeedRow'>
      <Col xl={12} xs={24} className='homePageContextCol'>
        <Title level={1}>WE GOT ALL THE TOOLS YOU NEED!</Title>
        <p className='allToolsYouNeedText'>{text}</p>
      </Col>
      <Col xl={12} xs={24} className='homePageContextCol'>
        <Image
          src={dailyStats}
          width='90%'
          preview={false}
          className='homePageImage'
          alt='daily diet stats'
        />
      </Col>
    </Row>
  );
};

export default AllToolsYouNeed;
