import React from 'react';
import { Row, Col, Typography, Image } from 'antd';
import text from '../../../placeholderText';
import dailyStats from '../../../images/dailyStats.png';
import './index.css';

const AllToolsYouNeed = () => {
  const { Title } = Typography;
  return (
    <Row align='middle' className='allToolsYouNeedRow'>
      {' '}
      <Col xxl={12} md={24} className='allToolsYouNeedCol'>
        <Title level={1}>WE GOT ALL THE TOOLS YOU NEED!</Title>
        <p className='allToolsYouNeedText'>{text}</p>
      </Col>
      <Col
        xxl={12}
        lg={12}
        xl={12}
        md={24}
        sm={24}
        xs={24}
        className='allToolsYouNeedCol'
      >
        <Image src={dailyStats} width='90%' preview={false} />
      </Col>
    </Row>
  );
};

export default AllToolsYouNeed;
