import React from 'react';
import { Row, Col, Typography, Image } from 'antd';
import text from '../../../placeholderText';
import editMeal from '../../../images/editMeal.png';
import './index.css';

const CompareFood = () => {
  const { Title } = Typography;
  return (
    <Row align='middle' className='compareFoodRow'>
      <Col xl={12} xs={24} className='homePageContextCol'>
        <Title level={1}>COMPARE FOOD!</Title>
        <p className='compareFoodText'>{text}</p>
      </Col>
      <Col xl={12} xs={24} className='homePageContextCol'>
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
