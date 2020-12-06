import React from 'react';
import { Row, Col, Image, Typography } from 'antd';
import text from '../../../placeholderText';
import foodDetails from '../../../images/foodDetails.png';
import './index.css';

const KnowWhatYouAreEating = () => {
  const { Title } = Typography;
  return (
    <Row align='middle' className='knowWhatYouAreEatingRow'>
      <Col
        className='homePageContextCol'
        xl={{ span: 12, order: 1 }}
        xs={{ span: 24, order: 2 }}
      >
        <Image
          src={foodDetails}
          width='90%'
          preview={false}
          alt='food details'
          className='homePageImage'
        />
      </Col>
      <Col
        xl={{ span: 12, order: 2 }}
        xs={{ span: 24, order: 1 }}
        className='homePageContextCol'
      >
        <Title className='knowWhatYouAreEatingText' level={1}>
          KNOW WHAT YOU ARE EATING!
        </Title>
        <p>{text}</p>
      </Col>
    </Row>
  );
};

export default KnowWhatYouAreEating;
