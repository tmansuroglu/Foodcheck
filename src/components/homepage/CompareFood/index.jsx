import React from 'react';
import { Row, Col, Typography, Image } from 'antd';
import text from '../../../placeholderText';
import editMeal from '../../../images/editMeal.png';
import './index.css';

const CompareFood = () => {
  const { Title } = Typography;
  return (
    <Row align='middle' className='compareFoodRow'>
      <Col lg={12} xs={24} className='compareFoodCol'>
        <Title level={1}>COMPARE FOOD!</Title>
        <p className='compareFoodText'>{text}</p>
      </Col>
      <Col lg={12} xs={24} className='compareFoodCol'>
        <Image
          src={editMeal}
          width='90%'
          preview={false}
          alt='compare food'
          className='homePageImage'
        />
      </Col>
    </Row>
  );
};

export default CompareFood;
